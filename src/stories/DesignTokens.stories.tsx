import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

/* ────────────────────────────────────────────────────────────────────────────
   A live view of `globals.css`. Every value below is read from the document at
   render time rather than duplicated here, so the page can never drift from the
   stylesheet — and it re-reads when the theme toolbar flips, which is what makes
   the dark-theme contrast numbers real.
   ──────────────────────────────────────────────────────────────────────────── */

const readToken = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

/** Accepts the two forms a resolved custom property can come back as. */
const toRgb = (value: string | undefined): [number, number, number] | null => {
  if (!value) return null
  const hex = value.trim().replace('#', '')

  const normalised =
    hex.length === 3 || hex.length === 4
      ? hex.slice(0, 3).split('').map(channel => channel + channel).join('')
      : hex.slice(0, 6)

  if (/^[0-9a-f]{6}$/i.test(normalised)) {
    return [0, 2, 4].map(i => parseInt(normalised.slice(i, i + 2), 16)) as [number, number, number]
  }
  const match = value.match(/rgba?\(([^)]+)\)/)
  if (match) {
    const parts = match[1].split(/[\s,/]+/).map(Number)
    return [parts[0], parts[1], parts[2]]
  }
  return null
}

const relativeLuminance = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb.map(channel => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrastRatio = (
  foreground: string | undefined,
  background: string | undefined,
): number | null => {
  const fg = toRgb(foreground)
  const bg = toRgb(background)
  if (!fg || !bg) return null
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (light + 0.05) / (dark + 0.05)
}

/** Re-reads on every theme change so the table always describes what is on screen. */
const useTokens = (names: string[], themeKey: unknown) => {
  const namesKey = names.join(',')
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    const read = () => {
      const next: Record<string, string> = {}
      names.forEach(name => { next[name] = readToken(name) })
      setValues(prev => (names.every(name => prev[name] === next[name]) ? prev : next))
    }

    read()

    // The theme decorator swaps the class on <html>, and it can land after this
    // effect has already run — so watch the attribute rather than trust the
    // ordering, otherwise the dark theme would be documented with light values.
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeKey, namesKey])

  return values
}

/* ── Building blocks ──────────────────────────────────────────────────────── */

const Section = ({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 40 }}>
    <h2 className="text-heading-2" style={{ marginBottom: 4 }}>{title}</h2>
    {hint && <p className="text-body" style={{ marginBottom: 16, maxWidth: '68ch' }}>{hint}</p>}
    {children}
  </section>
)

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
    {children}
  </div>
)

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div className="surface" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
    <div style={{ height: 56, background: `var(${name})` }} />
    <div style={{ padding: '8px 10px' }}>
      <code style={{ fontSize: 12, color: 'var(--text-primary)', wordBreak: 'break-all' }}>{name}</code>
      <p className="text-caption" style={{ marginTop: 2 }}>{value || '—'}</p>
    </div>
  </div>
)

const ContrastBadge = ({ ratio, large = false }: { ratio: number | null; large?: boolean }) => {
  if (ratio === null) return <span className="text-caption">n/a</span>
  const threshold = large ? 3 : 4.5
  const passes = ratio >= threshold
  return (
    <span
      className="chip-base"
      style={{
        background: passes ? 'var(--tint-primary-bg)' : 'var(--tint-accent-bg)',
        color: passes ? 'var(--tint-primary-fg)' : 'var(--tint-accent-fg)',
      }}
    >
      {ratio.toFixed(2)}:1 {passes ? 'AA' : `< ${threshold}`}
    </span>
  )
}

/* ── Token groups ─────────────────────────────────────────────────────────── */

const PRIMITIVE_COLORS = [
  '--color-primary', '--color-primary-dark', '--color-primary-light',
  '--color-accent', '--color-accent-dark', '--color-accent-light',
  '--color-purple', '--color-purple-dark', '--color-purple-light',
  '--color-blue', '--color-blue-dark', '--color-blue-light',
]

const NEUTRALS = [
  '--color-neutral-50', '--color-neutral-100', '--color-neutral-200', '--color-neutral-300',
  '--color-neutral-400', '--color-neutral-450', '--color-neutral-500', '--color-neutral-600',
  '--color-neutral-700', '--color-neutral-800', '--color-neutral-900',
]

const SEMANTIC = [
  '--bg-base', '--bg-surface', '--bg-muted',
  '--text-primary', '--text-secondary', '--text-muted', '--text-on-solid',
  '--border', '--border-strong', '--focus-ring',
]

