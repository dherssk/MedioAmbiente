/*!
 * Start Bootstrap - Grayscale v7.0.3 (https://startbootstrap.com/theme/grayscale)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// consumo de la api
const endpoint = "http://localhost:4000/";

// valores de los imputs par agregar nuevo consejo

let userEmail = document.getElementById("recipient-email");
let nombre = document.getElementById("recipient-name");
let message = document.getElementById("message-text");
let frmConsejoEnviar = document.getElementById("frmEnviarConsejo");
var frmConsejo = new bootstrap.Modal(document.getElementById("frmConsejo"));
let btnConsejoAleatorio = document.getElementById("btnRuletaConsejos");
let btnCerrar = document.getElementById("btnCerrar");

/* let btnAddConsejo = document.getElementById("btnAddConsejo");
  btnAddConsejo.addEventListener("click", () => {
  userEmail.value = "";
  nombre.value = "";
  message.value = "";
  frmConsejo.show();
}); */

// funcion para Lista de consejos (llenada aleatoreamente)
function mostrarConsejos(){
  fetch(endpoint + "consejos")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    result1 = getRandomIndConsejo(0, datos.length - 1);
    result2 = getRandomIndConsejo(0, datos.length - 1);

    let consejos1 = document.getElementById("consejo1");
    consejos1.innerHTML += `
      <h4 class="text-white">Consejo # ${datos[result1].id}</h4>
      <p class="mb-0 text-white-50" id="msConsejo2">${datos[result1].consejos}</p>`;

    let consejos2 = document.getElementById("consejo2");
    consejos2.innerHTML += `
      <h4 class="text-white">Consejo # ${datos[result2].id}</h4>
      <p class="mb-0 text-white-50" id="msConsejo2">${datos[result2].consejos}</p>`;
  });
}

mostrarConsejos();


btnConsejoAleatorio.addEventListener("click", () => {
  let consejos1 = document.getElementById("consejo1");
  let consejos2 = document.getElementById("consejo2");
  consejos1.innerHTML = '';
  consejos2.innerHTML = '';

  // Lista de consejos (llenada aleatoreamente)
  mostrarConsejos();  
});

frmEnviarConsejo.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Valor: " + message.value);
  //Validar los campos
  //Condiciones para validar
  if (message.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor agrege un consejo",
    });
  } else {
    //prevenir envio automatico
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail.value,
        nombre: nombre.value,
        mensaje: message.value,
      }),
    })
      .then((response) => response.json()) //primer respusta del recurso
      .then((response) => {
        Swal.fire("Felicidades!", "Consejo verde Guardado!", "success");
        document.getElementById("frmEnviarConsejo").reset();
      });
    frmConsejo.hide();
  }
});

btnCerrar.addEventListener("click", (e)=>{
  document.getElementById("frmEnviarConsejo").reset();
})

//Función para generar un indice aleatorio del Array de turnos
function getRandomIndConsejo(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) + min;
  return result;
}
