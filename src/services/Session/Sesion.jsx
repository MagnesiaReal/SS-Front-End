import {useEffect, useState} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import AXIOS from '../http-axios'

import './Session.css'
//This component works for make sure user is on Session, if not this components denied the access and return the user to home and perform some operations.



export default function Session(props) {
  const [loading, setLoading] = useState(true);
  
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(()=>{
  
    AXIOS.put('/checksession', {UUID: props.cookie.get('UUID')})
      .then((res)=>{

        console.log("SESSION>> ", res.data.message);

      }).catch((err)=> {
        
        if(err.response.status === 401){

          console.log("SESSION>> Session expired or doesn't exist, redirecting to home");
          props.cookie.remove('userId', {path: '/'});
          props.cookie.remove('UUID', {path: '/'});
          props.cookie.remove('name', {path: '/'});
          props.cookie.remove('email', {path: '/'});
          props.cookie.remove('born', {path: '/'});
          props.cookie.remove('admin', {path: '/'});

          navigation('/login');

        } else {
          
          console.log("SESSION>> Wow unknown error,be carefull");

        }
      });

  }, []);

  function onSignOut(e) {
    e.preventDefault();
    props.cookie.remove('userId', {path: '/'});
    props.cookie.remove('UUID', {path: '/'});
    props.cookie.remove('name', {path: '/'});
    props.cookie.remove('email', {path: '/'});
    props.cookie.remove('birth', {path: '/'});
    props.cookie.remove('admin', {path: '/'});

    navigation('/login');    
  }

  // Else go to main system
  return(
    <> 
      <div className='ss-userHeader-header'>
        <h2>SSENCB_provname</h2> 
        <div className='ss-userHeader-buttonsContainer'>
          <button className="ss-user-configurationButton">
            Configuracion &nbsp;
            <FontAwesomeIcon icon="fa-solid fa-cog" />
          </button>
          <button className="ss-user-sessionButton" onClick={onSignOut}>
            Cerrar Sesion &nbsp;
            <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={onSignOut}/>
          </button>
        </div>
        <div className='ss-userHeader-iconContainer'>
          <button className="ss-user-configurationButton">
          &nbsp; <FontAwesomeIcon icon="fa-solid fa-cog" /> &nbsp;
          </button>
          <button className="ss-user-sessionButton" onClick={onSignOut}>
          &nbsp; <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={onSignOut}/> &nbsp;
          </button>
        </div>
      </div>
      <Outlet/>
    </>);

}
