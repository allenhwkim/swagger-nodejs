const express = require('express');
const swaggerUI = require('swagger-ui-express');

const usersRouter = require('./users');
const swaggerSpec = require('./swagger');

const app = express();
app.use("/users", usersRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(3000, () => console.log(`Server runs on port 3000, http://localhost:3000/users`));