# Investigation of a Multimodal Content Engine

## Central problem

STEM content was already abundant before generative AI. Across universities, teacher communities and independent developers, thousands of applets, simulations, virtual laboratories, manipulatives and modelling tools have accumulated over decades. AI has added another layer of abundance without making this ecosystem coherent.

A language model can draft an explanation, an image model can illustrate it, a video model can animate a prompt, and a coding agent can assemble an interface. These are meaningful capabilities. They do not yet constitute a content engine. Their outputs are frequently isolated artifacts: difficult to edit structurally, difficult to keep consistent across representations, and difficult to verify against the underlying mathematics or science.

The deeper production problem is therefore not simply generation:

> How can a system discover, understand, reuse, modernize and generate accurate STEM content—and preserve the meaning of the concept while moving between existing applets, new diagrams, animation, simulation, interaction and tutor dialogue?

This document investigates the technologies that may make such a system possible. It is deliberately solution-seeking. Company, community and individual-developer descriptions matter only when they reveal a production mechanism, architectural choice, limitation or opening.

The working thesis is that the future engine will not be one generative model. It will combine:

- A structured model of the concept
- An intermediate representation of the learning object
- Subject-specific primitives and constraint systems
- Several specialized renderers
- AI planning and code generation
- Render-feedback and automated repair
- Scientific and visual validators
- An authoring interface for experts
- A repository that retains editable sources, corrections and evidence
- A runtime capable of retrieving, parameterizing or composing verified content

This is architectural inference, not an established industry standard.

---

## 1. What the engine may need to produce

The output map is broader than “multimedia.” Each output has a different internal structure and should be investigated as a different production problem.

| Output family | Examples | Central technical problem |
|---|---|---|
| Text and symbols | Explanations, hints, derivations, equations, proofs | Semantic correctness, notation, consistency and controllable depth |
| Static diagrams | Free-body, ray, circuit, geometry and biological diagrams | Spatial constraints, labels, scientific conventions and editability |
| Linked representations | Equation–graph, macro–particle–symbolic, code–state | Preserving identity and causality across representations |
| Programmatic animation | Transformations, motion, derivations and processes | Temporal planning, object continuity, narration alignment and rendering |
| Interactive diagrams | Drag, construct, rotate, compare, predict | State, constraints, events, feedback and authorability |
| Simulations | Physics models, virtual labs, parameter exploration | Valid model, numerical behaviour, affordances and boundary conditions |
| Learning games | Puzzles, construction, debugging and system games | Learning mechanic, rules, level generation and solvability |
| 3D/spatial content | Molecules, anatomy, fields and spatial geometry | Scene generation, camera, interaction, performance and correctness |
| Audio and narration | Narrated slides, conversations and revision audio | Timing, terminology, prosody and synchronization with visuals |
| Runtime tutor content | A custom visual inserted during dialogue | Low latency, safe composition, context continuity and graceful fallback |

### Text and symbolic content

Text remains the semantic connective tissue. The engine must produce explanations at different levels, worked examples, question variants, hints, feedback and summaries. STEM adds formal requirements: mathematical notation, symbolic equivalence, units, dimensional analysis, chemical formulae and proof structure.

The important production shift is to stop treating the prose as the source of truth. If every graph, animation and question is independently generated from a paragraph, inconsistencies propagate. A structured concept model should sit beneath the prose.

### Static explanatory diagrams

These include free-body diagrams, ray diagrams, circuit diagrams, geometric constructions, molecular structures, annotated biological illustrations and economical whiteboard-like sketches.

Raster image generation is a weak default for many of these. Scientific diagrams need named objects, exact relationships, editable labels, stable coordinates and deterministic reuse. SVG, Canvas scene graphs, graph-layout systems, geometry solvers and domain-specific libraries are often more appropriate than pixels generated directly by a diffusion model.

### Linked representations

This is one of the most important and underdeveloped outputs.

- Move a point and its coordinates, equation and graph update.
- Change a charge and the field vectors and algebra respond.
- Move from a chemical observation to particle behaviour to symbolic equation.
- Step through an algorithm while code, state and memory remain synchronized.

Many products can display several modalities. Far fewer maintain a shared semantic state across them. A serious content engine must generate relationships, not just adjacent assets.

### Programmatic animation

Animation is useful when the concept depends on change, transformation, continuity or invisible mechanism. Manim is important because it represents mathematical animations as Python programs rather than opaque video clips.^1 This makes scenes parameterizable and gives AI something structured to generate.

But programmatic animation introduces its own problems:

- The code can execute while the visual remains poor.
- Objects collide or disappear between keyframes.
- Narration and highlighting drift out of sync.
- A mathematically correct explanation can be visually incoherent.
- The resulting video remains passive unless the scene model survives rendering.

The frontier is therefore not text-to-Manim alone. It is semantic planning, code generation, renderer-in-the-loop inspection, localized repair, and preservation of an interactive scene after animation.

### Interactive diagrams and manipulatives

An interactive diagram contains at least:

- Visual objects
- State
- Constraints
- Inputs and events
- Transitions
- Derived values
- Feedback conditions
- Reset and recovery behaviour

The production challenge is authoring these relationships cheaply. Brilliant’s internal Diagrammar is a particularly relevant lead. A public Strange Loop talk presents it as a tool for making interactive diagrams using Elm.^2 The reason to inspect it is not a superficial preference for Elm. It is to understand how a content team created reusable abstractions between an idea and a working interaction.

### Simulations

Simulations add a model layer:

- Variables and parameters
- Equations or rules
- Initial and boundary conditions
- Numerical update
- Observable states
- Learner controls
- Model limitations

PhET is useful as an engineering reference as well as a learning reference. Its HTML5 simulations are open source, and its development ecosystem exposes reusable libraries and patterns for browser-based scientific interactives.^3 The important question is what can be modularized: physics model, view, control, instrumentation, accessibility, teacher support, or all of them.

### Learning games

AI can easily generate the theme, story, images and surface rewards of a game. The difficult part is the mechanic.

In a genuine learning game, the knowledge being learned changes the player’s decisions. The content engine must represent:

- Rules and legal actions
- Goals and failure states
- Conceptual constraints
- Feedback caused by the learner’s action
- Level parameters
- Difficulty progression
- Solvability
- Mastery conditions

This suggests a “learning-mechanic library,” not only a UI component library. Reusable mechanics might include balancing a system, constructing under constraints, finding an invariant, debugging a broken model, predicting before running, or optimizing against a scientific rule.

### 3D, XR and world models

3D is essential for some spatial concepts and unnecessary for many others. WebGL, Three.js and game engines provide controllable scenes; generated world models introduce a different possibility.

DeepMind’s Genie research generates action-controllable environments from visual or textual prompts, while Genie 3 is described as a general-purpose world model for real-time interactive environments.^4 These systems are not educational simulation engines. Their relevance is directional: generative media may become interactive rather than fixed. For STEM, visual plausibility is insufficient. A world must obey the intended scientific model and expose it to inspection.

---

## 2. Three technological paths

Current work falls into three broad paths.

### Path A: generate several media outputs

Input content is transformed into immersive text, images, slides, narration, audio, quizzes, mind maps or video. Google Research’s Learn Your Way is the strongest public example found in this investigation. It uses multi-step agentic workflows, general models and specialized fine-tuned components; Google reports that general image models were insufficient for educational visuals, leading the team to fine-tune a dedicated illustration model.^5

The production logic is approximately:

    source → personalized text → multiple generated representations

What this solves:

- Conversion of source material into several formats
- Personalization propagated across media
- A practical orchestration model for specialized generators
- Faster production of familiar content forms

What remains open:

- Whether all outputs share a formal semantic model
- Whether generated visuals are editable objects or finished images
- Whether representations remain linked at runtime
- How scientific consistency is verified across every output
- Whether the system can generate constrained simulations and learning mechanics

The lesson is not “use several agents.” The stronger lesson is that specialized educational visual generation may require dedicated data, models and QA rather than a general image prompt.

### Path B: generate executable code and repair it

The second path asks an LLM to create code for Manim, HTML, SVG, Canvas, React, a game engine or another runtime. Code provides structure, editability and testability that raw pixels do not.

Recent Manim research illustrates the direction:

- Manimator separates interpretation into a structured scene description before generating Manim code.^6
- LLM2Manim reports a human-in-the-loop pipeline with constrained prompts, a symbol ledger, targeted regeneration and expert review.^7
- OmniManim introduces explicit visual planning, shared scene state, post-render diagnostics and localized repair.^8
- A Symbolic Geometric Agent extracts scene geometry and targets spatial conflicts before rendering.^9
- ManimAgent explores storing successful rationales and validated failure patterns across tasks.^10

These are mostly recent preprints, so their claims need replication. Together they expose a useful engineering pattern:

    intent → structured plan → code → render → inspect → localize fault → repair

This path is promising because the output can be compiled and tested. But render success, visual similarity and a clean screenshot do not establish scientific or educational quality.

### Path C: compile structured specifications

The third path begins with a declarative specification rather than pixels or arbitrary application code.

Vega-Lite demonstrates the power of a concise JSON grammar that compiles into interactive visualizations.^11 Its importance here is architectural: a high-level grammar reduces the search space, creates valid defaults, enables composition and makes outputs portable across tools. Research such as Cicero extends this idea to reusable responsive transformations.^12

Diagrammar appears to be education-specific and interactive. Desmos Computation Layer lets components inside an activity communicate, while GeoGebra exposes APIs for creating, updating, listening to and persisting dynamic mathematical objects.^13 These systems each encode part of an interactive’s behaviour in a form above raw rendering code.

The opportunity is an education-specific intermediate representation that contains:

- Scientific entities and variables
- Relationships and invariants
- Visual encodings
- Learner actions
- State transitions
- Feedback rules
- Pedagogical function
- Rendering targets
- Validation rules

This path is the most ambitious and may be the most defensible. It is also the easiest to overdesign. A universal language for all STEM could collapse under subject-specific complexity.

### Likely architecture: combine all three

A complete engine may use structured specifications for durable content, executable code generation for unusual objects, and media generation for illustrations, narration or connective material.

| Need | Likely best method |
|---|---|
| Exact reusable graph | Declarative specification |
| Bespoke animated proof | Planned programmatic generation |
| Atmospheric contextual image | Generative media |
| Core physics simulation | Verified model plus reusable runtime |
| Novel one-off interactive | Code generation inside a constrained component system |
| Runtime tutor explanation | Retrieve and parameterize first; generate only where safe |

---

## 3. The proposed content substrate

The central technical hypothesis is that the engine needs a durable intermediate representation between learning intent and final rendering.

Call it a Multimodal Learning Object Specification.

It might contain:

    concept: conservation_of_mechanical_energy
    objective: connect_height_speed_and_energy

    entities:
      cart: [mass, position, velocity]
      track: [height, shape]

    invariants:
      - total_mechanical_energy_is_constant
      - units_are_consistent

    representations:
      - physical_scene
      - energy_bar_chart
      - velocity_graph

    actions:
      - predict
      - change_height
      - change_mass
      - release
      - explain

    misconception:
      speed_depends_on_mass:
        intervention: compare_two_masses_from_same_height

This is an illustration, not a proposed standard.

### Why an intermediate representation matters

It separates four concerns:

1. **What is true:** entities, variables, rules and constraints.
2. **What should be learned:** objective, misconception and intended reasoning.
3. **What the learner can do:** actions, states and feedback.
4. **How it appears:** renderer, visual design, motion and layout.

Without this separation, changing visual style risks changing behaviour; changing behaviour risks breaking science; and every new output becomes a new implementation.

### What it could compile into

- Static SVG for a revision page
- Canvas interaction
- Manim animation
- Rive stateful illustration
- WebGL scene
- Printable worksheet
- Parameterized assessment
- Tutor-embedded generative interface

The system does not need every object to compile to every target. The research question is how much meaning can be shared before renderer-specific details take over.

### Universal core versus subject extensions

A minimal shared core might describe:

- Entities
- Properties
- Constraints
- Representations
- Views
- Actions
- State
- Feedback
- Parameters
- Evidence events

Subject packages would add:

- Symbolic algebra and proof
- Geometry constraints
- Units and dimensional analysis
- Vectors and fields
- Molecular and bond grammar
- Reactions and stoichiometry
- Biological scale and causal processes

The safer direction may be a family of compatible DSLs rather than one language that attempts to express everything.

---

## 4. Content primitives and learning mechanics

AI generation becomes more reliable when it composes known primitives rather than inventing the entire scene.

### Visual primitives

- Axes, grids, points, lines, curves and regions
- Vectors, forces, velocities and fields
- Rays, lenses and mirrors
- Particles, waves, springs and pulleys
- Atoms, bonds, orbitals and reaction arrows
- Cells, organs and pathways
- Labels, callouts, focus masks and measurement devices

Each primitive can include:

- Parameters
- Valid ranges
- Coordinate behaviour
- Visual tokens
- Interaction affordances
- Accessibility description
- Automated tests
- Renderer implementations

### Interaction primitives

- Drag, rotate, connect and construct
- Measure, sort and classify
- Change parameter
- Scrub time
- Run, pause and reset
- Compare states
- Predict then reveal
- Explain a change

Rive is relevant here because its state machines define animation states and transitions, and its data-binding model connects structured view-model data to scene properties.^14 This can support responsive scientific illustrations, although complex scientific simulation should remain in a model designed for that purpose.

### Learning mechanics

The reusable unit can be larger than an interaction:

- Predict–observe–explain
- Compare cases
- Find the invariant
- Build a valid model
- Repair a broken model
- Fade steps in a worked example
- Test a boundary condition
- Make an estimate, then measure

Brilliant describes its product as interactive learning by doing, with learners manipulating visual models and receiving immediate feedback.^15 The technically interesting question is whether these experiences are assembled from reusable mechanics or primarily handcrafted. Diagrammar should be studied as evidence toward that question, not treated as a complete public architecture.

---

## 5. Subject-specific engines

### Mathematics

Core systems:

- Computer algebra and symbolic equivalence
- Typesetting and layout
- Coordinate geometry
- Function plotting
- Constraint-based geometry
- Proof objects and transformation sequences
- Multiple valid solution paths

GeoGebra demonstrates the value of one engine connecting geometry, algebra, graphing, statistics and calculus; its platform also reports a repository of more than one million community resources.^16 For an AI engine, its object API and update events are more relevant than its user-interface surface.

### Physics

Core systems:

- Units and dimensional constraints
- Coordinate frames
- Vectors and fields
- Free-body models
- Numerical solvers
- Collision and motion systems
- Linked physical, graphical and algebraic views
- Explicit model assumptions

An electrostatics problem involving two charges can become one structured object with a static diagram, animated field vectors, a draggable test charge, equations and parameterized variants. The engine should not generate these independently. Charge, position and field direction should be shared state.

### Chemistry

Core systems:

- Molecular graphs
- Bond and valence rules
- Structure layout
- Reaction equations
- Stoichiometry
- Mechanism representation
- Molecular geometry
- Macroscopic–particle–symbolic linking
- Experiment safety constraints

Chemistry exposes the weakness of generic image generation: a plausible-looking molecule or apparatus can be scientifically wrong. Structured molecular and reaction representations should drive the view.

### Biology

Core systems:

- Hierarchy and scale
- Anatomy and spatial relations
- Processes and causal networks
- Classification
- Source-grounded illustration
- Variation and uncertainty
- Time-dependent systems

Biology may require more retrieved and expert-authored illustration than mathematics. The engine should allow different trust models by subject rather than forcing one generation policy.

---

## 6. The AI-native authoring environment

The content engine needs a human interface, not only an API.

The ideal environment would support:

- Natural-language brief
- Sketch or reference upload
- Generated concept model
- Several representation strategies
- Editable scene graph
- Direct manipulation
- Conversational editing
- Code view for developers
- Locking correct layers
- Multi-state preview
- Test and validation panel
- Version comparison
- Component and pattern extraction

The design problem resembles Figma, CAD, animation tools, game editors and scientific notebooks at once. No single interface should expose all of this complexity to every role.

### Progressive modes

**SME mode**

- Inspect science, equations and constraints
- Correct labels, rules and assumptions
- Approve scientific meaning

**Learning-design mode**

- Define objective, misconception, action and feedback
- Choose representation strategy
- Change sequencing and scaffolding

**Visual-design mode**

- Control layout, hierarchy, motion and style
- Edit reusable visual components

**Developer mode**

- Inspect source, renderer, dependencies and tests
- Extend primitives and runtime behaviour

The important technological idea is bidirectional editing. Moving an object on the canvas should update its structured representation; changing the specification should update the view. Natural-language edits should be localized rather than regenerate the entire artifact.

Google’s InstructPipe offers an adjacent pattern: an LLM selects predefined visual-programming nodes, generates a graph and renders it into an editable visual workspace.^17 The lesson is that AI can compose an existing node vocabulary while keeping the result inspectable.

---

## 7. Generation, rendering and repair

### Why single-pass generation fails

Code is not its rendered output. A scene can compile but have:

- Overlapping labels
- Incorrect scale
- Broken continuity
- Unreachable states
- Inconsistent symbols
- Poor timing
- Mobile layout failure

The engine needs a feedback loop.

### Proposed loop

    brief
      → semantic plan
      → layout/state plan
      → code or specification
      → render representative states
      → deterministic tests
      → multimodal critique
      → localized repair
      → expert approval

