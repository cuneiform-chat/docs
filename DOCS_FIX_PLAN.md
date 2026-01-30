# Documentation Fix Plan

**Date:** 2026-01-30
**Status:** Ready for Implementation
**Total Fixes:** 15 changes across 11 files

---

## Priority 0 — Critical (User-Facing Errors)

### Fix 1: Remove Web Widget References

**Issue:** Links to non-existent `/integrations/web-widget` cause 404 errors.

| File | Line | Current | Change To |
|------|------|---------|-----------|
| `pages/getting-started/test-your-agent.mdx` | 69 | `- [Web Widget](/integrations/web-widget) — Embed on your website` | **DELETE LINE** |
| `pages/agents/index.mdx` | 37 | `- Web widget on your website` | **DELETE LINE** |
| `pages/billing/plans.mdx` | 54 | `\| Web widget \| ✓ \| ✓ \| ✓ \|` | **DELETE LINE** |

---

### Fix 2: Correct Agent Actions in `creating.mdx`

**File:** `pages/agents/creating.mdx`
**Lines:** 70-75

**Current:**
```markdown
From the Agents page, you can:

- **Edit** — Modify any agent's settings
- **Duplicate** — Create a copy as a starting point
- **Delete** — Remove agents you no longer need
- **View Analytics** — See usage statistics
```

**Replace with:**
```markdown
From the Agents page, you can:

- **Edit** — Modify any agent's settings
- **Playground** — Test your agent in an interactive chat
- **Archive** — Hide agents you no longer need (can be restored later)
```

---

### Fix 3: Rewrite `conversations.mdx`

**File:** `pages/analytics/conversations.mdx`

**Issue:** Documents features that don't exist (transcripts, search, CSV export).

**Replace entire file with:**

```markdown
# Conversation Analytics

Track conversation metrics across your agents and channels.

## Overview

Conversation data is available through the Analytics dashboard, providing insights into:

- Total conversation volume
- Conversations per agent
- Conversations per channel
- Trends over time

## Accessing Conversation Data

### Agent Analytics

View conversation metrics for specific agents:

1. Go to **Analytics** in the sidebar
2. Select **Agents**
3. Click on an agent to see detailed metrics including conversation counts

### Channel Analytics

View conversation metrics by channel:

1. Go to **Analytics** in the sidebar
2. Select **Channels**
3. See conversation breakdown across Telegram, Discord, Slack, etc.

## Available Metrics

| Metric | Description |
|--------|-------------|
| Total conversations | Number of chat sessions |
| Conversations by agent | Which agents handle the most chats |
| Conversations by channel | Distribution across platforms |
| Trends | Daily/weekly conversation patterns |

## Filtering

Filter analytics by:

- **Date range** — Last 7 days, 30 days, or custom range
- **Agent** — Specific agent or all agents
- **Channel** — Specific channel or all channels

import { Callout } from 'nextra/components'

<Callout type="info">
  Detailed conversation transcripts and search functionality are planned for a future release.
</Callout>
```

---

### Fix 4: Update Analytics Index Card

**File:** `pages/analytics/index.mdx`
**Line:** 31

**Current:**
```markdown
<Card title="Conversation Analytics" href="/analytics/conversations" />
```

**Change to:**
```markdown
<Card title="Conversations" href="/analytics/conversations" />
```

---

## Priority 1 — High (Misleading Information)

### Fix 5: Remove CSV Export Claims from `usage.mdx`

**File:** `pages/analytics/usage.mdx`
**Lines:** 103-108

**Current:**
```markdown
## Exporting Reports

Generate usage reports:
- Monthly summaries
- Detailed breakdowns
- CSV export for accounting
```

**Replace with:**
```markdown
## Usage Reports

View usage summaries directly in the dashboard:

- Monthly summaries
- Detailed breakdowns by agent and channel
- Historical comparisons
```

---

### Fix 6: Remove "Tagged Documents" Reference

**File:** `pages/getting-started/first-agent.mdx`
**Lines:** 29-34

**Current:**
```markdown
### Knowledge Base Selection

Choose which documents your agent can access:

- **All Documents** — Agent can search your entire knowledge base
- **Specific Folders** — Limit to certain document collections
- **Tagged Documents** — Use tags to control access
```

**Replace with:**
```markdown
### Knowledge Base Selection

Choose which documents your agent can access:

- **All Documents** — Agent can search your entire knowledge base
- **Specific Folders** — Limit to certain document collections
```

---

### Fix 7: Clarify Alerts Are Automatic

