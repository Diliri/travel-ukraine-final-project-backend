import { StoryModel } from '../../models/story.js';

export const getStories = async (req, res) => {
  const limit = req.query.limit === undefined ? 9 : Number(req.query.limit);
  const page = req.query.page === undefined ? 1 : Number(req.query.page);

  if (!Number.isInteger(limit) || ![8, 9].includes(limit)) {
    return res.status(400).json({ message: 'limit must be 8 or 9' });
  }

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({ message: 'page must be a positive integer' });
  }

  const stories = await StoryModel.find()
    .populate('ownerId', 'name')
    .sort({ createdAt: -1, _id: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return res.json(stories);
};
