import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../context/ProfileContext";

function AddEvent() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Declare navigate using useNavigate()

  const { profile, setProfile } = useContext(ProfileContext);
  useEffect(() => {
    const storedProfile = localStorage.getItem("loggedInUser");
    if (!storedProfile) {
      // Render some loading state or return null
      navigate("/");
    }
  });
  //fetching category
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost/reactcurdphp/api/event.php")
      .then((response) => {
        setData(response.data);
      });
  }, []);
  console.log(data);
  // if (!data) return null;

  const [formvalue, setFormvalue] = useState({
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    state: "",
    city: "",
    zipCode: "",
    Category: "",
    bannerImage: null,
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "bannerImage") {
      setFormvalue((prevFormValue) => ({
        ...prevFormValue,
        [name]: files[0], // Store the file itself in state
      }));
    } else {
      setFormvalue((prevFormValue) => ({
        ...prevFormValue,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("google_id", profile.id);
    formData.append("eventName", formvalue.eventName);
    formData.append("description", formvalue.description);
    formData.append("startDate", formvalue.startDate);
    formData.append("endDate", formvalue.endDate);
    formData.append("state", formvalue.state);
    formData.append("city", formvalue.city);
    formData.append("zipCode", formvalue.zipCode);
    formData.append("category", formvalue.Category);
    formData.append("bannerImage", formvalue.bannerImage);

    if (formvalue.bannerImage) {
      formData.append("bannerImage", formvalue.bannerImage);
    }

    // Get the date values from the form data
    const startDate = new Date(formData.get("startDate"));
    const endDate = new Date(formData.get("endDate"));

    // Check if the start date and end date are the same
    if (startDate.getTime() === endDate.getTime()) {
      alert("Start and End Dates cannot be the same.");
      return;
    }

    // Validation check for zip code
    const zipCode = formData.get("zipCode");
    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(zipCode)) {
      alert("Zip Code must contain exactly 6 digits.");
      return;
    }

    // Check if the end date is before the start date
    if (endDate <= startDate) {
      alert("End Date should be after the Start Date.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost/reactcurdphp/api/user.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Response from API:", res);
      if (res.data.success) {
        // console.log("Event Added Successfully!");
        alert("Event Added Successfully!");

        // Clear the form fields upon successful submission
        setFormvalue({
          eventName: "",
          description: "",
          startDate: "",
          endDate: "",
          state: "",
          city: "",
          zipCode: "",
          Category: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        // Handle failure response
        setMessage("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      // Handle error
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <h1>AddEvent</h1>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label className="form-label">Event name</label>
          <input
            type="text"
            className="form-control"
            id="EventName"
            placeholder="Live Folk Dance"
            value={formvalue.eventName}
            onChange={handleInput}
            name="eventName"
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid Event Name.
          </div>
        </div>
        <div className="col-md-4">
          <label for="validationServer02" className="form-label">
            Start Date
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="eventStartDate"
            value={formvalue.startDate}
            onChange={handleInput}
            name="startDate"
          ></input>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid start time.
          </div>
        </div>
        <div className="col-md-4">
          <label for="validationServer02" className="form-label">
            End Date
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="eventEndDate"
            value={formvalue.endDate}
            onChange={handleInput}
            name="endDate"
          />

          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-3">
          <label for="validationServer04" className="form-label">
            State
          </label>
          <select
            className="form-select "
            id="validationServer04"
            aria-describedby="validationServer04Feedback"
            value={formvalue.state}
            onChange={handleInput}
            name="state"
          >
            <option selected disabled value=""></option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadar and Nagar Haveli">
              Dadar and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please provide a valid State.</div>
        </div>

        <div className="col-md-6">
          <label for="validationServer03" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="validationServer03"
            aria-describedby="validationServer03Feedback"
            value={formvalue.city}
            onChange={handleInput}
            name="city"
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid City time.
          </div>
        </div>

        <div className="col-md-3">
          <label for="validationServer04" className="form-label">
            Category
          </label>
          <select
            className="form-select "
            id="validationServer04"
            aria-describedby="validationServer04Feedback"
            value={formvalue.Category}
            onChange={handleInput}
            name="Category"
          >
            <option disabled value="">
              Select a Category
            </option>
            {data &&
              data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid Category .
          </div>
        </div>

        <div className="col-md-3">
          <label for="validationServer05" className="form-label">
            Zip
          </label>
          <input
            type="number"
            className="form-control"
            id="validationServer05"
            aria-describedby="validationServer05Feedback"
            value={formvalue.zipCode}
            onChange={handleInput}
            name="zipCode"
            pattern="[0-9]{6}" // Specifies that only numbers with 6 digits are valid
            title="Please enter a 6-digit numeric zip code" // Optional message for the user
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid 6-digit numeric Zip Code.
          </div>
        </div>

        <div className="col-md-6">
          <label for="eventDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="eventDescription"
            rows="3"
            value={formvalue.description}
            onChange={handleInput}
            name="description"
          ></textarea>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid Event Description.
          </div>
        </div>
        <div className="col-md-6">
          <label for="bannerImage" className="form-label">
            Banner Image
          </label>
          <input
            type="file"
            className="form-control"
            id="bannerImage"
            onChange={handleInput}
            name="bannerImage"
            ref={fileInputRef} // Use the ref for the file input
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid banner Image.
          </div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input "
              type="checkbox"
              value=""
              id="invalidCheck3"
              aria-describedby="invalidCheck3Feedback"
              required
            />
            <label className="form-check-label" for="invalidCheck3">
              Agree to terms and conditions
            </label>
            <div id="invalidCheck3Feedback" className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </>
  );
}

export default AddEvent;
