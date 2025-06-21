const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 


router.post('/', userController.addUser);


router.get('/', userController.getAllUsers);


router.delete('/:email', userController.deleteUser);


router.put('/:email', userController.updateUser);

module.exports = router;
