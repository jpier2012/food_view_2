$(function() { 
  const BASE_URL = "http://localhost:3000"

  $('.js-display-create-form').on('click', function (event) {
    displayCreateForm();
  });

  getRestaurants();

  let index = $('.js-restaurant-index')[0];

  $('.js-filter-created-by-user').on('click', function () {
    getRestaurants("createdByUser");
  });

  $('.js-filter-places-eaten').on('click', function () {
    getRestaurants("placesEaten");
  });

  $('.js-filter-all').on('click', function () {
    getRestaurants();
  });

  function displayCreateForm() {
    let form = $('.js-restaurant-form')[0];
    
    function formRow(label, id) {
      return `<tr>
                <td>${label}:</td>
                <td><input type="text" id="${id}"></td>
              </tr>`
    }

    let html = `
      <br>
      <form id="restaurant-form">
        <table>
          ${formRow("Name", "name")}
          ${formRow("Address", "address")}
          ${formRow("Cuisine", "cuisine")}
          ${formRow("Dress Code", "dress_code")}
        </table>
        <br>
        <input type="submit" value="Submit" id="button">
      </form>
      <div class="js-new-restaurant">
      </div>
    `
    form.innerHTML = html;

    $('#restaurant-form').on('submit', function (event) {
      event.preventDefault();
      createRestaurant();
    })
  }

  function createRestaurant() {
    const restaurant = {
      name: $('#name')[0].value,
      address: $('#address')[0].value,
      cuisine: $('#cuisine')[0].value,
      dress_code: $('#dress_code')[0].value
    }

    fetch(BASE_URL + "/restaurants", {
      method: 'POST',
      body: JSON.stringify(restaurant),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': $("[name='csrf-token']")[0].content
      }
    }).then(response => response.json())
      .then(restaurant => {
        alert("Restaurant created!");
        let newR = new RestaurantItem(restaurant);
        let display = $('.js-new-restaurant');
        display.innerHTML = `
          <ul>
            <li>Name: ${restaurant.name}</li>
            <li>Address: ${restaurant.address}</li>
            <li>Cuisine: ${restaurant.cuisine}</li>
            <li>Dress Code: ${restaurant.dress_code}</li>
          </ul>
          `
          getRestaurants();
      });
  }

  function getRestaurants(userFilter) {
    fetch(BASE_URL + "/restaurants.json")
      .then(response => response.json())
      .then(restaurants => {
        let restaurantArr = [];
        let userId = parseInt($('#current-user')[0].value, 10);
        index.innerHTML = '';

        if (userFilter === "createdByUser") {
          restaurantArr = restaurants.filter(restaurant => {
            return restaurant.created_by_id === userId;
          })
          mapRestaurants(restaurantArr);
          $('h1')[0].innerHTML = "Restaurants You've Created"

        } else if (userFilter === "placesEaten") {
          fetch(BASE_URL + "/users/" + userId + ".json")
          .then(response => response.json())
          .then(user => {
            // the simplest method of obtaining an array of unique restaurants associated to a user,
            // in this context, is through the .uniq method in Ruby. I enabled this on thes User model via the unique_restaurants method.  
            mapRestaurants(user.unique_restaurants);
          })
          $('h1')[0].innerHTML = "Places You've Eaten"

        } else {
          mapRestaurants(restaurants);
          $('h1')[0].innerHTML = "All Restaurants"
        };
    });
  }

  function mapRestaurants(restaurants) {
    restaurants.map(restaurant => {
      index.innerHTML += `
        <h2>${restaurant.name}</h2>
        <h4>${restaurant.address}</h4>
        <input type="button" id="button" data-id="${restaurant.id}" class="js-restaurant-details" value="See Details">
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
  }

  function getDetails(id) {
    let display = $(`#restaurant-${id}`)[0];
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
      this.created_by_id = restaurant.created_by_id;
      this.created_by_email = restaurant.created_by_email;
      this.dishes = restaurant.dishes;
    }

    static tr(label, attribute) {
        return `<tr>
                  <td>${label}:</td>
                  <td>${attribute}</td>
                </tr>`;
    }

    static boolYes(label, attribute) {
      if (attribute === true) {
        return `<tr>
                  <td><strong><em style="color:darkblue">${label}</em></strong></td>
                </tr>`;
      } else {
        return "";
      }
    }

    renderDetails() {
      return `
      <table>
        ${this.constructor.tr("Cuisine", this.cuisine)}
        ${this.constructor.tr("Dress Code", this.dress_code)}
        ${this.constructor.tr("Created By", this.created_by_email)}
        ${this.constructor.boolYes("Outdoor Seating", this.outdoor_seating)}
        ${this.constructor.boolYes("Child Friendly", this.child_friendly)}
        ${this.constructor.boolYes("BYOB", this.byob)}
        ${this.constructor.boolYes("Open Bar", this.open_bar)}
      </table>
      <br>
      <a href="/restaurants/${this.id}/edit" id="button">Edit Restaurant Details</a>
      <br>
      <br>
      <input id="button" type="button" data-id="${this.id}" class="js-restaurant-dishes" value="See Dishes">
      <br>
      <br>
      <table id="restaurant-${this.id}-dishes">
      </table>
      `
    }

    renderDishes() {
      let display = $(`#restaurant-${this.id}-dishes`)[0];
      display.innerHTML = '';

      if (this.dishes.length != 0) {
        this.dishes.forEach(dish => {
          display.innerHTML += `${this.constructor.tr(dish.name, `$${dish.price}`)}`
        });
      } else {
        display.innerHTML = "<em>No dishes have been created for this restaurant.</em>"
      }
    }
  }
});