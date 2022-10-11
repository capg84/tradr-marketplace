const signupFormHandler = async (event) => {
    console.log("Sign up button clicked");
    event.preventDefault();

    const first_name = document.querySelector('#inputFName').value.trim();
    const last_name = document.querySelector('#inputLName').value.trim();
    const email = document.querySelector('#inputEmail2').value.trim();
    const password = document.querySelector('#inputPassword2').value.trim();
  
    if (first_name && last_name && email && password) {
        console.log(first_name + last_name + email + password);
        const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, password, first_name, last_name }),
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