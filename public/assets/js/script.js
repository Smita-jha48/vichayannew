const loginPopup = document.querySelector(".login-popup");
const close = document.querySelector(".close");
window.addEventListener("load", function () {

  var isvisited = sessionStorage.getItem('isvisited');
  if (!isvisited) {
    showPopup();
  }
})
function showPopup() {
  const timeLimit = 3 // seconds;
  let i = 0;
  const timer = setInterval(function () {
    i++;
    if (i == timeLimit) {
      clearInterval(timer);
      loginPopup.classList.add("show");
    }
    console.log(i);
  }, 1000);
}
close.addEventListener("click", function () {
  loginPopup.classList.remove("show");
})



function clickCounter() {
  $.ajax({
    type: "POST",
    url: '/',
    data: $("#counter").serialize(),
    dataType: "json",
    success: function (response) {
      //success message mybe...jQuery.parseJSON

      console.log(response);
      if (response.status) {
        loginPopup.classList.remove("show");
        sessionStorage.setItem('isvisited', true);
      }

    }
    
  });


}
