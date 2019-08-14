$(function() {
  const BASE_URL = "http://localhost:3000"
  
  $(".js-get-restaurants").on("click", function(event) {
    event.preventDefault();
    let index = document.querySelector(".js-show-restaurants");

    // this needs to be corrected to just render json from the controller

    fetch(BASE_URL + "/restaurants/all.json")
    .then(response => response.json())
    .then(restaurants => {
      index.innerHTML += "<p>";
        restaurants.map(restaurant => {
          let newR = new RestaurantItem(restaurant);
          index.innerHTML += newR.renderRestaurant();
      });
      index.innerHTML += "</p>";
    });
  });

  $(".js-get-restaurant").on("click", function (event) {
    event.preventDefault();
    let id = $(this).data("id")
    let show = document.querySelector(".js-show-restaurant");

    fetch(BASE_URL + "/restaurants/" + id + ".json")
      .then(response => response.json())
      .then(restaurant => {
        let newR = new RestaurantItem(restaurant);
        show.innerHTML += `<p>${newR.renderRestaurant()}</p>`;
      });
  });

  class RestaurantItem {
    constructor(restaurant) {
      this.id = restaurant.id
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
            <td><strong>Name: </strong></td>
            <td><strong><a href="/restaurants/${this.id}" data-id="${this.id}">${this.name}</a></strong></td>
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
      <br>
      `
    }
  }

  class DishItem {
    constructor(dish) {
      this.id = dish.id
      this.name = dish.name
      this.description = dish.description
      this.taste = dish.taste
      this.overall_value = dish.overall_value
      this.dining_experience = dish.dining_experience
      this.user_id = dish.user_id
      this.restaurant_id = dish.restaurant_id
    }
  }
});