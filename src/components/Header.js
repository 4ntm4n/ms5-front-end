import React, { useEffect, useState } from '../../syssla/node_modules/@types/react'

function Header() {

    const [data, setData] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('https://iamrestful.herokuapp.com/')
                const data = await response.json()
                setData(data)
            }catch(error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

  return (
    <div>
        <h1>Hello World!</h1>
        <h2>API RESPONSE: {data.message}</h2>
    </div>
  )
}

export default Header