# Frontend architecture

CompanyScope Frontend treats the browser as a product surface with explicit interaction contracts rather than a thin rendering layer.

## Layers

- **Routes** own page-level composition and lazy loading.
- **Feature components** own domain interactions such as company exploration, saved research and explainability.
- **Frontend experience modules** own cross-cutting UI behavior: command navigation, display density and representation preferences.
- **UI primitives** own reusable semantics, sizing and state styling.
- **Typed ports** isolate auth, analytics and explainer network behavior.

## Adaptive explorer

The table and card explorer are two representations of the same company model. Representation choice is persisted locally and never changes the underlying route, save or analytics semantics. Density is orthogonal to representation so a user can choose compact cards or comfortable tables without creating four separate product implementations.

## Keyboard architecture

The command palette listens for `Cmd/Ctrl + K`, exposes a modal dialog with an accessible name, supports route shortcuts and searches the deterministic company catalog. Escape closes the dialog. Native links and buttons remain the primary interaction primitives so keyboard behavior is not reimplemented unnecessarily.

## Performance

Heavy page routes are lazy-loaded. Leaflet and Recharts therefore stay out of unrelated route chunks. The production build is exercised through Playwright rather than relying only on the Vite development server.