const TINTS = ['primary', 'accent', 'purple', 'blue'] as const

const TINT_TOKENS = TINTS.flatMap(tint => [
  `--tint-${tint}-bg`, `--tint-${tint}-fg`, `--tint-${tint}-solid`, `--tint-${tint}-strong`,
])

const RADII = ['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-2xl', '--radius-3xl']

const TYPE_CLASSES = [
  'text-display', 'text-heading-1', 'text-heading-2', 'text-heading-3',
  'text-body', 'text-caption', 'text-label',
]

const TEXT_TOKENS = ['--text-primary', '--text-secondary', '--text-muted']
const SURFACE_TOKENS = ['--bg-base', '--bg-surface', '--bg-muted']

interface ThemedProps {
  /** Only used to re-read the stylesheet when the theme toolbar changes. */
  theme: unknown
}

/* ── Views ────────────────────────────────────────────────────────────────── */

const PrimitivesView = ({ theme }: ThemedProps) => {
  const values = useTokens(PRIMITIVE_COLORS.concat(NEUTRALS), theme)
  return (
    <div style={{ padding: 24 }}>
      <Section
        title="Brand palette"
        hint="Four families. Each has a base, a darkened variant for text and solid fills, and a light tint for surfaces."
      >
        <Grid>
          {PRIMITIVE_COLORS.map(name => <Swatch key={name} name={name} value={values[name]} />)}
        </Grid>
      </Section>

      <Section
        title="Neutrals"
        hint="A warm grey ramp. Every semantic text and surface token points into this scale rather than carrying its own hex."
      >
        <Grid>
          {NEUTRALS.map(name => <Swatch key={name} name={name} value={values[name]} />)}
        </Grid>
      </Section>
    </div>
  )
}

const SemanticView = ({ theme }: ThemedProps) => {
  const values = useTokens(SEMANTIC, theme)
  return (
    <div style={{ padding: 24 }}>
      <Section
        title="Semantic tokens"
        hint="These names carry meaning, not colour. Switching the theme re-points them, so no component needs a theme-specific branch."
      >
        <Grid>
          {SEMANTIC.map(name => <Swatch key={name} name={name} value={values[name]} />)}
        </Grid>
      </Section>
    </div>
  )
}

