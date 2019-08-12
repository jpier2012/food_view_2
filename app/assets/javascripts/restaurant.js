$(function() {
  const BASE_URL = "http://localhost:3000"
  
  $(".js-get-restaurants").on("click", function(event) {
    event.preventDefault();
    let index = document.querySelector(".js-show-restaurants");

    // this needs to be corrected to just render json from the controller

    fetch(BASE_URL + "/restaurants/all.json")
    .then(response => response.json())
    .then(restaurants => {
      index.innerHTML += "<ul>"
        restaurants.map(restaurant => {
          index.innerHTML += `<li>${restaurant.name}</li>`;
      });
      index.innerHTML += "</ul>"
    });
  });

});