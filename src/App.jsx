import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState("")

  console.log("Ricerca", search)
  console.log("Prodotti trovati", filteredProducts)

  const API_URL = "http://localhost:3333"

  useEffect(() => {
    fetch(`${API_URL}/products?search=${search}`)
      .then(res => res.json())
      .then(data => {
        setFilteredProducts(data);
      })
      .catch(err => console.error(err))

  }, [search])

  const prodottiDaMostrare = search ? filteredProducts : [];


  return (
    <>
      <div>
        <h1>Cerca il prodotto che vuoi: </h1>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <p>Stai cercando: {search}</p>
        <div>
          <h2>Suggerimenti:</h2>
          <ul>
            {prodottiDaMostrare.map((product) => {
              return <li key={product.id}>{product.name}</li>
            })}
          </ul>
        </div>
      </div>

    </>
  )
}

export default App
