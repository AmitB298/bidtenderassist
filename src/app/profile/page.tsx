"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const stats = [
  { label:"Tenders Saved", value:"12", icon:"🔖" },
  { label:"Alerts Active", value:"5", icon:"🔔" },
  { label:"Bids Submitted", value:"3", icon:"📬" },
  { label:"Plan", value:"Free", icon:"⭐" },
];

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Rahul Sharma",
    email: "rahul@company.com",
    phone: "+91 98765 43210",
    company: "Sharma Constructions Pvt Ltd",
    gst: "27AAAAA0000A1Z5",
    state: "Maharashtra",
    category: "Construction",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const inputStyle = { width:"100%", padding:"10px 14px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.9rem", outline:"none", boxSizing:"border-box", background:"#fff" };
  const labelStyle = { fontSize:"0.78rem", fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:"6px" };

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />

      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2.5rem 1.5rem 5rem", color:"#fff" }}>
        <div style={{ maxWidth:"800px", margin:"0 auto", display:"flex", alignItems:"center", gap:"1.5rem", flexWrap:"wrap" }}>
          <div style={{ width:"80px", height:"80px", borderRadius:"50%", background:"#f59e0b", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem", fontWeight:800, color:"#fff", flexShrink:0 }}>
            RS
          </div>
          <div>
            <h1 style={{ fontSize:"1.6rem", fontWeight:800 }}>{form.name}</h1>
            <p style={{ opacity:0.85, marginTop:"4px" }}>{form.company}</p>
            <span style={{ background:"rgba(255,255,255,0.2)", padding:"3px 12px", borderRadius:"20px", fontSize:"0.78rem", fontWeight:700, marginTop:"8px", display:"inline-block" }}>FREE PLAN</span>
          </div>
          <Link href="/pricing" style={{ marginLeft:"auto", background:"#f59e0b", color:"#fff", padding:"10px 22px", borderRadius:"10px", fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>
            Upgrade to Pro
          </Link>
        </div>
      </div>

      <div style={{ maxWidth:"800px", margin:"-2.5rem auto 3rem", padding:"0 1.5rem" }}>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
          {stats.map(s => (
            <div key={s.label} style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1.25rem", textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize:"1.5rem" }}>{s.icon}</div>
              <div style={{ fontSize:"1.5rem", fontWeight:800, color:"#1a56db", marginTop:"6px" }}>{s.value}</div>
              <div style={{ fontSize:"0.78rem", color:"#64748b", marginTop:"4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"2rem", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize:"1.1rem", fontWeight:700, color:"#0f172a", marginBottom:"1.5rem" }}>Account Settings</h2>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem" }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input name="email" value={form.email} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Company Name</label>
              <input name="company" value={form.company} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>GST Number</label>
              <input name="gst" value={form.gst} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Primary State</label>
              <input name="state" value={form.state} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ gridColumn:"1 / -1" }}>
              <label style={labelStyle}>Primary Category</label>
              <input name="category" value={form.category} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"1.75rem", flexWrap:"wrap", gap:"1rem" }}>
            <button style={{ background:"#fef2f2", color:"#ef4444", border:"1px solid #fecaca", padding:"10px 20px", borderRadius:"8px", fontWeight:600, cursor:"pointer", fontSize:"0.9rem" }}>
              Delete Account
            </button>
            <button onClick={handleSave} style={{ background:saved?"#10b981":"#1a56db", color:"#fff", border:"none", padding:"11px 28px", borderRadius:"10px", fontWeight:700, cursor:"pointer", fontSize:"0.95rem", transition:"background 0.3s" }}>
              {saved ? "✅ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"2rem", marginTop:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize:"1.1rem", fontWeight:700, color:"#0f172a", marginBottom:"1rem" }}>Notification Preferences</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
            {[
              { label:"Email Alerts", sub:"Daily digest of matching tenders", on:true },
              { label:"SMS Alerts", sub:"Instant alerts for urgent deadlines", on:false },
              { label:"WhatsApp Alerts", sub:"Rich notifications with tender details", on:false },
              { label:"Browser Notifications", sub:"Desktop push notifications", on:true },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.9rem 1rem", background:"#f8fafc", borderRadius:"10px", border:"1px solid #e2e8f0" }}>
                <div>
                  <div style={{ fontWeight:600, color:"#0f172a", fontSize:"0.9rem" }}>{item.label}</div>
                  <div style={{ fontSize:"0.78rem", color:"#64748b", marginTop:"2px" }}>{item.sub}</div>
                </div>
                <div style={{ width:"40px", height:"22px", borderRadius:"11px", background:item.on?"#1a56db":"#e2e8f0", position:"relative", cursor:"pointer", flexShrink:0 }}>
                  <div style={{ position:"absolute", top:"3px", left:item.on?"21px":"3px", width:"16px", height:"16px", borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", fontSize:"0.82rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </footer>
    </div>
  );
}