var SearchableTopics =["BAuthor", "BTitle","BISBN" , "MArtist" , "MAlbum" , "MTrack"];
//var Button;
var ItemValue="";
var GoodReadsAPIKey = "YaRPBzHk1CdOfh7JjERcfg"
var ISBN13=""
var ISBN10=""
// may not need this at all
var GrID=""
var CorsIsDumb="https://cors-anywhere.herokuapp.com/"
$(document).ready(function () {

    
    $(".DropDown").on("click", function(){
    // this does nothing at this time
    })
// We're pulling the ISBN, book title, author, average rating? from google books
$("#Click").on("click", function(){
    $(".PageBody").empty();
    GoogleBooksAPI()


})

function GoogleBooksAPI(){
    var SearchVariable = $("#SearchTerm").val();
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
                console.log()
            var ISBN13=response.items[i].volumeInfo.industryIdentifiers[0].identifier;
            // Declared this is global scope because we need to pass it to other functions
          //  if (response.items[i].volumeInfo.industryIdentifiers[1].identifier!=undefined){
               ISBN10=response.items[i].volumeInfo.industryIdentifiers[1].identifier;
          //  }
           
            var Author=response.items[i].volumeInfo.authors[0]
            var Title=response.items[i].volumeInfo.title
            var Image=response.items[i].volumeInfo.imageLinks.thumbnail
            var Rating=response.items[i].volumeInfo.averageRating
            // next to it in the array are bigger images for the full book page
            // In case we need either ISBN
        //    console.log ("ISBN 13 and 10")
        //    console.log (ISBN13)  
        //    console.log (ISBN10)
        //    console.log(Author)
        //    console.log(response.items[0].volumeInfo.imageLinks.thumbnail)
        //   console.log(Title)

           
           var btn = document.createElement('button');
           var wrapper = document.createElement('div');
           wrapper.appendChild(btn);
           btn.classList.add("Click");
           btn.classList.add("Button"+i);
           btn.setAttribute("ArraySlot", i );
           $(".PageBody").append(wrapper)
           var buttons = wrapper.getElementsByTagName("BUTTON")
           buttons[0].onclick = function(){ 
            ItemValue = ($(this).attr("arrayslot"));
            // Takes the array slot of the book. We can rerun the query for only that array slot
             LargeView()
            }     
            // need a better button/href for the link to the "whole page"

            $(".Button"+i).append('<p> Title: '+Title+'</p>')
           
            $(".PageBody").append('<p> Author: '+Author)
            $(".PageBody").append('<p> ISBN: '+ISBN10)
           
           if (Rating!=undefined){
            $(".PageBody").append('<p> Average Rating: '+Rating+' stars</p>')
         }
            $(".PageBody").append('<img id="theImg" src='+Image+' />')
            $(".PageBody").append('<br>')
      
           // We need a button that gets appended that is clickable to take you to a new page that allows us to 
           // do the actual heres the book and its reviews get hype
        }
});
}
// going to try to imitate bootstrap divs and classes to see how it all goes
// LargeView is the full page version of the book/music
function LargeView(){
    $(".PageBody").empty()
    $(".PageBody").append($('<div />', {
    class: 'col-md-6',
    id: 'Art'    }));
    $(".PageBody").append($('<div />', {
        class: 'col-md-6',
        id: 'Content'   }));
    $(".PageBody").append($('<div />', {
        class: 'col-md-12',
        id: 'Links' }));        
 
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
        var ISBN13=response.items[ItemValue].volumeInfo.industryIdentifiers[0].identifier;
        
        var Author=response.items[ItemValue].volumeInfo.authors[0]
        var Title=response.items[ItemValue].volumeInfo.title
        var Image=response.items[ItemValue].volumeInfo.imageLinks.thumbnail
        var Description=response.items[ItemValue].volumeInfo.description
        var Rating=response.items[ItemValue].volumeInfo.averageRating
        var BuyLink=response.items[ItemValue].saleInfo.buyLink
        var IsFiction=response.items[ItemValue].volumeInfo.categories[0]
        if (response.items[ItemValue].saleInfo.saleability=="NOT_FOR_SALE"){
        
        } else {
            var SalePrice=response.items[ItemValue].saleInfo.listPrice.amount
        }
        
        $("#Art").append('<img id="theImg" src='+Image+' />');
        // art image is a little small. Use ISBN number to fetch bigger one?
        $("#Content").append('<p>'+Title +'</p>'+'<p>'+IsFiction+'</p>'+'<p> Brief description:<br>'+Description+'<p>')
        if (Rating!=undefined){
            $("#Content").append('<p> Average Rating on Google Books: '+Rating+' stars</p>')
                                 }
        if (BuyLink!=undefined || SalePrice!=undefined){
            $("#Links").append('<p>Buy on </p>')
            $("#Links").append('<a href='+BuyLink+'> Google Play Store</a> '+SalePrice)
                                }
        //  running good reads to get ratings from there and use the ISBN from here
        
                                })
        GoodReadsGetGrID()
        
}

function GoodReadsGetGrID(){
    console.log("Good Reads Get GR ID ran")
    queryURL= CorsIsDumb+"https://www.goodreads.com/book/review_counts.json?isbns="+ISBN10+"&key="+GoodReadsAPIKey;
    console.log(queryURL)
    // after ISBN13 you can add %2C to include more books if needed
    //queryURL=CorsIsDumb+"https://www.goodreads.com/book/isbn/"+ISBN10+"?key=YaRPBzHk1CdOfh7JjERcfg"
$.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    GrID=response.books[0].id
    console.log(GrID)

    GoodReadsGetReviews();
})

}
function GoodReadsGetReviews(){
    console.log("Good reads Get Reviews ran")
    queryURL=CorsIsDumb+"https://www.goodreads.com/book/show/"+GrID+".json?key="+GoodReadsAPIKey;
    //queryURL=CorsIsDumb+"https://www.goodreads.com/book/show/2555.json?key=YaRPBzHk1CdOfh7JjERcfg";
    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
    console.log(response)
    var test=response.documentElement.children[1].childNodes[55].innerHTML
    var Rating="";
    newtest= test.substr(16);
    newertest = newtest.substr(0, newtest.length-10);
    $("#Reviews").append("Please note: Reviews are for all editions of a given book."+ newertest)
    $("#Content").append('<p> Average Rating on Google Books: '+Rating+' stars</p>')
        })
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
 // Setting it up so when you hit enter after typing a search term, it searches * you still need to have a search by term selected
 $("#SearchTerm").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#Click").click();
    }
});
 // this removes all classes that could mess up our search
function RemoveClass(){
    for (var i=0; i<SearchableTopics.length;i++){
        $("#Click").removeClass(SearchableTopics[i]);
        $("#myDropdown").removeClass("show");
    }
    
}
})
