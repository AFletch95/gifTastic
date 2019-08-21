$searchButtons = $('#ajaxButtonsDiv');
$ajaxImages = $('#ajaxImages');

// var searchTerm;
const imagelimit = 12
var giphyButtons = ["Funny cats","turtles","monkeys","birds","bobby hill"];


// Function Calls
  makeButtons();
  
  //=========================
  
  // Takes the current giphyButtons array and creates buttons
  function makeButtons(){
    $searchButtons.empty();
    for(let i=0;i<giphyButtons.length;i++){
      let newBtn = $('<button>');
      let str = giphyButtons[i].trim();
      let id = str.replace(/\s/g,'').toLowerCase();
      newBtn.attr("class","btn-sm btn-primary ajaxButtons");
      newBtn.text(str.toUpperCase());
      newBtn.attr("id",id.trim());
      $searchButtons.prepend(newBtn);
    }
  }
  
  function ajaxGet(searchTerm){
    let queryUrl = "https://api.giphy.com/v1/gifs/search?q="+searchTerm+"&limit="+imagelimit+"&api_key=Jndh9UXi9mJk2q9APuSJ2tTC9jryrwhm";
    
  $.ajax({url:queryUrl,method:"GET"})
  .then(function(response){
    console.log(response);
    let result = response.data;
    for(let i=0;i<imagelimit;i++){
      let img =$('<img>');
      let rating =$('<span>');

      //set src to static url
      //set tag text to gif rating
      img.attr("src",result[i].images.fixed_height.url);
      rating.text("Giphy rating: "+ result[i].rating);

      img.attr("class","giphyImg");


    img.append(rating); //append rating to img


    $ajaxImages.append(img);


    }
  });
  
}

$(document).on("click",".ajaxButtons",function(event){
  event.preventDefault();
  $ajaxImages.empty();
  ajaxGet($(this).text())
})