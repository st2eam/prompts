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
  error: "#8b3525"
typography:
  display:
    fontFamily: "Segoe UI, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Segoe UI, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "2rem"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Segoe UI, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.65
  code:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "5px"
  md: "14px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "44px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px"
  search-field:
    backgroundColor: "#273735"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    height: "52px"
---

# Design System: Prompt Field Skill Workbench

## Overview

Prompt Field is a workbench for finding an AI skill, checking its inputs, and copying the original `SKILL.md`. Search, categories, count, and results are one group. The optimizer is a distinct workspace below the catalog, reachable from the main navigation.

Use paper, ink, and teal to keep the interface familiar. Teal marks the primary action, selection, and focus. Terracotta is reserved for the brand mark, not small link text. Let headings, proximity, and spacing do the work of labels. Keep text that changes what someone does next: input requirements, exact source links, privacy notices, and recovery instructions.

## Layout

- Keep the catalog title and search close to the filter row and results. Use one result count for visible feedback and polite announcements.
- Use a 1440px maximum canvas, with three columns at 1100px and up, two on intermediate widths, and one at 640px and below. The navigation wraps rather than hiding destinations, and the optimizer stacks input before output on mobile.
- Lead skill cards with the title, one-sentence purpose, and input requirements. Show a contained image only when a real example exists. Keep the same information and action order for engineering and image-generation skills.
- Keep card surfaces flat and use a clear outline for focus. Use one prominent action (`复制 SKILL.md`) and one secondary action (`查看原文`). Move source and ID to detail.

## States

- Filters expose selection with `aria-pressed`. Controls such as search clear and dialog close use at least 44px targets.
- The native skill dialog starts with the title, requirements, file link, and copy controls. Status messages sit outside the selectable original. An optional disclosure loads the full example when opened. Restore focus on close, and distinguish a failed source read from clipboard denial.
- The optimizer separates its input and output visually. Keep one nearby message for the current request and preserve the previous successful output until a new one succeeds or the user clears it. Requests do not save credentials; explicit saving and provider disclosure stay next to the relevant controls.
- Use short, actionable copy, not animated placeholders or labels that repeat headings. Keep visible focus, flexible text layout, and predictable keyboard order.
