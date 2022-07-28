const express=require('express')
const routes=express.Router()

let courseInfo = [
  {'curso': 'node', 'info': 'Curso de Node'},
  {'curso': 'react', 'info': 'Curso de React'},
  {'curso': 'java', 'info': 'Curso de Java'},
  {'curso': 'arduino', 'info': 'Curso de Arduino'},
]

routes.get('/', (req, res) => {
 res.json({ola: 'Seja bem vindo'})
})

routes.get('/:cursoid', (req, res) => {
  const course=req.params.courseid
  let courseInformation=courseInfo.find(item => item.curso == curso)
  if(!courseInformation) {
    res.status(404).json(
      {err: 'Curso não encontrato', cursoPesquisado: course}
    )
  } else {
    res.status(200).json(courseInformation)
  }
})

module.exports = routes