export const getSavedStories = async (req, res) => {
  const user = await req.user.populate("savedArticles");

  res.status(200).json(user.savedArticles);
};
