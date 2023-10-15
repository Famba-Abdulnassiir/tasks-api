const express = require('express');
const router = express.Router();

const todos = require('../models/todo_db')


//get all todos
router.get('/', (req, res) =>
{  
    res.json(todos);    
    
})

//get a todo by id
router.get("/:id", (req, res) => {
    const todoAvailable = todos.some(todo => todo.id === parseInt(req.params.id))
    const id = parseInt(req.params.id);

    if(todoAvailable){
        res.json(todos.filter(todo => todo.id === id))
        .status(200)
    }else{
        res
        .status(400)
        .json({message: `The todo id ${id} you provided does not exist.`})
    }
})


// filter query false or true
router.get('/', (req, res) => {  
    const filter = req.query.completed; 

    // Convert filter to a boolean value
    const filterBoolean = (filter === 'true');

    const filteredTodos = todos.filter((todo) => todo.completed === filterBoolean);
    res.json(filteredTodos);
    });

 
//POST => add a todo
router.post('/', (req, res) =>{
   const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed
   } 

   todos.push(newTodo);

   res.json(todos);
})

// PUT => update a todo
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const replacementTodo = {
          title: req.body.title,
          completed: req.body.completed,
    };      
      
    const searchIndex = todos.some((todo) => todo.id === id);
      
        if(searchIndex){
            todos[searchIndex] = replacementTodo;
       
            res
            .status(201)
            .json({Message:`Record successfully Updated`})
           
        } else{
            res
            .status(400)
            .json({Message:`No record found in ${id}`})
            
        }
        
    
    });



//DELETE => delete a todo.
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const findTodoIndex = todos.findIndex(todo => todo.id === id)

    if(findTodoIndex > -1) {
        todos.splice(findTodoIndex, 1)
        res
        .status(200)
        .json({message:'Todo successfully deleted'})
    }else {
        res
        .status(404)
        .json({message:`Todo with ${id} not found, please enter the right id`})
    }
})


module.exports = router;