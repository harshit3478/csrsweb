import { SensorsOutlined } from "@mui/icons-material";
import { useState } from "react";

const InputModal = ({ id , sensitivity , des , close}) => {
    console.log('id:', id);
    const [value , setValue] = useState(sensitivity ?? 'low');
    const [description, setDescription] = useState(des ?? '');
    function handleInput(value) {
        console.log('value:', value);
        setValue(value);
    }
    async function handleSubmit(e) {
        console.log(value);
        console.log('description:', description);
        e.preventDefault();
        var response = await fetch(`${process.env.REACT_APP_API_URL}/emergency/update`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                sensitivity: value,
                description : description
            })

        });
        response = await response.json();
        var resolve = await fetch(`${process.env.REACT_APP_API_URL}/emergency/resolve`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                id: id
            })

        }); 
        resolve = await resolve.json();
        console.log('emergency resolve:', resolve);
        if(response.status === 'success'){
            alert('updated successfully');
            localStorage.removeItem('emergenciesData');
            window.location.href = '/';
        }

        console.log('response:', response);
    }
    return (
        <>

            <div className={`${id ? 'fixed' : 'hidden'} z-10 inset-0 overflow-y-auto  m-1 p-2`}>
           
                <div className="flex items-center justify-center min-h-screen p-4 m-auto relative">
                
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                   
                    <div className="bg-slate-700 text-white rounded-lg overflow-hidden shadow-xl transform transition-all p-5" >
                        <form method="post" className="flex flex-col " >
                        <button
                    onClick={() => close(false)}
                    className="  text-white hover:text-gray-300 focus:outline-none absolute top-1.5 left-2"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                            <div className="p-2 m-1 flex gap-4  ">

                                <label className="p-2 font-semibold"> Sensitivity of Case </label>
                                <select defaultValue={sensitivity} className="px-4 py-2 font-semibold text-black" onChange={(e) => handleInput(e.target.value)}>
                                    
                                    <option className="" value="Low">Low</option>
                                    <option className="" value="Medium">Medium</option>
                                    <option className="" value="High">High</option>
                                </select>

                            </div>
                             <div className="p-2 m-1 flex flex-col justify-start ">
                                <label className="p-2 font-semibold"> Description </label>
                                <textarea defaultValue={des} className="p-2 m-2 rounded-md text-black" style={{width:'25vw', height:'20vh'}} onChange={(e) => setDescription(e.target.value)}></textarea>
                             </div>
                            <button onClick={handleSubmit} type="submit" className="text-white bg-blue-500 rounded-sm font-semibold p-1.5 m-1">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default InputModal;
