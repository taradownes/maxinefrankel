$(document).ready(function(){

  $("#bar").click(function() {
    $(".item").slideToggle(300, () => {
     });
   });
  
   $('.page').slideDown('slow');

   $('.item-link').click(function(){
    event.preventDefault();
    linkLocation = this.href;
    clickEvent();
  });
  
function clickEvent(){
      $('.page').fadeOut(200, redirectPage);
    }
    function redirectPage(){
        window.location = linkLocation;
    }
$(".fa-arrow-circle-down").click(function() {
  $('html,body').animate({
      scrollTop: $(".contact").offset().top},
        'slow');
});

$('.lightbox_trigger').click(function(){

   let image_src = $(this.querySelector("img")).attr("src");
   let caption = $(this.querySelector(".caption")).html();
    if($('#lightbox').length > 0){
        $('#image').html('<img id="image" src="' + image_src + '"  alt="photo">');
        $('.lightbox-caption').html(caption);
              $('#lightbox').fadeIn(200, function() {

        });
    } else{
      var lightbox = 
      '<div id="lightbox">' +
         '<div id="content">' + 
          '<div id="image">' +
           '<img src=" ' + image_src + '">' +
           '</div>' +
        '</div>' +	
        '<div class="lightbox-caption">' +
            caption +
        '</div>' +
      '</div>';
        
      //insert lightbox HTML into page
      $('.gallery').append(lightbox);

    }
});

$('.gallery').on('click', '#content', function() {
    $('#lightbox').fadeOut(200, function() {

    });
   }); 
  });  
