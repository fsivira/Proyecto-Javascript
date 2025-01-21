const cars = [
    { modelo: "Toyota Corolla", colores: ["Rojo", "Blanco", "Azul"], precio: 20000000 },
    { modelo: "Honda Civic", colores: ["Negro", "Gris", "Plata"], precio: 22000000 },
    { modelo: "Ford Ranger", colores: ["Blanco", "Rojo"], precio: 35000000 },
    { modelo: "Chevrolet Silverado", colores: ["Azul", "Gris"], precio: 50000000 },
];

// Variables
const carContainer = document.getElementById("cars");
const selectedCarElement = document.getElementById("selectedCar");
const initialAmountInput = document.getElementById("initialAmount");
const interestRateInput = document.getElementById("interestRate");
const monthsInput = document.getElementById("months");
const calculateButton = document.getElementById("calculateButton");
const totalPaymentElement = document.getElementById("totalPayment");
const monthlyPaymentElement = document.getElementById("monthlyPayment");

let selectedCar = null;

// Mostrar autos en el DOM
function displayCars() {
    cars.forEach((car, index) => {
        const carDiv = document.createElement("div");
        carDiv.classList.add("car");
        carDiv.innerHTML = `
        <h3>${car.modelo}</h3>
        <p>Colores: ${car.colores.join(", ")}</p>
        <p>Precio: $${car.precio}</p>
        <button onclick="selectCar(${index})">Seleccionar</button>`;
        carContainer.appendChild(carDiv);
    });
}

// Seleccionar un auto
function selectCar(index) {
    selectedCar = cars[index];
    selectedCarElement.textContent = `${selectedCar.modelo} - $${selectedCar.precio}`;
}

// Calcular el financiamiento
function calculateFinancing() {
    if (!selectedCar) {
        alert("Por favor, selecciona un auto.");
        return;
    }

    const initialAmount = parseFloat(initialAmountInput.value) || 0;
    const interestRate = parseFloat(interestRateInput.value) || 0;
    const months = parseInt(monthsInput.value) || 0;

    if (months <= 0) {
        alert("El plazo debe ser mayor a 0.");
        return;
    }

    const loanAmount = selectedCar.precio - initialAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayment = loanAmount * (1 + monthlyRate * months);
    const monthlyPayment = totalPayment / months;

    totalPaymentElement.textContent = totalPayment.toFixed(2);
    monthlyPaymentElement.textContent = monthlyPayment.toFixed(2);

    saveToLocalStorage(selectedCar, totalPayment, monthlyPayment);
}

// Guardar datos en localStorage
function saveToLocalStorage(car, totalPayment, monthlyPayment) {
    const data = {
        car,
        totalPayment,
        monthlyPayment,
    };
    localStorage.setItem("financingData", JSON.stringify(data));
}

// Cargar datos de localStorage
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("financingData"));
    if (data) {
        selectedCar = data.car;
        selectedCarElement.textContent = `${selectedCar.modelo} - $${selectedCar.precio}`;
        totalPaymentElement.textContent = data.totalPayment.toFixed(2);
        monthlyPaymentElement.textContent = data.monthlyPayment.toFixed(2);
    }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    displayCars();
    loadFromLocalStorage();
});

calculateButton.addEventListener("click", calculateFinancing);
