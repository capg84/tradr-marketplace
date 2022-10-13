const editListingHandler = async (event) => {
    console.log("Update button clicked");
    event.preventDefault();

    const product_name = document.querySelector('#product_name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const price = document.querySelector('#product_price').value.trim();
    const image = document.querySelector('#image').value.trim();
    const category_id = document.querySelector('.form-select').value.trim();
    const stock = 1;

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ product_name, description, price, image, stock, category_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert("Error");
      }
    }
  };
  
document
.querySelector('#update-btn')
.addEventListener('click', editListingHandler);