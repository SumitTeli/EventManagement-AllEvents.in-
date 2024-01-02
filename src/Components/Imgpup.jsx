import React, { useState } from "react";
import axios from "axios";

function Imgpup() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bannerImage", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost/reactcurdphp/api/upload.php", // Replace with your API endpoint for uploading
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response from API
      console.log(res.data);
    } catch (error) {
      // Handle error
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bannerImage" className="form-label">
          Banner Image
        </label>
        <input
          type="file"
          className="form-control"
          id="bannerImage"
          name="bannerImage"
          onChange={handleFileInput}
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">
          Please provide a valid banner Image.
        </div>
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default Imgpup;
