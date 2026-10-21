# CHIPFORGE

A chiptune workstation that runs in your browser. One command, no install, no dependencies:

```
npx chipforge            # once published to npm
npx .                    # from a clone of this repo
node cli.js --port 9000 --no-open
```

The launcher serves a single HTML page on `localhost` and opens it. Everything else (synthesis, sequencing, rendering) happens in the page with the Web Audio API.

## Repository layout

| Path | What it is |
| --- | --- |
| `app.html` | The whole studio: markup, styles, audio engine and UI in one file |
| `cli.js` | Zero-dependency launcher for `npx` |
| `site/` | Landing page and its screenshot |
| `build.js` | Builds the website into `dist/` (landing page at `/`, studio at `/studio/`) |
| `netlify.toml` | Netlify build settings (`node build.js`, publish `dist`) |

## What's inside

**Channels modeled on 8-bit sound chips**
- **Pulse**: 12.5 / 25 / 50 / 75% duty cycles, built from band-limited Fourier tables.
- **Triangle**: the 32-step, 4-bit stepped triangle.
- **Wave**: draw your own 32-sample, 4-bit wavetable, or load saw, sine, square, organ, triangle or buzz shapes.
- **Noise**: a real 15-bit LFSR, in long (white) or short (93-step metallic) mode. Note pitch sets the noise clock.
- **Retro drums**: kick, snare, clap, closed and open hats, two toms and crash, all synthesized from the same pulse, triangle and LFSR sources. The kit has tune, decay and crunch (bitcrush) controls.

**Instrument controls**: ADSR with optional 4-bit, 60 Hz stepped volume. Also mono/poly, glide, pitch sweep, delayed vibrato, a chord arpeggiator (octave, fifth, major, minor, sevenths and more, up to 60 Hz), transpose, per-channel bitcrusher and echo send. Every channel type ships with presets.

**Editing**
- Piano roll with ghost notes from the other channels, drag-to-resize and drag-to-move.
- Key and scale overlay (ten scales) with optional snap-to-scale, so every note you draw is in key.
- Velocity lane under the roll, plus a Humanize button.
- Generators: Euclidean rhythms for any drum row, and a melody generator that respects your key, scale and density.
- Drum step grid with accents and drag painting.
- Patterns of 16, 32 or 64 steps, up to 16 patterns (A–P), and a drag-to-reorder song chain.
- Copy/paste, transpose, rotate, and unlimited undo/redo.
- Play from the computer keyboard (`Z`–`M`, `Q`–`U`, `[` `]` for octave) or a Web MIDI keyboard.
- Record live while the song plays, or step-enter notes while stopped.

**Mixing and output**
- Per-channel volume, pan, mute, solo and meters.
- Master tone filter, tempo-synced echo, a compressor and an oscilloscope.
- Swing and a metronome.
- Projects autosave in the browser. Save and open them as `.json`.
- **Export WAV** renders the whole song chain offline at 44.1 kHz/16-bit.
- **Stems** renders each channel to its own WAV and zips them.
- **Share** copies a link with the whole song packed into the URL.

A demo song, *Neon Cavern*, loads on first run. Press <kbd>Space</kbd>.

## License

CC0-1.0 (public domain).
