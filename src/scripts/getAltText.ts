import { arcList } from './arcList';
import { noteList } from './noteList';

/**
 * Strips inline HTML and decodes common entities so notes (which contain
 * <span>, <br />, etc. for the rendered view) come out as plain prose
 * suitable for screen readers.
 *
 * Strikethrough content is dropped along with its text: the visual
 * edit-history humour (e.g. "listed ~~twice~~ three times") does not
 * translate to audio, and reading the struck-through word aloud changes
 * the meaning of the sentence.
 */
const stripHtml = (html: string): string =>
    html
        .replace(
            /<span\s+[^>]*class="[^"]*\bline-through\b[^"]*"[^>]*>[\s\S]*?<\/span>\s*/gi,
            '',
        )
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();

/**
 * Joins a list of strings in natural English:
 *   ['a']           -> 'a'
 *   ['a', 'b']      -> 'a and b'
 *   ['a', 'b', 'c'] -> 'a, b, and c'
 */
const joinList = (items: string[]): string => {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

export const getAltText = (): string => {
    const lines: string[] = [];

    lines.push(
        "In which order should I play the Assassin's Creed games? A comprehensive guide by alsagone.bsky.social.",
    );
    lines.push('');

    for (const arc of arcList) {
        // One sentence per arc reads as continuous speech instead of a
        // header / list pair, and the trailing period gives screen readers
        // a clear sentence-end pause before the next arc.
        const games = joinList(arc.games.map((g) => g.name));
        lines.push(`${arc.name}: ${games}.`);
        lines.push('');
    }

    lines.push('Notes');
    lines.push('');

    for (const note of noteList) {
        lines.push(stripHtml(note.question));
        lines.push('');
        lines.push(note.answers.map(stripHtml).join('\n'));
        lines.push('');
    }

    // Drop the https:// prefix so screen readers don't spell out the
    // protocol ("h t t p s colon slash slash") before the actual link.
    lines.push('Link to the lore guide at tiny.cc/GuideAC.');

    return lines.join('\n');
};
