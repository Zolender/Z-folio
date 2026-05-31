# Portfolio Build — Lecture Notes


## Session 1 — Structure (May 30, 2026)


### 1. Why we build structure before design

This is the most important decision we made today, and it's worth understanding why.

When you add animations and styling to a component that isn't structurally correct yet, you end up doing two things at once: figuring out what something should do AND figuring out how it should look. Those two problems interfere with each other. You fix a layout bug and break an animation. You add a transition and realize the component doesn't have the right data to animate.

Structure first means: at the end of this session, the app works. Data flows. Routing works. You can navigate to every page. Nothing crashes. Then when we add design in the next session, we're dressing something that already functions correctly. The problems stay separated and manageable.

This applies beyond portfolios. On any non-trivial project, getting the data model right before the UI is almost always the better order.

---

### 2. TypeScript interfaces — `src/types/index.ts`

```ts
export interface Project {
  name: string;
  slug: string;
  oneLiner: string;
  description: string;
  stack: string[];
  coreStack: string[];
  whatILearned: string;
  links: {
    live: string;
    github: string;
  };
  screenshots: string[];
}
```

An **interface** in TypeScript is a contract. It says: any object that calls itself a `Project` must have exactly these fields, with exactly these types. If you try to create a project object that's missing `slug`, TypeScript will refuse to compile — it tells you before the browser ever sees the code.

**Why this matters in practice:**

- `ProjectCard` receives a `project: Project` prop. TypeScript now knows every field that object has. When you type `project.` in your editor, it autocompletes every field. No guessing.
- If we ever rename a field — say, `oneLiner` to `tagline` — TypeScript shows us every single place in the codebase that breaks. We can't miss one.
- It makes the data layer the single source of truth for what a project *is*, not just where the data lives.

**The `slug` field specifically:**

A slug is a URL-safe version of a name. `"CineSearch"` becomes `"cinesearch"`. We use it in two places: the URL (`/projects/cinesearch`) and as the lookup key in `getProjectBySlug()`. The slug is how the URL and the data connect.

**`coreStack` vs `stack`:**

We have both because they serve different jobs. `stack` is the full picture — everything used in the project. `coreStack` is the short list for the card and the accent tags — the 3 or 4 technologies that define the project at a glance. Keeping them separate means we display the right amount of information at the right level of detail, without duplicating the data.

---

### 3. The data layer — `src/data/projects.ts`

```ts
export const projects: Project[] = [ ... ]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
```

`projects` is a typed array — `Project[]` means "an array where every item is a `Project`". TypeScript enforces this.

**The single source of truth principle:**

Both the project card on the home page and the full project detail page read from this one file. There is no duplication. If you want to update CineSearch's description, you change it once in `projects.ts` and it updates everywhere automatically. If we had copy-pasted the data into multiple components, updating one project would require finding and changing it in multiple places — and you'd inevitably miss one.

This is a general principle worth internalizing: **data should live in one place and be read from that place.** Every copy of the same data is a future bug.

**`getProjectBySlug` and the return type `Project | undefined`:**

The `| undefined` means this function might not return anything — if you search for `"unknownproject"` and it doesn't exist in the array, `.find()` returns `undefined`. TypeScript forces you to handle that case. That's exactly why `ProjectPage.tsx` has the early return:

```ts
if (!project) {
  return <div>Project not found.</div>
}
```

If we hadn't handled it, TypeScript would have complained about trying to access properties on something that might be `undefined`.

---

### 4. CSS custom properties — `src/styles/global.css`

```css
:root {
  --color-bg: #181715;
  --color-accent: #b8936a;
  /* ... */
}
```

CSS custom properties (also called CSS variables) are defined on `:root` — the root element of the document, which means they're available everywhere on the page.

**Why not just use Tailwind classes directly?**

We're using Tailwind v4, which has native CSS variable support. But the palette is complex — 8 custom colors that don't exist in Tailwind's defaults. We could extend the Tailwind config, but defining them as CSS variables gives us something more useful: we can reference them in arbitrary Tailwind classes like `bg-[var(--color-accent)]` or `border-[var(--color-border)]`, AND we can use them in plain CSS when Tailwind's utility classes don't reach.

More importantly: if the palette ever changes (say, the accent becomes slightly different), we change one hex value in one place and everything updates. The tokens are the color system.

**The `:root` selector:**

This is a CSS pseudo-class that selects the `<html>` element. It has higher specificity than `html` as a selector, so it wins any specificity contest. Variables defined here cascade down to every element in the document.

---

### 5. Component hierarchy — how the pieces connect

Here's the tree of what renders what:

```
main.tsx
└── App.tsx (BrowserRouter + Routes)
    └── Layout.tsx
        ├── Navbar.tsx
        ├── [current page via React Router]
        │   ├── Home.tsx
        │   │   ├── Hero.tsx
        │   │   ├── About.tsx
        │   │   ├── Projects.tsx → ProjectCard.tsx (x3)
        │   │   ├── Skills.tsx
        │   │   └── Contact.tsx
        │   └── ProjectPage.tsx
        └── Footer.tsx
```

Each level has one job:

