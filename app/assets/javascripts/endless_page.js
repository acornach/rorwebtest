var currentPage = 1;
var intervalID = -1000;

function checkScroll() {
	if (nearBottomOfPage()) {
		currentPage++;
		//new $.ajax('/pages/testview?page=' + currentPage, {asynchronous:true, evalScripts:true, method: 'get'})
		jQuery.ajax('/pages/testview?page=' + currentPage, {asynchronous:true, evalScripts:true, method:'get', success: function(data, textStatus, jqXHR) {
		$('.pages').append(jQuery(data).find('.pages').html());
		if(typeof jQuery(data).find('.pages').html() == 'undefined' || jQuery(data).find('.pages').html().trim().length == 0){
			clearInterval(intervalID);
		}
	},});
	}
};



function nearBottomOfPage() {
	return scrollDistanceFromBottom() < 150;
}

function scrollDistanceFromBottom(argument) {
	return pageHeight() - (window.pageYOffset + self.innerHeight);
}

function pageHeight(){
	return Math.max(document.body.scrollHeight, document.body.offsetHeight);
}

$('document').ready(function(){
	intervalID = setInterval(checkScroll, 250);
	//window.setInterval(function(){
  //checkScroll();
//}, 250);

$('ul li').mouseenter(function(){
        caption = $(this).find('div');

    caption.fadeIn();
}).mouseleave(function(){
        caption = $(this).find('div');
    caption.fadeOut();
});

});
