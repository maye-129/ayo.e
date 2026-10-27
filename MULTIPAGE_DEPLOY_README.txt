FINAL PERFORMANCE OPTIMIZATION — Angell E-Portfolio

Five independent HTML pages: index.html, aboutme.html, projects.html, certifications.html, activities.html.
Shared CSS and JS folders remain in repository root.

Fixes: external Google Fonts and Font Awesome styles load non-render-blocking with noscript fallbacks; all static images receive intrinsic width and height; dynamically generated certification images receive dimensions. Original fonts, visual design, navigation and Google Drive modal behavior preserved.

To deploy: backup your current GitHub repository; upload/replace all file contents of this ZIP in publishing branch main / (root) in ONE commit. Do not upload the ZIP as one file. Confirm GitHub Pages publish and manually test buttons/menus/images. Run PageSpeed Insights again on five HTML URLs. Score improvements are not guaranteed.

Known limitations: GitHub Pages cache headers cannot be customized through these HTML files; third-party fonts and icons may still have network delays. External Google Drive content requires permission and network connectivity.
