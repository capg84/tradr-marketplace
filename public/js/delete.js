const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete product');
      }
    }
};

const delButtons = document.querySelectorAll('.delete-btn');
delButtons.forEach(btn => {
    btn.addEventListener('click', delButtonHandler);
});