$('a[href*="#"]').on('click', function (e) {
    e.preventDefault();

    console.log(':)');

	$('html, body').animate({
		scrollTop: $($(this).attr('href')).offset().top
	}, 1469, 'linear');
});