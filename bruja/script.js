/*var carta = document.getElementsByClassName("flip-card");

function change() {
    if (carta.classList.contains("clickeado")) {
        carta.classList.remove("clickeado");
    } else {
        carta.classList.add("clickeado");
    }
}
carta.addEventListener("click", change(), false);
*/

var cards = document.querySelectorAll('.card');

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});


function showDiv() {
  var myDiv = document.getElementById("myDiv");
  var myBack = document.getElementById("back");
  myDiv.classList.toggle("show");
  myBack.classList.toggle("col");
}