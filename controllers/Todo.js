/*This works fine but will be upgraded later when we introduce databases and real models*/

// const todos = require('../models/todo_db')

// const getAllTodos = (req, res) => {
//     res.json(todos)
// }

// const getUserById = (req, res) => {
//     const todoAvailable = todos.some(todo => todo.id === parseInt(req.params.id))
//     const id = parseInt(req.params.id);

//     if(todoAvailable){
//         res.json(todos.filter(todo => todo.id === id))
//         .status(200)
//     }else{
//         res
//         .status(400)
//         .json({message: `The todo id ${id} you provided does not exist.`})
//     }
// }

// module.exports = getAllTodos, getUserById