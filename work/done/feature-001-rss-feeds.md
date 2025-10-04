---
id: feature-001
title: "Add RSS feeds for posts, courses, and AI workflow open spec"
type: feature
status: completed
priority: medium
assignee: null
tags: [rss, content-syndication, feeds, posts, courses, workflow]
created: 2025-10-03
started: 2025-10-03
finished: 2025-10-03
related: []
---

## Summary

Add RSS feed support to enable users to subscribe to updates for blog posts, courses, and the AI workflow open spec. This will allow readers to consume content through RSS readers and stay updated on new content automatically.

## Problem

Currently, users have no way to subscribe to content updates via RSS feeds. This limits discoverability and makes it harder for readers to stay informed about new posts, courses, and AI workflow spec updates through their preferred RSS readers.

## Proposed Solution

Implement RSS 2.0 feeds for three content types:
1. Blog posts feed (`/rss/posts.xml`)
2. Courses feed (`/rss/courses.xml`)
3. AI workflow open spec feed (`/rss/workflow.xml`)

Each feed should include appropriate metadata, content excerpts or full content, publication dates, and proper XML formatting per RSS 2.0 specification.

## Requirements

### Core Requirements
- [x] Generate RSS 2.0 compliant XML feeds
- [x] Create `/rss/posts.xml` feed for blog posts
- [x] Create `/rss/courses.xml` feed for courses
- [x] Create `/rss/workflow.xml` feed for AI workflow open spec
- [x] Include proper feed metadata (title, description, link, language, etc.)
- [x] Include item-level metadata (title, link, pubDate, description, guid)
- [x] Sort items by publication date (newest first)
- [x] Set appropriate XML content-type headers

### Content Requirements
- [x] Include post/course title, description/excerpt, and link
- [x] Include publication date in RFC-822 format
- [x] Include author information where applicable
- [x] Include category/tag information
- [x] Support both excerpt and full content options

### Technical Requirements
- [x] Implement RSS generation using Next.js route handlers or API routes
- [x] Ensure feeds are statically generated at build time
- [x] Cache feeds appropriately
- [x] Validate XML output against RSS 2.0 spec
- [x] Handle special characters and HTML content properly

### Discovery Requirements
- [x] Add `<link rel="alternate" type="application/rss+xml">` to HTML head
- [x] Create `/rss` index page listing all available feeds
- [x] Add RSS feed links to footer or appropriate navigation

## Technical Considerations

- **Framework**: Next.js app router - use route handlers or generateStaticParams
- **XML Generation**: Use a library like `rss` or `feed` npm package, or generate XML manually
- **Data Source**: Leverage existing content fetching utilities (getAllPostsMeta, etc.)
- **Performance**: Pre-generate feeds at build time, ensure minimal runtime overhead
- **Validation**: Test feeds with RSS validators and multiple RSS readers
- **Content Formatting**: Properly escape HTML/XML, handle MDX content rendering
- **URL Structure**: Use `/rss/` prefix for feed organization
- **Spec Compliance**: Follow RSS 2.0 specification strictly

## Success Criteria

- [ ] All three RSS feeds are accessible and valid RSS 2.0 XML
- [ ] Feeds validate successfully on feedvalidator.org or similar
- [ ] Feeds load correctly in popular RSS readers (Feedly, NewsBlur, etc.)
- [ ] Feed URLs are discoverable via HTML `<link>` tags
- [ ] Feeds update automatically when new content is published
- [ ] No build errors or performance degradation

## Open Questions

- Should feeds include full content or excerpts only?
- What should the default item limit be (all items vs. last N items)?
- Should there be a combined "all content" feed?
- Do we need category-specific feeds for posts?
- Should feeds include images/media enclosures?

## Next Steps

1. Choose RSS generation library/approach
2. Implement posts feed first as proof of concept
3. Extend to courses and workflow feeds
4. Add feed discovery links to site
5. Test with multiple RSS readers
6. Document feed URLs

## Changelog

- 2025-10-03: Created feature specification
- 2025-10-03: Implemented RSS feeds
  - Created `/rss/posts.xml` feed for blog posts
  - Created `/rss/courses.xml` feed for courses
  - Created `/rss/workflow.xml` feed for AI workflow open spec
  - Added RSS feed discovery links to HTML head in layout.tsx
  - Created `/rss` index page listing all available feeds
  - Updated footer RSS link to point to `/rss` index page
  - All feeds are RSS 2.0 compliant and use the existing `rss` npm package
  - Posts feed uses category-based URLs when available
  - Workflow feed uses file modification times for publication dates
