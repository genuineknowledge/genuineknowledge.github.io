# About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a polished `/about/` page for 真知人工智能 matching the existing site visual language.

**Architecture:** Add a dedicated Hugo content page and layout, with page-specific CSS layered on the existing main stylesheet. Reuse the global header/footer and existing product routes.

**Tech Stack:** Hugo templates, Markdown front matter, CSS, existing PNG assets.

---

### Task 1: Add content and layout

**Files:** Create `content/about/_index.md`, `layouts/about/list.html`.

- [ ] Add company introduction, mission, vision, goal, values, and product cards linking to product 1/2.

### Task 2: Add visual styling

**Files:** Modify `static/css/main.css`.

- [ ] Add responsive about-page hero, statement grid, values, and product cards using existing colors, spacing, shadows, and typography.

### Task 3: Verify

- [ ] Run `git diff --check` and inspect generated template references and asset paths.
