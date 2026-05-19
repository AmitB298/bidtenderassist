"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function TenderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tender, setTender] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("tenders")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (data) setTender(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />
      <div style={{ maxWidth:"800px", margin:"3rem auto", padding:"0 1.5rem", textAlign:"center" }}>
        <div style={{ color:"#64748b", fontSize:"1.1rem" }}>Loading tender details...</div>
      </div>
    </div>
  );

  if (!tender) return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />
      <div style={{ maxWidth:"800px", margin:"3rem auto", padding:"0 1.5rem", textAlign:"center" }}>
        <div style={{ fontSize:"4rem", marginBottom:"1rem" }}>404</div>
        <h1 style={{ fontSize:"1.5rem", fontWeight:700, marginBottom:"0.5rem" }}>Tender not found</h1>
        <p style={{ color:"#64748b", marginBottom:"2rem" }}>This tender may have expired or been removed.</p>
        <button onClick={() => router.push("/")}
          style={{ background:"#1a56db", color:"#fff", padding:"12px 28px", borderRadius:"10px", fontWeight:700, border:"none", cursor:"pointer", fontSize:"1rem" }}>
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const categoryColors: any = {
    construction: "#f59e0b", it: "#3b82f6", healthcare: "#10b981",
    education: "#8b5cf6", defense: "#ef4444", infrastructure: "#06b6d4",
    government: "#6366f1"
  };
  const catColor = categoryColors[tender.category] || "#64748b";

  const deadline = tender.deadline ? new Date(tender.deadline) : null;
  const today = new Date();
  const daysLeft = deadline ? Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2rem 1.5rem", color:"#fff" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <button onClick={() => router.back()}
            style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"none", padding:"8px 16px", borderRadius:"8px", cursor:"pointer", marginBottom:"1rem", fontSize:"0.85rem" }}>
            ← Back
          </button>
          <div style={{ display:"flex", gap:"0.5rem", marginBottom:"0.75rem", flexWrap:"wrap" }}>
            <span style={{ background:catColor, color:"#fff", padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:700, textTransform:"capitalize" }}>
              {tender.category}
            </span>
            <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:600 }}>
              {tender.source || "Government"}
            </span>
            {daysLeft !== null && (
              <span style={{ background: daysLeft <= 7 ? "#ef4444" : daysLeft <= 30 ? "#f59e0b" : "#10b981", color:"#fff", padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:700 }}>
                {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
              </span>
            )}
          </div>
          <h1 style={{ fontSize:"clamp(1.2rem,3vw,1.8rem)", fontWeight:800, lineHeight:1.3, marginBottom:"0.75rem" }}>
            {tender.title}
          </h1>
          <p style={{ opacity:0.85, fontSize:"0.95rem" }}>
            🏢 {tender.organization} &nbsp;|&nbsp; 📍 {tender.state}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:"860px", margin:"2rem auto", padding:"0 1.5rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
          {[
            { label:"Tender Value", value: tender.value ? `₹${Number(tender.value).toLocaleString("en-IN")}` : "N/A" },
            { label:"EMD Amount", value: tender.emd ? `₹${Number(tender.emd).toLocaleString("en-IN")}` : "N/A" },
            { label:"Deadline", value: deadline ? deadline.toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "N/A" },
            { label:"State", value: tender.state || "N/A" },
            { label:"Category", value: tender.category || "N/A" },
            { label:"Source", value: tender.source || "N/A" },
          ].map(item => (
            <div key={item.label} style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1rem", textAlign:"center" }}>
              <div style={{ fontSize:"0.75rem", color:"#64748b", marginBottom:"0.4rem", fontWeight:600 }}>{item.label}</div>
              <div style={{ fontSize:"1rem", fontWeight:800, color:"#0f172a" }}>{item.value}</div>
            </div>
          ))}
        </div>

        {tender.description && (
          <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1.5rem", marginBottom:"1.5rem" }}>
            <h2 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"0.75rem", color:"#0f172a" }}>Description</h2>
            <p style={{ color:"#475569", lineHeight:1.7, fontSize:"0.95rem" }}>{tender.description}</p>
          </div>
        )}

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1.5rem", marginBottom:"1.5rem" }}>
          <h2 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"0.75rem", color:"#0f172a" }}>Tender Details</h2>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <tbody>
              {[
                ["Tender ID", tender.tender_id || tender.id],
                ["Organization", tender.organization],
                ["State/UT", tender.state],
                ["Category", tender.category],
                ["Status", tender.status],
                ["Source Portal", tender.source],
              ].map(([key, val]) => (
                <tr key={key} style={{ borderBottom:"1px solid #f1f5f9" }}>
                  <td style={{ padding:"10px 0", color:"#64748b", fontSize:"0.88rem", fontWeight:600, width:"40%" }}>{key}</td>
                  <td style={{ padding:"10px 0", color:"#0f172a", fontSize:"0.88rem", textTransform:"capitalize" }}>{val || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
          {tender.source_url && (
            <a href={tender.source_url} target="_blank" rel="noopener noreferrer"
              style={{ flex:"1 1 200px", background:"#1a56db", color:"#fff", padding:"14px 24px", borderRadius:"10px", fontWeight:700, textDecoration:"none", textAlign:"center", fontSize:"1rem" }}>
              🔗 Apply on Official Portal
            </a>
          )}
          <button onClick={() => router.push("/")}
            style={{ flex:"1 1 150px", background:"#fff", border:"2px solid #1a56db", color:"#1a56db", padding:"14px 24px", borderRadius:"10px", fontWeight:700, cursor:"pointer", fontSize:"1rem" }}>
            ← Back to Tenders
          </button>
        </div>
      </div>

      <div style={{ height:"4rem" }} />
      <MobileBottomNav />
    </div>
  );
}