// Member ids, used as `author:` and as keys under `time:` in post frontmatter.
// Kept separate from team.ts so the content config can import it without pulling in photos.
export const memberIds = ['elitsa', 'miriam', 'ruben'] as const;
export type MemberId = (typeof memberIds)[number];
