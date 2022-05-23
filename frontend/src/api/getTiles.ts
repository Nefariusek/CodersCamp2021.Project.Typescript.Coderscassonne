// import { useEffect, useState } from 'react';
import { DEFAULT_HEADERS } from '../constants/restResources';
import Tile from '../model/Tile';

const defaultURL = `https://jsonplaceholder.typicode.com/users?_limit=5`;
const emptyTiles: Tile[] = [];

async function getTiles(url = defaultURL) {
  // const [data, setData] = useState(emptyTiles);
  // const [error, setError] = useState(null);
  let data = emptyTiles;
  let error = null;

  console.log(url);

  // useEffect(() => {
  await fetch(url, {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error status: ${res.status}`);
      }
      return res.json();
    })
    .then((jsonData) => {
      data = jsonData;
      error = null;
      // setData(jsonData);
      // setError(null);
    })
    .catch((err) => {
      data = emptyTiles;
      error = err.message;
      // setError(err.message);
      // setData(emptyTiles);
    });

  // }, [url]);

  console.log('DATA Z WNĘTRZA GETA: ', data);

  return { data, error };
}

export default getTiles;
