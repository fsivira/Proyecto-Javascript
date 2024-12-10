function esPrimo(numero) {
  if (numero <= 1) return false; 
  for (let i = 2; i < numero; i++) {
      if (numero % i === 0) return false;
  }
  return true;
}


let continuar = true;

while (continuar) {
  let numero = parseInt(prompt("Ingrese un número para verificar si es primo (o cancele para salir):"));

  if (!isNaN(numero)) {
      if (esPrimo(numero)) {
          alert(`${numero} es un número primo.`);
      } else {
          alert(`${numero} no es un número primo.`);
      }
  } else {
      alert("Por favor, ingrese un número válido.");
  }

  continuar = confirm("¿Desea verificar otro número?");
}

alert("Gracias por usar el programa.");
