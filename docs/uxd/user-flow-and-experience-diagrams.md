---
domain: green-lappe-properties
category: design
sub-category: user-flow-diagrams
date-created: 2026-05-21
date-revised: 2026-05-21
doc-type: user-flow
version: 0.1
doc-status: draft
aliases: []
tags:
  - green-lappe
  - mermaid
  - service-blueprint
  - user-flow
  - uxd
personas:
  - renter
  - small-landlord
  - property-management-staff
---

# User Flow And Experience Diagrams

This standalone Mermaid.js diagram set translates the existing persona, pain-point, and journey research into service-design flows for Green Lappe Properties. It is a design artifact, not legal, licensing, insurance, tax, privacy, cybersecurity, records-retention, or trust-accounting advice.

Use these diagrams to align discovery calls, prototype scope, operating runbooks, and UX requirements without closing launch gates or inventing outside approvals.

## Diagram Map

| Diagram | Purpose |
| --- | --- |
| Service operating model | Shows the three-sided experience across renter, owner, PM staff, vendors, and compliance checkpoints. |
| Renter lifecycle | Maps the renter journey from listing discovery through deposit closeout. |
| Owner lifecycle | Maps small-landlord onboarding, management, reporting, and exit risk. |
| Staff operations loop | Shows the day-to-day internal workflow that must protect staff from unmanaged load. |
| Maintenance recovery | Details the highest-priority trust-repair flow. |
| Multilingual screening | Frames the language-access and portable-screening opportunity. |
| Deposit closeout | Creates a transparent move-out evidence and reconciliation flow. |
| Owner statement transparency | Shows monthly reporting and repair-approval trust points. |
| Compliance-gated notice workflow | Keeps notice work behind jurisdiction and review gates. |
| UX state model | Defines user-facing system states and recovery paths. |
| Metrics loop | Connects journey moments to operating measures. |
| Prototype scope | Separates launchable experience concepts from blocked business approvals. |

## Service Operating Model

```mermaid
flowchart LR
    R[Renter household] -->|Inquiry, application, rent, requests| PX[Green Lappe service layer]
    O[Small landlord owner] -->|Property goals, approvals, documents| PX
    S[PM staff] -->|Triage, coordination, communication| PX
    PX -->|Status, receipts, decisions| R
    PX -->|Statements, exceptions, evidence| O
    PX -->|Queues, templates, escalation rules| S

    PX --> V[Vendor network]
    V -->|Estimates, photos, invoices| PX
    PX --> C[Compliance and launch gates]
    C -->|Jurisdiction checks, review holds| PX

    subgraph Trust_Breakers[Trust breakers to design against]
      TB1[Communication black holes]
      TB2[Fee and statement opacity]
      TB3[Maintenance silence]
      TB4[Unclear notice requirements]
      TB5[Deposit disputes]
    end

    TB1 -. mitigated by .-> PX
    TB2 -. mitigated by .-> PX
    TB3 -. mitigated by .-> PX
    TB4 -. gated by .-> C
    TB5 -. evidence handled by .-> PX
```

## Renter Lifecycle

```mermaid
flowchart TD
    A[Find listing] --> B{Listing verified?}
    B -->|No| B1[Flag stale, missing, or mismatched listing data]
    B -->|Yes| C[Ask question or schedule tour]
    B1 --> C
    C --> D{Language or accessibility support needed?}
    D -->|Yes| D1[Route to supported-language intake or accommodation path]
    D -->|No| E[Submit application]
    D1 --> E
    E --> F{Portable screening accepted?}
    F -->|Yes| G[Review application without duplicate screening charge]
    F -->|No or unavailable| H[Explain screening cost and criteria before payment]
    G --> I{Approved?}
    H --> I
    I -->|No| J[Send clear adverse-action or waitlist status]
    I -->|Yes| K[Lease and move-in checklist]
    K --> L[Shared condition evidence]
    L --> M[Tenancy dashboard]
    M --> N{Need help?}
    N -->|Maintenance| O[Maintenance recovery flow]
    N -->|Billing| P[Explain charge and payment options]
    N -->|Renewal or notice| Q[Compliance-gated notice workflow]
    O --> M
    P --> M
    Q --> M
    M --> R[Move-out notice]
    R --> S[Deposit closeout flow]
    J --> T[Relationship ends with clear status]
    S --> U[Relationship ends with receipt and evidence]
```

