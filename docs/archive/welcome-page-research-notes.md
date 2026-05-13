# Welcome Page Research Notes

Historical research and prompt exploration for the welcome page.

Canonical current direction lives in:

- `docs/features/welcome-page.md`
- `docs/task-specs/welcome-page-redesign.md`

This file is background only. Do not use it as the primary source of truth
unless the task explicitly asks for historical reasoning.

## Archived Source: Welcome Design System And Work Plan

The former `docs/welcome-design-system-and-plan.md` was consolidated into:

- `docs/features/welcome-page.md` for the current product and design direction.
- `docs/task-specs/welcome-page-redesign.md` for execution-ready implementation
  guidance.

Historical details preserved from that plan:

- The page should answer where the guest arrived, what kind of place Pike is,
  and which bar to choose next.
- The first screen should include Pike branding, atmospheric hero material,
  `Выбрать бар`, a phone action, and concise brand copy.
- Mandatory launch structure was `Hero` plus `Location Choice`; sports, food,
  atmosphere, socials, and map were optional supporting sections.
- The visual mood was cinematic, warm, grounded, comfortable, slightly vintage,
  and not theatrical.
- The typography direction was readable body text with a stronger
  Cyrillic-friendly display face for large brand moments; `Playfair Display`
  was the selected display direction in that planning pass.
- The age gate should stay short, clear, brand-aligned, and keep an obvious
  confirmation path plus exit path.
- Guest-facing technical copy about platform architecture, CMS readiness,
  separate content entities, and SEO implementation details should not appear
  on the public welcome page.
- CMS readiness rules from the plan are now canonical in
  `docs/features/welcome-page.md`.
- The old implementation phases were design tokens, content, components, age
  gate, and verification. Future implementation should follow the current task
  spec instead of treating those phases as binding.

## Archived Source: Welcome Page Redesign Notes

Updated: 2026-04-20

## Goal

Develop a new concept and prompt direction for the welcome page of the Pike bar network.
This document tracks reference analysis, working decisions, and constraints so we do not lose them during iteration.

## Reference Reviewed

- Noor Bar homepage: https://noorbar.com/
- Chainaya homepage: https://chainaya.org/
- Kontakt Bar homepage: https://kontaktbar.ru/

## What Stood Out In Noor

- The first screen works like a staged composition, not like a standard landing page.
- The navigation feels like part of the scene rather than a separate header.
- Large menu items act as triggers for visual state changes instead of just being plain links.
- Hover states are implemented through layered transitions, not just color changes.
- The right side acts like a preview zone with different visual material depending on the active item.
- There is a strong sense of one fixed canvas where the user changes the state inside the same scene.
- Motion is restrained but noticeable: fade-ins, delayed reveal, and image-layer switching.

## What Stood Out In Chainaya

- The transition from the main visual area into the next section feels smooth and cinematic.
- On scroll, the hero image appears to stay present long enough to be fully perceived before the content section takes over.
- The next section does not feel abruptly stacked under the hero; it feels like it emerges through the image.
- The result is more like a reveal or dissolve into content than a normal block-to-block scroll.

## Technical Observation From Noor

- The page uses a full-viewport fixed composition.
- Menu labels appear to have duplicated text layers: a default outlined state and a hover/active filled state.
- Hovered menu items trigger hidden visual layers on the right side through linked animation targets.
- The visual swap is not a page jump; it is a controlled state change inside one persistent hero-like frame.

## Technical Observation From Chainaya

- This effect appears to be created with a full-height cover block using a fixed parallax background.
- The hero image is not moving independently in a complex way; the persistence comes from the background being fixed while the page content scrolls over it.
- A dark gradient filter is applied over the cover, which helps the image fade into the surrounding dark layout.
- The section after the cover sits on a matching dark background, which makes the handoff feel seamless rather than abrupt.
- In other words, the “image breaking into the next section” effect seems to come from composition and layering, not from a heavy custom scroll animation.

Source note:
- This is an inference from the page structure and HTML/CSS setup visible in the delivered markup, especially the fixed cover and gradient filter settings.

## Working Decisions For Pike

