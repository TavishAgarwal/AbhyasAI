// backend/services/supabaseClient.js
// Supabase client singleton using SERVICE_ROLE_KEY for backend operations

const { createClient } = require('@supabase/supabase-js');

let client;

function getSupabase() {
  if (client) return client;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required when the database is used.');
  }
  client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  return client;
}

// Compatibility proxy keeps existing consumers lazy as well.
const supabase = new Proxy({}, { get: (_, property) => getSupabase()[property] });

module.exports = { getSupabase, supabase };
