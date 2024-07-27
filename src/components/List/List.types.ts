import { CharacterResponse } from "@/types/api";

export type ListProps = {
    characters: {
        results: CharacterResponse[];
    }
}