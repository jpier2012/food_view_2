$(function() { 
    const BASE_URL = "http://localhost:3000"

    $('.js-get-restaurants').on('click', function(event) {
      getRestaurants();
    });

    // $('.js-display-create-form').on('click', function (event) {
    //   displayCreateForm();
    // });

    // $('.js-restaurant-detail').on('click', function (event) {
    //   event.preventDefault();
    //   let id = $(this).data("id");
    //   displayRestaurant(id);
    // });

  function getRestaurants() {
    let index = document.querySelector('.js-restaurant-index');

    index.innerHTML = "<ul>";
    fetch(BASE_URL + "/restaurants/all.json")
      .then(response => response.json())
      .then(restaurants => {
        restaurants.map(restaurant => {
          // index.innerHTML += `<li><a href="#" data-id="${restaurant.id}" onclick="displayRestaurant(); return false;" id="restaurant-${restaurant.id}">${restaurant.name}</a></li>`
          
          index.innerHTML += `<li><input type="button" data-id="${restaurant.id}" class="js-restaurant-detail" value="${restaurant.name}"></li>`
          index.innerHTML += `<div id="restaurant-${restaurant.id}"></div><br><br>`

          // let resLink = document.querySelector(`input#restaurant-${restaurant.id}`)
          // console.log(resLink);
          // resLink.addEventListener('click', function(event) {
          //   console.log("here");
          //   event.preventDefault();
          //   displayRestaurant(restaurant.id);
          // });
        });
        index.innerHTML += "</ul>";
        $('.js-restaurant-detail').on('click', function () {
          let id = $(this).data("id");
          displayRestaurant(id);
        });
      });
  }

  // function displayCreateForm() {
  //   let form = document.querySelector('.js-restaurant-form');
  //   let html = `
  //     <form id="restaurant-form">
  //       Name: <input type="text" id="name"/><br>
  //       Cuisine: <input type="text" id="cuisine"/><br>
  //       <input type="submit" value="Create Restaurant"/>
  //     </form>
  //   `
  //   form.innerHTML = html;

  //   document.getElementById('restaurant-form').addEventListener('submit', function(event) {
  //     event.preventDefault();
  //     createRestaurant();
  //   })
  // }

  // function createRestaurant() {
  //   const restaurant = {
  //     name: document.getElementById('name').value,
  //     cuisine: document.getElementById('cuisine').value
  //   }

  //   fetch(BASE_URL + "/restaurants", {
  //     method: 'POST',
  //     body: JSON.stringify(restaurant),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content
  //     }
  //   }).then(response => response.json())
  //   .then(restaurant => {
  //     let newR = new RestaurantItem(restaurant);
  //     document.querySelector('.js-new-restaurant-display').innerHTML = newR.renderRestaurant();
  //     alert("Restaurant created!");
  //   });
  // }

  // function displayRestaurant(id) {
  //   let display = document.querySelector(`#restaurant-${id}`);
  //   console.log(id);

  //   fetch(BASE_URL + "/restaurants/" + id + ".json")
  //     .then(response => response.json())
  //     .then(restaurant => {
  //       console.log(restaurant);
  //       console.log(display);
  //       let newR = new RestaurantItem(restaurant);
  //       display.innerHTML = newR.renderRestaurant();
  //     })
  // }

  // function attachClickToRestaurantButtons() {
  //   let restaurants = $(".js-restaurant-detail");
  //   console.log(restaurants);
  //   // restaurants.forEach( r => {
  //   //   r.addEventListener("click", displayRestaurant);
  //   // })
  // }

  // window.addEventListener('load', function() {
  //   attachClickToRestaurantButtons();
  // })

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
      <br>
      <hr>
      <br>
      <table>
        <tr>
            <td><strong>Name: </strong></td>
            <td><strong><a href="#" data-id="${this.id}">${this.name}</a></strong></td>
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
      <hr>
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