"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"80vh", textAlign:"center", padding:"2rem" }}>
        <div style={{ fontSize:"8rem", fontWeight:900, background:"linear-gradient(135deg,#1a56db,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1 }}>404</div>
        <h1 style={{ fontSize:"1.8rem", fontWeight:800, color:"#0f172a", marginTop:"1rem" }}>Page Not Found</h1>
        <p style={{ color:"#64748b", marginTop:"0.75rem", maxWidth:"400px", lineHeight:1.7 }}>
          Yeh page exist nahi karta. Shayad link galat hai ya page hata diya gaya hai.
        </p>
        <div style={{ display:"flex", gap:"1rem", marginTop:"2rem", flexWrap:"wrap", justifyContent:"center" }}>
          <Link href="/" style={{ background:"#1a56db", color:"#fff", padding:"12px 28px", borderRadius:"10px", fontWeight:700, textDecoration:"none" }}>
            🏠 Homepage Par Jao
          </Link>
          <Link href="/tenders" style={{ background:"#fff", color:"#1a56db", border:"2px solid #1a56db", padding:"12px 28px", borderRadius:"10px", fontWeight:700, textDecoration:"none" }}>
            🔍 Tenders Browse Karo
          </Link>
        </div>
        <div style={{ marginTop:"3rem", display:"flex", gap:"1.5rem", flexWrap:"wrap", justifyContent:"center" }}>
          {["/pricing","Pricing","/alerts","Alerts","/contact","Contact","/how-it-works","How It Works"].reduce((acc,_,i,arr) => {
            if(i%2===0) acc.push(<Link key={arr[i]} href={arr[i]} style={{ color:"#1a56db", textDecoration:"none", fontWeight:600, fontSize:"0.9rem" }}>{arr[i+1]}</Link>);
            return acc;
          },[])}
        </div>
      </div>
    </div>
  );
}