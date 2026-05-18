"use client";
import Link from "next/link";
import { useState } from "react";
import { useDarkMode } from "@/context/DarkModeContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const { dark, toggle } = useDarkMode();
  const router = useRouter();
  const bg = dark ? "#1e293b" : "#fff";
  const border = dark ? "#334155" : "#e2e8f0";
  const text = dark ? "#f1f5f9" : "#374151";

  function handleSearch(e) {
    if (e.key === "Enter" && searchVal.trim()) {
      router.push("/search?q=" + encodeURIComponent(searchVal.trim()));
      setSearchVal("");
    }
  }

  return (
    <nav style={{ background:bg, borderBottom:"1px solid "+border, position:"sticky", top:0, zIndex:50, transition:"background 0.3s" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 1.25rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px", gap:"1rem" }}>
        <Link href="/" style={{ textDecoration:"none", flexShrink:0 }}>
          <div style={{ background:"#1a56db", color:"#fff", padding:"6px 12px", borderRadius:"8px", fontWeight:800, fontSize:"1.05rem" }}>
            BidTender<span style={{ color:"#f59e0b" }}>Assist</span>
          </div>
        </Link>

        <div style={{ flex:1, maxWidth:"320px" }} className="navbar-search">
          <div style={{ display:"flex", alignItems:"center", background:dark?"#0f172a":"#f8fafc", border:"1.5px solid "+border, borderRadius:"10px", padding:"0 12px", height:"38px" }}>
            <span style={{ color:"#94a3b8", marginRight:"8px", fontSize:"0.9rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search tenders..."
              value={searchVal}
              onChange={e=>setSearchVal(e.target.value)}
              onKeyDown={handleSearch}
              style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:"0.85rem", color:text }}
            />
            {searchVal && (
              <button onClick={()=>setSearchVal("")} style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", padding:"0", fontSize:"0.9rem" }}>✕</button>
            )}
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"0.8rem" }} className="desktop-nav">
          <Link href="/tenders" style={{ color:text, textDecoration:"none", fontWeight:500, fontSize:"0.83rem" }}>Browse</Link>
          <Link href="/filters" style={{ color:text, textDecoration:"none", fontWeight:500, fontSize:"0.83rem" }}>Filters</Link>
          <Link href="/analytics" style={{ color:text, textDecoration:"none", fontWeight:500, fontSize:"0.83rem" }}>Analytics</Link>
          <Link href="/alerts" style={{ color:text, textDecoration:"none", fontWeight:500, fontSize:"0.83rem" }}>🔔</Link>
          <Link href="/saved" style={{ color:text, textDecoration:"none", fontWeight:500, fontSize:"0.83rem" }}>🔖</Link>
          <Link href="/pricing" style={{ color:text, textDecoration:"none", fontWeight:500, fontSize:"0.83rem" }}>Pricing</Link>
          <Link href="/dashboard" style={{ color:text, textDecoration:"none", fontWeight:500, fontSize:"0.83rem" }}>Dashboard</Link>
          <button onClick={toggle}
            style={{ background:dark?"#334155":"#f1f5f9", border:"none", borderRadius:"8px", width:"34px", height:"34px", cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {dark?"☀️":"🌙"}
          </button>
          <Link href="/profile" style={{ width:"34px", height:"34px", borderRadius:"50%", background:"#f59e0b", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"0.85rem", textDecoration:"none", flexShrink:0 }}>RS</Link>
        </div>

        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }} className="hamburger-area">
          <button onClick={toggle} style={{ background:dark?"#334155":"#f1f5f9", border:"none", borderRadius:"8px", width:"34px", height:"34px", cursor:"pointer", fontSize:"1rem", display:"none" }} className="dark-btn">
            {dark?"☀️":"🌙"}
          </button>
          <button onClick={()=>setMenuOpen(!menuOpen)} className="hamburger"
            style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:"4px", flexDirection:"column", gap:"5px" }}>
            <span style={{ display:"block", width:"24px", height:"2px", background:text, transition:"all 0.3s", transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }} />
            <span style={{ display:"block", width:"24px", height:"2px", background:text, opacity:menuOpen?0:1 }} />
            <span style={{ display:"block", width:"24px", height:"2px", background:text, transition:"all 0.3s", transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background:bg, borderTop:"1px solid "+border, padding:"1rem 1.25rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          <div style={{ display:"flex", alignItems:"center", background:dark?"#0f172a":"#f8fafc", border:"1.5px solid "+border, borderRadius:"10px", padding:"0 12px", height:"42px", marginBottom:"0.25rem" }}>
            <span style={{ color:"#94a3b8", marginRight:"8px" }}>🔍</span>
            <input type="text" placeholder="Search tenders..." value={searchVal} onChange={e=>setSearchVal(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&searchVal.trim()){router.push("/search?q="+encodeURIComponent(searchVal.trim()));setMenuOpen(false);setSearchVal("");}}}
              style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:"0.9rem", color:text }} />
          </div>
          {[
            {href:"/tenders",label:"Browse Tenders"},
            {href:"/search",label:"🔍 Search"},
            {href:"/filters",label:"🔬 Advanced Filters"},
            {href:"/analytics",label:"📊 Analytics"},
            {href:"/alerts",label:"🔔 Alerts"},
            {href:"/saved",label:"🔖 Saved Tenders"},
            {href:"/pricing",label:"Pricing"},
            {href:"/how-it-works",label:"How It Works"},
            {href:"/contact",label:"Contact"},
            {href:"/dashboard",label:"Dashboard"},
            {href:"/profile",label:"My Profile"},
          ].map(link => (
            <Link key={link.href} href={link.href} onClick={()=>setMenuOpen(false)}
              style={{ color:text, textDecoration:"none", fontWeight:600, padding:"10px 0", borderBottom:"1px solid "+border, fontSize:"0.95rem" }}>
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={()=>setMenuOpen(false)}
            style={{ background:"#1a56db", color:"#fff", padding:"12px", borderRadius:"8px", textDecoration:"none", fontWeight:700, textAlign:"center", marginTop:"0.5rem" }}>
            Login / Sign Up
          </Link>
        </div>
      )}
      <style>{`
        @media (max-width: 1000px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .dark-btn { display: flex !important; }
        }
        @media (max-width: 600px) {
          .navbar-search { display: none !important; }
        }
      `}</style>
    </nav>
  );
}