- We want to adapt the interaction principle, not copy Noor visually.
- The Pike welcome page should behave like a redirect page with a fixed scene and switchable states.
- The core interaction should center on choosing a bar location from within one anchored composition.
- When the user focuses or hovers a bar item, the preview area should change to reflect that specific bar.
- The page should feel editorial, atmospheric, and premium rather than template-based.
- We should reduce dependence on generic card grids.
- The first screen should feel like a poster or living scene, not a document with stacked sections.
- The design must stay scalable as the number of bars grows.
- We also want to borrow Chainaya's soft scroll handoff between the hero scene and the bar-selection section.

## How To Translate This For Pike

- Left or central navigation area: bar list / primary entry points.
- Right or secondary preview area: photo, mood, address, or short bar-specific snapshot.
- Active state should feel persistent enough that the user understands they are previewing a selected bar.
- Entering a bar page should feel like a deliberate transition from preview to destination.
- Secondary items like menu, contacts, map, or events should not compete with the main task of choosing a bar.
- Before the bar list fully appears, the hero image or preview scene should get a moment of full presence on scroll.
- The transition into the bar-selection area should feel like the image is being gently overtaken by content.
- The handoff should likely use a dark overlay or tonal bridge so the next section appears to grow out of the hero rather than simply start below it.
- On desktop this can feel like a slow reveal; on mobile it should remain readable and not trap the user in an overlong hero.

## Current Design Direction

- Mood: refined nightlife, warm darkness, subtle copper/amber highlights, tactile detail.
- Composition: one strong first-screen canvas with controlled zones instead of repeated cards.
- Typography: dramatic but elegant, with strong contrast between brand presence and utility text.
- Motion: stateful fades, crossfades, subtle layer shifts, no gimmicky over-animation.
- Scroll behavior: the hero should not hard-cut into the next block; it should dissolve or hand off into the bar selector with a composed reveal.

## Prompt Research Notes

Sources reviewed:

- Lovable best practices: https://docs.lovable.dev/tips-tricks/best-practice
- Lovable prompting guide: https://docs.lovable.dev/prompting
- Lovable Plan mode: https://docs.lovable.dev/features/plan-mode
- Lovable knowledge docs: https://docs.lovable.dev/features/knowledge
- OpenAI prompt best practices: https://help.openai.com/en/articles/6654000-comprehensive-cdot-prompt-engineering-guide-for-developers
- OpenAI ChatGPT prompt best practices: https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt

Key research takeaways:

- The strongest result usually does not come from one giant prompt. It comes from layered context.
- Lovable explicitly performs better when project context is stored in Knowledge instead of being repeated ad hoc.
- Lovable recommends using Plan mode before implementation for exploration, tradeoffs, and clarifying questions.
- Lovable also recommends prompting by component or section, not asking for an entire page in one pass.
- Verbose and specific prompts are preferred over short vague prompts.
- Clear guardrails matter: specify what to change, what not to change, and what success looks like.
- Reference ideas should be described as separate mechanics or influences, not prematurely merged into one aesthetic.
- For professional results, the prompt should describe user journey, visual system, interaction logic, and acceptance criteria.

## Professional Prompt Architecture

For this project, the future Lovable instruction should likely be split into layers:

1. Persistent project knowledge
- Brand context
- Product purpose
- Page role inside the product
- Existing constraints
- Scalability requirements

2. Planning prompt
- Ask Lovable to think in Plan mode first
- Compare mechanics separately
- Identify risks, tradeoffs, and interaction models
- Ask clarifying questions before implementation

3. Execution prompt
- One concrete section or one concrete interaction at a time
- Exact visual and behavioral requirements
- Explicit non-goals
- Acceptance criteria

## What The Prompt Must Contain

- Product role of the page: this is a redirect-oriented welcome page for a bar network.
- Primary user task: choose a bar location.
- Reference mechanics listed separately, with notes on what is being borrowed from each.
- Desired emotional tone and visual direction.
- Desktop behavior and mobile behavior separately.
- Scroll behavior and hover/select behavior separately.
- Elements that must stay secondary: phone, map, socials, utility links.
- Scalability constraints if bar count grows.
- Clear instruction not to fall back to generic card-grid landing page patterns.
- Instruction to ask clarifying questions before implementation if critical details remain ambiguous.

## Important Working Rule

- Do not merge all reference ideas too early.
- Treat each mechanic as an independent option until we intentionally choose how to combine or reject it.
- Noor, Chainaya, and Kontakt must now be treated as three separate concept tracks, not as ingredients of one combined direction.
- Future prompts and discussions should label each idea explicitly before describing it.
- Evaluation should happen per idea: what it gives us, what risks it introduces, and whether it deserves standalone implementation.

