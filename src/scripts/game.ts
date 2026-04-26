export interface Game {
    name: string;
    picture: string;
}

export const getPicture = (g: Game) => `/games/${g.picture}.jpg`;
