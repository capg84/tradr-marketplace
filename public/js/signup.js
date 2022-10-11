const signupFormHandler = async (event) => {
    console.log("Sign up button clicked");
    event.preventDefault();

    const name = document.querySelector('#inputName2').value.trim();
    const email = document.querySelector('#inputEmail2').value.trim();
    const password = document.querySelector('#inputPassword2').value.trim();
  
    if (name && email && password) {
        console.log(name + email + password);
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert("Please check sign up details");
      }
    }
  };
  
document
.querySelector('.signup-parent')
.addEventListener('submit', signupFormHandler);