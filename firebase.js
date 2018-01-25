  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyABGvomuPQwCcL3lb9jvUQyuKlUniJ9fgw",
    authDomain: "search-engine-books-music.firebaseapp.com",
    databaseURL: "https://search-engine-books-music.firebaseio.com",
    projectId: "search-engine-books-music",
    storageBucket: "search-engine-books-music.appspot.com",
    messagingSenderId: "34063810997"
  };
  firebase.initializeApp(config);
var database = initializeApp(config);
// Get a reference to the database service
var database = firebase.database();
// Initial values
var ISBN=""
var Title=""
var GrID=""
var Author=""
var Album=""
var Track=""
var Artist=""
var SearchItem = "";
 $("#click-button").on("click", function() {
      // Prevent the page from refreshing
      event.preventDefault();
// Get inputs
      Author = $("#BAuthor").val().trim();
      ISBN13 = $("#BISBN").val().trim();
      Title = $("#BTitle").val().trim();
      Artist = $("#MArtist").val().trim();
      Album = $("#MAlbum").val().trim();
      Track = $("#MTrack").val().trim();
      // Change what is saved in firebase
      database.ref().set({
        author: username,
        isbn: isbn,
        title: title,
        artist: artist,
        album: album,
        track: track
      });
    });
    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {
      // Print the initial data to the console.
      console.log(snapshot.val());
      // Log the value of the various properties
      console.log(snapshot.val().author);
      console.log(snapshot.val().title);
      console.log(snapshot.val().artist);
      console.log(snapshot.val().album);
      // Change the HTML
      $("#displayed-data").text(snapshot.val().artist + " | " + snapshot.val().album + " | " + snapshot.val().track);// Get inputs
      artist = $("#MArtist").val().trim();
      album = $("#MAlbum").val().trim();
      track = $("#MTrack").val().trim();
      // Change what is saved in firebase
      database.ref().set({
        author: username,
        isbn: isbn,
        title: title,
        artist: artist,
        album: album,
        track: track
      });
    });
    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {
      // Print the initial data to the console.
      console.log(snapshot.val());
      // Log the value of the various properties
      console.log(snapshot.val().author);
      console.log(snapshot.val().title);
      console.log(snapshot.val().isbn);
      // Change the HTML
      $("#displayed-data").text(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);
var update = function() {
}
$(document).ready(function(){
})
//  For example a social blogging application might add a user with set() as follows:
function writeUserData(ul) {
  firebase.database().ref('users/' + userId).set({
      author: username,
        isbn: isbn,
        title: title,
        artist: artist,
        album: album,
        track: track
      
  });
}
// // retrieving the star count of a post from the database:
// var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
// });
//  update it to the recent activity :
function writeNewPost(author, title, isbn, artist, album, track) {
  // A post entry.
  var postData = {
    author: username,
        isbn: isbn,
        title: title,
        artist: artist,
        album: album,
        track: track
  };
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  // var updates = {};
  // updates['/posts/' + newPostKey] = postData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  return firebase.database().ref().update(updates);
} 