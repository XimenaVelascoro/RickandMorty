import { useEffect, useState } from "react"
import Character from "./Character";

function NavPage(props) {
  return (
    <div className="d-flex justify-content-between
    align-items-center">
      <p>Page:{props.page} </p>
      <button onClick={() => props.setPage(props.page + 1)}>
        Page {props.page + 1}
      </button>
    </div>
  )
}

function CharacterList() {

  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {//funcion predeterminada
    async function fetchData() {
      const response = await fetch(` https://rickandmortyapi.com/api/character?page=${page}` );
      //usar la info que proporciona la api 
      const data = await response.json();//almacena la info de la api 
      setCharacters(data.results);
    }
    fetchData()

  }, [page])//nos ayuda a llamar la api 
  //return nos deja visualizar a nosotros
  //map es recorrer algo o mapear dentro de ...
  return (

    <div className="row">
      <NavPage page={page} setPage={setPage} />

      {characters.map((character) => {
        return (
          <div className="col-md-4" key={character.id}>
            <Character character={character} />
          </div>
        );
      })}
    </div>
  )
}

export default CharacterList