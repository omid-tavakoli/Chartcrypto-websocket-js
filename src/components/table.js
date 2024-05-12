import { useState, useEffect } from "react";
import { getAllData } from "../service/crud";
import Loading from '../components/loading';
import {ws} from '../service/webSocket'
export default function Table() {
  const [data, setData] = useState();
  const [error, setError] = useState({
    massage: "",
    bool: false,
})
useEffect(() => {
  if(data){
    ws.onmessage = function(event) {
      const dataArray = [event.data]
      dataArray.forEach(item => {
        const repWebsocket = JSON.parse(item)
        const nameArz = Object.keys(repWebsocket)     
        const newPrice = Object.values(repWebsocket) 
        const newData = [...data]
        newData.map((e) => {
          if(e.id == nameArz && e.priceUsd != newPrice){
            e.priceUsd = newPrice
            e.background = 'active'
            setData(newData)
          }
        })    
      });
    }
  }
  } , [data])

  useEffect(() => {
    const TakeAllData = async () => {
      try {
        const data = await getAllData();
        setData(data.data.data);
      } catch (err) {
        setError({
            massage: "Fetch is failed !",
            bool: true,
        })
      }
    };
    TakeAllData();
  }, []);
  const renderData = () => {
    let renderData = <tr><td colSpan="4"><Loading/></td></tr>
    if (error.bool) {
        const err = error.massage
        renderData = <tr><td colSpan="4">{err}</td></tr>
    }
    if (data) {
        renderData = data.map((e) => ( 
                <tr  key={e.id} className={`border-b border-gray-200 dark:border-gray-700 ${(e.background) ? 'animate-changeBackground' : 'bg-white' }`}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap  text-white bg-gray-800"
                  >
                    {e.name}
                  </th>
                  <td className={`px-6 py-4 ${(e.background) ? 'animate-changeBackground' : 'bg-gray-50' }`}>{parseFloat(e.priceUsd).toFixed(2)}</td>
                  <td >{ parseFloat(e.marketCapUsd).toFixed(2)}</td>
                  <td className={`px-6 py-4 ${(e.background) ? 'animate-changeBackground' : 'bg-gray-50' }`}>{parseFloat(e.vwap24Hr).toFixed(2)}</td>
                  <td className="px-6 py-4">{parseFloat(e.supply).toFixed(2)}</td>
                  <td className={`px-6 py-4 ${(e.background) ? 'animate-changeBackground' : 'bg-gray-50' }`}>{parseFloat(e.volumeUsd24Hr).toFixed(2)}</td>
                  <td className="px-6 py-4">{parseFloat(e.changePercent24Hr).toFixed(2)}</td>
                </tr>
        ))
    }
    return renderData;
}
  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-800">
              Name
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              Price
            </th>
            <th scope="col" className="px-6 py-3  bg-gray-800">
              Market Cap
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              VWAP(24Hr)
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-800">
              Supply
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              Volume (24Hr)
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-800">
              Change (24Hr)
            </th>
          </tr>
        </thead>
        <tbody className="relative">
                {renderData()}
        </tbody>
      </table>
    </div>
  );
}
