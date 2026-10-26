import { createStory as createStoryService } from "../../services/stories/createStory.js";

export const createStory = async (req, res) => {
  const file = req.files?.img?.[0] ?? req.files?.image?.[0];

  const story = await createStoryService({
    user: req.user,
    file,
    payload: req.body,
  });

  res.status(201).json({
    status: 201,
    message: "Story created successfully",
    data: story,
  });
};
