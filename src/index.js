// Fetch ramen data from db.json
const fetchRamenData = async () => {
  const response = await fetch('./db.json');
  const data = await response.json();
  return data.ramens;
};

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const nameDisplay = document.querySelector('.name');
  const restaurantDisplay = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameDisplay.textContent = ramen.name;
  restaurantDisplay.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission
      const name = document.getElementById('new-name').value;
      const restaurant = document.getElementById('new-restaurant').value;
      const image = document.getElementById('new-image').value;
      const rating = document.getElementById('new-rating').value;
      const comment = document.getElementById('new-comment').value;

      const newRamen = {
          id: Date.now(), // Unique ID based on timestamp
          name,
          restaurant,
          image,
          rating: Number(rating), // Ensure rating is a number
          comment,
      };

      // Add new ramen to the menu
      displayNewRamen(newRamen);

      // Clear input fields
      form.reset();
  });
};

const displayNewRamen = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const ramenDiv = document.createElement('div');
  ramenDiv.className = 'ramen-item';
  ramenDiv.innerHTML = `
      <img src="${ramen.image}" alt="${ramen.name}" />
      <h4>${ramen.name}</h4>
  `;
  ramenDiv.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(ramenDiv);
};

const displayRamens = async () => {
  const ramens = await fetchRamenData();
  const ramenMenu = document.getElementById('ramen-menu');
  ramens.forEach(ramen => {
      const ramenDiv = document.createElement('div');
      ramenDiv.className = 'ramen-item';
      ramenDiv.innerHTML = `
          <img src="${ramen.image}" alt="${ramen.name}" />
          <h4>${ramen.name}</h4>
      `;
      ramenDiv.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(ramenDiv);
  });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
