
const express = require('express')
const port = 3000
const app = express()
app.use(express.json())

/*
- Query params => meusite.com/users?name=fernando&age=41 //filtros
- Route params => /users/2   //buscar, deletar ou atualizar algo Específico
- Request Body => { "name":"Rodolfo", "age":}

*/

app.get('/users', (request, response) => {

    const { name, age } = request.body


    return response.json({ name, age })

})

app.listen(port, () =>{
console.log('🚦Server Started on port ${port}')

})

