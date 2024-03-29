import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios';
import './employeeCRUD.css'

const headerProps = {
    icon: 'id-badge',
    title: 'Funcionários',
    subtitle: 'Cadastro de funcionários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/api/employees'
const initialState = {
    employee: { DataCad: '', Cargo: '', Cpf: '', Nome: '', UfNasc: '', Salario: '', Status: '', update: false },
    list: [],
    listInfo: {}, //vlTotal, pagina atual, etc
    page: 1,
    searchForm: { field: '',  value: '', SalarioMin: false, SalarioMax: false },
    reqFilterUrl: false
}

export default class EmployeeCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        this.loadEmployees()
    }

    loadEmployees() {
        const { page, reqFilterUrl } = this.state;
        let reqUrl = `${baseUrl}?page=${page}`

        if(reqFilterUrl) {
            reqUrl += reqFilterUrl
        }

        console.log(reqUrl)
        axios(reqUrl).then(resp => {
            console.log(resp)
            const { docs, ...listInfo} = resp.data
            this.setState({ list: docs, listInfo })
        })
    }

    clear() {
        this.setState({ employee: initialState.employee })
    }

    save() { //insert or update
        const { DataCad, Cargo, Cpf, Nome, UfNasc, Salario, Status } = this.state.employee
        //testar se os campos estão preenchidos

        if((Cpf === '') || (Nome === '') || (Cargo === '') || (Salario === '') || (UfNasc === '') || (DataCad === '') || (Status === '')){
            alert('Por favor preencha todos os campos corretamente')

        }else if(Cpf.length < 11){
            alert('O Cpf deve ter 11 dígitos numéricos');

        }else if(isNaN(Cpf)){
            alert('O Cpf deve conter apenas números');

        }else {
            const employee = this.state.employee
            //const method = employee.id ? 'put' : 'post'
            const method = 'post'
            //const url = employee.Cpf ? `${baseUrl}/${employee.Cpf}` :baseUrl
            const url = baseUrl
            axios[method](url, employee)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data) //obtém a lista
                    this.setState({ employee: initialState.employee, list }) //atualiza a lista do state
                    alert('Funcionário salvo com sucesso! ;)')

                }).catch(err => {
                    alert('Não foi possível salvar o funcionário! :(');
                })
        }

    }

    getUpdatedList(employee, add=true) { //add=true quando insere/atualiza e falso quando exclui
        const list = this.state.list.filter(e => e.Cpf !== employee.Cpf) //pega todos os outros da lista
        if(add) list.unshift(employee) //coloca o funcionário atual na primeira posição do array
        return list
    }

    updateField(event) { //para todos os campos do formulário de funcionários
        const employee = { ...this.state.employee}
        employee[event.target.name] = event.target.value
        this.setState({ employee })
    }

    updateFieldSearch(event) { //para campos de filtro/pesquisa
        const searchForm = { ...this.state.searchForm}

        if(event.target.name === 'field') {

            if(event.target.value === 'Salario') { //se o campo para pesquisa é por faixa salarial
                
                searchForm.SalarioMin = true
               
            }else {
                searchForm.SalarioMin = false

            }

        }

        searchForm[event.target.name] = event.target.value
        this.setState({ searchForm })
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
                                placeholder="00000000000" maxLength="11"
                                disabled={this.state.employee.update} />
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
                                <option value="">Escolha um Status...</option>
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
        employee.update = true
        this.setState({ employee })
    }

    remove(employee) {
        axios.delete(`${baseUrl}/${employee.Cpf}`).then(resp => {
            const list = this.getUpdatedList(employee, false) //passar null como parâmetro para não adicionar o elemento atual na lista
            this.setState({ list })
            alert('funcionário excluído com sucesso! :)')

        }).catch(err => {
            alert('Não foi possível excluir o funcionário! :(')
        })
    }

    filterTable() {
        const { field, value, SalarioMin, SalarioMax } = this.state.searchForm
            let reqFilterUrl = false

        if((field !== '') && (((parseFloat(SalarioMin)) && (SalarioMax !== '')) || (value !== ''))) { //se preencheu os campos para pesquisar
            
            if(SalarioMin) {
                let auxMin = SalarioMin;
                if(SalarioMin === true) auxMin = 0;

                reqFilterUrl = `&SalarioMin=${auxMin}&SalarioMax=${SalarioMax}` //filtra por faixa salarial
            }else {
                reqFilterUrl = `&${field}=${value}`
            }
        }else {
            alert('escolha um campo e insira um valor válido para pesquisar!')
        }

        this.setState({ reqFilterUrl: reqFilterUrl, page: 1 })
        this.loadEmployees()
    }

    renderFilter() {
        const { field, value, SalarioMin, SalarioMax } = this.state.searchForm

        return (  
            <div className="row bg-dark text-white mt-2"> {/*-- FILTRO --*/}
                <h4 className="mt-4 ml-4">Filtrar tabela:</h4>
                <div className="form-group col-3">
                    <label for="field">campo:</label>
                    <select className="form-control" 
                        name="field" 
                        value={ field } /* campo escolhido para busca */
                        onChange={e => this.updateFieldSearch(e)}>
                        <option value="">escolha um campo...</option>
                        <option value="Nome">Nome</option>
                        <option value="Cpf">Cpf</option>
                        <option value="Cargo">Cargo</option>
                        <option value="Salario">Salario (faixa salarial)</option>
                        <option value="UfNasc">UfNasc</option>
                        <option value="DataCad">DataCad</option>
                        <option value="Status">Status</option>
                    </select>
                </div>

                <div className="row">
                    <div className="ml-1" hidden={SalarioMin === false}>
                        <label for="value">pesquisar por:</label>
                        <input type="text"
                            className="form-control"
                            name="value"
                            value={ value }
                            onChange={e => this.updateFieldSearch(e)}/>
                    </div>

                    <div className="ml-1" hidden={(SalarioMin === true) || (SalarioMin === '')}>
                        <label for="SalarioMin">mínimo:</label>
                        <input type="number"
                            className="form-control"
                            name="SalarioMin"
                            value={ SalarioMin }
                            onChange={e => this.updateFieldSearch(e)}/>
                    </div>

                    <div className="ml-1" hidden={!SalarioMin}>
                        <label for="SalarioMax">máximo:</label>
                        <input type="number"
                            className="form-control"
                            name="SalarioMax"
                            value={ SalarioMax }
                            onChange={e => this.updateFieldSearch(e)}/>
                    </div>
                   
                    <button className="btn btn-success ml-2 mt-4 mb-3"
                        onClick={() => this.filterTable()}>
                        <i className="fa fa-search" title="pesquisar"></i>  
                    </button>
                </div>

            </div>
        )
    }

    renderTable() {
        const { page, listInfo } = this.state

        return (
            <div className="employee-list table-responsive">
                <h2>Tabela de Funcionários</h2>
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cpf</th>
                            <th>Cargo</th>
                            <th>Salario</th>
                            <th>UfNasc</th>
                            <th>DataCad</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
             
                <div className="actions">
                    <button disabled={page === 1}
                        onClick={() => this.prevPage()}>
                            Anterior
                    </button>

                    <span class='text-secondary'>Página <strong>{page}</strong> de {listInfo.pages}</span>

                    <button disabled={page === listInfo.pages}
                        onClick={() => this.nextPage()}>
                            Próxima
                    </button>
                </div>
            </div>    
        )
    }

    formatMoney(money) { //formata valor para R$ (reais)
        money = parseFloat(money)
        return money.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    formatDate(data) { //recebe 'yyyy-mm-dd' e retorna 'dd/mm/yyyy'
        const year = data.substr(0, 4)
        const month = data.substr(5, 2)
        const day = data.substr(8, 2)
        
        return `${day}/${month}/${year}`
    }

    renderRows() {
        return this.state.list.map(employee => {
            return (
                <tr key={employee.Cpf}>
                        <td>{employee.Nome}</td>
                        <td>{employee.Cpf}</td>
                        <td>{employee.Cargo}</td>
                        <td>{this.formatMoney(employee.Salario)}</td>
                        <td>{employee.UfNasc}</td>
                        <td>{this.formatDate(employee.DataCad)}</td>
                        <td>{employee.Status}</td>

                        <td>
                            <button className="btn btn-warning"
                                title="editar"
                                onClick={() => this.load(employee)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                title="excluir"
                                onClick={() => this.remove(employee)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                </tr>
            )
        })
    }

    prevPage() { //página anterior
        const { page } = this.state

        if(page === 1) return; //se já estiver na primeira página, não faz nada
        
        const pageNumber = page - 1;
        this.setState({ page: pageNumber });
        this.loadEmployees();
    }

    nextPage() { //próxima página
        const { page, listInfo } = this.state
        console.log(`page: ${page}, totalPages: ${listInfo.pages}`)

        if(page === listInfo.pages) return; //se já estiver na última página, não faz nada
        console.log('passou, então tem mais página')
        const pageNumber = page + 1;
        this.setState({ page: pageNumber });
        this.loadEmployees();
    }

    render() {
        //console.log(this.state.list)

        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderFilter()}
                {this.renderTable()}         
            </Main>
        )
    }
}