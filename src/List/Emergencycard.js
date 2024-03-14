import { AccessTime, ArrowForwardIos, DateRangeOutlined, Done, EmailOutlined, HourglassEmpty, PendingActions, PinDrop } from '@mui/icons-material';
import React from 'react'

const EmergencyCard = ({ ImageUrl, Name, RollNo, Landmark, Status, Email, Date, Time, TimeTaken }) => {
    return (
        <>
            {/* <div className="bg-white shadow-lg rounded-lg p-3 flex  items-center justify-start">
           
            <div className="flex gap-4 ml-4  justify-evenly"> */}

            <tr className='border-b border-slate-600 p-1 my-2'>
                <td> <img src={ImageUrl} alt="profile" className="w-10 h-10 rounded-full" /> </td>
                <td className={`text-md capitalize  font-bold mx-4 my-2 p-2`}>{Name} </td>
                <td className={`text-md uppercase  font-bold mx-4 my-2 p-2`}>{RollNo} </td>
                <td className={`text-md capitalize  font-bold mx-4 my-2 p-2`}>{Landmark} </td>
                <td className={`text-md capitalize ${Status === 'resolved' ? 'text-green-400' : 'text-red-500'}  font-bold mx-4 my-2 p-2`}>{Status === 'pending' ? < PendingActions /> : <Done />}{Status} </td>
                <td className={`text-md capitalize  font-bold mx-4 my-2 p-2`}>{Email} </td>
                <td className={`text-md capitalize  font-bold mx-4 my-2 p-2`}>{Date} </td>
                <td className={`text-md capitalize  font-bold mx-4 my-2 p-2`}>{Time} </td>
                <td className={`text-md capitalize  font-bold mx-4 my-2 p-2`}>{TimeTaken} </td>

                <button >
                    <ArrowForwardIos className="text-2xl" />
                </button>
            </tr>
            {/* <
            </div>
           
        </div> */}
        </>
    )
}

const EmergencyCard2 = ({ id, ImageUrl, Name, RollNo, Landmark, Status, Email, Date, Time, TimeTaken }) => {

    const handleShowImage = () => {
        console.log('Image Clicked');

    }
    function handleClick(id){
        console.log('Clicked');
        window.location.href = `/emergency/${id}`;
        
    }
    return (
        <>

            <div className="bg-slate-100 rounded-lg p-2 px-10 flex h-min   items-center justify-start border my-1.5 mx-1 border-black">
                <div className='user flex items-center'>
                    <div className='image' onClick={handleShowImage}>
                        <img src={ImageUrl} alt="profile" className="w-14 rounded-full" />
                    </div>
                    <div className='user-details mx-2'>
                        <span className='text-md font-sans  m-1 p-2'>{Name}</span>
                        <span className='text-md font-sans  m-1 p-2'>{RollNo}</span>
                        <p className='text-md font-sans capitalize  p-2'><EmailOutlined /> {Email}</p>
                    </div>

                </div>
                <div className='status text-md'>
                    <span className={` capitalize ${Status === 'resolved' ? 'text-green-400' : 'text-red-500'}  font-bold mx-4 my-2 p-2`}>{Status === 'pending' ? < PendingActions /> : <Done />}{Status} </span>
                </div>
                <div className='emergency-details flex-col flex'>
                    <span className='text-md font-sans  m-0.5'>< PinDrop /> {Landmark}</span>
                    <span className='text-md font-sans  m-0.5'> <DateRangeOutlined /> {Date}</span>
                </div>
                <div className='time flex-col flex mx-3'>
                    <span className='text-md font-sans  m-0.5'><AccessTime />{Time}</span>
                    {Status === 'resolved' ? <span className='text-md font-sans  m-0.5'><HourglassEmpty />{TimeTaken}</span> : null}
                </div>

                <button className='bg-slate-300 rounded-sm m-1 p-3' onClick={()=> handleClick(id)} >
                   See More <ArrowForwardIos className="text-2xl" />
                </button>
                {/* {showImage && <Image ImageUrl={ImageUrl} setShowImage={setShowImage} />} */}

            </div>
        </>
    )
}
export default EmergencyCard2;