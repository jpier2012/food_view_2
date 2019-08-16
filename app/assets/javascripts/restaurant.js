$(function() { 
  const BASE_URL = "http://localhost:3000"

  $('.js-display-create-form').on('click', function (event) {
    displayCreateForm();
  });

  getRestaurants();

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
        </table>
        <br>
        <input type="submit" value="Submit"/>
      </form>
      <div class="js-new-restaurant">
      </div>
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
      dress_code: document.getElementById('dress_code').value
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
        let display = document.querySelector('.js-new-restaurant');
        display.innerHTML += `
          <ul>
            <li>Name: ${restaurant.name}</li>
            <li>Address: ${restaurant.address}</li>
            <li>Cuisine: ${restaurant.cuisine}</li>
            <li>Dress Code: ${restaurant.dress_code}</li>
          </ul>
          `
          index.innerHTML = '';
          getRestaurants();
      });
  }

  function getRestaurants() {
    fetch(BASE_URL + "/restaurants/all")
      .then(response => response.json())
      .then(restaurants => {
        restaurants.map(restaurant => {
          index.innerHTML += `
            <h2>${restaurant.name}</h2>
            <h4>${restaurant.address}</h4>
            <input type="button" data-id="${restaurant.id}" class="js-restaurant-details" value="See Details">
            <br>
            <br>
            <div id="restaurant-${restaurant.id}">
            </div>
            <br>
            <hr>
            <br>
          `
        });
        $('.js-restaurant-details').on('click', function () {
          getDetails(this.dataset.id);
        });
    });
  }

  function getDetails(id) {
    let display = document.querySelector(`#restaurant-${id}`);
    fetch(BASE_URL + "/restaurants/" + id)
      .then(response => response.json())
      .then(restaurant => {
          let newR = new RestaurantItem(restaurant);
          display.innerHTML = newR.renderDetails();
          $('.js-restaurant-dishes').on('click', function () {
            newR.renderDishes();
          });
      });
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
      this.dishes = restaurant.dishes;
    }

    yes(label, attribute) {
      if (attribute === true) {
        return `<tr><td><strong><em style="color:darkblue">${label}</em></strong></td></tr>`;
      } else {
        return "";
      }
    }

    renderDetails() {
      return `
      <table>
        <tr>
            <td>Cuisine: </td>
            <td>${this.cuisine}</td>
        </tr>
        <tr>
            <td>Dress Code:</td>
            <td>${this.dress_code}</td>
        </tr>
        ${this.yes("Outdoor Seating", this.outdoor_seating)}
        ${this.yes("Child Friendly", this.child_friendly)}
        ${this.yes("BYOB", this.byob)}
        ${this.yes("Open Bar", this.open_bar)}
      </table>
      <br>
      <input type="button" data-id="${this.id}" class="js-restaurant-dishes" value="See Dishes">
      <br>
      <br>
      <table id="restaurant-${this.id}-dishes">
      </table>
      `
    }

    renderDishes() {
      let display = document.querySelector(`#restaurant-${this.id}-dishes`);

      if (this.dishes.length != 0) {
        this.dishes.forEach(dish => {
          display.innerHTML += `
            <tr>
              <td>${dish.name}:</td>
              <td>$${dish.price}</td>
            </tr>
            `
        });
      } else {
        display.innerHTML += "<em>No dishes have been created for this restaurant.</em>"
      }
    }
  }
});