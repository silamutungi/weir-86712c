# WEIR

> Built with [Visila](https://visila.com)

## What this app does

<!-- One sentence describing the core problem this solves -->

## Top user stories

- As a user, I can sign up and log in securely
- As a user, I can [core feature 1]
- As a user, I can [core feature 2]
- As a user, I can manage my account and data
- As a user, I can access the app on any device

## Run locally

```bash
npm install
cp .env.example .env  # fill in your Supabase keys
npm run dev
```

## Deploy

This app auto-deploys to Vercel on every push to main.
Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables.

## You own everything

GitHub: https://github.com/silamutungi/weir-86712c
Vercel: https://vercel.com/dashboard
Supabase: https://supabase.com/dashboard

Visila provisioned this. You own it entirely.

## Next Steps

### Environment Setup
- [ ] Configure Supabase project and database schema
- [ ] Set up authentication policies and RLS (Row Level Security)
- [ ] Add environment variables for development and production
- [ ] Configure email templates for auth notifications

### Deployment
- [ ] Test app locally with `npm run dev`
- [ ] Push to GitHub main branch to trigger Vercel deployment
- [ ] Verify environment variables are set in Vercel dashboard
- [ ] Test deployed app at your Vercel URL
- [ ] Set up custom domain (optional)

### Feature Roadmap
- [ ] Implement [core feature 1]
- [ ] Implement [core feature 2]
- [ ] Add user profile customization
- [ ] Implement data export functionality
- [ ] Add offline support
- [ ] Set up analytics and monitoring
- [ ] Create mobile app (if needed)