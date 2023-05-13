const router = require('express').Router();
const {
  getAllUsers,
  // getUser,
  createUser,
  // updateUser,
  // deleteUser,
  // addFriend,
  // RemoveFriend
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
// router
//   .route('/:courseId')
//   .get(getSingleuser)
//   .put(updateCourse)
//   .delete(deleteCourse);

  //api/users/:userId/friends/:friendId

module.exports = router;
