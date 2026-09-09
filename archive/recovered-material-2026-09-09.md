# Recovered material — editorial archive

**Project:** Notes on Building Better AI Tutors  
**Archived:** 9 September 2026  
**Status:** Working source material, not automatically published

## Purpose

This file preserves the material recovered from the earlier AI tutor conversations and separates three things that can otherwise get mixed together:

1. ideas already represented on the live notes page;
2. missing chapters that should be developed;
3. the order in which the website should publish them.

The archive records only what was recovered. Any new framing below is marked as an editorial recommendation rather than original recovered text.

## Recovered sections

| Section | What it contributes | Current overlap | Editorial status |
|---|---|---|---|
| The questions every AI tutor should answer | A diagnostic test for whether a system knows enough to tutor | This is the current live notes page | Published foundation |
| Architecture spine | The components and loops that turn a language model into a tutoring system | The homepage names some layers, but the notes do not yet connect them | **Publish first** |
| VanLehn’s *Behavior of Tutoring Systems* | A way to look beneath features and compare what tutoring systems actually do | Partly reflected in “What should happen next?” | Publish after the spine |
| Gamification vs gameful design | Separates reward wrappers from experiences that make thinking worth doing | Partly reflected in completion, help-seeking and absence questions | High-priority chapter |
| The tutor with a thousand faces | The tutor changes roles across moments without becoming inconsistent | Partly reflected in the relationship question | High-priority chapter |
| Personality and relationship layer | Personality matters only when it changes pedagogical action | Relationship exists, but the action logic is missing | Merge with “thousand faces” |
| Parents in the loop | Treats the parent as part of the system without making the child a surveillance object | Only lightly implied in the goal and escalation questions | Develop after relationship |
| Learner model | A living, uncertain account of knowledge, behaviour, confidence, goals and context | Strongly represented in current questions | Deepen later; avoid duplication |
| Diagnosis | Infers why an answer or pattern occurred before selecting an intervention | Strongly represented in current questions | Deepen later with mechanisms |
| Multimodal content | Chooses representations for a concept and learner, rather than decorating chat | Represented by one question | Expand after the decision model |
| Company and product notes | Evidence, patterns and provocations from products in the field | Mentioned on the homepage, absent from the notes | Keep as field notes, not the spine |

## Recovered anchor lines

These are the canonical lines recovered from the earlier discussion. Preserve their wording unless there is a strong editorial reason to change it.

> The dashboard becomes the curriculum.

> The student is the hero. The tutor changes roles, but not character.

> A fluent conversation is only one loop of tutoring.

> Helpfulness can reduce learning.

> Personality and relationship only matter if they change what the tutor chooses to do.

> If we remove the points, streak and mascot, is there still something here the student wants to understand?

## What the current website already does well

The live page already asks strong questions about goals, trajectory, genuine understanding, false confidence, correct and wrong answers, misconceptions, prerequisites, forgetting, productive struggle, next actions, representations, completion, help-seeking, absence, emotion, memory boundaries, human escalation and uncertainty.

That is a strong **evaluation lens**: it tells us what a serious tutor should be able to answer.

What it does not yet provide is a **system model**: where the evidence comes from, how the models interact, who chooses the next action, how the result updates the system and how longer-term goals constrain each short conversation.

## Editorial recommendation: what to publish first

### 1. The architecture spine

This should be the next addition because it gives every later note a place. Without it, learner modelling, motivation, personality and multimodality can read like a collection of desirable features.

The simplest spine is:

**Sense → model → decide → teach → measure → update**

It should show, at minimum:

- a subject and exam model;
- a learner model with uncertainty;
- goals, constraints and a plan;
- diagnosis of the present state;
- pedagogical policy or next-best-action selection;
- dialogue, practice and multimodal teaching;
- memory and review over time;
- motivation, habit and relationship;
- parent, teacher and human escalation;
- evaluation, safety and governance.

The main argument: the chat interface is one surface of the system, not the system itself.

### 2. The tutoring decision loop

Build this around two recovered lines:

- “A fluent conversation is only one loop of tutoring.”
- “Helpfulness can reduce learning.”

