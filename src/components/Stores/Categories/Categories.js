import React from 'react'
import './Categories.css';
import { useSelector } from 'react-redux';
import { changeSelectedCategory, changeSelectedMenu, storeSelectedStore, storeStatusPage } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
const Categories = (props) => {
    const selectedStore = useSelector(storeSelectedStore);
    const dispatch = useDispatch();
    const {data} = props;

    const dispatchSelectedCategory = (categoryName) => {
        dispatch(changeSelectedCategory(categoryName))
        dispatch(changeSelectedMenu(1))
    }

    const mapCategories = () => {
        return data.map(category =>
            <div className='CategoryWrapper' onClick={() => dispatchSelectedCategory(category.name)}>
                <div style={{width: "20%"}}>
                    <img style={{height: "50px"}} src={category.img}/>
                </div>
                <div style={{width: "60%", fontSize: "22px"}}>
                    {category.name}
                </div>
                <div style={{width: "20%"}}>
                    <img style={{height: "50px"}} src={"https://cdn-icons-png.flaticon.com/512/1252/1252574.png"}/>
                </div>
            </div>
        )
    }
    return(
        <div className='CategoriesWrapper'>
            {mapCategories()}
        </div>
    );
}

export default Categories