"use client";
import Navbar from "@/components/Navbar";
import { mockTenders } from "@/lib/mockData";
import TenderCard from "@/components/TenderCard";
import Link from "next/link";

const savedTenders = mockTenders.slice(0, 3);

const stats = [
  { label:"Tenders Saved", value:"12", icon:"🔖", color:"#1a56db" },
  { label:"Alerts Active", value:"5", icon:"🔔", color:"#f59e0b" },
  { label:"Bids Submitted", value:"3", icon:"📬", color:"#10b981" },
  { label:"Days to Nearest Deadline", value:"7", icon:"⏳", color:"#ef4444" },
];

export default function DashboardPage() {
  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc" }}>
      <Navbar />

      <div style={{ maxWidth:"1200px",margin:"2rem auto",padding:"0 1.5rem" }}>

        {/* Welcome */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem",flexWrap:"wrap",gap:"1rem" }}>
          <div>
            <h1 style={{ fontSize:"1.5rem",fontWeight:800,color:"#0f172a" }}>Welcome back, Rahul 👋</h1>
            <p style={{ color:"#64748b",marginTop:"4px" }}>Here are your tender updates for today.</p>
          </div>
          <Link href="/" style={{ background:"#1a56db",color:"#fff",padding:"10px 20px",borderRadius:"10px",textDecoration:"none",fontWeight:700,fontSize:"0.9rem" }}>
            + Browse Tenders
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem",marginBottom:"2rem" }}>
          {stats.map(s => (
            <div key={s.label} style={{ background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",padding:"1.5rem",boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize:"1.8rem",marginBottom:"8px" }}>{s.icon}</div>
              <div style={{ fontSize:"2rem",fontWeight:800,color:s.color }}>{s.value}</div>
              <div style={{ fontSize:"0.85rem",color:"#64748b",marginTop:"4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Plan Banner */}
        <div style={{ background:"linear-gradient(135deg,#1a56db,#7c3aed)",borderRadius:"16px",padding:"1.5rem 2rem",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",marginBottom:"2rem" }}>
          <div>
            <div style={{ fontSize:"0.8rem",opacity:0.8,fontWeight:600,textTransform:"uppercase",letterSpacing:"1px" }}>Current Plan</div>
            <div style={{ fontSize:"1.3rem",fontWeight:800 }}>Free Plan · 8/10 tenders used today</div>
          </div>
          <Link href="/pricing" style={{ background:"#f59e0b",color:"#fff",padding:"10px 24px",borderRadius:"10px",fontWeight:700,textDecoration:"none",whiteSpace:"nowrap" }}>
            Upgrade to Pro →
          </Link>
        </div>

        {/* Saved Tenders */}
        <h2 style={{ fontSize:"1.1rem",fontWeight:700,color:"#0f172a",marginBottom:"1rem" }}>🔖 Saved Tenders</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(350px,1fr))",gap:"1.25rem" }}>
          {savedTenders.map(t => <TenderCard key={t.id} tender={t} />)}
        </div>
      </div>

      <div style={{ background:"#0f172a",color:"#94a3b8",textAlign:"center",padding:"1.5rem",marginTop:"3rem",fontSize:"0.85rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </div>
    </div>
  );
}
