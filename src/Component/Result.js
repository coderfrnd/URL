import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Result = () => {
    const [urls, seturls] = useState([]);
    useEffect(() => {
        const fetchUrlAndSetUrl = async ()=> {
          const result = await axios.get("http://localhost:8001//:shortId");
          seturls(result.data);
          // console.log(result.data)
        };
        fetchUrlAndSetUrl();
      }, [urls]);
  return (
    <div>
    <table className="table-auto">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-2">Original Url</th>
          <th className="px-4 py-2">Short Url</th>
          <th className="px-4 py-2">Click Count</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url, idx) => (
          <tr key={idx} className="bg-gray-100">
            <td className="border px-4 py-2">{url.origUrl}</td>
            <td className="border px-4 py-2">
              <a href={`${url.shortUrl}`} className="text-blue-500 hover:underline">{url.shortUrl}</a>
            </td>
            <td className="border px-4 py-2">{url.clicks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  )
}

export default Result