OmniManim’s explicit visual planning and post-render diagnostics, and SGA’s extraction of symbolic scene geometry, suggest two complementary approaches: learn layout priors and enforce geometric constraints.^8,9

### Shared scene state

The engine should retain:

- Object identities
- Bounding boxes
- Z-order
- Coordinate spaces
- Dependencies
- Current state
- Transitions
- Narration timestamps
- Camera
- Renderer-specific properties

This enables consistent repair. “Move this equation down” should not destroy its relationship to the highlighted term or narration cue.

### Representative-state testing

Interactive content cannot be validated from its initial screenshot. The system should:

- Enumerate or sample reachable states
- Trigger actions
- Capture frames
- Check layout and values
- Test resets
- Test boundary parameters
- Compare derived values with reference calculations

WebVIA, though not educational, is relevant because it combines multi-state UI exploration, executable code generation and interaction validation.^18 The same principle is necessary for generated learning interactives.

---

## 8. Scientific and visual validation

Validation should be layered.

### Deterministic scientific validation

- Mathematical equivalence
- Units and dimensions
- Domain and parameter bounds
- Geometry constraints
- Graph/data consistency
- Conservation laws
- Chemical valence and balance
- Numerical solver checks
- State reachability
- Level solvability

### Deterministic production validation

- Syntax and compilation
- Missing assets
- Broken dependencies
- Responsive layout constraints
- Text overflow
- Contrast thresholds
- Runtime performance
- Event and reset behaviour

### Multimodal model critique

- Compare specification with render
- Inspect diagram meaning
- Detect mismatched narration and view
- Identify visually hidden relationships
- Propose localized repairs

### Expert review

- Scientific approval
- Representational approval
- Interaction and learning-design approval
- Visual art direction

The engine should expose what was verified and what remains model judgment. “Passed validation” must not collapse these different confidence levels.

### Correction memory

Each human correction should be classified:

- Scientific-rule failure
- Missing constraint
- Wrong representation
- Layout failure
- Motion-continuity failure
- Interaction-state failure
- Misconception risk
- Style-system violation

The correction can become:

- A validator
- A new constraint
- A better few-shot example
- A known pitfall
- A revised primitive
- Training or evaluation data

ManimAgent’s dual memory of successful rationales and validated failure patterns is an early research analogue.^10 The larger product opportunity is to turn expert production corrections into durable system improvements.

---

## 9. Design system as technology

Generated content will look incoherent unless design decisions are formalized.

The design system should encode:

- Colour semantics
- Mathematical typography
- Line, arrow and object conventions
- Label placement
- Spatial hierarchy
- Focus and annotation
- Motion grammar
- Transition meaning
- Interaction and feedback states
- Density limits
- Responsive transformations
- Subject-specific conventions

### References to dissect

**Brilliant**

Inspect how visual objects become manipulable, how instructions are integrated, and which interactions repeat across subjects.

**3Blue1Brown**

Inspect object permanence across mathematical transformations. The value is not the dark background or colour palette; it is visual continuity.

**MinutePhysics**

Inspect the minimum visual vocabulary required to express a model and how narration and drawing are synchronized.

**Desmos**

Inspect how expressions, graphs and learner inputs remain linked. Computation Layer is explicitly described as allowing components within an activity to communicate.^13

**PhET**

Inspect model boundaries, familiar controls, direct feedback, view switching and the separation of model from representation.

A style can be copied. A formal visual, motion and interaction grammar that constrains thousands of generated objects is infrastructure.

---

## 10. Repository and production memory

A normal asset repository stores files. A multimodal engine should store systems.

For every learning object:

- Concept blueprint
- Specification
- Editable scene
- Renderer source
- Dependencies
- Parameters
- Validation results
- Provenance
- Expert corrections
- Variants
- Curriculum links
- Misconception tags
- Usage events
- Learning evidence
- Version history

### Retrieval levels

The engine may retrieve:

1. The exact object
2. A parameterized family
3. A visual primitive
4. An interaction pattern
5. A learning mechanic
6. A representation plan
7. A successful repair
8. A known failure

This is more powerful than retrieving final content. It allows the system to reuse the reason an artifact worked.

### Provenance

Each generated object should retain:

- Source curriculum and references
- Model and prompt versions
- Retrieved assets
- Human editors
- Validation status
- Rights and licensing
- Dependencies and build environment

Provenance is both governance and debugging infrastructure.

---

## 11. Runtime composition inside an AI tutor

The long-term engine should serve the tutor during instruction.

The tutor might detect:

> The learner can manipulate the equation but does not understand why the electric-field direction changes.

The content runtime could:

1. Retrieve a verified electrostatics scene.
2. Insert the learner’s current values.
3. Select the vector and region views.
4. Ask the learner to predict.
5. Enable dragging of the test point.
6. Log which changes the learner notices.
7. Return to the original problem.

### Runtime safety hierarchy

From safest to most generative:

1. Retrieve a fixed validated object.
2. Change parameters within approved bounds.
3. Compose validated components.
4. Generate a new specification inside a constrained grammar.
5. Generate arbitrary code and test it.
6. Generate pixels or video with weak structural validation.

The engine should choose the least risky method that satisfies the need.

### Graceful degradation

If generation fails:

- Fall back from interactive to animation
- Fall back from animation to static diagram
- Fall back from bespoke content to a retrieved explanation
- Tell the tutor what could not be safely produced

Runtime generation without dependable fallback will produce an inconsistent tutor.

---

## 12. Production approaches compared

| Approach | Control | Reuse | Validation | Novelty | Runtime suitability |
|---|---:|---:|---:|---:|---:|
| Hand-authored asset | High | Low–medium | Human | High | Low |
| Template generation | High | High | Strong | Low–medium | High |
| Component composition | High | High | Strong | Medium | High |
| Declarative DSL | High | High | Potentially strong | Medium–high | High |
| AI-generated code | Medium | Medium | Requires execution | High | Medium |
| Generated raster/video | Low | Low | Weak | High | Medium |
| Generative world model | Low scientific control today | Low | Weak for STEM | Very high | Experimental |

The most credible near-term engine is hybrid:

- Trusted authored primitives
- Declarative specifications
- Procedural rendering
- AI-assisted planning and code generation
- Renderer-in-the-loop repair
- Human approval for novel/high-risk objects
- Restricted runtime parameterization and composition

The strategic question is where to allow open generation and where to enforce a grammar.

---

## 13. Current industry landscape

The market is not yet organized around one category called “multimodal content engines.” Relevant capabilities are distributed across AI assistants, interactive-learning companies, simulation libraries, visual-authoring products, animation engines and research prototypes.

The supplied cases clarify that the market is producing at least six different systems, often mislabeled as the same thing:

| System being built | Representative evidence | Actual production unit |
|---|---|---|
| Curated simulation library | Javalab, Falstad, OSP@Singapore | Focused executable model or preset |
| General simulation runtime | pSEngine, myPhysicsLab, PhET stack | Domain objects + update/solver + renderer |
| Diagram language | Diagrammar, Diagramatics | Composable scene tree + controls |
| Professional authoring multiplier | Brilliant | Approved game family + AI-built levels and variants |
| Teacher-facing generative studio | TAL Jiuzhang | Prompt-refined, code-backed courseware |
| Tutor-time generative interface | ChatGPT, Google Generative UI | Contextual visual/tool assembled during dialogue |

These are complementary layers, not six substitutes. The strongest architecture can retrieve a proven model, express it in a structured scene, let AI configure it for a learning objective, validate it, and deliver it either as authored courseware or as a tutor-time interaction.

### A. AI assistants generating visuals at runtime

#### ChatGPT

OpenAI introduced dynamic visual explanations for more than 70 core mathematics and science concepts in March 2026. The stated interaction model lets learners manipulate formulas, variables and relationships in real time.^19

**What appears solved**

- The tutor can decide that an interactive representation is useful.
- The visual appears inside the conversational experience.
- Variables and relationships can respond in real time.
- The product begins with a bounded concept library rather than arbitrary simulation generation.

**What to inspect**

- Are the experiences retrieved templates, parameterized components or dynamically generated code?
- Which concept types have reusable visual grammars?
- Does the conversation read learner actions from the visual?
- How does the system fall back outside the supported concept set?
- How are scientific constraints encoded and tested?

**What this suggests**

The most credible first step for runtime multimodality may be a curated library of executable concept families controlled by the tutor, not unrestricted generation.

#### Google Learn Your Way

Google’s system transforms source educational material into immersive text, quizzes, narrated slides, audio lessons and mind maps. It combines general models, multi-step agentic workflows and specialized components; a dedicated educational-illustration model was used after general image generators proved inadequate.^5

**What appears solved**

- One source can generate several coordinated media products.
- Personalization can be introduced upstream and propagated.
- Different output types can use different production pipelines.
- The system can package media into a coherent learning experience.

**What remains uncertain**

- Whether the content has a shared formal semantic representation
- Whether visual assets remain editable
- Whether generated representations are dynamically linked
- How subject-matter consistency is verified
- How far the system extends into simulations and games

**What this suggests**

An engine should not force one model to perform every production job. Some modalities require specialized data and models. But a shared semantic layer is still needed if the outputs must behave as one system.

#### Google Generative UI

Google Research describes generative UI as producing a custom interactive experience for a prompt, including tools and simulations generated on the fly. The work was integrated into Gemini and Search experiences, with human preference evaluation focused on the resulting interfaces.^20

**What to inspect**

- How the model chooses an interface structure
- Whether it selects from components or writes arbitrary front-end code
- How interaction states are tested
- Whether the generated interface has a durable editable representation
- How scientific applications are verified

**What this suggests**

Generative UI is likely to become the delivery surface for multimodal tutoring. It does not remove the need for a STEM content engine; it increases the need for trusted components, model constraints and validation.

### B. Interactive-learning production systems

#### Brilliant and Diagrammar

Brilliant is the clearest public example of the distinction this investigation needs to make: **AI-generated educational content is not the same thing as AI-implemented educational content.**

Diagrammar was designed inside Brilliant to let non-career-programmer authors make precise, reusable and interactive STEM diagrams without directly handling SVG, CSS, JavaScript and browser input. The Strange Loop description says it retains the power of Elm while exposing a simpler tool; it supports parametric diagrams, shared toolkits and styles, precise positioning and interaction. By 2022, authors had used it to create thousands of diagrams across dozens of courses.^2,54

That establishes the pre-AI substrate:

- A small language above browser graphics
- Composable and parameterized diagram functions
- Shared visual styles and author toolkits
- Precise layout rather than approximate image generation
- Interaction as a normal property of a diagram
- A functional runtime with predictable state transitions

Brilliant’s 2025 account explains what happened when generative AI was placed on top of a game engine. The company says its early prompts produced broken and often unsolvable assets. For a gear-train puzzle generator, it improved success from 0% to 93% in 48 hours—not by changing to a more capable frontier model, but by making the engine’s representation more legible to the LLM.^55

This is a major production finding. **The interface presented to the model can matter more than the model upgrade.** A model-friendly engine should therefore expose semantic operations such as `mesh(gearA, gearB)`, `preserveLearningObjective`, `setDifficultyRamp` or `makeDistractorFrom(misconception)` rather than asking the model to infer those relationships from low-level coordinates and event handlers.

Brilliant also draws a useful boundary between human and machine work:

| Humans currently own | AI currently accelerates |
|---|---|
| Learning objective | Asset configuration |
| Core game concept | Technical implementation |
| Difficulty progression | First playable puzzle |
| Intended “aha” moment | Variations of an approved puzzle |
| Creative direction | Repetitive level construction |
| Review for design and correctness | Rapid prototyping across alternatives |

Its learning designers describe a problem in natural language; the tool produces an interactive puzzle and solution that can be tweaked, play-tested or published. A separate workflow creates practice variants while preserving the learning objective. Every generated problem still receives multiple rounds of human review.^55 This is not autonomous course generation. It is an **authoring multiplier connected to a constrained game engine**.

The scale argument is equally important. Brilliant estimates that one introductory course can require 50+ concepts, 20+ problems per concept and therefore more than 1,000 problems. AI is valuable because it compresses configuration from hours to minutes and lets authors spend more time on level design and experimentation.^55 The unit of production is not “one good interactive”; it is a validated family containing a difficulty ramp, variations and edge cases.

**What appears solved**

- Natural-language control of a constrained internal engine
- Rapid generation of editable, playable first drafts
- Variant generation around an approved learning objective
- A human-review boundary for pedagogy and correctness
- Compounding value from LLM-friendly representations

**What is still not public**

- Diagrammar’s exact language, editor and compiler architecture
- The interface between Diagrammar and newer game-generation workflows
- Automated correctness checks before human review
- How learning objectives and misconceptions are represented
- Which game families generalize well and which still require custom engineering

**Design implication**

Do not ask an LLM to “make a physics game.” Give it a typed production environment whose objects already understand constraints, solutions, interaction states, feedback and variation. Let the human specify the experience; let AI perform the translation and repetitive construction; let deterministic code and review protect correctness.

#### Diagramatics: a public compositional diagram substrate

Diagramatics should be inspected beside Diagrammar, but it should not be confused with Brilliant’s internal tool. It is a separate MIT-licensed TypeScript library for math and physics diagrams with an online editor.^56 Its value is that the repository exposes a concrete implementation of several abstractions only described publicly for Diagrammar.

The core `Diagram` is a tree. Nodes can be polygons, curves, text, multiline text, images, foreign objects or nested diagrams. Objects carry styles, origins, paths, tags and cached bounding boxes; the user-facing operations are designed to return new diagrams by default, with explicit mutable modes when needed.^56

Its interactivity layer separates input variables and setters from the drawing function. It provides labels, sliders, drag-and-drop, locators, buttons and animation intervals, then redraws the SVG when state changes. This is a small but meaningful architecture:

    input variables + setters
              ↓
       pure-ish draw function
              ↓
       diagram tree / geometry
              ↓
        SVG + control layers

The library also contains alignment utilities, geometry primitives, vectors and transforms, tagged SVG elements, math-like text formatting, SVG/PNG export and example assemblies such as springs and pulleys. The implementation therefore gives an AI something far better than raw SVG: a vocabulary of meaningful spatial operations and reusable diagram constructors.

**Why this matters for an AI content engine**

- The intermediate object is structured, editable and serializable.
- Immutable composition makes transformations easier to reason about and test.
- Tags can connect semantic parts to feedback, narration or tutor actions.
- SVG output preserves addressable objects rather than flattening the result to pixels.
- Controls are bound to named variables, a natural interface for an LLM or tutor runtime.
- MIT licensing makes the project suitable for prototyping and architectural study.

**Limits to address**

- It is a diagram library, not a scientific model or pedagogical engine.
- Correctness, constraints and learning objectives are external to the diagram tree.
- The current interaction implementation is SVG-focused; canvas support is incomplete.
- Its author still works at the level of TypeScript functions and coordinates.
- It does not by itself generate level families, diagnose misconceptions or validate physics.

The opportunity is to place a semantic STEM layer above a Diagramatics-like scene graph. `freeBodyDiagram(body, forces)` or `rayDiagram(lens, object)` should compile into geometry and interaction, while the engine retains the scientific relationships needed for checking and adaptation.

#### TAL: prompt-to-code interactive courseware for teachers

TAL’s Jiuzhang teacher product shows that prompt-driven interactive courseware is already moving from research demos into mainstream teacher tooling. In January 2026, TAL described an “AI interactive courseware” agent inside a suite of more than 170 teacher agents. A teacher can request an interactive derivation of the area of a parallelogram, an oral-language activity or a globe; the system helps complete or co-design the requirement, decomposes the instruction, generates document code and returns a presentation.^57

The parallelogram example is especially relevant because the output is not merely a slide deck. TAL says the generated courseware can animate cutting and recombining the shape, expose adjustable parameters and carry explanatory content. Other examples combine image, text, sound, animation, video interaction and gesture recognition.^57

**What the public description implies**

- The authoring interface begins with an underspecified natural-language idea.
- A requirement-refinement stage precedes generation.
- The system decomposes the brief before emitting code.
- The deliverable is executable, parameterized courseware, not a static image.
- Multiple media and input modes are composed into one classroom object.
- The product is embedded in a wider teacher workflow including lesson planning, assessment and classroom data.

**What remains unknown and must not be assumed**

- Whether it uses a reusable scene/component grammar or unconstrained generated web code
- How scientific and pedagogical correctness are evaluated
- Whether a teacher can directly edit the generated model and interaction graph
- How robustly the courseware works across devices and classroom conditions
- Whether generated objects can be reused as parameterized families
- How gesture, video and voice inputs are represented and logged

TAL and Brilliant point toward two different product surfaces over a related engine. Brilliant optimizes an internal professional content team building polished learning games; TAL exposes idea-to-courseware generation directly to teachers. A multimodal content engine may need both modes: **expert production mode** for high-quality canonical content and **teacher co-creation mode** for contextual adaptation.

#### Desmos / Amplify Classroom

Desmos’s former Activity Builder and Computation Layer are now part of Amplify Classroom. Amplify describes Computation Layer as the code that lets components in an activity communicate.^13

**Production mechanism**

- Graphing engine as a trusted mathematical runtime
- Screen/component-based authoring
- Reactive links between learner input and activity output
- A scripting layer for cross-component logic

