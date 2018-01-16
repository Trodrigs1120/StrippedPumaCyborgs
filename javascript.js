var SearchableTopics =["BAuthor", "BTitle","BISBN" , "MArtist" , "MAlbum" , "MTrack"];
var Button;
var IsEmpty = true;
var APIKey = ""



$(document).ready(function () {
    
    $(".DropDown").on("click", function(){
    
    })
// We're pulling the ISBN, book title, author, average rating? from google books
$("#Click").on("click", function(){

if($('#Click').hasClass('BAuthor')) {
    
}
if($('#Click').hasClass('BTitle')) {
    GoogleBooksTitle();
    
}
if($('#Click').hasClass('BISBN')) {
    GoogleBooksISBN()
}

})
function GoogleBooksTitle(){
    var SearchVariable = $("#SearchTerm").val();
    console.log(SearchVariable)
    queryURL = "https://www.googleapis.com/books/v1/volumes?q="+SearchVariable
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
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
});
}
function GoogleBooksISBN(){
    var SearchVariable = $("#SearchTerm").val();
    console.log(SearchVariable)
    queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:0060007761"
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
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
                                    })
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


