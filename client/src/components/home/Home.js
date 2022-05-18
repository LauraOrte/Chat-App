/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import io from "socket.io-client"
import { UserContext } from "../../UserContext"
import RoomList from "./RoomList"
import { API_BASE_URL } from "../../config"

let socket 

function Home() {
  const { user, setUser } = useContext(UserContext)
  const [room, setRoom] = useState("")
  const [rooms, setRooms] = useState([])

  const ENDPT = API_BASE_URL
  useEffect(() => {
    socket = io(ENDPT)

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.on("rooms-in-db", (roomsInDB) => {
      setRooms(roomsInDB)
    })
  })

  useEffect(() => {
    socket.on("room-created", (newRoom) => {
      setRooms([...rooms, newRoom])
    })
  }, [rooms])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("create-room", room)
    setRoom("")
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <div className="row">
        <p>¡Anímate a elegir una sala de chat o crea una nueva!</p>
        <div className="col s12 m6">
          <div className="card indigo lighten-1">
            <div className="card-content white-text">
              <span className="card-title">
                Bienvenidx {user ? user.name : ""}
              </span>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="room"
                      type="text"
                      required
                      className="validate"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                    <label htmlFor="room">Introduzca el nombre de una sala</label>
                  </div>
                </div>
                <button className="btn">Crear sala</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col s6 m5 offset-1">
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  )
}

export default Home
