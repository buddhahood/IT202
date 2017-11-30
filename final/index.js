$("a").on("click", function(){
  $(".oneAtATime").not(".hidden").addClass("hidden");
  var target=$(this).attr("href");
  $(target).removeClass("hidden");
  return false;
})