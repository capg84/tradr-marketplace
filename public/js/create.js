const newItemHandler = async (event) => {
    console.log("create button clicked!")
    event.preventDefault();
  
    const product_name = document.querySelector('#product_name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const price = document.querySelector('#product_price').value.trim();
    const image = document.querySelector('#image').value.trim();
    const category_id = document.querySelector('#category').value.trim();
    const stock = 1;
  
    if (product_name && description && price && image && stock && category_id ) {
            console.log(product_name + description + price + image + stock + category_id);
         const response = await fetch(`/api/products`, {
            method: 'POST',
            body: JSON.stringify({ product_name, description, price, image, stock, category_id }),
            headers: {
            'Content-Type': 'application/json',
            },
      });
        console.log(response);
        if (response.ok) {
            document.location.replace('/dashboard'); 
        } else {
            alert('Failed to create listing');
        }
    }
  };

  document
    .querySelector('#create-btn')
    .addEventListener('click', newItemHandler);