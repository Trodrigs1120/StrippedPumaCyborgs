
var LastFmAPIKey = "522040999d6813df673088a0da52fadd&"
var GoodReadsAPIKey = "YaRPBzHk1CdOfh7JjERcfg"
var CorsIsDumb="https://cors-anywhere.herokuapp.com/"
//global scope for testing

var Artist=""
var Title=""
var SimilarArtists=[];
var TopAlbums=[]; 
$(document).ready(function () {
// lets declare our functions
function GoodReadsSearch(){
    console.log(Author +" <-- Author  Title---> "+ Title)
     queryURL = CorsIsDumb+"https://www.goodreads.com/book/title.json?author="+Author+"&key=YaRPBzHk1CdOfh7JjERcfg&title="+Title
    console.log("GoodReadsSearch")
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
            console.log(response)
        var AppendHTML=response.reviews_widget
     
        $("#ReviewPanel").append($('<div />', {
            class: 'panel panel-default',
            id: 'ReviewDiv'    }));
        $("#ReviewDiv").append($('<div />', {
            class: 'col-md-12 panel-body',
            id: 'Reviews'    }));
            $("#Reviews").empty()
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
                                        })
                    }
                    


                    function MusicLargeView(){
                     CreateCanvas();
                     queryURL = "http://ws.audioscrobbler.com/2.0/"
                     $.ajax({
                             type: 'GET',
                             url: queryURL,
                             data: 'method=artist.getinfo&' +
                                 'artist='+SearchVariable+'&'+
                                 'api_key=522040999d6813df673088a0da52fadd&' +
                                 'format=json',
                             dataType: 'jsonp',
                        }).done(function(response) {
                            var Description=response
                           
                    })
                }
                //
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
                                for (var i = 0; i<5; i++ ){
                                    console.log()
                                    if (response.items[i].volumeInfo.industryIdentifiers[0].identifier!=undefined){
                                        ISBN13=response.items[i].volumeInfo.industryIdentifiers[0].identifier;
                                        var Author=response.items[i].volumeInfo.authors[0]
                                        var Title=response.items[i].volumeInfo.title
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
                               $(".PageBody").append(wrapper)
                               var buttons = wrapper.getElementsByTagName("BUTTON")
                               buttons[0].onclick = function(){ 
                                ItemValue = ($(this).attr("arrayslot"));
                                // Takes the array slot of the book. We can rerun the query for only that array slot
                                 BooksLargeView()
                                }     
                                // need a better button/href for the link to the "whole page"
                    
                                $(".Button"+i).append('<p> Title: '+Title+'</p>')
                               
                                $(".PageBody").append('<p> Author: '+Author)
                                $(".PageBody").append('<p> ISBN: '+ISBN13)
                               
                               if (Rating!=undefined){
                                $(".PageBody").append('<p> Average Rating: '+Rating+' stars</p>')
                             }
                                $(".PageBody").append('<img id="theImg" src='+Image+' />')
                                 // pads the page
                                 for (var b=0;b<5; b++){
                                    $(".PageBody").append('<br>')
                                }

                    
                            }
                    };
                    })
                }


                function LastFmAlbumSearch(){
                    var InitialTerm = $("#SearchTerm").val();
                    var SearchVariable = InitialTerm.replace(" ", "+");
                    queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.search&album="+SearchVariable+"&api_key="+LastFmAPIKey+"&format=json"
                    //queryURL="http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+Artist+"&api_key="+LastFmAPIKey+"&format=json"
                 $.ajax({
                    type: 'GET',
                    url: queryURL,
                    data:
                      'format=json',
                    dataType: 'jsonp',
                    }).done(function(response) {
                        console.log(response)
                        
                     //   console.log(TopAlbums)
                    })
                }



                function GetTop5albums(){
                    console.log(Artist)
                  queryURL="http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+Artist+"&api_key="+LastFmAPIKey+"&format=json"
                  $.ajax({
                     type: 'GET',
                     url: queryURL,
                     data:
                       'format=json',
                     dataType: 'jsonp',
                     }).done(function(response) {
                         console.log(response)
                         for (var i=0; i<5;i++){
                           TopAlbums[i]=response.topalbums.album[i].name
                         }
                         console.log(TopAlbums)
                     })  
                }

// now here is the monstrosity

                        function LastFmGetArtists(){
                            console.log("last fm ran")
                        var InitialTerm = $("#SearchTerm").val();
                        var SearchVariable = InitialTerm.replace(" ", "+");
                        console.log(SearchVariable)
                        queryURL = "http://ws.audioscrobbler.com/2.0/"
                                console.log(queryURL);
                                
                        $.ajax({
                            // type: 'GET',
                            // url: queryURL,
                            // data: 'method=artist.getinfo&' +
                            //     'artist='+SearchVariable+'&'+
                            //     'api_key=522040999d6813df673088a0da52fadd&' +
                            //     'format=json',
                            // dataType: 'jsonp',
                            type: 'GET',
                            url: queryURL,
                            data: 'method=artist.search&' +
                                'artist='+SearchVariable+'&'+
                                'api_key=522040999d6813df673088a0da52fadd&' +
                                'format=json',
                            dataType: 'jsonp',
                            }).done(function(response) {
                                console.log(response)
                            
                            //console.log(response.artist.bio.content)

                            for (var i = 0; i < 5; i++) {
                                //append Artist+i later?
                                Artist = response.results.artistmatches.artist[i].name
                                Image = response.results.artistmatches.artist[i].image[2]["#text"]
                                // raise scope later
                              //  var Genre = [response.artist.tags.tag["0"].name, response.artist.tags.tag["1"].name ]
                                console.log(Artist)
                                console.log(Image)
                                    GetTop5albums()
                                    console.log(response)
                                    // var BioContent= response.artist.bio.content
                                    // for (var i=0; i<4; i++){
                                    //     SimilarArtists[i]=response.artist.similar.artist[i].name
                                        
                                    // }
                                    console.log(SimilarArtists)
                                   // GetTop5albums() why was this here?
                                   
                                   // if (response.items[i].volumeInfo.industryIdentifiers[0].identifier!=undefined){
                                        
                                        
                                        
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
                             //    BooksLargeView()
                             }     
                                 // need a better button/href for the link to the "whole page"
                                 $(".Button"+i).append('<p> Title: '+Artist+'</p>')
                             //    $(".PageBody").append('<p> Author: '+Author)
                             //   $(".PageBody").append('<p> Genres: '+Genre[0]+", "+Genre[1])
                               
                            //    if (Rating!=undefined){
                            //     $(".PageBody").append('<p> Average Rating: '+Rating+' stars</p>')
                            //  }
                                 $(".PageBody").append('<img id="theImg" src='+Image+' />')
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

                                  // runs the query on click/enter
                                  $("#Click").on("click", function(){
                                    $(".PageBody").empty();
                                    var InitialTerm = $("#SearchTerm").val();
                                    var SearchVariable = InitialTerm.replace(" ", "+");
                                     
                                    if ($('#Click').hasClass('MArtist')){
                                        LastFmGetArtists()
                                        // holding onto this 
                                    } else if ($('#Click').hasClass('MAlbum')) {
                                        
                                        LastFmAlbumSearch()
                                    } else if($('#Click').hasClass('MTrack')){
                                        
                                    } else {
                                        var ISBN13=""
                                        var ISBN10=""
                                        var GrID=""
                                        var ItemValue="";
                                        var Author=""
                                        GoogleBooksAPI()
                                    }
                                                                    })
                                    
                               

                                




}) // end of doc.ready )


