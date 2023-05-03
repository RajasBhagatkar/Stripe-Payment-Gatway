import React, { useState } from "react"


export default () => {
  const [user_agent_string, setUser_agent_string] = useState([]);

  const getUserAgentString = (e) => {
    fetch('http://localhost:3000/user-agent-string').then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then(json => Promise.reject(json))
    }).then(data => {
      // setUser_agent_string(data.UAString)
      setUser_agent_string(prevData => (
        [...prevData,
        `UAString: ${data.UAString} IP: ${data.ip}`
        ]
      ))
      console.log(data)
    }).catch(error => {
      console.log(error.error)
    })

  }



  const handleCheckout = (e) => {

    fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // all the items that we want
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 }
        ],
        // userId: '642beb6ab644c8dc5c079312' // with random mail
        userId: '642d8b90b3b8b1a4d64b26c5' // with real mail user

      })
    })
      .then((res) => {
        //* if successful then return parse json and return
        if (res.ok) {
          return res.json();
        }

        //! if error then convert message into json and reject
        //! making reject explicit bcz fetch doesn't actually faile on it's own
        return res
          .json()
          .then((json) => Promise.reject(json));
      })
      // .then(res => {
      //   console.log(res)
      // })
      .then(({ url }) => {
        // send to the user
        window.location = url;
        // console.log(url);

      })
      .catch((error) => {
        console.error(error.error);
      });


  }
  return (
    <>
      <h1>Welcome to React Vite Micro App!</h1>
      <p>Hard to get more minimal than this React app.</p>
      <button onClick={handleCheckout}>Checkout</button>
      <button onClick={getUserAgentString}>get user agent String</button>
      { /*<p>{user_agent_string && user_agent_string}</p> */}
      <ul>
        {
          user_agent_string.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
    </>
  )
}
