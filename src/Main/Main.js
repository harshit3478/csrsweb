import React, { useEffect, useState } from "react";
import aboutIcon from "../images/profile.png";
import servicesIcon from "../images/notif.png";
import "./Main.css";
import BasicTable from "../List/List";

function Main() {
  const [data, setData] = useState([]);
  const getEmergenciesData = () => {
    try {
      
      if (localStorage.getItem("emergenciesData")) {
        setData(JSON.parse(localStorage.getItem("emergenciesData")));
        console.log('data from localstorage', data);
      }
      else {
        fetch(`${process.env.REACT_APP_API_URL}/emergency/get`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            data = data.data;
            setData(data);
            // store data in localstorage
            localStorage.setItem("emergenciesData", JSON.stringify(data));
          });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getEmergenciesData();
  }, []);
  function calculateAverageTime(data) {
   
    let sum = 0;
    data.forEach((item) => {
      if(item.timeTakenToResolve === null || item.timeTakenToResolve === undefined || item.timeTakenToResolve === ""){}
      else{
      console.log("item", item.timeTakenToResolve);
      const [hours, minutes, seconds] = item.timeTakenToResolve.split(":");
      const total_seconds = (parseInt(hours) * 60 * 60) + (parseInt(minutes) * 60) + parseInt(seconds);
      sum += total_seconds;
      }
    });
    return sum / data.length;
  
  }
  try {

    var avgTime = calculateAverageTime(data);
    //now convert it to hours, minutes and seconds
    const minutes = Math.floor((avgTime) / 60);
    const seconds = Math.floor(avgTime % 60);
    avgTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    console.log("avgTime", avgTime);
  } catch (error) {
    console.log("error", error)
  }
  function getLast30DaysData(data) {
    const last30DaysData = data.filter((item) => {
      const date = new Date(item.createdOn);
      const today = new Date();
      const diffTime = Math.abs(today - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    });
    return last30DaysData;
  }
  const last30DaysData = getLast30DaysData(data);
  console.log("last30DaysData", last30DaysData);
  const landmarkCount = {};
  function getHighCasesZone(data) {
    // repeatence of same landmark
    data.forEach((item) => {
      if (landmarkCount[item.landmark]) {
        landmarkCount[item.landmark]++;
      } else {
        landmarkCount[item.landmark] = 1;
      }
    });
    //get top 3 high cases zone 
    console.log("landmarkCount", landmarkCount);
    let max = 0;
    let highCasesZone = '';
    for (let key in landmarkCount) {
      if (landmarkCount[key] > max) {
        max = landmarkCount[key];
        highCasesZone = key;
      }
    }
    return highCasesZone;
  }
  const highCasesZone = getHighCasesZone(data);
  console.log("highCasesZone", highCasesZone);
  
  return (
    <div className="main-container p-3">
      <div className="topbar">
        <h2>Dashboard</h2>
        <ul>
          {/* <li>
            <a href="/">
              <img src={servicesIcon} alt="Notifications" className="icon" />
            </a>
          </li> */}
          <li>
            <p className="font-semibold text-lg m-2 capitalize">{localStorage.getItem('currentUser')}</p>
            <a href="/">
              <img src={aboutIcon} alt="Profile" className="" width={50}  style={{margin:'0.5rem 0 '}}/>
            </a>
          </li>
        </ul>
      </div>
      <hr className="line" />
      <div className="boxes-container">
        <div className="box">
          <div
            className="number"
            style={{
              color: "red",
              fontSize: "90px",
              fontWeight: "bold",
              paddingTop: "0px",
            }}
          >
            {last30DaysData.length}
          </div>
          <p className="box-text">Total Cases </p>
          <p className="box-text">(in last 30 days)</p>
        </div>

        <div className="box">
          <div className="capitalize p-2 m-1 text-center " style={{
            color: "red",
            fontSize: "40px",
            fontWeight: "bold",
            paddingTop: "0px",
          }}>{highCasesZone}</div>
          <p className="box-text">High Cases Zone</p>
        </div>
        <div className="box">
          <div className="number">
            <span
              style={{ color: "red", fontSize: "70px", fontWeight: "bold" }}
            >
              {avgTime}
            </span>
            <span style={{ color: "red", fontSize: "20px" }}>mins</span>
          </div>
          <p className="box-text">Avg. Time to solve</p>
        </div>
      </div>
      <div className="w-4/5 h-1/2 bg-white p-5 rounded-lg shadow-lg mt-5">
      <BasicTable/>
      </div>
    </div>
  );
}

export default Main;
