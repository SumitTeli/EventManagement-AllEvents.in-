import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem("loggedInUser");
    if (!storedProfile) {
      navigate("/");
    } else {
      // Fetch category data from the updated API endpoint
      axios
        .get("http://localhost/reactcurdphp/api/ViewCat.php")
        .then((response) => {
          // Check if the response data is an array before setting state
          if (Array.isArray(response.data)) {
            const formattedCategories = response.data.map((category) => ({
              categoryId: category.id,
              categoryName: category.category_name,
              categoryDescription: category.description,
              // Add additional fields if present in the updated API response
            }));
            setCategories(formattedCategories);
          } else {
            console.error("Invalid data format: Expected array");
          }
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, []);

  return (
    <div>
      <h2>Category List</h2>
      <table>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryName}</td>
                <td>{category.categoryDescription}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCategory;
