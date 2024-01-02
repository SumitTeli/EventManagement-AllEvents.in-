import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../context/ProfileContext";
import "./EventList.css";

const EventList = () => {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);
  const [events, setEvents] = useState([]);
  const [cityFilters, setCityFilters] = useState({});
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [selectedCityFilters, setSelectedCityFilters] = useState({});
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const storedProfile = localStorage.getItem("loggedInUser");
    if (!storedProfile) {
      navigate("/");
    } else {
      axios
        .get("http://localhost/reactcurdphp/api/events.php")
        .then((response) => {
          const eventData = response.data;
          setEvents(eventData);
          updateFilters(eventData);
        })
        .catch((error) => {
          console.error("Error fetching events: ", error);
        });

      axios
        .get("http://localhost/reactcurdphp/api/event.php")
        .then((response) => {
          const categories = response.data;
          setCategoryData(categories);
          updateCategoryFilters(categories);
        })
        .catch((error) => {
          console.error("Error fetching categories: ", error);
        });
    }
  }, [profile, navigate]);

  useEffect(() => {
    updateCategoryFilters(categoryData);
  }, [categoryData, events]);

  const updateFilters = (eventsData) => {
    const cityCounts = {};
    const categoryCounts = {};

    eventsData.forEach((event) => {
      cityCounts[event.city] = (cityCounts[event.city] || 0) + 1;
      categoryCounts[event.category_id] =
        (categoryCounts[event.category_id] || 0) + 1;
    });

    setCityFilters(cityCounts);
  };

  const updateCategoryFilters = (categories) => {
    const categoryCounts = {};

    categories.forEach((category) => {
      categoryCounts[category.id] = 0;
    });

    events.forEach((event) => {
      if (categoryCounts[event.category_id] !== undefined) {
        categoryCounts[event.category_id]++;
      }
    });

    setCategoryFilters(
      categories.map((category) => ({
        id: category.id,
        name: category.name,
        count: categoryCounts[category.id],
      }))
    );
  };

  const handleFilterChange = (type, filter) => {
    if (type === "city") {
      const updatedFilters = { ...selectedCityFilters };
      updatedFilters[filter] = !updatedFilters[filter];
      setSelectedCityFilters(updatedFilters);
    } else if (type === "category") {
      const updatedFilters = { ...selectedCategoryFilters };
      updatedFilters[filter] = !updatedFilters[filter];
      setSelectedCategoryFilters(updatedFilters);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const displayedEvents = () => {
    if (
      Object.values(selectedCityFilters).every((value) => !value) &&
      Object.values(selectedCategoryFilters).every((value) => !value) &&
      !selectedDate
    ) {
      return events; // Show all events if no checkboxes are checked and no date is selected
    } else {
      const filteredEvents = events.filter((event) => {
        const cityMatch =
          selectedCityFilters[event.city] ||
          !Object.values(selectedCityFilters).some((value) => value);
        const categoryMatch =
          selectedCategoryFilters[event.category_id] ||
          !Object.values(selectedCategoryFilters).some((value) => value);

        const eventStartDate = new Date(event.start_time);
        const eventEndDate = new Date(event.end_time);
        const selected = selectedDate ? new Date(selectedDate) : null;

        const dateMatch =
          !selectedDate || // No date selected (show all)
          (selected >= eventStartDate && selected <= eventEndDate) || // Event within selected date range
          selected.toDateString() === eventStartDate.toDateString() || // Event starts on selected date
          selected.toDateString() === eventEndDate.toDateString(); // Event ends on selected date

        return cityMatch && categoryMatch && dateMatch;
      });
      return filteredEvents;
    }
  };

  // ..
  const cardStyle = {
    width: "18rem",
    // Add other styles as needed
  };

  return (
    <>
      <div className="filter-section">
        <h2>Filter by City:</h2>
        {Object.keys(cityFilters).map((city) => (
          <div key={city}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleFilterChange("city", city)}
                checked={selectedCityFilters[city]}
              />
              {city} ({cityFilters[city]})
            </label>
          </div>
        ))}
        <h2>Filter by Category:</h2>
        {categoryFilters.map((category) => (
          <div key={category.id}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleFilterChange("category", category.id)}
                checked={selectedCategoryFilters[category.id]}
              />
              {category.name} ({category.count})
            </label>
          </div>
        ))}
        <h2>Filter by Date:</h2>
        <div>
          <input
            type="date"
            className="form-control"
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
      </div>
      <div className="card-container d-flex flex-wrap justify-content-evenly">
        {displayedEvents().map((event) => (
          <div className="card mb-4" key={event.event_id} style={cardStyle}>
            {/* Display event details here */}
            <img
              src={event.banner_image_url}
              className="card-img-top"
              alt={event.event_name}
            />
            <div className="card-body">
              <h5 className="card-title">{event.event_name}</h5>
              <p className="card-text">{event.description}</p>
              <p className="card-text">
                {" "}
                <strong>Category:</strong> {event.category_name}
              </p>
              <p className="card-text">
                <strong>Start Time:</strong> {event.start_time}
              </p>
              <p className="card-text">
                <strong>End Time:</strong> {event.end_time}
              </p>

              <p className="card-text">
                <strong>Location:</strong> {event.city}, {event.state},{" "}
                {event.zip_code}
              </p>
              <a href="#" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventList;
