$(function() { 
  const BASE_URL = "http://localhost:3000"

  $('.js-display-create-form').on('click', function (event) {
    displayCreateForm();
  });

  getRestaurants();

  $('.js-restaurant-detail').on('click', function (event) {
    event.preventDefault();
    let id = $(this).data("id");
    displayRestaurant(id);
  });

  let index = document.querySelector('.js-restaurant-index');

  function displayCreateForm() {
    let form = document.querySelector('.js-restaurant-form');
    let html = `
      <br>
      <form id="restaurant-form">
        <table>
          <tr>
              <td>Name: </td>
              <td><input type="text" id="name"></td>
          </tr>
          <tr>
              <td>Address: </td>
              <td><input type="text" id="address"></td>
          </tr>
          <tr>
              <td>Cuisine: </td>
              <td><input type="text" id="cuisine"></td>
          </tr>
          <tr>
              <td>Dress Code: </td>
              <td><input type="text" id="dress_code"></td>
          </tr>
          <tr>
              <td>Outdoor Seating: </td>
              <td><input type="checkbox" id="outdoor_seating" value="true"></td>
          </tr>
          <tr>
              <td>Child Friendly: </td>
              <td><input type="checkbox" id="child_friendly" value="true"></td>
          </tr>
          <tr>
              <td>BYOB: </td>
              <td><input type="checkbox" id="byob" value="true"></td>
          </tr>
          <tr>
              <td>Open Bar: </td>
              <td><input type="checkbox" id="open_bar" value="true"></td>
          </tr>
        </table>
        <br>
        <input type="submit" value="Submit"/>
      </form>
    `
    form.innerHTML = html;

    document.getElementById('restaurant-form').addEventListener('submit', function (event) {
      event.preventDefault();
      createRestaurant();
    })
  }

  function createRestaurant() {
    const restaurant = {
      name: document.getElementById('name').value,
      address: document.getElementById('address').value,
      cuisine: document.getElementById('cuisine').value,
      dress_code: document.getElementById('dress_code').value,
      outdoor_seating: document.getElementById('outdoor_seating').value,
      child_friendly: document.getElementById('child_friendly').value,
      byob: document.getElementById('byob').value,
      open_bar: document.getElementById('open_bar').value
    }

    fetch(BASE_URL + "/restaurants", {
      method: 'POST',
      body: JSON.stringify(restaurant),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content
      }
    }).then(response => response.json())
      .then(restaurant => {
        alert("Restaurant created!");
        let newR = new RestaurantItem(restaurant);
        index.innerHTML += newR.renderDetails();

        document.getElementById(`restaurant-${restaurant.id}`).scrollIntoView();
      });
  }

  function getRestaurants() {
    fetch(BASE_URL + "/restaurants/all.json")
      .then(response => response.json())
      .then(restaurants => {
        restaurants.map(restaurant => {
          let newR = new RestaurantItem(restaurant);
          index.innerHTML += newR.renderDetails();
        });
        $('.js-restaurant-dishes').on('click', function () {
          let id = $(this).data("id");
          displayRestaurant(id);
        });
      });
  }

  function displayRestaurant(id) {
    let display = document.querySelector(`#restaurant-${id}`);
    console.log(id);

    fetch(BASE_URL + "/restaurants/" + id + ".json")
      .then(response => response.json())
      .then(restaurant => {
        console.log(restaurant);
        console.log(display);
        let newR = new RestaurantItem(restaurant);
        display.innerHTML = newR.renderDetails();
      })
  }

  class RestaurantItem {
    constructor(restaurant) {
      this.id = restaurant.id;
      this.name = restaurant.name;
      this.address = restaurant.address;
      this.cuisine = restaurant.cuisine;
      this.dress_code = restaurant.dress_code;
      this.outdoor_seating = restaurant.outdoor_seating;
      this.child_friendly = restaurant.child_friendly;
      this.open_bar = restaurant.open_bar;
      this.byob = restaurant.byob;
      this.created_by = restaurant.created_by;
    }

    renderDetails() {
      return `
      <h2>${this.name}</h2>
      <table>
        <tr>
            <td>Address:</td>
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
      <input type="button" data-id="${this.id}" class="js-restaurant-dishes" value="See Dishes">
      <div id="restaurant-${this.id}">
      </div>
      <br>
      <hr>
      <br>
      `
    }
  }

  // class DishItem {
  //   constructor(dish) {
  //     this.id = dish.id
  //     this.name = dish.name
  //     this.description = dish.description
  //     this.taste = dish.taste
  //     this.overall_value = dish.overall_value
  //     this.dining_experience = dish.dining_experience
  //     this.user_id = dish.user_id
  //     this.restaurant_id = dish.restaurant_id
  //   }
  // }

});