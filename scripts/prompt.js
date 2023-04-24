var host = "localhost:8000";
// button for restaurants
let startRes = document.getElementById('restaurant-button');
startRes.addEventListener("click", () => {
  window.location.href = 'maps/index.html';
  
});

// button for study places
let startStudy = document.getElementById('study-button');
startStudy.addEventListener("click", () => {
  window.location.href = '/maps/index.html';
  //rename dist map/
  
});

// button for hobbies
let startHobbies = document.getElementById('hobbies-button');
startHobbies.addEventListener("click", () => {
  window.location.href = '/maps/index.html';
  
});

// button for places to explore
let startExplore = document.getElementById('explore-button');
startExplore.addEventListener("click", () => {
  window.location.href = "http://localhost:8000";
  
});