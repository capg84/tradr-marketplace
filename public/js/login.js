const loginFormHandler = async function(event) {
  event.preventDefault();
  
    const emailEl = document.querySelector('#inputEmail');
    const passwordEl = document.querySelector('#inputPassword');
  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email: emailEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {

      // If successful, redirect the browser to the dashboard page

      document.location.replace('/dashboard');
    } else {
      alert('Failed to login');
    }
};
  
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
  