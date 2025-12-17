# Deploy to Render - Step by Step Guide

## Prerequisites
✅ Code pushed to GitHub: `git@github.com:samuldecosta/promptGPT.git`
✅ `render.yaml` configuration file added
✅ All dependencies in `package.json`

---

## Deployment Steps

### Step 1: Sign Up / Log In to Render
1. Go to **[https://render.com](https://render.com)**
2. Sign up for a free account or log in
3. You can sign in with your GitHub account for easier integration

### Step 2: Connect Your GitHub Repository
1. Click **"New +"** button in the top right
2. Select **"Web Service"**
3. Click **"Connect Account"** next to GitHub (if not already connected)
4. Authorize Render to access your GitHub repositories

### Step 3: Select Your Repository
1. Find and select: **`samuldecosta/promptGPT`**
2. Click **"Connect"**

### Step 4: Configure the Web Service
Render should auto-detect your `render.yaml`, but verify these settings:

| Setting | Value |
|---------|-------|
| **Name** | `vistaprint-content-api` (or your choice) |
| **Region** | Choose closest to you (e.g., Oregon, Frankfurt) |
| **Branch** | `main` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | **Free** |

### Step 5: Environment Variables (Optional)
If you need any environment variables:
1. Scroll to **"Environment Variables"** section
2. Add any required variables (currently none needed for POC)

### Step 6: Deploy!
1. Click **"Create Web Service"** button
2. Render will start building and deploying your app
3. You'll see the build logs in real-time

### Step 7: Monitor Deployment
- ⏳ Build process takes ~2-3 minutes
- ✅ Once complete, you'll see "Live" status
- 🌐 Your app URL will be: `https://vistaprint-content-api.onrender.com` (or similar)

---

## Your API Endpoints (After Deployment)

Replace `localhost:3000` with your Render URL:

### Health Check
```bash
curl https://your-app-name.onrender.com/health
```

### Get Content
```bash
curl "https://your-app-name.onrender.com/api/v1/content?productID=123&requestor=myapp&limit=10"
```

### Image Redirect
```
https://your-app-name.onrender.com/api/v1/img/{hash}
```

---

## Important Notes for Free Tier

### ⚠️ Free Tier Limitations:
1. **Spins down after 15 minutes of inactivity**
   - First request after spin-down takes ~30 seconds to start
   - Subsequent requests are fast
   
2. **750 hours/month free**
   - More than enough for POC/testing

3. **Automatic deployments**
   - Every git push to `main` branch auto-deploys

### 💡 Tips:
- Keep the Render dashboard open to monitor logs
- First deployment takes longest (~2-3 min)
- Use Render logs to debug any issues

---

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Verify `package.json` has all dependencies
- Ensure Node.js version is compatible (add `"engines": { "node": "18.x" }` to package.json if needed)

### App Crashes
- Check the application logs in Render
- Verify PORT is read from environment: `process.env.PORT || 3000`
- Our server.js already handles this correctly ✅

### Can't Access API
- Wait 30 seconds if app was sleeping (free tier)
- Check the URL is correct (no trailing slashes)
- Verify the app status shows "Live" in dashboard

---

## Next Steps After Deployment

1. **Test all endpoints** with your live URL
2. **Share the URL** with your team
3. **Monitor usage** in Render dashboard
4. **Set up custom domain** (optional, available on free tier)

---

## Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render will automatically:
1. Detect the push
2. Build the new version
3. Deploy if build succeeds
4. Keep the old version running if build fails

---

## Your Deployment Checklist

- [ ] Sign up/log in to Render
- [ ] Connect GitHub account
- [ ] Select `samuldecosta/promptGPT` repository
- [ ] Verify configuration (should auto-detect from render.yaml)
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (~2-3 minutes)
- [ ] Test health check endpoint
- [ ] Test content API endpoint
- [ ] Share the live URL!

---

**Ready to deploy!** 🚀 Follow the steps above and your API will be live in minutes.
