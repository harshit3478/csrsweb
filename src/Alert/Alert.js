/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "./Alert.css";

import map from "../images/map.png"
import { ContactEmergency, PermIdentity, Phone } from "@mui/icons-material";
import InputModal from "../Modal/InputModal";

function Alert() {
  // get the id from the url
  const id = window.location.pathname.split('/')[2];
  console.log('id is ', id);

  const [data, setData] = useState([]);
  const [alertData, setAlertData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const getEmergenciesData = async () => {
    // localStorage.removeItem('emergenciesData');
    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/emergency/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log('response data:', responseData.data);
      setData(responseData.data);
      // console.log('data after fetching:', data);
      const filteredAlertData = await responseData.data.filter(item => item._id === id);
      console.log('filtered alert data:', filteredAlertData);

      setAlertData(filteredAlertData[0]); // Assuming you want to set the first item from filtered data
    } catch (error) {
      console.log('error:', error);
    }
  }
  useEffect(() => {
    getEmergenciesData();
  }, []);
  useEffect(() => {
    console.log('data after changing:', data);
  }, [data]);

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
 function handleClick(){
  setIsModal(true); 
 }
  return (
    <>
      {alertData === null || alertData.length === 0 ?
        <h1 className='text-3xl font-bold text-center'>Something went wrong...</h1> :

        <div className="alert bg-slate-200 h-screen m-2">
          <div className="upper-section items-center gap-0">
            <div className="profile">
              {/* <h2>Profile of the student</h2> */}
              <div className="profile-content flex items-center">
              
                <img src={alertData.user.imageUrl} alt="Photo" />
                <div className="mx-3">
                  <p className="font-semibold text-lg ">{alertData.user.username}</p>
                  <p className="font-semibold text-lg ">{alertData.user.rollNo}</p>
                  <p className="font-semibold text-lg ">{alertData.user.email} </p>
                  <p className="font-semibold text-lg ">{alertData.user.phone}</p>
                </div>
              </div>
            </div>
            <div>
              {/* <h2>Case Details</h2> */}
              <div className="case-details">
                <p></p>
                <p className="font-semibold text-2xl capitalize p-1">{alertData.landmark}</p>
                <p className="font-semibold text-lg p-1">{alertData.createdOn.split("T")[0]}</p>
                <p className="font-semibold text-lg p-1">{alertData.createdOn.split("T")[1].split(".")[0]}</p>
              </div>
            </div>
            {alertData.user.contacts.map((contact) => {
                                return (
                                    <div className='emergency-contacts flex items-center gap-2'>
                                        <div className='m-2'>
                                            <ContactEmergency className='text-3xl' fontSize='large' />
                                        </div>
                                        <div className='m-2 p-2'>
                                            <p><PermIdentity />  {contact.contactName}</p>
                                            <p><Phone />  {contact.contactPhone}</p>
                                        </div>
                                    </div>
                                )
                            })}
            <div className="timer">
              <h2 style={{ color: "#FD0606", fontWeight: "bold" }}>
                <span style={{ fontSize: "100px" }}>{time}</span> seconds
              </h2>
              <p>Time since alert taken</p>
            </div>
          </div>

          <div className="flex justify-start items-center flex-col gap-3 w-full m-2 p-1 ">
            <h2 className='text-lg font-semibold '> Click to see location:</h2>
            {/* // on click it should open new tab in google map with location of the user */}
            <div className="flex justify-center">
              <a href={`https://maps.google.com/?q=${alertData.latitude},${alertData.longitude}`} target='_blank' rel="refferer noreferrer" className='text-blue-500 font-semibold flex justify-center flex-col items-center'>
                <p>
                  Open in Google Maps
                </p>
                <img src={map} alt='nothing' className='h-25 w-2/3 text-center ' />
              </a>
            </div>
          </div>
          <div className="matter-resolved">
                    <button onClick={handleClick} style={{ background: 'lightgreen' }} className='text-white rounded-md p-2  text-xl font-bold m-4'>Matter Resolved</button>
                  </div>
        </div>
      }
      {isModal ? <InputModal id={alertData._id}  />  : null}
    </>
  );
}

export default Alert;
