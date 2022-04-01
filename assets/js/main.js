/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

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

function calcStaking(){
    var amount = document.getElementById("myada-input").value;
    var ROS = $("#currentROS").text();
    var ROSPerYear = (parseFloat(ROS)/100);
    var total = parseFloat(amount*ROSPerYear).toFixed(2);
    $("#returnOnADA").text(total);
}

function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

$('.calc-input #myada-input').bind('keyup mouseup', function(){
    calcStaking();
});

console.log("Fetching data...");
getJSON("https://js.adapools.org/pools/f76e3a1104a9d816a67d5826a155c9e2979a839d0d944346d47e33ab/summary.json").then(data => {
  //console.log(data);
  //var freeSpace = (((31112483745) / 500) - (data.data.total_stake / 1000000)).toFixed(0);
  var freeSpace = (((data.data.total_stake / data.data.saturated) - data.data.total_stake) / 1000000).toFixed(0);
  //console.log(freeSpace);
  if (freeSpace > 100) {
  	freeSpace = numberWithCommas(freeSpace)
	$("#space_msg").text("OPEN: We have space for " + freeSpace + " ADA.");
	$("#currentStatus").text("OPEN: ACCEPTING NEW DELEGATIONS. Space for "+ freeSpace + " ADA.");
  } else {
	$("#space_msg").text("FULL: We're out of space. Thanks for looking!");
	$("#currentStatus").text("FULL: NO ROOM FOR NEW DELEGATIONS.");
  }
  // ros calc
  var ros = data.data.roa_lifetime;
	$("#currentROS").text(ros);
	calcStaking();
}).catch(error => {
  console.error(error);
});
$(document).ready(function(){
    var clipboard = new ClipboardJS('#btn_copy');
    
        clipboard.on('success', function(e) {
        $("#btn_copy span").text("Copied");
            
            setTimeout(function () {
                    $("#btn_copy span").text("Copy Pool ID");
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
