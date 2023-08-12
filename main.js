
const containerProductos = document.querySelector("#container-prductos");
const tipo = document.querySelectorAll(".tipo");
const titulo = document.querySelector("#titulo");
const carritoCantidad = document.querySelector("#carrito-cantidad");
let botonAgregar = document.querySelectorAll(".libro-agregar")
const libroGratis = document.querySelector("#libro-gratis");

function cargarlibros(seleccion) {
    containerProductos.innerHTML = "";
    let sel= seleccion.filter(libro => libro.tipo === "animado")
    if (sel.length > 0){  
    const gratis = document.createElement("div");
    gratis.classList.add("libro")
    gratis.innerHTML = `
    
    <div class="gratis__container">
    <div class="gratis__texto"><span>GRATIS!</div>
    </div>

    <div class="productos__libro-imagen-container">
       <img class="productos__libro-imagen" src="./imagenes/omelas.jpg" alt="sas"></div>
    <div class="libro-title">"El ojo de miedo"</div>
    <div class="libro-subtitle">"Una hermosa historia sobre enfrentar y vencer miedos"</div>
    <hr class="libro-divider">
    <div class="libro-footer">
        <div class="libro-price"><span>$</span>0</div>

     
        <button class="libro-agregar" id="libro-gratis"  onclick=window.location='./Cuento/index.html'>    
        <img src="./imagenes/iconos_tienda/ojo.png" alt="icono carrito">   
        </button>
    </div>
</div> `
containerProductos.append(gratis) }
    seleccion.forEach(libro => {
        const div = document.createElement("div");
        div.classList.add("libro")
        div.innerHTML = `
        <div class="productos__libro-imagen-container">
           <img class="productos__libro-imagen" src="${libro.img}" alt="${libro.titulo}"></div>
        <div class="libro-title">${libro.titulo}</div>
        <div class="libro-subtitle">${libro.descripcion}</div>
        <hr class="libro-divider">
        <div class="libro-footer">
            <div class="libro-price"><span>$</span>${libro.precio}</div>
            <button class="libro-agregar" id="${libro.id}">
        <img src="./imagenes/iconos_tienda/shopping-cart.png" alt="icono carrito">
            </button>
        </div>
    </div> `
            ;
  
        containerProductos.append(div)
        
    })
   
    let botonAgregar = document.querySelectorAll(".libro-agregar");
    botonAgregar.forEach(btn=>{
        btn.addEventListener("click",agregarCarrito)
})
}
const animados = libros.filter(libro => libro.tipo === "animado");
        cargarlibros(animados)


tipo.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const categoriaTipo = libros.find(libro=>libro.tipo===e.currentTarget.id);
titulo.innerText=categoriaTipo.categoria
        tipo.forEach(boton => (boton.classList.remove("seleccionado")));

        e.currentTarget.classList.add("seleccionado");

        const librosTipo = libros.filter(libro => libro.tipo === e.currentTarget.id);
        cargarlibros(librosTipo)
    })
})

let carrito

    let storage =JSON.parse(localStorage.getItem("librosEnCarrito"));
    if(storage){
        carrito=storage;
    }else{
         carrito=[];}




function agregarCarrito(e){
const idBtn = e.currentTarget.id;
const agregado=libros.find(libro => libro.id===idBtn)

if(carrito.some(libro=>libro.id === idBtn)){
const indexLibro= carrito.findIndex(libro=>libro.id===idBtn)
carrito[indexLibro].cantidad+=1
}else{
    agregado.cantidad = 1;
    carrito.push(agregado);
}
actualizarCantidad()

localStorage.setItem("librosEnCarrito",JSON.stringify(carrito));

}
actualizarCantidad()
function actualizarCantidad(){
let cantidad=carrito.reduce((acc,libro)=>acc+libro.cantidad, 0);
carritoCantidad.innerText=cantidad  
}

