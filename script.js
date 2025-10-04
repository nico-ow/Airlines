let booking = {};
let selectedFlight = null;
let passenger = {};

const steps = document.querySelectorAll(".step");
const progress = document.querySelectorAll(".progress-step");

function showStep(index) {
  steps.forEach((s, i) => s.classList.toggle("active", i === index));
  progress.forEach((p, i) => p.classList.toggle("active", i <= index));
}

document.getElementById("flightType").addEventListener("change", e => {
  document.getElementById("returnDiv").style.display =
    e.target.value === "round" ? "block" : "none";
});

document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();

  booking = {
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    type: document.getElementById("flightType").value,
    depart: document.getElementById("departDate").value,
    returnDate: document.getElementById("returnDate").value,
    passengers: document.getElementById("numPassengers").value
  };

  renderFlights();
  showStep(1);
});

function renderFlights() {
  const list = document.getElementById("flightsList");
  list.innerHTML = "";

  const sampleFlights = [
    { no: "5J560", time: "08:00 AM", price: 2500, fare: "Promo" },
    { no: "PR214", time: "10:30 AM", price: 3000, fare: "Regular" },
    { no: "Z243", time: "2:00 PM", price: 2800, fare: "Promo" }
  ];

  sampleFlights.forEach(f => {
    const card = document.createElement("div");
    card.classList.add("flight-card");
    card.innerHTML = `
      <div>
        <p><strong>${booking.from}</strong> → <strong>${booking.to}</strong></p>
        <p>Flight No: ${f.no}</p>
        <p>Depart: ${booking.depart} - ${f.time}</p>
        <p>Fare Type: ${f.fare}</p>
      </div>
      <div style="text-align:right;">
        <p><strong>₱${f.price}</strong></p>
        <button class="btn-primary">Select</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      selectedFlight = f;
      showStep(2);
    });
    list.appendChild(card);
  });
}

document.getElementById("passengerForm").addEventListener("submit", e => {
  e.preventDefault();
  passenger = {
    name: document.getElementById("pName").value,
    age: document.getElementById("pAge").value,
    gender: document.getElementById("pGender").value
  };
  showSummary();
  showStep(3);
});

function showSummary() {
  const card = document.getElementById("summaryCard");
  const total = selectedFlight.price * booking.passengers;
  card.innerHTML = `
    <p><strong>From:</strong> ${booking.from}</p>
    <p><strong>To:</strong> ${booking.to}</p>
    <p><strong>Flight No:</strong> ${selectedFlight.no}</p>
    <p><strong>Date:</strong> ${booking.depart}</p>
    <p><strong>Passenger:</strong> ${passenger.name} (${passenger.gender}, ${passenger.age})</p>
    <p><strong>Total:</strong> ₱${total}</p>
    <p><strong>Terminal:</strong> Terminal 3</p>
  `;
}

document.getElementById("bookNow").addEventListener("click", () => {
  const toast = document.getElementById("toast");
  const passengerName = document.getElementById("passengerName")?.value || "Valued Guest";

  toast.innerHTML = `
    🎉 <strong>Booking Successful!</strong><br>
    Thank you, <strong>${passengerName}</strong>, for choosing <strong>AirLines</strong>.
  `;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);

  showStep(0); 
});


document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    const current = [...steps].findIndex(s => s.classList.contains("active"));
    if (current > 0) showStep(current - 1);
  });
});
