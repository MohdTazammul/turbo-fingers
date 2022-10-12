// import "./styles.css";
import React, { useEffect } from "react";
import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from "recharts";


import API from "../../utills/API";

  export default function ProfileGraph() {

    const [userID, setUserID] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const storeData = useSelector((state) => state)
    useEffect(()=>{
        if(storeData.isLogin)
        {
            setUserID(storeData.data._id);
        }
    }, [storeData])

useEffect(()=>{
  console.log(userID)
  fetch(`${API}/score/${userID}`)
  .then(resp=>resp.json()).then(data=>{
    let tempArr = [];
    data.map((el, i)=>{
      var d = new Date(el.updatedAt)
      tempArr.push({netSpeed:el.netSpeed, grossSpeed:el.grossSpeed, accuracy:el.accuracy, date:d.toLocaleString()})
    })
    setData(tempArr)
    setLoader(false);
  })
}, [userID])

let loaderStyle = {
    height: "20vw",
    width: "20vw",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -10%)",
    backgroundImage: "url('https://cdn.dribbble.com/users/600626/screenshots/2944614/loading_12.gif')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
}

  return (
   <>
   {loader ? <div style={loaderStyle}></div>
    :
    <div style={{display:"flex", justifyContent:"center"}}>
    {data.length == 0
    ?
    <h1>No previous records found, take a test to create one.</h1>
    :
    <ComposedChart
    layout="vertical"
    width={800}
    height={data.length <= 5 ? data.length*150 : data.length*100 }
    data={data}
    margin={{
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }}
  >
    <CartesianGrid stroke="#f5f5f5" />
    <XAxis type="number" />
    <YAxis dataKey="date" type="category" />
    <Tooltip />
    <Legend />
    <Area dataKey="grossSpeed" fill="#8884d8" stroke="#8884d8" />
    <Bar dataKey="netSpeed" barSize={50} fill="#413ea0" />
    <Line dataKey="accuracy" stroke="green" />
  </ComposedChart>
    }
  </div>}
   </>
  );
}
