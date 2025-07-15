const Bug = require('../models/Bug');

exports.createBug = async (req, res, next) => {
  try {
    const bug = new Bug(req.body);
    const savedBug = await bug.save();
    // Always return a plain object for tests and real runs
    res.status(201).json(savedBug && typeof savedBug.toJSON === 'function' ? savedBug.toJSON() : savedBug);
  } catch (err) {
    next(err);
  }
};

exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

exports.updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    next(err);
  }
};

exports.deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    next(err);
  }
}; 