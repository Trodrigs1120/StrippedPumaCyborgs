
// Move these to a better scope later if you have time

var    AlbumArtist=""
var    AlbumName=""
var    Image=""
var LastFmAPIKey = "522040999d6813df673088a0da52fadd&"
var GoodReadsAPIKey = "YaRPBzHk1CdOfh7JjERcfg"
var CorsIsDumb="https://cors-anywhere.herokuapp.com/"
//global scope for testing
var ArtistCounter="";
var Artist=""
var Title=""
var SimilarArtists=[];
var TopAlbums=[]; 
$(document).ready(function () {
//Fire base stuff

var config = {
    apiKey: "AIzaSyAU46IVUBlILFXNBYEFeDo8lD-1xnTWOkU",
    authDomain: "newp-d21f6.firebaseapp.com",
    databaseURL: "https://newp-d21f6.firebaseio.com",
    projectId: "newp-d21f6",
    storageBucket: "newp-d21f6.appspot.com",
    messagingSenderId: "38732084306"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  // variables for newbooksearch
  var FBauthor="";
  var FBisbn="";
  var FBtitle="";
  var FBimage="";
  var FBartist="";
  var FBalbum="";
  
  // we're going to pull the firebase info and append it to the page
  $(".PageBody").prepend('<p> Previous people searched for..</p>')
  RunFirebase()
  
 

  



// lets declare our functions
function RunFirebase(){
    
    database.ref().on("child_added", function(childSnapshot, prevChildKey){
            
          // for (var i=0; i<5; i++){
            if (childSnapshot.val().type=="music"){
                console.log("it saw music")
                var Appendartist = childSnapshot.val().artist
                var Appendalbum = childSnapshot.val().album
                var Appendimage=childSnapshot.val().image
                $(".PageBody").append('<p>Album Artist: '+Appendartist+'<p>')
                $(".PageBody").append('<p>Album Name: '+Appendalbum+'<p>')
                $(".PageBody").append('<img id="" src='+Appendimage+' />');
            } else if(childSnapshot.val().type=="book") {
                console.log("type = book")
                var Appendtitle = childSnapshot.val().title
                var Appendauthor = childSnapshot.val().author
                var Appendimage=childSnapshot.val().image
                $(".PageBody").append('<p>Title: '+Appendtitle+'<p>')
                $(".PageBody").append('<p>Book Author: '+Appendauthor+'<p>')
                $(".PageBody").append('<img id="" src='+Appendimage+' />');
            } else { console.log("it couldn't tell")
        
            }
       //    }
     
             
            });
            
 }
function GoodReadsSearch(){
   
     queryURL = CorsIsDumb+"https://www.goodreads.com/book/title.json?author="+Author+"&key=YaRPBzHk1CdOfh7JjERcfg&title="+Title
    console.log("GoodReadsSearch")
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
            console.log(response)
        var AppendHTML=response.reviews_widget
     
        
        
            $("#Reviews").empty( )
        $("#Reviews").append("Please note: Reviews are for all editions of a given book.")
            $("#Reviews").append(AppendHTML)
        })
    }

        // Full Page view for selection
        function BooksLargeView(){
            // creates divs for elements
            CreateCanvas();    
            $.ajax({
            url: queryURL,
            method: "GET"
            }).done(function(response) {
                console.log("BooksLargeView Query")
                console.log(response)
                 ISBN13=response.items[ItemValue].volumeInfo.industryIdentifiers[0].identifier;
                 Author=response.items[ItemValue].volumeInfo.authors[0]
                 Title=response.items[ItemValue].volumeInfo.title
                 if(response.items[ItemValue].volumeInfo.imageLinks!=undefined){
                    var Image=response.items[ItemValue].volumeInfo.imageLinks.thumbnail
                }
                else{
                    var Image="images/book.gif" 
                } 
                var Description=response.items[ItemValue].volumeInfo.description
                var Rating=response.items[ItemValue].volumeInfo.averageRating
                var BuyLink=response.items[ItemValue].saleInfo.buyLink
                var IsFiction=response.items[ItemValue].volumeInfo.categories[0]
                GoodReadsSearch()
                if (response.items[ItemValue].saleInfo.saleability=="NOT_FOR_SALE"){
                
                } else {
                    var SalePrice=response.items[ItemValue].saleInfo.listPrice.amount
                }
                
                $("#Art").append('<img id="" src='+Image+' />');
                // art image is a little small. Use ISBN number to fetch bigger one?
                var length = 700;
                var trimmedDesc = Description.substring(0, length);
                trimmedDesc=trimmedDesc+"..."
                $("#Content").append('<p>'+Title +'</p>'+'<p>Author:'+Author +'</p>'+'<p>'+IsFiction+'</p>'+'<p> Brief description:<br>'+trimmedDesc+'<p>')
                 
                if (Rating!=undefined){
                    $("#Content").append('<p> Average Rating on Google Books: '+Rating+' stars</p>')
                                         }
                $("#Links").append('<p>Buy on </p>')
                if (BuyLink!=undefined || SalePrice!=undefined){ 
                    $("#Links").append('<a href='+BuyLink+'> Google Play Store</a> '+SalePrice)
                                                                }
                $("#Links").append('<p> <a href="Amazon.com">Amazon</a></p>')
                 $("#Links").append('<p> <a href="Itunes.com"> Itunes</a></p>')                                                                
                                        })
                    }
                    


                    function ArtistLargeView(){
                     CreateCanvas();
                     queryURL = "https://ws.audioscrobbler.com/2.0/"
                     $.ajax({
                             type: 'GET',
                             url: queryURL,
                             data: 'method=artist.getinfo&' +
                                 'artist='+Search+'&'+
                                 'api_key=522040999d6813df673088a0da52fadd&' +
                                 'format=json',
                             dataType: 'jsonp',
                        }).done(function(response) {
                            console.log(response)
                            console.log("large view ran")
                            Artist=response.artist.name
                            Image=response.artist.image[3]["#text"]
                            var Bio=response.artist.bio.content
                            $("#Content").append('<p>'+Artist+'</p>')
                            $("#Reviews").empty()
                        var length = 700;
                        var trimmedBio = Bio.substring(0, length);
                        trimmedBio=trimmedBio+"..."
                            $("#Art").append('<img id="" src='+Image+' />')
                             // pads the page
                           
                            GetTop5albums()
                            $("#Content").append(trimmedBio)
                            $(".PageBody").append('<br>')
                                    
                            
                    })
                }
                    // creates the layout for the elements to  be inserted
                    function CreateCanvas(){
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
                        }




                    function GoogleBooksAPI(){
                        var InitialTerm = $("#SearchTerm").val();
                        var SearchVariable = InitialTerm.replace(" ", "+");
                        if($('#Click').hasClass('BAuthor')) {
                            queryURL = "https://www.googleapis.com/books/v1/volumes?q=inauthor:"+SearchVariable
                        }
                        if($('#Click').hasClass('BTitle')) {
                            queryURL = "https://www.googleapis.com/books/v1/volumes?q="+SearchVariable  
                        }
                        if($('#Click').hasClass('BISBN')) {
                            queryURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:"+SearchVariable
                        }
                        
                        $.ajax({
                            url: queryURL,
                            method: "GET"
                            }).done(function(response) {
                                FBauthor=response.items[1].volumeInfo.authors[0]
                                FBisbn=response.items[1].volumeInfo.industryIdentifiers[0].identifier
                                FBtitle=response.items[1].volumeInfo.title
                                FBimage=response.items[1].volumeInfo.imageLinks.thumbnail
                             var NewBookSearch={
                              type: "book",
                              author: FBauthor,
                              isbn: FBisbn,
                              title: FBtitle,
                              image: FBimage
                              }
                              database.ref().push(NewBookSearch) 
                              $(".PageBody").empty()
                                for (var i = 0; i<5; i++ ){
                                    
                                 
                                  
                                    if (response.items[i].volumeInfo.industryIdentifiers[0].identifier!=undefined){
                                        ISBN13=response.items[i].volumeInfo.industryIdentifiers[0].identifier;
                                         Author=response.items[i].volumeInfo.authors[0]
                                         Title=response.items[i].volumeInfo.title
                                        if(response.items[i].volumeInfo.imageLinks!=undefined){
                                            var Image=response.items[i].volumeInfo.imageLinks.thumbnail
                                        }
                                        else{
                                            var Image="images/book.gif" 
                                        } 
                                        var Rating=response.items[i].volumeInfo.averageRating
                               var btn = document.createElement('button');
                               var wrapper = document.createElement('div');
                               wrapper.appendChild(btn);
                               btn.classList.add("Click");
                               btn.classList.add("Button"+i);
                               btn.setAttribute("ArraySlot", i );
                               
                               var buttons = wrapper.getElementsByTagName("BUTTON")
                               buttons[0].onclick = function(){ 
                                ItemValue = ($(this).attr("arrayslot"));
                                // Takes the array slot of the book. We can rerun the query for only that array slot
                                 BooksLargeView()
                                }     
                                // need a better button/href for the link to the "whole page"
                                
                                $(".PageBody").append(wrapper)
                                $(".Button"+i).append('<p> Title: '+Title+'</p>')
                               
                                $(".PageBody").append('<p> Author: '+Author)
                                $(".PageBody").append('<p> ISBN: '+ISBN13)
                               
                               if (Rating!=undefined){
                                $(".PageBody").append('<p> Average Rating: '+Rating+' stars</p>')
                             }
                                $(".PageBody").append('<img id="" src='+Image+' />')
                                 // pads the page
                                 for (var b=0;b<3; b++){
                                    $(".PageBody").append('<br>')
                                }

                    
                            }
                    };
                    })
                }

                function LastFmAlbumSearch(){
                    var InitialTerm = $("#SearchTerm").val();
                    var SearchVariable = InitialTerm.replace(" ", "+");
                    queryURL = "https://ws.audioscrobbler.com/2.0/?method=album.search&album="+SearchVariable+"&api_key="+LastFmAPIKey+"&format=json"
                     $.ajax({
                    type: 'GET',
                    url: queryURL,
                    data:
                      'format=json',
                    dataType: 'jsonp',
                    }).done(function(response) {
                        console.log(response)
                        $(".PageBody").append("Select an Album by hitting the button with your selections name on it."+'<br><br>')
                        //for loop of grabbing and appending albums 
                         // Getting firebase info
                         FBalbum=response.results.albummatches.album[0].artist
                         FBartist=response.results.albummatches.album[0].name
                         FBimage=response.results.albummatches.album[0].image[3]["#text"]
                         console.log(FBartist+ " "+FBalbum+ " "+ FBimage)
                         var NewMusicSearch = {
                            type:"music",
                             artist: FBartist,
                             album: FBalbum,
                             image: FBimage
                       }
                     database.ref().push(NewMusicSearch) 
                         
                     $(".PageBody").empty()
                        for (var i=0; i<5; i++){
                            AlbumArtist=response.results.albummatches.album[i].artist
                            AlbumName=response.results.albummatches.album[i].name
                            Image=response.results.albummatches.album[i].image[3]["#text"]
                           
                            

                            
                            var btn = document.createElement('button');
                               var wrapper = document.createElement('div');
                               wrapper.appendChild(btn);
                               btn.classList.add("Click");
                               btn.classList.add("Button"+i);
                               btn.setAttribute("albumname", AlbumName );
                               btn.setAttribute("albumartist", AlbumArtist)
                                $(".PageBody").append(wrapper)
                                var buttons = wrapper.getElementsByTagName("BUTTON")
                                buttons[0].onclick = function(){ 
                                 Search = ($(this).attr("searchvariable"));
                                 // Runs Music Large view\
                                 AlbumName = ($(this).attr("albumname"))
                                console.log(AlbumName)
                                 AlbumArtist= ($(this).attr("albumartist"))
                                console.log(AlbumArtist)
                                  AlbumLargeView()
                                            }     
                                 // need a better button/href for the link to the "whole page"
                                 $(".Button"+i).append('<p> Album Title: '+AlbumName+'</p>')
                                
                                $(".PageBody").append('<p> By: '+AlbumArtist+'</p>')
                                 $(".PageBody").append('<img id="" src='+Image+' />')
                                 for (var b=0;b<3; b++){
                                    $(".PageBody").append('<br>')
                                }
                       }
                        

                     //   console.log(TopAlbums)
                    })
                }
         
                
                



                function AlbumLargeView(){
                    // reads the attributes from the button
                    
                    console.log(AlbumName)
                    console.log(AlbumArtist)
                    CreateCanvas();
                    queryURL = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key="+LastFmAPIKey+"&artist="+AlbumArtist+"&album="+AlbumName+"&format=json"
                    
                    $.ajax({
                            type: 'GET',
                            url: queryURL,
                            
                            dataType: 'jsonp',
                       }).done(function(response) {
                        
                        
                           console.log(response)
                           console.log(queryURL)
                           console.log("Album Largeview Ran")
                           
                           Artist=response.album.artist
                           Image=response.album.image[5]["#text"]
                           AlbumName=response.album.name
                           $("#Reviews").empty( )
                           $("#Content").append('<p> Artist: '+Artist+'</p>')
                           $("#Content").append('<p> Album Title: '+AlbumName+'</p>')
                           $("#Content").append('<p> Track list: </p><br>')
                        //    for (i=0; i<10;i++){
                        //     $("#Content").append('<p> '+ (i+1)+". " + response.album.tracks.track[i].name +'</p>')
                        //    }
                        $("#Art").append('<img id="" src='+Image+' />')
                        // for (var b=0;b<5; b++){
                        //     $("#Art").append("<br>")
                        // }
                         $("#Links").append('<p> <a href="Amazon.com">Buy on Amazon</a></p>')
                         $("#Links").append('<p> <a href="Itunes.com">Buy on Itunes</a></p>')
                         $("#Links").append('<p> <a href="https://play.google.com/music/">Buy on Google Music</a></p>')
                        for (var i=0; i<25;i++) {
                            
                            if (response.album.tracks.track[i].name!=undefined){
                                $("#Content").append('<p> '+ (i+1)+". " + response.album.tracks.track[i].name +'</p>')
                            } else {
                                i=26;
                            }

                        } 

                           
                            // pads the page
                          
                           
                                   
                           
                   })
               }







// now here is the monstrosity

                        function LastFmGetArtists(){
                            console.log("last fm ran")
                        var InitialTerm = $("#SearchTerm").val();
                        var SearchVariable = InitialTerm.replace(" ", "+");
                       // console.log(SearchVariable)
                        queryURL = "https://ws.audioscrobbler.com/2.0/"
                       //         console.log(queryURL);
                                
                        $.ajax({
                            type: 'GET',
                            url: queryURL,
                            data: 'method=artist.search&' +
                                'artist='+SearchVariable+'&'+
                                'api_key=522040999d6813df673088a0da52fadd&' +
                                'format=json',
                            dataType: 'jsonp',
                            }).done(function(response) {
                                console.log(response)
                                $(".PageBody").append("Select an artist by hitting the button with your selections name on it."+'<br><br>')
                             for (var ArtistCounter=0; ArtistCounter<5; ArtistCounter++) {
                                // Counting for the next loop
                                Artist = response.results.artistmatches.artist[ArtistCounter].name
                                Image = response.results.artistmatches.artist[ArtistCounter].image[2]["#text"]

                               var btn = document.createElement('button');
                               var wrapper = document.createElement('div');
                               wrapper.appendChild(btn);
                               btn.classList.add("Click");
                               btn.classList.add("Button"+ArtistCounter);
                               btn.setAttribute("searchvariable", Artist );
                               
                                $(".PageBody").append(wrapper)
                                var buttons = wrapper.getElementsByTagName("BUTTON")
                                buttons[0].onclick = function(){ 
                                 Search = ($(this).attr("searchvariable"));
                                 // Runs Music Large view
                                  ArtistLargeView()
                                            }
                                                 
                                 $(".Button"+ArtistCounter).append('<p> Name: '+Artist+'</p>')
                                
                                
                                 $(".PageBody").append('<img id="" src='+Image+' />')
                                 for (var b=0;b<3; b++){
                                    $(".PageBody").append('<br>')
                                }
                                 }

                                })


                            }

                            function GetTop5albums(){
                                console.log(Artist)
                              queryURL="https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+Artist+"&api_key="+LastFmAPIKey+"&format=json"
                              $.ajax({
                                 type: 'GET',
                                 url: queryURL,
                                 data:
                                   'format=json',
                                 dataType: 'jsonp',
                                 }).done(function(response) {
                                               console.log(response)
                                $("#Content").append('<br>')
                                $("#Content").append('<br>')                                                  
                                $("#Content").append(' <p>Top Albums:</p>') 
                                    for (var i=0; i<5;i++){
                                      $("#Content").append('<p>'+response.topalbums.album[i].name+'</p>')
                                        }
                                 })  
                            }






                function RemoveClass(){
                    var SearchableTopics =["BAuthor", "BTitle","BISBN" , "MArtist" , "MAlbum" , "MTrack"];
                    for (var i=0; i<SearchableTopics.length;i++){
                        $("#Click").removeClass(SearchableTopics[i]);
                        $("#myDropdown").removeClass("show");
                                                                }
                                        }

                                    




// thats all the functions, now for on clicks

// Setting it up so when you hit enter after typing a search term, it searches * you still need to have a search by term selected
$("#SearchTerm").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#Click").click();
    }
                                })


                                // These all remove classes and add their given class from the box. as well as appending the word to the "Search by.."
                                $("#BAuthor").on("click", function(){
                                    $("#Filter").empty()
                                    $("#Filter").append("Searching by Author")
                                    RemoveClass()
                                    $("#Click").addClass("BAuthor")
                                 })
                                 $("#BISBN").on("click", function(){ 
                                    $("#Filter").empty()
                                    $("#Filter").append("Searching by ISBN")
                                    RemoveClass()
                                    $("#Click").addClass("BISBN")
                                 })
                                 $("#BTitle").on("click", function(){
                                    $("#Filter").empty()
                                    $("#Filter").append("Searching by Title")
                                    RemoveClass()
                                    $("#Click").addClass("BTitle")
                                 })
                                 $("#MArtist").on("click", function(){
                                     $("#Filter").empty()
                                     $("#Filter").append("Searching by Artist")
                                     RemoveClass()
                                     $("#Click").addClass("MArtist")
                                  })
                                  $("#MAlbum").on("click", function(){
                                     $("#Filter").empty()
                                     $("#Filter").append("Searching by Album")
                                     RemoveClass()
                                     $("#Click").addClass("MAlbum")
                                  })
                                  


                                  // runs the query on click/enter
                                  $("#Click").on("click", function(){
                                    $(".PageBody").empty();
                                    var InitialTerm = $("#SearchTerm").val();
                                    var SearchVariable = InitialTerm.replace(" ", "+");
                                    var    AlbumArtist=""
                                    var    AlbumName=""
                                    var    Image=""
                                    $("#Reviews").empty()
                                    if ($('#Click').hasClass('MArtist')){
                                        
                                        LastFmGetArtists()
                                        // holding onto this 
                                    } else if ($('#Click').hasClass('MAlbum')) {
                                        
                                        LastFmAlbumSearch()
                                    }  else {
                                        var ISBN13=""
                                        var ISBN10=""
                                        var GrID=""
                                        var ItemValue="";
                                        var Author=""
                                        GoogleBooksAPI()
                                    }
                                                                    })
                                    
                               

                                




}) // end of doc.ready )
