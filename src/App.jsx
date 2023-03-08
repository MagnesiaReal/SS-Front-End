import Login from './views/Login/Login'
import Register from './views/Register/Registrer'
import Session from './services/Session/Sesion'
import User from './views/User/User'
import ChangePass from './views/ChangePass/ChangePass'

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Cookies from 'universal-cookie';


function App() {

  const cookie = new Cookies();
 
  // Rutas sin login
  return (
    <Router>
      <Routes>
        {/*Rutas de usuario*/}
        <Route path='/login' element={<Login cookie={cookie}/>}/>
        <Route path='/register' element={<Register cookie={cookie}/>}/>
        <Route path='/changepass/:code' element={<ChangePass/>}/>
       
        {/*System paths*/}
        <Route path='/' element={<Session cookie={cookie}/>}>
          <Route index element={<Navigate to={(cookie.get('userId') !== undefined) ? `/user/${cookie.get('userId')}` : '/home'}/>}/>
          <Route path='user/:id' element={<User cookie={cookie}/>}/>
          <Route exact path='*' element={<Navigate to={(cookie.get('userId') !== undefined) ? `/user/${cookie.get('userId')}` : '/login'}/>}/> 
        </Route>

        <Route exact path='*' element={<Navigate to='/login'/>}/>
        
      </Routes>
    </Router>
  );

}

export default App;
