import { createClient } from "@supabase/supabase-js";

// ⚠️ Vai à dashboard do Supabase → Project Settings → API → copia o Project URL e anon key
const supabaseUrl = "https://eugrubkacvhaourtwldv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z3J1YmthY3ZoYW91cnR3bGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMDU2OTksImV4cCI6MjA3NDY4MTY5OX0.v_FbmAMtaPup_rP5L8d6u0vLdoYK0EiLRUS-nHfWiVw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
