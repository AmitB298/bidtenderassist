"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import TenderCard from "@/components/TenderCard";
import TenderSkeleton from "@/components/TenderSkeleton";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function TendersPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("All States");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");

  const states = ["All States","Uttar Pradesh","Maharashtra","Gujarat","Rajasthan","Madhya Pradesh","Karnataka","Tamil Nadu","West Bengal","Bihar","Punjab","Haryana","Andhra Pradesh","Telangana","Kerala","Odisha","Central"];
  const categories = ["All Categories","construction","it","healthcare","education","defense","infrastructure","government"];

  useEffect(() => {
    fetchTenders();
  }, [state, category, search]);

  async function fetchTenders() {
    setLoading(true);
    let query = supabase.from("tenders").select("*").eq("status","active").order("deadline", { ascending: true }).limit(200);
    if (state !== "All States") query = query.eq("state", state);
    if (category !== "All Categories") query = query.eq("category", category);
    if (search) query = query.ilike("title", "%" + search + "%");
    const { data, error } = await query;
    if (!error && data) setTenders(data);
    setLoading(false);
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />
      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2rem 1.5rem" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <h1 style={{ color:"#fff", fontSize:"2rem", fontWeight:800, marginBottom:"1rem" }}>Live Tenders</h1>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            <input type="text" placeholder="Search tenders..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ flex:1, minWidth:"200px", padding:"10px 16px", borderRadius:"10px", border:"none", fontSize:"0.95rem" }} />
            <select value={state} onChange={e=>setState(e.target.value)}
              style={{ padding:"10px 14px", borderRadius:"10px", border:"none", fontSize:"0.9rem" }}>
              {states.map(s=><option key={s}>{s}</option>)}
            </select>
            <select value={category} onChange={e=>setCategory(e.target.value)}
              style={{ padding:"10px 14px", borderRadius:"10px", border:"none", fontSize:"0.9rem" }}>
              {categories.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:"1100px", margin:"1.5rem auto", padding:"0 1.5rem" }}>
        <p style={{ color:"#64748b", marginBottom:"1rem", fontWeight:600 }}>{loading ? "Loading..." : `${tenders.length} tenders found`}</p>
        {loading ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))", gap:"1rem" }}>
            {Array(6).fill(0).map((_,i)=><TenderSkeleton key={i} />)}
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))", gap:"1rem" }}>
            {tenders.map(t=><TenderCard key={t.id} tender={t} />)}
          </div>
        )}
      </div>
      <MobileBottomNav />
    </div>
  );
}
