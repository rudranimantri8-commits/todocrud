
const movieForm = document.getElementById("movieForm");
const movieName = document.getElementById("movieName");
const movieDirector = document.getElementById("movieDirector");
const movieYear = document.getElementById("movieYear");
const submitBtn = document.getElementById("submitBtn");
const movieInfo = document.getElementById("movieInfo");

let movieArr = []

let editIndex = null;

//create

let onmovieAdd = (eve) => {
eve.pereventDefult();
let movieObj = {
    name : movieName.value,
    director: movieDirector.value,
    year : movieYear.value,
};

if (editIndex === null){
    movieArr.push(movieObj);

} else{
    movieArr[movieIndex] = movieObj;
    editIndex = null;
    submitBtn.innerText = "Add movie";
}
movieForm.reset();
display.Movies();

};

//Read
let displayMovies = () => {

    let result = "";

    movieArr.forEach((movie, index) => {

        result += `
            <tr>
                <td>${index + 1}</td>
                <td>${movie.name}</td>
                <td>${movie.director}</td>
                <td>${movie.year}</td>

                <td>
                    <button onclick="onMovieEdit(${index})">
                        Edit
                    </button>

                    <button onclick="onMovieDelete(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    movieInfo.innerHTML = result;
};


// UPDATE
let onMovieEdit = (index) => {

    let movieObj = movieArr[index];

    movieName.value = movieObj.name;
    movieDirector.value = movieObj.director;
    movieYear.value = movieObj.year;

    editIndex = index;

    submitBtn.innerText = "Update Movie";
};


// DELETE
let onMovieDelete = (index) => {

    movieArr.splice(index, 1);

    displayMovies();
};


movieForm.addEventListener("submit", onMovieAdd);
