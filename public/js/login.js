const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();
  console.log(email, password)
  if (email && password) {

    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login/', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page

      document.location.replace('/dashboard');
    } else {
      alert("Please check log in details");
    }
  }
};

document
  .getElementById('login')
  .addEventListener('click', loginFormHandler);


