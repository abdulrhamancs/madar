const ARABIC = /[؀-ۿݐ-ݿ]/;

/**
 * Avatar initials for a display name.
 *
 * Latin names get the usual two letters ("Sara Alotaibi" -> "SA"). Arabic
 * names get exactly one, because Arabic is a joining script: concatenating
 * the first letters of two words produces a shaped ligature that reads as a
 * mangled word rather than as initials — "مهند العتيبي" would render "مه",
 * which looks like the start of a real word. A single letter is always drawn
 * in its isolated form, which is what an initial should look like.
 */
export function initialsOf(name: string | undefined | null): string {
  const trimmed = (name || "").trim();
  if (!trimmed) return "";

  if (ARABIC.test(trimmed)) return Array.from(trimmed)[0];

  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => Array.from(part)[0] || "")
    .join("")
    .toUpperCase();
}
