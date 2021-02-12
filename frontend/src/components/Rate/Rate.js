import React, { useState, useEffect } from 'react'
import {authFetch} from '../../services/authentication'

export function Rate() {
    const [user, setUser] = useState("")

    useEffect(() => {
        authFetch("/api/protected").then(response => {
          if (response.status === 401){
            setUser("")
            return null
          }
          return response.json()
        }).then(response => {
          if (response && response["message"]){
            setUser(response["message"])
          }
        })
      }, [])

    return(
        <div>
            Rating form in construction {user}!
        </div>
    );
}
