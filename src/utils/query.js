const buildSearchRegex = (value) => new RegExp(value.trim(), "i");

const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 9, 1), 50);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const buildMeta = ({ page, limit, total }) => ({
  page,
  limit,
  total,
  totalPages: Math.max(Math.ceil(total / limit), 1),
  hasNextPage: page * limit < total,
  hasPrevPage: page > 1,
});

module.exports = { buildSearchRegex, getPagination, buildMeta };
