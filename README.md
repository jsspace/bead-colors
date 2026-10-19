# Meltbead Bead Colors

Perler, Hama, Artkal, MARD and Nabbi fuse bead color codes with approximate HEX and RGB screen references. Maintained by [Meltbead](https://meltbead.com/colors), where you can browse the color charts and make bead patterns.

## Install

```sh
npm install @meltbead/bead-colors
```

## Use

Get the complete data when building a pattern maker or color picker:

```js
import { palettes, allColors, getPalette } from '@meltbead/bead-colors';

const perlerColors = palettes.perler.colors; // all 118 current Perler colors
const artkalColors = getPalette('artkal-m').colors; // all 221 Artkal M codes
console.log(allColors.length); // every entry from every published palette
```

`allColors` is a flat array. Every item includes `paletteId`, `brand`, `series`, `code`, `name`, `hex`, `rgb`, and `finish`. It includes deliberate duplicates from subset palettes such as `hama-solid` and `mard-185`; use `palettes` or `getPalette` when you need one specific range.

Find one input color's closest code in each main palette:

```js
import { matchColorAcrossPalettes } from '@meltbead/bead-colors';

const matches = matchColorAcrossPalettes('#E8A0B0');
// [{ paletteId: 'perler', code: '...', hex: '...', distance: ... }, ...]

const fromPerler = matchColorAcrossPalettes(
  { paletteId: 'perler', code: 'PER17647' },
  { paletteIds: ['hama', 'artkal-m', 'mard'] },
);
```

The default set is `perler`, `hama`, `artkal-m`, `artkal-s`, `nabbi`, and `mard`. Pass `paletteIds` to include another range or choose a subset. Matches use simple RGB screen distance and are approximate; use the printed code and a physical bead when choosing materials. Transparent colors without one RGB value cannot be used as matching input.

For a single code or several candidates within one palette, use `getColor(paletteId, code)` and `nearestColors(hex, paletteId, { limit: 3 })`. `getColor` is case-insensitive and returns `undefined` when the code is absent. `nearestColors` skips effect colors by default.

Import one palette without loading the full catalog:

```js
import perler from '@meltbead/bead-colors/perler';
console.log(perler.colors);
```

Each palette has `id`, `brand`, `series`, `beadSizeMm`, `source`, `notes`, and `colors`. Colors without a meaningful single RGB value use `hex: null` and `rgb: null` (Artkal MH1).

## Palettes

| ID | Entries | Notes |
| --- | ---: | --- |
| [`perler`](https://meltbead.com/colors/perler) | 118 | Current single-color catalog reference |
| [`perler-legacy`](https://meltbead.com/colors/perler#legacy-colors-heading) | 8 | Older codes kept separate |
| `perler-103` | 103 | Historical community reference |
| [`hama`](https://meltbead.com/colors/hama) | 92 | Full reference, including effect finishes |
| `hama-solid` | 63 | Opaque colors for automatic matching |
| [`artkal-m`](https://meltbead.com/colors/artkal) | 221 | 220 manufacturer RGB entries plus transparent MH1 |
| `artkal-s` | 199 | Community reference |
| `nabbi` | 30 | Community reference |
| [`mard`](https://meltbead.com/colors/mard) | 221 | Classic range |
| `mard-185` | 185 | Subset of classic range |
| [`mard-291`](https://meltbead.com/colors/mard) | 291 | Classic range plus 70 special-effect approximations |

Use the printed product code when purchasing. Screens, lighting, bead batches, and fusing affect appearance. An effect or transparent bead cannot be represented faithfully by a single HEX value.

## Sources and licensing

Each palette contains source links. The community RGB references include data from [maxcleme/beadcolors](https://github.com/maxcleme/beadcolors) under MIT; the required notice is included in `LICENSES/beadcolors-MIT.txt`. Artkal M RGB values follow the manufacturer's [2025 chart](https://cdn.shopify.com/s/files/1/1323/8195/files/M_MINI_Beads_RGB_Color_Chart_2025.pdf?v=1760661747). Perler current codes and names were checked against its catalog; 23 newer screen colors were sampled from product photos. See [third-party notices](./THIRD_PARTY_NOTICES.md).

Perler, Hama, Artkal, MARD and Nabbi are trademarks of their respective owners. This independent reference is not affiliated with or endorsed by them.
