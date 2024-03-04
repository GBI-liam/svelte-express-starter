## Svelte/Express Starter

This project is to be used as a template to create Svelte+Express apps. It has a few important features:
- SPA/MPA Support: It is designed such that individual pages can be created for Svelte (which is how its set up to start). Each of those pages could have SPA like functionality, but are distinct. This could be modified so there is only an SPA.
- Proxy Vite Support: To avoid issues with CORS, while still allowing for the automatic update Vite provides, we use a proxy in dev to serve the vite server not the static vite pages when running. That means you should access https://localhost:4000 to see content.
- Google secret support
