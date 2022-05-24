import { DEFAULT_HEADERS } from '../constants/restResources';
import Tile from '../model/Tile';

const emptyTiles: Tile[] = [];

async function getTiles(url: string) {
  let data = emptyTiles;
  let error = null;

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
    })
    .catch((err) => {
      data = emptyTiles;
      error = err.message;
    });

  return { data, error };
}

export default getTiles;
