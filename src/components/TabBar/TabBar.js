import React from 'react'
import './TabBar.css'
import { useDispatch } from 'react-redux';
import { storeSelectedMenu, changeSelectedMenu} from '../Redux/Store';
import { useSelector } from 'react-redux';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArticleIcon from '@mui/icons-material/Article';
import StarIcon from '@mui/icons-material/Star';
import MapIcon from '@mui/icons-material/Map';
const TabBar = () => {
    const updateMenu = (number) => {
        dispatch(changeSelectedMenu(number))
    }
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const calcMargin = () => {
        let margin = (vw - 40) ;
        return margin.toString() + "px"
    }



    const dispatch = useDispatch();
    const selectedMenuRedux = useSelector(storeSelectedMenu);
    return (
        <div className='tabBarWrapper' >
            <div className='tabBar'style={{width: calcMargin(), marginLeft: "20px"}}>
                <div className='iconsWrapper'>
                    <div onClick={() => updateMenu(0)} >
                        < StorefrontIcon style={selectedMenuRedux === 0 ? {color: "#ff9580"} : null}/>
                    </div>
                    <div onClick={() => updateMenu(1)} >
                        <ArticleIcon style={selectedMenuRedux === 1 ? {color: "#ff9580"} : null}/>
                    </div>
                    <div onClick={() => updateMenu(2)} >
                        < AccountBoxIcon style={selectedMenuRedux === 2 ? {color: "#ff9580"} : null}/>
                    </div>
                    <div onClick={() => updateMenu(3)} >
                        < StarIcon style={selectedMenuRedux === 3 ? {color: "#ff9580"} : null}/>
                    </div>
                    <div onClick={() => updateMenu(4)} >
                        < MapIcon style={selectedMenuRedux === 4 ? {color: "#ff9580"} : null}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabBar
