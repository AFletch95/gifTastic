$searchButtons = $('#ajaxButtonsDiv');
$ajaxImages = $('#ajaxImages');

// var searchTerm;
const imagelimit = 12
var giphyButtons = ["funny cats","turtles","monkeys","birds","bobby hill"];

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
      let parentDiv = $('<div>');
      let img =$('<img>');
      let rating =$('<p>');

      //set src to static url
      //set tag text to gif rating
      img.attr("src",result[i].images.fixed_height.url);
      rating.text("Giphy rating: "+ result[i].rating);

      parentDiv.attr("class","giphyImg");


      
      
      parentDiv.append(rating);
      parentDiv.append(img);
      $ajaxImages.append(parentDiv)
      // img.prepend(rating.text()); //prepend rating to img
      console.log("rating is " ,rating.text());


    }
  });
  
}

$(document).on("click",".ajaxButtons",function(event){
  event.preventDefault();
  $ajaxImages.empty();
  ajaxGet($(this).text())
})
$(document).on("click","#addSearchButton",function(event){
  event.preventDefault();
  let matchFound = false;
  let userSearch = $('#addSearchText').val().trim();
  for(let i=0;i<giphyButtons.length;i++){
    if(userSearch === giphyButtons[i]){
      matchFound = true;
    }
    else{
      matchFound = false;
    }
  }
  if(userSearch != "" && matchFound == false){
    let btn = $("<button>");
    btn.text(userSearch.toUpperCase());
    btn.attr("class","btn-sm btn-primary ajaxButtons");
    $searchButtons.append(btn);
    giphyButtons.push(userSearch.toLowerCase());

    $('#addSearchText').val("");
  }

})