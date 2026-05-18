"use client";
import Navbar from "@/components/Navbar";
import { mockTenders } from "@/lib/mockData";
import Link from "next/link";

const savedTenders = mockTenders.slice(0, 5);

const categoryColors = {
  construction:"#f59e0b", it:"#3b82f6", healthcare:"#10b981",
  education:"#8b5cf6", defense:"#ef4444", infrastructure:"#f97316",
};

function formatCrore(val) {
  if (val >= 10000000) return "Rs." + (val/10000000).toFixed(2) + " Cr";
  if (val >= 100000) return "Rs." + (val/100000).toFixed(1) + " L";
  return "Rs." + val.toLocaleString("en-IN");
}

function daysLeft(deadline) {
  const diff = new Date(deadline).getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000*60*60*24)));
}

export default function SavedPage() {
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />

      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2.5rem 1.5rem", color:"#fff" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
          <h1 style={{ fontSize:"2rem", fontWeight:800, marginBottom:"0.5rem" }}>🔖 Saved Tenders</h1>
          <p style={{ opacity:0.85 }}>Your bookmarked tenders — track deadlines at a glance</p>
        </div>
      </div>

      <div style={{ maxWidth:"1000px", margin:"2rem auto", padding:"0 1.5rem" }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem", flexWrap:"wrap", gap:"0.75rem" }}>
          <span style={{ fontWeight:700, color:"#0f172a" }}>{savedTenders.length} saved tenders</span>
          <div style={{ display:"flex", gap:"0.5rem" }}>
            <button style={{ padding:"7px 16px", border:"1.5px solid #e2e8f0", borderRadius:"8px", background:"#fff", color:"#374151", fontWeight:600, cursor:"pointer", fontSize:"0.85rem" }}>Sort by Deadline</button>
            <Link href="/tenders" style={{ padding:"7px 16px", background:"#1a56db", color:"#fff", borderRadius:"8px", fontWeight:600, textDecoration:"none", fontSize:"0.85rem" }}>+ Add More</Link>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {savedTenders.map(tender => {
            const days = daysLeft(tender.deadline);
            const isUrgent = days <= 7;
            return (
              <div key={tender.id} style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"14px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", display:"flex", gap:"1.5rem", alignItems:"flex-start", flexWrap:"wrap" }}>
                <div style={{ flex:1, minWidth:"200px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.6rem", flexWrap:"wrap" }}>
                    <span style={{ background:categoryColors[tender.category]+"20", color:categoryColors[tender.category], padding:"3px 10px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:700, textTransform:"capitalize" }}>
                      {tender.category}
                    </span>
                    <span style={{ background:isUrgent?"#fef2f2":"#f0fdf4", color:isUrgent?"#ef4444":"#10b981", padding:"3px 10px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:700 }}>
                      {isUrgent ? "⚠️ " : "✅ "}{days} days left
                    </span>
                  </div>
                  <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:"0.4rem", lineHeight:1.4 }}>{tender.title}</h3>
                  <p style={{ fontSize:"0.85rem", color:"#64748b" }}>{tender.organization} · {tender.state}</p>
                </div>

                <div style={{ display:"flex", gap:"1.5rem", alignItems:"center", flexWrap:"wrap" }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:"0.7rem", color:"#94a3b8", fontWeight:600, textTransform:"uppercase" }}>Value</div>
                    <div style={{ fontWeight:800, color:"#0f172a", fontSize:"0.95rem", marginTop:"2px" }}>{formatCrore(tender.value)}</div>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:"0.7rem", color:"#94a3b8", fontWeight:600, textTransform:"uppercase" }}>Deadline</div>
                    <div style={{ fontWeight:700, color:isUrgent?"#ef4444":"#0f172a", fontSize:"0.9rem", marginTop:"2px" }}>
                      {new Date(tender.deadline).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"0.5rem" }}>
                    <Link href={"/tenders/"+tender.id} style={{ padding:"8px 16px", background:"#1a56db", color:"#fff", borderRadius:"8px", fontWeight:600, textDecoration:"none", fontSize:"0.85rem" }}>View</Link>
                    <button style={{ padding:"8px 12px", background:"#fef2f2", color:"#ef4444", border:"1px solid #fecaca", borderRadius:"8px", fontWeight:600, cursor:"pointer", fontSize:"0.85rem" }}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {savedTenders.length === 0 && (
          <div style={{ textAlign:"center", padding:"5rem", color:"#94a3b8" }}>
            <div style={{ fontSize:"3rem" }}>🔖</div>
            <h2 style={{ marginTop:"1rem", fontWeight:700 }}>No saved tenders yet</h2>
            <p style={{ marginTop:"0.5rem" }}>Browse tenders and click the bookmark icon to save them</p>
            <Link href="/tenders" style={{ display:"inline-block", marginTop:"1.5rem", background:"#1a56db", color:"#fff", padding:"11px 24px", borderRadius:"10px", fontWeight:700, textDecoration:"none" }}>Browse Tenders</Link>
          </div>
        )}
      </div>

      <footer style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", fontSize:"0.82rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </footer>
    </div>
  );
}