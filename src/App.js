import Navbar from "./Navbar/Navbar";
import React from "react";
import Main from "./Main/Main";
import Modal from "./Modal/Modal";
import Alert from "./Alert/Alert";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import EmergencyCard2 from "./List/Emergencycard";
import Case from "./Case/case";
const socket = io(`${process.env.REACT_APP_API_URL}`);
var audio = new Audio('/audio/alert.mp3');
// module.exports = audio;
function App() {
  const [ isModal , setIsModal ] = React.useState(false);
  const [data , setData ] = React.useState([]);
  function handleEmergency(){
    socket.on('emergency-created', (data) => {
      
      console.log('emergency created data is :' , data);

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
  console.log('value of isModal is :', isModal);
  return (
    <div className="app-container ">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Main />
                { isModal ? <Modal data={data} setIsModal={setIsModal} /> : null}
                
              </>
            }
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
            path="/login"
            element={
              <>
                <div
                  className="bg-gradient-to-r from-indigo-500 to-sky-500 "
                  style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: "url(./images/kgpimage.jpg)",
                  }}
                >
                  <Login />
                </div>
              </>
            }
          />
          <Route path="*" element="404 Not Found" />
          <Route
            path="/test"
            element={
             <>
            <Alert />
             </>
            }
          />
          <Route path="/emergency/:id" element={
          <>
         <div className="flex justify-around">
           <div>
           <Case />
          </div>
            <div>
            <Navbar />
            </div>
          </div>
          </> 
        } />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
