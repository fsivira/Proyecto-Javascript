
function esPrimo(numero) {
  if (numero <= 1) return false; 
  for (let i = 2; i < numero; i++) {
      if (numero % i === 0) return false;
  }
  return true;
}


for (let i = 1; i <= 20; i++) {
  
  if (esPrimo(i)) {
      console.log(`${i} es un número primo.`);
  } else {
      console.log(`${i} no es un número primo.`);
  }
}