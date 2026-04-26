export interface Note {
    question: string;
    answers: string[];
}

export const noteToString = (n: Note): string => {
    return `${n.question}\n${n.answers.join('\n')}`;
};

export const notes: Note[] = [
    {
        question: 'Should I absolutely follow this order?',
        answers: [
            'This table shows in which order you should follow the saga if you want to know "everything" about the overarching narrative (the quotation marks are here because the AC Universe is expanded by many transmedia releases).',
            "But, you don't necessarily have to start with Assassin's Creed 1. You can pick any game that starts a new narrative arc, i.e. Assassin's Creed 1, Black Flag, Origins and Shadows make perfect entry points to the saga - you will be a bit confused by some weird stuff going on if you choose to skip AC 1, but that won't hinder your discovery. But, excepting spin-offs, following the order of games within a narrative arc is mandatory though.",
        ],
    },
];