**File:** `pages/billing/usage.mdx`
**Lines:** 53-59

**Current:**
```markdown
## Alerts

Set up notifications for:
- 50% of credits used
- 80% of credits used
- 95% of credits used (action needed)
```

**Replace with:**
```markdown
## Usage Warnings

The platform automatically displays warnings as you approach your limits:

| Threshold | What Happens |
|-----------|--------------|
| ~80% used | Warning banner appears in dashboard |
| 100% used | "Limit Reached" banner with upgrade prompt |
| Blocked | Service paused until next period or upgrade |

These warnings appear automatically — no configuration needed.
```

---

### Fix 8: Clarify Alerts in Analytics Usage

**File:** `pages/analytics/usage.mdx`
**Lines:** 77-81

**Current:**
```markdown
## Alerts

Set up alerts for:
- Approaching plan limits
- Unusual usage spikes
- Storage warnings
```

**Replace with:**
```markdown
## Usage Warnings

The dashboard displays automatic warnings when:

- Approaching your monthly credit limit
- Usage limit is reached or exceeded

These warnings appear as banners in your dashboard to help you take action before service is affected.
```

---

## Priority 2 — Medium (Minor Inaccuracies)

### Fix 9: Rename "Welcome Message" to "Greeting Message"

**File:** `pages/agents/creating.mdx`
**Lines:** 41-45

**Current:**
```markdown
### Welcome Message

The first message your agent sends when a conversation starts. Examples:
```

**Replace with:**
```markdown
### Greeting Message

The first message your agent sends when a conversation starts. Examples:
```

---

**File:** `pages/agents/configuring.mdx`
**Lines:** 56-58

**Current:**
```markdown
### Welcome Message

The message displayed when a conversation starts. Leave empty for no greeting.
```

**Replace with:**
```markdown
### Greeting Message

The message displayed when a conversation starts. Leave empty for no greeting.
```

---

### Fix 10: Remove Business Hours from WhatsApp

**File:** `pages/integrations/whatsapp.mdx`
**Lines:** 95-101

**Current:**
```markdown
## Configuration Options

| Setting | Description |
|---------|-------------|
| Welcome message | First response to new conversations |
| Business hours | Optionally show different responses outside hours |
```

**Replace with:**
```markdown
## Configuration Options

| Setting | Description |
|---------|-------------|
| Greeting message | First response to new conversations |
```

---

### Fix 11: Add Missing File Formats

**File:** `pages/knowledge-base/supported-formats.mdx`

**Add after line 34 (after HTML row in Web Content table):**

```markdown
### Data Formats

| Format | Extensions | Notes |
|--------|-----------|-------|
| JSON | `.json` | Structured data files |
| XML | `.xml` | XML documents |
| TSV | `.tsv` | Tab-separated values |
```

---

## Implementation Checklist

```
[ ] Fix 1: Remove web widget (3 files)
[ ] Fix 2: Correct agent actions (creating.mdx)
[ ] Fix 3: Rewrite conversations.mdx
[ ] Fix 4: Update analytics index card
[ ] Fix 5: Remove CSV export claims (usage.mdx)
[ ] Fix 6: Remove tagged documents (first-agent.mdx)
[ ] Fix 7: Clarify alerts (billing/usage.mdx)
[ ] Fix 8: Clarify alerts (analytics/usage.mdx)
[ ] Fix 9a: Rename welcome message (creating.mdx)
[ ] Fix 9b: Rename welcome message (configuring.mdx)
[ ] Fix 10: Remove business hours (whatsapp.mdx)
[ ] Fix 11: Add missing formats (supported-formats.mdx)
[ ] Build and verify no broken links
[ ] Deploy to docs.cuneiform.chat
```

---

## Files Modified Summary

| File | Fixes |
|------|-------|
| `pages/getting-started/test-your-agent.mdx` | #1 |
| `pages/getting-started/first-agent.mdx` | #6 |
| `pages/agents/index.mdx` | #1 |
| `pages/agents/creating.mdx` | #2, #9a |
| `pages/agents/configuring.mdx` | #9b |
| `pages/knowledge-base/supported-formats.mdx` | #11 |
| `pages/integrations/whatsapp.mdx` | #10 |
| `pages/analytics/index.mdx` | #4 |
| `pages/analytics/conversations.mdx` | #3 (full rewrite) |
| `pages/analytics/usage.mdx` | #5, #8 |
| `pages/billing/plans.mdx` | #1 |
| `pages/billing/usage.mdx` | #7 |

**Total: 12 files, 15 discrete changes**
