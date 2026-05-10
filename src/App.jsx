import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState("")




  const API_URL = "http://localhost:3333"


  function debounce(callback, delay) {
    let timer
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  };



  const eseguiFetch = (search) => {
    return (fetch(`${API_URL}/products?search=${search}`)
      .then(res => res.json())
      .then(data => {
        setFilteredProducts(data);
        console.log("Chiamata")
      })
      .catch(err => console.error(err)))
  }

  const eseguiFetchDebounced = useCallback(
    debounce(eseguiFetch, 500)
    , []);

  useEffect(() => {
    eseguiFetchDebounced(search)

  }, [search])

  //console.log("Prodotti trovati", filteredProducts)

  const prodottiDaMostrare = search ? filteredProducts : [];


  return (
    <>
      <div>
        <h1>Cerca il prodotto che vuoi: </h1>
        <input type="text" placeholder='Cerca qui...' value={search} onChange={e => setSearch(e.target.value)} />
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
