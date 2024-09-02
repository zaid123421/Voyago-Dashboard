import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { User } from "../Context";
import Loading from "../Loading";
import Cookies from "universal-cookie";
import { dom } from "../dom";


export default function PresistLogin(){
  const [loading, setLoading] = useState(true);

// useContext
  const userInfo = useContext(User);

// Cookies
  const cookie = new Cookies();

// Request New Access Token Using Refresh Token
useEffect(() => {
  async function refresh(){
    try {
      await axios.post(`https://${dom}/web/token`,{
        token: cookie.get('userRefreshToken')
      })
      .then((data) => {
        cookie.set('userAccessToken', data.data.accessToken, { path: '/' })
        userInfo.setAuth((prev) => {
          return {
            userAccessToken: data.data.accessToken,
            userRefreshToken: cookie.get('userRefreshToken'),
            userName: cookie.get('userName'),
            userRole: cookie.get('userRole'),
          }
        })
      })
    } catch(err) {
      console.log(err);
    }
  }
  !userInfo.auth.userAccessToken ? refresh() : setLoading(false);
},[])

  return !userInfo.auth.userAccessToken ? <Loading /> : <Outlet />;
}