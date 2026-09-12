---
name: Prompt Field Skill Workbench
description: A task-first AI skill directory for finding, reading, and copying original SKILL.md files.
colors:
  ink: "#1d2928"
  paper: "#f1f4f2"
  surface: "#fffefa"
  surface-muted: "#e9eeeb"
  line: "#d4ddd8"
  line-strong: "#aebdb7"
  primary: "#126a62"
  primary-dark: "#0b4f49"
  primary-soft: "#dcebe6"
  signal: "#c96643"
typography:
  display:
    fontFamily: "Segoe UI, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(42px, 6vw, 82px)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.065em"
  title:
    fontFamily: "Segoe UI, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(32px, 4.1vw, 56px)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Segoe UI, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.1em"
rounded:
  sm: "0px"
  md: "14px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "45px"
  xl: "88px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "9px 12px"
    height: "42px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "9px 12px"
    height: "42px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "22px 23px 20px"
  search-field:
    backgroundColor: "#273735"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "12px 12px 12px 14px"
    height: "48px"
---

# Design System: Prompt Field Skill Workbench

## Overview

**Creative North Star: "The Skill Workbench"**

Prompt Field is a practical workbench, not a poster wall. Users arrive with a task, identify the right tool, inspect its requirements, and take the complete source with them. The interface gives hierarchy to searchable controls, source metadata, input requirements, and one decisive copy action.

The page uses a warm paper ground, dark ink, and one restrained teal action color. Mono labels create a compact index; familiar sans text keeps the tool readable. Existing examples remain evidence for visual skills, while engineering skills receive equal visual weight through a quiet file-oriented treatment.

**Key Characteristics:**
- Search and filters are visible before the catalog.
- Source provenance is explicit.
- Copying the original SKILL.md is the primary action.
- Responsive density changes structure, not just font size.
- Loading, error, focus, and empty states are recoverable.

## Colors

Warm paper and dark ink establish trust. Teal identifies actions and selection; terracotta is reserved for the brand signal and attention moments.

### Primary
- **Workbench Teal** (#126a62): Primary buttons, selected filters, actionable links, and ready status.
- **Deep Teal** (#0b4f49): Hover and high-contrast action state.

### Neutral
- **Pale Mist** (#f1f4f2): Page and dialog surface.
- **Clean Surface** (#fffefa): Cards, source panel, and controls.
- **Muted Surface** (#e9eeeb): Secondary panels and file-oriented image placeholders.
- **Dark Ink** (#1d2928): Text and search console.
- **Soft Line** (#d4ddd8): Card and control boundaries.
- **Strong Line** (#aebdb7): Section rules.
- **Signal Terracotta** (#c96643): Brand mark and dismiss hover.

**The One Action Color Rule.** Teal identifies something the user can act on or has selected; it is not decoration.

## Typography

**Display Font:** Segoe UI with PingFang SC / Microsoft YaHei fallbacks  
**Body Font:** Segoe UI with PingFang SC / Microsoft YaHei fallbacks  
**Label/Mono Font:** SFMono-Regular, Consolas, Liberation Mono

**Character:** One familiar sans family keeps the tool operational. Mono labels provide technical wayfinding without turning the page into a terminal.

### Hierarchy
- **Display** (650, clamp(42px, 6vw, 82px), 1.05): Task statement in the first viewport.
- **Title** (650, clamp(32px, 4.1vw, 56px), 1.08): Section and dialog headings.
- **Body** (400, 14–16px, 1.7–1.8): Descriptions and instructions, kept to readable measures.
- **Label** (700, 10px, 0.1em tracking): Counts, source metadata, and wayfinding.

## Layout

A centered 1440px maximum canvas uses a two-column first viewport: task statement left, quick-search console right. The catalog uses a two-column card grid with a filter row above it. Cards collapse to one column below 640px. Secondary navigation hides on compact screens while the repository action remains available. Dialog content becomes a stacked reading surface on mobile.

## Elevation & Depth

Depth is tonal and structural. Cards have a thin border at rest and a soft tinted hover shadow. The dark search console has one diffuse shadow. No gradients or decorative blur are used.

**The Flat-at-Rest Rule.** Surfaces stay quiet until hover, focus, selection, loading, or error needs to communicate a state.

## Shapes

Cards and the search console use a restrained 14px radius. Inner controls are square for precise actions; the close control is circular as a conventional dismiss action. Source text remains in a native textarea for selection and copying.

## Components

### Buttons
- **Shape:** Square, compact controls with a 42px minimum height.
- **Primary:** Teal fill and white text for copying the original SKILL.md.
- **Secondary:** Transparent with a strong neutral border for viewing and recovery.
- **States:** Deep teal hover, terracotta focus ring, and 1px downward active feedback.

### Chips
- **Style:** Small rectangular category filters with a neutral border.
- **State:** Selected filter uses Teal and white text; counts use mono numerals.

### Cards / Containers
- **Background:** Clean Surface on Pale Mist.
- **Border:** Soft Line at rest and Strong Line on hover.
- **Internal Padding:** 22–23px with a 16px action gap.
- **Action hierarchy:** One primary copy action and one secondary view action.

### Inputs / Fields
- **Style:** Dark console search field with square edges and a muted border.
- **Focus:** Accent border shift and visible native focus.
- **Error / Disabled:** Result status is explicit; copy stays disabled while source loads.

### Navigation
- **Style:** Sticky warm-paper top bar. Secondary links collapse on compact screens; repository stays visible.

### Skill Detail
A protected reading dialog shows source, input requirements, a selectable original SKILL.md, loading state, and a disabled copy action until source loading completes.

## Do's and Don'ts

### Do:
- **Do** put search, filters, and input requirements before copy.
- **Do** keep source links visible and distinguish original content from summaries.
- **Do** preserve keyboard focus, native selection, and explicit recovery.
- **Do** keep image and engineering skills equal in catalog structure.

### Don't:
- **Don't** lead with a decorative hero when the user arrives to find a tool.
- **Don't** copy translated summaries instead of the original SKILL.md.
- **Don't** hide the useful action behind hover or an ambiguous icon.
- **Don't** introduce gradients, decorative blur, or competing accents.
- **Don't** force horizontal scrolling on mobile.
