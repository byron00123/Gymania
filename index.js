// Define API URL
const API_URL = 'http://localhost:3000/workouts';

// Get elements
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#name');
const searchBtn = document.querySelector('#search-btn');
const workoutsList = document.querySelector('#workouts');
const createForm = document.querySelector('#create-form');
const createName = document.querySelector('#create-name');
const createImage = document.querySelector('#create-image');
const createEquipment = document.querySelector('#create-equipment');
const createDuration = document.querySelector('#create-duration');
const createBtn = document.querySelector('#create-btn');
const updateForm = document.querySelector('#update-form');
const updateId = document.querySelector('#id');
const updateName = document.querySelector('#update-name');
const updateImage = document.querySelector('#update-image');
const updateEquipment = document.querySelector('#update-equipment');
const updateDuration = document.querySelector('#update-duration');
const updateBtn = document.querySelector('#update-btn');
const deleteForm = document.querySelector('#delete-form');
const deleteId = document.querySelector('#id');
const deleteBtn = document.querySelector('#delete-btn');

// Search workouts by name
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  workoutsList.innerHTML = '';
  const name = searchInput.value;
  fetch(`${API_URL}?name=${name}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((workout) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        img.src = workout.image;
       h3.textContent = workout.name;
        p1.textContent = `Equipment: ${workout.equipment}`;
        p2.textContent = `Duration: ${workout.duration}s`;
        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(p1);
        li.appendChild(p2);
        workoutsList.appendChild(li);
     });
    })
    .catch((error) => console.log(error));
});



  


// Create workout
createForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = createName.value;
  const image = createImage.value;
  const equipment = createEquipment.value;
  const duration = createDuration.value;
  fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      image,
      equipment,
      duration,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});

// Update workout
updateForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const id = updateId.value;
	const name = updateName.value;
	const image = updateImage.value;
	const equipment = updateEquipment.value;
	const duration = updateDuration.value;
	fetch(`${API_URL}/${id}`, {
	method: 'PUT',
	headers: {
	'Content-Type': 'application/json',
	},
	body: JSON.stringify({
	name,
	image,
	equipment,
	duration,
	}),
	})
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
	});
	
	// Delete workout
	deleteForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const id = deleteId.value;
	fetch(`${API_URL}/${id}`, {
	method: 'DELETE',
	})
	.then((response) => response.json())
	.then((data)=> console.log(data))
	.catch((error) => console.log(error));
	});


	//render workouts
	//const workoutsList = document.querySelector('#workouts-list');

function renderWorkouts(workouts) {
  // Clear any existing workouts from the list
  workoutsList.innerHTML = '';

  // Loop through the workouts and create an li element for each one
  workouts.forEach((workout) => {
    const li = document.createElement('li');

    // Create an image element for the workout
    const img = document.createElement('img');
    img.src = workout.image;

    // Create a span element for the workout name and duration
    const span = document.createElement('span');
    span.textContent = `${workout.name} - ${workout.duration}s`;

    // Append the image and span to the li element
    li.appendChild(img);
    li.appendChild(span);

    // Append the li element to the workouts list
    workoutsList.appendChild(li);
  });
}

//render workout


fetch(API_URL)
  .then(response => response.json())
  .then(workouts => {
    const workoutsList = document.querySelector('#workouts-list');
    
    // Clear any existing workouts in the list
    workoutsList.innerHTML = '';
    
    // Loop through each workout and create an HTML element for it
    workouts.forEach(workout => {
      const workoutElem = document.createElement('li');
      workoutElem.innerHTML = `
        <div class="workout-item">
          <img src="${workout.image}" alt="${workout.name}">
          <h3>${workout.name}</h3>
          <p>Equipment: ${workout.equipment}</p>
          <p>Duration: ${workout.duration}s</p>
        </div>
      `;
      
      // Add the workout element to the workouts list
      workoutsList.appendChild(workoutElem);
    });
  })
  .catch(error => {
    console.error('Error fetching workouts:', error);
  });
