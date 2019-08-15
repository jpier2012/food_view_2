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
        index.innerHTML += `
            <h2>${restaurant.name}</h2>
            <h4>${restaurant.address}</h4>
            <input type="button" data-id="${restaurant.id}" class="js-restaurant-details" value="See Details">
            <br>
            <div id="restaurant-${restaurant.id}">
            </div>
            <br>
            <hr>
            <br>
          `

        document.getElementById(`restaurant-${restaurant.id}`).scrollIntoView();
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

    outdoorSeatingYes() {
      if (this.outdoor_seating === true) {
        return `<tr><td><strong><em style="color:darkblue">Outdoor Seating</em></strong></td></tr>`;
      } else {
        return "";
      }
    }

    childFriendlyYes() {
      if (this.child_friendly === true) {
        return `<tr><td><strong><em style="color:darkblue">Child Friendly</em></strong></td></tr>`;
      } else {
        return "";
      }
    }

    byobYes() {
      if (this.byob === true) {
        return `<tr><td><strong><em style="color:darkblue">BYOB</em></strong></td></tr>`;
      } else {
        return "";
      }
    }

    openBarYes() {
      if (this.open_bar === true) {
        return `<tr><td><strong><em style="color:darkblue">Open Bar</em></strong></td></tr>`;
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
        ${this.outdoorSeatingYes()}
        ${this.childFriendlyYes()}
        ${this.byobYes()}
        ${this.openBarYes()}
      </table>
      <br>
      <input type="button" data-id="${this.id}" class="js-restaurant-dishes" value="See Dishes">
      <div id="restaurant-${this.id}-dishes">
      </div>
      `
    }

    renderDishes() {
      let display = document.querySelector(`#restaurant-${this.id}-dishes`);
      display.innerHTML += '<ul>'
      this.dishes.forEach(dish => {
        display.innerHTML += `<li>${dish.name}: $${dish.price}</li>`
      });
      display.innerHTML += '</ul>'
    }
  }
});