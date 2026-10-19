import test from 'node:test';
import assert from 'node:assert/strict';
import { palettes, allColors, primaryPaletteIds, getColor, getPalette, nearestColors, matchColorAcrossPalettes } from '../index.js';
import artkalM from '../palettes/artkal-m.js';

const expected = { perler:118, 'perler-legacy':8, 'perler-103':103, hama:92, 'hama-solid':63, 'artkal-m':221, 'artkal-s':199, nabbi:30, mard:221, 'mard-185':185, 'mard-291':291 };

test('palette counts, unique codes and RGB/HEX agreement', () => {
  for (const [id, count] of Object.entries(expected)) {
    const palette = getPalette(id);
    assert.equal(palette.colors.length, count, id);
    assert.equal(new Set(palette.colors.map(c => c.code)).size, count, id);
    for (const color of palette.colors) {
      if (!color.rgb) { assert.equal(color.hex, null); continue; }
      const hex = `#${[color.rgb.r,color.rgb.g,color.rgb.b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase()}`;
      assert.equal(color.hex, hex, `${id}/${color.code}`);
    }
  }
  assert.equal(Object.keys(palettes).length, Object.keys(expected).length);
});

test('lookup, transparent color and nearest color behavior', () => {
  assert.equal(getColor('perler', ' per17647 ').name, 'Amber');
  assert.equal(getColor('artkal-m', 'mh1').hex, null);
  assert.equal(artkalM.colors.length, 221);
  assert.equal(getColor('perler', 'missing'), undefined);
  assert.equal(getPalette('missing'), undefined);
  assert.equal(nearestColors('#D06134', 'perler', {limit:1})[0].code, 'PER17647');
  assert.throws(() => nearestColors('red', 'perler'), TypeError);
  assert.throws(() => nearestColors('#FFFFFF', 'missing'), RangeError);
});

test('bulk exports and cross-palette matching', () => {
  assert.equal(allColors.length, Object.values(expected).reduce((sum, count) => sum + count, 0));
  assert.equal(allColors.filter(color => color.paletteId === 'perler').length, 118);
  assert.equal(primaryPaletteIds.length, 6);
  const matches = matchColorAcrossPalettes('#D06134');
  assert.equal(matches.length, 6);
  assert.equal(matches.find(match => match.paletteId === 'perler').code, 'PER17647');
  assert.equal(matches.find(match => match.paletteId === 'perler').distance, 0);
  const selected = matchColorAcrossPalettes({ paletteId: 'perler', code: 'PER17647' }, { paletteIds: ['hama', 'artkal-m', 'hama'] });
  assert.deepEqual(selected.map(match => match.paletteId), ['hama', 'artkal-m']);
  assert.throws(() => matchColorAcrossPalettes({ paletteId: 'artkal-m', code: 'MH1' }), RangeError);
  assert.throws(() => matchColorAcrossPalettes('#FFFFFF', { paletteIds: ['missing'] }), RangeError);
});
