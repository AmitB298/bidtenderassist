"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import TenderCard from "@/components/TenderCard";
import TenderSkeleton from "@/components/TenderSkeleton";
import MobileBottomNav from "@/components/MobileBottomNav";
import { mockTenders, states, categories } from "@/lib/mockData";
import Link from "next/link";

const sources = ["All Sources", "CPPP", "GeM", "State Portal", "PSU", "Defence"];
const sortOptions = ["Deadline (Soonest)", "Value (High to Low)", "Value (Low to High)", "Recently Added"];

function RangeSlider({ label, min, max, value, onChange, format }) {
  return (
    <div style={{ marginBottom:"1.25rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
        <span style={{ fontSize:"0.8rem", fontWeight:600, color:"#374151" }}>{label}</span>
        <span style={{ fontSize:"0.8rem", color:"#1a56db", fontWeight:700 }}>{format(value[0])} — {format(value[1])}</span>
      </div>
      <input type="range" min={min} max={max} value={value[1]}
        onChange={e => onChange([value[0], Number(e.target.value)])}
        style={{ width:"100%", accentColor:"#1a56db" }} />
    </div>
  );
}

export default function FiltersPage() {
  const [search, setSearch] = useState("");
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [source, setSource] = useState("All Sources");
  const [sortBy, setSortBy] = useState("Deadline (Soonest)");
  const [valueRange, setValueRange] = useState([0, 50000000]);
  const [emdRange, setEmdRange] = useState([0, 2000000]);
  const [daysLeft, setDaysLeft] = useState(90);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  function toggleState(s) { setSelectedStates(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]); }
  function toggleCat(c) { setSelectedCats(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]); }
  function fmt(v) {
    if (v >= 10000000) return "₹" + (v/10000000).toFixed(1) + "Cr";
    if (v >= 100000) return "₹" + (v/100000).toFixed(0) + "L";
    return "₹" + v.toLocaleString("en-IN");
  }

  const filtered = useMemo(() => {
    let res = mockTenders.filter(t => {
      const ms = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.organization.toLowerCase().includes(search.toLowerCase());
      const mst = selectedStates.length === 0 || selectedStates.includes(t.state);
      const mc = selectedCats.length === 0 || selectedCats.includes(t.category);
      const mv = t.value >= valueRange[0] && t.value <= valueRange[1];
      const me = t.emd >= emdRange[0] && t.emd <= emdRange[1];
      const days = Math.ceil((new Date(t.deadline) - new Date()) / 86400000);
      const md = days <= daysLeft;
      const mp = !premiumOnly || t.isPremium;
      return ms && mst && mc && mv && me && md && mp;
    });
    if (sortBy === "Value (High to Low)") res.sort((a,b) => b.value - a.value);
    else if (sortBy === "Value (Low to High)") res.sort((a,b) => a.value - b.value);
    else if (sortBy === "Deadline (Soonest)") res.sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
    return res;
  }, [search, selectedStates, selectedCats, valueRange, emdRange, daysLeft, premiumOnly, sortBy]);

  const activeFilterCount = selectedStates.length + selectedCats.length + (source !== "All Sources" ? 1 : 0) + (premiumOnly ? 1 : 0);

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />
      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2rem 1.5rem", color:"#fff" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <h1 style={{ fontSize:"1.8rem", fontWeight:800, marginBottom:"0.5rem" }}>🔬 Advanced Search</h1>
          <p style={{ opacity:0.85 }}>Filter tenders by value, EMD, deadline, state and more</p>
        </div>
      </div>

      <div style={{ maxWidth:"1200px", margin:"1.5rem auto", padding:"0 1.5rem", display:"grid", gridTemplateColumns:"280px 1fr", gap:"1.5rem", alignItems:"start" }}>

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", position:"sticky", top:"80px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
            <h2 style={{ fontWeight:800, color:"#0f172a", fontSize:"1rem" }}>Filters {activeFilterCount > 0 && <span style={{ background:"#1a56db", color:"#fff", borderRadius:"20px", padding:"2px 8px", fontSize:"0.72rem", marginLeft:"6px" }}>{activeFilterCount}</span>}</h2>
            <button onClick={() => { setSelectedStates([]); setSelectedCats([]); setSource("All Sources"); setPremiumOnly(false); setValueRange([0,50000000]); setEmdRange([0,2000000]); setDaysLeft(90); }}
              style={{ fontSize:"0.78rem", color:"#ef4444", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>Clear All</button>
          </div>

          <input type="text" placeholder="🔍 Search keywords..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:"100%", padding:"9px 12px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.85rem", outline:"none", marginBottom:"1.25rem", boxSizing:"border-box" }} />

          <RangeSlider label="Tender Value" min={0} max={50000000} value={valueRange} onChange={setValueRange} format={fmt} />
          <RangeSlider label="EMD Amount" min={0} max={2000000} value={emdRange} onChange={setEmdRange} format={fmt} />

          <div style={{ marginBottom:"1.25rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <span style={{ fontSize:"0.8rem", fontWeight:600, color:"#374151" }}>Closing within</span>
              <span style={{ fontSize:"0.8rem", color:"#1a56db", fontWeight:700 }}>{daysLeft} days</span>
            </div>
            <input type="range" min={1} max={90} value={daysLeft} onChange={e=>setDaysLeft(Number(e.target.value))} style={{ width:"100%", accentColor:"#1a56db" }} />
          </div>

          <div style={{ marginBottom:"1.25rem" }}>
            <div style={{ fontSize:"0.8rem", fontWeight:600, color:"#374151", marginBottom:"8px" }}>Source</div>
            <select value={source} onChange={e=>setSource(e.target.value)}
              style={{ width:"100%", padding:"8px 10px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.85rem", background:"#fff" }}>
              {sources.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ marginBottom:"1.25rem" }}>
            <div style={{ fontSize:"0.8rem", fontWeight:600, color:"#374151", marginBottom:"8px" }}>Category</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
              {categories.filter(c => c !== "All Categories").map(c => (
                <button key={c} onClick={() => toggleCat(c)}
                  style={{ padding:"4px 10px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:600, cursor:"pointer", border:"1.5px solid", borderColor:selectedCats.includes(c)?"#1a56db":"#e2e8f0", background:selectedCats.includes(c)?"#eff6ff":"#fff", color:selectedCats.includes(c)?"#1a56db":"#64748b", textTransform:"capitalize" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom:"1.25rem" }}>
            <div style={{ fontSize:"0.8rem", fontWeight:600, color:"#374151", marginBottom:"8px" }}>State</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", maxHeight:"120px", overflowY:"auto" }}>
              {states.filter(s => s !== "All States").map(s => (
                <button key={s} onClick={() => toggleState(s)}
                  style={{ padding:"4px 10px", borderRadius:"20px", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", border:"1.5px solid", borderColor:selectedStates.includes(s)?"#10b981":"#e2e8f0", background:selectedStates.includes(s)?"#f0fdf4":"#fff", color:selectedStates.includes(s)?"#10b981":"#64748b" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", background:"#fef9ec", borderRadius:"8px", border:"1px solid #fcd34d" }}>
            <span style={{ fontSize:"0.85rem", fontWeight:600, color:"#92400e" }}>⭐ Premium Only</span>
            <div onClick={() => setPremiumOnly(!premiumOnly)}
              style={{ width:"40px", height:"22px", borderRadius:"11px", background:premiumOnly?"#f59e0b":"#e2e8f0", position:"relative", cursor:"pointer" }}>
              <div style={{ position:"absolute", top:"3px", left:premiumOnly?"21px":"3px", width:"16px", height:"16px", borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
            </div>
          </div>
        </div>

        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem", flexWrap:"wrap", gap:"0.75rem" }}>
            <span style={{ fontWeight:700, color:"#0f172a" }}>{filtered.length} results found</span>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ padding:"8px 12px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.85rem", background:"#fff", fontWeight:600 }}>
              {sortOptions.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"4rem", background:"#fff", borderRadius:"16px", border:"1px solid #e2e8f0" }}>
              <div style={{ fontSize:"3rem" }}>🔍</div>
              <h3 style={{ fontWeight:700, color:"#0f172a", marginTop:"1rem" }}>No tenders found</h3>
              <p style={{ color:"#64748b", marginTop:"0.5rem" }}>Try adjusting your filters</p>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,360px),1fr))", gap:"1rem" }}>
              {filtered.map(t => <TenderCard key={t.id} tender={t} />)}
            </div>
          )}
        </div>
      </div>

      <footer style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", fontSize:"0.82rem", marginTop:"2rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </footer>
      <MobileBottomNav />
    </div>
  );
}