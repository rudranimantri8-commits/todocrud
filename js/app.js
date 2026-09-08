
const  movieContainer = document.getElementById("moviecontainer");
const addMovieBtn = document.getElementById("addMovieBtn");
const backdrop = document.getElementById("backdrop");
const movieForm = document.getElementById("movieForm");
const movietitle = document.getElementById('movietitle')
const closeFormBtn = document.querySelectorAll(".closeForm");

const movieAddBtn = document.getElementById("movieAddbtn");
const movieName = document.getElementById("MovieName");
const movieImg = document.getElementById("MovieImg");
const movieDesciption = document.getElementById("MovieDesciption");
const movieRating = document.getElementById("movieRating");

const updateMovieBtn = document.getElementById("updateMovieBtn");
const cancel = document.getElementById("cancel");


// DEFAULT MOVIES
let defaultMovies = [
  {
    movieName: "Maharaja",
    movieImg:
      "https://tse2.mm.bing.net/th/id/OIP.m8CFbOuO8_xyNKhu5PHaegHaJ3?r=0&pid=Api&h=220&P=0",
    movieRating: "5",
    movieDesciption:
      "A barber seeks vengeance after his home is burglarized, cryptically telling police his Lakshmi has been taken .",
    movieId: "01",
  },

  {
    movieName: "Interstellar",
    movieImg:
      "https://www.framestore.com/sites/default/files/2022-07/interstellar%20cinematic%20vr%20experience%20header%20image.jpg",
    movieRating: "3",
    movieDesciption:
      "A team of astronauts travels through space to find a new home for humanity.",
    movieId: "02",
  },

  {
    movieName: "Inception",
    movieImg:
      "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    movieRating: "2",
    movieDesciption:
      "A skilled thief enters people's dreams to steal valuable information.",
    movieId: "03",
  },

  {
    movieName: "The Lion King",
    movieImg:
      "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_.jpg",
    movieRating: "5",
    movieDesciption:
      "A young lion learns to accept his responsibility as the future king.",
    movieId: "04",
  },

  {
    movieName: "3 Idiots",
    movieImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjpLlJDLtzWS3km_mWG7bHQvdWqsCts4lCitDHDo7J52gvib0OeEBoATQ7&s=10",
    movieRating: "4",
    movieDesciption:
      "Three friends experience friendship, education, and the challenges of college life.",
    movieId: "05",
  },
];


// LOCAL STORAGE
let getMovies = localStorage.getItem("moviesArray");

let moviesArray;

if (getMovies) {
  moviesArray = JSON.parse(getMovies);
} else {
  moviesArray = defaultMovies;

  localStorage.setItem(
    "moviesArray",
    JSON.stringify(moviesArray)
  );
}

// SET LOCAL STORAGE
function setLocalStorage() {
  localStorage.setItem(
    "moviesArray",
    JSON.stringify(moviesArray)
  );
}

// RATING
function setRating(rating) {
    if (rating > 4) {
    return "badge-success";

  } else if (rating <= 4 && rating > 3) {
    return "badge-warning";

  } else {
    return "badge-danger";
  }
}

// SWEET ALERT
function snackBar(msg) {

  Swal.fire({
    text: msg,
    icon: "success",
    timer: 2500,
  });

}

// READ / RENDER MOVIES
function renderMovies(arr) {

  let res = "";

  arr.forEach((el) => {

    res += `
      <div class="col-md-3 mb-3">

        <div class="card movieCard" id="${el.movieId}">

          <div class="card-header d-flex justify-content-between">

            <h4 class="movieTitle">
              ${el.movieName}
            </h4>

            <h5>
              <span class="badge ${setRating(el.movieRating)}">
                ${el.movieRating}
              </span>
            </h5>

          </div>


          <div class="card-body">

            <figure class="py-0">

              <img
                src="${el.movieImg}"
                alt="${el.movieName}"
              >

              <figcaption>

                        <h5>${el.movieName}</h5>

                <p>
                  ${el.movieDesciption}
                </p>

              </figcaption>

            </figure>

          </div>


          <div class="card-footer d-flex justify-content-between">

            <button
              onclick="onMovieEditHandler(this)"
              class="btn btn-sm net-sec-btn">
              Edit
            </button>

            <button
              onclick="onMovieDeleteHandler(this)"
              class="btn btn-sm net-primary-btn">
              Delete
            </button>

          </div>

        </div>

      </div>
    `;
  });

  movieContainer.innerHTML = res;
}


