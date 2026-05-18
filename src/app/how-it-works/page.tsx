"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const steps = [
  { num:"01", icon:"🔍", title:"Search Tenders", desc:"Search from 2.4 lakh+ active tenders across CPPP, GeM, and all 28 state portals — in one place. Filter by category, state, value, and deadline.", color:"#1a56db" },
  { num:"02", icon:"🔔", title:"Set Up Alerts", desc:"Enter your keywords, categories, and states. BidTenderAssist monitors all portals 24/7 and sends you instant email or WhatsApp notifications when a matching tender is published.", color:"#f59e0b" },
  { num:"03", icon:"📄", title:"Download Documents", desc:"Access bid documents, corrigendum, and all annexures directly. No more logging into 10 different government portals — everything is in one dashboard.", color:"#10b981" },
  { num:"04", icon:"📬", title:"Submit Your Bid", desc:"Track deadlines, EMD requirements, and submission portals. Get reminders 7 days and 1 day before deadline so you never miss a bid.", color:"#8b5cf6" },
];

const faqs = [
  { q:"Is BidTenderAssist free to use?", a:"Yes! Our Free plan gives you 10 tender searches per day, basic filters, and weekly email alerts. Upgrade to Pro for unlimited access, instant alerts, and document downloads." },
  { q:"Where does the tender data come from?", a:"We aggregate tenders from CPPP (Central Public Procurement Portal), GeM (Government e-Marketplace), and all 28 state government portals. Data is updated every 30 minutes." },
  { q:"How fast are the alerts?", a:"Free plan users get daily digest emails. Pro plan users get instant alerts within 5 minutes of a tender being published — via email, SMS, or WhatsApp." },
  { q:"Can I track tenders from specific departments?", a:"Yes! Pro and Business plan users can set up keyword tracking for specific departments, ministry names, or project types." },
  { q:"Is my data secure?", a:"Absolutely. We use industry-standard encryption and never sell your data to third parties. Your alert preferences and saved tenders are private to your account." },
];

export default function HowItWorksPage() {
  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />

      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"4rem 1.5rem", textAlign:"center", color:"#fff" }}>
        <h1 style={{ fontSize:"clamp(1.8rem,5vw,3rem)", fontWeight:800, marginBottom:"1rem" }}>How BidTenderAssist Works</h1>
        <p style={{ opacity:0.85, fontSize:"1.05rem", maxWidth:"600px", margin:"0 auto" }}>
          From finding tenders to submitting bids — we simplify every step of the government procurement process.
        </p>
      </div>

      <div style={{ maxWidth:"900px", margin:"4rem auto", padding:"0 1.5rem" }}>

        <div style={{ display:"flex", flexDirection:"column", gap:"2.5rem" }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display:"flex", gap:"2rem", alignItems:"flex-start", flexWrap:i%2===0?"wrap":"wrap-reverse" }}>
              <div style={{ flexShrink:0, width:"100px", height:"100px", borderRadius:"20px", background:step.color+"15", border:"2px solid "+step.color+"30", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"4px" }}>
                <span style={{ fontSize:"2rem" }}>{step.icon}</span>
                <span style={{ fontSize:"0.75rem", fontWeight:800, color:step.color }}>{step.num}</span>
              </div>
              <div style={{ flex:1, minWidth:"200px" }}>
                <h3 style={{ fontSize:"1.3rem", fontWeight:800, color:"#0f172a", marginBottom:"0.75rem" }}>{step.title}</h3>
                <p style={{ color:"#64748b", lineHeight:1.8, fontSize:"0.95rem" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background:"linear-gradient(135deg,#1a56db,#7c3aed)", borderRadius:"20px", padding:"3rem", textAlign:"center", color:"#fff", margin:"4rem 0" }}>
          <h2 style={{ fontSize:"1.6rem", fontWeight:800, marginBottom:"1rem" }}>Ready to win more tenders?</h2>
          <p style={{ opacity:0.85, marginBottom:"2rem" }}>Join 50,000+ businesses already using BidTenderAssist</p>
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/login" style={{ background:"#f59e0b", color:"#fff", padding:"13px 28px", borderRadius:"12px", fontWeight:700, textDecoration:"none", fontSize:"1rem" }}>Start Free Today</Link>
            <Link href="/pricing" style={{ background:"rgba(255,255,255,0.15)", color:"#fff", padding:"13px 28px", borderRadius:"12px", fontWeight:700, textDecoration:"none", border:"1px solid rgba(255,255,255,0.3)", fontSize:"1rem" }}>View Pricing</Link>
          </div>
        </div>

        <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#0f172a", marginBottom:"2rem", textAlign:"center" }}>Frequently Asked Questions</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {faqs.map(faq => (
            <div key={faq.q} style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#0f172a", marginBottom:"0.6rem" }}>❓ {faq.q}</h3>
              <p style={{ color:"#64748b", lineHeight:1.7, fontSize:"0.9rem" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", fontSize:"0.82rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </footer>
    </div>
  );
}