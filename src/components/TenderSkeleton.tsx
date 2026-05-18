"use client";

export default function TenderSkeleton() {
  return (
    <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"14px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }
      `}</style>
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1rem" }}>
        <div className="shimmer" style={{ width:"80px", height:"24px" }} />
        <div className="shimmer" style={{ width:"100px", height:"24px" }} />
      </div>
      <div className="shimmer" style={{ width:"100%", height:"20px", marginBottom:"8px" }} />
      <div className="shimmer" style={{ width:"75%", height:"20px", marginBottom:"1rem" }} />
      <div className="shimmer" style={{ width:"60%", height:"16px", marginBottom:"1.5rem" }} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.75rem", marginBottom:"1rem" }}>
        <div className="shimmer" style={{ height:"56px", borderRadius:"10px" }} />
        <div className="shimmer" style={{ height:"56px", borderRadius:"10px" }} />
        <div className="shimmer" style={{ height:"56px", borderRadius:"10px" }} />
      </div>
      <div style={{ display:"flex", gap:"0.75rem" }}>
        <div className="shimmer" style={{ flex:1, height:"38px", borderRadius:"8px" }} />
        <div className="shimmer" style={{ width:"100px", height:"38px", borderRadius:"8px" }} />
      </div>
    </div>
  );
}