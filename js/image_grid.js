$( function() {


   
  load();


});

$('.middle_layer').click(function(){
   $('.pic_enlarged_container').hide();
   $('.middle_layer').hide();
})

$('.pic_enlarged_container').click(function(){
   $('.pic_enlarged_container').hide();
   $('.middle_layer').hide();
})

$(document).on('click', '.block', function(){ 
  var url = $(this).attr('data-url');
  $('.middle_layer').show();
  $('.pic_enlarged_container').html("<img src='"+url+"'</img>");
  $('.pic_enlarged_container').show();
}
)

 
  var $container = $('.container').masonry({
    itemSelector: '.block',
    columnWidth: '.block'
  });
   
  function load(){
    var $items = getItems();
    // hide by default
    $items.hide();
    // append to container
    $container.append( $items );
    $items.imagesLoaded().progress( function( imgLoad, image ) {
      // get item
      // image is imagesLoaded class, not <img>
      // <img> is image.img
      var $item = $( image.img ).parents('.block');
      // un-hide item
      $item.show();
      // masonry does its thing
      $container.masonry( 'appended', $item ).masonry();
    });

    
  }



function randomInt( min, max ) {
  return Math.floor( Math.random() * max + min );
}

function getItem() {
  var width = 400;
  var height = randomInt( 200, 400 );
  var imageurl = 'http://lorempixel.com/' + 
      width + '/' + height + '/transport';

  var testurl = 'goos';
  var item = '<div class="block" data-url="'+imageurl+'">'+
    '<div class="block_middle_layer"><p>Some info here</p></div><img src="'+imageurl+'" /></div>';
  return item;
}

function getItems() {
  var items = '';
  for ( var i=0; i < 20; i++ ) {
    items += getItem();
  }

  // return jQuery object
  return $( items );
}

function enlarge(url){
  alert();
}