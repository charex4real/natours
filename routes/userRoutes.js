const express = require('express');
const userController = require('./../controllers/usersController');
const router = express.Router();

// 3) ROUTES

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
