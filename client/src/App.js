import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
const server_url = "http://localhost:3001"

function App() {
  const [validated, setValidated] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);

  const [state, setState] = useState(
    {
      email: "",
      phone: "",
      fullname: "",
      password: ""
    })

  const handleSubmit = (event) => {

  };


  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if(!state.email){
        alert("Please enter email")
        return;
      }
      if(!state.fullname){
        alert("Please enter fullname")
        return;
      }
      if(!state.password){
        alert("Please enter password")
        return;
      }
      const registerResponse = await axios.post(server_url + "/register", state);
      if (registerResponse.status === 200) {
        alert("User registered successfully!");
        setState({
          email: "",
          phone: "",
          fullname: "",
          password: ""
        })
      } else {
        alert(" User Registration failed!")
      }
    } catch (err) {
      console.log(err, "Registering user failed")
    }

  }

  const handleClickLogin = () => {
    setIsLogin(true);
  }

  const HandleSignIn = async () => {
    try {
      const res = await axios.post(server_url + "/login", state);
      if (res.status === 200) {
        setUserData(res.data)
        alert("User loggedIn successfully!");
        setState({
          email: "",
          phone: "",
          fullname: "",
          password: ""
        })
      } else {
        alert(" User loggedIn failed!")
      }
    } catch (err) {
      alert("loggedIn user failed")
      console.log(err, "loggedIn user failed")
    }
  }

  useEffect(()=>{
    (async ()=>{
      if(isLogin)
    {const resP = await axios.get('https://dummyjson.com/products');
    if (resP) {
      setProducts(resP.data.products);
    }}
    })()
  },[isLogin])

  const handleLogout = ()=>{
    setIsLogin(false);
    setState({
      email: "",
      phone: "",
      fullname: "",
      password: ""
    })
    setProducts([])
    setUserData(null)
  }
  return (
    <div className="App">
      <h1>Ditinus Machine Test</h1>
      {!userData ?
        <>
          {isLogin &&
            <div className='form'>
              <label>
                <span> Email </span>
                <input placeholder='Enter your Email' name='email' value={state.email} onChange={(e) => handleOnChange(e)} />
              </label>
              <label>
                <span> Password </span>
                <input placeholder='Enter your Email' name='password' value={state.password} onChange={(e) => handleOnChange(e)} />
              </label>
            </div>}
          {!isLogin && <div className='form'>
            <label>
              <span> FulName </span>
              <input placeholder='Enter your Full Name' name='fullname' value={state.fullname} onChange={(e) => handleOnChange(e)} />
            </label>
            <label>
              <span> Phone </span>
              <input placeholder='Enter your Phone Number' name='phone' value={state.phone} onChange={(e) => handleOnChange(e)} />
            </label>
            <label>
              <span> Email </span>
              <input placeholder='Enter your Email' name='email' value={state.email} onChange={(e) => handleOnChange(e)} />
            </label>
            <label>
              <span> Password </span>
              <input placeholder='Enter your Password' name='password' value={state.password} onChange={(e) => handleOnChange(e)} />
            </label>
          </div>
          }



         
          {isLogin ?
          <>
          <Button onClick={HandleSignIn}>
              SignIn
            </Button>
            <Button style={{marginLeft:"20px", marginTop:"20px"}} onClick={()=>{
              setIsLogin(false)
            }}>
              Back
            </Button>
          </>
             :
            <> 
             <Button style={{ marginRight: "20px", marginTop: "20px" }} variant="primary" onClick={handleRegister}>
             Register
           </Button>
            <Button onClick={handleClickLogin}>
              Login
            </Button>
            </>
          }
        </> :
        <div>
          {userData && isLogin &&
          <>
          <span className='' style={{ display: "flex", justifyContent: "center" }}>
            <p> Products data </p>
            <Button onClick={handleLogout} style={{marginLeft:"20px"}}>Logout</Button>
          </span>
          {
            products?.length > 0 ?
            <div style={{padding:"50px"}}>

              {products.map((p, i) => (
                  <div className="card" style={{marginTop:"20px"}} key={i}>
                    <img src={p.images[0]} alt="Avatar" style={{width:"100%"}}/>

                  <div className="container">
                    <h4><b>{p.title}</b></h4>
                    <p>{p.description}</p>
                  </div>
                </div>
              ))}
              </div>

              :
              <p>No data found!</p>
          }
          </>}

        </div>
      }
    </div>
  );
}

export default App;