- `main.tsx` — mounts the React app into the DOM. That's all it does.
- `App.tsx` — sets up routing. Knows nothing about what any page looks like.
- `Layout.tsx` — provides the consistent shell (Navbar + Footer) that every page shares. Knows nothing about specific content.
- `Home.tsx` — assembles the home page from sections. Knows the order of sections, nothing else.
- Individual sections — own their content and layout. Know nothing about each other.

This separation means: if you want to change the Navbar, you change one file. If you add a new page, the Navbar and Footer come for free via Layout. If you reorder sections on the home page, you change one line in Home.tsx.

---

### 6. React Router v7 — routing and navigation

React Router v7 changed the import path. You import from `"react-router"`, not `"react-router-dom"` — they merged the packages. This caught us during the build when we noticed the package.json had `"react-router"` not `"react-router-dom"`.

**How BrowserRouter works:**

`BrowserRouter` listens to the URL bar. When the URL is `/`, it renders `Home`. When it's `/projects/cinesearch`, it renders `ProjectPage`. The user sees different content without the browser making a new network request to the server — this is client-side routing, the foundation of single-page apps (SPAs).

**Dynamic routes — the `:slug` parameter:**

```tsx
<Route path="/projects/:slug" element={<ProjectPage />} />
```

The colon in `:slug` means "this part of the URL is a variable." When the user visits `/projects/z-tales`, React Router captures `"z-tales"` as the value of `slug`. Inside `ProjectPage`, we read it with:

```tsx
const { slug } = useParams<{ slug: string }>();
```

`useParams` is a hook — a function that reads the current URL's parameters. The generic `<{ slug: string }>` tells TypeScript the shape of what we expect to get back.

Then we do:

```tsx
const project = getProjectBySlug(slug ?? "");
```

The `??` is the nullish coalescing operator. `slug` could be `undefined` (TypeScript doesn't know if the route will always provide it), so `slug ?? ""` means "use `slug` if it exists, otherwise use an empty string." `getProjectBySlug("")` will return `undefined`, which we handle with the not-found view.

**`useNavigate` — programmatic navigation:**

```tsx
const navigate = useNavigate();
navigate(`/projects/${project.slug}`); // in ProjectCard onClick
navigate(-1); // "go back" in ProjectPage
```

`navigate(-1)` is equivalent to hitting the browser's back button in code. The `-1` means "go one step back in the browser history stack."

---

### 7. Props and interfaces — how data moves between components

In React, data flows down via **props** — parent components pass data to children.

```tsx
interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) { ... }
```

We define a `ProjectCardProps` interface to type the props. This means:
- If `Projects.tsx` forgets to pass `project` to `ProjectCard`, TypeScript catches it at compile time.
- Inside `ProjectCard`, every property of `project` is known and autocompleted.
- Renaming a prop requires updating the interface and every call site — TypeScript shows you where.

The `{ project }` in the function signature is **destructuring** — we're pulling `project` out of the props object directly, rather than writing `props.project` everywhere inside the component.

---

### 8. The `SectionWrapper` pattern

```tsx
export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  return (
    <section id={id} className={`w-full px-6 py-24 ${className}`}>
      {children}
    </section>
  );
}
```

This component exists for one reason: every section needs consistent padding and the `<section>` tag. Instead of repeating `px-6 py-24` in every section component, we extract it once. When we later add scroll animations to `SectionWrapper`, every section gets them automatically — zero changes to the individual section files.

`children` in React is a special prop — it's whatever JSX you put between the opening and closing tags of a component:

```tsx
<SectionWrapper id="about">
  <h2>About</h2>  {/* this is children */}
</SectionWrapper>
```

The `className = ""` is a default parameter — if you don't pass a `className`, it defaults to an empty string, so the template literal `w-full px-6 py-24 ${""}` doesn't break.

---

### 9. The contact form — controlled inputs and async state

The form uses **controlled inputs** — React owns the state, not the DOM:

```tsx
const [form, setForm] = useState({ name: "", email: "", message: "" });

<input value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} />
```

`...prev` is the spread operator — it copies all existing fields of the state object, then we override just the one field that changed. This is necessary because `setForm` replaces the entire state object, not just one field.

The `status` state (`"idle" | "sending" | "sent" | "error"`) is a **union type** — it can only be one of those four exact strings, nothing else. TypeScript enforces it. This drives the UI: the button text changes, a message appears after submission. One state variable controls all of it.

The form currently posts to `/api/contact` — this endpoint doesn't exist yet. We'll wire up Resend when we're closer to deployment. The structure is correct; the integration is pending.

---

### What's next

- **Placeholder components:** `MagneticWrapper.tsx`, `Lightbox.tsx`, `useMagnetic.ts`, `useScrollAnimation.ts` — shells only, no logic yet. We'll fill these in during the animation session.
- **Design pass:** Apply the color palette, typography (Inter), spacing, and visual weight to everything we built today.
- **Animation pass:** Depth-pull scroll on Hero, stagger reveals on sections, horizontal scroll on Projects, magnetic cursor.
- **Resend integration:** Wire up the contact form to actually deliver emails.
- **Screenshots:** Add per-project screenshots to `src/assets/screenshots/` when ready.

---
