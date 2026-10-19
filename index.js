import perler from './palettes/perler.js';
import perlerLegacy from './palettes/perler-legacy.js';
import perler103 from './palettes/perler-103.js';
import hama from './palettes/hama.js';
import hamaSolid from './palettes/hama-solid.js';
import artkalM from './palettes/artkal-m.js';
import artkalS from './palettes/artkal-s.js';
import nabbi from './palettes/nabbi.js';
import mard from './palettes/mard.js';
import mard185 from './palettes/mard-185.js';
import mard291 from './palettes/mard-291.js';

export const palettes = Object.freeze({
  perler, 'perler-legacy': perlerLegacy, 'perler-103': perler103,
  hama, 'hama-solid': hamaSolid, 'artkal-m': artkalM, 'artkal-s': artkalS,
  nabbi, mard, 'mard-185': mard185, 'mard-291': mard291,
});

export function getPalette(id) {
  return Object.hasOwn(palettes, id) ? palettes[id] : undefined;
}

export function getColor(paletteId, code) {
  const palette = getPalette(paletteId);
  if (!palette || typeof code !== 'string') return undefined;
  const normalized = code.trim().toUpperCase();
  return palette.colors.find(color => color.code.toUpperCase() === normalized);
}

function parseHex(hex) {
  if (typeof hex !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(hex)) {
    throw new TypeError('color must be a six-digit HEX value such as #E8A0B0');
  }
  return [1, 3, 5].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16));
}

/** Fast RGB screen-reference matching; not a physical or perceptual color guarantee. */
export function nearestColors(hex, paletteId, options = {}) {
  const palette = getPalette(paletteId);
  if (!palette) throw new RangeError(`Unknown palette: ${paletteId}`);
  const [r, g, b] = parseHex(hex);
  const { limit = 5, includeEffects = false } = options;
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError('limit must be a positive integer');
  return palette.colors
    .filter(color => color.rgb && (includeEffects || color.finish === 'solid'))
    .map(color => ({
      ...color,
      distance: Math.sqrt((color.rgb.r - r) ** 2 + (color.rgb.g - g) ** 2 + (color.rgb.b - b) ** 2),
    }))
    .sort((a, b) => a.distance - b.distance || a.code.localeCompare(b.code))
    .slice(0, limit);
}
