# Header and Product UI Adjustments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update header recruitment navigation, hide HaiBao Data's detail CTA, and refine the two-line brand slogan typography.

**Architecture:** Keep Hugo templates and the existing stylesheet as the only application surfaces. Add a remote Chinese display font with a local fallback, use a product-level conditional for the CTA, and preserve desktop/mobile navigation parity.

**Tech Stack:** Hugo templates, YAML data, CSS, Google Fonts CSS import, PowerShell/Hugo build.

---

### Task 1: Update recruitment links

**Files:**
- Modify: `layouts/partials/header.html`

- [ ] Change both desktop and mobile “加入我们” anchors to `https://www.genuineknowledge.cn/joinus/`.
- [ ] Keep the existing labels, classes, and navigation structure unchanged.

### Task 2: Hide only HaiBao Data detail CTA

**Files:**
- Modify: `layouts/products/list.html`

- [ ] Wrap `.product-buttons` in a condition that renders it only when the product index is not `2`.
- [ ] Leave HaiTun Agent's existing button text and link untouched.

### Task 3: Refine brand slogan typography and lockup

**Files:**
- Modify: `static/css/main.css`

- [ ] Add a Google Fonts CSS import for `Noto Sans SC` with weights 500, 600, and 700; retain Chinese system fallbacks.
- [ ] Adjust `.header-left` and `.header-slogan-text` spacing/alignment so the slogan visually fuses with the logo.
- [ ] Style the first slogan line as the compact brand descriptor and the second line with heavier weight, tighter tracking, and a slightly smaller size, matching the logo's blue palette.
- [ ] Update the responsive override so the lockup remains readable without overflow below 768px.

### Task 4: Build and verify

**Files:**
- Generated output: `public/` (build artifacts only)

- [ ] Run `hugo --minify` from the repository root and confirm exit code 0.
- [ ] Search generated `public/products/index.html` for the target join URL, absence of HaiBao Data's CTA, and presence of HaiTun Agent's CTA.
- [ ] Run `git diff --check` and inspect the final diff for unrelated changes.
