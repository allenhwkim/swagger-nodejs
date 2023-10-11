/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first
 *         - last
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a user
 *         first:
 *           type: string
 *           description: first name
 *         last:
 *           type: string
 *           descripton: last name
 *       example:
 *         id: 1
 *         first: John 
 *         last: Doe
 * 
 * @swagger
 *  tags:
 *    name: Users
 *    description: list of users
 */