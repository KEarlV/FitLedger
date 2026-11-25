"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Activity, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage("");
    const normalizedEmail = email.trim().toLowerCase();
    if (mode === "register" && name.trim().length < 2) { setMessage("Please enter a name with at least 2 characters."); setBusy(false); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) { setMessage("Enter a valid email address."); setBusy(false); return; }
    if (password.length < 8) { setMessage("Your password must be at least 8 characters."); setBusy(false); return; }
    const supabase = createClient();
    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail, password,
        options: { data: { display_name: name }, emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) setMessage(error.message);
      else if (data.session) window.location.assign("/");
      else setMessage("Account created. Check your email to verify your account, then sign in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (error) setMessage(error.message.includes("Invalid login credentials") ? "Email or password is incorrect. Please try again." : error.message);
      else window.location.assign("/");
    }
    setBusy(false);
  }
  async function resetPassword() {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) { setMessage("Enter a valid email address first."); return; }
    const { error } = await createClient().auth.resetPasswordForEmail(normalizedEmail, { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` });
    setMessage(error?.message ?? "Password reset email sent. Check your inbox.");
  }
  return <main className="auth-shell">
    <section className="auth-visual">
      <div className="auth-brand"><div className="auth-mark"><Activity size={22}/></div><span>fit<span>ledger</span></span></div>
      <div className="auth-message"><span className="auth-kicker">YOUR PROGRESS, YOUR PACE</span><h1>Build strength.<br/><em>Own your journey.</em></h1><p>A calmer way to track training, nutrition and everyday progress — all in one place.</p></div>
      <div className="auth-visual-footer"><ShieldCheck size={15}/> Private by default. Your fitness data belongs to you.</div>
    </section>
    <section className="auth-form-wrap">
      <div className="auth-form-card">
        <div className="auth-mobile-brand"><div className="auth-mark"><Activity size={20}/></div> fit<span>ledger</span></div>
        <span className="auth-kicker">{mode === "login" ? "WELCOME BACK" : "START YOUR JOURNEY"}</span>
        <h2>{mode === "login" ? "Sign in to FitLedger" : "Create your account"}</h2>
        <p className="auth-subtitle">{mode === "login" ? "Pick up where your progress left off." : "Your training and progress, synced securely."}</p>
        <form onSubmit={submit}>
          {mode === "register" && <label>Your name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="How should we call you?"/></label>}
          <label>Email address<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
          <label>Password<div className="password-wrap"><input required minLength={8} type={showPassword?"text":"password"} autoComplete={mode==="login"?"current-password":"new-password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters"/><button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label="Toggle password visibility">{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
          {message && <div className="auth-message-box" role="status">{message}</div>}
          <button className="auth-submit" disabled={busy}>{busy ? "Please wait…" : mode==="login" ? "Sign in" : "Create account"} <ArrowRight size={17}/></button>
        </form>
        {mode==="login" && <button className="auth-forgot" type="button" onClick={resetPassword}>Forgot password?</button>}
        <div className="auth-switch">{mode==="login"?"New to FitLedger?":"Already have an account?"} <button onClick={()=>{setMode(mode==="login"?"register":"login");setMessage("");}}>{mode==="login"?"Create account":"Sign in"}</button></div>
        <p className="auth-legal">By continuing, you agree to use FitLedger as a personal tracking tool. It is not medical advice.</p>
      </div>
    </section>
  </main>;
}
