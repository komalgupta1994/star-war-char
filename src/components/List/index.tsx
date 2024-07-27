import Link from 'next/link';

import { CharacterResponse } from '@/types/api';
import styles from './List.module.css';
import { ListProps } from './List.types';

export default function List(props: ListProps) {
    const {characters} = props;
    
    return (
        <div className={styles.container}>
          <h1 className={styles.title}>Star Wars Characters</h1>
          <table className={styles.characterTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Home Planet</th>
              </tr>
            </thead>
            <tbody>
              {(characters?.results || []).map((character: CharacterResponse, index: number) => (
                <tr key={index}>
                  <td>
                    <Link className={styles.characterLink} key={character.name} href={`/people/${character.url.split('/')[5]}`}>{character.name}</Link>
                  </td>
                  <td>{character.gender}</td>
                  <td>{character.homeworld}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}