"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Activity, ArrowRight } from "lucide-react";

export default function ResetPasswordPage() {
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(password.length < 8){setMessage("Use at least 8 characters for your password.");return;}
    if(password!==confirm){setMessage("Your passwords do not match.");return;}
    setBusy(true);setMessage("");
    try {
      const {error}=await createClient().auth.updateUser({password});
      if(error) setMessage(error.message);
      else {
        setMessage("Password updated successfully. Redirecting…");
        window.setTimeout(()=>window.location.assign("/"),900);
      }
    } catch(error) {
      console.error("Password update failed",error);
      setMessage("We couldn't update your password. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }
  return <main className="auth-shell"><section className="auth-visual"><div className="auth-brand"><div className="auth-mark"><Activity size={22}/></div><span>fit<span>ledger</span></span></div><div className="auth-message"><span className="auth-kicker">ACCOUNT SECURITY</span><h1>A fresh start.<br/><em>A stronger routine.</em></h1><p>Choose a new password to protect your FitLedger account.</p></div><div className="auth-visual-footer">Private by default. Your fitness data belongs to you.</div></section><section className="auth-form-wrap"><div className="auth-form-card"><div className="auth-mobile-brand"><div className="auth-mark"><Activity size={20}/></div> fit<span>ledger</span></div><span className="auth-kicker">RESET PASSWORD</span><h2>Choose a new password</h2><p className="auth-subtitle">Use at least 8 characters.</p><form onSubmit={submit}><label>New password<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} /></label><label>Confirm new password<input required minLength={8} type="password" autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} /></label>{message&&<div className="auth-message-box" role="status">{message}</div>}<button className="auth-submit" disabled={busy}>{busy?"Updating…":"Update password"} <ArrowRight size={17}/></button></form></div></section></main>;
}
