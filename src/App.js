import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import io from "socket.io-client";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import Modal from "./Modal/Modal";
import Alert from "./Alert/Alert";
import Login from "./login/login";
import Case from "./Case/case";

const socket = io(`${process.env.REACT_APP_API_URL}`);
const audio = new Audio('/audio/alert.mp3');

function App() {
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status
  async function checkLoginStatus() {
    try {
      var response = await fetch(`${process.env.REACT_APP_API_URL}/get/admin`, {
        method: "GET",
      });
      console.log(response);
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // Function to handle emergency socket events
    function handleEmergency() {
      socket.on('emergency-created', (data) => {
        console.log('emergency created data is :', data);
        setIsModal(true);
        audio.play();
        localStorage.removeItem('emergenciesData');
        setData(data);
      });
      

      socket.on('emergency-resolved', (data) => {
        console.log(data);
      });
    }
    handleEmergency(); 

   
  }, []); 

  console.log('value of isModal is:', isModal);
  console.log('value of login is:', isLoggedIn);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          {/* Default route is login */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />} // Pass setIsLoggedIn to handle login
          />
          {/* Protected route for home screen, redirects to login if not logged in */}
          <Route
            path="/"
            element={isLoggedIn ? <HomeScreen isModal={isModal} data={data} setIsModal={setIsModal} /> : <Navigate to="/login" />} 
          />
          <Route
            path="/alert/:id"
            element={
              <>
                <Navbar />
                <Alert />
              </>
            }
          />
          <Route
            path="/test"
            element={<Alert />}
          />
          <Route
            path="/emergency/:id"
            element={
              <div className="flex justify-around">
                <div><Case /></div>
                <div><Navbar /></div>
              </div>
            }
          />
          <Route path="*" element="404 Not Found" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Home screen component
function HomeScreen({ isModal, data, setIsModal }) {
  return (
    <>
      <Navbar />
      <Main />
      {isModal && <Modal data={data} setIsModal={setIsModal} />}
    </>
  );
}

export default App;
