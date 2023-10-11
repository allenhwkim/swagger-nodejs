const express = require('express');
const bodyParser  = require('body-parser');
const users = [
  { id: 1, first: "Allen", last: "Kim" },
  { id: 2, first: "Hello", last: "World" },
  { id: 3, first: "John", last: "Doe" }
];

const router = express.Router();
router.use(bodyParser.json()); // to use body object in requests

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: the list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", (req, res) => {
  res.send(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: gets user info. by id
 *     tags: [Users]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of user
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: user info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user is not found
 */
router.get("/:id", (req, res) => {
  const user = users.find((el) => el.id === +req.params.id);
  user ? res.send(user) : res.sendStatus(404);
});

/**
 * @swagger
 * /users:
 *   user:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post("/", (req, res) => {
  const user = { ...req.body, id: users.length + 1 };
  res.send([...users, user]);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: updates a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some errors happend.
 */
router.put("/:id", (req, res) => {
  const existing = users.find((el) => el.id === +req.params.id);
  const user = Object.assign(existing, {first, last} = req.body);
  res.send(user);
});


/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      summary: removes a user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: user id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The user was deleted
 *        404:
 *          description: The post was not found
 */
router.delete("/:id", (req, res) => {
  const index = users.findIndex((el) => el.id === +req.params.id);
  users.splice(index, 1);
  res.sendStatus(200);
});

module.exports = router;
