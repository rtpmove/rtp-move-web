export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(##|###)\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    const id = slugifyHeading(text);
    items.push({ id, text, level });
  }

  return items;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
