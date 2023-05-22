//Curso de Engenharia de Software - UniEVANGÉLICA
//Disciplina de Programação Web
//Dev: Thiago Silva Soares
//DATA: 25/05/2023

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let exercises = [
  { id: 1, name: 'Agachamento', description: 'Exercício para pernas' },
  { id: 2, name: 'Supino', description: 'Exercício para peito' }
];

// Endpoint para recuperar a lista de exercícios
app.get('/exercises', (req, res) => {
  res.send(exercises);
});

// Endpoint para criar um novo exercício
app.post('/exercises', (req, res) => {
  const { name, description } = req.body;
  const id = exercises.length + 1;
  const newExercise = { id, name, description };
  exercises.push(newExercise);
  res.send(newExercise);
});

// Endpoint para recuperar informações de um exercício específico por ID
app.get('/exercises/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exercise = exercises.find(exercise => exercise.id === id);
  if (exercise) {
    res.send(exercise);
  } else {
    res.status(404).send('Exercício não encontrado');
  }
});

// Endpoint para atualizar informações de um exercício específico por ID
app.put('/exercises/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exerciseIndex = exercises.findIndex(exercise => exercise.id === id);
  if (exerciseIndex !== -1) {
    const { name, description } = req.body;
    exercises[exerciseIndex] = { id, name, description };
    res.send(exercises[exerciseIndex]);
  } else {
    res.status(404).send('Exercício não encontrado');
  }
});

// Endpoint para excluir um exercício específico por ID
app.delete('/exercises/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exerciseIndex = exercises.findIndex(exercise => exercise.id === id);
  if (exerciseIndex !== -1) {
    exercises.splice(exerciseIndex, 1);
    res.send(`Exercício com ID ${id} excluído com sucesso`);
  } else {
    res.status(404).send('Exercício não encontrado');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});