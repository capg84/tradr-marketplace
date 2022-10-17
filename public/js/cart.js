
// Deletes one item from cart
const deleteItemFromCart = async (event) => {

   if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');


    const response = await fetch(`/api/cart/delete/${id}`, {
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
        document.location.replace('/api/cart');
    } else {
        alert('Failed to delete items from cart');
    }
}
}


// Deletes all items from cart
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



// event listeners for buttons
const xButtons = document.querySelectorAll('#x-button');
xButtons.forEach(btn => {
    btn.addEventListener('click', deleteItemFromCart);
});

const checkoutButton =
    document.querySelector(".checkout-btn")
        .addEventListener("click", deleteAllFromCart)


