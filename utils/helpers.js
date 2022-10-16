const formatDate = (date) => {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
};

const limit =  (arr, limit) => {
  if (!Array.isArray(arr)) { return []; }
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};


module.exports = { formatDate, limit };
