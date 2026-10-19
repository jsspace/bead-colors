# Meltbead Bead Colors

Perler, Hama, Artkal, MARD and Nabbi fuse bead color codes with approximate HEX and RGB screen references. Maintained by [Meltbead](https://meltbead.com/colors), where you can browse the color charts and make bead patterns.

## Install

```sh
npm install @meltbead/bead-colors
```

## Use

```js
import { getColor, getPalette, nearestColors } from '@meltbead/bead-colors';

getColor('perler', 'PER17647'); // Amber, #D06134
getPalette('artkal-m').colors.length; // 221, including transparent MH1
nearestColors('#E8A0B0', 'hama', { limit: 3 });
```

Import one palette without loading the root catalog:

```js
import perler from '@meltbead/bead-colors/perler';
// Or: import { palette } from '@meltbead/bead-colors/perler';
console.log(perler.colors[0]);
```

Each palette has `id`, `brand`, `series`, `beadSizeMm`, `source`, `notes`, and `colors`. Each color has `code`, `name`, `hex`, `rgb`, and `finish`. Colors without a meaningful single RGB value use `hex: null` and `rgb: null` (Artkal MH1). `getColor` is case-insensitive and returns `undefined` when a code is absent. `nearestColors` uses simple RGB screen distance, skips effect colors by default, and returns matches with a `distance` field. It is a quick reference, not a calibrated color match.

## Palettes

| ID | Entries | Notes |
| --- | ---: | --- |
| `perler` | 118 | Current single-color catalog reference |
| `perler-legacy` | 8 | Older codes kept separate |
| `perler-103` | 103 | Historical community reference |
| `hama` | 92 | Full reference, including effect finishes |
| `hama-solid` | 63 | Opaque colors for automatic matching |
| `artkal-m` | 221 | 220 manufacturer RGB entries plus transparent MH1 |
| `artkal-s` | 199 | Community reference |
| `nabbi` | 30 | Community reference |
| `mard` | 221 | Classic range |
| `mard-185` | 185 | Subset of classic range |
| `mard-291` | 291 | Classic range plus 70 special-effect approximations |

Use the printed product code when purchasing. Screens, lighting, bead batches, and fusing affect appearance. An effect or transparent bead cannot be represented faithfully by a single HEX value.

## Sources and licensing

Each palette contains source links. The community RGB references include data from [maxcleme/beadcolors](https://github.com/maxcleme/beadcolors) under MIT; the required notice is included in `LICENSES/beadcolors-MIT.txt`. Artkal M RGB values follow the manufacturer's [2025 chart](https://cdn.shopify.com/s/files/1/1323/8195/files/M_MINI_Beads_RGB_Color_Chart_2025.pdf?v=1760661747). Perler current codes and names were checked against its catalog; 23 newer screen colors were sampled from product photos. See [third-party notices](./THIRD_PARTY_NOTICES.md).

Perler, Hama, Artkal, MARD and Nabbi are trademarks of their respective owners. This independent reference is not affiliated with or endorsed by them.
