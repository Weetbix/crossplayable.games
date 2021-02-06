# crossplayable.games

Find games to play with your friends over multiple platforms!

Statically generated and built with React, Typescript, Gatsby and GraphQL.

All data for the site is fetched from multiple sources and merged together at build time. Data sources include wikipedia, IGDB, xbox.com and playstation.com.

Features:

- Fully static site built with GatsbyJS
- Cypress.io used for end to end tests
- GitHub actions for CI/CD which:
  - Runs E2E tests
  - Dependabot automatic pull request opening / merging after CI passing
  - Deploys on new pushes to main
