// called when the submit button is clicked
const searchHandler = function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    let inputArr = [];
    const input = document.getElementById("item-input").value;
    inputArr = input.split(" ").join("|");
    console.log(input);
    console.log(inputArr);
    document.location.replace(`/search/${input}`);
  
/*     if (input) {
      getCityApi(city);
      cityInputEl.value = "";
    } else {
      $(".first").modal("show"); // changed to modal
    } */
  };

  document.querySelector('#search-btn').addEventListener('click', searchHandler);