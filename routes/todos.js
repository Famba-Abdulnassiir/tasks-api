const express = require('express');
const router = express.Router();

const todos = require('../models/todo_db')

/*******************Swagger API Documentation Start *************************/
/**
 * @swagger
 * components:
 *  schemas:
 *   Task:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: This is auto-generated id of the task.
 *       title:
 *         type: string
 *         description: Describe what you will be doing in tis title section.
 *       completed:
 *          type: boolean
 *          description: This is a boolean, true or flase according to if the task is completed or not.
 *     example:
 *        id: 1
 *        title: This is just an example of how todo task looks like
 *        completed: false
 */

/**
 * @swagger
 * tags:
 *  name: Todos
 *  description: Tasks API for managing tasks in our Application.
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Returns the list of all the tasks
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: The list of the Tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */


/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get the task by id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task id
 *     responses:
 *       200:
 *         description: The todo description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: The todo with that id was not found
 */

//get all todos

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new task
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /todos/{id}:
 *  put:
 *    summary: Update the Task  by the id
 *    tags: [Todos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The Task was  Successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      400:
 *        description: The task with that id was not found please double check and provide a correct id.
 *      500:
 *        description: Some error happened
 */


/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Remove the Task by id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task id
 * 
 *     responses:
 *       200:
 *         description: The Task was successfully deleted
 *       400:
 *         description: The Task was not found
 */

/*******************END of Documentation*************************/


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