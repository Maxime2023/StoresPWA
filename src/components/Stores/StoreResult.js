import React, { useState, useRef } from 'react'
import { useEffect } from "react";
import {Input,Button,Select, Carousel} from "antd";
import Store from "./Store";
import './StoreResult.css';
import axios from "axios";
import Categories from './Categories/Categories';
import Products from './Products/Products';
import ProductsInfos from './ProductsInfos/ProductsInfos';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeStatusPage, storeSelectedMenu, storeSelectedStore, changeSelectedMenu, changeSelectedCategory } from '../Redux/Store';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
const StoreResult = (props) => {
    const [selectedMenu, setSelectedMenu] = useState("Categories")
    const {data} = props;
    const dispatch = useDispatch();
    const slider = useRef();
    const selectedStore = useSelector(storeSelectedStore);
    const selectedMenuRedux = useSelector(storeSelectedMenu);

    useEffect(() => {
        // slider.current.goTo(selectedMenuRedux);
        console.log("sqtoores")
      },[selectedMenuRedux]);

    const handleBackBtn = () => {
        dispatch(changeSelectedCategory(""))
        dispatch(changeSelectedMenu(0))
        dispatch(changeStatusPage("Home"))
    }
    return (
        <div className='storeResultWrapper'>
            <div className='storeResultWrapperHeader'>
            <div className='backBtn' onClick={() => handleBackBtn()}>
            &#8592;
            </div>
                <div className='storeName'>
                    {selectedStore.name}
                </div>
            </div>
        </div>
    );
}

export default StoreResult