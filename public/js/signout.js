const dropdownItems = document.querySelectorAll('.dropdown-menu .homedropdown');
dropdownItems.forEach(item => {
    const id = item.getAttribute('id');
    if (id === 'signout-btn') {
        signout();
    }
})

async function signout () {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
};