**What to inspect**

- Which authoring tasks remain difficult for teachers
- How AI could generate Computation Layer safely
- How student state moves between screens
- Whether activities can be decomposed into reusable learning mechanics

**Possible next solution**

Natural-language and direct-manipulation authoring over a constrained reactive language. The AI should generate the connections between components, while the engine retains mathematical correctness.

#### GeoGebra

GeoGebra integrates geometry, algebra, graphing, statistics and calculus in one dynamic mathematics system. Its app API exposes object creation, updates, listeners, visibility and state saving.^16,21

**Production mechanism**

- A persistent mathematical object model
- Bidirectional relationships between algebraic and geometric forms
- A mature construction runtime
- Embedding and programmatic control

**Possible next solution**

Use AI to generate, explain and modify GeoGebra-style constructions rather than generating screenshots. A higher-level learning-object layer could add misconception tests, feedback and sequencing around the mathematical engine.

#### Mathigon / Polypad

Mathigon describes itself as an interactive textbook and virtual tutor and reports building many interactive components beyond normal response fields. Its Polypad ecosystem provides manipulatives and activities across mathematics.^22

**Production mechanism**

- A reusable manipulative canvas
- Mathematical objects that remain interactive
- Course content composed around tools
- Licensing of content and technology to other organizations

**What to inspect**

- Component model
- Activity representation
- Teacher authoring
- Extensibility
- Whether AI can construct activities from existing manipulatives

#### PhET Interactive Simulations

PhET’s open-source HTML5 ecosystem is one of the strongest references for engineered scientific simulations.^3

**Production mechanism**

- Reusable simulation libraries
- Model–view separation
- Cross-device browser delivery
- Long-running design and research practices
- Inclusive-design infrastructure

**What to inspect**

- The ratio of reusable framework code to simulation-specific code
- How scientific models are tested
- Instrumentation and event logging
- How visual affordances are chosen
- How alternate input and accessible representations are implemented

**Possible next solution**

An AI authoring layer over a trusted simulation stack: AI proposes a model and interface, but deterministic physics, components and tests constrain the result.

#### Open Source Physics, EJS/WebEJS and OSP@Singapore

This ecosystem should be treated as a central technical precedent, not a footnote.

Open Source Physics provides reusable applications and libraries for physics education, including Easy Java/JavaScript Simulations (EJS/EjsS), Tracker video analysis, data tools and simulation packages.^41 Easy JavaScript Simulations was designed so an educator can define variables, a model and a view at a higher conceptual level while the toolkit generates deployable Java or JavaScript code.^42

That is already a form of educational compiler:

    declared variables + model equations + view
      → generated simulation code
      → browser or mobile experience

The Open Source Physics @ Singapore collection is especially important. Its “Physics Applets Virtual Lab” page is itself a living production index spanning AI-generated HTML5, Easy JavaScript Simulations, Tracker and TagUI—not merely a museum of old applets.^59 The collection combines:

- A large repository of ready-to-run simulations
- Downloadable EJS/EjsS source for adaptation
- Teacher remix and localization
- Curriculum-aligned lesson use
- Tracker-based video modelling
- HTML5/mobile deployment
- xAPI integration for scores and feedback
- Recent AI-assisted creation and modernization

A 2017 paper describes how EjsS lets an instructor define simulation variables, model and view while the toolkit handles much of the programming and mobile deployment.^42 Earlier work documented a teacher community remixing open simulation models for local curriculum and inquiry learning.^43

The current site goes further. It now includes:

- An AI prompt library with downloadable educational simulations
- Tutorials for creating simulations with ChatGPT and WebEJS
- Examples of AI-generated HTML5 magnetic-field and optics simulations
- Prompt-driven digital manipulatives, games and virtual laboratories
- xAPI scoring and feedback inside Singapore’s Student Learning Space
- Workshops in which educators use models to generate and revise simulations

This is not a hypothetical future. It is a live educator-led experiment in combining open simulation infrastructure, generative coding models, curriculum context and learning-platform integration.^44

**What this solves**

- Gives teachers a model-centric authoring environment
- Separates variables, equations and views
- Generates portable browser code
- Preserves source for remixing where licences allow
- Supports community-based adaptation
- Connects simulations to platform data through xAPI
- Demonstrates that AI can help modernize and extend older models

**What remains difficult**

- The authoring interface and model structure can still be technical.
- Visual design and interaction quality vary across contributions.
- AI-generated code may be hard to maintain consistently.
- Repository metadata and discovery are uneven.
- Scientific and visual validation are not uniform across every model.
- The relationship between a simulation and the learner model remains weak.
- Different generations of Java, SwingJS, EJS, EjsS and raw HTML5 complicate reuse.

**What this suggests**

The new engine should not begin by assuming it must invent simulation authoring. It should ask:

- Can AI translate natural language and sketches into an EJS-like structured model?
- Can old EJS/Java applets be converted into a modern common representation?
- Can existing simulations be wrapped as callable tools for an AI tutor?
- Can xAPI events become diagnostic evidence rather than completion records?
- Can a modern editor preserve the model–view separation while improving design quality?
- Can thousands of community simulations become retrieval and evaluation material?

The deeper opportunity is **AI-assisted simulation archaeology and orchestration**, not just simulation generation.

#### Javalab

Javalab is another major case that was missing from the first draft. It is a South Korean science-simulation site maintained by teacher and programmer DongJoon Lee. Javalab reports beginning with Java applets in 1996, providing more than 500 virtual-science simulations by 2014, rewriting them into JavaScript/HTML5 from 2015, optimizing for mobile, and expanding across physics, chemistry, earth science, astronomy, biology, measurement and mathematics.^45 Its physics index is not one generic “simulation” category: it visibly ranges across mechanics, energy, waves, optics, electricity, electromagnetism, atomic physics, relativity and computational tools.^60

The breadth is visible in its taxonomy:

- Static electricity, circuits, semiconductors and electromagnetism
- Force, motion, collision, oscillation, work and energy
- Reflection, refraction, colour, interference and standing waves
- Atomic models, light and radioactivity
- States of matter, heat, molecular motion, reactions and electrochemistry
- Earth, atmosphere, geology and astronomy
- Biology, mathematics, fractals and chaos
- Measurement, data logging, AR, VR, micro:bit and block coding

Individual applets expose useful design patterns. The gravity simulator lets a learner change initial conditions while making modelling assumptions explicit. The Faraday simulation connects magnet movement with induced current and direction. These are small, focused explorable models rather than full lessons.^46

Javalab also introduced Blocklab, a simulation-creation tool built on Google Blockly. Users assemble algorithmic blocks, run the dynamic model, save it locally and share it through a URL.^47 This matters because it makes the model itself manipulable rather than limiting users to fixed parameters.

**What this solves**

- Extremely broad simulation coverage
- Simple browser access without plugins
- Mobile delivery
- Focused concept-level interactions
- Longevity through Java-to-HTML5 migration
- A lightweight route from algorithmic blocks to simulation

**What is remarkable**

One educator-programmer has built and maintained a library at a scale many content organizations would require a team to match. Javalab reports 2.87 million active users and 15.47 million page views in 2025.^45 These figures are self-reported from Google Analytics, but the case still challenges assumptions about the cost structure of interactive content.

**Rights and reuse**

Javalab permits attributed screenshots and iframe embedding, including commercial embedding, but prohibits downloading or copying its HTML, CSS and JavaScript source.^48 A content-engine project can study, link or embed it under the stated terms; it should not treat the source as an open training or migration corpus.

**What this suggests**

- Build an index that understands what each simulation can demonstrate.
- Let the AI tutor retrieve and configure an existing applet before generating a new one.
- Create metadata around controllable variables, assumptions, observable outputs and suitable questions.
- Treat iframe-embeddable simulations as external tools with provenance and availability monitoring.
- Study how one creator’s consistent patterns could become an explicit simulation grammar.
- Use Blocklab as evidence that block-based model construction can coexist with generated simulation.

#### Physics Simulation Engine: a reusable runtime below the learning layer

The open-source Physics Simulation Engine, or pSEngine, is useful for a different reason than Javalab. Javalab demonstrates a large finished library; pSEngine exposes reusable runtime machinery for building simulations and animations.^58

The JavaScript engine uses p5.js for canvas rendering and MathJax for LaTeX. Its runtime separates simulation updates from drawing: a simulator manages timing and frame rates, a plotter updates a list of objects using delta time, and those objects draw through a shared renderer. It also provides coordinate conversion, grids, transformations, 2D/3D modes and drawing conveniences. The examples include electric fields, TeX animation and a scale-aware solar-system simulation.^58

This is the classic engine boundary:

    domain objects update(dt)
              ↓
       engine state and timing
              ↓
      objects draw(renderer)
              ↓
        p5 canvas + MathJax

It removes repeated browser and animation-loop work, but leaves the author responsible for the actual scientific model and learning interaction. That makes it a useful candidate for a **backend renderer**, not a complete content engine.

**Reusable ideas**

- A common object lifecycle across many simulations
- Explicit separation between update frequency and draw frequency
- Coordinate transforms between model space and pixels
- A renderer that hides low-level drawing details
- First-class mathematical typesetting inside an animation runtime
- Templates that lower the setup cost of a new simulation

**Important cautions**

- Repository metadata is inconsistent: `package.json` declares MIT while the root `LICENSE` is GPL-3.0. This must be legally resolved before reuse.^58
- The stack reflects an older Webpack/p5 architecture and appears volunteer-maintained.
- It does not encode units, conservation laws, solver accuracy, learning objectives or assessment.
- Its general update/draw abstraction is less semantically informative to an LLM than a subject-specific model.

The strategic lesson is to keep the useful runtime boundary but move one level upward. An AI should preferably create `chargedParticle`, `uniformField`, `forceVector` and `measurementProbe` objects with typed parameters and invariants—not arbitrary objects whose `update(dt)` method happens to contain physics.

#### Falstad applets

Paul Falstad’s collection spans circuits, waves, Fourier series, vector fields, quantum systems and other mathematical and physical phenomena. Many applets were migrated from Java to JavaScript.^49

The applets demonstrate several valuable production principles:

- Minimal visual language
- High information density
- User-defined fields and parameters
- Strong presets that reveal multiple phenomena inside one engine
- Reusable domain engines, especially the circuit and field simulators

The ripple-tank simulation, for example, covers interference, diffraction, refraction, resonance and the Doppler effect while allowing learners to modify sources and walls.^50 This is not a set of unrelated assets; it is a configurable wave engine.

Falstad allows classroom use and limited non-commercial modification/redistribution with attribution; other uses require permission.^51 The licence must shape any reuse strategy.

**What this suggests**

The right unit of content may be a powerful domain engine plus carefully designed presets. AI can select a preset, change parameters, add guidance and generate a task without recreating the underlying wave or circuit solver.

#### myPhysicsLab

myPhysicsLab provides open-source JavaScript classes for real-time interactive animated physics simulations under the Apache 2.0 licence. It documents an explicit software architecture and includes reusable rigid-body physics, differential-equation models, graphs, time graphs, parameter controls and customizable examples.^52

This case is important because the codebase separates reusable physics infrastructure from example simulations. A roller-coaster example exposes its mathematics and source; a rigid-body engine supports many mechanisms; individual models can be dragged, graphed and parameterized.^53

**What this suggests**

- Open simulation engines may be better foundations than generating physics code from scratch.
- AI can generate a model configuration and explanatory layer over a verified numerical runtime.
- Source architecture, licences and tests should be indexed alongside the learner-facing applet.
- Existing open engines can become subject-specific backends for the multimodal content compiler.

#### Other independent and teacher-built collections

The investigation should expand to:

- oPhysics
- SimuPhysics
- Walter Fendt’s HTML5 applets
- Physlets and Physlet Physics
- NTNUJAVA Virtual Physics Laboratory
- university EJS collections
- community GeoGebra resources
- NetLogo and NetLogo Web models
- Energy2D
- Tracker video-analysis models
- astronomy, chemistry and biology applet repositories

These collections are not secondary merely because their interfaces look older or their creators are individuals. They contain decades of decomposed concept models, interaction ideas and production decisions.

#### What the applet ecosystem changes

The content-engine opportunity is not:

> Generate every STEM simulation with a frontier model.

It may be:

> Create an intelligent layer over the world’s existing simulations, understand their internal and external affordances, modernize the reusable ones legally, and generate only the missing connective or interactive pieces.

This adds another architectural direction to the document:

### Simulation federation

    concept or misconception
      → search structured simulation index
      → inspect licence and compatibility
      → retrieve/embed/configure existing engine
      → generate guidance and task
      → capture interaction events
      → return evidence to tutor

The federation requires:

- Concept taxonomy
- Simulation metadata
- Input/control schema
- Assumptions and model limits
- Embedding and API method
- Licence and provenance
- Device/browser status
- Accessibility information
- Event/instrumentation support
- Reliability monitoring
- Human quality review

This may deliver more value sooner than generating thousands of new applets.

#### Legacy-content conversion

The legacy corpus creates another production problem:

- Java applets that no longer run
- Flash interactives
- Old EJS models
- HTML5 applets without responsive design
- Simulations without analytics
- Closed implementations that can only be embedded
- Open implementations with weak metadata

A legally compliant modernization pipeline could:

1. Inventory the asset and establish licence/permission.
2. Capture documentation, controls, states and intended phenomenon.
3. Recover or reconstruct the mathematical model from permitted source and references.
4. Express the model in a modern structured representation.
5. Rebuild the view with current components.
6. Validate output against equations and reference behaviour.
7. Add responsive design, accessibility and instrumentation.
8. Preserve attribution and provenance.
9. Let an expert approve conceptual fidelity.

For copyrighted closed-source applets, the system should link or embed under the stated terms rather than extract code. The scientific idea may be general knowledge, but the implementation, assets and expressive choices can be protected.

#### Existing applets as production intelligence

Where licensing permits, these repositories could support:

- Component discovery
- Simulation-family taxonomy
- Model and parameter schemas
- Interaction-pattern mining
- Code-generation examples
- Automated migration tests
- Visual redesign experiments
- Benchmark prompts
- Failure and edge-case libraries

The key is not indiscriminate scraping. It is a rights-aware corpus of models, sources, metadata and behaviours.

#### ExploreLearning Gizmos

ExploreLearning reports more than 550 interactive mathematics and science simulations for grades 3–12, built around graphing, measuring, comparing, predicting and experimenting.^23

**What to inspect**

- Content taxonomy across hundreds of simulations
- Repeated model and interaction families
- Production economics for a large proprietary library
- The boundary between platform components and bespoke assets
- How worksheets and teacher materials are generated around the simulation

**Possible next solution**

Reverse the normal asset logic: treat a simulation as the central executable object, then generate teacher guides, questions, static diagrams, challenges and assessments from its state model.

#### Labster

Labster reports a library of more than 300 immersive virtual laboratory simulations.^24

**Production mechanism**

- 3D scene and equipment libraries
- Procedural laboratory steps
- Embedded questions and feedback
- Curriculum packaging and automated grading

**What to inspect**

- How laboratory procedures are represented
- Which equipment and interaction components are reusable
- How a scientific procedure is validated
- Production time for a new simulation
- Whether AI can alter scenarios without violating safety and scientific constraints

**Possible next solution**

Represent laboratory procedures as structured protocols that can compile into immersive, desktop and simplified 2D experiences. Generative AI could vary context and feedback while core procedure and safety rules remain fixed.

### C. Programmatic animation and AI-Manim products

#### Manim

Manim is an open-source Python engine for precise mathematical animation.^1 Its importance is not only the look associated with 3Blue1Brown. It provides an executable vocabulary of mathematical objects and transformations.

#### Emerging creator products

Current products and open-source projects include:

- **Animo**, a desktop natural-language interface built on Manim and designed to work with AI coding tools.^25
- **AnimG**, a browser tool for generating Manim animations from prompts.^26
- **Manim Video Generator**, an open-source natural-language-to-Manim pipeline.^27
- Multiple small Manim generators and agent demos distributed through GitHub, Reddit, X and developer communities.

These products indicate real demand but should not all be treated as mature content systems.

**What many solve**

- Remove local Manim installation
- Generate initial code from a prompt
- Render and preview
- Produce a shareable video

**What commonly remains weak**

- Pedagogical planning
- Symbol consistency across scenes
- Editability for non-programmers
- Spatial and temporal quality
- Scientific validation
- Reuse as an interactive object
- Evidence that the animation teaches effectively

**What this suggests**

Text-to-Manim will probably commoditize. The valuable layer is above and around it: structured scene planning, subject primitives, visual grammar, expert editing, validation and conversion between animation and interaction.

### D. Visual-authoring infrastructure

#### Rive

Rive combines vector graphics, animation, state machines, listeners and data binding. Its current data-binding model supports structured types, nested view models, lists, images and artboards; listeners allow designers to create interactive behaviour without conventional code.^14

**Production mechanism**

- One design artifact contains view, animation and interactive state
- Designers own more runtime behaviour
- Data remains connected to visual properties
- Runtimes support multiple application platforms

**Possible role in a STEM engine**

- Interactive scientific illustrations
- Animated manipulatives
- Process diagrams
- State-driven feedback components
- Tutor-controlled characters or visual cues

**Limit**

Rive is not a scientific modelling environment. A separate scientific model should drive it.

