import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from "react";
import './ProfileClient.css'
import { Avatar, Input } from "antd";
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const ProfileClient = (props) => {
    const [wantToModifyEmail, setWantToModiftEmail] = useState(false)
    const {data} = props;

    const handleEmailBody = () => {
        if (wantToModifyEmail === false) {
            return (
                <div>{data.find(att => att.Name === "email").Value}<ModeEditIcon onClick={() => setWantToModiftEmail(true)}/></div>
            )
        }
        return (
            <div><Input style={{width: "80%"}} placeholder='Nouveau mot de passe'/></div>
        )
    }

    return (
        <div className='ProfileClientWrapper'>
            <div className='ProfileClientHeader'>
                Mon Profil
            </div>
            <div className='ProfileClientAvatar'>
                <Avatar size={100} style={{ color: "#f56a00", backgroundColor: "#fde3cf"}}>s</Avatar>
            </div>
            <div className='ProfileClientEmail'>
                <div>Email :</div>
                <div>{data.find(att => att.Name === "email").Value}</div>
            </div>
            <div className='ProfileClientPassword'>
                <div>Modifier le mot de passe :</div>
                <div><Input style={{width: "80%"}} placeholder='Nouveau mot de passe'/></div>
            </div>
        </div>
    )
}

export default ProfileClient
