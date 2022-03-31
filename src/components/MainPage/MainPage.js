import React, { useState } from 'react'
import { useEffect } from "react";
import './MainPage.css'
import backMainPage from '../../images/backMainPage.png'
import { useDispatch } from 'react-redux';
import { changeStatusPage } from '../Redux/Store';
const MainPage = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        
    }
    return (
        <div className='MainPageWrapper' style={{backgroundImage: `url(${backMainPage})`}}>
            <div className='btnDiscoverStoresWrapper'>
                Vous allez adorer nos produits
                <p style={{fontSize: "10px", color: "darkgrey"}}>Il y en a pour tous les gouts !</p>
                <div className='btnDiscoverStores' onClick={() => dispatch(changeStatusPage(1))}>
                    Découvrir les boutiques
                </div>
            </div>
        </div>
    )
}

export default MainPage