#### tldraw

tldraw’s AI documentation describes three patterns: canvas as generated-output surface, visual workflows in which models are nodes, and agents that directly control the editor. Its Make Real experiment converts drawings and annotations into working web interfaces.^28

**Production mechanism**

- Infinite canvas as shared human–AI workspace
- Structured editable shapes
- Agent actions over canvas objects
- Sketch → generated working artifact → annotation → revision

**Possible next solution**

An SME sketches a force diagram or experiment, AI reconstructs it as constrained scientific objects, and the canvas becomes the authoring interface for an animation or interactive.

#### Napkin AI

Napkin turns text into editable diagrams, charts, mind maps and visual structures, with export to SVG and presentation formats.^29

**Production mechanism**

- Text-to-layout selection
- Editable structured visual output
- Brand/style controls
- Multiple visual organizations for the same text

**Limit for STEM**

Business diagrams and infographics tolerate semantic approximation. Scientific diagrams often require domain constraints, coordinate meaning and exact object relationships.

**Possible next solution**

A Napkin-like workflow backed by subject-specific grammars: generate alternative diagram structures, but constrain every object through scientific semantics.

### E. General creative-production tools

Adobe Firefly and related creative suites generate images, vectors, audio and video, and emphasize integration into an editable creative workflow.^30 These tools can accelerate contextual images, texture, narration, video inserts and production finishing.

They are not the scientific core of the engine.

**Appropriate uses**

- Contextual scenes
- Visual references
- Supporting illustrations
- Backgrounds and texture
- Narration and audio
- Video extension and cleanup
- Localization variants

**Inappropriate default uses**

- Exact molecular structures
- Geometric proof diagrams
- Quantitative graphs
- Apparatus requiring scientific accuracy
- Stateful simulations

The distinction between creative plausibility and model correctness should be explicit in the engine’s routing policy.

### F. World models and generated environments

Genie and Genie 3 make generated, controllable environments technically credible.^4

Possible future relevance:

- Virtual field environments
- Generated spatial contexts
- Exploration and embodied tasks
- Interactive historical or scientific worlds

Current limitation:

World-model consistency is not equivalent to physical or scientific correctness. For education, the governing model must be controllable, inspectable and testable.

### G. Creative technologists and experimental studios

Creative technologists should be studied as a production function, not as a job-title trend. They often operate where a new model or medium is capable enough to demonstrate something but not yet reliable enough to become a product.

Current job descriptions show a recurring combination:

- Translate an ambiguous creative idea into a working prototype
- Explore emerging models, interfaces and runtimes
- Build repeatable pipelines rather than isolated experiments
- Connect creative teams with engineers and researchers
- Evaluate visual output and run creative QA
- Move between code, design, motion, video, 3D and physical computing
- Document methods so experimentation becomes production capability

Current examples include:

- AMD’s AI Creative Technologist role, which calls for leading strategic integration and hands-on implementation of AI across a global organization.^35
- Adobe’s current creative-technology and AI-technologist roles around Firefly and media workflows.^36
- Kyndryl’s AI Innovation Lab roles, which emphasize interaction design, software prototyping and emerging technology.^37
- Agency roles that explicitly ask creative technologists to convert briefs and production needs into repeatable systems and run QA on generated outputs.^38
- Lightricks roles connecting computer vision, machine learning, rendering, computational photography and augmented reality.^39

Job advertisements are temporary and often aspirational. Their value here is not proof that these teams have solved production. They reveal where companies currently feel the organizational gap.

#### What creative technologists are building

Across portfolios, studio work and social posts, recurring forms include:

- Prompt-to-interactive prototypes
- Generated diagrams and motion studies
- Real-time data visualizations
- WebGL and shader experiments
- Generative typography and visual identities
- AI-controlled canvases
- Sketch-to-interface systems
- Camera and computer-vision interactions
- Audio-reactive scenes
- Projection and spatial installations
- AR/XR demonstrations
- Agent-driven creative tools
- ComfyUI and node-based media pipelines
- Procedural 2D and 3D systems
- Small custom tools that connect several commercial models

The relevance to STEM content is not the surface aesthetic. It is the working method:

> Build a small expressive system, test the new interaction directly, discover what should become reusable, and only then formalize it as product infrastructure.

#### Typical technology stack

The exact stack varies, but the following families recur:

| Layer | Technologies and methods to inspect |
|---|---|
| Browser interaction | JavaScript/TypeScript, React, SVG, Canvas |
| Motion | GSAP, Rive, Lottie, Web Animations |
| 3D and spatial | Three.js, WebGL/WebGPU, Unity, Unreal, Spline |
| Creative coding | p5.js, Processing, shaders, TouchDesigner |
| Data visualization | D3, Observable, Vega/Vega-Lite |
| AI orchestration | Model APIs, Python, node graphs, workflow tools |
| Generative media | Image, video, audio and 3D models; ComfyUI pipelines |
| Vision and sensing | Camera input, pose/gesture, segmentation, tracking |
| Fabrication/installation | Sensors, microcontrollers, projection and displays |
| Prototyping | Figma, code sandboxes, tldraw-like canvases, custom editors |

This should not become a fashionable tool list. For every technology, the investigation should ask:

- Does it preserve structured and editable state?
- Can AI control it through a stable API?
- Can output be rendered and tested automatically?
- Does it run on the learner’s likely device?
- Can non-developers author or correct it?
- Can it connect to a scientific model?
- Can components be reused across content?

#### Creative-technology patterns worth importing

**Code as a visual material**

Creative technologists often use code to create motion and interaction directly. For STEM, this is valuable because the artifact can remain parameterized and executable.

**Rapid medium experiments**

Rather than begin with a feature specification, they test what a new model, renderer or sensor makes perceptually possible. A content-engine team needs this exploratory capacity because the correct interface for generated scientific content is not yet settled.

**Toolmaking for the next project**

Strong practitioners do not only produce the current experience; they leave behind components, shaders, pipelines and editors. This is exactly how content production becomes an engine.

**Hybrid authorship**

They move among prompt, code, design tool and direct manipulation. This supports the thesis that a multimodal content studio should not force every edit through natural language.

**Visible prototyping**

X/Twitter portfolios expose many small experiments early. These demos are useful signals but require forensic reading: what was automated, what was handcrafted, and what is reusable?

#### Studios and communities to inspect

This research should include work from:

- Google Creative Lab and experiments around generative interfaces
- Adobe creative-technology and Firefly teams
- Creative coding communities around Three.js, p5.js and TouchDesigner
- Active Theory, FIELD, onformative, Universal Everything and comparable interactive studios
- Data-storytelling and newsroom interactive teams
- Computational-design and digital-fabrication studios
- Game prototyping and technical-art communities
- Independent creators building AI-Manim, shader, WebGL and generative-UI experiments on X

The purpose is not to rank studios. It is to extract:

- How they prototype
- How they combine tools
- How they preserve art direction
- What they automate
- What remains manual
- How a successful experiment becomes a reusable production system

#### The role inside a multimodal content-engine team

A STEM content engine needs a comparable function between learning design, creative direction and engineering.

This person or team would:

- Prototype new representation formats
- Compare renderers for the same concept
- Build interactive and motion primitives
- Turn promising AI demos into reproducible pipelines
- Create render-and-review tools
- Encode the design system into components and constraints
- Help SMEs interact with technical authoring systems
- Maintain a gallery of successful and failed experiments
- Track the fast-moving creator ecosystem
- Separate spectacle from a medium that genuinely improves explanation

This is not peripheral “innovation lab” work if the outputs feed the component library, DSL, validators and authoring studio. It becomes R&D for the content engine.

#### Things to inspect in creative-technologist portfolios

- Is the output a video of a demo or a usable system?
- Does the creator expose code, process or architecture?
- Can the object respond to data or user input?
- Is it editable after generation?
- Does it use a reusable component vocabulary?
- Which model produced which layer?
- What did the person correct manually?
- Is latency compatible with live use?
- What breaks when the prompt, data or screen size changes?
- Could an SME use the tool?
- What new expressive primitive does the experiment reveal?

The most valuable discoveries may come from a small portfolio experiment before they appear in an edtech product. But they become useful to founders only after being translated into a production hypothesis.

---

## 14. The “AI diagrams on X/Twitter” wave

The recent wave is real, but it contains different technologies under one visual impression.

### Type 1: generated raster diagrams

The model produces a finished image containing labels, arrows and illustrations.

**Why it looks impressive**

- Fast
- Visually rich
- No code
- Good for social sharing

**What to test**

- Text accuracy
- Diagram topology
- Quantity and scale
- Editability
- Repeatability
- Whether a small correction requires full regeneration

### Type 2: Mermaid, SVG or diagram-code generation

The model writes a structured diagram language or vector code.

**Advantages**

- Editable
- Deterministic rendering
- Versionable
- Style can be separated from structure

**Limit**

Generic graph syntax does not understand scientific entities or constraints.

### Type 3: generated Manim animations

The model creates scene code and renders it to video. This produces many of the 3Blue1Brown-like demonstrations circulating online.

**Advantages**

- Precise mathematical objects
- Reproducible output
- Parameterization
- High perceived production value

**Limit**

Correct code and attractive motion can still form a weak or inaccurate explanation.

### Type 4: generated front-end interactives

Coding models build React, SVG, Canvas or WebGL applications from a prompt. Current AI systems can produce impressive simulations and explainers in one session.

**Advantages**

- Interactivity
- Arbitrary composition
- Immediate iteration

**Limit**

- Uncontrolled architecture
- Difficult reuse
- Hidden scientific errors
- Broken states
- Maintenance risk

### Type 5: template-driven demos presented as generation

The system selects or fills a strong existing template. This can be excellent product design; it is only misleading if described as unconstrained generation.

### Type 6: hand-corrected demonstrations

The visible result may hide many rounds of prompting, coding and expert repair.

For every impressive demo, ask:

1. What was generated: pixels, code, parameters or a structured model?
2. How many attempts and corrections were required?
3. Can it be edited locally?
4. Can it generate a related variant?
5. Can it expose its scientific assumptions?
6. Can it survive boundary inputs?
7. Can it be reused inside a production system?
8. Was learning measured?

This distinction should become a recurring visual in the public note:

> **Looks generated** is not the same as **production-ready generative content**.

---

## 15. Research frontier

### Structured planning before generation

Manimator uses an intermediate scene description before producing code.^6 LayoutGPT similarly treats language models as layout planners by producing explicit spatial arrangements before image generation.^31

**Direction**

Separate semantic, pedagogical, spatial and temporal plans. The final renderer should not have to infer everything from one paragraph.

### Renderer-in-the-loop generation

ManimTrainer/ManimAgent evaluates the interaction of training methods and renderer-in-the-loop inference, while OmniManim and SGA attack visible layout failures with render feedback and symbolic geometry.^8,9,32

**Direction**

Rendering is part of reasoning. Models need execution feedback, keyframes and local repair rather than one-shot code generation.

### Human-in-the-loop production

LLM2Manim keeps expert review and uses constrained templates, a symbol ledger and targeted regeneration.^7

**Direction**

The strongest production product may be an expert tool rather than an autonomous publisher. The research question is how to minimize correction cost while capturing corrections as reusable intelligence.

### Direct manipulation plus AI

Lyra 2 explores authoring interactive visualizations through demonstration. tldraw turns sketching and annotation into a dialogue with generated interfaces.^28,33

**Direction**

Natural language is not enough. Experts should correct spatial content spatially and have the underlying representation update.

### Interactive diagrams as conversation

Graphologue converts LLM responses into interactive node-link diagrams that become a surface for further questions.^34

**Direction**

A diagram should not only illustrate the conversation. Its objects can become referents and inputs: “Why does this arrow reverse here?” The tutor and learner need shared pointing and object identity.

### Generative UI

Google’s generative UI work and interactive experiences in major AI assistants indicate that runtime-generated interfaces are moving into consumer products.^19,20

**Direction**

The interface itself becomes a modality. The tutor may assemble controls, diagrams and questions around the current learning need. This increases the importance of safe components and post-generation testing.

### World models

Generated controllable environments expand what “content” may mean.^4

**Direction**

Future learning simulations could be generated as environments. But STEM needs explicit rules, observability and scientific verification; a visually consistent world model alone is inadequate.

### Missing research

Much current work optimizes:

- Render success
- Visual similarity
- Layout quality
- Human preference
- Code correctness

The missing benchmarks should test:

- Scientific accuracy
- Cross-representation consistency
- Misconception risk
- Pedagogical function
- Editability
- Reusability
- Boundary-state correctness
- Time to expert approval
- Learning and transfer

---

## 16. Possible architectures

### Architecture 1: orchestrated media factory

    source → planner → specialized media generators → lesson package

**Best for**

- Textbooks
- Slides
- Audio
- Narrated video
- Illustrations

**Strength**

Deployable with current models.

**Weakness**

Outputs may remain disconnected assets.

### Architecture 2: code-generating production agent

    brief → plan → generate code → render → critique → repair

**Best for**

- Animation
- Bespoke interactives
- Data visualization
- Prototypes

**Strength**

High expressive range.

**Weakness**

Maintenance and validation become difficult across thousands of independently generated codebases.

### Architecture 3: component composer

    concept → select trusted components → configure state → compose → test

**Best for**

- Runtime tutoring
- Repeatable interactions
- Fast production

**Strength**

Reliable and reusable.

**Weakness**

Can feel templated; limited to existing vocabulary.

### Architecture 4: educational compiler

    concept model → learning-object specification → subject compiler → renderer

**Best for**

- Durable multi-output content systems
- Cross-representation links
- Controlled adaptation

**Strength**

Separates meaning from rendering and enables strong validation.

**Weakness**

The language and compiler are difficult to design.

### Architecture 5: hybrid engine

    retrieve existing object
      → compose trusted primitives
      → generate missing specification/code
      → render and validate
      → escalate uncertain parts

This is the most plausible long-term architecture.

It uses a hierarchy:

- Retrieve before generate
- Parameterize before invent
- Compose before write arbitrary code
- Generate structured representation before pixels
- Validate before publish
- Preserve expert correction

### Architecture 6: simulation federation

    learning need
      → search applet/simulation index
      → check licence, platform and quality
      → retrieve or embed existing engine
      → configure model and preset
      → generate task, guidance and feedback
      → capture interaction evidence

**Best for**

- Using the large existing simulation ecosystem
- Topics already covered by trusted specialist engines
- Faster tutor integration
- Avoiding unnecessary regeneration

**Strength**

Builds on decades of scientific modelling and teacher experimentation.

**Weakness**

Fragmented interfaces, licences, technologies, metadata and analytics make federation difficult. Some simulations can be embedded but not inspected or modified.

The hybrid content engine should include federation as a first-class capability. “Generate” is only one production action alongside retrieve, embed, configure, modernize, compose and compile.

---

## 17. What the future might hold

### Near frontier

- Prompt-to-editable diagram becomes common.
- Text-to-Manim becomes a commodity creator feature.
- Coding agents generate small simulations and interactives on demand.
- Render-and-repair loops improve visual reliability.
- AI canvases combine language, sketch and direct manipulation.
- Tutors insert bounded interactive visualizations from concept libraries.

### Deeper frontier

- One semantic object produces static, animated and interactive views.
- Subject-specific compilers enforce scientific constraints.
- Expert corrections update validators and primitives automatically.
- Learning designers author through conversation and direct manipulation.
- Simulations generate assessments from their state space.
- The tutor observes learner actions inside the content and uses them diagnostically.
- Interaction patterns are retrieved by misconception, not only topic.

### Speculative frontier

- A learner sketches a physical situation; the engine reconstructs a valid model and makes it executable.
- Scientific papers are converted into inspectable models, not only explainer videos.
- Generated worlds obey selected physical rules and support controlled experiments.
- The engine invents new learning mechanics and automatically tests solvability and conceptual alignment.
- Content production and tutoring converge: the content object is built, manipulated and revised during the conversation.

---

## 18. Moat?

### Likely to commoditize

- Generic explanations
- Basic illustrations
- Text-to-video
- Text-to-Manim
- One-off generated React demos
- Talking avatars
- Prompt libraries
- “3Blue1Brown style” imitation

### More defensible possibilities

- An educational intermediate representation
- Subject-specific grammars and validators
- A large library of executable, parameterized learning objects
- Reusable learning mechanics
- A visual, motion and interaction grammar
- Expert correction memory
- Cross-renderer compilation
- An authoring environment adopted by strong content teams
- Production data about failure and repair
- Evidence linking representations to specific conceptual outcomes
- Runtime composition that preserves scientific integrity

### Compounding loop

    more production
      → more expert corrections
      → stronger primitives and validators
      → faster and safer generation
      → more deployed objects
      → more interaction and learning evidence
      → better representation policies

### Reasons it may not become a moat

- General coding models may commoditize much of front-end production.
- Open-source communities may standardize primitives and renderers.
- A DSL can become restrictive or expensive to maintain.
- Excellent fixed content may outperform inconsistent personalization.
- Content technology does not automatically create distribution.
- A large library is not useful if it is poorly indexed or rarely reused.

The moat is not “we can make animations with AI.”

> The possible moat is a system that repeatedly turns a learning problem into a validated executable representation, improves from every expert correction, and can deploy the same underlying object across many contexts.

---

## 19. Things to inspect

### Products and companies

