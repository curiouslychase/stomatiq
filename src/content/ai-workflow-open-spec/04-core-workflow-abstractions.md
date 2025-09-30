# 3. Core Workflow Abstractions

## 3.1 Workflow Definition Envelope

The workflow definition envelope acts as the portable artifact that manufacturers, operators, and auditors exchange. It must tell the full story of what the workflow is, what it depends on, and how it should be governed, while remaining agnostic about the runtime that eventually executes it. Treat the envelope as the canonical representation—other projections (UI forms, SDK objects) should be derived views that can always be rehydrated into the envelope without loss. In practical terms, the envelope is the source of truth that travels between teams: product managers read it to confirm intent, engineers use it to wire implementations, and compliance reviewers inspect it to verify policy alignment.

Requirements:

- **Envelope Structure** — A workflow definition Must be represented as a single canonical document referencing stable identifiers for every component. The envelope Must include metadata (title, description, owners, version), declared capabilities, and a digest or hash to guarantee integrity.
- **Versioning Semantics** — Each revision Must increment a monotonically increasing version marker and Must Not mutate previously published envelopes. Engines Should support semantic version hints (e.g., `major.minor.patch`) to communicate compatibility expectations.
- **Capability Declarations** — The envelope Must enumerate required runtime capabilities (e.g., `language_model`, `http_request`, `human_review`). Engines Must reject execution if mandatory capabilities are absent and no fallback is declared.
- **Policy Attachment** — Governance artifacts (compliance tags, access controls, retention policies) Should be attached by reference. When present, engines Must enforce them at execution time and emit attestations indicating compliance successes or violations.
- **Localization and Internationalization** — The envelope May offer localized descriptors and human-readable instructions. Engines interpreting multiple locales Should expose a deterministic selection strategy.

## 3.2 Step Types and Capabilities Catalog

Workflows draw from a shared catalog of step definitions, each describing what capability it exercises and how it should be executed. Maintaining a clean catalog is what allows different runtimes to swap handlers without rewriting the workflow spec. Think of step definitions as contracts between workflow authors and engine implementers—the catalog sets expectations up front and unlocks modularity when new capabilities arrive. Readers can imagine the catalog as a marketplace shelf: every item lists what it does, what inputs it expects, and the policies it obeys before anyone can place it on a workflow graph.

Requirements:

- **Step Definition Registry** — Steps Must reference definitions stored in a registry addressable by stable identifiers. Definitions Must contain: a unique key, descriptive name, supported capability tags, expected input/output schemas, runtime hints, and human-facing documentation.
- **Capability Taxonomy** — The specification adopts a hierarchical capability taxonomy. For example, `language_model.generative`, `integration.http.get`, `human_review.decision`. Step definitions Must reference the most specific applicable capability. Engines May map capabilities to native handlers but Must preserve semantics.
- **Extensible Catalog** — New step types May be introduced via extension modules. To maintain compatibility, extensions Must declare backwards-compatible defaults and explicitly state prerequisite profiles. Engines lacking an extension Must provide a deterministic refusal reason or an alternate execution plan if one is declared.
- **Side-Effect Classification** — Each step definition Must declare its side-effect profile (`pure`, `idempotent`, `non-idempotent`). Runtimes Must respect these declarations when attempting retries, parallel execution, or speculative evaluation.
- **Security Posture** — Steps Must articulate required security scopes (e.g., OAuth claims, API keys, dataset entitlements). Engines executing a step without the required scope Must raise a fatal error before external calls occur.

## 3.3 Data Contracts and State Management

Typed data contracts are the backbone of interoperability. They allow tooling to generate forms, validate payloads, and statically reason about what flows through each edge in the graph. Because AI systems can produce unpredictable outputs, the contracts do extra work: they wrangle stochasticity into predictable envelopes and describe the guardrails around state persistence. Without these contracts, teams would fall back to brittle string parsing or ad-hoc logging, which fails audits and shatters portability.

Requirements:

- **Schema Formalism** — Step inputs and outputs Must be described using machine-verifiable schemas (JSON Schema, Zod-compatible AST, Protocol Buffers, etc.). Schemas Must support references and composability so shared fragments can be reused across steps.
- **Result Envelope Alignment** — Every step output Must conform to the Result Pattern, with a payload (`ok`) or structured error (`recoverable_error`, `fatal_error`). Errors Must include typed metadata (codes, human-readable summaries, remediation hints) to support automated routing.
- **Context Propagation** — Workflows Must define how contextual state (e.g., workspace identifiers, user session data, correlation IDs) is passed across steps. Engines Should provide immutable system context (execution ID, timestamps) and Must prevent unauthorized mutation.
- **State Persistence** — The workflow Must specify which fields require durable persistence between runs. Persisted state Should be versioned and Must include migration strategies when schemas evolve. Ephemeral state May be retained per execution but Must be garbage-collected according to policy settings.
- **Data Sensitivity Classification** — Contracts Must annotate sensitive or regulated fields. Engines Must enforce protective measures (masking, encryption in transit, audit logging) consistent with the declared sensitivity level.
- **Validation Lifecycle** — Inputs Must be validated prior to handler invocation. Outputs Must be revalidated before emission to downstream steps. Validation failures Must be surfaced as recoverable errors unless the specification explicitly marks them fatal.

## 3.4 Control Flow and Orchestration Patterns

While the workflow graph is declarative, engines still need clear guidance on how to interpret branching, looping, and compensation semantics. This subsection summarizes the canonical patterns and the constraints that keep them safe and debuggable across runtimes. The aim is to make orchestration behaviors readable enough for designers to storyboard and precise enough for implementers to build deterministic schedulers.

Requirements:

- **Sequential Flow** — Default execution is sequential along topological order. Steps Must execute only when all prerequisite edges resolve with `ok` or an allowed `recoverable_error` defined by policy.
- **Parallel Branching** — Workflows May declare parallel branches by attaching multiple outgoing edges from a node. Engines Must preserve data isolation across branches and merge results only through explicit join nodes that define combination semantics.
- **Conditional Routing** — Edges May include predicates referencing prior outputs or context fields. Predicates Must be expressed in a deterministic, declarative syntax (e.g., expression trees, JSON logic). Engines Must evaluate predicates atomically and log routing decisions.
- **Loops and Iteration** — Iterative patterns Must declare termination criteria (max iterations, convergence condition, external signal). Engines Must enforce termination to prevent runaway execution and Should expose loop counters in telemetry.
- **Compensation and Sagas** — For steps with side effects, workflows Should define compensation handlers. Compensation steps Must be idempotent and Must declare the scope of reversal. Engines Must invoke compensation when a transactionally grouped set of steps reaches a fatal error.
- **Timeouts and Deadlines** — Each step May include a timeout. Engines Must enforce timeouts, aborting the step handler and emitting a recoverable or fatal error per policy. Workflows targeting strict SLAs Should declare global deadlines that engines respect when scheduling.
- **Manual Interventions** — Control flow Must accommodate pausing at human-in-the-loop steps. When paused, engines Must persist all necessary context, notify subscribed channels, and resume only upon receipt of an explicit resolution event.

These abstractions collectively define how workflows are expressed independent of any specific runtime, while retaining enough structure for consistent execution semantics.
