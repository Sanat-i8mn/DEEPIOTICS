# Hostinger Hosting Instructions

## Files to Upload

After running `npm run build`, upload the contents of the `dist` folder to your Hostinger hosting account:

### Required Files:
- `index.html` - Main HTML file
- `assets/` folder - Contains all CSS, JS, and other assets
- `.htaccess` - Apache configuration file (already included)
- `Deepiotics Logo.png` - Your logo file
- `vite.svg` - Vite icon

## Upload Instructions:

1. **Access File Manager**: Log into your Hostinger control panel and open File Manager
2. **Navigate to public_html**: Go to your domain's public_html folder
3. **Upload Files**: Upload ALL contents from the `dist` folder to public_html
4. **Set Permissions**: Ensure .htaccess has 644 permissions

## Important Notes:

### .htaccess Configuration:
- ✅ Handles client-side routing (prevents 404 errors on page refresh)
- ✅ Enables GZIP compression for faster loading
- ✅ Sets proper cache headers for static assets
- ✅ Includes security headers
- ✅ Optional HTTPS redirect (commented out)

### File Structure on Server:
```
public_html/
├── index.html
├── .htaccess
├── Deepiotics Logo.png
├── vite.svg
└── assets/
    ├── index-[hash].css
    ├── index-[hash].js
    └── [other asset files]
```

### Troubleshooting:

1. **404 Errors**: Make sure .htaccess is uploaded and has correct permissions
2. **Assets Not Loading**: Verify the assets folder is uploaded completely
3. **Logo Not Showing**: Ensure "Deepiotics Logo.png" is in the root directory
4. **Slow Loading**: Check if compression is working via browser dev tools

### Performance Optimization:
- All static assets are cached for 1 year
- GZIP compression is enabled
- Security headers are set
- Optimized for production deployment

## Testing:
After upload, test these URLs:
- `yourdomain.com` - Should load the homepage
- `yourdomain.com/about` - Should load homepage (client-side routing)
- `yourdomain.com/services` - Should load homepage (client-side routing)

The .htaccess file ensures all routes redirect to index.html for proper React routing.