// DISPLAY MOVIES
renderMovies(moviesArray);


// CREATE
function onMovieSubmitHandler(event) {

  event.preventDefault();

  const newMovie = {

    movieName: movieName.value,

    movieImg: movieImg.value,

    movieRating: Number(movieRating.value),

    movieDesciption: movieDesciption.value,

    movieId: Date.now().toString(),
  };


  moviesArray.unshift(newMovie);

  setLocalStorage();

  movieForm.reset();

  closeMovieForm();


  renderMovies(moviesArray);


  snackBar(
   ` New movie ${newMovie.movieName} added successfully.`
  );
}


// EDIT
function onMovieEditHandler(ele) {

  const editId =
    ele.closest(".movieCard").id;


  const editObj =
    moviesArray.find(
      (movie) => movie.movieId === editId
    );

    if(!editObj) {
        return;
    }

  localStorage.setItem("updateId", editId );


  // OPEN FORM
  backdrop.classList.add("active");

  movieForm.classList.add("active");


  // PATCH VALUES
  movieName.value = editObj.movieName;

  movieImg.value = editObj.movieImg;

  movieDesciption.value =
    editObj.movieDesciption;

  movieRating.value =
    editObj.movieRating;


  // BUTTONS
  movieAddBtn.classList.add("d-none");

  updateMovieBtn.classList.remove("d-none");

  movietitle.innerText = "Update Movie"
}


// UPDATE
function onMovieUpdateHandler() {

  const updateId =
    localStorage.getItem("updateId");


  const updatedObj = {

    movieName: movieName.value,

    movieImg: movieImg.value,

    movieDesciption:
      movieDesciption.value,

    movieRating:
      movieRating.value,

    movieId: updateId,
  };


  const updateIndex =
    moviesArray.findIndex(
      (movie) =>
        movie.movieId === updateId
    );
    if (updateIndex === -1) {
    return;
    }

  moviesArray[updateIndex] =
    updatedObj;


  setLocalStorage();


  // CLOSE FORM
  closeMovieForm();


  // SHOW ADD BUTTON
  movieAddBtn.classList.remove("d-none");

  updateMovieBtn.classList.add("d-none");


  // REFRESH UI
  renderMovies(moviesArray);


  snackBar(
    `Movie with id : ${updatedObj.movieId} is updated successfully`
  );
}


// DELETE
function onMovieDeleteHandler(ele) {

  const deleteId =
    ele.closest(".movieCard").id;


  const isConfirm = confirm(
    `Are you sure you want to delete movie with id : ${deleteId}`
  );


  if (isConfirm) {

    const deleteIndex =
      moviesArray.findIndex(
        (movie) =>
          movie.movieId === deleteId
      );


    moviesArray.splice(
      deleteIndex,
      1
    );
    setLocalStorage();


    // REFRESH UI
    renderMovies(moviesArray);


    snackBar(
      `Movie with id : ${deleteId} deleted successfully.`
    );
  }
}


// OPEN FORM
function openMovieForm() {

  backdrop.classList.add("active");

  movieForm.classList.add("active");

}


// CLOSE FORM
function closeMovieForm() {
  backdrop.classList.remove("active");

  movieForm.classList.remove("active");

  movieForm.reset();

  movieAddBtn.classList.remove("d-none");

  updateMovieBtn.classList.add("d-none");

}


// ADD MOVIE BUTTON
addMovieBtn.addEventListener(
  "click",
  function () {

    movieForm.reset();

    movieAddBtn.classList.remove("d-none");

    updateMovieBtn.classList.add("d-none");

    openMovieForm();
  }
);


// CLOSE BUTTONS
closeFormBtn.forEach(
  function (el) {

    el.addEventListener(
      "click",
      closeMovieForm
    );

  }
);


// FORM SUBMIT
movieForm.addEventListener(
  "submit",
  onMovieSubmitHandler
);

// UPDATE BUTTON
updateMovieBtn.addEventListener(
  "click",
  onMovieUpdateHandler
);


// CANCEL BUTTON
cancel.addEventListener(
  "click",
  closeMovieForm
);

function ontoggle(){
    backdrop.classList.toggle('active')
    movieForm.classList.toggle('active')

}

// addMovieBtn.addEventListener("click",ontoggle)
// closeFormBtn.forEach(e=>e.addEventListener("click",ontoggle)






