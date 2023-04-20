import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obj } from "./../URL";
import "./style/UserHome.css";

function UserHome() {
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [flights, setFlights] = useState();
  const [booking, setBooking] = useState();
  const navigate = useNavigate();

  // Make sure the user is logged in before rendering the page
  const checkToken = async (token) => {
    try {
      const response = await fetch(`${obj.url}/api/users/checkToken`, {
        method: "POST",
        body: JSON.stringify({
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      // console.log(data);
      if (data.status !== "Success") {
        localStorage.clear();
        navigate("/", { replace: true });
      }
    } catch (error) {
      localStorage.clear();
      navigate("/", { replace: true });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    // console.log(token);
    // console.log(user);
    if (!token) {
      localStorage.clear();
      navigate("/", { replace: true });
    } else {
      checkToken(token);
      loadBookings();
    }
  }, []);

  // Function to search for available flights based on date and time
  const searchFlights = async () => {
    console.log(searchDate, searchTime);
    const from = "Delhi";
    const to = "Bengaluru";

    const url = `${obj.url}/api/flights/search?from=${from}&to=${to}&date=${searchDate}&time=${searchTime}`;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if (response.status === "Success") {
      setFlights(response.data);
      console.log(response);
    } else {
      alert(response.data);
    }
  };

  // Function to book a flight
  const bookFlight = async (flight) => {
    console.log(searchDate);
    try {
      console.log(localStorage.getItem("token"));
      let response = await fetch(`${obj.url}/api/flights/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flightNumber: flight.flightNumber,
          Date: searchDate.split("-")[2],
          noOfSeats: 1,
          token: localStorage.getItem("token"),
        }),
      });
      response = await response.json();
      console.log(response);
      searchFlights();
      loadBookings();
    } catch (error) {
      alert(error);
    }
  };

  // Function to load all the bookings made by the user
  const loadBookings = async () => {
    const url = `${obj.url}/api/flights/myBookings`;
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if (response.status === "Success") {
      setBooking(response.data);
      console.log(response);
    } else {
      alert(response.data);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <div className="heading1">WELCOME {localStorage.getItem("user")}</div>
        <div className="heading2">welcome to flight booking system</div>

        <div className="search-div">
          <div style={{ fontWeight: "600", alignSelf: "center" }}>Search Flights</div>
          <div>
            <label>Select Date </label>
            <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
          </div>
          <div>
            <label>Select Time</label>
            <input type="time" value={searchTime} onChange={(e) => setSearchTime(e.target.value)} />
          </div>
          <button onClick={searchFlights} style={{ alignSelf: "center" }}>
            Search
          </button>
        </div>
      </div>

      {flights && (
        <div className="available-container">
          <div className="heading1">Available Flights</div>
          <div>
            <table>
              <thead>
                <tr>
                  <th> Airline </th>
                  <th> Flight </th>
                  <th> Arrival </th>
                  <th> Departure </th>
                  <th> Seats </th>
                  <th> Price </th>
                  <th> Book </th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight._id}>
                    <td>{flight.airLine}</td>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.arrivalTime}</td>
                    <td>{flight.departureTime}</td>
                    <td>{flight.day[0]}</td>
                    <td>{flight.price}</td>
                    <td>
                      <button onClick={() => bookFlight(flight)}>Book</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {booking && (
        <div className="available-container">
          <div className="heading1">My Bookings:</div>
          <table>
            <thead>
              <tr>
                <th>Flight</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((book) => (
                <tr key={book._id}>
                  <td>{book.flightNumber}</td>
                  <td>{book.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserHome;
