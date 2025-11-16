// Vercel Serverless Function: Append application submission to Supabase (ESM)
// Env required: SUPABASE_URL, SUPABASE_SERVICE_ROLE
import { createClient } from '@supabase/supabase-js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  // Basic CORS (adjust origin as needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Method not allowed' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    console.error('[apply] Missing env vars SUPABASE_URL or SUPABASE_SERVICE_ROLE');
    return send(res, 500, { error: 'Server not configured (missing Supabase env vars)' });
  }

  let payload = {};
  try {
    // Parse raw JSON body
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const raw = Buffer.concat(buffers).toString('utf8') || '{}';
    payload = JSON.parse(raw);
  } catch (e) {
    console.error('[apply] JSON parse error:', e);
    return send(res, 400, { error: 'Invalid JSON' });
  }

  const {
    name,
    email,
    phone,
    subject,
    experience,
    philosophy,
    portfolio,
    social,
    referrer,
    user_agent,
  } = payload || {};

  if (!name || !email) {
    return send(res, 400, { error: 'Missing required fields: name, email' });
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return send(res, 400, { error: 'Invalid email' });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const insertRow = {
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      experience: experience || null,
      philosophy: philosophy || null,
      portfolio: portfolio || null,
      social: social || null,
      referrer: referrer || null,
      user_agent: user_agent || null,
    };

    const { error } = await supabase
      .from('applicant_submissions')
      .insert([insertRow]);

    if (error) {
      console.error('[apply] Supabase insert error:', error);
      return send(res, 500, { error: error.message });
    }

    return send(res, 200, { ok: true });
  } catch (e) {
    console.error('[apply] Handler error:', e);
    return send(res, 500, { error: 'Unexpected server error' });
  }
}


