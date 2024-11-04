import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { HighlightSubject } from '@mikro-orm/sql-highlighter/enums';
import c from 'ansi-colors';

const ansi = (text: string, color: string) => `${color}${text}\x1b[0m`;
const ansiOrange = (text: string) => ansi(text, '\x1b[38;5;214m');

export const customSqlHighlighter = new SqlHighlighter({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  [HighlightSubject.QUOTE]: ansiOrange,
  [HighlightSubject.RESERVED]: c.green.bold,
  [HighlightSubject.BOUNDARY]: ansiOrange,
  [HighlightSubject.NUMBER]: c.cyan,
});
