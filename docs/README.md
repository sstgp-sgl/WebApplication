# 📘 Content Editing Guide

Welcome to the HCI Portfolio project! This guide will help you add text, images, and new sections to our portfolio website.

## 📂 Where are the files?

All the content pages are located in `src/pages/`. Here is the map:

| Page on Website | File to Edit | Description |
|----------------|--------------|-------------|
| **Home** | `src/pages/index.astro` | The landing page, hero section, and mission statement. |
| **Brainstorm** | `src/pages/brainstorm.astro` | Problem space, ideation, mind maps, sketches. |
| **Process** | `src/pages/process.astro` | Information architecture, wireframes, user flows. |
| **Prototypes** | `src/pages/prototypes.astro` | Low-fi and Hi-fi prototypes, interactive demos. |
| **Testing** | `src/pages/testing.astro` | User testing sessions, feedback, and iterations. |
| **Team** | `src/pages/team.astro` | Team member profiles and roles. |
| **Reflection** | `src/pages/reflection.astro` | Final thoughts, what we learned, future steps. |

---

## ✏️ How to Add Text

To add text, find the file you want to edit (e.g., `src/pages/brainstorm.astro`) and look for the `<Section>` tags. You can add standard HTML tags like `<p>`, `<h3>`, `<ul>` inside.

### Example 1: Adding a Paragraph
```html
<Section title="User Persona">
    <h3 class="text-xl font-bold text-white mb-4">Meet Sarah, the Student</h3>
    <p class="text-neutral-400 leading-relaxed mb-4">
        Sarah is a 20-year-old sophomore who wants to study abroad but feels overwhelmed by the application process. She needs a way to track her deadlines and requirements in one place.
    </p>
</Section>
```

### Example 2: Adding a List
```html
<Section title="Key Findings">
    <ul class="list-disc list-inside text-neutral-400 space-y-2">
        <li>Students prefer mobile-first experiences.</li>
        <li>Gamification increases engagement by 40%.</li>
        <li>Clear progress tracking is essential.</li>
    </ul>
</Section>
```

---

## 🖼️ How to Add Images

Adding images requires two steps: placing the file and linking it correctly.

### Step 1: Place the Image
Put your image files (JPG, PNG, SVG) into the `public/` folder.
*   Example: `public/persona-sarah.png`
*   Example: `public/wireframes/home-v1.png`

### Step 2: Link the Image in Code
**CRITICAL:** You must use `${import.meta.env.BASE_URL}` before the image path. This ensures the image loads correctly on GitHub Pages.

```html
<!-- Example: Basic Image -->
<img 
    src={`${import.meta.env.BASE_URL}persona-sarah.png`} 
    alt="User Persona: Sarah" 
    class="w-full h-auto border border-neutral-800 rounded-none" 
/>

<!-- Example: Image inside a Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
        <h3 class="text-white mb-2">Sketch V1</h3>
        <img 
            src={`${import.meta.env.BASE_URL}sketches/sketch-01.png`} 
            alt="Initial Sketch" 
            class="w-full border border-neutral-800" 
        />
    </div>
    <div>
        <h3 class="text-white mb-2">Sketch V2</h3>
        <img 
            src={`${import.meta.env.BASE_URL}sketches/sketch-02.png`} 
            alt="Refined Sketch" 
            class="w-full border border-neutral-800" 
        />
    </div>
</div>
```

---

## 🚀 How to Preview Your Changes

Before you push your changes to GitHub, you should check them locally.

1.  **Open Terminal** in the `docs/` folder.
2.  **Run the dev server:**
    ```bash
    npm run dev
    ```
3.  **Open the link** shown in the terminal (usually `http://localhost:4321/ApplicationWeb/`).
4.  **Edit files**, save, and the browser will update automatically!

---

## 🎨 Style Guide (Quick Reference)

*   **Headings:** Use `<h3 class="text-white font-bold">` for subtitles.
*   **Body Text:** Use `<p class="text-neutral-400">` for standard text.
*   **Accent Color:** Use `text-brand-accent` (Blue) for highlights.
*   **Borders:** Use `border border-neutral-800` (or `border-border-dark`) for subtle outlines.
*   **Backgrounds:** Use `bg-neutral-900` (or `bg-bg-darker`) for card backgrounds.

---

## 👥 How to Edit Your Team Profile

To update your team member information, edit the `src/pages/team.astro` file. Look for the `teamMembers` array near the top of the file.

### Step 1: Find Your Profile

Open `src/pages/team.astro` and find the `teamMembers` array (around line 8-43):

```javascript
const teamMembers = [
    {
        name: "Your Name",
        role: "Your Role",
        bio: "Your bio goes here...",
        skills: ["Skill 1", "Skill 2", "Skill 3"],
        github: "your-github-username",
        linkedin: "your-linkedin-username",  // optional
        email: "your.email@university.edu"
    },
    // ... other team members
];
```

### Step 2: Update Your Information

Replace the placeholder values with your real information:

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Your full name | `"Alex Chen"` |
| `role` | Your role in the team | `"Lead Designer & UX Researcher"` |
| `bio` | Short description (2-3 sentences) | `"Passionate about creating intuitive user experiences..."` |
| `skills` | Array of your skills | `["Figma", "User Research", "Prototyping"]` |
| `github` | Your GitHub username | `"alexchen"` |
| `linkedin` | Your LinkedIn username (optional) | `"alexchen"` |
| `email` | Your university email | `"alex.chen@university.edu"` |

### Step 3: Add Your Avatar (Optional)

To add a profile picture:

1. Place your photo in `public/` folder (e.g., `public/avatar-alex.jpg`)
2. Add the `avatar` field to your profile:

```javascript
{
    name: "Your Name",
    avatar: "avatar-alex.jpg",  // ← Add this
    role: "Your Role",
    // ... rest of your info
}
```

### Tips

- **Keep bio concise**: 2-3 sentences is ideal
- **List 4-6 skills**: Your most relevant technical and soft skills
- **Social links are optional**: Only add what you're comfortable sharing publicly
- **Test locally**: Run `bun run dev` to preview changes before committing

### Example: Complete Profile

```javascript
{
    name: "Sarah Kim",
    role: "Frontend Developer",
    bio: "Brings designs to life with clean, performant code. Responsible for the portfolio site and prototyping the main application. Loves learning new frameworks.",
    skills: ["React", "TypeScript", "Astro", "Tailwind CSS", "Git"],
    avatar: "avatar-sarah.jpg",
    github: "sarahkim",
    linkedin: "sarahkim",
    email: "sarah.kim@university.edu"
}
```
