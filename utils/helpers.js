const formatDate = (date) => {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
};

const isfeatured = (obj) => {
  if (featured)
  return obj;
}

module.exports = { formatDate, isfeatured };
