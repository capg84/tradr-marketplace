
// Deletes item from cart
const deleteFromCart = async () => {

    const id = document.getElementById("user-id").value

    const response = await fetch (`/api/cart/delete/`, {
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
        alert('Failed to delete items from cart');
    }


}



const totalPrice = () => {


const price = document.querySelector(".product-price").value
const quantity = document.querySelector(".product-price").value   
const totalPrice = price * quantity 

document.querySelector("total-price").innerHTML = totalPrice

}


const checkoutButton = document.getElementById("checkout-btn").addEventListener("click", deleteFromCart)