This chapter should distinguish answering from tutoring. A system can be clear, warm and immediately helpful while doing too much of the student's thinking. The important question is not merely “Was the response good?” but “What did the student have to retrieve, explain, compare, attempt or revise?”

VanLehn belongs here as evidence and vocabulary, not as a detached paper summary.

### 3. Gamification vs gameful design

This is one of the project's clearest differentiators. Keep the recovered test at the centre:

> If we remove the points, streak and mascot, is there still something here the student wants to understand?

The chapter should compare reward mechanics with curiosity, agency, meaningful challenge, visible consequence, identity, mastery and social belonging. It should also connect motivation to the learner model: absence, avoidance and low effort do not all require the same intervention.

### 4. The tutor with a thousand faces

Merge the personality and relationship material into one chapter. Its central rule is:

> The student is the hero. The tutor changes roles, but not character.

The tutor may act as explainer, coach, examiner, challenger, planner, collaborator or quiet observer. Role selection should depend on evidence and pedagogical need. Personality is useful only when it changes what the tutor notices, remembers, chooses or withholds.

### 5. Parents in the loop

Add this after the relationship model so the boundary is clear. The parent layer should support goals, routines, context and escalation without turning the tutor into a surveillance dashboard. Decide what the parent sees, what remains private, what requires consent and when the student should speak for themselves.

### 6. Multimodal content

Expand the existing representation question into a decision framework: when should the tutor use text, equations, diagrams, graphs, simulations, worked examples, manipulatives, audio or video? The key problem is representation selection and transition, not content variety.

### 7. Learner model and diagnosis deep dives

These are central, but the existing page already introduces them well. Develop them after the architecture and decision loop, when their inputs, outputs and responsibilities are easier to explain. Add mechanisms, uncertainty, evidence decay, competing hypotheses and examples from difficult exam preparation.

### 8. Company and product notes

Publish these as field notes attached to the relevant layer. Companies and papers should support an argument, not determine the site's structure. A reader should be able to understand the idea without knowing the company.

## Recommended first website batch

Do not begin by publishing eight long chapters. Add one new opening topic to the current notes page:

**Topic:** The complete tutoring system  
**Description:** A conversation is one surface. What must exist behind it for the system to observe, decide, teach and improve over time?

Suggested questions:

1. **Why is a chatbot not yet a tutor?**  
   Fluency can make the system feel complete. But a tutor must connect each conversation to a subject model, a learner model, a goal, a teaching decision and evidence of what changed.

2. **What loops make tutoring complete?**  
   The conversation loop explains and responds. The learning loop diagnoses, selects an action, observes the student's work and updates its belief. The longer loop plans across days, protects memory, sustains effort and coordinates with humans.

3. **What is the architecture spine?**  
   Sense what the student does. Model what it may mean. Decide what should happen next. Teach through the right action and representation. Measure the result. Update the learner, plan and future policy. Keep uncertainty and safety visible throughout.

4. **Where does the moat come from?**  
   Not from chat alone. It comes from the compounding connection between curriculum structure, longitudinal learner evidence, diagnostic quality, pedagogical decisions, a rich bank of teaching actions and credible learning outcomes.

This batch gives the current twenty questions a unifying frame without forcing a redesign.

## Proposed information architecture

For now, keep the current question-based notes page as the main public entry point.

As the material grows, use three levels:

- **Start here:** the complete tutoring system and architecture spine;
- **Deep dives:** learner model, diagnosis, pedagogy, memory, motivation, relationship, multimodality, human layer, evaluation and safety;
- **Field notes:** companies, products, papers and experiments attached to those layers.

Avoid creating a separate page for every idea too early. First make the conceptual map coherent; split chapters only when an entry becomes too long to scan in the current answer panel.

## Working rule for future notes

Each published note should answer four things:

1. What problem is this layer solving?
2. What evidence does it use?
3. What decision does it change?
4. How would we know it improved learning?

If an idea cannot yet answer these, keep it in the archive as research rather than presenting it as part of the architecture.

## Repository notes

- The live AI tutor page loads **`content.json`**.
- **`content.js`** is a legacy duplicate and should not be edited as the source of truth.
- PageCMS is configured to edit **`content.json`** directly.
- The archive is intentionally separate from the live content so unfinished thinking is preserved without appearing as published copy.
