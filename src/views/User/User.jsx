import {useEffect, useState} from 'react';

import AXIOS from '../../services/http-axios'
//Mock temporal import

import { faCirclePlus, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom';

import './User.css'

export default function User (props) {

  const navigation = useNavigate();
  
  // loading status
  const [loading, setLoading] = useState(true);
  // Variables para Crear grupo
  const [groupName, setGroupName] = useState("");
  const [group, setGroup] = useState("");
  // Update count
  const [update, setUpdate] = useState(0);

  useEffect(()=>{ // componentDidMount
    
    setLoading(false);
    

  },[]);

  

  if (loading) return (
    <div>
      <h1>LOADING . . .</h1>
    </div>
  );
  else return(
    <div className="encb-global-container">
      <section className="encb-container">
        <button className="btn btn-success">Cargar archivo</button>
      </section>
      <section className="encb-generated-files-container">
        Aqui es un contenedor
      </section>
    </div>
  );

}
