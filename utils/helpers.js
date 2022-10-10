const formatDate = (date) => {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
};

module.exports = { formatDate };
