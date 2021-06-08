

window.addEventListener("DOMContentLoaded", init);

function init() {
    fetch("https://raw.githubusercontent.com/Dane-Dawson/json-server-collection/main/greek-mythology/db.json")
    .then( (response) => {return response.json();} )
    .then( (responseData) => {
            console.log(responseData);
    } );
}