# The questions every AI tutor should answer

An editable accordion website. The writing is kept separate from the page design.

## Edit the writing

1. Open `content.js` on GitHub.
2. Click the pencil icon (**Edit this file**).
3. Change the page title, introduction, revision date, or any question and answer.
4. Click **Commit changes**.

The public website updates automatically after GitHub Pages finishes publishing.

## Add or edit a topic

Topics are listed near the top of `content.js`. Each topic has a title, a short description, and a list of tags:

```js
{
  id: "teaching",
  title: "Choosing how to teach",
  description: "The next explanation is not always the next best action.",
  tags: ["Difficulty", "Decision", "Judgement", "Explanation"]
}
```

A question appears under the topic whose `tags` list contains that question's `tag`. This lets you move a question by changing only its tag.

## Add a question

In `content.js`, add another item inside `questions`:

```js
{
  id: "short-unique-name",
  tag: "Topic",
  question: "The question readers will see",
  answer: [
    "The first paragraph.",
    "An optional second paragraph."
  ]
},
```

The page creates the number and accordion automatically.

## Add an image to an answer

1. Open the `images` folder on GitHub.
2. Choose **Add file → Upload files** and upload the image.
3. Add this inside the relevant question in `content.js`:

```js
images: [
  {
    src: "images/your-image.jpg",
    alt: "Describe what the image shows",
    caption: "Optional caption"
  }
]
```

You may add several image objects inside the `images` list. If an answer has no image, leave the `images` section out.

## Add a link

Add this inside the relevant question:

```js
links: [
  {
    label: "Name readers will see",
    url: "https://example.com"
  }
]
```

## Change the design

The colors, type, spacing, and accordion layout are in `index.html`. Most routine updates do not require changing it.

## Publish with GitHub Pages

In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

Your stable URL will have the form:

`https://YOUR-GITHUB-USERNAME.github.io/ai-tutor-questions/`

You can also connect a custom domain from the same Pages settings.
