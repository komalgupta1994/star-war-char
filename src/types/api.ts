export type CharacterResponse = {
    name: string;
    url: string;
    gender: string;
    homeworld: string;
}

export type CharacterItemResponse = CharacterResponse & {
    hair_color: string;
    eye_color: string;
    height: string;
    films: string[];
}

export type FilmResponse = {
    title: string;
    url: string;
}