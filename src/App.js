import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import io from "socket.io-client";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import Modal from "./Modal/Modal";
import Alert from "./Alert/Alert";
import Login from "./login/login";
import Case from "./Case/case";
import WelcomeModal from "./Modal/welcomeModal";

// Connect to socket server
const socket = io(`${process.env.REACT_APP_API_URL}`);
// Initialize audio for alerts
let audio;
function initializeAudio() {
  audio = new Audio("/audio/alert.mp3");
}

function App() {
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState([]);
  const [heartbeatInterval, setHeartbeatInterval] = useState(null);
  // Function to check login status
  async function checkLoginStatus() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get/admin`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application",
            jwt: localStorage.getItem("token"),
          },
        }
      ).then((res) => res.json());

      // Handle login status
      if (response.status === "ok") {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("currentUser", response.data.name);
      } else {
        localStorage.setItem("isLoggedIn", false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    initializeAudio();
    checkLoginStatus();

    const interval = setInterval(() => {
      fetch(`${process.env.REACT_APP_API_URL}/heartbeat`, {
        method: "POST",
      });
    }, 60000);

    setHeartbeatInterval(interval);
    return () => clearInterval(interval);
  }, []);

  // Listen for emergency events from socket
  useEffect(() => {
    function handleEmergency() {
      socket.on("emergency-created", (data) => {
        setIsModal(true);
        audio.play();
        localStorage.removeItem("emergenciesData");
        setData(data);
      });

      socket.on("emergency-resolved", (data) => {
        console.log(data);
      });
    }
    handleEmergency();
  }, []);

  // Check login status on component mount

  // Get login status from local storage
  console.log(localStorage.getItem("isLoggedIn"));

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          {/* Default route is login */}
          <Route
            path="/"
            element={
              localStorage.getItem("isLoggedIn") === "true" ? (
                <HomeScreen
                  isModal={isModal}
                  data={data}
                  setIsModal={setIsModal}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          {/* Protected routes */}
          <Route
            path="/alert/:id"
            element={
              <>
                <Navbar />
                <Alert />
              </>
            }
          />
          <Route path="/test" element={<Alert />} />
          <Route
            path="/emergency/:id"
            element={
              <div className="flex justify-around">
                <div>
                  <Case />
                </div>
                <div>
                  <Navbar />
                </div>
              </div>
            }
          />
          {/* 404 Route */}
          <Route path="*" element="404 Not Found" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Home screen component
function HomeScreen({ isModal, data, setIsModal }) {
  const [isRedirected, setIsRedirected] = useState(false);
  function checkVisited() {
    if (sessionStorage.getItem("visited")) {
      // delay of 5 seconds
      // setTimeout(() => {
      //   setIsRedirected(true);
      // }, 5000);
      // setIsRedirected(true);
    } else {
      sessionStorage.setItem("visited", "true");
      setIsRedirected(false);
    }
  }
  useEffect(() => {
    checkVisited();
    console.log("visited:", checkVisited());
  }, []);

  return (
    <>
      <Navbar />
      <button id="hiddenButton" style={{ display: "none" }}></button>
      <input id="inputField" style={{ display: "none" }}></input>
      <Main />
      {isModal && <Modal data={data} setIsModal={setIsModal} />}
      {!isRedirected && <WelcomeModal />}
    </>
  );
}

export default App;
