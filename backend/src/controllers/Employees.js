const arquivo = require('./fileManager');

const getEmployees = (query='{}') => { /* Método getEmployees ---------------------------------------- */
    
    employees = arquivo.load(); 

    if(JSON.stringify(query) != '{}'){ //verifica se o objeto query não é vazio
        employees = filterData(query, employees); //filtra os funcionários
    }
    
    return employees;  
    //return Object.values(employees);  
}

/*function getEmployee(Cpf) {
    employees = arquivo.load()
    return employee[Cpf] || {}
}*/

function saveEmployee(employee) { //insert and update

    employees = arquivo.load() //carrega um array através do JSON de funcionários

    if(!employee.Cpf) return

    const x = employees.filter(({ Cpf }) => Cpf == employee.Cpf)

    if(x.length == 0){ //se nao existe um objeto com esse Cpf, então insere um novo
        console.log('insere')
        employees.push(employee)

    }else{ //atualiza
        console.log('atualiza')

        employees = employees.map((item) => {
            if(item.Cpf == employee.Cpf) {
                item = employee
            }
         
            return item;
        })
    }

    console.log('Cpf', employee.Cpf)

    arquivo.save(employees)
    return employee //retorna o funcionário inserido/atualizado
}

const filterData = (query, data) => {  /* Método filterData ---------------------------------------- */
    console.log('filtrando funcionários: ', query)

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
    getEmployees,
    saveEmployee
}