"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import TenderCard from "@/components/TenderCard";
import TenderSkeleton from "@/components/TenderSkeleton";
import MobileBottomNav from "@/components/MobileBottomNav";
import { mockTenders, states, categories } from "@/lib/mockData";
import Link from "next/link";

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ num, label, suffix }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(num, 1800, visible);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold:0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ textAlign:"center" }}>
      <div style={{ fontSize:"2rem", fontWeight:900, color:"#f59e0b" }}>{count.toLocaleString("en-IN")}{suffix||""}</div>
      <div style={{ fontSize:"0.82rem", opacity:0.75, marginTop:"4px" }}>{label}</div>
    </div>
  );
}

const PER_PAGE = 6;

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All States");
  const [category, setCategory] = useState("All Categories");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 1200); }, []);
  useEffect(() => { setPage(1); }, [search, state, category]);

  const filtered = useMemo(() => mockTenders.filter(t => {
    const ms = t.title.toLowerCase().includes(search.toLowerCase()) || t.organization.toLowerCase().includes(search.toLowerCase());
    const mst = state === "All States" || t.state === state;
    const mc = category === "All Categories" || t.category === category;
    return ms && mst && mc;
  }), [search, state, category]);

  const displayed = filtered.slice(0, page * PER_PAGE);
  const hasMore = displayed.length < filtered.length;

  function loadMore() {
    setLoading(true);
    setTimeout(() => { setPage(p=>p+1); setLoading(false); }, 700);
  }

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg,#f8fafc)" }}>
      <Navbar />
      <div style={{ background:"linear-gradient(135deg,#1a56db 0%,#1e429f 100%)", padding:"3rem 1.25rem 2rem", textAlign:"center", color:"#fff" }}>
        <div style={{ maxWidth:"800px", margin:"0 auto" }}>
          <div style={{ display:"inline-block", background:"rgba(245,158,11,0.2)", border:"1px solid rgba(245,158,11,0.5)", color:"#fcd34d", padding:"5px 14px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:600, marginBottom:"1.25rem" }}>
            🇮🇳 INDIA TENDER DISCOVERY PLATFORM
          </div>
          <h1 style={{ fontSize:"clamp(1.8rem,5vw,3.2rem)", fontWeight:800, marginBottom:"1rem", lineHeight:1.2 }}>
            Find Government Tenders<br/><span style={{ color:"#f59e0b" }}>10x Faster</span>
          </h1>
          <p style={{ fontSize:"clamp(0.9rem,2.5vw,1.1rem)", opacity:0.85, marginBottom:"2rem" }}>CPPP, GeM, State portals — all tenders in one place.</p>
          <div style={{ display:"flex", justifyContent:"center", gap:"2.5rem", flexWrap:"wrap" }}>
            <StatCard num={240000} label="Active Tenders" suffix="+" />
            <StatCard num={28} label="States Covered" suffix="" />
            <StatCard num={50000} label="Businesses" suffix="+" />
            <StatCard num={99} label="Uptime %" suffix="%" />
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1200px", margin:"1.5rem auto", padding:"0 1.25rem" }}>
        <div style={{ background:"var(--card,#fff)", border:"1px solid var(--border,#e2e8f0)", borderRadius:"12px", padding:"1.25rem", marginBottom:"1.5rem" }}>
          <input type="text" placeholder="🔍 Search tenders, organizations..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:"100%", padding:"11px 16px", border:"1.5px solid var(--border,#e2e8f0)", borderRadius:"8px", fontSize:"0.95rem", outline:"none", marginBottom:"0.75rem", background:"var(--card,#fff)", color:"var(--text,#0f172a)" }} />
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            <select value={state} onChange={e=>setState(e.target.value)}
              style={{ flex:"1 1 150px", padding:"10px 12px", border:"1.5px solid var(--border,#e2e8f0)", borderRadius:"8px", fontSize:"0.88rem", background:"var(--card,#fff)", color:"var(--text,#0f172a)" }}>
              {states.map(s=><option key={s}>{s}</option>)}
            </select>
            <select value={category} onChange={e=>setCategory(e.target.value)}
              style={{ flex:"1 1 150px", padding:"10px 12px", border:"1.5px solid var(--border,#e2e8f0)", borderRadius:"8px", fontSize:"0.88rem", background:"var(--card,#fff)", color:"var(--text,#0f172a)" }}>
              {categories.map(c=><option key={c}>{c}</option>)}
            </select>
            <Link href="/tenders" style={{ flex:"1 1 120px", padding:"10px 16px", background:"#1a56db", color:"#fff", borderRadius:"8px", fontWeight:700, textDecoration:"none", textAlign:"center", fontSize:"0.88rem" }}>All Tenders →</Link>
          </div>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
          <h2 style={{ fontSize:"1rem", fontWeight:700, color:"var(--text,#0f172a)" }}>{filtered.length} Tenders Found</h2>
          <span style={{ fontSize:"0.82rem", color:"#64748b" }}>Showing {displayed.length} of {filtered.length}</span>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,380px),1fr))", gap:"1rem" }}>
          {loading && page === 1
            ? Array(6).fill(0).map((_,i) => <TenderSkeleton key={i} />)
            : displayed.map(t => <TenderCard key={t.id} tender={t} />)
          }
          {loading && page > 1 && Array(3).fill(0).map((_,i) => <TenderSkeleton key={"m"+i} />)}
        </div>

        {hasMore && !loading && (
          <div style={{ textAlign:"center", marginTop:"2rem" }}>
            <button onClick={loadMore}
              style={{ background:"#fff", border:"2px solid #1a56db", color:"#1a56db", padding:"12px 36px", borderRadius:"10px", fontWeight:700, fontSize:"0.95rem", cursor:"pointer" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#1a56db";e.currentTarget.style.color="#fff"}}
              onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color="#1a56db"}}>
              Load More Tenders ↓
            </button>
            <p style={{ color:"#94a3b8", fontSize:"0.82rem", marginTop:"0.5rem" }}>{filtered.length - displayed.length} more tenders</p>
          </div>
        )}

        <div style={{ background:"linear-gradient(135deg,#1a56db,#7c3aed)", borderRadius:"16px", padding:"2rem", color:"#fff", textAlign:"center", margin:"2rem 0" }}>
          <h2 style={{ fontSize:"1.4rem", fontWeight:800, marginBottom:"0.5rem" }}>Never Miss a Tender Deadline</h2>
          <p style={{ opacity:0.85, marginBottom:"1.5rem", fontSize:"0.9rem" }}>Set up instant alerts and get notified before bidding closes</p>
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/alerts" style={{ background:"#f59e0b", color:"#fff", padding:"11px 24px", borderRadius:"10px", fontWeight:700, textDecoration:"none" }}>🔔 Set Up Alerts</Link>
            <Link href="/pricing" style={{ background:"rgba(255,255,255,0.15)", color:"#fff", padding:"11px 24px", borderRadius:"10px", fontWeight:700, textDecoration:"none", border:"1px solid rgba(255,255,255,0.3)" }}>View Plans</Link>
          </div>
        </div>
      </div>

      <footer style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", fontSize:"0.82rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </footer>
      <MobileBottomNav />
    </div>
  );
}