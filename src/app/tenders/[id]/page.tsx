"use client";
import { useParams } from "next/navigation";
import { mockTenders } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function formatCrore(val) {
  if (val >= 10000000) return "Rs." + (val/10000000).toFixed(2) + " Cr";
  if (val >= 100000) return "Rs." + (val/100000).toFixed(1) + " L";
  return "Rs." + val.toLocaleString("en-IN");
}

function daysLeft(deadline) {
  const diff = new Date(deadline).getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000*60*60*24)));
}

const categoryColors = {
  construction:"#f59e0b",it:"#3b82f6",healthcare:"#10b981",
  education:"#8b5cf6",defense:"#ef4444",infrastructure:"#f97316",
};

export default function TenderDetailPage() {
  const { id } = useParams();
  const tender = mockTenders.find(t => t.id === id);

  if (!tender) return (
    <div style={{ minHeight:"100vh",background:"#f8fafc" }}>
      <Navbar />
      <div style={{ textAlign:"center",padding:"6rem",color:"#94a3b8" }}>
        <div style={{ fontSize:"3rem" }}>404</div>
        <h2>Tender not found</h2>
        <Link href="/" style={{ color:"#1a56db" }}>Back to Home</Link>
      </div>
    </div>
  );

  const days = daysLeft(tender.deadline);
  const isUrgent = days <= 5;

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc" }}>
      <Navbar />
      <div style={{ maxWidth:"900px",margin:"2rem auto",padding:"0 1.5rem" }}>
        <Link href="/" style={{ color:"#1a56db",textDecoration:"none",fontSize:"0.9rem",fontWeight:600,marginBottom:"1.5rem",display:"inline-block" }}>
          Back to Tenders
        </Link>
        <div style={{ background:"#fff",border:"1px solid #e2e8f0",borderRadius:"16px",padding:"2rem",marginBottom:"1.5rem" }}>
          <div style={{ display:"flex",gap:"0.75rem",marginBottom:"1rem",flexWrap:"wrap" }}>
            <span style={{ background:categoryColors[tender.category]+"20",color:categoryColors[tender.category],padding:"4px 12px",borderRadius:"20px",fontSize:"0.8rem",fontWeight:700,textTransform:"capitalize" }}>
              {tender.category}
            </span>
            {tender.isPremium && <span style={{ background:"#f59e0b",color:"#fff",padding:"4px 12px",borderRadius:"20px",fontSize:"0.8rem",fontWeight:700 }}>PREMIUM</span>}
            <span style={{ background:isUrgent?"#fef2f2":"#f0fdf4",color:isUrgent?"#ef4444":"#10b981",padding:"4px 12px",borderRadius:"20px",fontSize:"0.8rem",fontWeight:700 }}>
              {days} days left
            </span>
          </div>
          <h1 style={{ fontSize:"1.4rem",fontWeight:800,color:"#0f172a",marginBottom:"0.75rem",lineHeight:1.4 }}>{tender.title}</h1>
          <p style={{ color:"#64748b",fontSize:"0.95rem",marginBottom:"1.5rem" }}>{tender.organization} - {tender.state}</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"1rem" }}>
            {[
              {label:"Tender Value",value:formatCrore(tender.value)},
              {label:"EMD Required",value:formatCrore(tender.emd)},
              {label:"Bid Fee",value:formatCrore(tender.bidFee)},
              {label:"Deadline",value:new Date(tender.deadline).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})},
            ].map(s => (
              <div key={s.label} style={{ background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"12px",padding:"1rem" }}>
                <div style={{ fontSize:"0.7rem",color:"#94a3b8",fontWeight:600,textTransform:"uppercase",marginBottom:"4px" }}>{s.label}</div>
                <div style={{ fontWeight:800,color:"#0f172a",fontSize:"1rem" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem" }}>
          <div style={{ background:"#fff",border:"1px solid #e2e8f0",borderRadius:"16px",padding:"1.75rem" }}>
            <h2 style={{ fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:"1rem" }}>Description</h2>
            <p style={{ color:"#374151",lineHeight:1.7,fontSize:"0.9rem" }}>{tender.description}</p>
            <div style={{ marginTop:"1.5rem" }}>
              <div style={{ fontSize:"0.75rem",color:"#94a3b8",fontWeight:600,marginBottom:"8px" }}>TENDER NUMBER</div>
              <div style={{ background:"#f1f5f9",padding:"6px 12px",borderRadius:"6px",fontSize:"0.85rem",color:"#1a56db",fontWeight:700 }}>{tender.tenderNo}</div>
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:"1.25rem" }}>
            <div style={{ background:"#fff",border:"1px solid #e2e8f0",borderRadius:"16px",padding:"1.75rem" }}>
              <h2 style={{ fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:"1rem" }}>Documents</h2>
              <div style={{ display:"flex",flexDirection:"column",gap:"0.6rem" }}>
                {tender.documents.map(doc => (
                  <div key={doc} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"8px" }}>
                    <span style={{ fontSize:"0.85rem",color:"#374151" }}>{doc}</span>
                    <button style={{ background:"#1a56db",color:"#fff",border:"none",padding:"5px 12px",borderRadius:"6px",fontSize:"0.75rem",fontWeight:700,cursor:"pointer" }}>Download</button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)",borderRadius:"16px",padding:"1.75rem",color:"#fff" }}>
              <h2 style={{ fontSize:"1rem",fontWeight:700,marginBottom:"0.5rem" }}>Get Alerts</h2>
              <p style={{ fontSize:"0.85rem",opacity:0.85,marginBottom:"1.25rem" }}>Never miss a deadline.</p>
              <Link href="/login" style={{ display:"block",textAlign:"center",background:"#f59e0b",color:"#fff",padding:"12px",borderRadius:"10px",fontWeight:700,textDecoration:"none" }}>
                Set Up Alerts
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background:"#0f172a",color:"#94a3b8",textAlign:"center",padding:"1.5rem",marginTop:"3rem",fontSize:"0.85rem" }}>
        BidTenderAssist 2026
      </div>
    </div>
  );
}