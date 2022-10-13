const newItemHandler = async (event) => {
    event.preventDefault();
  
    const product_name = document.querySelector('#product_name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const price = document.querySelector('#product_price').value.trim();
  
    if (title && content) {
        console.log(title + content);
         const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
            'Content-Type': 'application/json',
            },
      });
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
  };

  document
    .querySelector('#create-btn')
    .addEventListener('submit', newItemHandler);