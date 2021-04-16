import React from 'react'
import '../App.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import LoginForm from '../components/login/Login'


class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (      
      <div class="container-fluid">
        
         <LoginForm />
        <Footer />
      </div>    
    );
  }
}

export default Login;