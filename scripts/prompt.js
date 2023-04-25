var host = "localhost:8000";
let type_page = "study";

// button for restaurants
let startRes = document.getElementById('restaurant-button');
startRes.addEventListener("click", () => {
  type_page = "restaurants";
  window.location.href = '/maps/index.html';
  
});

// button for study places
let startStudy = document.getElementById('study-button');
startStudy.addEventListener("click", () => {
  type_page = "study";
  window.location.href = '/maps_study/index.html';
  //rename dist map/
  
});

// button for hobbies
let startHobbies = document.getElementById('hobbies-button');
startHobbies.addEventListener("click", () => {
  // type_page = "hobbies";
  window.location.href = '/maps_hobbies/index.html';
  
});

// button for places to explore
let startExplore = document.getElementById('explore-button');
startExplore.addEventListener("click", () => {
  type_page = "explore";
  window.location.href = "/maps_explore/index.html";
  
});