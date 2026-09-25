---
name: qa-flow-auditor
description: Audit a web application's end-to-end user flows, reproduce functional and usability bugs, collect evidence, and create high-quality GitHub issues without fixing the problems. Use this skill for QA sweeps, usability reviews, regression testing, Playwright-based flow testing, bug reproduction, and GitHub issue triage.
---

# QA Flow Auditor

Use this skill when the task involves testing an application, reviewing usability, finding bugs, reproducing failures, validating user flows, performing regression testing, or creating GitHub issues from confirmed problems.

The primary workflow is:

DISCOVER → PLAN → TEST → REPRODUCE → INVESTIGATE → DOCUMENT → CREATE ISSUE → REPORT

Do not jump directly from reading the source code to declaring something a bug.

## 1. Understand the application first

Before running tests:

1. Inspect the repository structure.
2. Identify the frontend framework, backend, database, authentication provider and relevant external services.
3. Inspect package scripts and existing testing infrastructure.
4. Identify existing unit, integration and E2E tests.
5. Identify environment variables required to run the project.
6. Determine how the application is expected to run locally.
7. Inspect application routes.
8. Identify major entities and business rules.
9. Identify user roles and authorization differences.
10. Identify important persistence mechanisms.

Prefer using the existing project tooling. If Playwright, Cypress or another E2E framework already exists, use it instead of introducing another framework unless there is a strong reason.

## 2. Build a flow map

Create an internal checklist of all user-facing flows before testing. Include authentication, login/logout, session persistence, protected routes, user/profile management, collection management, binder management, card addition/removal, entity details, search/filtering, navigation, loading, error and empty states, plus any other flows discovered from routes, components and application behavior.

Do not restrict testing to flows explicitly mentioned by the user.

## 3. Test realistic user journeys

Test complete journeys rather than isolated buttons. Follow data through the entire workflow. A feature working on one screen does not mean the workflow is correct.

## 4. Test more than the happy path

For every important action, consider valid input, invalid input, missing required input, empty strings, whitespace-only strings, leading/trailing whitespace, unusual characters, long values, duplicate actions, rapid double clicks, refresh during the workflow, browser back/forward, direct URL access, stale data, invalid IDs, nonexistent resources, unauthorized users, expired/invalid sessions, failed or slow API requests, empty responses, duplicate submissions/actions and persistence after reload.

For uploads, consider wrong type, oversized file, corrupted file, duplicate file, missing file and canceled upload when relevant.

## 5. Review usability

Actively inspect UX while testing. Look for unclear actions, misleading labels, buttons without feedback, actions without confirmation, forms that lose entered data, missing or confusing validation, unclear error messages, stale information after mutations, manual-refresh requirements, broken browser navigation, inconsistent loading behavior, missing empty states, broken modals, layout overflow, content clipping, overlapping elements, bad responsive behavior, unexpected scrolling, inconsistent terminology, unclear disabled states, duplicate action execution, keyboard/focus problems, and missing success/failure feedback.

Do not create issues for purely subjective visual preferences unless there is concrete usability impact.

## 6. Use browser automation when useful

Prefer automated browser testing for repeatable flows. Playwright is preferred when no E2E framework already exists.

Temporary tests may run locally, create screenshots/videos/traces, use fixtures and create test data. Unless explicitly requested, do not commit or push QA experiments, do not open PRs containing them, and do not modify production code just to make tests pass.

## 7. Inspect browser and network behavior

When reproducing failures, inspect console errors, failed network requests, HTTP status codes, response payloads, unexpected redirects, JavaScript/runtime errors, authentication failures, API validation errors, visible database failures, race conditions and duplicate requests.

Do not expose secrets, tokens, credentials or sensitive user information in GitHub issues. Redact sensitive evidence.

## 8. Reproduce before reporting

For each suspected bug:

1. Reset to a known state when possible.
2. Execute the minimum steps required.
3. Reproduce the behavior again.
4. Determine whether it is deterministic or intermittent.
5. Compare actual behavior with expected behavior.
6. Inspect logs, console and network activity.
7. Identify likely affected code when possible.

If something appears suspicious from source inspection but cannot be reproduced, report it as an observation instead of a confirmed bug.

## 9. Distinguish bugs from expected behavior

Before creating an issue, inspect business rules, validation logic, tests, documentation, nearby implementation and existing GitHub issues. Do not classify intentional behavior as a defect merely because it seems unusual. If expected behavior is ambiguous, state the uncertainty.

## 10. Search existing GitHub issues

Before creating a new issue, search open and relevant closed issues using error messages, feature names, routes and symptoms. Do not create duplicates. If an equivalent issue exists, add useful reproduction information there when appropriate.

## 11. One bug per issue

Do not combine unrelated defects. Separate issues when causes, fixes, severity or reproduction differ significantly.

## 12. GitHub issue format

Use concise titles in the format:

[Bug] Short description of the incorrect behavior

Each confirmed issue should contain Description, Steps to reproduce, Current behavior, Expected behavior, Evidence, Environment, Severity and Technical investigation.

Severity:
- Critical: core workflow blocked, serious authorization problem, data corruption/loss or similarly severe behavior.
- High: important workflow broken with no reasonable workaround.
- Medium: functional problem with an available workaround.
- Low: minor functional or usability problem with limited impact.

Clearly distinguish confirmed cause from probable cause.

## 13. Do not fix bugs during discovery

During discovery, do not refactor production code, fix bugs as they are found, silently change validation, modify business rules, improve UI implementation or create unrelated cleanup commits.

The objective is:

TEST → REPRODUCE → DOCUMENT → CREATE ISSUE

Fixing happens in a separate task.

## 14. Protect data

Prefer local/staging environments, dedicated test accounts and disposable test records. Avoid destructive operations against production. Do not delete or modify real user data unless explicitly authorized and required by the task.

## 15. Track every executed scenario

Maintain an audit matrix with flow, scenario, result, notes and associated GitHub issue. Results may be PASS, FAIL, BLOCKED or NOT TESTED. Do not count BLOCKED or NOT TESTED as PASS.

## 16. Screenshot and artifact handling

Screenshots, videos, traces and temporary uploads are disposable evidence.

For visual evidence:
1. reproduce the problem;
2. generate the evidence;
3. verify it demonstrates the problem;
4. attach it to the corresponding GitHub issue;
5. confirm the attachment is available;
6. delete the local temporary artifact.

Do not commit or push temporary evidence. At the end, remove temporary screenshots, videos, traces, uploads, fixtures and test artifacts created solely for the audit. Never remove project files that existed before the audit.

## 17. Final audit report

Report total scenarios executed, passed, failed, blocked, bugs confirmed, GitHub issues created, existing issues reused, and severity counts.

Include a matrix such as:

| Flow | Scenario | Result | Issue |
| --- | --- | --- | --- |
| Authentication | Valid login | PASS | |
| Collection | Add card | PASS | |
| Binder | Remove card | FAIL | #123 |
| Profile | Featured card | FAIL | #124 |

Also include untested/blocked areas, important observations and cleanup confirmation.

## 18. Quality bar

Do not optimize for number of issues. Optimize for reproducibility, useful evidence, accurate severity, minimal duplication and actionable reports.

Ten well-reproduced bugs are more useful than fifty speculative issues.
