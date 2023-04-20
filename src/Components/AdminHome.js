import React, { useState, useEffect } from "react";
import "./style/AdminHome.css";
import { obj } from "./../URL";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const [flights, setFlights] = useState([]);
  const [flightNumber, setFlightNumber] = useState("");
  const [airline, setAirline] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const [remove, setRemove] = useState("");
  const [search, setSearch] = useState("");

  const checkToken = async (token) => {
    try {
      const response = await fetch(`http://${obj.url}/api/users/checkToken`, {
        method: "POST",
        body: JSON.stringify({
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
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
    if (!token) {
      localStorage.clear();
      navigate("/adminlogin", { replace: true });
    } else {
      checkToken(token);
    }
  }, []);

  const addFight = async (body) => {
    try {
      const response = await fetch(`http://${obj.url}/api/flights`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log(data);
      if (data.status === "Success") {
        alert(data.status);
      } else {
        alert(data.data);
      }
    } catch (error) {
      localStorage.clear();
      navigate("/", { replace: true });
    }
  };
  const handleAddFlight = () => {
    const newFlight = {
      flightNumber,
      airline,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      price,
      day: [
        {
          1: 60,
        },
        {
          2: 60,
        },
        {
          3: 60,
        },
        {
          4: 60,
        },
        {
          5: 60,
        },
        {
          6: 60,
        },
        {
          7: 60,
        },
        {
          8: 60,
        },
        {
          9: 60,
        },
        {
          10: 60,
        },
        {
          11: 60,
        },
        {
          12: 60,
        },
        {
          13: 60,
        },
        {
          14: 60,
        },
        {
          15: 60,
        },
        {
          16: 60,
        },
        {
          17: 60,
        },
        {
          18: 60,
        },
        {
          19: 60,
        },
        {
          20: 60,
        },
        {
          21: 60,
        },
        {
          22: 60,
        },
        {
          23: 60,
        },
        {
          24: 60,
        },
        {
          25: 60,
        },
        {
          26: 60,
        },
        {
          27: 60,
        },
        {
          28: 60,
        },
        {
          29: 60,
        },
        {
          30: 60,
        },
        {
          31: 60,
        },
      ],
      token: localStorage.getItem("token"),
    };
    console.log(newFlight);
    addFight(newFlight);
  };

  const handleRemoveFlight = async (flight) => {
    try {
      const response = await fetch(`http://${obj.url}/api/flights`, {
        method: "DELETE",
        body: JSON.stringify({ flightNumber: flight, token: localStorage.getItem("token") }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Success");
      } else {
        let data = await response.json();
        console.log(data);
        if (data.status === "Success") {
          alert(data.status);
        } else {
          alert(data.data);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleSearchFlight = async () => {
    try {
      const response = await fetch(`http://${obj.url}/api/flights/bookingBasedOnFlight`, {
        method: "POST",
        body: JSON.stringify({ flightNumber: search, token: localStorage.getItem("token") }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      console.log(data);
      if (data.status !== "Success") {
        setFlights(null);
        alert(data.data);
      } else {
        setFlights(data.data);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <h2>Admin Home Page</h2>
        <div className="search-div">
          <div className="heading1" style={{ alignSelf: "center" }}>
            Add Flight
          </div>

          <div>
            <label>Flight </label>
            <input type="text" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} />
          </div>
          <div>
            <label>Airline </label>
            <input type="text" value={airline} onChange={(e) => setAirline(e.target.value)} />
          </div>
          <div>
            <label>From </label>
            <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label>To </label>
            <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div>
            <label>Duration </label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div>
            <label>Price </label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <label>Arrival Time </label>
            <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
          </div>
          <div>
            <label>Departure Time </label>
            <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
          </div>

          <button onClick={handleAddFlight} style={{ alignSelf: "center" }}>
            Add Flight
          </button>
        </div>
      </div>

      <div className="search-container">
        <div className="heading1">Remove Flight</div>
        <div className="search-div">
          <div>
            <label>Flight Number </label>
            <input type="text" value={remove} onChange={(e) => setRemove(e.target.value)} />
          </div>
          <button onClick={() => handleRemoveFlight(remove)} style={{ alignSelf: "center" }}>
            Remove
          </button>
        </div>
      </div>

      <div className="search-container">
        <h3>View Bookings</h3>
        <div className="search-div">
          <div>
            <label>Flight Number </label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button onClick={handleSearchFlight} style={{ alignSelf: "center" }}>
            Search
          </button>
          {flights && (
            <div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th> Flight </th>
                      <th> User </th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight) => (
                      <tr key={flight._id}>
                        <td>{flight.flight}</td>
                        <td>{flight.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/adminLogin");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminHome;
