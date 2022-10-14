const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/addresses/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/addresses');
      } else {
        alert('Failed to delete address');
      }
    }
};

const delAdds = document.querySelectorAll('#delete-add');
delAdds.forEach(btn => {
    btn.addEventListener('click', delButtonHandler);
});