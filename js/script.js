/* global $ */

// BELOW Update the songs array with four of your favorites songs.
var songs = [Lucid Dreams, I Fall Apart, Wolves, Yes Indeed];
// BELOW Add 4 More arrays to store images_links, artists, song lengths, and links for each song
// Make sure they match the same order as your array above
var artists = [Juice WRLD, Post Malone, Selena Gomez, Lil Baby];
var songLengths = [359, 343, 318, 222];
var imageLinks = ["", "", "", ""];
var songLinks = ["", "", "", ""];


function displaySongInfo(){
    // BELOW Use forEach Loop to display the data from each of your arrays in the correct div

}

function emptySongInfo(){
    $("#songs").empty();
    // Use jQuery to empty all of the remaining divs


}


function addSongInfo(){
    // BELOW write the code to add new items to each of the arrays.


}

$("#add").click(function() {
    emptySongInfo();
    addSongInfo();
    displaySongInfo();
});

displaySongInfo();
