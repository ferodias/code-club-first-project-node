const express = require('express')
const uuid = require('uuid')
const app = express()
app.use(express.json())


/*
- Query params => meusite.com/users?name=fernando&age=41 //filtros
- Route params => /users/2   //buscar, deletar ou atualizar algo Específico
- Request Body => { "name":"Rodolfo", "age":}

- GET           => Buscar Informação no back-end
- POST          => Criar Informação no back-end
- PUT / PATCH   => Alterar/atualizar informações no back-end
- DELETE        => Deletar Informação no back-end
- MIDDLEWARE    => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição.

*/
const users = []
const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)
    
    if (index < 0) {
        return response.status(404).json({ error: "User not Found" })
    }

    request.userIndex = index
    
    next()

}


app.get('/users', (request, response) => {
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex

    const updatedUser = { id, name, age }


    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(3000, () => {
    console.log('🚥 Server started on port 3000')

})


