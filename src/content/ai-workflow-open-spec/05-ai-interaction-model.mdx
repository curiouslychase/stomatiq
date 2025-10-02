# 4. AI Interaction Model

## 4.1 Model Invocation Contract

AI steps sit on top of volatile providers whose behavior can change as models are retrained. To preserve interoperability and auditability, invocations need a predictable envelope that declares the capability being exercised, the resources involved, and the compliance constraints that apply. This paragraph frames the minimum metadata an engine must gather before it can call out to a model provider. Put differently, every call to an AI service should read like a signed work order—clearly stating what service is being requested, under what limits, and with which privacy guarantees—so that different vendors can fulfill it without guesswork.

Requirements:

- **Capability Declaration** — AI-centric steps Must declare the model capability they require (`language_model.generative`, `embedding.vectorize`, `vision.image_caption`, etc.). Runtimes Must map these capabilities to compatible providers or refuse execution with a deterministic error.
- **Invocation Envelope** — Each AI invocation Must package the following fields: model identifier (or abstract class), version hint, input payload, control parameters, and metadata for tracing (correlation IDs, request origin). Providers lacking certain fields Must negotiate defaults before execution.
- **Deterministic Inputs** — Inputs to AI models Must be fully deterministic after preprocessing. When upstream data is stochastic, the workflow Must include normalization steps (sorting, deduplication, canonical formatting) so the AI step receives a reproducible prompt structure.
- **Resource Constraints** — Steps Must state resource requirements (max tokens, latency budget, cost ceiling). Engines Should enforce these via provider-specific limits and Must surface violations as recoverable errors with actionable diagnostics.
- **Privacy and Compliance Flags** — AI invocations Must carry data classification markers (PII, PHI, proprietary). Execution engines Must ensure the selected model/provider meets the declared compliance requirements or abort prior to dispatch.

## 4.2 Prompt Construction and Context Windows

Prompt engineering cannot be left implicit—every engine must know how to assemble instructions, runtime context, and retrieved knowledge in a deterministic order. This subsection focuses on how prompt plans are declared, how context is trimmed, and how tools augment the conversation without surprising downstream steps. The goal is to let designers storyboard the conversational flow while giving implementers a reproducible recipe for stitching together instructions, retrieved snippets, and tool outputs.

Requirements:

- **Prompt Plan** — Workflows Must describe prompt composition using a declarative plan: system instructions, context blocks, user inputs, tool outputs, and formatting rules. Plans Should be modular to enable tooling-assisted editing and localization.
- **Context Window Management** — Steps Must declare maximum context size and trimming strategy (e.g., recency-based, salience scoring). Engines Must apply the declared strategy deterministically and log truncation events for observability.
- **Grounding and Retrieval** — When prompts depend on retrieved data, the workflow Must specify retrieval parameters (sources, filters, ranking) and Must mark retrieved snippets with provenance metadata so downstream steps can audit responses.
- **Tool Augmentation** — Prompt plans May include tool call schemas (function signatures, slot constraints). Engines Must guarantee that tool invocation requests adhere to declared schemas and Must validate tool responses before reinserting them into the prompt stream.
- **Multilingual and Multimodal Support** — Workflows Should specify language expectations and modality combinations (text, audio, image). Engines lacking required modality support Must reject execution unless a fallback path exists.

## 4.3 Output Interpretation and Validation

An AI step is only useful if its outputs can be trusted by deterministic systems downstream. This clause defines the guardrails for validating responses, propagating uncertainty, and escalating to humans when automated repair cannot meet policy thresholds. Readers can think of this as the “quality control bay” where every AI response is inspected, polished, or escalated before it enters the production line of subsequent steps.

Requirements:

- **Structured Output Contracts** — AI steps Must specify expected output formats (e.g., JSON schema, regex template, XML). Engines Must enforce post-generation validation and trigger automated repair strategies (re-prompting, schema coercion) when validation fails.
- **Confidence Attribution** — Outputs Should include confidence signals (model-provided scores, heuristic certainty). When available, engines Must propagate these signals so downstream steps can adjust behavior (e.g., request human review on low confidence).
- **Safety Filters** — Workflows Must define safety criteria (disallowed topics, toxicity thresholds, bias mitigations). Engines Must run outputs through the declared filters and convert violations into recoverable or fatal errors per policy.
- **Error Repair Loop** — Steps May define a structured repair loop: validation actions, re-prompt instructions, max iterations. Engines Must honor iteration caps to prevent infinite loops and log each repair attempt with rationale.
- **Human Escalation Triggers** — The workflow Should declare conditions that escalate AI outputs to human reviewers (low confidence, high impact decisions, ambiguous classifications). Engines Must pause execution and collect feedback before proceeding.

## 4.4 Adaptive Strategies for Nondeterminism

Even with careful prompting, AI systems remain probabilistic. The specification therefore mandates explicit controls over randomness, caching, fallback paths, and drift monitoring so that operators can reason about changes over time and audit decisions after the fact. These controls give platform owners levers to keep behavior stable week-to-week and provide investigators a paper trail when outcomes diverge.

Requirements:

- **Determinism Envelope** — AI steps Must describe how nondeterminism is bounded: temperature settings, nucleus sampling thresholds, prompt randomization toggles. Engines Must enforce or simulate these settings when calling providers.
- **Caching and Replay** — Workflows May request caching of AI responses keyed by prompt fingerprint. When enabled, engines Must check caches before new invocations and provide deterministic replay logs for auditing.
- **Majority Voting and Ensembles** — For critical outputs, workflows Should support ensemble strategies (multiple model runs, cross-model voting). Engines Must orchestrate ensembles deterministically, capturing each member result and the aggregation decision.
- **Fallback Models** — Steps May specify fallback providers when the primary model fails or violates policies. Fallback chains Must be acyclic and Must document capability differences so implementers understand behavioral shifts.
- **Monitoring Drift and Degradation** — Workflows Should declare drift detection criteria (performance thresholds, distribution shifts). Engines Must emit telemetry aligned with these criteria and provide hooks for automated or human-triggered retraining/adjustment workflows.

These requirements ensure AI interactions remain predictable, auditable, and interoperable even as underlying models evolve. Annex B provides a worked customer-support triage example that demonstrates how the invocation, prompting, validation, and adaptation clauses work together in a real workflow.
