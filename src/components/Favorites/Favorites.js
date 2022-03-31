import { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import './Favorites.css'
import { useSelector } from 'react-redux';

import { changeStatusPage, changeSelectedStore, storeSelectedMenu, storeSelectedStore, changeSelectedMenu, changeSelectedCategory, storeStatusPage } from '../Redux/Store';
import axios from "axios";
const Favorites = () => {
  const dispatch = useDispatch();
  const [favoriteFood, setFavoriteFood] = useState([]);
  const [favoriteStore, setFavoriteStore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedStore = useSelector(storeSelectedStore)
  useEffect(() => {
    axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("email") +"/favorites")
    .then(res => {
      // setFavoriteStore(res.data.favorite_store)
      // setFavoriteFood(res.data.favorite_food)
      // setIsLoading(false)
    })
  }, []);

  const handleFavoritesStores = () => {
    return favoriteStore.map(x =><div>{x}</div>)
  }

  const handleFavoritesProducts = () => {
    return favoriteFood.map(x =><div>{x.product_name}</div>)
  }

  if (localStorage.getItem("email")) {
    if (isLoading === true) {
      return (
        <div>loading</div>
      )
    }
    return (
      <div className="FavoritesWrapper">
          Vos Boutiques Favorites
          {
            handleFavoritesStores()
          }
          Vos produits favoris
          {
            handleFavoritesProducts()
          }
      </div>
    );
  }
    return (
      <div className="FavoritesWrapperNotLogged">
        <div className="FavoritesNotLogged">
          <div className="FavoritesNotLoggedT1">
            Il semblerait que vous n'etes pas connecté
          </div>
          <div className="FavoritesNotLoggedT2">
            Connectez vous pour acceder à vos favoris
          </div >
          <div className="connectBtn" onClick={() => dispatch(changeSelectedMenu(2))}>
            Se connecter
            </div>
        </div>
      </div>
    )

}

export default Favorites;
