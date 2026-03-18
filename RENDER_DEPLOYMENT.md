# 🚀 Deployment Guide - Render

This guide will help you deploy the Shopping List App to Render.

## Prerequisites

- GitHub account with the repository pushed
- Render account (free at https://render.com)
- Node.js 18+ (Render uses this)

## Step-by-Step Deployment

### 1. **Prepare Your Repository**

Make sure all changes are pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Render deployment"
git push
```

### 2. **Connect to Render**

1. Go to https://render.com and sign up/login
2. Click **New +** button and select **Web Service**
3. Select **Deploy from a Git repository**
4. Connect your GitHub account and authorize Render
5. Select the `Task-5--Shopping-List-App` repository

### 3. **Configure Deployment Settings**

Fill in the deployment form:

- **Name**: `shopping-list-app` (or your preferred name)
- **Region**: Select closest to you (oregon, us-east, eu-central, etc.)
- **Branch**: `main`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Select Free (or Paid for better performance)

Environment Variables:
```
NODE_ENV = production
PORT = 3000
```

### 4. **Deploy**

Click **Create Web Service** button. Render will:
- Clone your repository
- Install dependencies (`npm install`)
- Build the app (`npm run build`)
- Start the server (`npm start`)

### 5. **Access Your App**

Once deployment completes (usually 2-5 minutes):
- Your app will be available at: `https://shopping-list-app.onrender.com` (or similar)
- Status will show as "Live" ✅

## 📁 Project Structure for Deployment

```
/
├── server.js              # Express server (serves frontend + JSON API)
├── src/                   # React frontend source
├── dist/                  # Built frontend (created by npm run build)
├── package.json           # Dependencies and scripts
├── render.yaml            # Render deployment config
└── vite.config.ts         # Vite build configuration
```

## 🔄 API Configuration

The app automatically uses the correct API endpoints:

**In Development**:
- Frontend: `http://localhost:5173` (Vite dev server)
- API: `http://localhost:5000/api/*`

**In Production (Render)**:
- Both served from: `https://shopping-list-app.onrender.com`
- API: `https://shopping-list-app.onrender.com/api/*`

## ⚙️ Build Process on Render

When you push to GitHub, Render automatically:
1. Detects changes
2. Runs `npm install` (installs all dependencies)
3. Runs `npm run build` (builds React app for production)
4. Runs `npm start` (starts the Express server)
5. Serves the built React app + JSON API

## 🛠️ Server Details

The `server.js` file:
- Uses Express to serve static files from the `dist/` folder
- Provides JSON Server API on `/api` endpoints
- Handles CORS for cross-origin requests
- Serves `index.html` for all non-API routes (SPA routing)
- Health check endpoint: `/health`

## 🌐 API Endpoints (After Deployment)

Once deployed, your API endpoints are:

```
POST https://shopping-list-app.onrender.com/api/users
GET  https://shopping-list-app.onrender.com/api/users
GET  https://shopping-list-app.onrender.com/api/users/:id
POST https://shopping-list-app.onrender.com/api/shoppingLists
GET  https://shopping-list-app.onrender.com/api/shoppingLists
PUT  https://shopping-list-app.onrender.com/api/shoppingLists/:id
DELETE https://shopping-list-app.onrender.com/api/shoppingLists/:id
```

## 🔍 Monitoring Deployment

### See Logs
1. Go to your service on Render
2. Click the **Logs** tab
3. View real-time deployment and server logs

### Restart Service
1. Go to your service
2. Click **Manual Deploy** → **Deploy latest commit**

### Troubleshooting

If deployment fails:
1. Check the **Logs** tab for error messages
2. Ensure all files are committed and pushed to GitHub
3. Verify `package.json` has correct scripts
4. Make sure `npm run build` works locally first

## 📝 Environment Variables (Optional)

If you need custom environment variables, add them in:
1. Render Dashboard → Your Service → Environment
2. Or set them in `render.yaml` (already configured)

## 🎯 Next Steps

After successful deployment:

1. **Test the app**: Visit `https://shopping-list-app.onrender.com`
2. **Register a user**: Create an account
3. **Create shopping lists**: Test full functionality
4. **Monitor logs**: Check Logs tab for any errors

## ⚡ Performance Notes

- **Free Plan**: App may sleep after 15 minutes of inactivity (takes ~30s to wake up)
- **Paid Plans**: Always active, better performance
- **Data**: JSON data is stored in `src/data/db.json` and persists between restarts

## 🔗 Useful Links

- Render Docs: https://render.com/docs
- GitHub Integration: https://render.com/docs/github
- Environment Variables: https://render.com/docs/environment-variables

---

Your Shopping List App is now live on Render! 🎉
