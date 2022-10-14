const addToWishlist = async () => {
console.log("hello")

    const productId = document.getElementById("wishlist-btn").value
    const userId = document.getElementById("productname").value

    
    const response = await fetch(`/api/wishlist/add/${productId}`, {
        method: 'POST',
        body: JSON.stringify({
            product_id: productId,
    
            
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Added to wishlist');
    }

}




const heartButton = document.getElementById("wishlist-btn").addEventListener("click", addToWishlist)