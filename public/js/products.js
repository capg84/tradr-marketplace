const addToWishlist = async () => {
console.log("hello")

    const productId = document.getElementById("product-id").value


    
    const response = await fetch(`/api/wishlist/add/${productId}`, {
        method: 'POST',
        body: JSON.stringify({
     
            
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        alert('Added to wishlist');
    } else {
        alert('Failed to add to wishlist');
    }

}


// adds product to cart
const toCart = async () => {

    // Variables for all the the product information on the wishlist page
    const productId = document.getElementById("product-id").value
    const userId = document.getElementById("to-cart").value

    const response = await fetch(`/api/cart/add/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
            quantity: 1,
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

// const cartMainFuntion = async () => {

//     // Variables for all the the product information on the wishlist page
//     const productId = document.getElementById("product-id").value
//     const userId = document.getElementById("to-cart").value
// console.log(productId, userId)
//     const response = await fetch(`/api/cart/add/${userId}`, {
//         method: 'POST',
//         body: JSON.stringify({
//             quantity: 1,
//             product_id: productId
//         }),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     if (response.ok) {

//         document.location.replace('/api/cart');
//     } else {
//         alert('Failed to add to cart');
//     }

// }


const deleteAllFromCart = async () => {

    const id = document.getElementById("user-id").value

    const response = await fetch(`/api/cart/checkout/${id}`, {
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
        alert('Thank you for your purchase');
        document.location.replace('/api/cart');
    } else {
        alert('Failed to delete items from cart');
    }


}


const cart = document.querySelectorAll("#to-cart");
cart.forEach(btn => {
    btn.addEventListener('click', toCart);
});


// const cartMain = document.querySelectorAll(".btn-dark");
// cartMain.forEach(btn => {
//     btn.addEventListener('click', cartMainFuntion);
// });

const heartButton = 
document.getElementById("wishlist-btn")
.addEventListener("click", addToWishlist)