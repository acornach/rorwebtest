var currentPage = 1;
var intervalID = -1000;
 
function checkmyScroll() {
  if (nearBottomOfPage()) {
    currentPage++;
  console.log("endless request "+ currentPage);
    jQuery.ajax('../pages/testview?page=' + currentPage, {asynchronous:true, evalScripts:true, method:'get', success: function(data, textStatus, jqXHR) {
		$('.DIV_ID').append(jQuery(data).find('.DIV_ID').html());
		if(typeof jQuery(data).find('.DIV_ID').html() == 'undefined' || jQuery(data).find('.DIV_ID').html().trim().length == 0){
			clearInterval(intervalID);
		}
	},});
  }
}
 
function near2BottomOfPage() {
  return scrollDistanceFromBottom() < 50;
}
 
function scroll2DistanceFromBottom(argument) {
  return pageHeight() - (window.pageYOffset + self.innerHeight);
}
 
function page2Height() {
  return Math.max(document.body.scrollHeight, document.body.offsetHeight);
}
 
$('document').ready(function(){
	//intervalID = setInterval(checkmyScroll, 250);
})