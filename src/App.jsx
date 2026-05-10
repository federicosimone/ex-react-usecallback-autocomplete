import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [product, setProduct] = useState([])
  const [search, setSearch] = useState("")

  console.log("Ricerca", search)
  console.log("Prodotti trovati", product)

  const API_URL = "http://localhost:3333"

  useEffect(() => {
    fetch(`${API_URL}/products?search=${search}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(err => console.error(err))

  }, [search])



  return (
    <>
      <div>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

    </>
  )
}

export default App
