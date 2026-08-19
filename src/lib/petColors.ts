/**
 * Colour assignment for pets.
 *
 * Every value is a semantic design token, never a raw hex, so the palette
 * follows the active theme. See the "Accent tints" block in `globals.css` for
 * what each role guarantees.
 */
export interface PetPalette {
  /** Full-strength brand colour: bars, borders, icons. */
  solid: string
  /** Subtle fill for cards and pills. */
  bg: string
  /** Text/icon colour on `bg` (>= 4.5:1). */
  fg: string
  /** Fill that carries `--text-on-solid` (>= 4.5:1). */
  strong: string
}

export const PET_PALETTES: PetPalette[] = [
  {
    solid: 'var(--tint-primary-solid)',
    bg: 'var(--tint-primary-bg)',
    fg: 'var(--tint-primary-fg)',
    strong: 'var(--tint-primary-strong)',
  },
  {
    solid: 'var(--tint-accent-solid)',
    bg: 'var(--tint-accent-bg)',
    fg: 'var(--tint-accent-fg)',
    strong: 'var(--tint-accent-strong)',
  },
  {
    solid: 'var(--tint-purple-solid)',
    bg: 'var(--tint-purple-bg)',
    fg: 'var(--tint-purple-fg)',
    strong: 'var(--tint-purple-strong)',
  },
  {
    solid: 'var(--tint-blue-solid)',
    bg: 'var(--tint-blue-bg)',
    fg: 'var(--tint-blue-fg)',
    strong: 'var(--tint-blue-strong)',
  },
]

/** Cycles through the palettes so any number of pets stays distinguishable. */
export const getPetPalette = (index: number): PetPalette =>
  PET_PALETTES[index % PET_PALETTES.length]
