import { supabase } from "./supabaseClient";

export async function hardLogout() {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    // ignore — logout must proceed even if Supabase errors
  }

  localStorage.clear();
  sessionStorage.clear();

  window.location.href = "/";
}
