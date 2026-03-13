export function nullToUndefined<T>(value: T | null): T | undefined {
  return value ?? undefined;
}

export function getImageUrl(sprites: { front_default?: string | null; other?: { 'official-artwork'?: { front_default?: string | null } } } | undefined): string {
  return sprites?.other?.['official-artwork']?.front_default ?? sprites?.front_default ?? '';
}
