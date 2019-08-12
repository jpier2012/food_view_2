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
          newR = new Restaurant(restaurant)
          index.innerHTML += "<li>"
          index.innerHTML += newR.renderRestaurant();
          index.innerHTML += "</li>";
      });
      index.innerHTML += "</ul>"
    });
  });

  class Restaurant {
    constructor(restaurant) {
      this.name = restaurant.name
      this.address = restaurant.address
      this.cuisine = restaurant.cuisine
      this.dress_code = restaurant.dress_code
      this.outdoor_seating = restaurant.outdoor_seating
      this.child_friendly = restaurant.child_friendly
      this.open_bar = restaurant.open_bar
      this.byob = restaurant.byob
      this.created_by = restaurant.created_by
    }

    renderRestaurant() {
      return `
      <table>
        <tr>
            <td>Name: </td>
            <td>${this.name}</td>
        </tr>
        <tr>
            <td>Address: </td>
            <td>${this.address}</td>
        </tr>
        <tr>
            <td>Cuisine: </td>
            <td>${this.cuisine}</td>
        </tr>
        <tr>
            <td>Dress Code:</td>
            <td>${this.dress_code}</td>
        </tr>
        <tr>
            <td>Outdoor Seating: </td>
            <td>${this.outdoor_seating}</td>
        </tr>
        <tr>
            <td>Child Friendly: </td>
            <td>${this.child_friendly}</td>
        </tr>
        <tr>
            <td>BYOB: </td>
            <td>${this.byob}</td>
        </tr>
        <tr>
            <td>Open Bar: </td>
            <td>${this.open_bar}</td>
        </tr>
      </table>      
      `
    }

  }

});