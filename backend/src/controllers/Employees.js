const arquivo = require('./fileManager');

const getEmployees = (query={}) => { /* Método getEmployees ---------------------------------------- */
    
    employees = arquivo.load(); 

    const formatDate = (data) => { //recebe 'dd/mm/yyyy' e retorna 'yyyy-mm-dd'
        day = data.substr(0, 2)
        month = data.substr(3, 2)
        year = data.substr(6, 4)
        
        return `${year}-${month}-${day}`
    }
    
    employees = employees.map( item => {
        item.DataCad = formatDate(item.DataCad)
        console.log(item.DataCad)
        return item
    })

    arquivo.save(employees)
 
    if(JSON.stringify(query) != '{}'){ //verifica se o objeto query não é vazio

        page = parseInt(query.page)   
        delete query.page //apaga o atributo page para desconsiderar eele ao filtrar pelo que está dentro de query
        
        if(JSON.stringify(query) != '{}'){ //se existir outra propriedade sem ser page
            employees = filterData(query, employees); //filtra os funcionários
        }

        if(page > 0) { //se foi passado o parâmetro página
            employees = paginateList(page, employees);
        }
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
        //console.log('insere')
        employees.push(employee)

    }else{ //atualiza
        //console.log('atualiza')

        employees = employees.map((item) => {
            if(item.Cpf == employee.Cpf) {
                item = employee
            }
         
            return item;
        })
    }

    //console.log('Cpf', employee.Cpf)

    arquivo.save(employees)
    return employee //retorna o funcionário inserido/atualizado
}

function deleteEmployee(Cpf) {
    employees = arquivo.load()

    /*console.log('excluir')
    console.log('Cpf', Cpf)*/

    deletedItem = [];
    deletedItem = employees.filter((item) => item.Cpf == Cpf )

    const newEmployees = employees.filter((item) => item.Cpf != Cpf )

    //console.log(`qtdAnterior: ${employees.length}, qtdNova: ${newEmployees.length}`)
    
    if((employees.length - 1) === newEmployees.length){ //se realmente tirou um item do array
        arquivo.save(newEmployees)
    }

    return deletedItem
}

const paginateList = (page, data) => { //percorre o arary e retorna de 10 em 10

    initialIndex = (page - 1) * 10; //ex: se a page=1 então começa do 0, se page=2 começa do 10
    limitInPage = 10
    limit = initialIndex + limitInPage
    res = [];

    for(i=initialIndex; i<limit; i++) {
        //console.log(`index: ${i}, limit: ${limit}, total: ${data.length}`)
        if(i > (data.length - 1)) break; //se já percorreu o array inteiro, sai do loop
        res.push(data[i]);
    }

    sobra = (data.length%limitInPage) == 0 ? 0 : 1; //se sobrar 1 ou mais elementos, então vai adionar a última página
    totalPages = parseInt(data.length/limitInPage + sobra)
    //console.log(`total: ${data.length}, pags: ${totalPages}`)
    return { pages: totalPages, limit: limitInPage,  docs: res }
}

const filterData = (query, data) => {  /* Método filterData ---------------------------------------- */
    //console.log('filtrando funcionários: ', query)

    if(query.groupByUfNasc) { // quando quer retornar a quantidade de funcionários em um Estado (UfNasc)

        const dataByUfNasc = data.filter((item) => (item.UfNasc == query.groupByUfNasc))
        let qtd = dataByUfNasc.length; 
        objFiltered = { qtdEmployees: qtd}
        
        return objFiltered
    }

    let arrQuery = [];

    for(var key in query){ // percorre os atributos do objeto
        arrQuery.push([key, query[key]]) // coloca em cada posição do array [key, value]
    }

    if(query.SalarioMin != undefined) { //se quer filtrar por faixa salarial (obs: tem que aceitar 0(zero), pois 0==false)
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

        return item[key].toUpperCase() === value.toUpperCase()
    } 

    return data.filter((item) => filtraPorCampos(item, arrQuery))
}

module.exports = {
    getEmployees,
    saveEmployee,
    deleteEmployee,
    filterData
}