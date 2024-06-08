// write your code here 


document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000/ramens";
  
  const ramenMenu = document.getElementById('ramen-menu');
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');
  const newRamenForm = document.getElementById('new-ramen');
  
  // Fetch and display all ramens
  fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(data => {
      data.forEach(ramen => renderRamenMenuItem(ramen));
      if (data.length > 0) {
        displayRamenDetails(data[0]); // Display details of the first ramen
      }
    });

  // Function to render ramen menu item
  function renderRamenMenuItem(ramen) {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener('click', () => displayRamenDetails(ramen));
    ramenMenu.appendChild(img);
  }

  // Function to display ramen details
  function displayRamenDetails(ramen) {
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
  }

  // Handle new ramen form submission
  newRamenForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
    };

    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamen)
    })
    .then(response => response.json())
    .then(ramen => {
      renderRamenMenuItem(ramen);
      newRamenForm.reset();
    });
  });
});
