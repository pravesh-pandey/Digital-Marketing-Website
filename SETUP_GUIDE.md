# Setup Guide - Digital Marketing Portfolio

## Step-by-Step Setup Instructions

### Step 1: Customize Your Content

1. **Edit Portfolio Data** (`data/portfolio.json`):
   - Replace "Your Name" with your actual name
   - Update your title and bio
   - Add your actual skills
   - Update testimonials with real client feedback
   - Add your contact information

2. **Add Your Images**:
   - Add your headshot as `images/headshot.jpg` (recommended: 400x400px, optimized for web)
   - Add client photos as `images/client-1.jpg`, `images/client-2.jpg`, etc.
   - Use compressed images (JPG/PNG) for faster loading

### Step 2: Set Up Contact Form

You have two options:

#### Option A: Formspree (Recommended - Free & Easy)

1. Go to [formspree.io](https://formspree.io) and sign up (free plan available)
2. Click "New Form" and give it a name (e.g., "Portfolio Contact")
3. Copy your Form ID (looks like: `abc123xyz`)
4. Update `data/portfolio.json`:
   ```json
   "contact": {
     "email": "your.email@example.com",
     "formspreeId": "abc123xyz"
   }
   ```
5. Test by submitting the form - you'll receive emails!

#### Option B: Simple Mailto (No Setup Required)

If you skip Formspree setup, the form will automatically use a mailto link. This opens the user's email client with pre-filled information.

### Step 3: Deploy to GitHub Pages

#### Enable GitHub Pages:

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**:
   - Select your branch (e.g., `claude/create-portfolio-site-011CUTiYPPb4K3hzvowGzDWJ`)
   - Select `/ (root)` as the folder
   - Click **Save**

5. Wait 2-3 minutes for deployment
6. Your site will be live at:
   ```
   https://[your-username].github.io/Digital-Marketing-Website/
   ```

### Step 4: Test Your Live Site

Once deployed, test:
- ✅ All sections scroll smoothly
- ✅ Mobile responsiveness (try on your phone)
- ✅ Testimonials carousel navigation
- ✅ Contact form submission
- ✅ All links work correctly
- ✅ Images load properly

### Step 5: Custom Domain (Optional)

To use your own domain (e.g., `www.yourname.com`):

1. **In GitHub Pages Settings**:
   - Enter your custom domain in the "Custom domain" field
   - Click Save

2. **In Your Domain Registrar** (GoDaddy, Namecheap, etc.):
   - Add a CNAME record pointing to `[your-username].github.io`
   - Or add A records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. Wait for DNS propagation (can take up to 24 hours)

### Step 6: Analytics Setup (Optional)

#### Google Analytics:

1. Create a Google Analytics account
2. Get your tracking ID (e.g., `G-XXXXXXXXXX`)
3. Add this code before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Quick Updates Guide

### Update Your Bio:
Edit `data/portfolio.json` → `about` → `bio`

### Add a Testimonial:
Edit `data/portfolio.json` → add to `testimonials` array

### Change Colors:
Edit `css/styles.css` → `:root` variables

### Update Contact Info:
Edit `data/portfolio.json` → `contact` section

After any changes:
```bash
git add .
git commit -m "Update portfolio content"
git push
```

Changes will be live in 1-2 minutes!

## Image Optimization Tips

For faster loading:

1. **Compress images**:
   - Use [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
   - Aim for <200KB per image

2. **Recommended sizes**:
   - Headshot: 400x400px
   - Client photos: 100x100px

3. **Format**:
   - Use JPG for photos
   - Use PNG for graphics with transparency
   - Consider WebP for better compression

## SEO Checklist

- [ ] Update page title in `index.html`
- [ ] Update meta description in `index.html`
- [ ] Add alt text to all images (already in JSON)
- [ ] Submit sitemap to Google Search Console
- [ ] Add structured data for better rich snippets
- [ ] Ensure all social media links are correct

## Troubleshooting

### Site Not Loading on GitHub Pages?
- Check that GitHub Pages is enabled
- Verify the branch and folder are correct
- Make sure repository is public (for free GitHub accounts)
- Wait a few minutes for initial deployment

### Images Not Showing?
- Check file paths in `portfolio.json` match actual files
- File names are case-sensitive
- Ensure images are committed to git

### Form Not Working?
- Verify Formspree ID is correct
- Check browser console for errors
- Test with a real email address

### Carousel Not Working?
- Check browser console for JavaScript errors
- Verify `portfolio.json` is valid JSON
- Make sure you have at least one testimonial

## Performance Checklist

- [ ] All images compressed and optimized
- [ ] Browser caching enabled (automatic with GitHub Pages)
- [ ] No console errors when loading page
- [ ] Page loads in <3 seconds on 3G connection
- [ ] Lighthouse score >90 (test in Chrome DevTools)

## Browser Testing

Test your site on:
- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox
- [ ] Safari (Desktop & iOS)
- [ ] Edge

Use [BrowserStack](https://www.browserstack.com) for comprehensive testing.

## Security Best Practices

- ✅ No API keys or secrets in code
- ✅ Honeypot spam protection on form
- ✅ Email validation
- ✅ HTTPS enabled (automatic with GitHub Pages)

## Next Steps

After setup:

1. Share your portfolio link on social media
2. Add it to your LinkedIn profile
3. Include it in your email signature
4. Update it regularly with new testimonials
5. Consider adding a blog section for content marketing

## Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Formspree Documentation](https://help.formspree.io)
- [Web.dev Performance Guide](https://web.dev/performance/)

---

Need help? Check the main README.md for more detailed information!
