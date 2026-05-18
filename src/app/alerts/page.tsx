"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const categoryOptions = ["Construction","IT","Healthcare","Education","Defense","Infrastructure"];
const stateOptions = ["Delhi","Maharashtra","Uttar Pradesh","Gujarat","Rajasthan","Haryana","Karnataka","Tamil Nadu"];

export default function AlertsPage() {
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState(["Highway", "Solar", "Hospital"]);
  const [selCategories, setSelCategories] = useState(["Construction"]);
  const [selStates, setSelStates] = useState(["Delhi"]);
  const [emailAlert, setEmailAlert] = useState(true);
  const [smsAlert, setSmsAlert] = useState(false);
  const [minValue, setMinValue] = useState("");
  const [saved, setSaved] = useState(false);

  function addKeyword() {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword("");
    }
  }

  function toggle(arr: string[], setArr: (v: string[]) => void, val: string) {
    setArr(arr.includes(val) ? arr.filter(x=>x!==val) : [...arr, val]);
  }

  function saveAlerts() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const chipStyle = (active) => ({
    padding:"6px 14px", borderRadius:"20px", fontSize:"0.82rem", fontWeight:600, cursor:"pointer", border:"1.5px solid",
    borderColor: active ? "#1a56db" : "#e2e8f0",
    background: active ? "#eff6ff" : "#fff",
    color: active ? "#1a56db" : "#64748b",
  });

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />

      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2.5rem 1.5rem", color:"#fff" }}>
        <div style={{ maxWidth:"800px", margin:"0 auto" }}>
          <h1 style={{ fontSize:"2rem", fontWeight:800, marginBottom:"0.5rem" }}>🔔 Tender Alert Setup</h1>
          <p style={{ opacity:0.85 }}>Get notified instantly when matching tenders are published</p>
        </div>
      </div>

      <div style={{ maxWidth:"800px", margin:"2rem auto", padding:"0 1.5rem", display:"flex", flexDirection:"column", gap:"1.5rem" }}>

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"2rem" }}>
          <h2 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:"1.25rem" }}>🔑 Keywords</h2>
          <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1rem" }}>
            <input value={keyword} onChange={e=>setKeyword(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addKeyword()}
              placeholder="e.g. Road construction, IT services..."
              style={{ flex:1, padding:"10px 14px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.9rem", outline:"none" }} />
            <button onClick={addKeyword} style={{ padding:"10px 20px", background:"#1a56db", color:"#fff", border:"none", borderRadius:"8px", fontWeight:700, cursor:"pointer" }}>
              Add
            </button>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
            {keywords.map(kw => (
              <span key={kw} style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 12px", background:"#eff6ff", color:"#1a56db", borderRadius:"20px", fontSize:"0.82rem", fontWeight:600 }}>
                {kw}
                <button onClick={()=>setKeywords(keywords.filter(k=>k!==kw))} style={{ background:"none", border:"none", color:"#94a3b8", cursor:"pointer", fontSize:"1rem", lineHeight:1, padding:0 }}>×</button>
              </span>
            ))}
          </div>
        </div>

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"2rem" }}>
          <h2 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:"1.25rem" }}>📂 Categories</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
            {categoryOptions.map(cat => (
              <button key={cat} onClick={()=>toggle(selCategories,setSelCategories,cat)} style={chipStyle(selCategories.includes(cat))}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"2rem" }}>
          <h2 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:"1.25rem" }}>📍 States</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
            {stateOptions.map(st => (
              <button key={st} onClick={()=>toggle(selStates,setSelStates,st)} style={chipStyle(selStates.includes(st))}>
                {st}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"2rem" }}>
          <h2 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:"1.25rem" }}>⚙️ Notification Settings</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            {[
              { label:"Email Alerts", sub:"Get daily digest + instant alerts", val:emailAlert, set:setEmailAlert },
              { label:"SMS Alerts", sub:"Instant SMS for urgent tenders (Pro only)", val:smsAlert, set:setSmsAlert },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem", background:"#f8fafc", borderRadius:"10px", border:"1px solid #e2e8f0" }}>
                <div>
                  <div style={{ fontWeight:700, color:"#0f172a", fontSize:"0.9rem" }}>{item.label}</div>
                  <div style={{ fontSize:"0.8rem", color:"#64748b", marginTop:"2px" }}>{item.sub}</div>
                </div>
                <div onClick={()=>item.set(!item.val)} style={{ width:"44px", height:"24px", borderRadius:"12px", background:item.val?"#1a56db":"#e2e8f0", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                  <div style={{ position:"absolute", top:"3px", left:item.val?"23px":"3px", width:"18px", height:"18px", borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
                </div>
              </div>
            ))}

            <div>
              <label style={{ fontSize:"0.8rem", fontWeight:700, color:"#64748b", display:"block", marginBottom:"6px" }}>MINIMUM TENDER VALUE (LAKHS)</label>
              <input type="number" placeholder="e.g. 50 (Leave blank for all)" value={minValue} onChange={e=>setMinValue(e.target.value)}
                style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.9rem", outline:"none", boxSizing:"border-box" }} />
            </div>
          </div>
        </div>

        <button onClick={saveAlerts} style={{ padding:"14px", background: saved?"#10b981":"#1a56db", color:"#fff", border:"none", borderRadius:"12px", fontSize:"1rem", fontWeight:700, cursor:"pointer", transition:"background 0.3s" }}>
          {saved ? "✅ Alerts Saved Successfully!" : "Save Alert Preferences"}
        </button>

        <div style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:"16px", padding:"1.5rem 2rem", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <div style={{ fontWeight:800, fontSize:"1.1rem" }}>Want SMS + API Alerts?</div>
            <div style={{ opacity:0.9, fontSize:"0.85rem", marginTop:"4px" }}>Upgrade to Pro for instant SMS, WhatsApp & API webhooks</div>
          </div>
          <Link href="/pricing" style={{ background:"#fff", color:"#d97706", padding:"10px 24px", borderRadius:"10px", fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>
            Upgrade to Pro
          </Link>
        </div>
      </div>

      <div style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", marginTop:"3rem", fontSize:"0.85rem" }}>
        BidTenderAssist 2026 - All government tenders in one place
      </div>
    </div>
  );
}