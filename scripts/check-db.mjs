#!/usr/bin/env node
/**
 * Verifies Supabase connection and that expected tables exist.
 * Run from project root: node scripts/check-db.mjs
 * Requires .env with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');

function loadEnv() {
  if (!existsSync(envPath)) {
    console.error('Missing .env file');
    process.exit(1);
  }
  const raw = readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return env;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(url, key);

const TABLES = ['profiles', 'health_records', 'medications', 'emergency_profiles', 'user_roles'];

async function main() {
  console.log('Supabase URL:', url);
  console.log('');

  // 1) Connection / auth health
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log('✓ Database connection: OK (auth endpoint reachable)');
  } catch (e) {
    console.log('✗ Database connection: FAILED');
    console.log('  Error:', e.message || e);
    process.exit(1);
  }

  // 2) Tables (simple select to see if table exists)
  console.log('\nTables:');
  let allOk = true;
  for (const table of TABLES) {
    try {
      const { data, error } = await supabase.from(table).select('id').limit(0);
      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          console.log('  ✗', table, '— table does not exist (run migrations: npx supabase db push)');
        } else {
          console.log('  ✗', table, '—', error.message);
        }
        allOk = false;
      } else {
        console.log('  ✓', table);
      }
    } catch (e) {
      console.log('  ✗', table, '—', e.message || e);
      allOk = false;
    }
  }

  console.log('');
  if (allOk) {
    console.log('All expected tables exist. Database is ready.');
  } else {
    console.log('Apply migrations: cd to project root, then run: npx supabase link --project-ref ipstznbovhrcfdfupptx && npx supabase db push');
    process.exit(1);
  }
}

main();
