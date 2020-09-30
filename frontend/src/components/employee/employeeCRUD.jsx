import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios';

const headerProps = {
    icon: 'employees',
    title: 'Funcionários',
    subtitle: 'Cadastro de funcionários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/employees'
const initialState = {
    employee: { DataCad: '', Cargo: '', Cpf: '', Nome: '', UfNasc: '', Salario: '', Status: '' },
    list: []
}

export default class EmployeeCrud extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ employee: initialState.employee })
    }

    save() { //insert or update
        const employee = this.state.employee
        //const method = employee.id ? 'put' : 'post'
        const method = 'post'
        const url = employee.Cpf ? `${baseUrl}/${employee.Cpf}` :baseUrl
        axios[method](url, employee)
            .then(resp => {
                const list = this.getUpdatedList(resp.data) //obtém a lista
                this.setState({ employee: initialState.employee, list }) //atualiza a lista do state
            })
    }

    getUpdatedList(employee) {
        const list = this.state.list.filter(e => e.id !== employee.Cpf) //pega todos os outros da lista
        list.unshift(employee) //coloca o funcionário atual na primeira posição do array
    }

    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Funcionário
            </Main>
        )
    }
}