// When the user scrolls the page, execute myFunction 
window.onscroll = function () {
  myFunction()
};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

//account and sign in/out
window.onload = account()

function account() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById("sign_out").style.display = 'block';
      document.getElementById("sign_in").style.display = 'none';
    } else {
      document.getElementById("sign_in").style.display = 'block';
      document.getElementById("sign_out").style.display = 'none';
    }
  });
};

function signOut() {
  firebase.auth().signOut().then(function () {
    console.log('Signed Out');
  }, function (error) {
    console.error('Sign Out Error', error);
  })
  window.location.href = '/';
};

function signIn() {
  window.location.href = '/login';
};