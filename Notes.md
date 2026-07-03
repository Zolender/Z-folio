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

## Sessions 2–5 — Design, animation, contact, interaction layer (May 31 – June 30, 2026)

These sessions weren't written up at the time; the short version, so the record is complete:

- **Design pass (May 31):** Palette moved from warm stone to electric indigo via `@theme` tokens. Every section styled. Favicon, brand icons, Inter font.
- **Animation pass (June 1–6):** `useMotion` hook wrapping `prefers-reduced-motion`, `SectionWrapper` scroll reveals, Hero depth-pull, canvas `Background` (dot grid + ripples + glow), custom cursor, magnetic CTAs. Everything transform/opacity only, everything with a reduced-motion fallback.
- **Contact form (June 4):** `/api/contact` serverless function on Vercel, Resend delivering to the inbox. Confirmed working end to end.
- **Interaction layer (June 29–30):** ⌘K command palette, live accent theming + light/dark/system mode with a circular-wipe View Transition, scroll-spy navbar, native View Transitions for route changes (card title morphs into the page heading), masked text reveals, project-card 3D tilt, OG/Twitter/JSON-LD metadata.
- **Deployment:** live at zolender.xyz (Vercel redirects the apex to www.zolender.xyz).

---

## Session 6 — Production hardening (July 3, 2026)

This session was different from the others: no new features, no new visuals. We took an audit list of production gaps — the things that separate "works on my machine" from "ready for strangers and search engines" — verified each one against the actual code, and fixed everything fixable from the repo. Nine commits, each one verified with a build before committing.

The theme of the session: **robustness is invisible when it works and embarrassing when it's missing.** Nobody compliments your 404 page, but a recruiter hitting a blank screen from a mistyped URL is a real cost.

---

### 1. Error boundaries — why this is the one place you still write a class

React has a rule: when a component throws during render, React unmounts the whole tree. Without a safety net, one bug in one component means a completely white page — no navbar, no message, nothing.

An **error boundary** is a component that catches render errors in its children and shows a fallback UI instead:

```tsx
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) return <FallbackUI />;
    return this.props.children;
  }
}
```

Two things worth understanding:

- **It has to be a class component.** There is no hook equivalent of `getDerivedStateFromError` / `componentDidCatch`. This is the one remaining case in modern React where a class is required, which is why ours lives in `components/layout/ErrorBoundary.tsx` looking slightly old-fashioned next to everything else.
- **It only catches render errors.** Errors in event handlers, `setTimeout` callbacks, or async code don't go through the boundary — those you handle with ordinary try/catch (which our contact form already does).

Placement matters: we wrapped `<Layout>` inside it but left the providers *outside*, so a crash in page content shows the fallback while theme state survives.

---

### 2. The catch-all route — `path="*"`

Our router only knew two paths: `/` and `/projects/:slug`. Any other URL matched nothing, and React Router rendered... nothing. Layout with an empty hole in it.

```tsx
<Route path="*" element={<NotFound />} />
```

The `*` matches any URL no other route claimed. Order doesn't matter — React Router v7 ranks routes by specificity, so `*` always loses to a real match. Note the difference between two failure modes we now handle separately:

- `/foo` → no route matches → `NotFound` page (404)
- `/projects/not-a-real-project` → route matches, data lookup fails → the existing "Project not found" early return

Same user experience, two different mechanisms. The first is routing; the second is the `Project | undefined` return type from Session 1 doing its job.

---

### 3. Per-page titles — what SPAs forget

In a server-rendered site every page has its own `<title>`. In an SPA there is exactly one HTML document, so the title never changes unless *you* change it. Every page on our site said "Eben-Ezer Ndeingar — Full-Stack Developer", even the CineSearch page — which reads wrong in browser tabs, history, and bookmarks.

The fix is a small hook (`src/hooks/useDocumentTitle.ts`):

```tsx
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Eben-Ezer Ndeingar` : BASE;
    return () => {
      document.title = BASE;
    };
  }, [title]);
}
```

The cleanup function is the interesting part: when a project page unmounts, the title falls back to the base rather than leaking the previous page's title onto the next one. This is the standard `useEffect` contract — set something up, return the function that undoes it.

---

### 4. Accessibility — placeholders are not labels

Our contact form looked labeled because every field had a placeholder. But a placeholder is not a label:

- It **disappears the moment you type**, so users can't check what a filled field is.
- Screen readers don't reliably treat it as the field's name.

The pattern that keeps the visual design and fixes the semantics is the **visually-hidden label**:

```tsx
<label htmlFor="contact-name" className="sr-only">Name</label>
<input id="contact-name" name="name" placeholder="Name" ... />
```

`sr-only` is a Tailwind utility that clips the element to a 1px invisible box while keeping it in the accessibility tree. Sighted users see exactly what they saw before; screen reader users now hear "Name, edit text".

The second fix: the "Message sent." / error text appeared visually but was never *announced* — a blind user submits and hears nothing. A **live region** fixes that:

```tsx
<div role="status" aria-live="polite">
  {status === "sent" && <p>Message sent.</p>}
