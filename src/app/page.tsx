import axios from 'axios';

import List from '@/components/List';
import { GET_STAR_WARS } from '../constant';

export default async function Home() {
  let apiError, characters;

  try {
    const response = await axios.get(`${GET_STAR_WARS}`);
    characters = response.data;
  }
  catch (error) {
    apiError = error;
  }

  return (
    <>
      {!apiError ?
        <List characters={characters} />
        : 'Something went wrong...'
      }
    </>
  )
}
