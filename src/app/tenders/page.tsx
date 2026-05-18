"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import TenderCard from "@/components/TenderCard";
import { mockTenders, states, categories } from "@/lib/mockData";

export default function TendersPage() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All States");
  const [category, setCategory] = useState("All Categories");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = mockTenders.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.organization.toLowerCase().includes(search.toLowerCase()) ||
        t.tenderNo.toLowerCase().includes(search.toLowerCase());
      const matchState = state === "All States" || t.state === state;
      const matchCat = category === "All Categories" || t.category === category;
      const matchMin = minValue === "" || t.value >= Number(minValue) * 100000;
      const matchMax = maxValue === "" || t.value <= Number(maxValue) * 100000;
      return matchSearch && matchState && matchCat && matchMin && matchMax;
    });
    if (sortBy === "latest") results.sort((a,b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    if (sortBy === "deadline") results.sort((a,b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    if (sortBy === "value_high") results.sort((a,b) => b.value - a.value);
    if (sortBy === "value_low") results.sort((a,b) => a.value - b.value);
    return results;
  }, [search, state, category, minValue, maxValue, sortBy]);

  const inputStyle = { padding:"10px 14px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.9rem", background:"#fff", width:"100%", boxSizing:"border-box" };
  const labelStyle = { fontSize:"0.75rem", fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:"6px" };

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />

      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2.5rem 1.5rem", color:"#fff" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <h1 style={{ fontSize:"2rem", fontWeight:800, marginBottom:"0.5rem" }}>Browse All Tenders</h1>
          <p style={{ opacity:0.85 }}>Search from 2.4 lakh+ active government tenders across India</p>
        </div>
      </div>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"1.5rem" }}>
        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1.5rem", marginBottom:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"1rem" }}>
            <input type="text" placeholder="Search by title, organization, tender no..." value={search}
              onChange={e=>setSearch(e.target.value)}
              style={{ flex:"1 1 300px", padding:"11px 16px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.95rem", outline:"none" }} />
            <button onClick={()=>setShowFilters(!showFilters)} style={{ padding:"11px 20px", border:"1.5px solid #1a56db", borderRadius:"8px", background:showFilters?"#1a56db":"#fff", color:showFilters?"#fff":"#1a56db", fontWeight:700, cursor:"pointer", fontSize:"0.9rem" }}>
              {showFilters ? "Hide Filters" : "Advanced Filters"}
            </button>
          </div>

          {showFilters && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"1rem", paddingTop:"1rem", borderTop:"1px solid #f1f5f9" }}>
              <div>
                <label style={labelStyle}>State</label>
                <select value={state} onChange={e=>setState(e.target.value)} style={inputStyle}>
                  {states.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={category} onChange={e=>setCategory(e.target.value)} style={inputStyle}>
                  {categories.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Min Value (Lakhs)</label>
                <input type="number" placeholder="e.g. 10" value={minValue} onChange={e=>setMinValue(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Max Value (Lakhs)</label>
                <input type="number" placeholder="e.g. 500" value={maxValue} onChange={e=>setMaxValue(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Sort By</label>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={inputStyle}>
                  <option value="latest">Latest First</option>
                  <option value="deadline">Deadline Soon</option>
                  <option value="value_high">Value: High to Low</option>
                  <option value="value_low">Value: Low to High</option>
                </select>
              </div>
              <div style={{ display:"flex", alignItems:"flex-end" }}>
                <button onClick={()=>{ setSearch(""); setState("All States"); setCategory("All Categories"); setMinValue(""); setMaxValue(""); setSortBy("latest"); }}
                  style={{ width:"100%", padding:"10px", border:"1.5px solid #e2e8f0", borderRadius:"8px", background:"#f8fafc", color:"#64748b", fontWeight:600, cursor:"pointer", fontSize:"0.9rem" }}>
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
          <h2 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a" }}>{filtered.length} Tenders Found</h2>
          <div style={{ display:"flex", gap:"0.5rem" }}>
            {["construction","it","healthcare","education"].map(cat => (
              <button key={cat} onClick={()=>setCategory(category===cat?"All Categories":cat)}
                style={{ padding:"5px 12px", border:"1.5px solid #e2e8f0", borderRadius:"20px", fontSize:"0.75rem", fontWeight:600, cursor:"pointer", textTransform:"capitalize",
                  background:category===cat?"#1a56db":"#fff", color:category===cat?"#fff":"#64748b" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))", gap:"1.25rem" }}>
          {filtered.map(tender => <TenderCard key={tender.id} tender={tender} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"4rem", color:"#94a3b8" }}>
            <div style={{ fontSize:"3rem" }}>🔍</div>
            <p style={{ fontSize:"1.1rem", fontWeight:600, marginTop:"1rem" }}>No tenders found</p>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>

      <div style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", marginTop:"3rem", fontSize:"0.85rem" }}>
        BidTenderAssist 2026 - All government tenders in one place
      </div>
    </div>
  );
}