const TintsView = ({ theme }: ThemedProps) => {
  const values = useTokens(TINT_TOKENS.concat(['--text-on-solid']), theme)

  return (
    <div style={{ padding: 24 }}>
      <Section
        title="Accent tints"
        hint="Each family exposes four roles. -fg is guaranteed readable on -bg, and --text-on-solid is guaranteed readable on -strong. The ratios below are measured from the live stylesheet, not asserted."
      >
        <div style={{ display: 'grid', gap: 12 }}>
          {TINTS.map(tint => (
            <div
              key={tint}
              className="surface"
              style={{ borderRadius: 'var(--radius-lg)', padding: 16, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
            >
              <code style={{ minWidth: 90, color: 'var(--text-primary)' }}>{tint}</code>

              <div
                style={{
                  background: `var(--tint-${tint}-bg)`,
                  color: `var(--tint-${tint}-fg)`,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                fg on bg
              </div>
              <ContrastBadge ratio={contrastRatio(values[`--tint-${tint}-fg`], values[`--tint-${tint}-bg`])} />

              <div
                style={{
                  background: `var(--tint-${tint}-strong)`,
                  color: 'var(--text-on-solid)',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                on strong
              </div>
              <ContrastBadge ratio={contrastRatio(values['--text-on-solid'], values[`--tint-${tint}-strong`])} />

              <div
                title="solid"
                style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)', background: `var(--tint-${tint}-solid)` }}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

const TextContrastView = ({ theme }: ThemedProps) => {
  const values = useTokens(TEXT_TOKENS.concat(SURFACE_TOKENS), theme)

  return (
    <div style={{ padding: 24 }}>
      <Section
        title="Text on surfaces"
        hint="WCAG 2.2 AA asks for 4.5:1 on body text and 3:1 on text at 18.66px bold / 24px regular. Each of these pairs appears at body size somewhere in the app, so all of them are held to 4.5:1."
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 520 }}>
            <thead>
              <tr>
                <th className="text-label" style={{ textAlign: 'left', padding: 10 }}>token</th>
                {SURFACE_TOKENS.map(surface => (
                  <th key={surface} className="text-label" style={{ textAlign: 'left', padding: 10 }}>{surface}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEXT_TOKENS.map(text => (
                <tr key={text} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: 10 }}>
                    <code style={{ color: 'var(--text-primary)' }}>{text}</code>
                  </td>
                  {SURFACE_TOKENS.map(surface => (
                    <td key={surface} style={{ padding: 10 }}>
                      <div
                        style={{
                          background: `var(${surface})`,
                          color: `var(${text})`,
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          marginBottom: 6,
                          fontSize: 14,
                        }}
                      >
                        Sample text
                      </div>
                      <ContrastBadge ratio={contrastRatio(values[text], values[surface])} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}

const RadiusView = ({ theme }: ThemedProps) => {
  const values = useTokens(RADII, theme)
  return (
    <div style={{ padding: 24 }}>
      <Section title="Radius" hint="A monotonic ladder: every step is strictly rounder than the one before it.">
        <Grid>
          {RADII.map(name => (
            <div key={name} className="surface" style={{ padding: 16, borderRadius: 'var(--radius-md)' }}>
              <div style={{ height: 64, background: 'var(--tint-primary-bg)', borderRadius: `var(${name})`, marginBottom: 8 }} />
              <code style={{ fontSize: 12, color: 'var(--text-primary)' }}>{name}</code>
              <p className="text-caption">{values[name]}</p>
            </div>
          ))}
        </Grid>
      </Section>

      <Section title="Elevation" hint="Shadows are re-tuned for the dark theme — the light values vanish against a dark surface.">
        <Grid>
          {['--shadow-sm', '--shadow-md', '--shadow-lg'].map(name => (
            <div
              key={name}
              style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: `var(${name})` }}
            >
              <code style={{ fontSize: 12, color: 'var(--text-primary)' }}>{name}</code>
            </div>
          ))}
        </Grid>
      </Section>
    </div>
  )
}

const TypographyView = () => (
  <div style={{ padding: 24 }}>
    <Section
      title="Type scale"
      hint="Composed classes from the components layer. Components use these instead of raw font-size utilities, so a scale change lands everywhere at once."
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {TYPE_CLASSES.map(name => (
          <div key={name} style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <code className="text-caption">.{name}</code>
            <p className={name}>Mia is a British Shorthair · Мія — британська короткошерста</p>
          </div>
        ))}
      </div>
    </Section>
  </div>
)

const FocusView = () => (
  <div style={{ padding: 24 }}>
    <Section
      title="Focus"
      hint="One rule in globals.css draws --focus-ring on :focus-visible for every interactive element. Tab through the controls below; the ring colour changes with the theme so it stays visible on both."
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" className="chip-primary" style={{ padding: '10px 18px' }}>Button</button>
        <a href="#focus-demo" className="chip-outline" style={{ padding: '10px 18px' }}>Link</a>
        <button type="button" className="card-base" style={{ padding: '10px 18px' }}>Card button</button>
      </div>
    </Section>
  </div>
)

/* ── Stories ──────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Design/Tokens',
  parameters: {
    layout: 'fullscreen',
    // This page deliberately renders colour pairs, so an axe run here would be
    // reporting on the documentation rather than on a component.
    a11y: { disable: true },
    docs: {
      description: {
        component:
          'The token system in three tiers: primitives (raw palette), semantic tokens (what ' +
          'components read), and the component classes built on top. Flip the theme in the ' +
          'toolbar — every value and ratio on this page is recomputed from the live stylesheet.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Tier 1: the raw palette. Components never reference these directly. */
export const Primitives: Story = {
  render: (_args, { globals }) => <PrimitivesView theme={globals.theme} />,
}

/** Tier 2: the only colour tokens components are allowed to read. */
export const SemanticColours: Story = {
  render: (_args, { globals }) => <SemanticView theme={globals.theme} />,
}

/** The four tint families, with their contrast contract verified live. */
export const AccentTints: Story = {
  render: (_args, { globals }) => <TintsView theme={globals.theme} />,
}

/** Every text token against every surface it is painted on. */
export const TextContrast: Story = {
  render: (_args, { globals }) => <TextContrastView theme={globals.theme} />,
}

export const Typography: Story = {
  render: () => <TypographyView />,
}

export const RadiusAndElevation: Story = {
  render: (_args, { globals }) => <RadiusView theme={globals.theme} />,
}

/** The focus indicator is a token too — one ring, every control. */
export const Focus: Story = {
  render: () => <FocusView />,
}
