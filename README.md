# Notes on Building Better AI Tutors

A public research and design notebook about what it takes to build a complete AI tutor for difficult learning goals—including IIT-JEE, NEET, UPSC, CAT and K–12 learning.

**Website:** https://anandgrandhi.github.io/ai-tutor/  
**Visual editor:** https://app.pagescms.org/anandgrandhi/ai-tutor/main

## Project direction

This is not a chatbot essay. The project studies the full tutoring system: subject and exam models, learner modelling, diagnosis, pedagogical decisions, motivation, memory, multimodal content, relationship, parent and teacher layers, evaluation, safety, architecture and product moat.

## Repository structure

- `index.html` — portfolio homepage
- `ai-tutors.html` — AI tutor notes interface
- `content.json` — source of truth for the editable notes
- `.pages.yml` — PageCMS configuration
- `images/` — images used in notes
- `archive/` — recovered source material and editorial plans
- `content.js` — legacy copy retained for reference; the live page does not load it

## Edit the notes

The easiest route is the [PageCMS editor](https://app.pagescms.org/anandgrandhi/ai-tutor/main). Open **AI Tutor Notes**, edit the content and save. PageCMS commits the change to the `main` branch.

You can also edit `content.json` directly on GitHub. The public website updates after GitHub Pages publishes the commit.

## Content model

Each topic groups questions using tags:

```json
{
  "id": "teaching",
  "title": "Choosing how to teach",
  "description": "The next explanation is not always the next best action.",
  "tags": ["Difficulty", "Decision", "Judgement", "Explanation"]
}
```

Each question follows this shape:

```json
{
  "id": "short-unique-name",
  "tag": "Decision",
  "question": "The question readers will see",
  "answer": [
    "The first paragraph.",
    "An optional second paragraph."
  ],
  "links": [
    {
      "label": "Optional link title",
      "url": "https://example.com"
    }
  ],
  "images": [
    {
      "src": "images/example-diagram.png",
      "alt": "Describe what the image shows",
      "caption": "Optional caption"
    }
  ]
}
```

A question appears under the topic whose `tags` list contains the question's `tag`. Keep existing IDs stable because they are used as URL anchors.

## Recovered research archive

The recovered material, overlap with the live notes and recommended publishing order are documented in:

- [Recovered material — September 2026](archive/recovered-material-2026-09-09.md)

The current editorial priority is to publish the **architecture spine** first, then the **tutoring decision loop**, followed by gameful design, role/personality, the parent layer and multimodal teaching.

## Design system

The site uses Inter throughout.

- Ink: `#34384c`
- Muted: `#6f7485`
- Faint: `#9aa0ad`
- Border: `#e3e6ec`
- Blue: `#0b63ff`

The visual language is light, spacious and restrained: thin dividers, white space and regular-to-medium type weights.
