export const getPagination = (query = {}, defaultPerPage = 10) => {
  const page = Number(query.page ?? 1);
  const perPage = Number(query.perPage ?? defaultPerPage);
  const validPage = Number.isSafeInteger(page) && page >= 1;
  const validSize =
    Number.isSafeInteger(perPage) && perPage >= 1 && perPage <= 100;
  if (!validPage || !validSize) {
    throw new RangeError("Invalid pagination parameters");
  }
  return { page, perPage, skip: (page - 1) * perPage };
};

export const paginationMeta = (totalItems, page, perPage) => {
  const totalPages = Math.ceil(totalItems / perPage);
  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1 && totalItems > 0,
  };
};
