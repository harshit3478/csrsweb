
// import { Identity } from '@mui/base';
import { Badge, ContactEmergency, Done, Email, EmailRounded, PendingActions, PermIdentity, Phone } from '@mui/icons-material';

import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal';
// import Modal from '../Modal/Modal';

const Case = () => {
    // get id from url
    const id = window.location.pathname.split('/')[2];
    console.log('id is ', id);
    // get emergency data from id
    const [data, setData] = useState([]);
    const [emergencyData, setEmergencyData] = useState([]);
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
            console.log('data after fetching:', data);
            const filteredEmergencyData = await responseData.data.filter(item => item._id === id);
            console.log('filtered emergency data:', filteredEmergencyData);
            // convert time to indian time
            setEmergencyData(filteredEmergencyData[0]); 
        } catch (error) {
            console.log('error:', error);
        }
    }
    useEffect(() => {
        getEmergenciesData();
    }, []);
    useEffect(() => {
        console.log('data after changing:', emergencyData);
    }, [emergencyData]);
    return (
        <>
            {emergencyData === null || emergencyData.length === 0 ?
                <h1 className='text-3xl font-bold text-center'>Something went wrong...</h1> :
                <div className='flex gap-5  p-5 absolute right-0 flex-col items-center bg-slate-00 '>
                    <h1 className='text-3xl  text-center font-extrabold'>Case Details</h1>
                    <div className='student-details bg-slate-100 flex items-center gap-5 justify-center text-xl mx-10 p-5 shadow-sm shadow-slate-200 rounded-sm relative' style={{ left: '2vw', width: '80vw' }}>
                        <div className='student-image'>
                            <img src={emergencyData.user.imageUrl} alt="profile" className="w-40 rounded-full" />
                        </div>
                        <div className='student-info'>
                            <p className='m-1 p-2 font-semibold '><PermIdentity />   {emergencyData.user.username}</p>
                            <p className='m-1 p-2 font-semibold '><Badge />   {emergencyData.user.rollNo}</p>
                            <p className=' capitalize m-1 p-2 font-semibold '><Email />  {emergencyData.user.email}</p>
                            <p className='m-1 p-2 font-semibold '><Phone />   {emergencyData.user.phone}</p>
                        </div>
                        <div className='student-contacts min-h-full justify-start flex flex-col items-start'>
                            <h1 className='text-2xl text-center font-bold'>Emergency Contacts</h1>
                            {emergencyData.user.contacts.map((contact) => {
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
                        </div>

                        <div className='case-details '>
                            <p className='m-1 p-2 font-semibold capitalize '><span className='text-slate-500'>Near : </span>{emergencyData.landmark}</p>
                            <p className={`m-1 p-2 font-bold  capitalize ${emergencyData.status === 'resolved' ? 'text-green-400' : 'text-red-500'} `}><span className='text-slate-500'>Status : </span>{emergencyData.status === 'pending' ? < PendingActions /> : <Done />}{emergencyData.status}</p>
                            <p className='m-1 p-2 font-semibold '><span className='text-slate-500'>Happened On : </span>{emergencyData.createdOn.split("T")[0]} at {emergencyData.createdOn.split("T")[1].split(".")[0]} UTC+00:00</p>
                            <p className='m-1 p-2 font-semibold '><span className='text-slate-500'>Time took to resolve : </span> {emergencyData.timeTakenToResolve}</p>
                        </div>
                    </div>
                    <div className='description  bg-slate-50 p-5 shadow-sm shadow-slate-200 rounded-sm wrapper mx-10 relative ' style={{ width: '80vw', left: '2vw' }}>
                        <p className='text-xl font-semibold capitalize p-1'> more about case </p>
                        <div className='flex justify-start items-center gap-4'>
                            <p className='font-semibold text-lg'>Sensitivity :</p>
                            <p className='text-lg font-light py-2 m-1'>{emergencyData.sensitivity} </p>
                        </div>
                        <div className='flex justify-start items-center gap-4'>
                            <p className='font-semibold text-lg'>Description :</p>
                            <p className='text-lg font-light py-2 m-1'>{emergencyData.description} </p>
                        </div>

                    </div>


                </div>
            }
            <Modal data={emergencyData} />
        </>
    )
}

export default Case;