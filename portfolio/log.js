  $('#home a[href*="#"]').on('click', function(e) {
      e.preventDefault()

      $('html, body').animate({
              scrollTop: $($(this).attr('href')).offset().top,
          },
          800,
          'linear'
      )
  });

  function download_resume() {
      window.location.href = "https://drive.google.com/uc?export=download&id=1-WEmFIYs7h3XELKCmPLkHVRnE9gGJVya";
  }