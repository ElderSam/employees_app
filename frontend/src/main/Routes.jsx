import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import EmployeeCrud from '../components/employee/employeeCRUD'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/employees' component={EmployeeCrud} />
        <Redirect from='*' to='/' /> {/* redireciona para a Home tudo que não se encaixou nas rotas acima */}
    </Switch>