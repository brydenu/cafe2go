import { Pool } from "pg";
import { createClient } from '@supabase/supabase-js';

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_PUBLIC_KEY;

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const pool = new Pool({
    user: 'bryden',
    host: 'localhost',
    database: 'blfs_cafe',
    password: '',
    port: 5432,
  });

module.exports = {
  pool,
  supabase
};
