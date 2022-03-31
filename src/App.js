import { useEffect, useRef, useState } from "react";
import './App.css';
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage"
import firebase from "./services/firbaseService";
import Stores from "./components/Stores/Stores";
import Map from "./components/Map/Map"
import LoginAndregisterWrapper from "./components/LoginAndRegister/LoginAndRegisterWrapper";
import { Carousel } from 'antd';
import { storeStatusPage } from "./components/Redux/Store";
import { useSelector } from 'react-redux';
import backMainPage from './images/backMainPage.png'
import TabBar from "./components/TabBar/TabBar";
import { useDispatch } from 'react-redux';
import Favorites from './components/Favorites/Favorites'
import News from './components/News/News';
import { changeStatusPage, storeSelectedMenu, storeSelectedStore, changeSelectedMenu, changeSelectedCategory } from './components/Redux/Store';
import StoreWrapper from "./components/Stores/RedirectStores/StoresWrapper/StoresWrapper";

const App = () => {
  const slider = useRef();
  const selectedMenuRedux = useSelector(storeSelectedMenu);
  const selectedStore = useSelector(storeSelectedStore)
  // const swiper = document.querySelector('.swiper').swiper;

  const swiperRef = useRef(null);
  swiperRef.current?.swiper.slideTo(selectedMenuRedux);
  const dispatch = useDispatch();
  useEffect(() => {
   
    // slider.current.goTo(selectedMenuRedux);
    const message = firebase.messaging();
    message.requestPermission().then(() => {
      return message.getToken()
    }).then((data) => {
      console.warn("TOKEN:", data)
    })
   
  }, [selectedMenuRedux]);
  const handlePages = () => {

  if (selectedMenuRedux === 0) {
    return (
      <div className="App">
        <Stores/>
        </div>
    )
  }
  if (selectedMenuRedux === 1) {
    return (
      <div className="App">
        <News/>
        </div>
    )
  }

  if (selectedMenuRedux === 2) {
    return (
  
        <LoginAndregisterWrapper/>
    
    )
  }

  if (selectedMenuRedux === 3) {
    return (
        <Favorites/>
    
    )
    
  }
  if (selectedMenuRedux === 4) {
    return (
        <Map/>
    )
  }
}

  return (
    <div className="App">
      {handlePages()}
    {
      selectedStore === "" && (  <TabBar/>)
    }
  
        {/* <div className="mainPageWrapperApp">
          <div className='MainPageWrapper' style={{backgroundImage: `url(${backMainPage})`}}>
              <div className='btnDiscoverStoresWrapper'>
                  Vous allez adorer nos produits
                  <p style={{fontSize: "10px", color: "darkgrey"}}>Il y en a pour tous les gouts !</p>
                  <div className='btnDiscoverStores' onClick={() => slider.current.goTo(1)}>
                      Découvrir les boutiques
                  </div>
              </div>
          </div>
        </div> */}
      
    </div>
  );
}

export default App;
