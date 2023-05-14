const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought, 
  deleteThought,
//   addReaction,
//   removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/assignments
// router.route('/:thoughtId/assignments').post(addAssignment);

// /api/thoughts/:thoughtId/assignments/:assignmentId
// router.route('/:thoughtId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
