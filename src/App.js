import React, { useState, useEffect } from 'react';
function App() {

  const [repositories, setRepositories] = useState([
    
  ]);

  // function handleAddRepository(){
  //   setRepositories([...repositories, {
  //     id: Math.random(), name: 'TESTE'
  //   }])
  // }

  useEffect(async () =>{
    const response = await fetch('https://api.github.com/users/diego3g/repos');
    const data = await response.json();
    setRepositories(data);

  }, [])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem  ${filtered.length} favoritos.`
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    })
  
    setRepositories(newRepositories);
  }

  return (
    
      <div className="App">
        <ul>
          { repositories.map(repo => (
            <li key={repo.id}>
              <span>{repo.name}</span>
              {repo.favorite && <span>(Favorito)</span>}
               <button onClick={() => handleFavorite(repo.id)} >FAVORITAR</button>
            </li>
          ))}
        </ul>
      </div>
    
  );
}

export default App;
