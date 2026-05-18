"use client";
import { useSearchParams } from "next/navigation";
import { mockTenders } from "@/lib/mockData";
import { Suspense } from "react";

function PrintContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const tender = id ? mockTenders.find(t => t.id === Number(id)) || mockTenders[0] : mockTenders[0];

  function fmt(v) {
    if (v >= 10000000) return "Rs." + (v/10000000).toFixed(2) + " Crore";
    if (v >= 100000) return "Rs." + (v/100000).toFixed(1) + " Lakh";
    return "Rs." + v.toLocaleString("en-IN");
  }

  return (
    <div style={{ maxWidth:"800px", margin:"0 auto", padding:"2rem", fontFamily:"Arial, sans-serif", color:"#000" }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; }
        }
      `}</style>

      <div className="no-print" style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem", justifyContent:"flex-end" }}>
        <button onClick={() => window.print()} style={{ background:"#1a56db", color:"#fff", border:"none", padding:"10px 24px", borderRadius:"8px", fontWeight:700, cursor:"pointer", fontSize:"0.9rem" }}>🖨️ Print / Save PDF</button>
        <button onClick={() => window.history.back()} style={{ background:"#fff", color:"#374151", border:"1.5px solid #e2e8f0", padding:"10px 24px", borderRadius:"8px", fontWeight:600, cursor:"pointer", fontSize:"0.9rem" }}>← Go Back</button>
      </div>

      <div style={{ borderBottom:"3px solid #1a56db", paddingBottom:"1rem", marginBottom:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:"1.4rem", fontWeight:900, color:"#1a56db" }}>BidTender<span style={{ color:"#f59e0b" }}>Assist</span></div>
          <div style={{ fontSize:"0.78rem", color:"#64748b", marginTop:"2px" }}>India Tender Discovery Platform</div>
        </div>
        <div style={{ textAlign:"right", fontSize:"0.78rem", color:"#64748b" }}>
          <div>Printed: {new Date().toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}</div>
          <div style={{ marginTop:"2px" }}>Source: bidtenderassist.in</div>
        </div>
      </div>

      <h1 style={{ fontSize:"1.2rem", fontWeight:800, color:"#0f172a", marginBottom:"1rem", lineHeight:1.4 }}>{tender.title}</h1>

      <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:"1.5rem", fontSize:"0.88rem" }}>
        <tbody>
          {[
            ["Organization", tender.organization],
            ["State / UT", tender.state],
            ["Category", tender.category.charAt(0).toUpperCase() + tender.category.slice(1)],
            ["Tender Value", fmt(tender.value)],
            ["EMD Amount", fmt(tender.emd)],
            ["Submission Deadline", new Date(tender.deadline).toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" })],
            ["Source Portal", "CPPP / eprocure.gov.in"],
            ["Tender ID", "BTA-2026-" + tender.id.toString().padStart(5, "0")],
          ].map(([k, v]) => (
            <tr key={k} style={{ borderBottom:"1px solid #e2e8f0" }}>
              <td style={{ padding:"10px 12px", fontWeight:700, color:"#374151", width:"35%", background:"#f8fafc" }}>{k}</td>
              <td style={{ padding:"10px 12px", color:"#0f172a" }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginBottom:"1.5rem" }}>
        <h2 style={{ fontSize:"1rem", fontWeight:800, color:"#0f172a", borderBottom:"2px solid #e2e8f0", paddingBottom:"6px", marginBottom:"10px" }}>Important Dates</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", fontSize:"0.85rem" }}>
          {[
            ["Document Download Start", "01 Jan 2026"],
            ["Pre-Bid Meeting", "10 Jan 2026"],
            ["Last Date for Queries", "15 Jan 2026"],
            ["Bid Submission Deadline", new Date(tender.deadline).toLocaleDateString("en-IN")],
          ].map(([k, v]) => (
            <div key={k} style={{ background:"#f8fafc", padding:"10px 12px", borderRadius:"8px", border:"1px solid #e2e8f0" }}>
              <div style={{ color:"#64748b", fontSize:"0.75rem", marginBottom:"3px" }}>{k}</div>
              <div style={{ fontWeight:700, color:"#0f172a" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:"1.5rem" }}>
        <h2 style={{ fontSize:"1rem", fontWeight:800, color:"#0f172a", borderBottom:"2px solid #e2e8f0", paddingBottom:"6px", marginBottom:"10px" }}>Eligibility Criteria</h2>
        <ul style={{ paddingLeft:"1.5rem", fontSize:"0.85rem", color:"#374151", lineHeight:2 }}>
          <li>Registered company / partnership / proprietorship in India</li>
          <li>Min. 3 years experience in {tender.category} sector</li>
          <li>Annual turnover of minimum {fmt(tender.value * 0.4)} in last 3 years</li>
          <li>Valid GST registration and PAN card mandatory</li>
          <li>EMD of {fmt(tender.emd)} to be submitted with bid</li>
        </ul>
      </div>

      <div style={{ marginBottom:"1.5rem" }}>
        <h2 style={{ fontSize:"1rem", fontWeight:800, color:"#0f172a", borderBottom:"2px solid #e2e8f0", paddingBottom:"6px", marginBottom:"10px" }}>How to Apply</h2>
        <ol style={{ paddingLeft:"1.5rem", fontSize:"0.85rem", color:"#374151", lineHeight:2 }}>
          <li>Register on eprocure.gov.in / gem.gov.in</li>
          <li>Download tender document (login required)</li>
          <li>Submit EMD of {fmt(tender.emd)} via NEFT/RTGS</li>
          <li>Upload all required documents before deadline</li>
          <li>Submit technical and financial bid online</li>
        </ol>
      </div>

      <div style={{ borderTop:"2px solid #e2e8f0", paddingTop:"1rem", fontSize:"0.75rem", color:"#94a3b8", display:"flex", justifyContent:"space-between" }}>
        <span>BidTenderAssist — bidtenderassist.in | Disclaimer: Verify details on official portal before bidding</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
}

export default function PrintPage() {
  return (
    <Suspense fallback={<div style={{ padding:"2rem", textAlign:"center" }}>Loading...</div>}>
      <PrintContent />
    </Suspense>
  );
}