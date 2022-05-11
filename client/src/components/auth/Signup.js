import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../UserContext"
import { API_BASE_URL } from "../../config"
import styled from "styled-components";
import Logo from "../../assets/logo-surf.png";

function Signup() {
  const { user, setUser } = useContext(UserContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const submitHandler = async (e) => {
    e.preventDefault()
    setEmailError("")
    setNameError("")
    setPasswordError("")
    /* TODO borrar estos logs */
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()

      if (data.errors) {
        setEmailError(data.errors.email)
        setNameError(data.errors.name)
        setPasswordError(data.errors.password)
      }
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      /* handle it */
    }
  }
  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={submitHandler}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>CHAT REGISTRO</h3>
          </div>
          <input 
          id="name"
          type="text"
          className="validate"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <div className="name error red-text">{nameError}</div>
          <label htmlFor="name">Name</label>
          <input 
          id="email"
          type="email"
          className="validate"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <div className="email error red-text">{emailError}</div>
            <label htmlFor="email">Email</label>
          <input 
          id="password"
          type="password"
          className="validate"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password error red-text">{passwordError}</div>
            <label htmlFor="password">Password</label>

            <button className="btn" style={{ width: "100%" }}>
          Sign up
        </button>
        </form>
        
      </FormContainer>
      
     
    </>
   
  )
}

export default Signup

const FormContainer = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0B5394;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 4rem;
  }
  input {
    
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #F43C3C;
    color: white;
    
  }
 
`;