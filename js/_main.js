$( function() {


    var width = $('.block').width();
  var $container = $('.container').masonry({
    itemSelector: '.block',
    columnWidth: '.block'
  });
   

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
});

function load(){
  alert();
  
}


function randomInt( min, max ) {
  return Math.floor( Math.random() * max + min );
}

function getItem() {
  var width = 400;
  var height = randomInt( 300, 500 );
  var item = '<div class="block">'+
    '<img src="http://lorempixel.com/' + 
      width + '/' + height + '/transport" /></div>';
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