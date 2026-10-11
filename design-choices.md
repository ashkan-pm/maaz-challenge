# Design choices

Decisions made beyond the challenge brief, including behavior where the supplied design leaves room for interpretation.

1. **Language:** UI labels use Farsi and an RTL layout; product content and category names retain the API's English text. Translation and currency conversion are not applied.
2. **Responsive layout:** Mobile-first Flexbox and a shared container align the page sections; CSS Grid handles the product grid. Mobile shows one product per row, with controls ordered search → applied filters → availability → sort → categories → products.
3. **Sticky header:** Navigation stays accessible while scrolling, including on mobile.
4. **Mobile menu:** A rounded panel opens below the header with a slide-and-fade transition and space separating it from the header. It closes on selection, outside clicks, Escape, or switching to desktop.
5. **Accordion defaults:** Sort and category controls start closed on mobile and open on larger screens. Users can then expand or collapse them independently.
6. **Interaction styles:** Red identifies the active route, open menu, and hover, focus, or pressed states across links, buttons, and social icons. Shared transition timing and reduced-motion support keep interactions consistent.
7. **Image loading:** Images load lazily in a reserved area with a visible skeleton, then fade in without shifting the cards. Cached images skip unnecessary loading animation, and failed images show a fallback.
8. **Font loading:** Self-hosted variable fonts are preloaded through a critical stylesheet, with optional font display to avoid a visible font swap and layout jitter.
9. **Product titles:** Titles stay on one line with ellipsis to keep card heights consistent; the full title remains available through the title attribute.
10. **URL state:** Submitted search, availability, sorting, and categories live in URL parameters rather than a separate store. This supports shareable links, SSR, and browser back/forward navigation.
11. **Search behavior:** Search applies on form submission, matches product titles after trimming and lowercasing, and has a shared length limit. The field retains the submitted phrase and synchronizes with URL changes.
12. **Applied filters:** Only search and sort have chips; availability and categories use their own controls. The sort chip is permanent, while removing the search chip clears the parameter and input.
13. **Sorting:** Quantity uses mock stock quantity, and rating uses `rating.rate`; both offer ascending and descending options. Quantity descending is listed first and is the default for missing or invalid values, with product ID breaking ties consistently.
14. **Category selection:** Repeated `category` parameters preserve the original category names, with multiple selections matching any selected category. Unknown values are ignored, duplicates are removed, and zero-count options remain visible.
15. **Category counts:** Badges count products matching search and availability before category selections are applied. Capitalized English labels remain right-aligned, and centered Farsi numerals show the counts.
16. **Result animations:** A reusable list transition fades removed products and chips while remaining items move into place. Other controls reuse the same product-grid animation.
17. **Product subset:** The list fetches up to 18 products and filters and sorts that subset locally. Category options are derived from these products rather than a separate category request.
18. **Inventory assumptions:** Fixed mock availability and stock are assigned by product ID because Fake Store provides neither; unknown IDs receive zero stock and are unavailable. `rating.count` remains the number of ratings and is never treated as inventory.
19. **Data fetching:** Nuxt's `useFetch` loads products during SSR and reuses the response during hydration. Direct filter links render the matching, sorted products on the server without a separate query-management library.
20. **Failure handling:** Minimal centered loading, empty, and error states follow the existing visual style, with manual retry for request failures. Typed API models are used without exhaustive runtime validation; a Nuxt error boundary contains client rendering failures and refetches before recovery.
21. **Component structure:** Components are grouped by responsibility and use explicit imports; only reusable primitives belong in `ui/`. Requests, endpoint construction, transformation, and fixed inventory have separate responsibilities in the API layer.
22. **Styling and assets:** Scoped SCSS handles component styles, while global SCSS holds shared tokens and resets. Exported Figma SVGs preserve the supplied icons without unnecessary variants.
23. **Testing and checks:** Component tests are colocated and mock requests to stay independent of the network; pure utility tests run separately. Pre-commit checks process staged files only, while five separate CI jobs cover formatting, lint, types, tests, and the production build; ESLint also rejects `console.log`.