## Active Concept Tracks

### Concept A: Noor-Style Stateful Scene

- Core value: fixed-scene navigation with persistent preview states.
- Role in discussion: interaction concept only.
- Must not be automatically combined with Chainaya scroll behavior or Kontakt atmosphere unless we explicitly decide to do so later.

### Concept B: Chainaya-Style Scroll Handoff

- Core value: soft visual dissolve from hero scene into the next content phase.
- Role in discussion: scroll-transition concept only.
- Must not be automatically combined with Noor state navigation or Kontakt atmosphere unless we explicitly decide to do so later.

### Concept C: Kontakt-Style Atmosphere Layer

- Core value: living full-screen background depth built from animated particles and parallax decor.
- Role in discussion: ambient visual-system concept only.
- Must not be automatically combined with Noor navigation or Chainaya handoff unless we explicitly decide to do so later.

## Separate Idea: Kontakt-Style Atmosphere Layer

- This is a separate reference mechanic and should stay independent from the Noor and Chainaya ideas for now.
- What stands out most is not the bar layout itself, but the living atmospheric background behind the page.
- The site uses a fixed full-screen background animation layer that remains behind the interface.
- The effect is built from multiple particle groups rather than one flat texture.
- There are also foreground parallax decorative elements that move at different speeds and add depth.
- Technically, this appears to be a CSS-driven particle field: multiple fixed layers, dense `box-shadow` maps, and an upward keyframe animation.
- One of the particle layers uses a warm gold tone, which is especially relevant for us because it already feels closer to amber liquid than to cold sci-fi stars.
- For Pike, this should be translated away from “space” and into “beer atmosphere”.
- Candidate adaptation: rising beer bubbles, tiny foam particles, golden suspended light, carbonation shimmer, and depth inside dark amber air.
- The motion should feel buoyant and elegant, not sparkly, noisy, or futuristic.
- This may become one of the mandatory brand-specific atmosphere details on the welcome page.
- We should keep this as a required candidate mechanic even if the overall composition direction changes later.

Source note:
- Based on delivered page markup and CSS, the effect uses a dedicated `.bg-animation` fixed layer with `#stars`, `#stars2`, `#stars3`, and `#stars4`, plus separate parallax foreground objects and an `animStar` upward translation animation.

## Open Questions

- Should the first interaction model be hover-first on desktop and tap-to-select on mobile, with the same selected state logic?
- Should the preview zone show one large image per bar or a layered combination of image plus metadata?
- Should the selected bar immediately expose the CTA to enter that bar page, or only after explicit click/tap?
- Should the scroll handoff happen after a dedicated “Выбрать бар” action, or should it also occur naturally on regular downward scroll?

## What Is Still Missing Before A Strong Final Prompt

- Final decision on which single concept track we are prompting first: Noor, Chainaya, or Kontakt.
- Definition of the page role in one sentence: is this primarily a redirect page, an atmosphere-first brand gateway, or a selector-first utility page.
- Exact first-screen user action: scroll, choose bar, hover preview, tap preview, or immediate CTA.
- Final information architecture for the welcome page: what must be present on the page and what must stay on bar detail pages.
- Priority order of content blocks: brand, bar list, preview, contacts, map, socials, network features.
- What exactly should appear in the bar preview state: photo only, photo plus address, photo plus short description, or photo plus CTA.
- Mobile interaction model: accordion, stacked selector, swipeable preview, tap-to-select with sticky active state, or something else.
- Decision on whether the page should be mostly one-screen oriented or allow deeper scrolling composition.
- Visual constraints from the real brand: logo usage, fonts if any exist, brand colors if any exist, and tone we must preserve.
- Media strategy: what real photos or assets exist, how strong they are, and whether the design should depend on them heavily.
- Hard non-goals: what we absolutely do not want Lovable to generate.
- Success criteria: how we will judge whether the result is strong enough or still generic.

## Current Product Decisions

