# Design System Document: Estaciona Portfolio

## 1. Overview & Creative North Star: "The Urban Obsidian"
This design system moves away from the "utility-first" look of typical parking apps and toward a high-end, editorial experience. The Creative North Star is **The Urban Obsidian**: a vision of the city at night—sleek, dark, and defined by glowing wayfinding. 

We break the "template" look by utilizing **Intentional Asymmetry** and **Tonal Depth**. Instead of rigid, boxed-in grids, we use breathing room and layering to guide the user. The interface should feel like a premium concierge service—authoritative yet effortless.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep, midnight blues (`#0c1321`) to provide a sophisticated foundation for the vibrant primary and tertiary accents.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Conventional lines create visual "noise" that cheapens the experience. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` card sitting on a `surface` background provides all the definition a premium UI needs without the "jail cell" effect of borders.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of tinted glass.
- **Base Layer:** `surface` (#0c1321)
- **Secondary Sectioning:** `surface-container-low` (#151b2a)
- **Interactive Elements/Cards:** `surface-container` (#19202e)
- **Elevated Modals/Popovers:** `surface-container-highest` (#2e3544)

### The "Glass & Gradient" Rule
To add visual "soul," primary CTAs should not be flat. Use a subtle linear gradient from `primary` (#b4c5ff) to `primary-container` (#2563eb). For floating navigation or mobile headers, use **Glassmorphism**: apply `surface-bright` (#323949) at 60% opacity with a `24px` backdrop-blur to allow the background content to bleed through softly.

---

## 3. Typography: Editorial Authority
We use **Inter** across the board, but we differentiate through a dramatic scale and weight contrast.

*   **Display (Large/Medium):** Used for hero marketing moments. Heavy weight (Bold 700), tight letter-spacing (-0.02em). It’s the "Billboard" of the app.
*   **Headlines:** The "Anchor." Used to define new sections.
*   **Body (Large/Medium):** The "Narrative." High line-height (1.6) to ensure the dark theme remains legible and doesn't feel cramped.
*   **Labels:** The "Wayfinding." Always uppercase with slight letter spacing (+0.05em) when used for small metadata.

The hierarchy conveys trust: Large, bold headings say "You are in the right place," while clean, spacious body text says "We have the details covered."

---

## 4. Elevation & Depth: Tonal Layering
We reject traditional drop shadows in favor of **Ambient Light**.

*   **The Layering Principle:** Achieve depth by "stacking" tiers. Place a `surface-container-lowest` (#070e1c) input field inside a `surface-container` (#19202e) card to create a "recessed" look.
*   **Ambient Shadows:** For floating elements (like a booking summary), use a shadow with a `40px` blur, `0%` spread, and `8%` opacity. The shadow color must be a tinted `on-surface` blue, never pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. This creates a "whisper" of a boundary that doesn't break the visual flow.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `md` (12px) radius. No border. Text: `on-primary`.
*   **Secondary:** `surface-container-high` background. This creates a tactile, "button-press" feel against the darker background.
*   **Tertiary:** Ghost style. No background, `primary` text. Use only for low-priority actions like "Cancel."

### Input Fields
*   **Style:** `surface-container-lowest` fill. Use the "Ghost Border" (15% opacity `outline-variant`) as the default state.
*   **Active State:** Border opacity increases to 100% using the `primary` color, with a subtle `2px` outer glow.

### Cards & Lists
*   **Crucial:** Forbid the use of divider lines between list items. Use `16px` of vertical whitespace or alternating subtle background shifts (`surface-container-low` vs `surface-container`).
*   **Rounding:** Use the `md` (0.75rem/12px) scale for all standard cards to maintain a friendly yet professional edge.

### Parking Map Pins (Contextual Component)
*   **Design:** A `primary` circle with a `24px` backdrop-blur "halo" around it. The price should be displayed in `label-md` using `on-primary` text inside the pin.

---

## 6. Do's and Don'ts

### Do
*   **Do** use "Optical Centering." Because the brand is premium, align elements by visual weight rather than strict mathematical center in hero sections.
*   **Do** use `tertiary` (#4ae176) sparingly. It is a "Success" or "Availability" signal only. 
*   **Do** embrace negative space. If a screen feels "empty," don't fill it with boxes; let the typography breathe.

### Don't
*   **Don't** use pure black (#000000). It kills the depth of the "Urban Obsidian" theme.
*   **Don't** use 100% opaque borders. They create a "grid-lock" feel that contradicts the marketplace's fluid nature.
*   **Don't** use standard "Drop Shadows." If it looks like a default Photoshop shadow, it's too heavy. Keep it ambient.