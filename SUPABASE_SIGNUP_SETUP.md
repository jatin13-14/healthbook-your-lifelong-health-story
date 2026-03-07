# Supabase & API Setup

## 1. Supabase connection (frontend)

The app uses Supabase for **auth** (sign up, sign in, session) and optionally for **data** (e.g. medications, health records if you use Supabase tables).

In the project root `.env` set:

- `VITE_SUPABASE_URL` – your project URL (e.g. `https://xxxx.supabase.co`)
- `VITE_SUPABASE_PUBLISHABLE_KEY` – your **anon** (public) key from Supabase Dashboard → Project Settings → API

Restart the dev server after changing `.env`.

## 2. Fix "Failed to fetch" on Sign Up

Sign up calls Supabase first. If the request is blocked, add your app URL to Supabase:

1. [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. **Authentication** → **URL Configuration**.
3. **Site URL**: e.g. `http://localhost:5173` or `http://localhost:8080` (the URL where you open the app).
4. **Redirect URLs**: add (with your real port/domain):
   - `http://localhost:5173/dashboard`
   - `http://localhost:5173`
   - `http://localhost:8080/dashboard`
   - `http://localhost:8080`
5. **Save.**

## 3. Django API – no auth for CRUD

The Django API is configured so **no authentication is required** for CRUD:

- All API views use `AllowAny` and no authentication classes.
- You can call `GET/POST/PUT/PATCH/DELETE` on `/api/patients/`, `/api/health-records/`, etc. without tokens or headers.

Use `VITE_API_BASE_URL` in the frontend `.env` (e.g. `http://127.0.0.1:8001`) so the app can reach the backend.

## 4. Supabase tables (if you use them)

If the app uses Supabase for data (e.g. `medications`, `health_records`), configure **Row Level Security (RLS)** in Supabase so that:

- Either the **anon** key can read/write as needed (permissive policies), or
- You pass the user’s JWT from the frontend and RLS policies use `auth.uid()`.

That is done in Supabase Dashboard → Table Editor → select table → RLS policies.
