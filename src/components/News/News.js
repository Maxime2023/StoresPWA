import { ForkLeft } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import {notifications} from "../Stores/Data";
import './News.css'

const News = () => {
  const mapNews = () => {
    const handleStoresColor = () => {
      let bgColors = ["#ded8ff", "#c4f0f0", "#ffdbd2"]
      let rand = Math.floor(Math.random() * (bgColors.length));
      return bgColors[rand]
  }
    return notifications.map (notif =>
      <div className='NotifWrapper' style={{backgroundColor: handleStoresColor()}}> 
       <div className='NotifWrapperLeft'>
         <img className='image1' alt="Icon" style={{height:"80px"}} src={notif.Img}/>
        </div>
        <div className='NotifWrapperRigth'>
        <div>{notif.Name}</div>
        <div>{notif.Text}</div>
        </div>
        
       
        
      </div>
    )
  }



  return (
    <div className="NewsWrapper">
       {mapNews()}
        
       
    </div>
  );
}

export default News;
