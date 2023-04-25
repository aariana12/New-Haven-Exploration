var host = "localhost:8000";

// button for restaurants
let startRes = document.getElementById('restaurant-button');
startRes.addEventListener("click", () => {
  document.location.href = 'maps/index.html';
  
});

// button for study places
let startStudy = document.getElementById('study-button');
startStudy.addEventListener("click", () => {
  window.location.href = '/maps_study/index.html';
});

// button for hobbies
let startHobbies = document.getElementById('hobbies-button');
startHobbies.addEventListener("click", () => {
  window.location.href = '/maps_hobbies/index.html';
  
});

// button for places to explore
let startExplore = document.getElementById('explore-button');
startExplore.addEventListener("click", () => {
  window.location.href = "/maps_explore/index.html";

});

// button for home
let home = document.getElementById('home-button');
home.addEventListener("click", () => {
  document.location.href = 'index.html';
  
});