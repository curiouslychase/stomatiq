---
id: task-001
title: "Sort newsletter posts from newest to oldest"
type: task
status: planned
priority: medium
assignee: null
tags: [newsletter, sorting, ui]
created: 2025-10-02
started: null
finished: null
related: []
---

## Description

Ensure newsletter posts on the `/newsletter` page are sorted from newest to oldest based on their publication date.

## Context

The newsletter page (`src/app/newsletter/page.tsx`) displays posts using the `getAllPostsMeta()` function from `src/lib/posts.ts`. There is existing sort logic at `src/lib/posts.ts:140` that attempts to sort by date, but this task involves verifying the sort is working correctly and displaying posts in the expected order (newest first).

## Details

**Current Implementation:**
- Posts are retrieved via `getAllPostsMeta()` in `src/lib/posts.ts:136-141`
- Sorting logic exists: `.sort((a, b) => (a.date < b.date ? 1 : -1))`
- Posts have a `date` field (ISO string format) in their frontmatter

**What needs to be done:**
1. Verify the current sort implementation is working correctly
2. Test with actual post dates to ensure newest posts appear first
3. If sorting is incorrect, update the sort logic
4. Ensure the sort handles edge cases (same dates, missing dates, invalid dates)

## Subtasks

- [ ] Review current sort implementation in `getAllPostsMeta()`
- [ ] Check actual post dates in `content/posts/` directory
- [ ] Verify posts are displayed newest-to-oldest on `/newsletter` page
- [ ] Update sort logic if needed (consider using `new Date()` for proper comparison)
- [ ] Test with various date scenarios
- [ ] Document expected behavior in code comments if needed

## Technical Notes

Current sort logic at `src/lib/posts.ts:140`:
```typescript
.sort((a, b) => (a.date < b.date ? 1 : -1))
```

This compares dates as strings. Since the dates are ISO format (YYYY-MM-DD), string comparison should work correctly, but consider converting to Date objects for more robust comparison:
```typescript
.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
```

## Acceptance Criteria

- [ ] Newsletter page displays posts with newest date at the top
- [ ] Sort order is consistent and predictable
- [ ] Edge cases handled (equal dates, malformed dates)
- [ ] Code is clear and maintainable

## Changelog

- 2025-10-02: Task created
