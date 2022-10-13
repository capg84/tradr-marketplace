
// Function to add item to cart
const addToCart = async () => {
console.log("hello")
// Variables for all the the product information on the wishlist page
const productId = document.getElementById("product-id").value
const quantity = document.getElementById("quantity").value
const id = document.getElementById("wishlist-id").value

console.log(productId, quantity)
    const response = await fetch(`/api/cart/add`, {
        method: 'POST',
        body: JSON.stringify({
            id: productId,
            quantity: quantity

        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace(`/api/wishlist/delete/${id}`);
    } else {
        alert('Failed to add to cart');
    }

}


// Function to delete product from cart
const deleteFromWishlist = async () => {

    const id = document.getElementById("wishlist-id").value

    const response = await fetch (`/api/wishlist/delete/${id}`, {
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
        document.location.replace('/');
    } else {
        alert('Failed to delete it item from wishlist');
    }

}

// event listeners for buttons
const deleteButton = document.querySelector(".cross-btn-styling").addEventListener("click", deleteFromWishlist)
const addToCartButton = document.getElementById("cart").addEventListener("click", addToCart)



