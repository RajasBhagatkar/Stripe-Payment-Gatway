import React from 'react'

const Home = () => {
  const [formData, setformData] = useState({
    name: "",
    password: ""
  })
  const onchange = (e) => {
    setformData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <div>
      <form>
        <input type="name" name="name" value={formData.name} onChange={onchange} />
        <input type="password" name="password" value={formData.password} onChange={onchange} />
      </form>
    </div>
  )
}

export default Home
