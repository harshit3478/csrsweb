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
            <div className="flex items-center gap-4">
              {/* <h2>Profile of the student</h2> */}
              <div className="profile-content flex items-center justify-center">
                <img src={alertData.user.imageUrl} alt="Photo" className="rounded-lg p-2" style={{width:'40%', height:'37%', borderRadius:'56px'}}/>
                <div className="mx-5">
                  <p className="font-semibold text-lg ">Name: {alertData.user.username}</p>
                  <p className="font-semibold text-lg ">Roll No: {alertData.user.rollNo}</p>
                  <p className="font-semibold text-lg ">Email: {alertData.user.email} </p>
                  <p className="font-semibold text-lg ">Phone: {alertData.user.phone}</p>
                  <p className="font-semibold text-lg  capitalize p-1">Near: {alertData.landmark}</p>
                <p className="font-semibold text-lg  ">Date: {alertData.createdOn.split("T")[0]}</p>
                <p className="font-semibold text-lg ">Time: {alertData.createdOn.split("T")[1].split(".")[0]}</p>
                </div>
              </div>
            </div>
  
            {/* {alertData.user.contacts.map((contact) => {
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
                            })} */}
           <div className='student-contacts min-h-full justify-start flex flex-col items-start' style={{minWidth:'24%'}}>
                            <h1 className='text-2xl text-center font-bold'>Emergency Contacts</h1>
                            {alertData.user.contacts.map((contact) => {
                                return (
                                    <div className='emergency-contacts text-md flex items-center  gap-1 w-full'>
                                        <div className='m-0.5'>
                                            <ContactEmergency className='text-3xl' fontSize='large' />
                                        </div>
                                        <div className='m-0.5 p-2'>
                                            <p><PermIdentity />  {contact.contactName}</p>
                                            <p><Phone />  {contact.contactPhone}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

            <div className="timer p-2">
              <h2 style={{ color: "#FD0606", fontWeight: "bold" }}>
                <span style={{ fontSize: "70px" }}>{Math.floor(time/60) <10 ? '0' + Math.floor(time/60) : Math.floor(time/60)}:{Math.floor(time%60) <10 ? '0' + Math.floor(time%60) : Math.floor(time%60)}</span>Mins
              </h2>
              <p className="font-semibold text-xl">Time since alert taken</p>
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
