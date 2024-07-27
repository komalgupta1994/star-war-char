'use client';

import { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";

import { GET_STAR_WARS } from "@/constant";
import { CharacterItemResponse, FilmResponse } from "@/types/api";
import { ListItemProp } from "./ListItem.types";
import styles from './ListItem.module.css';

export default function ListItem(props: ListItemProp) {
    const { id } = props;

    const [character, setCharacter] = useState<CharacterItemResponse>();
    const [films, setFilms] = useState<FilmResponse[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [formState, setFormState] = useState({ height: '', gender: '' });

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            if (id) {
                const response = await axios.get(`${GET_STAR_WARS}/${id}`);
                const filmResponses = await Promise.all(response.data.films.map((url: string) => axios.get(url)));
                const filmsData = filmResponses.map(res => {
                    const data = res.data;
                    return {
                        title: data.title,
                        url: data.url
                    }
                })
                setCharacter(response.data);
                setFilms(filmsData);
            }
        };
        fetchCharacterDetails();
    }, [id]);

    if (!character) {
        return <div>Loading...</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (character) {
            setCharacter({ ...character, ...formState });
            setIsEdit(false);
            setFormState({ height: '', gender: '' });
        }
    };

    return (
        <>
            <Link type="button" className={styles.back} href='/'>Back to Home Page</Link>
            {
                isEdit ?
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="height">Height:</label>
                            <input className={styles.edit} type="text" name="height" id="height" value={formState.height} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="gender">Gender:</label>
                            <select className={styles.edit} name="gender" id="gender" value={formState.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="n/a">N/A</option>
                            </select>
                        </div>
                        <div className={styles.buttons}>
                        <button className={styles.save} type="submit">Save</button>
                        <button type="button" onClick={() => setIsEdit(false)}>Cancel</button>
                        </div>
                    </form>
                    : null
            }
            <div className={styles.container}>
                <h1 className={styles.title}>{character.name}</h1>
                <p><strong>Hair Color:</strong> {character.hair_color}</p>
                <p><strong>Eye Color:</strong> {character.eye_color}</p>
                <p><strong>Homeworld:</strong> {character.homeworld}</p>
                <p><strong>Height:</strong> {character.height}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <h2>Films</h2>
                <ul className={styles.films}>
                    {films.map((film, index) => (
                        <li className={styles.filmList} key={index}>{`${film.title} - ${film.url}`}</li>
                    ))}
                </ul>
                <button className={styles.editButton} onClick={() => setIsEdit(true)}>Edit</button>
            </div>
        </>

    )
}