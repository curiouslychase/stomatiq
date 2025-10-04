# Git-Based Work Management

A lightweight, version-controlled approach to managing features, bugs, tasks, and ideas using plain text files in a Git repository.

## Why?

Traditional project management tools like Linear and Jira are powerful but come with tradeoffs:
- They live outside your codebase
- Changes aren't version-controlled alongside code
- They require internet access
- Context switching between tools
- Proprietary formats and vendor lock-in

This system uses **plain text markdown files with YAML frontmatter** stored in Git, giving you:
- ✅ Version control for your work items
- ✅ Offline access
- ✅ Diffable history of changes
- ✅ Everything in one place with your code
- ✅ Easy to backup, migrate, and search
- ✅ AI-friendly structured format
- ✅ Works with your existing Git workflow

## Directory Structure

```
work/
├── active/       # All work that's not done or cancelled
├── done/         # Completed work items
├── cancelled/    # Cancelled work items
└── templates/    # Templates for creating new items
```

## Work Item Types

- **Feature**: New functionality or capability
- **Bug**: Something broken that needs fixing
- **Task**: Work that needs doing (refactoring, chores, improvements)
- **Idea**: Early-stage concept or proposal

## Status Lifecycle

Work items progress through these states:

```
idea → planned → in-progress → review → done
                      ↓
                  blocked
                      ↓
                 cancelled
```

- `idea` - Initial concept
- `up-next` - Queued work
- `in-progress` - Active work
- `blocked` - Can't proceed (note blockers in related items)
- `review` - Awaiting feedback
- `done` - Completed (move to `done/` directory)
- `cancelled` - Won't do (move to `cancelled/` directory)

## File Format

Each work item is a markdown file with YAML frontmatter:

```markdown
---
id: feature-001
title: "User Authentication"
type: feature
status: planned
priority: high
assignee: chaseadams
tags: [auth, security]
created: 2025-10-02
started: null
finished: null
related: [[feature-002]], [[bug-015]]
---

## Summary
[Content here...]

## Changelog
### 2025-10-02
- Created feature spec
```

## Naming Convention

Files follow this pattern: `{type}-{id}-{slug}.md`

Examples:
- `feature-001-user-authentication.md`
- `bug-023-login-redirect-issue.md`
- `task-012-refactor-api-client.md`
- `idea-005-ai-powered-search.md`

## Working with an AI Agent

This system is designed to work seamlessly with AI agents. Here's how:

### 1. Give the Agent Context

Point your AI agent to the `templates/AGENT_PROMPT.md` file:

```
Read the file at work/templates/AGENT_PROMPT.md - this explains how to create work items in this repository.
```

### 2. Use the Prefix Convention

When you reference `@work/templates/AGENT_PROMPT.md`, the agent will create work items but NOT execute the work automatically. Use these prefixes to be explicit:

**Create only (recommended):**
```
@work/templates/AGENT_PROMPT.md I need to add dark mode support to the application
```
→ Agent creates the work item and waits for you to approve

**Create and execute:**
```
@work/templates/AGENT_PROMPT.md execute: Add dark mode support to the application
```
→ Agent creates the work item AND immediately starts implementation

**Default behavior (if no prefix):** When you mention `@work/templates/AGENT_PROMPT.md`, the agent will only create the work item and wait for explicit instruction to begin work.

### 3. Describe Your Work

Simply describe what you want to create:

```
@work/templates/AGENT_PROMPT.md I need to add dark mode support to the application
```

or

```
@work/templates/AGENT_PROMPT.md There's a bug where the login page redirects to /home instead of /dashboard
```

### 4. Agent Creates the Item

The agent will:
- Determine the appropriate type (feature, bug, task, idea)
- Find the next available ID by checking existing files
- Create a properly formatted file in `work/active/`
- Fill in all relevant sections with detailed content
- Add appropriate tags and metadata

### 5. Review and Refine

Review the generated work item and refine as needed:

