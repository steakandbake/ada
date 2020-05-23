/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
/*
function clipboardAddress(address) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(address).select();
  document.execCommand("copy");
  $temp.remove();
}*/

const getJSON = async url => {
  try {
    const response = await fetch(url);
    if(!response.ok) // check if response worked (no 404 errors etc...)
      throw new Error(response.statusText);

    const data = await response.json(); // get JSON from the response
    return data; // returns a promise, which resolves to this data value
  } catch(error) {
    return error;
  }
}

function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

console.log("Fetching data...");
getJSON("https://pooltool.s3-us-west-2.amazonaws.com/8e4d2a3/pools/bbd7c079eeb2d60a5c625b1e2787b088b651ccbdccac5cc93e64d63205a3251b/livestats.json").then(data => {
  //console.log(data);
  var freeSpace = ((100000000000000 - data.livestake) / 1000000).toFixed(0);
  //console.log(freeSpace);
  if (freeSpace > 100) {
  	freeSpace = numberWithCommas(freeSpace)
	$("#space_msg").text("OPEN: We have space for " + freeSpace + " ada.");
	$("#currentStatus").text("ACCEPTING NEW DELEGATIONS. Space for "+ freeSpace + " ada.");
  } else {
	//$("#space_msg").text("CLOSED: We're out of space. Thanks for looking!");
	//$("#currentStatus").text("CLOSED FOR DELEGATIONS.");
  }
}).catch(error => {
  console.error(error);
});

$(document).ready(function(){
    var clipboard = new ClipboardJS('#btn_copy');
    
        clipboard.on('success', function(e) {
        $("#btn_copy span").text("Copied");
            
            setTimeout(function () {
                    $("#btn_copy span").text("Copy Address");
                }, 2000);
            });
        });

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

})(jQuery);
