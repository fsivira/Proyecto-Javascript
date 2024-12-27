const Producto = function (nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
};

let producto1 = new Producto("barra de chocolate negro", 15000, 20);
let producto2 = new Producto("barra chocolate de leche", 15000, 20);
let producto3 = new Producto("bombones macizos", 16000, 30);
let producto4 = new Producto("bombones rellenos", 16000, 40);
let producto5 = new Producto("bombones sin azucar", 16500, 25);
let producto6 = new Producto("barras sin azucar", 16500, 50);
let producto7 = new Producto("chocolate en polvo", 65000, 15);

let lista = [producto1, producto2, producto3, producto4, producto5, producto6, producto7];

function agregarProducto() {
    let nombre = prompt("Ingresa el nombre del producto").trim();
    let precio = parseFloat(prompt("Ingresa el precio del producto"));
    let stock = parseInt(prompt("Ingresa el stock del producto"));

    if (isNaN(precio) || isNaN(stock) || nombre === "" || precio <= 0 || stock <= 0) {
        alert("Por favor, ingrese valores válidos (nombre no vacío, precio y stock mayores a 0).");
        return;
    }

    let producto = new Producto(nombre, precio, stock);
    lista.push(producto);

    console.table(lista);
}

function filtrarProductos() {
    let palabraClave = prompt("Ingresa el nombre o una palabra clave para buscar productos").trim().toLowerCase();

    if (palabraClave === "") {
        alert("Por favor, ingresa una palabra clave válida.");
        return;
    }

    let resultado = lista.filter((producto) =>
        producto.nombre.toLowerCase().includes(palabraClave)
    );

    if (resultado.length > 0) {
        console.table(resultado);
    } else {
        alert("No se encontraron productos que coincidan con la búsqueda.");
    }
}

agregarProducto();
filtrarProductos();