import './Nav.css';
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <i className="fa fa-home fa-lg"></i> Início
            </a>
            <a href="#/employees">
                <i className="fa fa-id-badge fa-lg"></i> Funcionários
            </a>
        </nav>
    </aside>