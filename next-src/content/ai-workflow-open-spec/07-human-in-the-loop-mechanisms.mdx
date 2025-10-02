# 6. Human-in-the-Loop Mechanisms

## 6.1 Review and Approval Nodes

Human participation is integral to AI workflows, whether for policy compliance, quality assurance, or creative direction. Review nodes must therefore be treated as first-class citizens: they pause execution, present curated context to reviewers, and resume based on explicit decisions. The specification defines how these nodes expose requirements so that any runtime can integrate with ticketing systems, inboxes, or custom review UIs while following the same state machine. In practical terms, these clauses ensure humans receive the right information at the right moment and that their choices feed back into automation without ad hoc integrations.

Requirements:

- **Review Schema** — Review nodes Must declare the data presented to humans, including payload excerpts, provenance metadata, and decision options. Schemas Should support role-based views so different reviewers see context aligned with their responsibilities.
- **Decision Outcomes** — Each node Must enumerate possible outcomes (approve, reject, request_changes, escalate). Engines Must map reviewer input to these outcomes deterministically and log the identity of the decision-maker.
- **Pause Semantics** — When a workflow enters a review node, the engine Must persist all prior state, mark the execution as paused, and emit notifications to configured channels. Timeouts or SLAs Should be attached to ensure pending reviews do not stall indefinitely.
- **Resumption Protocol** — Upon receiving a decision, engines Must resume from the appropriate edge in the workflow graph. Rejections or change requests Should trigger compensating steps or alternative branches defined in the control flow.
- **Accessibility Considerations** — Review nodes Should specify presentation guidelines (language, localization, accessibility metadata) so host applications can render inclusive experiences.

## 6.2 Exception Handling Workbenches

Not every incident can be resolved through a simple approve/reject choice. Some scenarios require operators to inspect system state, edit data, or rerun segments of the workflow. Exception handling workbenches provide structured environments for these interventions while preserving audit trails. You can think of them as dedicated “repair bays” where trained responders can adjust a workflow without bypassing governance controls.

Requirements:

- **Workbench Definition** — Workflows May declare dedicated workbench endpoints or applications. Definitions Must include required user roles, accessible data subsets, and permitted actions (edit, retry, escalate).
- **State Snapshots** — When an exception is raised, engines Must capture snapshots of relevant inputs, outputs, and logs. Workbenches Should display these snapshots to operators to inform remediation without granting blanket system access.
- **Action Authorization** — Every manual action Must be checked against the workflow's authorization model. Engines Must reject unauthorized edits and log attempted violations for forensic review.
- **Rollback Hooks** — Workbenches Should offer hooks to trigger compensating steps or requeue items. Engines Must treat these hooks as part of the workflow graph, applying the same telemetry and error handling policies as automated steps.
- **Collaboration Signals** — Definitions May include collaboration features (comments, assignments). Engines that support collaboration Must persist conversation threads alongside the workflow execution history.

## 6.3 Escalation and Notification Channels

Timely communication ensures that human checkpoints and exception paths do not become silent failure modes. The spec therefore mandates declarative escalation rules that engagement tooling can subscribe to, irrespective of the underlying messaging platform. These rules give operations teams predictable paging behavior, whether alerts surface in email, chat, or ticketing queues.

Requirements:

- **Channel Registry** — Workflows Must reference notification channels (email lists, chat rooms, ticket queues) by logical identifiers. Engines Must resolve these identifiers to concrete endpoints at deployment time.
- **Escalation Rules** — Each human-involved node Should declare escalation paths based on timing, workload, or severity (e.g., escalate to on-call after 30 minutes, notify compliance officer on high-risk rejection). Engines Must enforce these timers even if the workflow is paused.
- **Acknowledgment Tracking** — Engines Should track acknowledgment events from notified users and expose them in execution telemetry. Lack of acknowledgment within SLA Must trigger tertiary escalation.
- **Audit Trails** — All notifications and escalations Must be recorded with timestamps, recipients, and payload summaries. Sensitive content Should be redacted per governance policy.
- **Fallback Channels** — Workflows May define fallback channels for redundancy. Engines Must fail over deterministically when the primary channel is unavailable and report the failover in telemetry.

Human-in-the-loop mechanisms thus become composable workflow primitives, enabling consistent governance, auditability, and operator tooling across diverse automation platforms. Annex D highlights a creative approval workflow that walks through review nodes, exception repair, and escalation chains end to end.
