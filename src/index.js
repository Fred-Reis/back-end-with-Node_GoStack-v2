const express = require('express');
const {uuid} = require('uuidv4')

const app = express();

// esse comando é para receber o json no body
app.use(express.json())

const projects = []

// recebe 2 parametros 1º a rota/RECURSO 2º uma funçao
app.get('/projects',(request, response) => {
  
  // const query = request.query;
  // console.log(query)

  // const {title, owner} = request.query;

  // console.log(title)
	// console.log(owner)

  // sempre o return com um response
  return response.json(projects)
})

// adicionando um projeto
app.post('/projects',(request,response) => {

  const {nome, profissao} = request.body;

  // função pra gerar um id
  const project = {id:uuid(), nome, profissao}

  projects.push(project)


  return response.json(project)
})

// altera um item, nesse caso recebe um id pra informar qual item a ser alterado
// nesse caso a rota ficaria http://localhost:3333/projects/1
app.put('/projects/:id',(request,response) => {
  // const params = request.params
  const {id} = request.params;
  const {nome, profissao} = request.body;

  const projectIndex = projects.findIndex(p => p.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Person not found!'})
  }

  const project = {
    id,
    nome,
    profissao
  }

  projects[projectIndex] = project

  return response.json(project)
})

//pelo mesmo motivo de cima a rota recebe um id
app.delete('/projects/:id',(request,response) => {
  const {id} = request.params;

  const projectIndex = projects.findIndex(p => p.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Person not found!'})
  }

  projects.splice(projectIndex, 1)
  return response.status(204).send()
})

// a porta que será ouvida e pode receber uma função no segundo parâmetro para executar quando o servidor 'subir'
app.listen(3333, () =>{
  console.log('🚀 Back-end startet!')
})