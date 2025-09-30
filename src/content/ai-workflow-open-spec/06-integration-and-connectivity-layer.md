# 5. Integration and Connectivity Layer

## 5.1 Connector Metadata and Discovery

Workflows often rely on heterogeneous external systems—datastores, SaaS APIs, knowledge bases—to supply data or trigger side effects. To keep these integrations portable, connectors must describe themselves in a way that authoring tools can discover, parameterize, and validate regardless of the hosting runtime. This subsection defines the descriptive metadata that every connector publishes so workflows can bind to them declaratively. For readers, the connector descriptor is the brochure that tells you what the integration does, which paperwork is required, and how to plug it into your automation without unexpected surprises.

Requirements:

- **Connector Descriptor** — Each connector Must provide a descriptor containing identifier, human-readable name, capability tags, supported operations, authentication modes, and version information. Descriptors Should be retrievable via a registry or service directory exposed through an interoperable protocol (e.g., OpenAPI, JSON manifest).
- **Operation Signatures** — Operations Must declare input/output schemas, rate-limit characteristics, timeout expectations, and side-effect classifications. Optional fields (pagination cursors, delta tokens) Should include defaults or negotiation hints.
- **Discovery Filters** — Registries May expose filters by capability, compliance category, or data residency. Engines Must respect filter constraints when resolving connectors for a workflow, failing fast if no compliant connector exists.
- **Deprecation Notices** — Connectors Must announce deprecation timelines with alternative recommendations. Workflows referencing deprecated connectors Should receive lint warnings and Must provide migration plans before the end-of-life date.
- **Documentation References** — Descriptors Should link to human-facing documentation and example payloads. Engines that auto-generate UIs May surface these references to guide non-technical builders.

## 5.2 External API Interaction Patterns

Once a workflow binds to a connector, it needs to express how requests are formed, dispatched, and reconciled with workflow state. The goal is to remove runtime-specific HTTP or RPC code while keeping enough structure for engines to optimize retries, logging, and parallel execution. You can think of this section as the script that every integration step follows so different runtimes can play the same scene without improvising the details.

Requirements:

- **Request Blueprint** — Each integration step Must define a blueprint describing HTTP or RPC method, endpoint template, headers, body schema, and serialization rules. Blueprints Must support templating via workflow context (e.g., parameter substitution, secret resolution).
- **Response Handling** — Steps Must declare response parsing logic aligned with declared schemas, including error-class mapping. Engines Must surface unexpected responses as recoverable or fatal errors according to policy, capturing raw payloads for audit when permitted.
- **Idempotency Keys** — For state-changing operations, workflows Should specify idempotency keys derived from business identifiers. Engines Must propagate these keys to connectors that support idempotent semantics and Must document fallback strategies when providers lack native support.
- **Pagination and Streaming** — When operations return paginated or streaming data, the blueprint Must define continuation mechanics. Engines Should encapsulate pagination loops as explicit control-flow constructs rather than opaque handler code.
- **Rate-Limit Awareness** — Steps Must include declared rate-limit ceilings and backoff strategies. Engines Must throttle requests accordingly and emit telemetry when approaching limits.

## 5.3 Credential and Secret Management

Integrations cannot be secure without a robust approach to secret distribution and rotation. The specification mandates clear separation between workflow definitions and sensitive material, while giving executors hooks to fetch credentials securely at runtime. Put another way, workflows carry the map to a secret, not the secret itself, and engines are responsible for retrieving it just-in-time under strict supervision.

Requirements:

- **Secret References** — Workflow definitions Must reference secrets by logical identifiers (e.g., `secret://crm/api-key`) rather than embedding raw values. Engines Must resolve these references via approved secret stores at execution time.
- **Scope Declarations** — Each integration step Must specify the scopes or permissions it requires. Engines Must verify that the retrieved credential grants those scopes before callout, failing with a fatal error otherwise.
- **Rotation Policies** — Connectors Should publish rotation requirements (frequency, grace period). Engines Must expose hooks or automation to rotate secrets without redeploying workflows.
- **Audit Logging** — Credential access events Should be logged with principal, reason, and outcome. When regulations demand it, engines Must redact sensitive fields while preserving forensic utility.
- **Least-Privilege Defaults** — Workflows Should request the minimal scopes necessary. If a connector offers granular permissions, engines Must enforce least-privilege selection during binding.

## 5.4 Rate Limits, Quotas, and Backpressure

Integrations live within operational constraints imposed by providers and internal policies. Workflows need declarative expressions of those constraints so engines can coordinate retries, backpressure, and graceful degradation without ad hoc scripting. These clauses equip operators with the dials they need to keep external services healthy while honoring business priorities when limits bite.

Requirements:

- **Constraint Specification** — Steps Must declare applicable limits: requests per interval, concurrent connections, cost budgets. Engines Must track consumption against these constraints and preemptively defer execution when thresholds are near.
- **Backpressure Signals** — Engines Should emit standardized events (e.g., `rate_limit_imminent`, `quota_exhausted`) that downstream monitoring systems can observe. Workflows May subscribe to these events to trigger compensating actions.
- **Retry Policies** — The specification encourages explicit retry policies with jitter strategies. Engines Must honor declared maximum retries and backoff windows, and Must escalate to fatal errors when policies are exhausted.
- **Graceful Degradation** — Workflows Should declare degraded modes (reduced frequency, partial updates) when limits are hit. Engines Must transition into these modes deterministically and revert once constraints clear.
- **Global Coordination** — In multi-tenant environments, engines May need shared state to enforce tenant-wide quotas. Shared coordination mechanisms Must maintain isolation boundaries and Must not leak tenant metadata.

By describing connectors, credentials, and operational constraints declaratively, the specification enables the same workflow artifact to run across different integration platforms while preserving security and compliance guarantees. Annex C contains a purchase-order fulfillment example that demonstrates connector discovery, secure credential resolution, and throttling responses in practice.
