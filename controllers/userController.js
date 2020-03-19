const db        = require('../models')
const Users     = db.Users;
const Op        = db.Sequelize.Op;

/**
 * GET /
 * Get All users
 */
exports.getAll = async (req, res) => {
    // users?name=mahmoud
    const email = req.query.email;
    let condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    try {
        const all = await Users.findAll({ where: condition })
        res.json( all );
    } catch (error) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting all users."
        });
    }
};

/**
 * POST /
 * Create New User
 */
exports.create = async (req, res) => {
    /**
     * {
     *  "active": true
     * }
     */
    const user = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        active: req.body.active
    }

    try {
        const newUser = await Users.create(user);
        res.json( newUser );
    } catch (error) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating a new user."
        });
    }
};

/**
 * PUT /
 * Change user info
 */
exports.update = async (req, res) => {
    // users/:userId
    const userId = req.params.userId;
    const update = req.body;

    try {
        await Users.update(update, {where: { id: userId }});
        res.send({
            message: "User was updated successfully."
        });
    } catch (error) {
        res.status(500).send({
            message: "Error updating user with id=" + userId
        });
    }
};

/**
 * Delete /
 * Create New User
 */
exports.delete = async (req, res) => {
    // users/:userId
    const userId = req.params.userId;

    try {
        await Users.destroy(({where: { id: userId }}));
        res.send({
            message: "User was deleted successfully."
        });
    } catch (error) {
        res.status(500).send({
            message: "Error deleting user with id=" + userId
        });
    }
};



  
  