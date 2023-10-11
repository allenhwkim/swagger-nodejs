const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const usersRouter = require('./users');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API"
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();
app.use("/users", usersRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(3000, () => console.log(`Server runs on port 3000, http://localhost:3000/users`));
