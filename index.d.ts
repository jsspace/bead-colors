export type PaletteId = 'perler' | 'perler-legacy' | 'perler-103' | 'hama' | 'hama-solid' | 'artkal-m' | 'artkal-s' | 'nabbi' | 'mard' | 'mard-185' | 'mard-291';
export type Rgb = Readonly<{ r: number; g: number; b: number }>;
export type BeadColor = Readonly<{ code: string; name: string; hex: string | null; rgb: Rgb | null; finish: 'solid' | 'effect' | 'transparent' }>;
export type BeadPalette = Readonly<{ id: PaletteId; brand: string; series: string; beadSizeMm: number; source: readonly string[]; notes: string; colors: readonly BeadColor[] }>;
export declare const palettes: Readonly<Record<PaletteId, BeadPalette>>;
export declare function getPalette(id: string): BeadPalette | undefined;
export declare function getColor(paletteId: string, code: string): BeadColor | undefined;
export declare function nearestColors(hex: string, paletteId: string, options?: { limit?: number; includeEffects?: boolean }): Array<BeadColor & { distance: number }>;
