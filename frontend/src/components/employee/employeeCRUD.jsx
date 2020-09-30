import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios';

const headerProps = {
    icon: 'id-badge',
    title: 'Funcionários',
    subtitle: 'Cadastro de funcionários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/api/employees'
const initialState = {
    employee: { DataCad: '', Cargo: '', Cpf: '', Nome: '', UfNasc: '', Salario: '', Status: '' },
    list: []
}

export default class EmployeeCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    clear() {
        this.setState({ employee: initialState.employee })
    }

    save() { //insert or update
        const employee = this.state.employee
        //const method = employee.id ? 'put' : 'post'
        const method = 'post'
        //const url = employee.Cpf ? `${baseUrl}/${employee.Cpf}` :baseUrl
        const url = baseUrl
        axios[method](url, employee)
            .then(resp => {
                const list = this.getUpdatedList(resp.data) //obtém a lista
                this.setState({ employee: initialState.employee, list }) //atualiza a lista do state
            })
    }

    getUpdatedList(employee, add=true) { //add=true quando insere/atualiza e falso quando exclui
        const list = this.state.list.filter(e => e.Cpf !== employee.Cpf) //pega todos os outros da lista
        if(add) list.unshift(employee) //coloca o funcionário atual na primeira posição do array
        return list
    }

    updateField(event) {
        const employee = { ...this.state.employee}
        employee[event.target.name] = event.target.value
        this.setState({ employee })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">  {/* col-12 ocupa 100% da tela quando é pequena (mobile), e col-md-6 para occupar metade da tela em desktops/notebooks */}
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control"
                                name="Cpf"
                                value={this.state.employee.Cpf}
                                onChange={e => this.updateField(e)}
                                placeholder="00000000000" maxLength="11"/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="Nome"
                                value={this.state.employee.Nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Nome..."/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cargo</label>
                            <select className="form-control"
                                name="Cargo"
                                value={this.state.employee.Cargo}
                                onChange={e => this.updateField(e)}>
                                <option value="">Escolha um Cargo...</option>
                                <option value="Dev Jr">Dev Jr</option>
                                <option value="Dev Pl">Dev Pl</option>
                                <option value="Dev Sr">Dev Sr</option>
                                <option value="AC Jr">AC Jr</option>
                                <option value="AC Pl">AC Pl</option>
                                <option value="AC Sr">AC Sr</option>
                                <option value="Analista Jr">Analista Jr</option>
                                <option value="Analista Pl">Analista Pl</option>
                                <option value="Analista Sr">Analista Sr</option>
                                <option value="PO Jr">PO Jr</option>
                                <option value="PO Pl">PO Pl</option>
                                <option value="PO Sr">PO Sr</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Salário</label>
                            <input type="number" className="form-control"
                                name="Salario"
                                value={this.state.employee.Salario}
                                onChange={e => this.updateField(e)}
                                placeholder="0000.00"/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>UF de nascimento</label>
                            <select className="form-control"
                                name="UfNasc"
                                value={this.state.employee.UfNasc}
                                onChange={e => this.updateField(e)}>
                                <option value="">Escolha um Estado</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PR">PR</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                                <option value="SE">SE</option>
                                <option value="TO">TO</option>
                            </select>  
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data de Cadastro</label>
                            <input type="date" className="form-control"
                                name="DataCad"
                                value={this.state.employee.DataCad}
                                onChange={e => this.updateField(e)}/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Status</label>
                            <select className="form-control"
                                name="Status"
                                value={this.state.employee.Status}
                                onChange={e => this.updateField(e)}>
                                <option value="ATIVO">ATIVO</option>
                                <option value="BLOQUEADO">BLOQUEADO</option>
                            </select>
                        </div>
                    </div>

                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end"> {/* utiliza as 12 colunas para todos os dispositivos */}
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(employee) {
        this.setState({ employee })
    }

    remove(employee) {
        axios.delete(`${baseUrl}/${employee.Cpf}`).then(resp => {
            const list = this.getUpdatedList(employee, false) //passar null como parâmetro para não adicionar o elemento atual na lista
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Cargo</th>
                        <th>Salario</th>
                        <th>UfNasc</th>
                        <th>DtCad</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(employee => {
            return (
                <tr key={employee.Cpf}>
                        <td>{employee.Nome}</td>
                        <td>{employee.Cpf}</td>
                        <td>{employee.Cargo}</td>
                        <td>{employee.Salario}</td>
                        <td>{employee.UfNasc}</td>
                        <td>{employee.DtCad}</td>
                        <td>{employee.Status}</td>

                        <td>
                            <button className="btn btn-warning"
                                onClick={() => this.load(employee)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(employee)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                </tr>
            )
        })
    }

    render() {
        //console.log(this.state.list)

        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}