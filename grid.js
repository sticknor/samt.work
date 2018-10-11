$(document).ready(function() {
  var viewer = ImageViewer();
  
  $(".grid").each(function(index) {
    grid = $($(".grid")[index]);
    var $grid = grid.masonry({
      columnWidth: '.grid-item',
      transitionDuration: 0,
      gutter: 30,
      percentPosition: true,
    });

    $grid.imagesLoaded(function() {
      $grid.masonry('layout');
    });
  });

   $(".grid-item").click(function() {
    if ($(this).hasClass("clickable")) {
      var lowResolutionImage = $(this).data("low-res");
      var highResolutionImage = $(this).data("high-res");
      viewer.show(lowResolutionImage, highResolutionImage);
    }
  });
});