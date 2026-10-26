const STORY_DESCRIPTION_MAX_LENGTH = 160;

export const buildStoryDescription = (article) => {
  const normalizedArticle = article.trim().replace(/\s+/g, " ");

  if (normalizedArticle.length <= STORY_DESCRIPTION_MAX_LENGTH) {
    return normalizedArticle;
  }

  return `${normalizedArticle.slice(0, STORY_DESCRIPTION_MAX_LENGTH - 1).trimEnd()}…`;
};
