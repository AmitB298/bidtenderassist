"use client";
import Link from "next/link";
import { useState } from "react";

const categoryColors = {
  construction:"#f59e0b", it:"#3b82f6", healthcare:"#10b981",
  education:"#8b5cf6", defense:"#ef4444", infrastructure:"#f97316",
};

function formatCrore(val) {
  if (val >= 10000000) return "Rs." + (val/10000000).toFixed(2) + " Cr";
  if (val >= 100000) return "Rs." + (val/100000).toFixed(1) + " L";
  return val ? "Rs." + val.toLocaleString("en-IN") : "N/A";
}

function daysLeft(deadline) {
  const diff = new Date(deadline).getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000*60*60*24)));
}

export default function TenderCard({ tender }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const days = daysLeft(tender.deadline);
  const isUrgent = days <= 5;
  const color = categoryColors[tender.category] || "#64748b";

  function handleSave(e) { e.preventDefault(); setSaved(!saved); }

  function handleShare(e) {
    e.preventDefault();
    const url = window.location.origin + "/tenders/" + tender.id;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleWhatsApp(e) {
    e.preventDefault();
    const url = window.location.origin + "/tenders/" + tender.id;
    const msg = encodeURIComponent("Check out this tender: " + tender.title + " - " + url);
    window.open("https://wa.me/?text=" + msg, "_blank");
  }

  return (
    <div style={{ background:"var(--card,#fff)", border:"1px solid var(--border,#e2e8f0)", borderRadius:"14px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", transition:"transform 0.15s,box-shadow 0.15s", position:"relative" }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"}}>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.75rem" }}>
        <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", flex:1 }}>
          <span style={{ background:color+"20", color:color, padding:"3px 10px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:700, textTransform:"capitalize" }}>{tender.category}</span>
          {tender.isPremium && <span style={{ background:"#f59e0b", color:"#fff", padding:"3px 10px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:700 }}>PREMIUM</span>}
          <span style={{ background:isUrgent?"#fef2f2":"#f0fdf4", color:isUrgent?"#ef4444":"#10b981", padding:"3px 10px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:700 }}>
            {isUrgent?"⚠️ ":"✅ "}{days}d left
          </span>
        </div>
        <div style={{ display:"flex", gap:"6px", marginLeft:"8px", flexShrink:0 }}>
          <button onClick={handleSave} title={saved?"Remove":"Save"}
            style={{ background:saved?"#eff6ff":"transparent", border:"1px solid "+(saved?"#1a56db":"#e2e8f0"), borderRadius:"8px", width:"32px", height:"32px", cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {saved?"🔖":"📌"}
          </button>
          <button onClick={handleWhatsApp} title="Share on WhatsApp"
            style={{ background:"transparent", border:"1px solid #e2e8f0", borderRadius:"8px", width:"32px", height:"32px", cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
            💬
          </button>
          <button onClick={handleShare} title="Copy link"
            style={{ background:copied?"#f0fdf4":"transparent", border:"1px solid "+(copied?"#10b981":"#e2e8f0"), borderRadius:"8px", width:"32px", height:"32px", cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {copied?"✅":"🔗"}
          </button>
        </div>
      </div>

      <h3 style={{ fontSize:"0.95rem", fontWeight:700, color:"var(--text,#0f172a)", marginBottom:"0.4rem", lineHeight:1.4, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
        {tender.title}
      </h3>
      <p style={{ fontSize:"0.82rem", color:"#64748b", marginBottom:"1rem" }}>🏛️ {tender.organization} · 📍 {tender.state}</p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.6rem", marginBottom:"1rem" }}>
        {[
          {label:"Value", value:formatCrore(tender.value)},
          {label:"EMD", value:formatCrore(tender.emd)},
          {label:"Deadline", value:new Date(tender.deadline).toLocaleDateString("en-IN",{day:"numeric",month:"short"})},
        ].map(s=>(
          <div key={s.label} style={{ background:"var(--bg,#f8fafc)", border:"1px solid var(--border,#e2e8f0)", borderRadius:"8px", padding:"0.6rem", textAlign:"center" }}>
            <div style={{ fontSize:"0.65rem", color:"#94a3b8", fontWeight:600, textTransform:"uppercase" }}>{s.label}</div>
            <div style={{ fontWeight:700, color:"var(--text,#0f172a)", fontSize:"0.85rem", marginTop:"2px" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:"0.6rem" }}>
        <Link href={"/tenders/"+tender.id} style={{ flex:1, textAlign:"center", padding:"9px", background:"#1a56db", color:"#fff", borderRadius:"8px", fontWeight:700, textDecoration:"none", fontSize:"0.85rem" }}>
          View Details →
        </Link>
        <button style={{ padding:"9px 14px", background:"var(--bg,#f8fafc)", border:"1px solid var(--border,#e2e8f0)", borderRadius:"8px", fontWeight:600, cursor:"pointer", fontSize:"0.85rem", color:"var(--text,#374151)" }}>
          Apply
        </button>
      </div>

      {copied && (
        <div style={{ position:"absolute", bottom:"calc(100% + 8px)", right:"8px", background:"#0f172a", color:"#fff", padding:"6px 12px", borderRadius:"8px", fontSize:"0.78rem", fontWeight:600, zIndex:10 }}>
          Link copied! ✅
        </div>
      )}
    </div>
  );
}