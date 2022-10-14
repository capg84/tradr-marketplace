
// Function to add item to cart
const addToCart = async () => {

    // Variables for all the the product information on the wishlist page
    const productId = document.getElementById("product-id").value
    const userId = document.getElementById("user-id").value

    console.log(productId);
    const response = await fetch(`/api/cart/add/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
            quantity: 1,
            user_id: userId,
            product_id: productId
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {

        document.location.replace('/api/cart');
    } else {
        alert('Failed to add to cart');
    }

}


// Function to delete product from cart
const deleteFromWishlist = async () => {

    const id = document.getElementById("wishlist-id").value

    const response = await fetch(`/api/wishlist/delete/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            where: {
                id: id
            }
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/api/wishlist');
    } else {
        alert('Failed to delete it item from wishlist');
    }

}

// event listeners for buttons
const deleteButton = document.querySelectorAll("#x");
deleteButton.forEach(btn => {
    btn.addEventListener('click', deleteFromWishlist);
});



const addToCartButton = document.querySelectorAll(".wl-add-cart-btn");
addToCartButton.forEach(btn => {
    btn.addEventListener('click', addToCart);
});


