import React, { useState } from 'react';
import { Form, Input, Button, notification, Radio } from 'antd';
import './LoginAndRegisterWrapper.scss'
import axios from 'axios';
import Profile from '../Profile/Profile';
import { LoadingOutlined } from '@ant-design/icons';
export function LoginAndregisterWrapper() {
  const [statusPage, setStatusPage] = useState("Login");
  const [value, setValue] = React.useState(1);
  const [isLoading, setIsloading] = useState(false)

  const openNotification = (type) => {
    notification.open({
      message: type,
      description:
        type + ' succeed',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const onFinish = (values, type) => {
    setIsloading(true)
    let body = {"username": values.username, "password": values.password,};
    let userType = "pro";
    if (value === 1) {
      userType = "client"
    }
    if (type === "register")
      body = {"username": values.username, "password": values.password, "userType": userType}
    axios.post(`https://f2zjurxgkg.execute-api.eu-central-1.amazonaws.com/Prod/` + type, body )
    .then(res => {
      if (type === "login" && res.data.error === false) {
        localStorage.setItem("email", res.data.data.user_infos.find(x => x.Name === "email").Value)
        localStorage.setItem("token", res.data.data.id_token)
        localStorage.setItem("user_id", res.data.data.user_infos.find(x => x.Name === "sub").Value)
      }
      setIsloading(false)
      openNotification(type)
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (localStorage.getItem("email")) {
    return (
      <Profile/>
    )
  }

  if (statusPage === "Register" ) {
    return (
      <div className='loginPageWrapper'>
      <div className="loginPage">
        <Form style={{width: "100%"}} name="basic" onFinish={(e) => onFinish(e, "register")} onFinishFailed={(e) => onFinishFailed(e, "register")}autoComplete="off">
          <div style={{fontSize: "28px", color: "#2a3345", padding: "20px"}}>
            Découvrez les boutiques et bien plus!
          </div>
          <div style={{fontSize: "22px", color: "#2a3345", padding: "20px"}}>
            En créant votre compte
          </div>
          <div style={{padding: "20px"}}>
          <div style={{fontSize: "16px", color: "#2a3345", padding: "5px"}}>
            Vous etes : 
          </div>
          <div style={{fontSize: "16px", color: "#2a3345", padding: "15px"}}>
          <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
            <Radio value={1}>Un particulier</Radio>
            <Radio value={2}>Un professionnel</Radio>
          </Radio.Group>
          </div>
          <Form.Item  name="username" rules={[{ required: true, message: 'Il manque l\'identifiant!',},]}>
            <input placeholder='Adresse e-mail' className='inputLoginAndRegister' />
          </Form.Item>
          <Form.Item  name="password" rules={[{ required: true, message: 'Il manque le mot de passe!',},]}>
            <input type='password' placeholder='Mot de passe' className='inputLoginAndRegister' />
          </Form.Item>
          <Form.Item  name="password" rules={[{ required: true, message: 'Il manque le mot de passe!',},]}>
            <input type='password' placeholder='Confirmer le mot de passe' className='inputLoginAndRegister' />
          </Form.Item>
          <Form.Item>
            <button className='loginBtn' htmlType="submit">
            {isLoading ? <LoadingOutlined style={{fontSize: "22px"}}/> : "S'inscrire"}
            </button>
          </Form.Item>
          <div style={{cursor: "pointer", display: "flex", justifyContent: "center" }} onClick={() => setStatusPage("Login")}>Déja un compte ?&#160;<p style={{color: "#0593fc"}}> Se connecter</p> </div>
          </div>
        </Form>
      </div>
      </div>
    )
  }
  if (statusPage === "Login" ) {
    return (
      <div className='loginPageWrapper'>
      <div className="loginPage">
        <Form style={{width: "100%"}} name="basic" onFinish={(e) => onFinish(e, "login")} onFinishFailed={(e) => onFinishFailed(e, "login")}autoComplete="off">
          <div style={{fontSize: "28px", color: "#2a3345", padding: "20px"}}>
            Content de vous revoir!
          </div>
          <div style={{fontSize: "22px", color: "#2a3345", padding: "20px"}}>
            Vous nous avez manqué!
          </div>
          <div style={{padding: "20px"}}>
          <Form.Item  name="username" rules={[{ required: true, message: 'Il manque l\'identifiant!',},]}>
            <input placeholder='Adresse e-mail' className='inputLoginAndRegister' />
          </Form.Item>
          <Form.Item  name="password" rules={[{ required: true, message: 'Il manque le mot de passe!',},]}>
            <input type='password' placeholder='Mot de passe' className='inputLoginAndRegister' />
          </Form.Item>
          <Form.Item>
            <button className='loginBtn' htmlType="submit">
              {isLoading ? <LoadingOutlined style={{fontSize: "22px"}}/> : "Se connecter"}
            </button>
          </Form.Item>
          <div style={{cursor: "pointer", display: "flex", justifyContent: "center" }} onClick={() => setStatusPage("Register")}>Pas encore de compte ?&#160;<p style={{color: "#0593fc"}}> S'inscrire</p> </div>
          </div>
        </Form>
    
        
      </div>
      </div>
    )
  }
}
export default LoginAndregisterWrapper;