</div>
```

`aria-live="polite"` tells assistive tech: when content appears inside this element, read it out after the current utterance finishes. The wrapper `div` is always rendered (empty most of the time) — that's deliberate. Live regions work best when the region exists *before* the content changes; conditionally rendering the region itself is the classic mistake that makes announcements unreliable.

---

### 5. Securing a public endpoint — three cheap layers

`/api/contact` is a public URL that sends email. Anything public will eventually be found by bots. We added three defenses, in order of what they actually protect against:

**CORS lockdown.** We had `Access-Control-Allow-Origin: *`, which lets JavaScript on *any website* call our endpoint from a visitor's browser. Restricting it to our origin means other sites' front-end code gets blocked by the browser. The key mental model: **CORS only governs cross-origin browser JS.** Our own form calls `/api/contact` with a relative URL — that's same-origin, so CORS never applies to it, on any deployment. And CORS does nothing against curl or server-side scripts; that's what the next two layers are for.

**Honeypot.** A field real humans never see or fill:

```tsx
<input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
       className="absolute left-[-9999px] h-px w-px opacity-0" />
```

Bots that auto-fill every field put something in it; the server sees `company` is non-empty and returns a *fake success* — no error for the bot to learn from. Details that matter: `aria-hidden` + `tabIndex={-1}` keep it out of the accessibility tree and tab order (so the trap never catches a screen-reader user), and it's hidden by off-screen positioning rather than `display: none` because some bots skip fields they detect as invisible.

**Rate limiting.** A sliding-window counter per IP, in a module-level `Map`: 5 requests per minute, then 429. The honest caveat: serverless instances are ephemeral, and each warm instance has its own `Map`, so this only throttles bursts hitting the same instance. It's a speed bump, not a wall — real rate limiting needs shared state (Redis/KV). For a portfolio contact form, the speed bump plus the honeypot is proportionate; know what your defenses actually guarantee.

---

### 6. Image optimization — the biggest wins were the dumbest bytes

The audit's most measurable item. Before: 5.1MB of PNG screenshots plus a 370KB, 2160×2177 `me.jpg`. After: **292KB of WebP + an 89KB photo** — a ~94% reduction, from three changes:

1. **Right format.** PNG is lossless and huge for photographic content; WebP at quality 80 is visually identical here at a fraction of the size.
2. **Right size.** The screenshots render 192px tall (`h-48`). We resized to 480px tall — 2.5× the display size, enough for high-DPR screens. Shipping 1895px-wide images into a 192px-tall slot was pure waste.
3. **Right timing.** `loading="lazy"` on the screenshots (they're below the fold on project pages) so the browser doesn't fetch them until the user scrolls near. The Hero photo stays eager — lazy-loading above-the-fold images actively hurts.

The subtler fix was **layout shift**: without dimensions, the browser reserves zero height for an image, then jumps the page when it loads. Giving every `<img>` `width`/`height` lets the browser compute the aspect ratio and reserve the space up front. To make that possible, screenshots in the data layer changed from bare strings to objects:

```ts
screenshots: [
  { src: "/screenshots/cinesearch/cinesearch-landing.webp", width: 1016, height: 480 },
]
```

Same single-source-of-truth principle from Session 1: the dimensions are *data about the image*, so they live with the image's entry in `projects.ts`, not hardcoded in the component.

(`me.jpg` stayed JPEG rather than WebP because it's also the Open Graph image, and social-network scrapers are more conservative than browsers.)

---

### 7. The canvas and devicePixelRatio — CSS pixels are a lie

The background canvas was blurry on phones. The reason: a canvas has **two sizes**. Its CSS size (how big it appears) and its backing-store size (`canvas.width/height` — how many actual pixels it contains). We were setting both to `window.innerWidth`, which on a phone with `devicePixelRatio` of 3 means one canvas pixel gets stretched across three device pixels. Blur.

The fix:

```ts
const dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = Math.round(W * dpr);   // backing store: more real pixels
canvas.style.width = `${W}px`;        // CSS size: unchanged
ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale so drawing code keeps using CSS px
```

`setTransform` is what keeps the rest of the code untouched — every `ctx.arc(x, y, ...)` call still thinks in CSS pixels and the transform maps it to device pixels. We cap DPR at 2 because a 3× backing store is 2.25× the pixels of 2× for a background effect nobody can tell apart, and we're redrawing it every frame.

---

### 8. Hoisting `matchMedia` — render functions should compute, not query

Hero called `window.matchMedia("(pointer: fine)")` inside the component body — meaning every render (and Hero re-renders during scroll animations) re-queried the DOM for something that **cannot change mid-session**. Whether the device has a mouse is decided when the page loads.

```ts
// module level — runs exactly once, when the file is imported
const hasFinePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
```

The general principle: a render function should be a cheap, pure computation over props and state. Anything that queries the environment (`matchMedia`, `localStorage`, `getBoundingClientRect`) belongs either at module level (if it's constant for the session), in an effect (if it changes), or in an event handler. `ProjectCard` and `CommandHint` already did this correctly — the fix just brought Hero in line with the codebase's own pattern.

---

### 9. robots.txt and sitemap.xml — telling crawlers the site exists

An SPA has one HTML file and zero links a crawler can discover by following `<a href>` across pages it already knows — our project pages only exist once JavaScript runs. Two static files in `public/` compensate:

- **`robots.txt`** — permission slip. Ours says "everyone may crawl everything" and points at the sitemap.
- **`sitemap.xml`** — the list of URLs we *want* indexed: the home page and all four project pages.

These land at `zolender.xyz/robots.txt` and `/sitemap.xml` because everything in `public/` is copied verbatim to the site root at build time. The remaining step is manual: submit the sitemap in Google Search Console so Google actually reads it.

---

### What's still open

Tracked with the full checklist in `Plan.md`, but the short list: Z-Tales and Z-Book screenshots (folders ready, user must capture), the GitHub repo homepage fields (Z-folio and MovieApp both point at dead/old URLs), the LinkedIn website field, Search Console submission after the next deploy, and deciding whether the apex or the www domain is canonical (currently the server redirects apex → www while the metadata says apex).

---
