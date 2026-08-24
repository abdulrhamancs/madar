import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase Auth requires an email; members only ever set a username, so we
// derive a stable synthetic address instead of asking for one at signup.
export const usernameToAuthEmail = (username: string) =>
  `${username.toLowerCase()}@members.madarclub.com`;
