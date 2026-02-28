# FLAMES 💖

**Vercel link** : https://flames-xi-livid.vercel.app/
**Presentation link** : https://www.canva.com/design/DAHCjqLtyuo/985FuQh5zuegIfrh_n0G1g/view?utm_content=DAHCjqLtyuo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7e68096273

## Individual Case Studies

- [Adejola Esther Anuoluwapo](https://medium.com/@adejolanu/reimagining-flames-a-case-study-in-digital-nostalgia-c469a0a80900)
- [Victor Okoukoni](https://medium.com/@victorokoukoni/flames-designing-emotion-into-a-frontend-experience-d4ce68dfa274)

> “Love, Math, and a Little Delusion”

A playful web app that brings back the classic schoolyard game of FLAMES. Enter your name and your crush’s name, and see which of the six legendary states of destiny you land on.

---

## Team Members

- **Adejola Esther Anuoluwapo**
- **Victor Okoukoni**

---

## Case Study Summary

**Problem Statement:**  
Almost 8 in 10 people have experienced a crush — whether a celebrity, classmate, or someone spotted randomly on the way to buy bread and akara in your “no one would see me” outfit. The rush of attraction can be exciting, but the anxiety of not knowing where you and your crush stand can also “crush” you. Some people love the thrill of a crush without taking things further; they just want a way to fuel their imagination.

**FLAMES** is a fun, digital outlet for that curiosity. By bringing back the classic schoolyard game, it provides a lighthearted way to "calculate" your fate, squash overthinking, and turn nervous energy into a playful moment.

**Target Audience:**

- High school and university students
- Anyone “young at heart” who enjoys playful romantic curiosity
- Those who aren’t “too mature” to have fun with their crush

**Core Features:**

- Name-matching algorithm removes common letters between you and your crush
- Remaining count determines your destiny in one of six legendary states:

| Letter | State              | Description                 |
| ------ | ------------------ | --------------------------- |
| F      | Friends            | Bestie Energy               |
| L      | Lovers             | Main Character Moment       |
| A      | Admirers           | Watching From Afar          |
| M      | Married            | Wedding Pinterest Activated |
| E      | Enemies            | Block and Move On           |
| S      | Sexual Partners 🙈 | Say Less                    |

---

## JavaScript Implementation & Logic Flow

**Overview**

FLAMES uses Vanilla JavaScript to bring the classic schoolyard game to life — no backend, no database, no frameworks. All data lives in-memory using JavaScript arrays and objects, and the UI updates entirely through DOM manipulation. The goal was a fully interactive, resilient experience built on nothing but core web technologies.

**Core Data Structure**

The six possible FLAMES outcomes are stored as a constant array of objects. This acts as mock data, replacing any need for a database:

```
const FLAMES_DATA = [
  { state: "Friends",         emoji: "🤝", description: "..." },
  { state: "Lovers",          emoji: "💕", description: "..." },
  { state: "Admirers",        emoji: "👀", description: "..." },
  { state: "Married",         emoji: "💍", description: "..." },
  { state: "Enemies",         emoji: "😤", description: "..." },
  { state: "Sexual Partners", emoji: "🙈", description: "..." }
];
```

**Code Architecture**

The entire logic lives in a single file — `app.js` — written in ES6+ Vanilla JS, organized into distinct, clearly named sections:

| Section                     | Responsibility                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------- |
| **Data**                    | `FLAMES_DATA[]` — the six outcome objects                                           |
| **Algorithm**               | `calculateFLAMES()` — pure function, returns a result object                        |
| **Modal Builder**           | `buildModal()` — programmatically creates and injects the result modal on load      |
| **Modal Controllers**       | `openModal()` / `closeModal()` — manage visibility and body scroll-lock             |
| **Form Handlers**           | Validation, loading state, and submit listener                                      |
| **Mobile Nav**              | `initMobileNav()` — builds and wires the mobile slide-out drawer                    |
| **Utilities**               | `escapeHtml()`, `showToast()`, `copyToClipboard()`                                  |

**Module Summary:**

```
js/
└── app.js
    ├── FLAMES_DATA[]         ← mock data (6 outcome objects)
    ├── calculateFLAMES()     ← pure algorithm function
    ├── buildModal()          ← one-time DOM injection on page load
    ├── openModal()           ← populate + show modal
    ├── closeModal()          ← hide modal + restore scroll
    ├── handleTryAgain()      ← reset form, scroll to calculator
    ├── handleShare()         ← Web Share API with clipboard fallback
    ├── copyToClipboard()     ← async clipboard write
    ├── showToast()           ← ephemeral notification banner
    ├── showInputError()      ← inject accessible error span
    ├── clearInputError()     ← remove error state + span
    ├── setLoadingState()     ← toggle button loading UI
    ├── initMobileNav()       ← build + wire mobile slide-out drawer
    └── escapeHtml()          ← XSS-safe string sanitisation
```

**FLAMES Algorithm**

The core calculation lives in `calculateFLAMES(name1, name2)` — a pure function that takes two names and returns one destiny state.

How it works:

1. Both names are normalised — converted to lowercase with spaces removed
2. Common letters are eliminated one-for-one between the two name arrays
3. The remaining letters are counted
4. That count drives an elimination loop — starting with all 6 states, it advances the cursor by `count` steps each round, knocking out one state per pass until only one remains
5. The surviving state is returned as `{ state, emoji, description }`

**Full Logic Flow**

```
User types names → submits form
    ↓
Validation:
  • Are both fields non-empty?
  • Do they contain at least one letter?
  → Inline error message injected into DOM if invalid
    ↓
800ms loading animation (button enters loading state)
    ↓
calculateFLAMES(name1, name2) runs (see algorithm above)
    ↓
openModal(result, n1, n2):
  • Populate emoji, names, state heading, description
  • Store result as data-attributes for Share handler
  • Add open classes → CSS transitions animate the modal in
  • Lock body scroll
    ↓
User clicks Share   → navigator.share() or clipboard fallback + toast
User clicks Try Again → closeModal() → reset inputs → scroll to calculator
User clicks ✕ or overlay → closeModal()
```

**Edge Cases Handled**

| Scenario                                         | Handling                                    |
| ------------------------------------------------ | ------------------------------------------- |
| Empty name field                                 | Inline validation error; form not submitted |
| Names with only numbers/symbols                  | Error: "must contain at least one letter"   |
| Names are perfect anagrams (count = 0)           | Defaults to **Friends**                     |
| Rapid re-submission                              | Button disabled during 800ms loading window |
| No Web Share API (desktop)                       | Falls back to `navigator.clipboard` + toast |
| Clipboard API also unavailable                   | Friendly toast message to copy manually     |
| Pressing Escape while modal open                 | Modal closes                                |
| Clicking outside modal (overlay)                 | Modal closes                                |

---

## Design Document Summary

**Design Mood:**  
Playful • Romantic • Nostalgic • Slightly unserious  
Think: school crush energy with modern web polish

**Colour Palette:**

| Usage      | Colour Name       | Hex     |
| ---------- | ----------------- | ------- |
| Primary    | Blush Red         | #E94B6A |
| Secondary  | Cotton Candy Pink | #F7A8B8 |
| Accent     | Creamy White      | #FFF5EC |
| Text       | Wine Red          | #5A0F2E |
| Background | Soft Peach        | #FFE3DC |

**Typography:**

- **Headings:** Caveat — handwritten, expressive, playful
- **Body Text:** Comfortaa — rounded, friendly, approachable

**Layout Overview:**

1. **Navigation:**
   - Logo
   - Links: Home | About | The Destiny States | Calculate My Fate
2. **Hero Section:**
   - Headline: “Love, Math, and a Little Delusion”
   - Subtext: “It’s not that deep… but let’s check anyway.”
   - CTA Button: “Reveal Our FLAMES 🔥”
3. **About Section:**
   - Conversational, funny, self-aware tone
4. **Destiny States Section:**
   - Each state in its own mini-card
   - States: Friends, Lovers, Admirers, Married, Enemies, Sexual Partners
5. **Calculator Section (“The Ritual”):**
   - Inputs: Your Name, Your Crush’s Name
   - Button: “Calculate My Fate”

**References:**

- [Figma Community Design](https://www.figma.com/community/file/1560250735765736296)
- [Figma Project Board](https://www.figma.com/design/0UpQufnV9CKtqcVHTkiOU9/Flames-app%F0%9F%A9%B7--Community-?node-id=0-1&t=3Ni895C5nEOmbxek-1)

---

## Styling Guide

**CSS Architecture**

The project uses a modular CSS structure:

• `base.css` → Design tokens, global resets, utility classes

• `components.css` → Section-level component styling

• `style.css` → Imports and bundles styles

This separation ensures:

• Scalability

• Clear responsibility boundaries

• Easier collaboration in a team setting

**Design Tokens (CSS Variables)**

All styling decisions are driven by centralized CSS variables defined in `:root` inside `base.css`.

**Color System**

The color system uses semantic tokens mapped to brand tokens:

```css
--color-blush-red: #e94b6a;
--color-cotton-candy-pink: #f7a8b8;
--color-creamy-white: #fff5ec;
--color-wine-red: #5a0f2e;
--color-soft-peach: #ffe3dc;
```

These are mapped to semantic variables:

```css
  --action-primary
  --action-secondary
  --text-main
  --bg-body
  --bg-nav
```

**Why This Approach?**

• Prevents hard-coded colors

• Makes theme updates easy

• Improves consistency

• Encourages scalable design

**Typography System**

The project uses a clear typographic hierarchy:

• **Headings:** `Caveat` → expressive, playful tone

• **Body:** `Comfortaa` → rounded and friendly

Type scale variables:

```css
--text-hero: 3.5rem;
--text-section-heading: 2.5rem;
--text-card-heading: 1.75rem;
--text-base: 1rem;
--text-small: 0.875rem;
```

This ensures:

• Visual consistency

• Clear hierarchy

• Maintainable scaling

**Spacing System**

Spacing follows a token-based scale:

```css
--space-2: 0.5rem;
--space-4: 0.875rem;
--space-6: 1.5rem;
--space-12: 3rem;
--space-24: 6rem;
```

Benefits:

• Consistent rhythm across sections

• Avoids random spacing values

• Easy layout adjustments

---

## Links

- [Case Study Document](https://docs.google.com/document/d/10sSPaC7eT5ar5xGpL0Z7Zjgmv5B9D0x_rr76d7eJwi8/edit?usp=sharing)
- [Design Document](https://docs.google.com/document/d/1vC-gI-Z0wWPh3IMVYmDQaIPncc59SCCFuK3dXT18Fjw/edit?usp=sharing)
- [Contribution Sheet](https://docs.google.com/spreadsheets/d/1Nsc1HQivFLCAUCfedvijar36JdNryfXvKq0AxHOzwNo/edit?usp=sharing)

---

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/De-jola/FLAMES.git
```

2. Navigate to the project folder:

```bash
cd FLAMES
```

3. Open index.html in your preferred browser.
