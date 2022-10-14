const newFormHandler = async function(event) {
    event.preventDefault();
  
    const address_line1 = document.querySelector('#inputAddress"]').value;
    const address_line2 = document.querySelector('#inputAddress2"]').value;
    const city = document.querySelector('#inputCity"]').value;
    const county = document.querySelector('#inputCounty"]').value;
    const post_code = document.querySelector('#inputPostcode"]').value;
  
    await fetch(`/api/addresses`, {
      method: 'POST',
      body: JSON.stringify({
        address_line1,
        address_line2,
        city,
        county,
        post_code,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard/addresses');
};
  
document
 .querySelector('.new-address-form')
 .addEventListener('submit', newFormHandler);
  