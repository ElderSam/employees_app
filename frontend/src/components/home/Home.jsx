import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Início"
        subtitle="Projeto 'Funcionários App' em ReactJS.">
        <div className="display-4">Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema de cadastro de funcionários! </p>
    </Main>