## Owner Lifecycle

```mermaid
journey
    title Small-landlord experience target
    section Evaluate PM fit
      Compare pricing and terms: 2: Owner
      Understand all-in fees: 4: Owner
      Confirm service boundaries: 4: Owner
    section Onboard property
      Share goals and constraints: 4: Owner
      Collect documents and condition evidence: 4: Owner
      Identify launch blockers: 3: Owner
    section Lease-up
      Approve listing package: 4: Owner
      Track applicant status: 4: Owner
      Review screening exceptions: 3: Owner
    section Operate
      Receive maintenance alerts: 4: Owner
      Approve large repairs: 4: Owner
      Read monthly statement: 5: Owner
      Review compliance-gated notices: 3: Owner
    section Renew or exit
      Compare renewal options: 4: Owner
      Offboard with documents: 4: Owner
      Close reserve and final statement: 4: Owner
```

## Staff Operations Loop

```mermaid
flowchart TD
    Q[Unified intake queue] --> T{Request type}
    T -->|Prospect| P[Leasing workflow]
    T -->|Renter issue| R[Tenant support workflow]
    T -->|Owner question| O[Owner support workflow]
    T -->|Vendor update| V[Maintenance coordination]
    T -->|Notice or compliance| C[Compliance-gated workflow]

    P --> SLA[Visible SLA and next owner]
    R --> SLA
    O --> SLA
    V --> SLA
    C --> HOLD[Review hold until proper input exists]

    SLA --> W{Workload healthy?}
    W -->|Yes| X[Complete response and log evidence]
    W -->|No| Y[Escalate queue load, defer nonurgent work, protect on-call boundary]
    Y --> X
    HOLD --> X
    X --> Z[Metrics, templates, and backlog feedback]
    Z --> Q
```

## Maintenance Recovery Flow

```mermaid
sequenceDiagram
    participant T as Renter
    participant P as Service portal
    participant M as Maintenance coordinator
    participant O as Owner
    participant V as Vendor

    T->>P: Submit issue with photos or video
    P->>T: Confirm receipt, urgency, and next update time
    P->>M: Create triage task with SLA timer
    M->>M: Classify emergency, habitability, routine, or owner-choice item
    alt Emergency or habitability risk
        M->>V: Dispatch approved vendor
        M->>O: Notify owner with reason and evidence
    else Routine with approval threshold
        M->>O: Request approval with estimate and deadline
        O->>M: Approve, reject, or ask for alternatives
        M->>V: Schedule approved work
    end
    V->>P: Upload arrival, completion, photos, invoice
    P->>T: Send status and completion check
    T->>P: Confirm fixed or reopen
    P->>M: Close or escalate
```

## Multilingual Screening Flow

```mermaid
flowchart TD
    A[Prospect starts inquiry] --> B{Preferred language captured?}
    B -->|No| C[Ask language preference without changing screening priority]
    B -->|Yes| D[Use preferred-language status updates where available]
    C --> D
    D --> E{Portable screening report available?}
    E -->|Yes| F[Accept report when policy and source requirements are met]
    E -->|No| G[Explain required screening package before fee]
    F --> H[First-in-time timestamp and document checklist]
    G --> H
    H --> I{Missing documents?}
    I -->|Yes| J[Send specific missing-item notice]
    I -->|No| K[Evaluate against stated criteria]
    J --> H
    K --> L{Decision}
    L -->|Approve| M[Human-confirmed approval window]
    L -->|Deny| N[Clear denial or adverse-action communication]
    L -->|Waitlist| O[Queue position and next update time]
```

## Deposit Closeout Flow

```mermaid
stateDiagram-v2
    [*] --> MoveOutNotice
    MoveOutNotice --> PreMoveOutChecklist
    PreMoveOutChecklist --> SharedInspection
    SharedInspection --> EvidenceReview
    EvidenceReview --> NoDeductions: Normal wear or owner item
    EvidenceReview --> ProposedDeductions: Tenant-responsible item suspected
    ProposedDeductions --> InvoiceOrEstimateAttached
    InvoiceOrEstimateAttached --> RenterReview
    RenterReview --> Dispute: Renter contests item
    RenterReview --> FinalStatement: No dispute
    Dispute --> EvidenceComparison
    EvidenceComparison --> FinalStatement
    NoDeductions --> FinalStatement
    FinalStatement --> PaymentOrBalance
    PaymentOrBalance --> [*]
```

