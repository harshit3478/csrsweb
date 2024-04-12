import map from "../images/map.png";
// import audio from '../App'
const Modal = ({ data, setIsModal }) => {
  async function handleRespond() {
    console.log("responding to the alert");
    // audio.pause();
    // const token = data.user.userId;
    // var response = await fetch(`${process.env.REACT_APP_API_URL}/send/notification`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: "Help is on the way!!",
    //     body: "Control room is on the way to help you",
    //     langitude: data.longitude,
    //     latitude: data.latitude,
    //     token: token,
    //   }),
    // });
    // response = await response.json();
    // console.log("response of sending notification is:", response.status);
    // if(response.status === 'ok'){
    //   // alert('Notification sent successfully');
    //   // setIsModal(false);
    // }
    window.location.href = `/alert/${data._id}`;
  }
  // handleRespond();

  return (
    <>
      {data === null || data.length === 0 ? (
        <div className='w-full h-full justify-center items-center flex'>
        <h1 className='text-3xl font-bold text-center '>Loading....</h1> 
    </div>
      ) : (
        <div
          className={`${
            data ? "fixed" : "hidden"
          } z-10 inset-0 overflow-y-auto `}
        >
          <div className="flex items-center justify-center min-h-screen p-4 m-auto">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all "
              style={{ width: "50vw" }}
            >
              <div className="px-4 py-2">
                <div className="flex justify-between items-center flex-col">
                  <h2 className="text-3xl font-bold ">Emergency Alert</h2>
                

                  <div className=" flex gap-2 justify-start w-full p-4 pb-0">
                    <div className="profile-details flex gap-4 justify-center items-center ">
                      {/* <h2 className='text-xl font-bold p-1 text-center'>Profile</h2> */}

                      <div className="image p-1">
                        <img
                          src={data.user.imageUrl}
                          alt="profile"
                          className="w-24 rounded-full"
                        />
                      </div>
                      <div className="p-2 mx-2 ">
                        <p className="text-lg font-sans font-semibold p-0.5">
                          {data.user.username}
                        </p>
                        <p className="text-lg font-sans font-semibold p-0.5">
                          {data.user.rollNo}
                        </p>
                        <p className="text-lg font-sans font-semibold p-0.5">
                          {data.user.email}
                        </p>
                        <p className="text-lg font-sans font-semibold p-0.5">
                          {data.user.phone}
                        </p>
                      </div>
                    </div>

                    <div className="case-details flex flex-col gap-3 justify-start">
                      <div className="case-content p-1 mx-2">
                        <p className="text-lg font-sans font-semibold capitalize p-0.5">
                          Happend Near: {data.landmark}
                        </p>
                        <p className="text-lg font-sans font-semibold p-0.5">
                          Date : {data.createdOn.split("T")[0]}
                        </p>
                        <p className="text-lg font-sans font-semibold p-0.5">
                          Time : {data.createdOn.split("T")[1].split(".")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center flex-col gap-3 w-full m-2 p-1 ">
                    <h2 className="text-lg font-semibold ">
                      {" "}
                      Click to see location:
                    </h2>
                    {/* // on click it should open new tab in google map with location of the user */}
                    <div className="flex justify-center">
                      <a
                        href={`https://maps.google.com/?q=${data.latitude},${data.longitude}`}
                        target="_blank"
                        rel="refferer noreferrer"
                        className="text-blue-500 font-semibold flex justify-center flex-col items-center"
                      >
                        <p>Open in Google Maps</p>
                        <img
                          src={map}
                          alt="nothing"
                          className="h-25 w-2/3 text-center "
                        />
                      </a>
                    </div>
                  </div>
                  <div className="Respond">
                    <button
                      onClick={handleRespond}
                      style={{ background: "#FD0606" }}
                      className="text-white rounded-md p-2  text-xl font-bold m-4"
                    >
                      Respond
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
