"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import Fuse from "fuse.js";
import Navbar from "@/components/Navbar";
import TenderCard from "@/components/TenderCard";
import TenderSkeleton from "@/components/TenderSkeleton";
import MobileBottomNav from "@/components/MobileBottomNav";
import { mockTenders, states, categories } from "@/lib/mockData";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const popularSearches = ["Road Construction","IT Software","Solar Energy","Hospital","School Building","Water Supply","Railway","Defense"];
const categoryColors: Record<string,string> = { construction:"#f59e0b", it:"#3b82f6", healthcare:"#10b981", education:"#8b5cf6", defense:"#ef4444", infrastructure:"#f97316" };

const fuse = new Fuse(mockTenders, {
  keys: [
    { name:"title", weight:0.5 },
    { name:"organization", weight:0.3 },
    { name:"category", weight:0.1 },
    { name:"state", weight:0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
});

function SearchContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [inputVal, setInputVal] = useState(params.get("q") || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSugg, setShowSugg] = useState(false);
  const [state, setState] = useState("All States");
  const [category, setCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Relevant");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggRef.current && !suggRef.current.contains(e.target as Node)) setShowSugg(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (inputVal.length < 2) { setSuggestions([]); return; }
    const hits = fuse.search(inputVal, { limit: 6 });
    setSuggestions(hits.map(h => ({ id: h.item.id, title: h.item.title, org: h.item.organization, cat: h.item.category, score: h.score })));
    setShowSugg(true);
  }, [inputVal]);

  useEffect(() => {
    if (!query) { setResults([]); return; }
    setLoading(true);
    setTimeout(() => {
      let res = fuse.search(query).map(h => h.item);
      if (state !== "All States") res = res.filter((t:any) => t.state === state);
      if (category !== "All Categories") res = res.filter((t:any) => t.category === category);
      if (sortBy === "Value High") res.sort((a:any,b:any) => b.value - a.value);
      else if (sortBy === "Value Low") res.sort((a:any,b:any) => a.value - b.value);
      else if (sortBy === "Deadline") res.sort((a:any,b:any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      setResults(res);
      setLoading(false);
    }, 300);
  }, [query, state, category, sortBy]);

  function handleSearch(val?: string) {
    const q = val || inputVal;
    if (!q.trim()) return;
    setQuery(q);
    setShowSugg(false);
    router.push("/search?q=" + encodeURIComponent(q), { scroll: false });
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setShowSugg(false);
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />

      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2.5rem 1.5rem 3rem" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto", textAlign:"center" }}>
          <h1 style={{ color:"#fff", fontSize:"clamp(1.6rem,4vw,2.4rem)", fontWeight:800, marginBottom:"0.5rem" }}>
            Search Government Tenders
          </h1>
          <p style={{ color:"rgba(255,255,255,0.8)", marginBottom:"1.5rem", fontSize:"0.95rem" }}>
            Smart search — typo bhi handle karta hai
          </p>

          <div ref={suggRef} style={{ position:"relative" }}>
            <div style={{ display:"flex", background:"#fff", borderRadius:"14px", boxShadow:"0 8px 32px rgba(0,0,0,0.15)" }}>
              <div style={{ display:"flex", alignItems:"center", paddingLeft:"16px", color:"#94a3b8", fontSize:"1.2rem", flexShrink:0 }}>🔍</div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tenders, departments, keywords..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKey}
                onFocus={() => inputVal.length >= 2 && setShowSugg(true)}
                style={{ flex:1, padding:"16px 12px", border:"none", outline:"none", fontSize:"1rem", background:"transparent", color:"#0f172a" }}
                autoFocus
              />
              {inputVal && (
                <button onClick={() => { setInputVal(""); setQuery(""); setSuggestions([]); inputRef.current?.focus(); }}
                  style={{ background:"none", border:"none", padding:"0 8px", cursor:"pointer", color:"#94a3b8", fontSize:"1.2rem" }}>✕</button>
              )}
              <button onClick={() => handleSearch()}
                style={{ background:"#1a56db", color:"#fff", border:"none", padding:"0 24px", fontWeight:700, fontSize:"0.95rem", cursor:"pointer", borderRadius:"0 14px 14px 0", whiteSpace:"nowrap" }}>
                Search
              </button>
            </div>

            {showSugg && suggestions.length > 0 && (
              <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:"#fff", borderRadius:"12px", boxShadow:"0 8px 32px rgba(0,0,0,0.15)", zIndex:100, overflow:"hidden" }}>
                <div style={{ padding:"8px 14px", fontSize:"0.72rem", color:"#94a3b8", fontWeight:700, textTransform:"uppercase", borderBottom:"1px solid #f1f5f9" }}>Smart suggestions</div>
                {suggestions.map(s => (
                  <div key={s.id} onClick={() => { setInputVal(s.title); handleSearch(s.title); }}
                    style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 14px", cursor:"pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background="#f8fafc")}
                    onMouseLeave={e => (e.currentTarget.style.background="#fff")}>
                    <span style={{ fontSize:"1rem" }}>📄</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:600, color:"#0f172a", fontSize:"0.88rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.title}</div>
                      <div style={{ fontSize:"0.75rem", color:"#94a3b8" }}>{s.org}</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                      {s.score < 0.1 && <span style={{ background:"#dcfce7", color:"#166534", padding:"2px 6px", borderRadius:"10px", fontSize:"0.68rem", fontWeight:700 }}>Best</span>}
                      <span style={{ background:(categoryColors[s.cat]||"#64748b")+"20", color:categoryColors[s.cat]||"#64748b", padding:"2px 8px", borderRadius:"20px", fontSize:"0.7rem", fontWeight:700, textTransform:"capitalize" }}>{s.cat}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", justifyContent:"center", marginTop:"1rem" }}>
            <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.8rem", alignSelf:"center" }}>Popular:</span>
            {popularSearches.map(s => (
              <button key={s} onClick={() => { setInputVal(s); handleSearch(s); }}
                style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)", padding:"4px 12px", borderRadius:"20px", fontSize:"0.78rem", cursor:"pointer", fontWeight:500 }}
                onMouseEnter={e => (e.currentTarget.style.background="rgba(255,255,255,0.25)")}
                onMouseLeave={e => (e.currentTarget.style.background="rgba(255,255,255,0.15)")}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"1.5rem auto", padding:"0 1.5rem" }}>
        {query && (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem", flexWrap:"wrap", gap:"0.75rem" }}>
            <div>
              <span style={{ fontWeight:700, color:"#0f172a" }}>{results.length} results for </span>
              <span style={{ color:"#1a56db", fontWeight:800 }}>"{query}"</span>
              {results.length > 0 && <span style={{ color:"#94a3b8", fontSize:"0.82rem", marginLeft:"8px" }}>— Fuse.js smart search</span>}
            </div>
            <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
              <select value={state} onChange={e=>setState(e.target.value)}
                style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.82rem", background:"#fff" }}>
                {states.map((s:string)=><option key={s}>{s}</option>)}
              </select>
              <select value={category} onChange={e=>setCategory(e.target.value)}
                style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.82rem", background:"#fff" }}>
                {categories.map((c:string)=><option key={c}>{c}</option>)}
              </select>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                style={{ padding:"7px 10px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.82rem", background:"#fff" }}>
                {["Relevant","Value High","Value Low","Deadline"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}

        {!query && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
            {categories.filter((c:string)=>c!=="All Categories").map((c:string) => {
              const count = mockTenders.filter((t:any)=>t.category===c).length;
              const color = categoryColors[c] || "#64748b";
              return (
                <div key={c} onClick={() => { setInputVal(c); handleSearch(c); }}
                  style={{ background:"#fff", border:"2px solid "+color+"25", borderRadius:"14px", padding:"1.25rem", textAlign:"center", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=color;(e.currentTarget as HTMLDivElement).style.transform="translateY(-2px)"}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=color+"25";(e.currentTarget as HTMLDivElement).style.transform="none"}}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:color+"15", margin:"0 auto 0.75rem", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem" }}>
                    {c==="construction"?"🏗️":c==="it"?"💻":c==="healthcare"?"🏥":c==="education"?"🎓":c==="defense"?"🛡️":"🔧"}
                  </div>
                  <div style={{ fontWeight:700, color:"#0f172a", fontSize:"0.88rem", textTransform:"capitalize" }}>{c}</div>
                  <div style={{ fontSize:"0.75rem", color, fontWeight:600, marginTop:"3px" }}>{count} tenders</div>
                </div>
              );
            })}
          </div>
        )}

        {loading ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,380px),1fr))", gap:"1rem" }}>
            {Array(6).fill(0).map((_,i) => <TenderSkeleton key={i} />)}
          </div>
        ) : query && results.length === 0 ? (
          <div style={{ textAlign:"center", padding:"4rem", background:"#fff", borderRadius:"16px", border:"1px solid #e2e8f0" }}>
            <div style={{ fontSize:"3rem" }}>🔍</div>
            <h3 style={{ fontWeight:700, color:"#0f172a", marginTop:"1rem" }}>No results for "{query}"</h3>
            <p style={{ color:"#64748b", marginTop:"0.5rem" }}>Try different keywords ya popular searches try karo</p>
            <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", marginTop:"1.5rem", flexWrap:"wrap" }}>
              {popularSearches.slice(0,4).map(s=>(
                <button key={s} onClick={()=>{setInputVal(s);handleSearch(s);}}
                  style={{ background:"#eff6ff", color:"#1a56db", border:"1px solid #bfdbfe", padding:"7px 14px", borderRadius:"8px", fontWeight:600, cursor:"pointer", fontSize:"0.85rem" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : query ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,380px),1fr))", gap:"1rem" }}>
            {results.map((t:any) => <TenderCard key={t.id} tender={t} />)}
          </div>
        ) : (
          <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"2rem", textAlign:"center" }}>
            <div style={{ fontSize:"2rem", marginBottom:"0.75rem" }}>🔥</div>
            <h3 style={{ fontWeight:700, color:"#0f172a", marginBottom:"0.5rem" }}>Recent Tenders</h3>
            <p style={{ color:"#64748b", marginBottom:"1.5rem", fontSize:"0.88rem" }}>Type karo ya upar category choose karo</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,380px),1fr))", gap:"1rem", textAlign:"left" }}>
              {mockTenders.slice(0,3).map((t:any) => <TenderCard key={t.id} tender={t} />)}
            </div>
            <Link href="/tenders" style={{ display:"inline-block", marginTop:"1.5rem", background:"#1a56db", color:"#fff", padding:"11px 28px", borderRadius:"10px", fontWeight:700, textDecoration:"none" }}>
              View All Tenders
            </Link>
          </div>
        )}
      </div>

      <footer style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", fontSize:"0.82rem", marginTop:"2rem" }}>
        BidTenderAssist © 2026 · Powered by Fuse.js smart search
      </footer>
      <MobileBottomNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding:"4rem", textAlign:"center", color:"#64748b" }}>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}