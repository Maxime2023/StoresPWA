import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import {Input} from "antd"
import './ProfilePro.scss'
import Modal from "react-bootstrap/Modal";
import { Select, notification } from 'antd';
import Store from '../../Stores/Store'
import 'antd/dist/antd.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { LoadingOutlined,} from '@ant-design/icons';
const { Option } = Select;



const openNotification = (type) => {
    notification.open({
      message: type,
      description:
        type + ' succeed',
        style: {zIndex: 99999999},
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

const ProfilePro = () => {
    const ref = useRef
    const [showAddShopModal, setShowAdddShopModal] = useState(false);
    const [showModifyModalCategory, setShowModifyModalCategory] = useState(false)
    const [inputAddress, setInputAddress] = useState("");
    const [resultsAddress, setResultsAdress] = useState([]);
    const [areSuggestionsOpen, setAreSuggestionsOpen] = useState(false);
    const [inputName, setInputName] = useState("");
    const [coordinates, setCoordinates] = useState([]);
    const [city, setCity] = useState([]);
    const [type, setType] = useState("Boulangerie");
    const [userShops, setUserShops] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedShop, setSelectedShop] = useState("");
    const [shopCategories, setShopCategories] = useState([]);
    const [shopProducts, setShopProducts] = useState([]);
    const [inputCategoryName, setInputCategoryName] = useState("");
    const [inputProductName, setInputProductName] = useState("");
    const [menu, setMenu] = useState("Categories")
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        console.log("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops")
        axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops")
        .then(res => {
            console.log(res.data)
            setUserShops(res.data)
        })

        const checkIfClickedOutside = e => {
            if (areSuggestionsOpen && ref.current && !ref.current.contains(e.target)) {
                areSuggestionsOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [])

    function handleChange(value) {
        setType(value)
      }

    const searchAddressGouv = (value) => {
        setAreSuggestionsOpen(true)
        setInputAddress(value)
        axios.get("https://api-adresse.data.gouv.fr/search/?q="+ value)
        .then(res => {
            console.log(res.data)
            setResultsAdress(res.data)
        })
        if (value[value.length - 1] === " ") {
            console.log("sdfdsf")

        }
    }
    const clickToSelectShop = (shop) => {
        console.log("clickToSelectShop", shop)
        setSelectedShop(shop)
        setMenu("Categories")
        axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") +"/shops/" + shop.ID + "/categories")
        .then(res => {
            setShopCategories(res.data)
            setShowModifyModalCategory(true)
        })

    }
    const mapStore = () => {
        return userShops.map(store=>
            <div key={store.ID} onClick={()=> clickToSelectShop(store)}>
                <Store data={store}/>
            </div>
        )
    }

    const mapSelect = () => {
        let values = ["Boulangerie", "Boucherie", "Epicerie", "Patisserie", "Rotisserie"]
        return values.map(value => <Option value={value}>{value}</Option>)
    }

    const createNewShop = () => {
        setIsLoading(true)
        let body = {
            "name": inputName,
            "store": type,
            "city": city,
            "address": inputAddress,
            "coordinates": coordinates
        }
        axios.post("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops", body)
        .then ( res => {
            axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") + "/shops")
            .then(res => {
                console.log(res.data)
                setUserShops(res.data)
                setIsLoading(false)
            })
        })
    }

    const addShopModal = () => {
        return (
            <Modal show={showAddShopModal} onHide={() => setShowAdddShopModal(false)} className='addShopModal'>
                <Modal.Header className='modalHeaderCreateShop'>
                    Créer une boutique
                    <button type="button" style={{color: "white"}} class="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowAdddShopModal(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <div className='dataWrapperAddShop'>
                    Entrez le nom de votre boutique : 
                    <div className='inputWrapper'>
                        <Input className='inputSearchAddress' placeholder={"Ex: Boulangerie Masséna"}  onChange={(e) => setInputName(e.target.value)}/>
                    </div>
                </div>
                <div className='dataWrapperAddShop'>
                    Entrez l'adresse de votre boutique : 
                    <div className='inputWrapper'>
                        <Input value={inputAddress} className='inputSearchAddress' placeholder={"Ex: 208 place sophie lafitte"}  onChange={(e) => searchAddressGouv(e.target.value)}/>
                    </div>
                </div>
                {mapAddresses()}
                <div className='dataWrapperAddShop'>
                    Selectionnez le type de votre boutique:
                <Select defaultValue="Boulangerie" style={{ width: "100%", marginTop: "10px", }} onChange={handleChange}>
                    {mapSelect()}
                </Select>
                </div>
                <div className='dataWrapperAddShop'>
                <button className='btnCreateStore' onClick={() => createNewShop()}>
                    {isLoading ? <LoadingOutlined style={{fontSize: "22px"}}/> : "Créer la boutique"}
                </button>
                </div>
            </Modal>
        )
    }
    const deleteCategory = (category) => {
        console.log(category)
        axios.delete("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") +"/shops/" + selectedShop.ID + "/categories/" + category.name)
        .then(res => {
            setShopCategories(res.data)
        })
    }

    const handleClickOnCategories = (category) => {
        setMenu("Products");
        setSelectedCategory(category)
    }
    const mapCategories = () => {
        if (selectedShop === "") {
            return
        }
        if (shopCategories.length === 0) {
            return
        } 
        return shopCategories.map(category => <div className='categoryWrapper'>
            <div className='editCategoryName' onClick={() => handleClickOnCategories(category)}>
            {category.name}
            </div>
            <div className='editCategoryBtnDelete' onClick={() => deleteCategory(category)}>
            <DeleteIcon/>
            </div>
        </div>)
    }

    const mapProducts = () => {
        if (selectedShop === "" ) {
            return
        }
        let productsToShow = [];
        for (let i = 0; i < selectedShop.products.length; i++) {
            console.log(selectedShop.products[i].Category, selectedCategory.name)
            if (selectedShop.products[i].Category === selectedCategory.name) {
                productsToShow.push(selectedShop.products[i])
            }
        }
        console.log('productsToShow', productsToShow)
        return productsToShow.map(product => <div className='categoryWrapper'>
            <div className='editCategoryName' onClick={() => setMenu("ProductInfos")}>
            {product.Name}
            </div>
            <div className='editCategoryBtnDelete' onClick={() => deleteCategory(product)}>
            <DeleteIcon/>
            </div>
        </div>)
    }

    const CreatenewCategoryforShop = () => {
        setIsLoading(true)
        console.log(selectedShop.ID)
        console.log(localStorage.getItem("user_id"))
        console.log("inputCategoryName" ,inputCategoryName)
  
        let body = {
            "name": inputCategoryName,
            "img": "image",
        }
        axios.post("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") +"/shops/" + selectedShop.ID + "/categories", body)
        .then(res => {
            setShopCategories(res.data)
            console.log(res.data)
            let tmp = selectedShop
            setIsLoading(false)
        })
    }

    const CreateNewProduct = () => {
        let data = {
            "Name": inputProductName,
            "Ingredients": [],
            "Price": "2.50",
            "Labels": []
        }
        axios.post("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/" + localStorage.getItem("user_id") +"/shops/" + selectedShop.ID + "/products", data)
        .then( res => {
            console.log(res.data)
        })
    }

    const handleAllCategories = () => {
        if (menu === "Categories") {
            return (
                <div className='dataWrapperAddShop'>
                Mes categories : 
                {mapCategories()}
                <div className='addCategoryInputBtnWrapper'>
                    <Input className='addCategoryInput' placeholder='Ajouter une catégorie' onChange={(e) => setInputCategoryName(e.target.value)}/>
                    <button className='addCategoryBtn' onClick={() => CreatenewCategoryforShop()}>{ isLoading ? <LoadingOutlined/> :  <AddCircleIcon/>}</button>
                </div>
            </div>
            )
        }
        if (menu === "Products") {
            return (
                <div className='dataWrapperAddShop'>
                Mes produits : 
                {mapProducts()}
                <div className='addCategoryInputBtnWrapper'>
                    <Input className='addCategoryInput' placeholder='Ajouter un produit' onChange={(e) => setInputProductName(e.target.value)}/>
                    <button className='addCategoryBtn' onClick={() => CreateNewProduct()}><AddCircleIcon/></button>
                </div>
            </div>
            )
        }
    }

    const modifyStoreCategory = () => {
        return (
            <Modal show={showModifyModalCategory} onHide={() => setShowModifyModalCategory(false)} style={{width: "100%", minHeight: "100vh" }}>
                <Modal.Header className='modalHeaderCreateShop'>
                    Modifier ma boutique
                    <button type="button" style={{color: "white"}} class="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModifyModalCategory(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
               {handleAllCategories()}
            </Modal>
        )
    }

    const handleClickAddress = (address, coordinates) => {
        setInputAddress(address.properties.label);
        setCoordinates([coordinates[0].toString(), coordinates[1].toString()])
        setAreSuggestionsOpen(false)
        setCity(address.properties.city)
    }

    const mapAddresses = () => {
        console.log("areSuggestionsOpen ==> ", areSuggestionsOpen)
        if (resultsAddress.length === 0 || !areSuggestionsOpen) return;
        return (
            <div className='suggestions' >
                {
                resultsAddress.features.map(address => <div onClick={() => handleClickAddress(address, address.geometry.coordinates)}>{address.properties.label}</div>)
                }
            </div>
            )
    }

    return (
        <div className='ProfileProWrapper'>
            {addShopModal()}
            {modifyStoreCategory()}
            <button className='AddStoreBtnProfile' onClick={() => setShowAdddShopModal(true)}>
                Ajouter une boutique&nbsp;&nbsp;<AddCircleIcon/>
            </button>
            <div className='mapStoresWrapper'>
            {mapStore()}
            </div>
    
        </div>
    )
}

export default ProfilePro
