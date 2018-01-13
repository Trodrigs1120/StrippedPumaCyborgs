var GiphyTopics = ["Puppies", "School", "Snow", "Music", "Anime", "vaporwave", "terry crews", "its always sunny", "simpsons", "birdemic"];
var Button;
var IsEmpty = true;
var APIKey = "CnAbpuLShr8j8ofdJmQRIRf53J2I0b47"



$(document).ready(function () {
    for(var i=0; i<GiphyTopics.length;i++) {
    Button=$("<button>");
    Button.addClass("Button"+i);
    Button.attr("ArraySlot", i );
    Button.addClass("Click")
    $(".ButtonHolder").append(Button);
    $(".Button"+i).append(GiphyTopics[i])
    }

$(".Click").on("click", function(){
var ArraySlot = ($(this).attr("ArraySlot"))

queryURL = "https://api.giphy.com/v1/gifs/search?q="+GiphyTopics[ArraySlot]+"&api_key="+APIKey+"&limit=10";
$.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
        
        if (IsEmpty===false){ 
            $(".GiphyGoesHere").empty();    
            
            } else {
                IsEmpty=false;

            }
        for (var i=0; i<response.data.length; i++){
            GiphyDiv= $("<div>");
            GiphyDiv.addClass("SizeAdjust");
            GiphyDiv.addClass("Gif"+i);
            GiphyImage= $("<img>");
            GiphyImage.attr("width", 200)
            GiphyImage.attr("height", 200)
            GiphyImage.addClass("gif")
            $(".GiphyGoesHere").append(GiphyDiv);
            $(".Gif"+i).append(GiphyImage);
            $(".Gif"+i).append("<p class=rating> Rating: "+response.data[i].rating+"</p>");
            GiphyImage.attr("src", response.data[i].images.fixed_height_still.url)
            
            
            }
})

})


$("#AddTopic").on("click", function() {
i=GiphyTopics.length;
var KeyWord = $("#keyword").val();
GiphyTopics[i]=KeyWord;

var btn = document.createElement('button');
var wrapper = document.createElement('div');
wrapper.appendChild(btn);
btn.classList.add("Button"+i);
btn.classList.add("Click");
btn.setAttribute("ArraySlot", i );
$("#Move").append(wrapper);
var buttons = wrapper.getElementsByTagName("BUTTON");
$(".Button"+i).append(GiphyTopics[i])

buttons[0].onclick = function(){ 
    var ArraySlot = ($(this).attr("ArraySlot"))
    queryURL = "https://api.giphy.com/v1/gifs/search?q="+GiphyTopics[ArraySlot]+"&api_key="+APIKey+"&limit=10";
    
    $.ajax({
    
    url: queryURL,
    method: "GET"
    }).done(function(response) {
        console.log(response);
        
        if (IsEmpty===false){
            $(".GiphyGoesHere").empty();    
            
            } else {
                IsEmpty=false;

            }
        for (var i=0; i<response.data.length; i++){
            GiphyDiv= $("<div>");
            GiphyDiv.addClass("SizeAdjust");
            GiphyDiv.addClass("Gif"+i);
            GiphyImage= $("<img>");
            GiphyImage.attr("width", 200)
            GiphyImage.attr("height", 200)
            GiphyImage.addClass("gif")
            $(".GiphyGoesHere").append(GiphyDiv);
            $(".Gif"+i).append(GiphyImage);
            $(".Gif"+i).append("<p class=rating> Rating: "+response.data[i].rating+"</p>");
            GiphyImage.attr("src", response.data[i].images.fixed_height_still.url)
            }
})  }

}); 

$('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});
});

