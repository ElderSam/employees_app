import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'employees',
    title: 'Funcionários',
    subtitle: 'Cadastro de funcionários: Incluir, Listar, Alterar e Excluir'
}

export default class EmployeeCrud extends Component {
    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Funcionário
            </Main>
        )
    }
}