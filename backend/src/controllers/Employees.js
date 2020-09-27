const arquivo = require('./fileManager');

const getData = (query='{}') => { /* Método getData ---------------------------------------- */
    
    response = arquivo.getJSON();  

    if(JSON.stringify(query) != '{}'){ //verifica se o objeto query não é vazio
        response = filterData(query, response); //filtra os funcionários
    }
    
    return arquivo.save(response)  
}

const filterData = (query, data) => {  /* Método filterData ---------------------------------------- */

    if(query.groupByUfNasc) { // quando quer retornar a quantidade de funcionários em um Estado (UfNasc)

        const dataByUfNasc = data.filter((item) => (item.UfNasc == query.groupByUfNasc))
        let qtd = JSON.stringify(dataByUfNasc.length); 
        objFiltered = { qtdEmployees: qtd}
        
        return objFiltered
    }

    let arrQuery = [];

    for(var key in query){ // percorre os atributos do objeto
        arrQuery.push([key, query[key]]) // coloca em cada posição do array [key, value]
    }

    if(query.SalarioMin) { //se quer filtrar por faixa salarial

        const filtraFaixaSalarial = (salario) => {
            salario = parseFloat(salario);
            min = parseFloat(query.SalarioMin);
            max = parseFloat(query.SalarioMax);
            
            if((salario >= min) && (salario <= max)) {
                return true;
            }else {
                return false
            }
        }

        return data.filter(({ Salario }) => filtraFaixaSalarial(Salario));      
    }

    function filtraPorCampos(item, arrQueries){ //filtra por qualquer campo, mas apenas um por vez
        let query = arrQueries[0];
        key = query[0];
        value = query[1];

        return item[key] === value
    } 

    return data.filter((item) => filtraPorCampos(item, arrQuery))
}

module.exports = {
    getData
};

/*
const employees = {}

function saveEmployee(employee) { //insert and update
    if(!employee.Cpf) return
    employees[employee.Cpf] = employee
    return employee
}

function getEmployee(Cpf) {
    return employee[Cpf] || {}
}

function getEmployees() {
    return Object.values(employees)
}

function deleteEmployee(Cpf) {
    const employee = employees[Cpf]
    delete employees[Cpf]
    return employee
}

module.exports = {
    saveEmployee,
    getEmployee,
    getEmployees,
    deleteEmployee
}*/