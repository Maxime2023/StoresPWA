import React from 'react'
import './Store.css';

const Store = (props) => {
    const {data} = props;
    const handleStoresColor = () => {
        let bgColors = ["#ded8ff", "#c4f0f0", "#ffdbd2"]
        let rand = Math.floor(Math.random() * (bgColors.length));
        return bgColors[rand]
    }
 
    return(
        <div className='storeWrapper' style={{backgroundColor: handleStoresColor()}}>
             <div className='header'>{data.name}</div>
            <div><img alt="Icon" style={{height:"50px"}}src={data.img} /></div>
        </div>
        
    );
}

export default Store