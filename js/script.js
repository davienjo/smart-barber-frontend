// get the form

const form = document.getElementById("book-appointment-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  
const formData = {
    name:document.getElementById("name").value,
    email:document.getElementById("email").value,
    time:document.getElementById("time").value,
    date:document.getElementById("date").value,
    service:document.getElementById("services").value,
    barber:document.getElementById("barber").value
  };

  const response = await fetch("http://localhost:5000/bookings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

const data = await response.json();
console.log(data);

});