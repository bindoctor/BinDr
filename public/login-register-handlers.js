$(document).ready(function () {
  $(function () {
    $('#loginForm').on('submit', function (event) {
      event.preventDefault();
      $.ajax({
        url: '/api/users/login',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          "user": {
            "email": document.getElementById('email').value,
            "password": document.getElementById('password').value
          }
        }),
        success: function(response, error) {
          document.cookie = `Auth=${response.user.token}`;
          window.location.replace('/');
        },
        error: function() {
          console.log("OOOPS THERE WAS AN ERROR")
        }
      });
    });
  });
  $(function () {
    $('#signupForm').on('submit', function (event) {
      event.preventDefault();
      $.ajax({
        url: '/api/users',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          "user": {
            "email": document.getElementById('signup-email').value,
            "password": document.getElementById('signup-password').value
          }
        }),
        success: function(response, error) {
          window.location.replace('/login');
        },
        error: function() {
          console.log("OOOPS THERE WAS AN ERROR");
        }
      });
    });
  });

  $(function () {
    $('#logout').on('click', function(event) {
      console.log('logout');
      $.cookie("Auth", "", -1);
    })
  });
});
