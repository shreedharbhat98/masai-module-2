window.addEventListener("load", create_emoji)

//Function to load emoji When page loads
function create_emoji() {
    var card = document.getElementById("show_movie")
    var div = document.createElement("div")
    div.setAttribute("class", "text-center")
    div.innerHTML = '<img src="https://cdn.dribbble.com/users/2454973/screenshots/7139572/3_4x.jpg?compress=1&resize=800x600" style="height:250px;"><br><i class="fa    fa-hand-o-left fa-3x" aria-hidden="true">Search Here</i>'
    card.appendChild(div)
}

//Function to reset input Field By Title
function reset_input_by_title() {
    document.getElementById("movie_title").value = ""
    document.getElementById("movie_year").value = ""
    var card = document.getElementById("show_movie")
    card.innerHTML = ""
    create_emoji()
}

//Function to reset input Field by ID
function reset_input_id() {
    document.getElementById("imdb_id").value = ""
    var card = document.getElementById("show_movie")
    card.innerHTML = ""
    create_emoji()
}

//Function to get movie details by title
function get_movie_by_title() {
    var title = document.getElementById("movie_title").value
    var year = document.getElementById("movie_year").value
    if ((title == "") && (year == "")) {
        alert("Please Fill All Fields")
        return
    }
    else {
        var xhr = new XMLHttpRequest()
        title = title.split(" ")
        var res = title.join("+")
        xhr.open("GET", "http://www.omdbapi.com/?apikey=fcc8d66d&" + "t=" + res + "&y=" + year)
        xhr.send()
        xhr.onload = function () {
            if (xhr.status == 200) {
                show_movie(JSON.parse(xhr.response))
            }
        }
    }
    reset_input_by_title()
    reset_input_id()

}
//Function to get movie details by ID
function get_movie_by_id() {
    var id = document.getElementById("imdb_id").value
    if (id == "") {
        alert("Please Fill ID")
        return
    }
    else {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", "http://www.omdbapi.com/?apikey=fcc8d66d&i=" + id)
        xhr.send()
        xhr.onload = function () {
            if (xhr.status == 200) {
                show_movie(JSON.parse(xhr.response))
            }
        }
    }
    reset_input_by_title()
    reset_input_id()
}
//Function to display movie details
function show_movie(data) {

    var card = document.getElementById("show_movie")
    card.innerHTML = ""
    var image = document.createElement("img")
    image.setAttribute("src", data["Poster"])
    image.setAttribute("width", "250px")
    image.setAttribute("alt", "Not Available")
    image.setAttribute("class", "offset-4  pb-3 pl-4")
    card.appendChild(image)

    for (keys in data) {
        if ((keys != "Poster") && (keys != "Ratings") && (keys != "Response")) {
            var details = document.createElement("p")
            details.setAttribute("class", "text ")

            details.innerHTML = (keys + " : " + data[keys])
            card.appendChild(details)
            continue;
        }
    }
}
