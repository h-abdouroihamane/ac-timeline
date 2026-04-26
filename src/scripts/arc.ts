import { type Game } from './game';

export interface Arc {
    name: string;
    games: Game[];
}

export const arcToString = (a: Arc): string => {
    return `${a.name}: ${a.games.join(', ')}`;
};