- First concept track to develop: `Concept A / Noor-Style Stateful Scene`.
- Page role: `brand gateway` first, not a purely utilitarian selector.
- Hero must contain a visible `Выбрать бар` CTA.
- The `Выбрать бар` CTA should scroll the user down to the bar-selection area.
- Hero behavior: one strong first screen followed by a short, composed transition into the next block.
- Primary content required on the welcome page: bar list, phone, map, social links.
- Preview content for a selected bar should include: photo, address, and phone number.
- Mobile can be simpler than desktop; mobile interaction does not need to preserve the same complexity.
- First-iteration priority: `maximum originality`.

## Interaction Decisions In Progress

- Desktop bar-selection model: structured selector layout with list plus preview plus a dedicated enter CTA.
- Mobile model: simple list-oriented interaction with reduced animation.
- Scroll behavior is now partially resolved:
  - the hero CTA should intentionally move the user to the bar-selection section
  - natural page scroll may still exist, but the deliberate CTA-led transition is mandatory

## Hard Non-Goals Draft

- No generic SaaS-looking landing page composition.
- No standard feature-card grid as the main structure of the welcome page.
- No visual language that looks like a startup template or UI kit demo.
- No weak “luxury by blur” approach with glassmorphism everywhere.
- No purple-dominant palette or cold neon startup mood.
- No cluttered hero with too many competing actions.
- No overlong intro copy that delays the bar-selection task.
- No mobile layout that feels like a compressed desktop version.
- No decorative motion that feels gimmicky, noisy, or game-like.
- No atmosphere effects that read as outer space, stars, or sci-fi once adapted for Pike.
- No reliance on identical cards that make all bars feel visually interchangeable.
- No design where utility links overpower the primary goal of choosing a bar.

## Prompt Skeleton Draft

```text
We are redesigning the welcome page of “Бар Щука”, a bar network in Lyubertsy.

This is not a generic landing page and not a single-bar homepage.
This page is the brand gateway into the network and its main job is to help users choose one bar location.

Concept track for this iteration:
- Use Concept A only: Noor-style stateful scene.
- Do not mix in Chainaya-style scroll handoff as a defining mechanic.
- Do not mix in Kontakt-style atmosphere layer as a defining mechanic.

Page role:
- This page should feel like a brand gateway first and a bar selector second.
- The first screen should create atmosphere and identity.
- The user should then move into a clear bar-selection flow.

Primary hero behavior:
- The hero must contain a clear CTA: “Выбрать бар”.
- Clicking that CTA should scroll the user down to the bar-selection section.
- The hero should be one strong screen followed by a short, composed transition into the next block.

Core interaction model:
- On desktop, use a structured selector layout:
  - a bar list
  - a preview area
  - a dedicated CTA to enter the selected bar page
- On mobile, simplify the interaction:
  - use a clean list-oriented layout
  - reduce animation complexity
  - keep the experience readable and elegant

Bar preview content:
- Each selected bar preview should show:
  - photo
  - address
  - phone number

Required content on the welcome page:
- bar list
- phone
- map
- social links

Design direction:
- Make the page memorable, refined, atmospheric, and original.
- Avoid template energy.
- Avoid overexplaining with text.
- The first screen should feel intentional and brand-specific.
- The bars should not feel interchangeable.

Important constraints:
- This page must scale if more bars are added later.
- Utility links must stay secondary to the bar-selection task.
- Desktop and mobile should not be treated as the same layout compressed to different widths.

Interaction goals:
- The user should feel that choosing a bar is a deliberate, guided action.
- The selected state should feel clearly active.
- The preview area should help the user understand the character of the selected bar before entering it.

Hard non-goals:
- Do not generate a generic SaaS or startup-style landing page.
- Do not use a standard grid of identical cards as the main structure.
- Do not make it look like a UI kit composition.
- Do not rely on glassmorphism or blur-heavy “premium” styling.
- Do not use a cold neon or purple-heavy visual system.
- Do not overload the hero with too many competing actions.
- Do not let phone, map, and socials compete with the main CTA.
- Do not make mobile feel like a squeezed desktop version.

What I want from you:
- Propose and implement one strong homepage concept based only on the Noor-style stateful scene direction.
- Keep the experience elegant and original.
- Make the first screen feel memorable.
- Make the bar selection feel premium and intuitive.
- If any critical product or UX detail is still ambiguous, ask focused clarifying questions before implementing.
```

## Prompt V2 Foundation

### Art Direction

