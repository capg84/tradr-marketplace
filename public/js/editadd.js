const editFormHandler = async function(event) {
  event.preventDefault();

  const address_line1 = document.querySelector('#inputAddress"]').value;
  const address_line2 = document.querySelector('#inputAddress2"]').value;
  const city = document.querySelector('#inputCity"]').value;
  const county = document.querySelector('#inputCounty"]').value;
  const post_code = document.querySelector('#inputPostcode"]').value;
  const address_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  await fetch(`/api/post/${address_id}`, {
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

  document.location.replace('/dashboard/addresses');
};

document
  .querySelector('.edit-address-form')
  .addEventListener('submit', editFormHandler);