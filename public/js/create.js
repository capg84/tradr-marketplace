const newItemHandler = async (event) => {
    console.log("create button clicked!")
    event.preventDefault();
  
    const product_name = document.querySelector('#product_name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const price = document.querySelector('#product_price').value.trim();
    const image = document.querySelector('#image').value.trim();
    const category = document.querySelector('#category').value.trim();
    const stock = 1;
  
    if (product_name && description && price && image && stock && category ) {
        console.log(product_name && description && price && image && stock && category )
         const response = await fetch(`/api/products`, {
            method: 'POST',
            body: JSON.stringify({ product_name, description, price, image, stock, category }),
            headers: {
            'Content-Type': 'application/json',
            },
      });
        console.log(response);
        if (response.ok) {
            console.log("all good!")
            /* document.location.replace('/activelistings'); */
        } else {
            alert('Failed to create listing');
        }
    }
  };

  document
    .querySelector('#create-btn')
    .addEventListener('submit', newItemHandler);