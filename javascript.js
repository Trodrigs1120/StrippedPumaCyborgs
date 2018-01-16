var SearchableTopics =["BAuthor", "BTitle","BISBN" , "MArtist" , "MAlbum" , "MTrack"];
var Button;
var IsEmpty = true;
var APIKey = ""



$(document).ready(function () {
    
    $(".DropDown").on("click", function(){
    
    })
// We're pulling the ISBN, book title, author, average rating? from google books
$("#Click").on("click", function(){
    $(".PageBody").empty();
    GoogleBooksAPI()


})
function GoogleBooksAPI(){
    var SearchVariable = $("#SearchTerm").val();
    queryURL = ""
    if($('#Click').hasClass('BAuthor')) {
        queryURL = "https://www.googleapis.com/books/v1/volumes?q=inauthor:"+SearchVariable
    }
    if($('#Click').hasClass('BTitle')) {
        queryURL = "https://www.googleapis.com/books/v1/volumes?q="+SearchVariable  
    }
    if($('#Click').hasClass('BISBN')) {
        queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:"+SearchVariable
    }
    var SearchVariable = $("#SearchTerm").val();
    console.log(SearchVariable)
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
            for (var i = 0; i<5; i++ ){
            var ISBN13=response.items[i].volumeInfo.industryIdentifiers[0].identifier;
            var ISBN10=response.items[i].volumeInfo.industryIdentifiers[1].identifier;
            var Author=response.items[i].volumeInfo.authors[0]
            var Title=response.items[i].volumeInfo.title
            var Image=response.items[i].volumeInfo.imageLinks.thumbnail
            // next to it in the array are bigger images for the full book page
            // In case we need either ISBN
            console.log ("ISBN 13 and 10")
            console.log (ISBN13)  
            console.log (ISBN10)
            console.log(Author)
            console.log(response.items[0].volumeInfo.imageLinks.thumbnail)
           console.log(Title)
           $(".PageBody").append('<p> Title: '+Title+'</p>')
           $(".PageBody").append('<p> Author: '+Author)
           $(".PageBody").append('<p> ISBN: '+ISBN10)
           $(".PageBody").append('<img id="theImg" src='+Image+' />')
           $(".PageBody").append('<br>')
        }
});
}


// Unused for now 
function GetBookData(){
    
    // run a for loop for 3 to get the first 3 searchs add an id of 0 1 or 2 for selecting search results?
    var ISBN13=response.items[0].volumeInfo.industryIdentifiers[0].identifier;
    var ISBN10=response.items[0].volumeInfo.industryIdentifiers[1].identifier;
    var Author=response.items[0].volumeInfo.authors[0]
    var Title=response.items[0].volumeInfo.title
    var Image=response.items[0].volumeInfo.imageLinks.thumbnail
    // next to it in the array are bigger images for the full book page
    // In case we need either ISBN
    console.log ("ISBN 13 and 10")
    console.log (ISBN13)  
    console.log (ISBN10)
    console.log(Author)
    console.log(response.items[0].volumeInfo.imageLinks.thumbnail)
   console.log(Title)

}
// These change the button to indicate we're searching by something
// We'll add an ID to it to specify which function/api we'll be using for searching and giving back data
$("#BAuthor").on("click", function(){
   $("#Filter").empty()
   $("#Filter").append("Author")
   RemoveClass()
   $("#Click").addClass("BAuthor")
})
$("#BISBN").on("click", function(){ 
   $("#Filter").empty()
   $("#Filter").append("ISBN")
   RemoveClass()
   $("#Click").addClass("BISBN")
})
$("#BTitle").on("click", function(){
   $("#Filter").empty()
   $("#Filter").append("Title")
   RemoveClass()
   $("#Click").addClass("BTitle")
})
$("#MArtist").on("click", function(){
    $("#Filter").empty()
    $("#Filter").append("Artist")
    RemoveClass()
    $("#Click").addClass("MArtist")
 })
 $("#MAlbum").on("click", function(){
    $("#Filter").empty()
    $("#Filter").append("Album")
    RemoveClass()
    $("#Click").addClass("MAlbum")
 })
 // Place holder in case we do searches by track
 $("#MTrack").on("click", function(){
    $("#Filter").empty()
    $("#Filter").append("Title")
    RemoveClass()
    $("#Click").addClass("MTrack")
 })
function RemoveClass(){
    for (var i=0; i<SearchableTopics.length;i++){
        $("#Click").removeClass(SearchableTopics[i]);
    }
    
}
})