- Selected direction: `B / editorial premium`.
- The page should feel refined, composed, and intentional.
- The visual language should rely on hierarchy, typography, spacing, composition, and restraint more than on decorative effects.
- The result should still feel warm and brand-specific, not sterile or fashion-minimal for its own sake.

### Layout Baseline

- Hero with a strong brand block.
- Short copy under or near the brand block.
- Clear `Выбрать бар` CTA inside the hero.
- The CTA scrolls to the bar-selection section below.
- Desktop selector layout: list on the left, preview on the right, separate CTA to enter the selected bar.
- Mobile selector layout: simple vertical list with active preview shown in a calm, readable way.

### Acceptance / Success Criteria

- The page must present one obvious primary action: `Выбрать бар`.
- The hero must feel like a designed scene, not a standard landing-page header.
- The first screen must communicate brand atmosphere before the user reads much text.
- The transition from hero to bar selection must feel intentional and composed, not abrupt.
- The desktop selector must clearly separate three roles: bar list, active preview, and enter-bar CTA.
- The selected bar state must be visually unambiguous.
- Each bar must feel distinct at preview level before the user opens its detail page.
- The bar-selection area must not collapse into a generic grid of identical cards.
- Phone, map, and social links must remain secondary to the bar-selection flow.
- The page must still feel premium if more bar locations are added later.
- Mobile must preserve a clear and elegant selection flow without copying desktop interaction complexity.
- Mobile must feel designed on purpose, not like a compressed desktop layout.
- The result must feel like a hospitality brand experience, not a SaaS, startup, or UI-kit landing page.
- Typography, spacing, and composition must carry the premium feel even without heavy effects.
- The page should feel memorable and brand-specific enough that it is not interchangeable with another bar site.

## Full Prompt V2

```text
We are redesigning the welcome page of “Бар Щука”, a bar network in Lyubertsy.

This is not a generic landing page and not a homepage for one specific bar.
This page is the welcome / gateway page for the whole network.
Its main job is to create brand atmosphere first and then guide the user toward choosing one specific bar location.

Important product context:
- This is a bar network, not a single venue.
- The welcome page should help users choose a bar location.
- Each bar has its own dedicated detail page.
- The design must stay scalable if more bar locations are added later.
- Utility items like phone, map, and social links are important, but they must remain secondary to the main bar-selection flow.

Concept direction for this iteration:
- Use only Concept A: Noor-style stateful scene.
- Borrow the interaction principle, not the visual identity of Noor.
- Do not use Chainaya-style scroll handoff as the defining mechanic for this version.
- Do not use Kontakt-style atmospheric particle layer as the defining mechanic for this version.
- Treat this iteration as a focused exploration of one concept track only.

Page role:
- This page should feel like a brand gateway first and a selector second.
- The first screen should establish mood, tone, and identity.
- The user should then move into a clear and elegant bar-selection experience.

Art direction:
- Editorial premium.
- Refined, composed, intentional, and visually restrained.
- Premium through typography, composition, spacing, hierarchy, and contrast rather than gimmicks.
- Atmospheric and memorable, but not loud.
- Warm, nightlife-oriented, and hospitality-driven rather than cold, futuristic, or startup-like.
- The result should feel brand-specific and tasteful.

Hero requirements:
- The hero must feel like a designed scene, not a standard landing-page header.
- It must contain a strong brand block for “Бар Щука”.
- Include short, sharp copy only.
- Include one clear primary CTA: “Выбрать бар”.
- Clicking “Выбрать бар” should scroll the user down to the bar-selection section.
- The first screen should create atmosphere before requiring much reading.

Layout baseline:
- Hero with a strong brand block.
- Short copy under or near the brand block.
- Clear “Выбрать бар” CTA inside the hero.
- Bar-selection section below the hero.
- On desktop:
  - bar list on the left
  - active preview area on the right
  - separate CTA to enter the selected bar
- On mobile:
  - simpler list-oriented structure
  - reduced animation complexity
  - active preview shown in a calm, readable way

Core interaction model:
- The desktop experience should feel stateful and guided.
- Selecting a bar should create a clear active state.
- The preview area should update based on the selected bar.
- The user should understand that they are previewing one chosen location before entering its page.
- The selector should feel premium and editorial, not like a basic directory or filter panel.

Bar preview requirements:
- Each selected bar preview should include:
  - photo
  - address
  - phone number
- Each bar should feel distinct already at preview level.
- The bars must not feel visually interchangeable.

Required content on the welcome page:
- bar list
- phone
- map
- social links

Design goals:
- Make the page memorable and clearly non-template.
- Make the first screen feel original and brand-owned.
- Make the bar-selection interaction elegant and intuitive.
- Avoid visual clutter.
- Keep text concise.
- Keep the layout scalable.
- Ensure the desktop and mobile experiences both feel intentionally designed.

Hard non-goals:
- Do not generate a generic SaaS or startup-style landing page.
- Do not rely on a grid of identical cards as the main page structure.
- Do not make it look like a UI kit demo or a template assembled from generic sections.
- Do not use blur-heavy glassmorphism as the main premium device.
- Do not use a cold neon or purple-heavy visual language.
- Do not overload the hero with several competing primary actions.
- Do not let phone, map, and social links compete with the main CTA.
- Do not make mobile feel like a squeezed version of desktop.
- Do not create a visually flat or interchangeable bar selector.

Acceptance / success criteria:
- The page must present one obvious primary action: “Выбрать бар”.
- The hero must feel like a designed scene, not a standard landing-page header.
- The first screen must communicate brand atmosphere before the user reads much text.
- The transition from hero to bar selection must feel intentional and composed, not abrupt.
- The desktop selector must clearly separate three roles: bar list, active preview, and enter-bar CTA.
- The selected bar state must be visually unambiguous.
- Each bar must feel distinct at preview level before the user opens its detail page.
- The bar-selection area must not collapse into a generic grid of identical cards.
- Phone, map, and social links must remain secondary to the bar-selection flow.
- The page must still feel premium if more bar locations are added later.
- Mobile must preserve a clear and elegant selection flow without copying desktop interaction complexity.
- Mobile must feel designed on purpose, not like a compressed desktop layout.
- The result must feel like a hospitality brand experience, not a SaaS, startup, or UI-kit landing page.
- Typography, spacing, and composition must carry the premium feel even without heavy effects.
- The page should feel memorable and brand-specific enough that it is not interchangeable with another bar site.

What I want from you:
- Propose and implement one strong homepage concept based only on this Noor-style stateful-scene direction.
- Keep the work focused on this one concept track.
- Make the first screen memorable.
- Make the selector feel premium.
- If any critical UX or product detail is still ambiguous, ask focused clarifying questions before implementation.
```

