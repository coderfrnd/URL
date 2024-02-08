import React, { useState } from 'react';
import axios from "axios"



// const corsOptions = {
//     origin: function (origin: any, callback: any) {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   };
  
  
const SearchBar = () => {
  const [url, seturl] = useState("");
  const [error, seterror] = useState()
  const [loading, setloading] = useState()
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!url){
        seterror("Please enter ur mail")
        return;
    }
    setloading(true);
    try {
        const response = await axios.post("http://localhost:8001/",{
            origUrl:url,
        });
        console.log(response.data)
        seturl("");
        seterror("");
    } catch (err) {
        console.log(err.message);
        seterror("Failed to Shorten URL")
    }finally {
        setloading(false)
    }
   
    console.log("Email submitted:", url);
  };

  return (
    <div className="mt-6 justify-center flex h-screen">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[60%]">
        <form onSubmit={handleSubmit} className="mb-4 w-[90%] h-[80%] flex flex-col items-center">
          <h1 className='text-2xl mb-4'>ENTER YOUR EMAIL</h1>
          <input
            className="shadow appearance-none border rounded w-[70%] h-[8%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            type="text"
            placeholder="Enter your email"
            value={url}
            onChange={(e) => seturl(e.target.value)}
          />  {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-700 text-black mt-6 w-[15%] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Loading..." : "Shorten!"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
