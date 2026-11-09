# Bisola Loto — website (React + Vite)

    npm install
    npm run dev       # local
    npm run build     # outputs /dist

Deploy /dist to Netlify or Vercel (SPA fallback files included: public/_redirects, vercel.json).

## Brand assets (public/images)
- logo-header.png: Horizontal, oxblood (header)
- logo-footer.png: Horizontal, champagne (footer)
- favicon-32.png / apple-touch-icon.png: Mark (browser tab icon)
- social-profile.png: Mark, champagne on oxblood (pop-up avatar, social profiles)
- logo-primary.png: Primary, oxblood (documents and print)

Colours (src/styles.css): Oxblood #42121D, Champagne #E8C7A8, Bronze #B98F6E, Ivory #F7EEE6.

## To finish before launch
- Forms: set VITE_FORM_ENDPOINT (Formspree, ConvertKit etc.) in a .env file. Until then, forms show the thank-you message only.
- Replace the three photos in public/images (bisola-*.jpg) with the originals. They were cropped from the design PDF, so resolution is low.
- Add public/bisola-loto-speaker-kit.pdf; set real LinkedIn, Instagram, YouTube and True Disciple links (App.jsx, pages.jsx).
- SEO: per-page title, description, canonical and Open Graph tags (Seo component), JSON-LD, sitemap.xml and robots.txt are in place. For best crawlability, add prerendering (e.g. vite-plugin-prerender) or move to Next.js.
- Add a 1200x630 og-image.png and point og:image at it.
