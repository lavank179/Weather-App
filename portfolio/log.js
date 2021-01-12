  $('#home a[href*="#"]').on('click', function(e) {
      e.preventDefault()

      $('html, body').animate({
              scrollTop: $($(this).attr('href')).offset().top,
          },
          800,
          'linear'
      )
  });



  function post_form() {
      var name = $("#contactName").val();
      var mail = $("#contactEmail").val();
      var messages = $("#contactMessage").val();

      $.ajax({
          url: "http://lavankumarch.heliohost.org/portContact.php",
          type: "POST",
          async: true,
          data: { contactName: name, contactEmail: mail, contactMessage: messages },
          success: function(response) {
              var res = JSON.parse(response);
              console.log(res[0].message);
              alert(res);
          }
      });
  }

  function download_resume() {
      window.location.href = "https://drive.google.com/uc?export=download&id=1-WEmFIYs7h3XELKCmPLkHVRnE9gGJVya";
  }