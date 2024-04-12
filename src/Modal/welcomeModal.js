import React from 'react';

const WelcomeModal = ({    }) => {
    const [isClicked, setIsClicked] = React.useState(true);
    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  return (
    <>
      <div className={`${isClicked ? 'fixed' : 'hidden'} z-10 inset-0 overflow-y-auto m-1 p-2`}>
        <div className="flex items-center justify-center min-h-screen p-4 m-auto relative">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-slate-700 text-white rounded-lg overflow-hidden shadow-xl transform transition-all p-5">
            <button
              onClick={() => handleClick()}
              className="text-white  hidden hover:text-gray-300 focus:outline-none absolute top-1.5 left-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="p-9 m-1 flex-col justify-center items-center flex gap-4">
                <h1 className="text-xl font-bold text-center p-6 m-4">Welcome to the IIT KGP's own Emergency Alert System</h1>
              <button onClick={handleClick} type="submit" className="text-white bg-blue-500 rounded-sm font-semibold p-1.5 m-1">
                Continue to Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomeModal;
