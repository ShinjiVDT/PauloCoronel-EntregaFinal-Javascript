

/*---CARRITO---*/

const librosEnCarrito = JSON.parse(localStorage.getItem("librosEnCarritocarrito"))
const carritoVacio = document.querySelector("#carrito-vacio")
const containerCarrito = document.querySelector("#container__carrito")
const carritoAcciones = document.querySelector("#carrito__acciones")
let btnEliminar = document.querySelectorAll(".producto__carrito-eliminar")
const vaciarTodo = document.querySelector("#vaciar")
let total = document.querySelector("#total")

let btnRestar = document.querySelectorAll("#menos")
function cargarCarrito() {
    if (librosEnCarrito && librosEnCarrito.length > 0) {
        mostrarLleno()
        containerCarrito.innerHTML = "";
        librosEnCarrito.forEach(libro => {
            const div = document.createElement("div")
            div.classList.add("producto__carrito")
            div.innerHTML = `  
            <div class="producto__carrito-izquierda">
            <div class="libro-imagen-container">
                <img class="libro-imagen" src="${libro.img}" alt="">
            </div>
            <hr class="carrito__libro-divider">
            </hr>
        </div>
    
    
        <div class="producto__carrito-nombre">
            <h3>${libro.titulo}</h3>
        </div>
        <div>
            <div class="producto__carrito-cantidad"><small>cantidad</small>
            
            <div  class="producto__carrito-cantidad-menos-mas">
                <button class="${libro.id} btnCantidad" id="menos">-</button>
                <p>${libro.cantidad}</p>
                <button class="${libro.id} btnCantidad" id="mas">+</button>
            </div>
        </div>
        </div>
    
        <div class="producto__carrito-precio"><small>precio</small>
            <p>$${libro.precio}</p>
        </div>
        <div class="producto__carrito-subtotal"><small>Subtotal</small>
            <p>$${libro.precio * libro.cantidad}</p>
        </div>
        <button class="producto__carrito-eliminar" id="${libro.id}"><img width="24" height="24"
                src="https://img.icons8.com/material-outlined/24/trash--v1.png" alt="trash--v1" /></button>`;

            containerCarrito.append(div)

        });
    } else {
        console.log("bbb")
        mostrarVacio()
    }
    asignarBtnSumar()
    asignarBtnRestar()
    asignarBtnEliminar();
    calcularTotal()
}

function mostrarLleno() {
    carritoVacio.classList.add("display-none");
    containerCarrito.classList.remove("display-none");
    carritoAcciones.classList.remove("display-none");
}

function mostrarVacio() {
    carritoVacio.classList.remove("display-none");
    containerCarrito.classList.add("display-none");
    carritoAcciones.classList.add("display-none");
}

function asignarBtnEliminar() {
    let btnEliminar = document.querySelectorAll(".producto__carrito-eliminar");
    btnEliminar.forEach(btn => {
        btn.addEventListener("click", eliminarDelCarrito)
    })
}


function eliminarDelCarrito(e) {
    const idBtn = e.currentTarget.id;
    const indexLibroEliminado = librosEnCarrito.findIndex(libro => libro.id === idBtn);
    librosEnCarrito.splice(indexLibroEliminado, 1);
    cargarCarrito()
    localStorage.setItem("librosEnCarrito", JSON.stringify(librosEnCarrito))
}
vaciarTodo.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    librosEnCarrito.length = 0;
    localStorage.setItem("librosEnCarrito", JSON.stringify(librosEnCarrito));
    cargarCarrito()
}
cargarCarrito()


function calcularTotal() {
    const precioTotal = librosEnCarrito.reduce((acc, libro) => acc + (libro.precio * libro.cantidad), 0)
    total.innerText = `$ ${precioTotal}`
};





function asignarBtnRestar() {
    console.log("dsads")
    let btnRestar = document.querySelectorAll("#menos");
    btnRestar.forEach(btn => {
        btn.addEventListener("click", restar)
    })
}

function restar(e) {
    const idBtn = e.currentTarget.classList;
    console.log(idBtn[0])
    const indexRestar = librosEnCarrito.findIndex(libro => libro.id === idBtn[0]);
    if (librosEnCarrito[indexRestar].cantidad > 1) {
        librosEnCarrito[indexRestar].cantidad -= 1;
    } else {
        eliminarDelCarrito(e)
    }
    cargarCarrito()
    localStorage.setItem("librosEnCarrito", JSON.stringify(librosEnCarrito))
}



function asignarBtnSumar() {
    console.log("maaas")
    let btnSumar = document.querySelectorAll("#mas");
    btnSumar.forEach(btn => {
        btn.addEventListener("click", sumar)
    })
}

function sumar(e) {
    const idBtn = e.currentTarget.classList;
    console.log(idBtn[0])
    const indexSumar = librosEnCarrito.findIndex(libro => libro.id === idBtn[0]);

    librosEnCarrito[indexSumar].cantidad += 1;

    cargarCarrito()
    localStorage.setItem("librosEnCarrito", JSON.stringify(librosEnCarrito))
}