## Reference Delivery Rule

- For Lovable, direct screenshot references should be uploaded when the exact interaction composition matters.
- A website link alone is not enough if we need Lovable to reproduce a specific structural behavior.
- For the Noor-inspired concept, screenshots are especially important because the key reference is not just mood, but the exact relationship between navigation, selected state, and preview zone.

## What The Noor Screenshots Actually Prove

- The page is not a centered cinematic hero.
- The page is built as one fixed scene with a left-side interaction stack and a right-side preview area.
- The menu items themselves are the visual core of the composition.
- Non-active items are outlined and lighter; the active item becomes filled and visually dominant.
- The right side is not generic content below the fold; it is a state-driven preview surface.
- The composition is asymmetrical and tension-based, not centered and poster-like.
- Empty or quieter preview states are acceptable for some items; not every state must be equally filled.
- The key takeaway for Pike is structural:
  - left-side selector language
  - active state hierarchy
  - right-side preview response
  - one persistent scene instead of a standard hero plus normal sections

## Structure Options Under Discussion

### Option 1: Hero CTA -> Bar Selector Below

- First item in the menu / first-screen action: `Выбрать бар`.
- Clicking it scrolls the user down to the actual bar-selection block.
- The selector itself lives in the next section.
- This creates a clearer funnel and gives room for another first-screen statement or atmosphere block.
- Risk: this can slide back toward a conventional landing-page structure if the selector below is not strong enough.

### Option 2: Selector In The First Screen

- The first screen itself contains the actual bar-selection system.
- The bar names act as the main visual menu.
- The right side reacts with preview content for the selected bar.
- This is the closest to the strongest Noor-inspired logic.
- Risk: the screen needs a compact guidance block so the user understands what they are looking at.

### Option 3: Intro Menu First, Bars Replace The Preview Area

- First screen contains a small menu.
- One item is `Выбрать бар`.
- When the user activates it, the right-side preview area transforms into a list or selector of bars.
- This keeps the page in one scene and makes the bar list feel like a revealed mode, not a separate section.
- Risk: interaction becomes more complex and may be less immediately clear.

