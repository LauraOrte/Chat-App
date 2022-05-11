/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import styled from "styled-components";
import { GoogleLoginButton } from "react-social-login-buttons"
import { API_BASE_URL } from "../../config"
import { UserContext } from "../../UserContext"
import Logo from "../../assets/logo-surf.png";


function Login() {
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState("") // TODO borrar?
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [loginError, setLoginError] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    setNameError("")
    setLoginError("")

    try {
      const la_urls = `${API_BASE_URL}/login`
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include", // TODO ver que coñoo es esta opcion
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()

      if (data.errors) {
        setLoginError(data.errors.login)
        setNameError(data.errors.name)
      }
      if (data.user) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
      }
    } catch (error) {
      /*  handle it */
    }
  }

  const createGoogleAuthLink = async () => {
    try {
      // cambiar la url de  "http://localhost:5000/auth/google/url" a "http://localhost:8080/createAuthLink"

      const response = await fetch(`${API_BASE_URL}/auth/google/url`)
      const fetchedURL = await response.json()

      window.location.href = fetchedURL
    } catch (error) {
      throw new Error("Issue with Login", error.message)
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={submitHandler}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Chat live</h3>
          </div>
          <input
            id="email"
            type="email"
            className="validate"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

              <label htmlFor="email">Email</label>

          <input
           id="password"
           type="password"
           className="validate"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
          />
  <div className="password error red-text">{loginError}</div>
            <label htmlFor="password">Password</label>



            <button className="btn row" style={{ width: "100%" }}>
          Entrar
        </button>
        <div className="text-center pt-3">Or</div>
        <GoogleLoginButton
          buttonText="Login"
          className="mt-3 mb-3 "
          onClick={createGoogleAuthLink}
        />
        </form>
      </FormContainer>
    
    </>
  );
}

export default Login

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