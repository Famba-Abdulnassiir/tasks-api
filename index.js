const express =  require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


app.use(express.json());
const todoRoute = require('./routes/todos');
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}));

//Define all your routes here.
app.use('/todos', todoRoute);

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Tasks API',
        description:'This is a simple API that allows one to work with todos or tasks',
        version: '1.0.1',
      },
      contacts:{
        email: 'fnassiir22@gmail.com',
        name: 'Abdulnassiir Famba'
      },
      servers: [
        {
            url: "http://localhost:8000",
        },
    ],
    },
    apis: ['../tasks-api/routes/*.js'], // files containing annotations as above
  };
  

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



app.listen(PORT, ()=> {
    console.log(`The server is running at port ${PORT}`)
})