```
Update feature-001 to add a requirement about persisting theme preference in localStorage
```

### 6. Update Status as Work Progresses

Ask the agent to update status and dates:

```
I'm starting work on feature-001
```

The agent should:
- Update `status: in-progress`
- Set `started: 2025-10-02`
- Add changelog entry
- Update `assignee` if needed

### 7. Move to Done

When complete:

```
Feature-001 is complete
```

The agent should:
- Update `status: done`
- Set `finished: 2025-10-02`
- Add final changelog entry
- Move file from `work/active/` to `work/done/`

## Manual Workflow

You can also work with these files manually:

### Creating a New Item

1. Copy the appropriate template from `work/templates/`
2. Find the next available ID for that type (check all directories)
3. Fill in the frontmatter and content
4. Save to `work/active/` with proper filename

### Updating an Item

1. Edit the markdown file
2. Update the `status` field if changed
3. Update `started` or `finished` dates if applicable
4. Add a changelog entry with date and description

### Completing an Item

1. Set `status: done` and `finished: YYYY-MM-DD`
2. Add final changelog entry
3. Move file from `work/active/` to `work/done/`

### Cancelling an Item

1. Set `status: cancelled`
2. Add changelog entry explaining why
3. Move file from `work/active/` to `work/cancelled/`

## Linking Related Items

Use wikilink syntax `[[item-id]]` to reference related work:

```yaml
related: [[feature-001]], [[bug-023]], [[task-012]]
```

This helps track:
- Dependencies between features
- Bugs related to features
- Tasks spawned from bugs
- Related ideas

## Searching and Filtering

Since everything is plain text, you can use standard tools:

**Find all high-priority items:**
```bash
grep -r "priority: high" work/active/
```

**Find items assigned to you:**
```bash
grep -r "assignee: chaseadams" work/active/
```

**Find all bugs in progress:**
```bash
grep -l "type: bug" work/active/ | xargs grep -l "status: in-progress"
```

**Or use an AI agent:**
```
Show me all high-priority features that are in progress
```

## Best Practices

1. **Keep IDs sequential**: Always check for the next available number
2. **Update dates**: Set `started` and `finished` when status changes
3. **Maintain changelog**: Document significant updates
4. **Use tags**: Make items easier to find and filter
5. **Link related items**: Build a network of related work
6. **Commit regularly**: Treat work items like code - commit changes with meaningful messages
7. **Review periodically**: Clean up stale items, update priorities

## Example Agent Interactions

**Creating a feature:**
```
User: I want to add email notifications when a user gets a new message

Agent: I'll create a feature spec for email notifications.
[Creates work/active/feature-001-email-notifications.md with full spec]
```

**Updating status:**
```
User: I'm starting work on feature-001

Agent: Updated feature-001:
- Status: in-progress
- Started: 2025-10-02
- Assignee: chaseadams
- Added changelog entry
```

**Reporting a bug:**
```
User: The search bar doesn't work on mobile devices

Agent: I'll create a bug report for the mobile search issue.
[Creates work/active/bug-001-mobile-search-broken.md with details]
```

**Querying work:**
```
User: What features are currently in progress?

Agent: Currently in progress:
- feature-001: Email notifications (started 2025-10-02, assigned to chaseadams)
- feature-003: Dark mode support (started 2025-09-28, assigned to contributor1)
```

## Tips for Success

- **Start simple**: Create a few items manually to get a feel for the format
- **Iterate**: The structure can evolve as you learn what works
- **Be consistent**: Follow the naming and format conventions
- **Leverage AI**: Let agents handle the boilerplate and structure
- **Review generated content**: AI is great at structure, but verify the substance
- **Commit atomic changes**: One work item per commit when possible

## Getting Started

1. Read `templates/AGENT_PROMPT.md` to understand the system
2. Review the template files to see the expected structure
3. Try creating your first work item (manually or with an agent)
4. Commit it to Git
5. Update it as you work on it
6. Move it to `done/` when complete

Welcome to Git-based work management!
