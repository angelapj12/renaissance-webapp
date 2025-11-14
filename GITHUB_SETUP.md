# Step-by-Step Guide: Push to GitHub

## Prerequisites
- GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Git installed on your computer (check with `git --version`)

---

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `renaissance-webapp` (or any name you prefer)
   - **Description**: (optional) "Renaissance Teaching Platform"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** check "Initialize this repository with a README" (we already have files)
   - **DO NOT** add .gitignore or license (we already have them)
5. Click **"Create repository"**

---

## Step 2: Open Terminal and Navigate to Your Project

1. Open Terminal (or your command line tool)
2. Navigate to your project folder:
   ```bash
   cd "/Users/ang/Desktop/instructor web/renaissance-webapp"
   ```

---

## Step 3: Initialize Git (if not already done)

Check if git is already initialized:
```bash
git status
```

**If you see "not a git repository"**, run:
```bash
git init
```

**If you see file listings**, git is already initialized - skip to Step 4.

---

## Step 4: Add All Files to Git

Add all your project files:
```bash
git add .
```

This stages all files for commit.

---

## Step 5: Create Your First Commit

Commit your files with a message:
```bash
git commit -m "Initial commit: Renaissance web app ready for deployment"
```

**Note**: If this is your first time using git, you may need to set your identity:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
Then run the commit command again.

---

## Step 6: Add GitHub as Remote

After creating the repository on GitHub, you'll see a page with setup instructions. Copy the repository URL (it looks like):
- `https://github.com/YOUR_USERNAME/renaissance-webapp.git`

Then run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/renaissance-webapp.git
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## Step 7: Rename Branch to Main (if needed)

Ensure you're on the main branch:
```bash
git branch -M main
```

---

## Step 8: Push to GitHub

Push your code to GitHub:
```bash
git push -u origin main
```

**First time?** You'll be prompted for authentication:
- **Option A**: Use GitHub Personal Access Token (recommended)
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` permissions
  - Copy the token and use it as your password when prompted
  
- **Option B**: Use GitHub CLI
  ```bash
  gh auth login
  ```

---

## Step 9: Verify Upload

1. Go back to your GitHub repository page
2. Refresh the page
3. You should see all your files listed!

---

## Complete Command Sequence (Copy & Paste)

Here's the complete sequence of commands (replace `YOUR_USERNAME`):

```bash
# Navigate to project
cd "/Users/ang/Desktop/instructor web/renaissance-webapp"

# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Renaissance web app ready for deployment"

# Add remote (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/renaissance-webapp.git

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Troubleshooting

### "Repository not found" error
- Check that the repository URL is correct
- Make sure you've created the repository on GitHub first
- Verify your GitHub username is correct

### "Authentication failed" error
- Use a Personal Access Token instead of password
- Or set up SSH keys for GitHub

### "Files already exist" error
- If you accidentally initialized the repo with a README, you can:
  ```bash
  git pull origin main --allow-unrelated-histories
  git push -u origin main
  ```

### "Permission denied" error
- Make sure you have write access to the repository
- Check that you're using the correct authentication method

---

## Next Steps After Pushing

Once your code is on GitHub, you can:
1. Deploy to Vercel (import from GitHub)
2. Share your repository with others
3. Continue making changes and pushing updates

---

## Making Future Updates

After making changes to your code:

```bash
# Navigate to project
cd "/Users/ang/Desktop/instructor web/renaissance-webapp"

# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

---

## Need Help?

- GitHub Docs: [docs.github.com](https://docs.github.com)
- Git Basics: [git-scm.com/book](https://git-scm.com/book)

