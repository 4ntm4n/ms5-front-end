import React, { useEffect, useState } from 'react'

function Header() {
    const [data, setData] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('https://iamrestful.herokuapp.com/');
              const data = await response.json();
              console.log(data); // add this line
              setData(data);
            } catch (error) {
              console.log(error);
            }
          };
        fetchData()
    }, []);

  return (
    <div>
        { data && data.message ? (<h2>Response : {data.message}</h2>) : (<h2>LOADING...</h2>) }
    </div>
  )
}

export default Header