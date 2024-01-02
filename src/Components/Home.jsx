import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../context/ProfileContext";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(ProfileContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem("loggedInUser");
    if (!storedProfile) {
      navigate("/");
    } else {
      fetchEvents();
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost/reactcurdphp/api/events.php"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div>
      {/* <h1>Welcome to our Platform, {profile && profile.name}!</h1> */}

      <Carousel>
        {events.map((event, index) => (
          <Carousel.Item key={event.id} active={index === 0}>
            <img
              className="d-block w-100 event-image"
              src={event.banner_image_url}
              alt={event.name}
            />
            <Carousel.Caption>
              <h3 onClick={() => handleEventClick(event.id)}>{event.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;
