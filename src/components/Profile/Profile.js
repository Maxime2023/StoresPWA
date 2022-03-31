import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from "react";
import './Profile.css';
import ProfileClient from './ProfileClient/ProfileClient';
import ProfilePro from './ProfilePro/ProfilePro';

const Profile = () => {
    const [userInformations, setUserInformations] = useState([]);

    useEffect(() => {
        getUserInformations()
    }, []);
    const getUserInformations = () => {
        axios.get("https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/users/maximedizier06500@gmail.com")
        .then(res => {
            console.log("userInformations", res.data)
            setUserInformations(res.data)
        })
    }
    // if (userInformations.find(att => att.Name === "custom:user-type").Value === "client") {
    //     return (
    //         <ProfileClient data={userInformations}/>
    //     )
    // }
    return (
        <ProfilePro/>
    )
}

export default Profile