- **Brilliant:** reconstruct several interactives into primitives, states and learning mechanics.
- **Diagrammar:** watch the complete talk and map its authoring abstraction, types and workflow.
- **Brilliant’s AI game pipeline:** reconstruct the prompt chain, LLM-facing representation, variant generator, review gates and failure taxonomy described in “Hand-crafted, machine-made.”
- **Diagramatics:** inspect the diagram tree, immutable composition, semantic tags, SVG renderer, control bindings and online editor; test it as an AI target language.
- **TAL Jiuzhang teacher edition:** test prompt refinement, code generation, parameter editing, multimodal composition and robustness of the generated interactive courseware.
- **ChatGPT dynamic visual explanations:** inspect which concept families are supported and how the tutor interacts with them.
- **Google Learn Your Way:** compare how each output modality is generated and whether representations remain semantically linked.
- **Google Generative UI:** inspect component reuse, code generation and testing.
- **Desmos/Amplify Computation Layer:** study reactive cross-component logic and the authoring burden.
- **GeoGebra:** inspect object APIs, construction state, events and embedding.
- **Mathigon/Polypad:** inspect reusable manipulatives and activity composition.
- **PhET:** inspect source architecture, common libraries, model tests and inclusive design.
- **Open Source Physics / EJS / WebEJS:** inspect the variables–model–view authoring structure, generated code, XML/project format, reusable libraries and AI-assisted workflow.
- **OSP@Singapore:** inspect the AI prompt library, downloadable source packages, teacher remix history, xAPI/SLS integrations and current prompt-to-HTML5 simulations.
- **Javalab:** classify the 500+ applets by scientific model, controls, representations and reusable interaction patterns; inspect Blocklab as a learner/teacher simulation builder.
- **Physics Simulation Engine:** inspect the update/draw lifecycle, object model, coordinate system, template and contradictory licence metadata; compare it with more domain-specific runtimes.
- **Falstad:** identify domain engines that support many phenomena through presets rather than separate implementations.
- **myPhysicsLab:** inspect its model, numerical solver, observer, graphing and view architecture as a reusable open-source backend.
- **Physlets, Walter Fendt, oPhysics, SimuPhysics and NTNUJAVA:** map the broader independent and university applet ecosystem.
- **ExploreLearning Gizmos:** classify repeated interaction and simulation families across the catalogue.
- **Labster:** examine structured protocols, equipment reuse and 3D production.
- **Rive:** rebuild a scientific process with state machines and data binding.
- **tldraw:** study agent control of structured canvas objects and sketch-to-interface iteration.
- **Napkin AI:** inspect how text becomes editable diagram structure and where STEM constraints fail.
- **Animo/AnimG/Manim generators:** compare planning, editing, rendering, repair and export.
- **Adobe Firefly and creative suites:** identify supporting production tasks worth integrating rather than rebuilding.

### Research and benchmarks

- Manimator: value of an intermediate scene description
- LLM2Manim: constrained prompts, symbol ledger and human review
- OmniManim: visual priors and localized repair
- SGA: symbolic scene geometry
- ManimAgent/ManimTrainer: renderer feedback and production memory
- Vega-Lite: declarative grammar and compilation
- Cicero: reusable responsive transformations
- Lyra 2: interaction authoring by demonstration
- Graphologue: interactive diagrams as conversation
- WebVIA/UI-to-code work: state exploration and interaction validation
- LayoutGPT: explicit visual planning
- Genie: generated action-controllable environments

### Portfolios and people

- Brilliant learning designers, illustrators and creative engineers
- PhET simulation designers and framework engineers
- Desmos activity authors
- 3Blue1Brown/Manim contributors
- Interactive newsroom teams
- Scientific-visualization studios
- Game-tool and level-editor designers
- CAD and simulation-interface designers

The question for every person or system is: **what production judgment or abstraction do they possess that the current AI pipeline lacks?**

---

## 20. Explorations

### One concept, several engines

Build the same concept as:

- SVG diagram
- Manim animation
- Rive interaction
- Browser simulation
- Small learning game

Map which information can be shared and which is renderer-specific.

### Diagram reconstruction

Take high-quality STEM diagrams and decompose them into:

- Semantic objects
- Constraints
- Visual tokens
- Annotation patterns
- Interaction possibilities

Test whether an AI model can rebuild them as editable structures.

### Prompt-to-interactive benchmark

Evaluate generated interactives on:

- Scientific correctness
- State completeness
- Visual quality
- Editability
- Responsive behaviour
- Human correction time

### Cross-representation consistency

Generate equation, graph, diagram and animation from one structured model. Change one parameter and test whether every representation remains aligned.

### Expert correction memory

Store corrections as constraints, validators, examples and known failures. Measure whether the next related generation improves.

### Learning-mechanic generation

Ask the engine to propose a game or interaction for an objective. Reject any design in which the learning exists only in surrounding questions.

### Existing content conversion

Investigate:

- Raster diagram → scene graph
- Video → objects and timeline
- Worksheet → parameterized interaction
- Simulation → reusable model and mechanics
- Expert sketch → valid executable content

---

## 21. Open loops

- What is the smallest useful intermediate representation?
- Is there one shared language or a family of subject-specific DSLs?
- What is the correct reusable unit: asset, scene, interaction, mechanic, model or misconception treatment?
- Can AI infer a scientific model from an explanation without silently changing assumptions?
- Which scientific properties can be verified deterministically?
- Can a visual design system be compiled rather than prompted?
- How should narrative timing and interactive learner control coexist?
- When is generated code preferable to component composition?
- How can a non-technical expert make structural corrections?
- Can arbitrary generated interfaces be maintained at scale?
- How much of the visible quality on X comes from hidden human iteration?
- What production evidence should accompany a generated-content demo?
- How can simulation state become diagnostic evidence for the tutor?
- Can an animation preserve an editable interactive scene after rendering?
- Can learning games be generated with guarantees of solvability and conceptual alignment?
- What should be allowed at runtime versus only during reviewed production?
- How should the engine express uncertainty and refuse unsafe generation?
- What correction data actually compounds rather than accumulating as noise?
- Does more content variety improve learning, or fragment the experience?
- Who owns the most valuable layer: foundation model, renderer, authoring tool, content language, repository or tutor?

---

## 22. Synthesis

The current industry is moving quickly, but not in one direction.

- Large AI assistants are making interactive visual explanation a runtime product capability.
- Google’s Learn Your Way shows a multimodal media-orchestration pipeline.
- Brilliant, Desmos, GeoGebra, Mathigon and PhET show the durability of constrained interactive systems.
- Brilliant’s current AI pipeline shows why the representation is a strategic asset: it reports a 0%→93% change in gear-puzzle generation after making the engine more LLM-friendly, while leaving objectives, progression and “aha moments” with human authors.^55
- Diagramatics demonstrates a public, compositional TypeScript/SVG target; TAL demonstrates a teacher-facing prompt-to-code product surface; neither removes the need for a scientific and pedagogical layer.
- Open Source Physics, EJS/WebEJS, OSP@Singapore, Javalab, Falstad and myPhysicsLab show that educators and independent developers already built large, reusable simulation ecosystems—and that some are now adding AI generation and learning-platform instrumentation.
- Manim tools and research show how AI can generate programmatic animation.
- Rive, tldraw and Napkin demonstrate new authoring relationships among structure, direct manipulation and AI.
- Generative UI and world models suggest that content may become an interface or environment rather than a file.

The missing system is the layer that joins them:

> A multimodal content engine that knows the scientific model, represents the learning interaction, chooses among production methods, generates through specialized tools, validates the result, keeps it editable, and remembers how experts corrected it.

This engine should not assume that every output must be generated from scratch. Its intelligence includes knowing when to retrieve, parameterize, compose, compile, generate or refuse.

The deepest opportunity is not infinite content production. It is **structured production that compounds**.

---

## 23. Solution investigations: what should actually be attempted?

The landscape becomes valuable only when it produces testable product and technology questions. The following are not implementation promises or a 90-day roadmap. They are investigation directions that a serious content-technology team could prototype, falsify and refine.

### 23.1 Can we create an AI-native Diagrammar?

**Yes—but AI should author in the language, not be expected to invent the language on every prompt.**

Diagrammar’s important idea is not that an LLM can write Elm. It is that an organization can create a smaller language in which its most valuable visual and interaction judgments become reusable. Brilliant’s later AI results reinforce this: the company reports that making its game-engine representation more LLM-friendly changed gear-puzzle generation from 0% to 93% success without changing to a newer frontier model.^55

An AI-native successor could contain five connected grammars:

| Grammar | What it represents | Example operations |
|---|---|---|
| Scientific model | Objects, variables, units, equations and invariants | `body.mass`, `lens.focalLength`, `conserveEnergy` |
| Representation | Diagram, graph, symbolic, particle and field views | `showVector`, `bindGraph`, `particleView` |
| Interaction | Dragging, controls, prediction, measurement and state transitions | `drag`, `scrub`, `measure`, `submitPrediction` |
| Pedagogy | Objective, misconception, hint, feedback and difficulty | `targetMisconception`, `revealAfter`, `generateVariant` |
| Presentation | Layout, style, motion, narration and responsiveness | `align`, `morph`, `focus`, `narrate`, `reflow` |

The AI would translate a brief into an abstract syntax tree or structured object rather than directly emitting thousands of lines of SVG and JavaScript. A compiler could then target SVG/Canvas for interaction, Manim for video, Rive for state-machine animation, or a browser game runtime. The same named object—say, `normalForce`—could remain identifiable across the diagram, narration, animation and assessment.

**A plausible authoring loop**

1. An expert supplies a concept, objective, reference image, sketch or existing interactive.
2. AI proposes the scientific objects, relationships and assumptions.
3. The expert corrects this semantic plan before visual production begins.
4. AI chooses representation and learning mechanics from a trusted library.
5. The compiler renders an editable first version.
6. Visual and scientific validators inspect it.
7. The expert clicks or circles a problematic object and describes the correction.
8. The system edits the relevant semantic object or rule—not the entire file.
9. Approved corrections become reusable constraints, examples or component improvements.

SimStep provides direct research support for this direction. Its Chain-of-Abstractions turns an educator’s prompt into a Concept Graph, Scenario Graph, Learning Goal Graph and User Interaction Graph before generating HTML. The graphs become checkpoints that expose assumptions and permit targeted correction.^61 ViviDoc independently proposes a human-readable `DocSpec` with State, Render, Transition and Constraint fields before code generation.^79 These systems suggest that an AI-native Diagrammar should expose task-level abstractions to authors rather than only code.

**Decisive experiment**

Choose twenty recurring STEM objects—vectors, pulleys, rays, lenses, charges, graphs, number lines, particles, circuits and geometric constructions. Implement each once as a semantic primitive. Ask the same model to build forty experiences using:

- Raw HTML/React generation
- Raw SVG generation
- The constrained semantic language

Measure first-pass execution, scientific violations, visual defects, code size, correction time, variant reliability and cross-renderer reuse. If the DSL does not materially reduce correction and increase reuse, its abstractions are wrong.

**What could become defensible**

The syntax itself is not the moat. The valuable assets would be the subject ontologies, constraint solvers, interaction mechanics, correction history, accepted examples, validators and evidence about which representation works for which learning problem.

### 23.2 Can AI recreate the old Java applets and virtual labs?

**Many can probably be rescued or modernized, but “convert all applets with one model” is the wrong framing.** A migration engine needs several routes because the available source, licensing, UI technology and scientific complexity differ.

#### Route A: run the original

CheerpJ is a WebAssembly-based JVM that can run Java applications and Java 8 applets in modern browsers without a Java plugin or source changes.^80 This can immediately make some inaccessible content inspectable again. It is useful for archival access, behavior capture and comparison, but it does not create a modern editable learning object.

#### Route B: compile or transpile

TeaVM compiles Java bytecode into JavaScript or WebAssembly.^81 SwingJS, already used within parts of the Open Source Physics ecosystem, translates Swing-oriented scientific applications for browser delivery. This route can preserve more original logic than complete rewriting, but it may also preserve obsolete interfaces, tangled architecture and inaccessible interaction patterns.

#### Route C: AI-assisted semantic migration

This is the more ambitious opportunity. Instead of translating Java statement by statement, an agentic system could reconstruct the applet at several levels:

1. **Inventory:** source files, binaries, screenshots, documentation, licence and dependencies.
2. **Static analysis:** classes, equations, constants, update loops, event handlers and drawing operations.
3. **Behavior capture:** approved input sequences, state traces, screenshots, graphs and numerical outputs from the running original.
4. **Model extraction:** scientific entities, variables, units, equations, assumptions and valid ranges.
5. **Interaction extraction:** controls, direct manipulation, observables, presets and state transitions.
6. **Target generation:** compile the extracted specification into a modern engine.
7. **Differential verification:** run the same input traces against old and new versions and compare states, outputs and selected rendered landmarks.
8. **Human adjudication:** review scientifically meaningful differences and redesign obsolete UX intentionally.

Research on legacy-code modernization supports the use of specialized agents, retrieval of API examples, compiler feedback and tests instead of one-pass translation. LegacyTranslate’s PL/SQL-to-Java study reports that compilation and test performance improved when API-grounding and refinement agents were added.^94 Research on COBOL-to-Java validation uses symbolic execution to generate equivalent tests and compare source and translated behavior.^95 The languages differ, but the production principle transfers: migration must be evaluated by behavioral equivalence, not whether new code looks plausible.

#### Route D: replace rather than translate

For some applets, the scientific model is simple while the original code is an obstacle. It may be cheaper and better to infer the concept family, retrieve a modern canonical engine and reproduce the useful behavior with improved accessibility, mobile interaction and instrumentation. A hundred mechanically different applets may collapse into ten configurable subject engines.

**The migration decision should therefore be:**

| Applet condition | Best first route |
|---|---|
| Binary only, rights permit execution | Run through a browser JVM and capture behavior |
| Clean Java source, separable model | Compile/transpile, then modernize the interface |
| Valuable model but tangled implementation | Extract specification and re-author semantically |
| Common phenomenon already covered by a trusted engine | Reproduce as a preset/variant |
| Unclear rights | Index metadata and link; do not ingest or reproduce |
| Scientifically weak or obsolete | Preserve historically if useful; do not migrate as canonical content |

**Decisive experiment**

Select twelve applets across four difficulty bands: static diagram, parameterized animation, numerical simulation and multi-instrument virtual lab. For each, compare the four routes on behavior fidelity, expert correction hours, mobile/accessibility quality, output editability and long-term maintainability. The result should be a migration policy and benchmark—not a demo video showing one successful conversion.

### 23.3 Can AI generate virtual laboratories rather than isolated animations?

**Yes, within bounded laboratory families—but a virtual lab requires an experimental model, not just animated apparatus.**

A virtual-lab specification should include:

- Apparatus and permissible configurations
- Independent, dependent and controlled variables
- Units, ranges, precision and uncertainty
- Governing equations or simulation backend
- Experimental procedure and allowed deviations
- Measurement instruments and calibration
- Observable phenomena across time
- Data table and graph bindings
- Expected relationships without forcing a single outcome
- Failure states and safety constraints where relevant
- Learning objectives, misconceptions and reflection prompts
- Accessibility and alternate representations
- Event telemetry for later diagnosis

The generator could use AI to interpret a curriculum source, draft the lab specification, select apparatus and produce an interface. A deterministic subject engine would calculate results. The learner should be able to make a poor experimental choice and observe its consequences; otherwise the product is a guided animation wearing laboratory graphics.

SimStep’s sequence from concept to scenario to goal to interaction is a useful front end for such a system.^61 MAIC-UI demonstrates generation of single-page HTML simulations from PDFs or structured concepts, followed by visual refinement and click-to-locate editing.^62 Code-based world-simulation research adds a second lesson: physical review must be separate from visual review. One 2026 framework coordinates planning, code generation, visual review and physics-analysis agents, revising executable simulation code until both the prompt and physical constraints are satisfied.^78

**Best initial lab families**

- Kinematics with video, position, velocity and acceleration graphs
- DC circuits with measurement probes and fault states
- Geometrical optics with rays, screens, lenses and measurements
- Oscillations and waves with synchronized spatial and graph views
- Gas laws with particles, macro variables and data capture
- Chemical equilibrium with symbolic, particle and concentration views
- Genetics/probability labs where the deterministic model is easy to test

These are preferable to an unrestricted “generate any lab” product because each family can have a verified solver, apparatus ontology, interaction grammar and evaluation suite.

### 23.4 Can one semantic source generate diagram, animation, simulation and game?

**Partly. The scientific model can be shared; the instructional treatment cannot be fully automatic or renderer-independent.**

Consider a lens:

- The scientific source contains optical axis, object, lens, focal points and ray rules.
- A static diagram selects three canonical rays and label positions.
- An animation sequences their construction and maintains object permanence.
- A simulation permits direct manipulation and recomputes the image.
- A game hides selected values, introduces a goal and checks actions.
- A tutor view exposes named variables and events to the conversation.

The shared object should not be a rendered scene. It should be a model plus representations and relationships. Renderer-specific plans can then add timing, camera, UI and feedback.

**Prototype architecture**

    curriculum source / expert brief / legacy content
                         ↓
              scientific concept model
                         ↓
       objective + misconception + learner context
                         ↓
               representation plan
                         ↓
            shared learning-object graph
               ↙       ↓        ↓       ↘
             SVG     Manim   simulation  game
               ↘       ↓        ↓       ↙
             validators + expert review
                         ↓
                approved object family

