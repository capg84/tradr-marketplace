const editFormHandler = async function(event) {
  event.preventDefault();

  const address_line1 = document.querySelector('#inputAddress').value;
  const address_line2 = document.querySelector('#inputAddress2').value;
  const city = document.querySelector('#inputCity').value;
  const county = document.querySelector('#inputCounty').value;
  const post_code = document.querySelector('#inputPostcode').value;

  if (event.target.hasAttribute('data-id')) {
  const id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/addresses/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      address_line1,
      address_line2,
      city,
      county,
      post_code,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/dashboard/addresses');
  } else {
    alert("Error");
  }
}};

document
.querySelector('#edit-add')
.addEventListener('click', editFormHandler);