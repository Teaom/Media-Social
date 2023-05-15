const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    //   addReaction,
    //   removeReaction,

  
    // Get all thoughts
    async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }
 
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
    //   res.json(thoughtData);

        if(thoughtData){
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
        }


    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update Thought
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // deleteThought
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thoughtData) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const userData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({
          message: 'Thought deleted, but no courses found',
        });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an reaction to a thought
  async addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a thought
  async removeReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
