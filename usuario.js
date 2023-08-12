
let usuario;
const loginButton = document.querySelector("#loginButton");
let loginBox = document.getElementById("loginBox");
loginButton.addEventListener("click", mostrarMenuUsuario)

function mostrarMenuUsuario() {
    if (loginBox.style.display === "flex") {
      loginBox.style.display = "none";
    } else {
      loginBox.style.display = "flex";
    }
  };   


  const labels = document.querySelectorAll('.animacion-label');
labels.forEach(label =>{
    label.innerHTML = label.innerText
    .split('')
    .map((letter,idx) => `<span style="transition-delay:${idx * 65}ms">${letter}</span>`)
    .join('')
})
/* 
document.addEventListener("DOMContentLoaded", function() {
    let loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (email === "a" && password === "a") {
            mostrarMenuUsuario();
            usuario = true;
            let = usuarioAlta
            const usuarioAlta = JSON.parse(localStorage.usuarioAlta("librosEnCarrito"))
            console.log("dentro");
        } else {
            mostrarMenuUsuario();
            console.log("afuera");
            usuario = false;
        }

        // Acciones que dependen del valor de usuario
        if (usuario) {
            console.log("El usuario ha iniciado sesión.");
        } else {
            console.log("El usuario no ha iniciado sesión.");
        }
    });
}); */

document.addEventListener("DOMContentLoaded", function() {
    const usersDatabase = [
        { email: "a", password: "a" },
        { email: "usuario2", password: "contrasena2" },
        // Agrega más usuarios aquí...
    ];

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = usersDatabase.find(user => user.email === email && user.password === password);

        if (user) {
            console.log("Inicio de sesión exitoso");
            saveLoginStatus(true);
            // Realiza acciones después del inicio de sesión exitoso
        } else {
            console.log("Nombre de usuario o contraseña incorrectos");
            saveLoginStatus(false);
            // Mostrar mensaje de error o realizar otras acciones
        }
    });

    function saveLoginStatus(status) {
        const loginStatus = { isLoggedIn: status };
        const jsonString = JSON.stringify(loginStatus);

        // Guardar en el almacenamiento local del navegador
        localStorage.setItem("loginStatus", jsonString);
    }
});