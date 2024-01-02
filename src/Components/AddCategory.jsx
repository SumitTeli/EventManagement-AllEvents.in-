import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./AddCategory.css"; // Your CSS file for styling
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import "./ViewCategory.css";

const AddCategory = () => {
  const navigate = useNavigate(); // Declare navigate using useNavigate()

  const { profile, setProfile } = useContext(ProfileContext);
  useEffect(() => {
    const storedProfile = localStorage.getItem("loggedInUser");
    if (!storedProfile) {
      // Render some loading state or return null
      navigate("/");
    }
  });

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setCategoryDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("categoryDescription", categoryDescription);

    try {
      const res = await axios.post(
        "http://localhost/reactcurdphp/api/addCategory.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        // Handle success response
        setMessage(res.data.success);
        alert(res.data.success);
      } else if (res.data.error) {
        // Handle error response
        setMessage(res.data.error);
      } else {
        // Handle unexpected response
        setMessage("Failed to add the category. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add Category</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryDescription">Category Description:</label>
          <textarea
            id="categoryDescription"
            value={categoryDescription}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