ViviDoc’s State–Render–Transition–Constraint specification is close to a generic interaction layer.^79 Code2Video and TheoremExplainAgent demonstrate that a separate story plan improves long-form animation generation.^71,72 OmniManim adds explicit keyframe layout and post-render localized repair.^74 Together they imply that the shared representation should stop before renderer-specific spatial and temporal decisions become dominant.

### 23.5 Can AI turn an existing simulation library into tools callable by a tutor?

This may be more valuable than generating new simulations first.

Each Javalab, OSP, Falstad, PhET, GeoGebra or internal object could be wrapped with a machine-readable contract:

```yaml
concepts: [electromagnetic_induction, magnetic_flux]
model: faraday_law_v2
assumptions: [quasi_static, ideal_coil]
controls:
  magnet_position: {type: continuous, range: [-1, 1]}
observables:
  induced_emf: {unit: volt}
events: [drag_start, direction_change, prediction_submitted]
safe_actions: [set_position, reset, show_graph]
use_when:
  - learner_confuses_speed_with_position
validated_questions:
  - predict_sign_before_drag
rights: iframe_with_attribution
```

The tutor would retrieve by instructional affordance, not title. It could request “a verified object where changing magnet velocity reverses or changes induced EMF, with prediction-before-observation enabled.” An adapter would translate those calls into the external or internal runtime and return learner actions as structured events.

**Important problem:** most current repositories describe topic and title, not what can be manipulated, observed, measured or diagnosed. The immediate content-engine opportunity may therefore be an **affordance index and adapter layer** over existing content.

### 23.6 Can AI generate complete problem and game families?

Brilliant already reports a production version of this pattern: a designer establishes the objective and game, AI implements assets and creates practice variants, and humans review the result.^55 A more general engine would represent:

- The underlying state space
- A solver or proof of solvability
- Parameters and allowed ranges
- Difficulty-producing transformations
- Misconception-linked distractors
- Hint and feedback policies
- Visual and interaction templates
- Duplicate/similarity constraints
- Coverage across ordinary cases, boundaries and edge cases

Generation should occur inside this family. For example, a circuit puzzle generator should not draw random circuits and ask whether they work. It should construct a graph, calculate electrical behavior, verify that the intended action is possible, then render the instance.

**Decisive experiment**

Build one family in each of three domains—gear trains, ray optics and chemical-particle classification. Compare AI generation with and without a formal solver. Measure invalid items, duplicate strategies, difficulty predictability and reviewer time. This tests whether executable verification changes production economics.

### 23.7 Can the system learn from creative-technologist corrections?

Corrections should not disappear into chat history. A correction can be converted into one or more durable assets:

- A component API change
- A new validator
- A design-system rule
- A positive/negative retrieval example
- A renderer-specific repair pattern
- A subject invariant
- A misconception treatment
- A benchmark case
- A preference attached to a particular content family

The production system should ask: “Was this correction local, or does it reveal a reusable rule?” Expert work compounds only when the answer changes future generation.

---

## 24. What recent research is actually saying

The recent literature is converging on a surprisingly consistent answer: **reliable multimodal educational content is an intermediate-representation, compilation and evaluation problem—not merely a foundation-model problem.**

### 24.1 Paper map

