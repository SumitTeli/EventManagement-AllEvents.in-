import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import EventList from "./Components/EventList";
import AddEvent from "./Components/AddEvent";
import Login from "./Components/Login";
import { ProfileProvider } from "./context/ProfileContext";
import AddCategory from "./Components/AddCategory";
import ViewCategory from "./Components/ViewCategory";

function App() {
  return (
    <div className="App">
      <ProfileProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/eventlist" element={<EventList />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/viewcategory" element={<ViewCategory />} />

          {/* <Route path="/imgpup" element={<Imgpup />} /> */}
        </Routes>

        <Footer />
      </ProfileProvider>
    </div>
  );
}

export default App;
