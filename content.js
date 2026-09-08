/*
  EDITING THIS PAGE

  Add a new item inside `questions` using this shape:

  {
    id: "short-unique-name",
    tag: "Topic",
    question: "The question readers will see",
    answer: [
      "The first paragraph.",
      "An optional second paragraph."
    ],
    links: [
      { label: "Optional link title", url: "https://example.com" }
    ],
    images: [
      {
        src: "images/example-diagram.png",
        alt: "Describe what the image shows",
        caption: "Optional caption or source note"
      }
    ]
  },

  Remove `links` or `images` when an entry does not need them.
  Images can use a local path, such as `images/diagram.png`, or a full web URL.
  The page numbers the questions and builds the accordions automatically.
*/

window.AI_TUTOR_NOTES = {
  eyebrow: "Working atlas of an AI tutor / 01",
  title: "The questions every AI tutor should answer",
  meta: "K–12, with exam preparation in mind.<br>Working list. Not complete.",
  intro: "A tutor can know the syllabus and still know almost nothing about the student. Before it explains, recommends or encourages, I want to know whether it can answer these questions.",
  revised: "September 2026",
  footer: "This is a working list. It should change when these questions are tested against real students, not when the wording starts to feel finished.",

  questions: [
    {
      id: "goal",
      tag: "Goal",
      question: "What is this student actually trying to achieve?",
      answer: [
        "“Prepare for JEE” is not a useful answer. The tutor should know the target attempt, score or rank, available time, school demands, current resources and what the student is willing to give up.",
        "The stated goal may also belong to the parent. The tutor needs to notice that."
      ]
    },
    {
      id: "position",
      tag: "Trajectory",
      question: "How far are they from that goal?",
      answer: [
        "Not a fictional “62% mastered” bar. I want a rough forecast based on retained knowledge, problem-solving ability, exam performance, pace and remaining time, with the uncertainty left visible."
      ]
    },
    {
      id: "knows",
      tag: "Knowledge",
      question: "What do they genuinely understand?",
      answer: [
        "A recent correct answer is weak evidence. Can they explain the idea, recognize it in a new form, use it without the tutor and still retrieve it next week?"
      ]
    },
    {
      id: "false-confidence",
      tag: "Calibration",
      question: "What do they think they understand, but do not?",
      answer: [
        "This is often more dangerous than not knowing. Fluent videos, familiar examples and easy practice create a feeling of mastery that disappears when the representation changes."
      ]
    },
    {
      id: "correct-answer",
      tag: "Diagnosis",
      question: "Why was that answer correct?",
      answer: [
        "Knowledge, guessing, elimination, memory of the same question, a copied procedure and a lucky arithmetic error can produce the same answer. The next teaching move depends on which one happened."
      ]
    },
    {
      id: "wrong-answer",
      tag: "Diagnosis",
      question: "Why was that answer wrong?",
      answer: [
        "“Incorrect” hides everything useful. Was the concept missing, the model wrong, the condition overlooked, the notation confusing, the calculation careless, or the student simply rushing?"
      ]
    },
    {
      id: "misconception",
      tag: "Student model",
      question: "What misconception best explains the pattern?",
      answer: [
        "A misconception should remain a hypothesis until several pieces of evidence support it. The tutor should track competing explanations instead of turning one wrong response into a permanent label."
      ]
    },
    {
      id: "prerequisite",
      tag: "Prerequisites",
      question: "Is the real problem somewhere earlier?",
      answer: [
        "The student may be stuck on rotation because vectors are weak, or on equilibrium because logarithms are slow. Re-explaining the current chapter will not repair a missing prerequisite."
      ]
    },
    {
      id: "forgetting",
      tag: "Memory",
      question: "What are they likely to forget next?",
      answer: [
        "The tutor should distinguish fragile knowledge from durable knowledge. Review should arrive before complete forgetting, but not so early that retrieval becomes effortless."
      ]
    },
    {
      id: "difficulty",
      tag: "Difficulty",
      question: "Is this struggle useful or pointless?",
      answer: [
        "Some struggle forces the student to build a model. Some is just overload. The tutor needs to know when to wait, when to offer a small hint and when to step back to an easier representation."
      ]
    },
    {
      id: "next-action",
      tag: "Decision",
      question: "What should happen next?",
      answer: [
        "Another explanation is only one option. The next move might be a question, worked example, simulation, contrasting case, prerequisite review, timed problem, break or no intervention at all."
      ]
    },
    {
      id: "why-now",
      tag: "Judgement",
      question: "Why this action, for this student, now?",
      answer: [
        "If the tutor cannot explain its choice, personalization may be decorative. A useful answer should connect the student evidence, the learning goal and the expected result of the intervention."
      ]
    },
    {
      id: "representation",
      tag: "Explanation",
      question: "What representation might make this idea click?",
      answer: [
        "Text, diagram, animation, graph, analogy, physical model and equation are not interchangeable decorations. The right form depends on the concept, the learner and what has already failed."
      ]
    },
    {
      id: "completion",
      tag: "Engagement",
      question: "Are they learning, or merely completing?",
      answer: [
        "Time spent, questions answered and streaks can all rise while learning stays flat. The tutor should notice rapid guessing, hint dependence, repeated easy choices and work done only to satisfy the system."
      ]
    },
    {
      id: "help-seeking",
      tag: "Learning behaviour",
      question: "Do they ask for help too early, too late, or well?",
      answer: [
        "Help-seeking is part of the learner model. Some students avoid hints to protect pride. Others reveal every step before attempting it. Both patterns change what the tutor should do."
      ]
    },
    {
      id: "absence",
      tag: "Motivation",
      question: "Why did they stop showing up?",
      answer: [
        "The cause could be boredom, shame, fatigue, a broken routine, school exams, a difficult chapter or loss of belief in the goal. A generic reminder treats all of these as the same problem."
      ]
    },
    {
      id: "emotion",
      tag: "Relationship",
      question: "What is the student not saying?",
      answer: [
        "A child may say “I don’t understand” when they mean “I am afraid I cannot do this.” The tutor can look for changes in pace, avoidance, unusually short replies and repeated topic switching, but it should not pretend to read a mind."
      ]
    },
    {
      id: "memory-boundary",
      tag: "Memory",
      question: "What should the tutor remember, and what should it forget?",
      answer: [
        "Remember durable facts that improve teaching: goals, persistent misconceptions, successful explanations and agreed routines. Do not turn an anxious evening, a private disclosure or an old weakness into a permanent identity."
      ]
    },
    {
      id: "human-help",
      tag: "Boundary",
      question: "When should a human take over?",
      answer: [
        "Repeated diagnostic failure, sustained distress, conflict with a parent, possible safeguarding concerns and high-stakes decisions need escalation. A complete tutor includes the ability to stop tutoring."
      ]
    },
    {
      id: "uncertainty",
      tag: "Uncertainty",
      question: "How sure is the tutor about any of this?",
      answer: [
        "Every learner claim should carry uncertainty. The tutor needs to know when the evidence is thin, seek another observation and avoid acting as if a probability were a fact.",
        "This may be the question underneath all the others."
      ]
    }
  ]
};
