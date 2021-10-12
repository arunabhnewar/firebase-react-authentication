import './App.css';
import img from './image/login-2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import initializeAuthentication from './Firebase/firebase.init';
import Register from './Login/Register';
import { useState } from 'react';


initializeAuthentication();

function App() {
  const [toggle, setToggle] = useState(false);
  console.log(toggle);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="img">
            <img className="img-fluid" src={img} alt="" />
          </div>
        </div>
        <div className="col-md-6 login-area text-center">

          {toggle ? <Login></Login> :
            <Register></Register>}

          {toggle ? <span onClick={() => setToggle(false)} className="text-success ">are you new? register please. </span>
            :
            <span onClick={() => setToggle(true)} className="text-success"> Or already have an account?</span>}

        </div>
      </div>
    </div>
  );
}

export default App;
