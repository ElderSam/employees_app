import './Nav.css';
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to='/'>
                <i className="fa fa-home fa-lg"></i> Início  
            </Link>

            <Link to="/employees">
                <i className="fa fa-id-badge fa-lg"></i> Funcionários
            </Link>
        </nav>
    </aside>