### Option 4: Hybrid

- First screen has a compact top-level menu:
  - `Выбрать бар`
  - `О нас`
  - `Контакты`
- The default active mode is `Выбрать бар`.
- In that mode, the screen shows the bar selector.
- Other menu items swap the scene into small supporting states instead of sending the user to normal sections immediately.
- Below the first screen, a compact support area can still exist for contacts / map / short about copy.
- Risk: easy to overcomplicate if too many states are introduced.

## Current Thinking

- The core purpose of the welcome page is not to tell a long story, but to help the user choose the right bar quickly.
- Because of that, the bar-selection flow should remain the dominant experience.
- `О нас` and `Контакты` feel better as supporting content than as equal competitors to bar choice.
- The strongest current candidate is still a selector-first desktop scene, with secondary content below.

## Updated Direction: Menu-First Welcome Screen

- The first screen should now work as a menu-first welcome scene rather than showing the bar selector immediately.
- The large left-side menu becomes the primary interface pattern.
- The menu should contain three items only:
  - `Выбрать бар`
  - `О сети`
  - `Контакты`
- The first screen menu should act as a navigation / section map for the page.
- The actual content for each item should be represented below on the page.

### How Each Menu Item Should Behave

- `Выбрать бар`
  - scrolls or leads the user to the bar-selection section below
  - this remains the most important item because bar choice is still the primary business goal

- `О сети`
  - leads to a short network description / brand statement below
  - must stay concise and not become a long text block

- `Контакты`
  - leads to phone, map, and social links below
  - should feel functional and clean

### Why This Direction Helps

- It preserves the strong menu-based first screen.
- It avoids locking the product into a giant bar list if the network grows.
- It gives the welcome page a clearer information architecture.
- It lets `Выбрать бар` remain primary without forcing it to be the only first-screen mode.
- It makes the first screen a strong welcome menu, while keeping the actual content blocks below.

### New Structural Rule

- The first screen should now be understood as a three-item welcome menu.
- It is no longer a four-state reactive scene.
- Instead, it should orient the user and send them into the relevant page sections below.
- `Выбрать бар` remains the primary entry point and should receive the strongest emphasis.

## Design Decision Standard

- All future options should be evaluated and proposed from the perspective of a senior-level UX/UI designer.
- This means decisions should prioritize:
  - clarity of user intent
  - scalability as the bar network grows
  - information hierarchy
  - interaction predictability
  - visual restraint
  - brand distinctiveness without harming usability
- A visually interesting idea is not enough on its own if it becomes harder to understand, harder to scale, or weaker as a product experience.

## Media Constraint

- On the first screen, no visual element should overflow beyond the intended scene.
- Large photos that do not fit cleanly within the composition should not be used as the default solution.
- If imagery creates layout instability, replace it with more controlled visual material:
  - framed visual objects
  - graphic symbols
  - atmospheric iconography
  - abstract or semi-abstract brand objects
  - contained collage-like compositions
- The first screen should feel controlled, composed, and fully visible within one screen.
- Visual expressiveness is welcome, but it must not break containment, hierarchy, or readability.

## New Interaction Idea: Cursor Spotlight Stage

- Desktop first screen may use a cursor-driven spotlight effect.
- The cursor should behave like a soft beam of light that illuminates a limited local area rather than affecting the whole screen.
- The first screen background should feel like a dark display surface or stage board where the objects live.
- The right-side object area can be treated as a curated object board / object stage rather than a flat placeholder.
- Menu text on the left may subtly react to the spotlight:
  - when the cursor passes over a menu item, the active illuminated area can slightly tint or reveal that item
  - the item should feel lit by the cursor rather than simply changing color arbitrarily
- This should feel tactile and atmospheric, not gimmicky.

### Important Constraints For This Effect

- The spotlight must stay subtle and local.
- It should not reduce readability.
- It should not feel like a game UI.
- It should not become the main attraction over the menu logic.
- On mobile, this effect should not be required; the experience needs a simpler fallback.

### Design Interpretation

- Prefer a dark object-stage or presentation board feeling over a literal chalkboard.
- The light should feel warm and soft, closer to a bar lamp or focused exhibition light than a flashlight.
- The interaction should support the menu-state system rather than replace it.
