import React, { useEffect } from 'react'
import AXIOS from '../../services/http-axios'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../../images/logo.jpg'

import './Login.css'

class WrappedLogin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email:"",
      pass:"",
      errorMessage: null,
      forgotPassword: false,
      registeredEmail: "",
      forgotPasswordView: false
    }; 
    this.onEmail = this.onEmail.bind(this); 
    this.onPass = this.onPass.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.onForgot = this.onForgot.bind(this);
    this.onSubmitForgot = this.onSubmitForgot.bind(this);
    this.onRegisteredEmail = this.onRegisteredEmail.bind(this);
    this.onRemember = this.onRemember.bind(this);
    console.log("IN LOGIN");
  }

  onLogin(e){
    e.preventDefault();
    const userCredentials = {
      email: this.state.email,
      pass: this.state.pass
    }
    AXIOS.post('/login',userCredentials)
      .then(res => {

        if(res.data){

          console.log("LOGIN>> ", res.data);
          this.props.cookie.set('UUID', res.data.userData.uuid, {path: '/'});
          this.props.cookie.set('userId', res.data.userData.userId, {path: '/'});
          this.props.cookie.set('name', res.data.userData.name, {path: '/'});
          this.props.cookie.set('email', this.state.email, {path: '/'});
          this.props.cookie.set('birth', res.data.userData.birth, {path: '/'});
          this.props.cookie.set('admin', res.data.userData.admin, {path: '/'});
          
          this.props.navigation(`/user/${res.data.userData.userId}`);

        }

      }).catch(err => {

        console.log("LOGIN>> Error : ", err);
        if(err.response.status === 401 || err.response.status === 403) {
          console.log("LOGIN>> error message: ", err.response.message);
          this.setState({errorMessage: <small> Usuario o contraseña incorrectos </small>});
        }

      });
  }

  onEmail(e){
    this.setState({email: e.target.value});
  }

  onPass(e){
    this.setState({pass: e.target.value});
  }

  onForgot(e) {
    e.preventDefault();
    this.setState({forgotPassword: true});

  }

  onSubmitForgot(e) {
    e.preventDefault();
    const fullUrl = `${window.location.protocol}//${window.location.host}`;
    console.log("LOGIN>> ", fullUrl);

    AXIOS.post('/forgotpass', {email: this.state.registeredEmail, fullUrl: fullUrl})
    .then((res)=> {
    
      console.log("LOGIN>> ", res.data.message);
      this.setState({forgotPasswordView: true});

    }).catch((err)=> {
        
      if(err.response.status !== undefined && err.response.status === 401) {

        console.log(err.response.data.message);
        this.setState({errorRecoverPass: <small> * No existe un usuario con este correo </small>});

      } else {

        this.setState({errorRecoverPass: <small> * Error interno del servidor </small>});

      }
      
    });
  }

  onRegisteredEmail(e) {
    this.setState({registeredEmail: e.target.value});
  }

  onRemember(e) {
    e.preventDefault();
    this.setState({forgotPassword: false});
  }

  
 
  render(){

    if(this.state.forgotPasswordView) {
      return(
        <div className="register-ss">
          <div id="propiedades-ss" className="container">
            <div className="col" align="center">
              <div className="d-inline-block align-middle">
                <h2>Correo de recuperación enviado</h2>
              </div>
            </div>
            <div className="este"></div>
            <div className="dropdown-divider"/>
            <div className="container">
              <div className="row">
                <div className="col-12 ss-register-desc m-2">
                  <p align="justify">
                    Se ha enviado un correo de recuperación a tu  correo, por favor sigue las instrucciones de recuperación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    if(this.state.forgotPassword) {
      return(
        <div className="login-ss">
          <div id="propiedades-ss" className="container">

            <div className="ss-login-center" align="center">
              <div className="ss-login-fix">
                <div className="" align="center">
                  <img src={logo} alt="" className="ss-login-image"/>
                </div>
                <div className="">
                  <h2>ESCUELA NACIONAL DE CIENCIAS BIOLÓGICAS</h2>
                </div>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="col" align="center">
              <div className="d-inline-block align-middle">
                <h2>Recuperar Contraseña</h2>
              </div>
            </div>

            <div className="container">
              <form onSubmit={this.onSubmitForgot}>
                <div className="col-12 p-1" align="center">
                  {this.state.errorMessage}
                  <br/>
                  <label htmlFor="">
                    Correo Registrado:
                  </label><br/>
                  <input className="ss-login-input-text" type="text" value={this.state.registeredEmail} onChange={this.onRegisteredEmail}/><br/>
                  {this.state.errorRecoverPass}

                </div>
                <div className="col-12 p-1" align="center">
                  <input type="submit" value="Recuperar Contraseña" className="btn btn-light"/>
                </div>
              </form>
              <div className="col-12 p-1" align="center">
                <a href="##"  id="ss-login-register" onClick={this.onRemember}> Ya me acorde :v </a>
              </div>
            </div>
          </div>
        </div>

      );
    }

    return (
      <div className="login-ss">
        <div id="propiedades-ss" className="container">
          <div className="ss-login-center" align="center">
            <div className="ss-login-fix">
              <div className="" align="center">
              <img src={logo} alt="" className="ss-login-image"/>
              </div>
              <div className="">
                <h2>ESCUELA NACIONAL DE CIENCIAS BIOLÓGICAS</h2>
              </div>
            </div>
          </div>

          
          <div className="dropdown-divider"/>
          <div className="col" align="center">
            <div className="d-inline-block align-middle">
              <h2>Iniciar Sesión</h2>
            </div>
          </div> 
          
          <div className="container">
            <form onSubmit={this.onLogin}>
              <div className="row">
                <div className="col-12 p-1" align="center">
                  {this.state.errorMessage}
                  <br/>
                  <label htmlFor="">
                    Correo:
                  </label><br/>
                  <input className="ss-login-input-text" type="text" value={this.state.email} onChange={this.onEmail}/>
                </div>
                <div className="col-12 p-1" align="center">
                  <label htmlFor="">
                    Contraseña:
                  </label><br/>
                  <input className="ss-login-input-text" type="password" value={this.state.pass} onChange={this.onPass}/>
                </div>
                <div className="col-12 p-1" align="center">
                  ¿Eres nuevo? <Link to="/register" id="ss-login-register"> Registrate </Link>
                </div>
                <div className="col-12 p-1" align="center">
                  ¿Olvidaste tu contraseña? <a href="##" id="ss-login-register" onClick={this.onForgot}> Si la olvide :( </a>
                </div>
                <div className="col-12 p-1" align="center">
                  <input type="submit" value="Entrar" className="btn btn-light"/>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    );

  }

}

export default function Login(props) {
  
  const navigation = useNavigate();
  useEffect(()=>{
    if(props.cookie.get('UUID')) navigation(`/user/${props.cookie.get('userId')}`);
  },[]);
  return <WrappedLogin {...props} navigation={navigation}/>
}
