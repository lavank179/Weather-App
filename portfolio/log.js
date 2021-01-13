//smooth scroll onclick nav-link
$('#home a[href*="#"]').on('click', function(e) {
    e.preventDefault()

    $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        },
        800,
        'linear'
    )
});




//Resume download hyperlink
function download_resume() {
    window.location.href = "https://drive.google.com/uc?export=download&id=1-WEmFIYs7h3XELKCmPLkHVRnE9gGJVya";
}



//card shadowing on over in contact
$("#contact .card").mouseenter(function() {
    $(this).addClass("shadow-lg");
})

$("#contact .card").mouseleave(function() {
    $(this).removeClass("shadow-lg");
})





//Nav-link active on scrolling to appropriate section
$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop() + 100;

    $('section').each(function(i) {
        if ($(this).position().top <= scrollDistance) {
            $('ul a.active1').removeClass('active1');


            $('ul a').eq(i).addClass('active1');

        }
    });
}).scroll();