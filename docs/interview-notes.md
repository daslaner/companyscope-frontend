# Interview notes — Frontend edition

## Strong discussion points

- Why representation and density are independent UI preferences rather than duplicated pages.
- How the command palette preserves native navigation and accessible dialog semantics.
- How route-level lazy loading keeps Leaflet/Recharts out of unrelated chunks.
- Why Playwright runs against the production browser+BFF artifact.
- How chart summaries and map alternatives provide equivalent information paths.
- How Storybook supports visual/API review while Vitest and Playwright prove behavior.

## Trade-off to explain

The reference BFF remains intentionally small and in-memory. That keeps realistic browser failure/security states available without turning the frontend portfolio into a persistence/platform project.
