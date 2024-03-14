import { ArrowBack, ArrowForward, CalendarToday, PendingActions } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import EmergencyCard2 from "./Emergencycard";


export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(3);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const [data, setData] = useState([]);
  const getEmergenciesData = () => {
    if (localStorage.getItem("emergenciesData")) {
      setData(JSON.parse(localStorage.getItem("emergenciesData")));
    } else {
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
  };
  useEffect(() => {
    getEmergenciesData();
  }, []);
  const pageCount = Math.ceil(data.length / rowsPerPage);
  function handleSearch(value) {
    console.log("search value", value);
    if (value !== "" || value !== null || value !== undefined || value !== " ") {
      const allData = JSON.parse(localStorage.getItem("emergenciesData"));
      const filteredData = allData.filter((item) => {
        return item.user.username.toLowerCase().includes(value.toLowerCase()) || item.user.rollNo.toLowerCase().includes(value.toLowerCase()) || item.landmark.toLowerCase().includes(value.toLowerCase()) || item.status.toLowerCase().includes(value.toLowerCase()) || item.user.email.toLowerCase().includes(value.toLowerCase());
      });
      console.log("filteredData", filteredData);
      setData(filteredData);
    }
  }
  function handleFilter(value) {
      console.log("filter value", value);
      var valueString = '';
      switch (value) {
        case "1":
          valueString = "All";
          break;
        case "2":
          valueString = "Pending";
          break;
        case "3":
          valueString = "Resolved";
          break;
        default:
          valueString = "All";
          break;
      }
      console.log("valueString", valueString);
        if(valueString !== "All"){
        const allData = JSON.parse(localStorage.getItem("emergenciesData"));
        const filteredData = allData.filter((item) => {
          return item.status.toLowerCase().includes(valueString.toLowerCase());
        });
        console.log("filteredData", filteredData);
        setData(filteredData);
      }
      else{
        getEmergenciesData();
      }
  }
  function handleDateFilter(value) {
    console.log("date filter value", value);
    if (value !== "" || value !== null || value !== undefined || value !== " ") {
      const allData = JSON.parse(localStorage.getItem("emergenciesData"));
      const filteredData = allData.filter((item) => {
        return item.createdOn.split("T")[0].includes(value);
      });
      console.log("filteredData", filteredData);
      setData(filteredData);
    }
  }
  return (
    <>
      <div className="list-container " style={{ width: '100%' }}>
        <div className="list-header flex justify-between   ">
          <span className="m-0 p-2 text-xl font-bold text-balance text-black">Previous Cases</span>

          <div className="border border-slate-700 rounded overflow-hidden flex ">
          <label className="p-2 border-r border-black">Date <CalendarToday  /></label>
  <input type="date" className="px-4 py-2 border-r border-slate-700 bg-red" onChange={(e) => handleDateFilter(e.target.value)} />
            <label className="p-2">Status <PendingActions  fontSize="small" /></label>
            <select className="px-4 py-2 border-r bg-slate-50" onChange={(e) => handleFilter(e.target.value)}>
              <option value="1">All</option>
              <option value="2">Pending</option>
              <option value="3">Resolved</option>
            </select>
            <input type="text" className="px-4 py-2 " placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
            <button className="flex items-center justify-center px-4 border-l border-slate-700 bg-blue-400">
              <svg className="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" /></svg>
            </button>
          </div>
        </div>
        <div className="border-b border-slate-600 m-2"></div>

      </div>
      <div style={{ width: "100%", overflowX: "auto" }}>
        {/* <table style={{ minWidth: 700 }}>
        <thead className=" bg-indigo-400 m-2 p-4">
          <tr className="p-2 m-1">
            {columns.map((column) => (
              <th className="p-2 m-1 bg-indigo-400 "
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, fontWeight: "bold" }}
              >{column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody> */}
        {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data, index) => {
            return (
              <EmergencyCard2
                key={index}
                id={data._id}
                ImageUrl={data.user.imageUrl}
                Name={data.user.username}
                RollNo={data.user.rollNo}
                Status={data.status}
                Landmark={data.landmark}
                Email={data.user.email}
                Date={data.createdOn.split("T")[0]}
                Time={data.createdOn.split("T")[1].split(".")[0]}
                TimeTaken={data.timeTakenToResolve}
              />
            );
          })}
        {/* </tbody>
      </table> */}
        <div style={{ marginTop: "20px" }}>
          <button
            disabled={page === 0}
            onClick={() => handleChangePage(page - 1)}
          >
            <ArrowBack />
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {page + 1} of {pageCount}
          </span>
          <button
            disabled={page === pageCount - 1}
            onClick={() => handleChangePage(page + 1)}
          >
            < ArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