| Work | Status | What it demonstrates | What a content engine should take from it |
|---|---|---|---|
| [From Text to Visuals](https://arxiv.org/abs/2503.07429) | AIED 2025 | LLMs can generate SVG math diagrams to accompany textual hints; VQA can participate in evaluation.^63 | Use editable vector code as an intermediate output, but add geometry-specific verification. |
| [From Words to Structured Visuals / DiagramAgent](https://openaccess.thecvf.com/content/CVPR2025/html/Wei_From_Words_to_Structured_Visuals_A_Benchmark_and_Framework_for_CVPR_2025_paper.html) | CVPR 2025 | Plan, code, check and diagram-to-code agents improve structured diagram generation and editing across diagram categories.^64 | Preserve a diagram program and a repair loop rather than producing flattened pixels. |
| [StarVector](https://arxiv.org/abs/2312.11556) | Research model | A multimodal model generates SVG code from images and text; SVG-Stack contains two million samples.^70 | Pretraining on structured graphics is possible, but generic SVG competence is not scientific correctness. |
| [Reason-SVG](https://arxiv.org/abs/2505.24499) | 2026 preprint revision | Explicit conceptual, spatial and stylistic planning plus SFT/RL improves SVG validity and visual quality.^65 | Ask the model to plan object composition before emitting vector code; reward structure as well as appearance. |
| [VFig](https://arxiv.org/abs/2603.24575) | 2026 preprint | Uses 66K complex figure–SVG pairs, coarse-to-fine training and rendering-aware rewards; evaluates pixels, components and whole-image quality.^66 | A diagram model needs primitive, topology and holistic evaluation at different granularities. |
| [SciFlow-Bench](https://arxiv.org/abs/2602.09809) | 2026 preprint | Inverse-parses generated scientific-diagram images back into graphs; finds structural correctness remains difficult.^67 | Test whether the intended graph can be recovered, not whether the image merely looks scientific. |
| [VCG-Bench](https://arxiv.org/abs/2605.15677) | 2026 preprint | Evaluates diagram-as-code generation and editing using mxGraph XML across 1,449 diagrams.^68 | Editability and code-to-code revision should be first-class benchmark dimensions. |
| [Diagram-MMU](https://arxiv.org/abs/2608.12262) | 2026 preprint | Models reason about diagrams better than they parse and edit them; agentic workflows help some tasks but not uniformly.^69 | Do not infer editability from visual understanding scores; test parsing, editing and QA separately. |
| [TheoremExplainAgent](https://aclanthology.org/2025.acl-long.332/) | ACL 2025 oral | Planner and coder agents generate long theorem-explanation videos using Manim; introduces a 240-theorem benchmark.^71 | Long-form content needs a story plan and narration plan before animation code. |
| [Code2Video](https://arxiv.org/abs/2510.01174) | 2025 preprint; project reports later acceptance | Planner, coder and visual critic generate executable educational video; visual anchors help repair layout.^72 | Render frames, locate defects spatially and repair the responsible code scope. |
| [LLM2Manim](https://arxiv.org/abs/2604.05266) | 2026 preprint | Adds constrained templates, symbol ledger, segment-level regeneration and expert review; reports a 100-student comparison with slides.^73 | Maintain notation across scenes, regenerate locally and retain human review for content correctness. |
| [OmniManim](https://arxiv.org/abs/2605.15585) | 2026 preprint | Separates visual planning from code synthesis; plans keyframes, diagnoses rendered output and performs localized repair.^74 | Code inspection is insufficient: test intermediate frames and animation continuity after rendering. |
| [ANVIL](https://arxiv.org/abs/2605.16295) | AIED 2026 accepted paper | Generates analogy, visual screenplay and Manim code; uses repair and educator-grounded evaluation.^75 | Analogy generation should be separated from visual realization, with experts grounding automated filters. |
| [LASEV](https://arxiv.org/abs/2602.11790) | KDD 2026 | Separates solution, illustration and narration agents; compiles an executable video script with semantic, rule and tool-based critiques.^76 | Use a shared production state and heterogeneous quality gates; do not let one agent silently own all modalities. |
| [SimStep](https://doi.org/10.1145/3772318.3791514) | CHI 2026 | Teachers author simulations through concept, scenario, goal and interaction graphs; supports annotation and targeted repair.^61 | Expose the abstractions educators understand and let corrections propagate through the generation chain. |
| [MAIC-UI](https://arxiv.org/abs/2604.25806) | 2026 preprint | Generates single-page interactive HTML from documents, separates content alignment from visual polish and applies click-targeted diffs in under ten seconds.^62 | Treat pedagogical generation, visual refinement and local editing as different operations. |
| [ViviDoc](https://arxiv.org/abs/2603.01912) | 2026 demo/preprint | Uses State, Render, Transition and Constraint specifications for human-editable interactive documents.^79 | A compact interaction IR can bridge explorable explanations, documents and courseware. |
| [SimuScene](https://arxiv.org/abs/2602.10840) | 2026 preprint | Tests executable qualitative physical simulations; the strongest tested frontier model reaches only a 21% pass rate.^77 | Arbitrary physics generation is not production-ready; bounded domains and executable tests are essential. |
| [Coding Agent Is Good as World Simulator](https://arxiv.org/abs/2605.14398) | 2026 preprint | Planning, code, visual-review and physics-analysis agents iteratively construct explicit simulation worlds.^78 | Separate physical-state validation from visual fidelity; explicit simulator state is safer than latent video dynamics. |

### 24.2 Seven research conclusions

#### 1. Intermediate representations are becoming the common architecture

The terminology differs—scene description, screenplay, concept graph, interaction graph, DocSpec, executable video script—but the purpose is the same. Intermediate representations make hidden assumptions visible, allow stage-specific validation and reduce the cost of local correction.

The product question is no longer whether to have an intermediate representation. It is **which representations deserve to exist, who can understand them, and where information is lost between them**.

#### 2. For STEM precision, code currently beats direct pixel generation

The strongest educational-video systems use Manim or other executable rendering rather than asking a video model to draw correct mathematics over time.^71,72,74,76 Code provides exact text, geometry, repeatability and the ability to repair a named object. Pixel generation remains valuable for atmosphere, narrative inserts, characters and visually rich contexts where exact state is less important.

A production engine should therefore route by epistemic requirement:

- Exact geometry, labels, equations and causal state → code/structured graphics
- Expressive context, metaphor and atmospheric footage → generative image/video
- Manipulable scientific relationships → executable model + renderer
- Spoken explanation → generated narration constrained by the shared script

#### 3. Visual planning must happen before and after code

Reason-SVG plans composition before drawing.^65 OmniManim predicts layouts before synthesis and then inspects rendered results.^74 Code2Video uses visual anchors to give a critic discrete spatial references.^72 The recurring failure is that a program can execute while producing overlap, poor hierarchy or broken continuity.

The engine needs both **pre-render layout constraints** and **post-render perceptual checks**.

#### 4. Evaluation must examine semantics, structure, behavior and learning—not one aesthetic score

Recent benchmarks use execution success, topology, component matching, inverse parsing, VLM judging, expert review and knowledge-transfer tests.^64,66,67,68,72 A beautiful diagram can encode the wrong graph; correct code can render illegibly; a faithful video can still teach poorly.

A learning-object evaluation stack should separately score:

1. Source/content fidelity
2. Scientific or mathematical validity
3. Structural and spatial correctness
4. Executability and state coverage
5. Interaction behavior
6. Visual and motion quality
7. Accessibility
8. Pedagogical alignment
9. Learning or diagnostic usefulness
10. Human correction cost

#### 5. Local repair is a production requirement

Regenerating a whole artifact can destroy already-correct work and makes creative iteration too slow. LLM2Manim regenerates erroneous segments; OmniManim performs localized repair; MAIC-UI applies targeted code diffs; SimStep maps annotations back to a subgraph.^61,62,73,74

The content engine should maintain stable object IDs and provenance so an instruction such as “move only this label,” “correct this force relationship” or “change the feedback after state 3” becomes a scoped edit.

#### 6. Physical simulation generation remains substantially harder than diagram generation

SimuScene’s 21% best-model pass rate is a warning against polished demos.^77 Physics failures may arise from misunderstood constraints, wrong update equations, unstable integration, visual-state mismatch or missing collision/contact behavior. A simulation engine therefore needs subject-specific components, numerical tests, invariant checks and state exploration—not only a browser screenshot evaluator.

#### 7. Evidence of learning value is encouraging but still early

LLM2Manim reports higher post-test performance and engagement than slides in a within-subject study of 100 undergraduates.^73 MAIC-UI reports a classroom deployment, while SimStep and ANVIL study educator authoring and acceptance.^61,62,75 These results justify further trials, not a universal claim that generated animation or interaction improves learning. Content selection, learner activity, prior knowledge, cognitive load and assessment alignment still determine whether a modality helps.

### 24.3 Research gaps worth owning

- No widely adopted educational intermediate representation connects scientific model, pedagogy, interaction and rendering.
- Most diagram benchmarks evaluate generic structure, not subject-specific laws or conventions.
- Most animation systems stop at video and discard the executable scene as a tutor-controllable object.
- Simulation benchmarks rarely test learning objectives, misconceptions or diagnostic value.
- Human correction time is not yet a standard metric, although it determines real production economics.
- Cross-modal consistency—equation, diagram, graph, narration and interaction—is weakly benchmarked.
- Existing applet migration is not treated as a large-scale AI content-reconstruction problem.
- Rights, provenance and source reliability are rarely integrated into generation benchmarks.
- Few systems learn durable rules from expert corrections across projects.
- There is no trusted registry in which a tutor can discover simulations by affordance and call them through a common contract.

These gaps are potential product territory, dataset territory and research-collaboration territory.

---

## 25. What companies outside edtech are building—and what to borrow

Education is not the only industry trying to turn human intent into complex, editable, executable media. Game development, product design, VFX, CAD, scientific communication and robotics have already developed production ideas that an AI content engine should borrow.

The transfer should be architectural rather than cosmetic. The question is not “can this tool make a nice educational image?” It is “what difficult production problem has this industry already learned to represent?”

### 25.1 Figma: give the agent the design system and project state

Figma’s recent direction connects prompt-to-code generation with existing designs, component libraries, npm packages, styles and design-system guidance. Figma Make can begin from a written idea or an existing design; Make kits connect prototypes to an organization’s actual design system. Figma also emphasizes version history and interchange between editable design layers and working code.^82

Figma’s argument around design-system context is directly relevant: an agent produces better code when it knows the real components, tokens and usage rules rather than reconstructing the organization’s design language from screenshots.^83

**What to borrow**

- Give the content agent the real STEM component library, not a long style prompt.
- Bind design components to production code so generated objects use canonical implementations.
- Preserve every AI and manual edit as a versioned state.
- Let authors move between a visual canvas and executable output.
- Treat project context—existing objects, curriculum, conventions and corrections—as part of generation.

**Experiment**

Expose a small STEM design system to an agent as callable components. Compare output against the same agent receiving screenshots and written style rules. Measure component reuse, visual consistency and correction time.

### 25.2 Canva: code can become a design object

Canva Code moved prompt-to-interactive creation into a general creative suite. Canva’s 2025 release positioned it as a way for non-programmers to make interactive experiences, including learning games.^84 In 2026, Canva described responsive experiences created through conversation and introduced HTML import so existing or AI-generated experiences could enter Canva and remain editable rather than requiring reconstruction.^85

**What to borrow**

- Generated interactions should be editable inside the same environment as presentations, diagrams and media.
- A content team should be able to import an existing HTML explorable and continue visually.
- Interaction is becoming a normal creative format, not a separate engineering project.
- The product surface can hide code while preserving code-backed behavior.

**What education must add**

Canva optimizes general creative production. A STEM engine needs scientific objects, verified relationships, units, state tests and learning mechanics. The opportunity is “Canva Code with a scientific model and evaluation layer,” not a Canva clone.

### 25.3 Adobe: orchestrate models inside a professional production workflow

Adobe increasingly treats generative AI as one part of a larger creative system: images, vector graphics, audio and video can be generated or extended, then edited in established applications. Firefly also exposes multiple first- and third-party models rather than assuming one model is best for every asset.^86 Adobe’s enterprise positioning emphasizes reusable production workflows and commercially usable assets.^87

**What to borrow**

- Route tasks to different models and renderers under one production interface.
- Keep generated content inside professional editing and review workflows.
- Treat provenance, rights and brand safety as product capabilities.
- Support batch variation without destroying editability.
- Separate generative models from the durable workflow and asset system.

**STEM application**

Use a structural engine for equations and diagrams, a code renderer for animation, an image model for contextual scenes, TTS for narration and a video editor for final assembly. The durable object is the production specification and timeline, not the output of any one model.

### 25.4 Unity: AI grounded in a live project and runtime

Unity describes AI tools that use project context and convert designs or images into project-ready assets and playable scenes.^88 Its discussion of MCP for game development makes the grounding problem explicit: an agent can see the scene hierarchy, code and editor state rather than offer generic advice.^89

**What to borrow**

- The agent should inspect the actual scene, components and runtime state.
- Generated assets must enter the project in standard native forms.
- Play mode is a validation environment: generation is followed by execution.
- Scenes, prefabs, scripts, animations and behaviors remain separate but composable.
- An editor/runtime combination allows both professional production and learner delivery.

**STEM application**

A scientific content editor should expose its object tree, equations, constraints, current render and test failures to the agent. “Make the experiment work” is too vague; “the force-arrow component is not bound to `netForce` in state 4” is actionable.

### 25.5 Roblox: generate through schemas, then add behavior

Roblox’s Cube work moves from text-to-3D meshes toward “4D” objects, where the fourth dimension is interaction. Its early functional-object generation uses defined schemas: for example, a car is represented as a body plus four wheels, with generated parts assembled into a coherent object. Roblox’s longer-term description adds physical properties, code, animation and relationships with the environment.^90

This is highly relevant to STEM content. A useful generated object is not an undifferentiated visual mesh. It has named parts and an expected functional structure.

**What to borrow**

- Generate against a schema that defines required parts and roles.
- Separate appearance generation from functional behavior.
- Attach material, mass and other physical properties to generated objects.
- Make generated assets native to a runtime where they can be tested.
- Start with a small number of supported schemas rather than arbitrary object generation.

**STEM application**

Define schemas such as `OpticalBench-6`, `DC-Circuit-Network`, `PulleySystem`, `CellMembraneTransport` or `ProjectileExperiment`. AI fills and styles the parts; trusted code controls behavior; validators check the completed object.

### 25.6 NVIDIA Omniverse and Isaac Sim: make assets simulation-ready

NVIDIA’s Omniverse is organized around physically based digital twins, simulation-ready 3D worlds, sensors, synthetic data and validation.^91 One 2025 release described a model that adds physics and material attributes to existing 3D assets, reducing the work required to make them “SimReady.”^92 Isaac Sim provides an extensible simulation and synthetic-data framework over OpenUSD.^93

**What to borrow**

- A visual asset and a simulation-ready asset are different products.
- Semantic and physical enrichment can be its own AI pipeline.
- Synthetic variation is valuable when the governing environment remains controlled.
- Sensors and measurements should be explicit objects.
- Generated worlds require validation before they become training or decision environments.

**STEM application**

Create an “EduReady” enrichment pipeline. Given a diagram, model or 3D asset, the system adds semantic names, variables, units, interaction handles, measurement points, allowed states, learning affordances, accessibility descriptions and diagnostic events.

### 25.7 Autodesk Fusion: generate options inside constraints

Autodesk’s generative-design workflow produces alternatives against engineering criteria rather than simply matching a visual prompt. Fusion combines CAD, simulation and manufacturing data; its AI features include constraint application, generative design and automated drawings.^96

**What to borrow**

- Generation begins with objectives and constraints.
- The system can return several valid alternatives rather than one supposedly perfect artifact.
- Candidates are evaluated against explicit performance criteria.
- The underlying parametric model remains editable.
- Human choice is part of the generative loop.

**STEM application**

Instead of “generate a visualization for conservation of momentum,” ask the system to produce five representation plans under constraints: grade level, learner misconception, interaction time, mobile width, accessible contrast and required equation. Score each plan before rendering and let the expert select or combine them.

### 25.8 SideFX Houdini: procedural content as a dependency graph

Houdini’s node-based workflow makes every production step editable, repeatable and parameterized. Its Procedural Dependency Graph manages tasks and dependencies across large film, game and VFX pipelines.^97 The value is not only node-based visual programming; it is that the history of how an asset was produced remains executable.

**What to borrow**

- Represent production as a graph of transformations and dependencies.
- Cache successful intermediate outputs.
- Re-run only downstream stages affected by a correction.
- Package common subgraphs as reusable production recipes.
- Schedule different renderers, validators and exports through one graph.

**STEM application**

A change to `focalLength` should invalidate the ray computation, diagram and selected animation frames—but not force regeneration of narration that does not mention the value. Dependency-aware production can make multimodal revision economically viable.

### 25.9 Pixar OpenUSD: compose scenes without flattening ownership

OpenUSD was designed to compose large 3D scenes from many assets, sources and animations while supporting collaboration.^98 Its layers, references and variant sets allow sparse, non-destructive overrides instead of copying and flattening an entire scene.^99

**What to borrow**

- Separate base scientific content, curriculum adaptation, visual style, localization and learner-specific state into layers.
- Let a later layer override selected properties without editing the canonical source.
- Store variants as explicit choices rather than duplicated files.
- Preserve provenance and ownership across composed assets.
- Define a stable scene description independent of one renderer.

**STEM application**

A canonical projectile model could be layered with a school’s notation, a dyslexia-friendly theme, a JEE problem context, Hindi labels and an individual learner’s parameter values. None of these adaptations should fork and obscure the verified model.

### 25.10 BioRender: domain libraries outperform generic blank canvases

BioRender combines a large curated scientific icon and template library with AI-assisted editable figure generation.^100 It is strongest in life science because the system already knows the visual objects and conventions scientists repeatedly need. Its AI positioning emphasizes editable first drafts, style consistency and targeted modification rather than a final uneditable image.^101

**What to borrow**

- Build domain-specific component libraries with expert-reviewed semantics.
- Use retrieval and composition before inventing new pixels.
- Return editable first drafts.
- Apply a consistent house style through components and rules.
- Add specialized generators for recurring figure families.

**Important warning**

BioRender’s own 2026 trust report says respondents trusted fully AI-generated scientific figures far less than fully human-created figures.^102 Whether or not that survey generalizes, it reinforces the importance of provenance, editability and expert verification.

### 25.11 World Labs and Runway: preserve spatial and visual identity

World Labs’ Marble generates persistent 3D worlds from text, images, video or rough 3D layouts and allows users to edit, expand, combine and export them.^103 Runway’s Gen-4 References focuses on maintaining subjects, objects, locations and style across generated images and video.^104

**What to borrow**

- A reference should be a persistent identity, not merely a prompt attachment.
- World generation should output reusable scene assets, not only a video fly-through.
- The same object may need to survive different views, lighting conditions and media.
- Long-form production still benefits from storyboards, shot decomposition and reference packs.

**STEM application**

A molecule, apparatus or organism should retain identity across a labelled diagram, close-up animation, virtual environment and tutor conversation. However, visual consistency is not scientific consistency. A separate semantic model must determine whether the object’s parts and behavior remain correct.

### 25.12 Cross-industry synthesis

| Outside-industry lesson | Translation into a multimodal STEM engine |
|---|---|
| Figma: ground AI in the design system | Ground generation in verified educational components and tokens |
| Canva: make code a normal creative object | Let educators visually edit code-backed interactions |
| Adobe: orchestrate specialized models | Route each modality to the appropriate renderer/model |
| Unity: agent sees project and runtime | Expose scene graph, code, state and test results |
| Roblox: schema before function | Generate named parts, then attach verified behavior |
| NVIDIA: enrich assets for simulation | Add semantics, physics, instruments and diagnostic events |
| Autodesk: generate within constraints | Produce and score multiple valid representation plans |
| Houdini: preserve procedural dependencies | Recompute only affected stages and reuse production graphs |
| OpenUSD: layer and compose non-destructively | Separate canonical model, style, curriculum and personalization |
| BioRender: domain library + editable AI draft | Build subject-specific primitives and retrieval-first generation |
| World Labs/Runway: persistent references | Maintain object identity across scenes and modalities |

The pattern is consistent: high-value production systems do not ask AI for a finished artifact in an empty space. They give it native objects, schemas, project context, constraints, layers, references, editors, runtimes and evaluation loops.

---

## 26. Opportunity map for a startup

These are possible wedges into the larger multimodal engine. They can be investigated independently while contributing to a common architecture.

### Opportunity A: the applet archaeologist

**Question:** Can AI recover valuable scientific behavior from decades of Java applets, EJS projects, Flash-like interactives and undocumented HTML simulations?

**Product:** A migration workbench that runs, records, analyzes and reconstructs legacy content into a modern semantic format.

**Why it matters:** The world already paid to create an enormous corpus of simulations. Much of the value is trapped in obsolete runtimes, weak metadata and inaccessible interfaces.

**Technical bet:** static analysis + runtime traces + vision comparison + domain-model extraction + differential tests.

**Decisive evidence:** consistent behavioral migration across several simulation classes, not one hand-selected applet.

**Possible moat:** the migration benchmark, recovered models, behavior traces, adapters and a growing corpus of paired legacy/modern learning objects.

### Opportunity B: the AI-native STEM scene compiler

**Question:** Can a compact semantic language make diagram and interactive generation dramatically more reliable than raw code?

**Product:** A Diagrammar-like compiler containing subject primitives, constraints, interaction patterns and multiple render targets.

**Why it matters:** Brilliant’s reported gear-puzzle result and recent research both indicate that representation design changes model performance.^55,61,74

**Technical bet:** typed abstract syntax tree + constraint solver + stable IDs + SVG/Canvas/Manim adapters + renderer feedback.

**Decisive evidence:** lower human correction time and higher valid-variant yield than direct HTML/React/Manim generation.

**Possible moat:** language ecosystem, validators, component library and correction data.

### Opportunity C: the interactive-courseware copilot

**Question:** Can a teacher or learning designer move from textbook page or sketch to a high-quality interactive—and repair it by pointing?

**Product:** Source analysis, representation planning, interactive generation, click-to-edit and review workflow.

**Why it matters:** TAL, SimStep, MAIC-UI, ViviDoc and Canva Code all signal demand for zero-code interactive production.^57,61,62,79,84

**Technical bet:** structured source extraction + staged generation + visual selection linked to semantic objects + incremental diffs.

**Decisive evidence:** experts can produce and approve useful objects faster while making fewer hidden scientific compromises.

**Possible moat:** expert workflow adoption and accumulated domain corrections.

### Opportunity D: the simulation registry and tutor tool layer

**Question:** Can an AI tutor discover and operate existing simulations as safely as it calls a calculator?

**Product:** A registry of simulation capabilities, adapters, rights, parameters, events and instructional use cases.

**Why it matters:** Current simulation abundance is largely invisible to tutor orchestration. Titles and topic tags do not express what a learner can manipulate or what the tutor can diagnose.

**Technical bet:** affordance schema + runtime adapters + safe action contracts + event normalization + availability monitoring.

**Decisive evidence:** the tutor consistently selects a useful existing object and uses learner interaction to improve its next pedagogical action.

**Possible moat:** the normalized registry, rights relationships, adapters and learning-use evidence.

### Opportunity E: the validator and benchmark company

**Question:** Can we become the test infrastructure for generated STEM diagrams, animations and simulations?

**Product:** Evaluation suites for geometry, topology, equations, state coverage, physics invariants, visual quality, accessibility and learning alignment.

**Why it matters:** SimuScene, SciFlow-Bench, VCG-Bench and OmniManim all show that generation is advancing faster than dependable evaluation.^67,68,74,77

**Technical bet:** executable tests + symbolic checks + render analysis + expert benchmark sets + modality-specific metrics.

**Decisive evidence:** the validators predict expert rejection and catch meaningful failures missed by ordinary visual judging.

**Possible moat:** proprietary failure cases, expert-labelled benchmarks and integrations into many content pipelines.

### Opportunity F: the verified content-family generator

**Question:** Can one expert-designed mechanic produce thousands of correct, diverse and difficulty-controlled items?

**Product:** A family editor containing solver, parameters, constraints, difficulty transformations, feedback and visual templates.

**Why it matters:** The production bottleneck is often the hundredth high-quality variant, not the first impressive prototype.

**Technical bet:** constructive generation + solver verification + misconception models + similarity detection + psychometric calibration.

**Decisive evidence:** high reviewer acceptance, low duplication and predictable difficulty across unseen parameter regions.

**Possible moat:** verified families, response data and difficulty/learning calibration.

### Opportunity G: the multimodal learning-object compiler

**Question:** Can one verified object generate a diagram, animation, explorable, assessment and tutor tool without semantic drift?

**Product:** A shared model with renderer-specific plans and cross-modal consistency tests.

**Why it matters:** Current content teams recreate the same concept separately in script, storyboard, art, motion, development and assessment.

**Technical bet:** shared semantic IDs + dependency graph + layered overrides + modality adapters + consistency validation.

**Decisive evidence:** changing one relationship correctly updates all representations with materially less rework.

**Possible moat:** the intermediate representation and cross-modal production graph.

### Opportunity H: the “EduReady” asset pipeline

**Question:** Can AI turn ordinary media and 3D assets into tutor-aware learning objects?

**Product:** Semantic enrichment that adds names, variables, behaviors, measurement points, learning affordances, accessibility and telemetry.

**Why it matters:** Game, VFX and world-generation tools will make raw assets abundant. Educational usefulness will remain scarce.

**Technical bet:** multimodal parsing + domain ontology grounding + interaction handles + validated event contracts.

**Decisive evidence:** enriched assets can be safely reused across several lessons and controlled by a tutor without manual recoding.

**Possible moat:** enrichment schema, subject ontologies and reusable behavior library.

---

## 27. Experiments that reveal whether these ideas are real

These experiments are deliberately designed to answer strategic questions. They are not a delivery schedule.

| Experiment | Question answered | Minimum convincing result | Failure would teach us |
|---|---|---|---|
| Raw code vs STEM DSL | Does representation design improve production? | Higher valid yield and lower correction time across several concepts | The DSL is too low-level, restrictive or poorly aligned with model reasoning |
| Twelve-applet migration benchmark | Can legacy content become a modern corpus? | More than one migration route succeeds predictably by content class | Preservation may be cheaper than semantic modernization |
| One model, four renderers | Can semantics survive diagram, video, simulation and game? | Named objects and relationships remain consistent after edits | The shared IR boundary is misplaced |
| Physics state explorer | Can tests find failures a screenshot misses? | Automatically discovers wrong behavior across hidden states | Domain tests are too weak or the generated runtime is opaque |
| Click-to-semantic repair | Can experts correct without code? | Pointing at an object produces a scoped, stable correction | Visual-to-source grounding is unreliable |
| Variant-family generator | Can AI scale the hundredth asset? | Verified diversity with predictable difficulty and low duplicate rate | Variation is cosmetic or destabilizes the objective |
| Simulation affordance index | Can a tutor retrieve by instructional need? | Better selection than topic/title search in blinded expert review | Metadata does not capture real teaching judgment |
| Existing asset → EduReady object | Can external media become interactive infrastructure? | Asset gains useful controls, semantic IDs and event outputs | Enrichment costs approach full re-authoring |
| Expert-correction replay | Do corrections compound? | A correction reduces the same error on later related objects | Memory is too local or rules overgeneralize |
| Cross-modal consistency test | Can one change propagate safely? | Equation, graph, diagram and narration update without contradiction | Renderer-specific content needs stronger separation |

### Evidence that should accompany every impressive demo

- The original input and every intermediate representation
- Whether the example was cherry-picked
- Number of generations and manual edits
- Model, prompt and component versions
- Execution and validation results
- Hidden states and edge cases tested
- Scientific expert review status
- Rights and provenance of retrieved material
- Time to first draft and time to approval
- Whether the object remains editable
- Whether a related variant can be generated reliably
- Whether the tutor can read and act on learner interaction

Without this evidence, an attractive demo says little about production readiness.

### The strongest combined bet

The most interesting startup is probably not a generic text-to-animation company or another simulation catalogue. It is the combination of four systems:

1. **A retrieval and archaeology layer** that understands existing educational content.
2. **A semantic STEM compiler** that represents models, views, interactions and pedagogy.
3. **A production copilot** through which experts plan, point, correct and approve.
4. **A validation and runtime layer** that lets tutors safely retrieve, parameterize and observe learning objects.

This combination turns content production from a services pipeline into product infrastructure. It also fits a realistic human–AI division of labor: experts define what should be learned and what a good experience feels like; AI searches, decomposes, configures, implements, checks and varies; deterministic engines preserve the laws; evidence from use improves the system.

The founder-facing proposition is not:

> We can generate more STEM content with AI.

It is:

> We can convert the world’s fragmented STEM media and expert production judgment into a structured, testable and reusable system—then let both content teams and AI tutors compose from it safely.

---

## Sources

1. Manim Community. “[Manim Community](https://www.manim.community/)” and “[Documentation](https://docs.manim.community/en/stable/).”
2. Pontus Granström. “[Diagrammar: Simply Make Interactive Diagrams](https://www.youtube.com/watch?v=gT9Xu-ctNqI).” Strange Loop, 2022.
3. PhET Interactive Simulations. “[Source Code](https://phet.colorado.edu/en/about/source-code)” and “[Simulation Development Overview](https://scenerystack.org/info-sync/simulation-development-overview/).”
4. Google DeepMind. “[Genie: Generative Interactive Environments](https://deepmind.google/research/publications/60474/),” 2024; “[Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/),” 2025.
5. Google Research. “[Learn Your Way: Reimagining Textbooks with Generative AI](https://research.google/blog/learn-your-way-reimagining-textbooks-with-generative-ai/),” 2025.
6. Samarth P. et al. “[Manimator: Transforming Research Papers into Visual Explanations](https://arxiv.org/abs/2507.14306),” arXiv preprint, 2025.
7. Aastha Joshi et al. “[LLM2Manim: Pedagogy-Aware AI Generation of STEM Animations](https://arxiv.org/abs/2604.05266),” arXiv preprint, 2026.
8. Yuejia Li et al. “[See Before You Code: Learning Visual Priors for Spatially Aware Educational Animation Generation](https://arxiv.org/abs/2605.15585),” arXiv preprint, 2026.
9. Jhon Lopez, Carlos Hinojosa and Bernard Ghanem. “[SGA: Plug&Play Geometric Verification for Educational Video Synthesis](https://arxiv.org/abs/2607.18116),” arXiv preprint, 2026.
10. Wenjia Jiang et al. “[ManimAgent: Self-Evolving Multimodal Agents for Visual Education](https://arxiv.org/abs/2606.30296),” arXiv preprint, 2026.
11. Arvind Satyanarayan et al. “[Vega-Lite: A Grammar of Interactive Graphics](https://idl.cs.washington.edu/files/2017-VegaLite-InfoVis.pdf),” IEEE Transactions on Visualization and Computer Graphics, 2017; “[Vega-Lite](https://vega.github.io/vega-lite/).”
12. Hyeok Kim et al. “[Cicero: A Declarative Grammar for Responsive Visualization](https://arxiv.org/abs/2203.08314),” CHI, 2022.
13. Amplify. “[Introduction to Computation Layer](https://service.amplify.com/article/amplify-classroom-introduction-to-computation-layer).”
14. Rive. “[Data Binding Overview](https://rive.app/docs/editor/data-binding/overview),” “[Listeners](https://rive.app/docs/editor/state-machine/listeners),” and “[State Machine Playback](https://rive.app/docs/runtimes/state-machines).”
15. Brilliant. “[About Brilliant](https://brilliant.org/about/)” and “[How Do I Use Interactives on Brilliant?](https://brilliant.org/help/features/how-do-i-use-interactives-on-brilliant/).”
16. GeoGebra. “[About GeoGebra](https://www.geogebra.org/about).”
17. Google Research. “[InstructPipe: Generating Visual Blocks Pipelines with Human Instructions and LLMs](https://research.google/blog/instructpipe-generating-visual-blocks-pipelines-with-human-instructions-and-llms/),” 2025.
18. Mingde Xu et al. “[WebVIA: A Web-based Vision-Language Agentic Framework for Interactive and Verifiable UI-to-Code Generation](https://arxiv.org/abs/2511.06251),” arXiv preprint, 2025.
19. OpenAI. “[New Ways to Learn Math and Science in ChatGPT](https://openai.com/index/new-ways-to-learn-math-and-science-in-chatgpt/),” March 2026.
20. Google Research. “[Generative UI: A Rich, Custom, Visual Interactive User Experience for Any Prompt](https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/),” November 2025.
21. GeoGebra. “[GeoGebra Apps API](https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_API/).”
22. Mathigon. “[About Mathigon](https://mathigon.org/about)” and “[For Teachers](https://mathigon.org/teachers).”
23. ExploreLearning. “[What’s a Gizmo?](https://gizmos.explorelearning.com/about-gizmos/).”
24. Labster. “[Virtual Labs](https://www.labster.com/)” and “[Labster Reaches 300 Science Simulations](https://www.labster.com/news/300-simulations-announced).”
25. Animo. “[Animo: Manim AI](https://animo.video/).”
26. AnimG. “[Manim AI Generator](https://animg.app/en).”
27. Rohit G. “[Manim Video Generator](https://github.com/rohitg00/manim-video-generator).” GitHub.
28. tldraw. “[AI Integrations](https://tldraw.dev/docs/ai)” and “[Make Real: The Story So Far](https://tldraw.dev/blog/make-real-the-story-so-far).”
29. Napkin AI. “[Turn Text into Editable Diagrams and Visuals](https://www.napkin.ai/).”
30. Adobe. “[Adobe Firefly](https://www.adobe.com/products/firefly.html)” and “[Meet the Firefly Video Model](https://blog.adobe.com/en/publish/2025/02/12/meet-firefly-video-model-ai-powered-creation-with-unparalleled-creative-control),” 2025.
31. Feng et al. “[LayoutGPT: Compositional Visual Planning and Generation with Large Language Models](https://research.google/pubs/layoutgpt-compositional-visual-planning-and-generation-with-large-language-models/),” NeurIPS, 2023.
32. Ravidu S. R. Silva et al. “[Training and Agentic Inference Strategies for LLM-based Manim Animation Generation](https://arxiv.org/abs/2604.18364),” arXiv preprint, 2026.
33. Jonathan Zong et al. “[Lyra 2: Designing Interactive Visualizations by Demonstration](https://arxiv.org/abs/2008.09576),” IEEE TVCG, 2021.
34. Peiling Jiang et al. “[Graphologue: Exploring Large Language Model Responses with Interactive Diagrams](https://arxiv.org/abs/2305.11473),” UIST, 2023.
35. AMD. “[AI Creative Technologist](https://careers.amd.com/careers-home/jobs/85330).” Job posting accessed September 2026.
36. Adobe Careers. “[Principal AI Technologist](https://careers.adobe.com/us/en/job/R165304/Principal-AI-Technologist)” and related Firefly creative-technology roles. Accessed September 2026.
37. Kyndryl. “AI Innovation Lab — Senior Creative Technologist.” Current job listing indexed September 2026.
38. Collier.Simon. “Creative Technologist.” Current job listing indexed September 2026.
39. Lightricks. “[Careers](https://boards.greenhouse.io/lightricks).” Creative technology roles reference computer vision, machine learning, rendering, computational photography and AR.
40. Autodesk. “[2026 AI Jobs Report](https://adsknews.autodesk.com/en/news/2026-ai-jobs-report/),” 2026.
41. Open Source Physics / ComPADRE. “[Open Source Physics](https://www.compadre.org/osp/).”
42. Félix J. García Clemente, Francisco Esquembre and Loo Kang Wee. “[Deployment of Physics Simulation Apps Using Easy JavaScript Simulations](https://arxiv.org/abs/1708.00778),” 2017.
43. Loo Kang Wee et al. “[Computer Models Design for Teaching and Learning Using Easy Java Simulation](https://arxiv.org/abs/1210.3410),” 2012; Loo Kang Wee and Wai Keong Mak, “[Leveraging on Easy Java Simulation Tool and Open Source Computer Simulation Library](https://arxiv.org/abs/1207.0219),” 2012.
44. Open Source Physics @ Singapore. “[Home](https://sg.iwant2study.org/ospsg/),” “[AI Prompt Library for Educational Simulations](https://sg.iwant2study.org/ospsg/index.php/ai-prompt-library/1366-prompt-library-for-educational-simulations),” “[WebEJS and xAPI Integration](https://www.sg.iwant2study.org/ospsg/index.php/translations/1269-xapi-webejs),” and “[How-to Resources](https://www.sg.iwant2study.org/ospsg/index.php/translations).”
45. Javalab. “[What Is Javalab?](https://javalab.org/en/about_en/).”
46. Javalab. “[Gravity Simulator](https://javalab.org/en/gravity_en/)” and “[Faraday’s Law of Electromagnetic Induction](https://javalab.org/en/faradays_law_2_en/).”
47. Javalab. “[Blocklab — Block Coding Tool](https://javalab.org/en/blocklab_en/),” 2026.
48. Javalab. “[Copyright Policy](https://javalab.org/copyright/).”
49. Paul Falstad. “[Math, Physics and Engineering Applets](https://www.falstad.com/mathphysics.html).”
50. Paul Falstad. “[Ripple Tank Simulation](https://www.falstad.com/ripple/).”
51. Paul Falstad. “[Licensing](https://www.falstad.com/licensing.html).”
52. Erik Neumann. “[myPhysicsLab](https://www.myphysicslab.com/),” “[Architecture](https://www.myphysicslab.com/develop/docs/Architecture.html),” and “[Developer Documentation](https://www.myphysicslab.com/develop/docs/index.html).”
53. Erik Neumann. “[Rigid Body Physics Engine](https://www.myphysicslab.com/explain/physics-engine-en.html)” and “[Roller Coaster Simulation](https://www.myphysicslab.com/roller/roller-single-en.html).”
54. Strange Loop. “[Diagrammar: Simply Make Interactive Diagrams](https://thestrangeloop.com/2022/diagrammar-simply-make-interactive-diagrams.html),” conference description, 2022.
55. Brilliant. “[Hand-crafted, machine-made: How We Make Learning Games with AI](https://blog.brilliant.org/hand-crafted-machine-made/),” January 2025.
56. Rayhan Alghiffari Azizi. “[Diagramatics](https://github.com/ray-pH/diagramatics),” GitHub repository; inspected `README.md`, `package.json`, `src/diagram.ts`, `src/html_interactivity.ts` and exports.
57. TAL. “[Jiuzhang Aixue Teacher Edition Upgraded: 170+ Agents Support the Full Teaching Workflow](https://www.tal.com/zh-cn/news/detail/3022),” January 2026. Chinese-language company report.
58. Explorablescience / Mecanica Science. “[Physics Simulation Engine](https://github.com/explorablescience/PhysicsSimulationEngine),” GitHub repository; inspected `README.md`, `package.json`, `src/core/Simulator.js`, `src/drawer/Plotter.js` and `LICENSE`.
59. Open Source Physics @ Singapore. “[AI HTML5, Open Source Physics (Easy JavaScript Simulation and Tracker) and TagUI: Physics Applets Virtual Lab](https://weelookang.blogspot.com/p/physics-applets-virtual-lab.html).”
60. Javalab. “[Physics Simulation](https://javalab.org/en/tag/physics-simulation/),” category index.
61. Zoe Kaputa et al. “[SimStep: Human-in-the-Loop Authoring of Interactive Educational Simulations Through Task-Level Abstractions](https://doi.org/10.1145/3772318.3791514).” CHI, 2026; earlier system description: “[Chain-of-Abstractions for Incremental Specification and Debugging of AI-Generated Interactive Simulations](https://arxiv.org/abs/2507.09664),” 2025.
62. Shangqing Tu et al. “[MAIC-UI: Making Interactive Courseware with Generative UI](https://arxiv.org/abs/2604.25806),” arXiv preprint, 2026.
63. Jaewook Lee et al. “[From Text to Visuals: Using LLMs to Generate Math Diagrams with Vector Graphics](https://arxiv.org/abs/2503.07429).” AIED, 2025.
64. Jingxuan Wei et al. “[From Words to Structured Visuals: A Benchmark and Framework for Text-to-Diagram Generation and Editing](https://openaccess.thecvf.com/content/CVPR2025/html/Wei_From_Words_to_Structured_Visuals_A_Benchmark_and_Framework_for_CVPR_2025_paper.html).” CVPR, 2025.
65. Ximing Xing et al. “[Reason-SVG: Enhancing Structured Reasoning for Vector Graphics Generation with Reinforcement Learning](https://arxiv.org/abs/2505.24499),” arXiv preprint, revised 2026.
66. Qijia He et al. “[VFig: Vectorizing Complex Figures in SVG with Vision-Language Models](https://arxiv.org/abs/2603.24575),” arXiv preprint, 2026.
67. Tong Zhang et al. “[SciFlow-Bench: Evaluating Structure-Aware Scientific Diagram Generation via Inverse Parsing](https://arxiv.org/abs/2602.09809),” arXiv preprint, 2026.
68. Xiaoyan Su et al. “[VCG-Bench: Towards a Unified Visual-Centric Benchmark for Structured Generation and Editing](https://arxiv.org/abs/2605.15677),” arXiv preprint, 2026.
69. Weihao Bo et al. “[Diagram-MMU: A Multi-Modal Benchmark for Scientific Diagrams](https://arxiv.org/abs/2608.12262),” arXiv preprint, 2026.
70. Juan A. Rodriguez et al. “[StarVector: Generating Scalable Vector Graphics Code from Images and Text](https://arxiv.org/abs/2312.11556),” arXiv, 2023–2024.
71. Max Ku et al. “[TheoremExplainAgent: Towards Video-based Multimodal Explanations for LLM Theorem Understanding](https://aclanthology.org/2025.acl-long.332/).” ACL, 2025.
72. Yanzhe Chen, Kevin Qinghong Lin and Mike Zheng Shou. “[Code2Video: A Code-centric Paradigm for Educational Video Generation](https://arxiv.org/abs/2510.01174),” arXiv preprint, 2025; [project and code](https://showlab.github.io/Code2Video/).
73. Aastha Joshi et al. “[LLM2Manim: Pedagogy-Aware AI Generation of STEM Animations](https://arxiv.org/abs/2604.05266),” arXiv preprint, 2026.
74. Yuejia Li et al. “[See Before You Code: Learning Visual Priors for Spatially Aware Educational Animation Generation](https://arxiv.org/abs/2605.15585),” arXiv preprint, 2026.
75. Yuri Noviello, Anastasiia Birillo and Gosia Migut. “[ANVIL: Analogies and Videos for Lecturers](https://arxiv.org/abs/2605.16295).” Accepted for AIED, 2026.
76. Lingyong Yan et al. “[Beyond End-to-End Video Models: An LLM-Based Multi-Agent System for Educational Video Generation](https://arxiv.org/abs/2602.11790).” KDD, 2026.
77. Yanan Wang et al. “[SimuScene: Training and Benchmarking Code Generation to Simulate Physical Scenarios](https://arxiv.org/abs/2602.10840),” arXiv preprint, 2026.
78. Hongyu Wang et al. “[Coding Agent Is Good as World Simulator](https://arxiv.org/abs/2605.14398),” arXiv preprint, 2026.
79. Yinghao Tang et al. “[Demonstrating ViviDoc: Generating Interactive Documents through Human-Agent Collaboration](https://arxiv.org/abs/2603.01912),” arXiv demonstration paper, 2026.
80. Leaning Technologies. “[CheerpJ Documentation: Overview](https://cheerpj.com/docs/overview.html),” version 4.3.
81. TeaVM. “[TeaVM](https://teavm.org/)” and “[JavaScript Modules](https://teavm.org/docs/runtime/js-modules.html).”
82. Figma. “[Introducing Figma Make](https://www.figma.com/blog/introducing-figma-make/),” May 2025; “[Figma Make](https://www.figma.com/make/).”
83. Figma. “[Design Systems and AI: Why MCP Servers Are the Unlock](https://www.figma.com/blog/design-systems-ai-mcp/),” August 2025; “[Design Context, Everywhere You Build](https://www.figma.com/blog/design-context-everywhere-you-build/),” September 2025.
84. Canva. “[Introducing Visual Suite 2.0: Productivity, Meet Creativity](https://www.canva.com/newsroom/news/canva-create-2025/),” April 2025.
85. Canva. “[Introducing Canva AI 2.0](https://www.canva.com/newsroom/news/canva-create-2026-ai/),” April 2026.
86. Adobe. “[Adobe Expands Generative AI Offerings](https://news.adobe.com/news/2025/02/firefly-web-app-commercially-safe),” February 2025; “[Adobe Firefly](https://www.adobe.com/products/firefly.html).”
87. Adobe. “[Firefly for Business](https://business.adobe.com/products/firefly-business.html),” reusable creative-production workflows.
88. Unity. “[AI Game Development Tools and RT3D Software](https://unity.com/features/ai).”
89. Unity. “[MCP Servers in Game Development Explained](https://unity.com/blog/mcp-servers-game-development),” June 2026.
90. Roblox. “[Introducing Roblox Cube: Our Core Generative AI System for 3D and 4D](https://about.roblox.com/newsroom/2025/03/introducing-roblox-cube),” March 2025; “[Accelerating Creation, Powered by Roblox’s Cube Foundation Model](https://about.roblox.com/newsroom/2026/02/accelerating-creation-powered-roblox-cube-foundation-model),” February 2026.
91. NVIDIA. “[Omniverse](https://www.nvidia.com/en-us/omniverse/),” physical-AI and digital-twin development platform.
92. NVIDIA. “[NVIDIA Expands Omniverse with Generative Physical AI](https://nvidianews.nvidia.com/news/nvidia-expands-omniverse-with-generative-physical-ai),” January 2025.
93. NVIDIA. “[Isaac Sim](https://developer.nvidia.com/isaac/sim),” robotics simulation and synthetic-data framework.
94. Zahra Moti, Heydar Soudani and Jonck van der Kogel. “[LegacyTranslate: LLM-based Multi-Agent Method for Legacy Code Translation](https://arxiv.org/abs/2603.14054),” arXiv preprint, 2026.
95. Atul Kumar et al. “[Automated Validation of COBOL to Java Transformation](https://arxiv.org/abs/2506.10999),” arXiv preprint, 2025.
96. Autodesk. “[New Investments in Fusion Bring AI-Powered Transformation to Manufacturing](https://adsknews.autodesk.com/en/news/new-investments-in-fusion-bring-ai-powered-transformation-to-manufacturing/),” September 2025; “[Autodesk Fusion](https://www.autodesk.com/products/fusion-360/overview).”
97. SideFX. “[PDG](https://www.sidefx.com/products/houdini/pdg/)” and “[Houdini Procedural Modeling](https://www.sidefx.com/products/houdini/modeling/).”
98. Pixar Animation Studios. “[OpenUSD](https://www.pixar.com/openusd).”
99. OpenUSD. “[Introduction to USD](https://openusd.org/dev/intro.html)” and “[USD Frequently Asked Questions](https://openusd.org/dev/usdfaq.html).”
100. BioRender. “[Scientific Figure Templates](https://www.biorender.com/templates)” and “[Icon Library](https://www.biorender.com/library).”
101. BioRender. “[AI Tools for Scientists](https://www.biorender.com/ai-tools)” and “[BioRender AI](https://www.biorender.com/blog/ai).”
102. BioRender. “[Trust in AI Report 2026](https://www.biorender.com/case-study/trust-in-ai-report-2026).”
103. World Labs. “[Marble: A Multimodal World Model](https://www.worldlabs.ai/blog/marble-world-model),” November 2025; “[3D as Code](https://www.worldlabs.ai/blog/3d-as-code).”
104. Runway. “[Introducing Runway Gen-4](https://runwayml.com/research/introducing-runway-gen-4)” and “[Creating with Gen-4 Image References](https://help.runwayml.com/hc/en-us/articles/40042718905875-Creating-with-Gen-4-Image-References),” 2025.
