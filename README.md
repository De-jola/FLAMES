# FLAMES 💖

**Vercel link** : https://flames-xi-livid.vercel.app/

## Individual Case Studies

- [Adejola Esther Anuoluwapo](https://docs.google.com/document/d/1ehohPSHVHFY-4rWV2OwneCySBE--2R-zxS4jM1un8Dk/edit?usp=sharing)
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

## Links to the Case Study and Design Documents

- [Case Study Document](https://docs.google.com/document/d/10sSPaC7eT5ar5xGpL0Z7Zjgmv5B9D0x_rr76d7eJwi8/edit?usp=sharing)
- [Design Document](https://docs.google.com/document/d/1vC-gI-Z0wWPh3IMVYmDQaIPncc59SCCFuK3dXT18Fjw/edit?usp=sharing)

---

## Link to the Contribution Sheet

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