## Owner Statement Transparency

```mermaid
flowchart LR
    A[Rent collected] --> B[Trust-account ledger event]
    B --> C[Management fee line item]
    B --> D[Maintenance reserve movement]
    D --> E{Repair threshold exceeded?}
    E -->|Yes| F[Owner approval record]
    E -->|No| G[Pre-authorized work record]
    F --> H[Vendor invoice plus evidence]
    G --> H
    C --> I[Monthly owner statement]
    H --> I
    I --> J{Owner can reconcile?}
    J -->|Yes| K[Disbursement and receipt]
    J -->|No| L[Statement question workflow]
    L --> M[Clarify fee, invoice, or ledger event]
    M --> I
```

## Compliance-Gated Notice Workflow

```mermaid
flowchart TD
    A[Notice need identified] --> B[Property jurisdiction lookup]
    B --> C[Notice type selected]
    C --> D{Required owner, broker, counsel, or account-owner input present?}
    D -->|No| E[Hold in blocked state with missing input named]
    D -->|Yes| F[Generate draft from approved template]
    F --> G[Check timing, delivery method, and required attachments]
    G --> H{Review gate cleared?}
    H -->|No| E
    H -->|Yes| I[Send notice through approved channel]
    I --> J[Log delivery evidence outside sensitive-data paths]
    J --> K[Schedule follow-up and renewal or dispute workflow]
```

## UX State Model

```mermaid
stateDiagram-v2
    [*] --> New
    New --> WaitingOnUser: Needs renter or owner input
    New --> WaitingOnStaff: Needs internal triage
    WaitingOnUser --> Active: Input received
    WaitingOnStaff --> Active: Staff accepts next action
    Active --> WaitingOnVendor: Vendor scheduled
    Active --> WaitingOnApproval: Owner approval needed
    Active --> Blocked: Outside gate missing
    WaitingOnVendor --> Active: Vendor update received
    WaitingOnApproval --> Active: Approval received
    WaitingOnApproval --> Blocked: Approval missing after deadline
    Blocked --> Active: Missing input supplied
    Active --> Resolved: User confirms outcome or close criteria met
    Resolved --> Reopened: User contests or issue recurs
    Reopened --> Active
    Resolved --> [*]
```

## Metrics Loop

```mermaid
flowchart TD
    A[Journey event] --> B[Capture timestamp, actor, channel, and property]
    B --> C{Event category}
    C -->|Maintenance| D[Response time, dispatch time, fix confirmation, reopen rate]
    C -->|Leasing| E[Inquiry response, tour completion, application completion, approval clarity]
    C -->|Owner reporting| F[Statement questions, approval latency, reserve exceptions]
    C -->|Compliance gate| G[Blocked inputs, review cycle time, notice rework]
    C -->|Move-out| H[Deposit itemization clarity, dispute rate, closeout time]
    D --> I[Weekly operating review]
    E --> I
    F --> I
    G --> I
    H --> I
    I --> J[Backlog, template, training, or vendor-network update]
    J --> A
```

## Prototype Scope

```mermaid
flowchart LR
    subgraph Prototype_Now[Prototype now]
      A[Verified listing checklist]
      B[Inquiry status and language preference]
      C[Maintenance SLA dashboard]
      D[Owner statement explainer]
      E[Deposit evidence packet]
    end

    subgraph Needs_Input[Needs outside input before launch]
      F[Broker operating approvals]
      G[Counsel-reviewed notice templates]
      H[Trust-accounting workflow approval]
      I[Vendor service commitments]
      J[Public launch copy approval]
    end

    subgraph Do_Not_Assume[Do not assume]
      K[Legal conclusions]
      L[Insurance requirements]
      M[Licensing clearance]
      N[Domain, DNS, or hosting readiness]
      O[Market discovery findings]
    end

    Prototype_Now --> Needs_Input
    Needs_Input --> Do_Not_Assume
```
