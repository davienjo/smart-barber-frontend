const container = document.getElementById("bookings-container");

function loadBookings() {
  // fetch bookings from backend
  fetch("http://localhost:5000/bookings")
    .then((response) => response.json())
    .then((data) => {
      // clear old bookings
      container.innerHTML = "";

      // handle empty state
      if (data.length === 0) {
        container.innerHTML = "<p>No bookings yet</>";
        return;
      }

      // loop through bookings
      data.forEach((booking) => {
        // create a div for each booking
        const bookingDiv = document.createElement("div");
        bookingDiv.classList.add("booking-card");

        //  put data booking inside
        bookingDiv.innerHTML = `
        <p>Name: ${booking.name}</p>
        <p>Email: ${booking.email}</p>
        <p>Date: ${booking.date}</p>
        <p>Time: ${booking.time}</p>
        <p>Service: ${booking.service}</p>
        <p>Barber: ${booking.barber}</p>

        <div class = "actions">
        <button onclick = "deleteBooking('${booking._id}')">Delete</button>
        <button onclick = "updateBooking('${booking._id}')">Update</button>
        </div>
      `;
        // add it to the page
        container.appendChild(bookingDiv);
      });
    });
}

loadBookings();

// delete booking

function deleteBooking(id) {
  fetch(`http://localhost:5000/bookings/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      alert("booking deleted");
      loadBookings();
    });
}

// edit booking

function editBooking(id) {
  const newTime = prompt("Enter new time:");

  if (!newTime) return;

  fetch(`http://localhost:5000/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ time: newTime }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Booking updated!");
      loadBookings();
    })
    .catch((err) => console.log(err));
}