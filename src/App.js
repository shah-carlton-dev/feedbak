import React, { useState, useEffect, useContext } from "react";
import NavbarContainer from "./components/NavbarContainer";
import UserContext from './utils/UserContext.js'
import { API_URL } from './utils/constants.js';


const App = () => {
   const [userData, setUserData] = useState({ token: 0, user: {} });

   useEffect(() => {
      checkToken();
   }, []);

   async function checkToken() {
      try {
         let token = localStorage.getItem("auth-token");
         if (token == null) return
         else {
            return Axios.post(API_URL + "/users/token", { "authToken": token })
               .then((tokenRes) => {
                  if (!tokenRes) console.log("Did not receive a repsonse from server while validating token");
                  if (tokenRes.data.valid) {
                     setUserData({
                        token: tokenRes.data.token,
                        user: tokenRes.data.user,
                     });
                  }
               });
         }
      } catch (err) {
         console.log(`Received error: ${err}`);
      }
   };

   return (
      <UserContext.Provider value={{userData, setUserData}}>
         <NavbarContainer />
      </UserContext.Provider>
   )
};

export default App; 