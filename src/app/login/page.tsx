"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    alert(mode === "login" ? "Login successful! (demo)" : "Account created! (demo)");
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1a56db 0%,#1e429f 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "440px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <div style={{ background: "#1a56db", color: "#fff", padding: "8px 18px", borderRadius: "10px", fontWeight: 800, fontSize: "1.2rem" }}>
            BidTender<span style={{ color: "#f59e0b" }}>Assist</span>
          </div>
        </Link>

        {/* Toggle */}
        <div style={{ display: "flex", background: "#f1f5f9", borderRadius: "10px", padding: "4px", marginBottom: "2rem" }}>
          {(["login", "signup"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "10px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "0.95rem", transition: "all 0.2s",
              background: mode === m ? "#1a56db" : "transparent",
              color: mode === m ? "#fff" : "#64748b",
            }}>
              {m === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {mode === "signup" && (
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Rahul Sharma"
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
            </div>
          )}

          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@company.com"
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
          </div>

          {mode === "signup" && (
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Phone Number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210"
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
            </div>
          )}

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Password</label>
              {mode === "login" && <Link href="#" style={{ fontSize: "0.8rem", color: "#1a56db", textDecoration: "none" }}>Forgot password?</Link>}
            </div>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••"
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }} />
          </div>

          {mode === "signup" && (
            <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "8px", padding: "12px", fontSize: "0.82rem", color: "#0369a1" }}>
              ✅ Free plan: 10 tenders/day &nbsp;|&nbsp; 🔔 Email alerts &nbsp;|&nbsp; 📄 Basic documents
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{
            background: loading ? "#94a3b8" : "#1a56db", color: "#fff", border: "none", padding: "13px", borderRadius: "10px",
            fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: "0.5rem", transition: "background 0.2s",
          }}>
            {loading ? "Please wait..." : mode === "login" ? "Login to Dashboard" : "Create Free Account"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0.25rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>or continue with</span>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          </div>

          <button style={{
            background: "#fff", border: "1.5px solid #e2e8f0", padding: "11px", borderRadius: "10px",
            fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          }}>
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.2-2.7-.4-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.2-2.7-.4-4z"/></svg>
            Continue with Google
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.82rem", color: "#94a3b8" }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")}
            style={{ background: "none", border: "none", color: "#1a56db", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}>
            {mode === "login" ? "Sign Up Free" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
