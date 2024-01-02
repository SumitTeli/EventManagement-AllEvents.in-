import React, { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check localStorage for stored profile data when component mounts
    const storedProfile = localStorage.getItem("loggedInUser");
    console.log("Stored Profile:", storedProfile); // Add this line for verification
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      console.log(profile);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profile));
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
