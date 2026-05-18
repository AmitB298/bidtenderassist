"use client";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Link from "next/link";
import { mockTenders } from "@/lib/mockData";

function BarChart({ data, color = "#1a56db", label }: { data: {name:string,value:number}[], color?: string, label: string }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div>
      <div style={{ fontSize:"0.82rem", fontWeight:700, color:"#64748b", marginBottom:"0.75rem", textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {data.map(d => (
          <div key={d.name} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"110px", fontSize:"0.78rem", color:"#64748b", textAlign:"right", flexShrink:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{d.name}</div>
            <div style={{ flex:1, height:"24px", background:"#f1f5f9", borderRadius:"6px", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${(d.value/max)*100}%`, background:color, borderRadius:"6px", display:"flex", alignItems:"center", paddingLeft:"8px", transition:"width 1s ease", minWidth:"30px" }}>
                <span style={{ fontSize:"0.72rem", color:"#fff", fontWeight:700 }}>{d.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, sub, color }: { icon:string, label:string, value:any, sub:string, color:string }) {
  return (
    <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"14px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", display:"flex", gap:"1rem", alignItems:"flex-start" }}>
      <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:color+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:"1.6rem", fontWeight:900, color:"#0f172a" }}>{value}</div>
        <div style={{ fontSize:"0.85rem", fontWeight:600, color:"#374151", marginTop:"2px" }}>{label}</div>
        <div style={{ fontSize:"0.75rem", color:"#94a3b8", marginTop:"2px" }}>{sub}</div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const categoryCount = {};
  const stateCount = {};
  const monthCount = {};
  let totalValue = 0;
  let urgentCount = 0;

  mockTenders.forEach(t => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    stateCount[t.state] = (stateCount[t.state] || 0) + 1;
    totalValue += t.value;
    const month = new Date(t.deadline).toLocaleString("en-IN", { month: "short" });
    monthCount[month] = (monthCount[month] || 0) + 1;
    const days = Math.ceil((new Date(t.deadline) - new Date()) / 86400000);
    if (days <= 7) urgentCount++;
  });

  const catData = Object.entries(categoryCount).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value })).sort((a,b) => b.value - a.value);
  const stateData = Object.entries(stateCount).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 8);
  const monthData = Object.entries(monthCount).map(([name, value]) => ({ name, value }));

  const avgValue = Math.round(totalValue / mockTenders.length);
  function fmt(v) {
    if (v >= 10000000) return "Rs." + (v/10000000).toFixed(1) + " Cr";
    if (v >= 100000) return "Rs." + (v/100000).toFixed(1) + " L";
    return "Rs." + v.toLocaleString("en-IN");
  }

  const categoryColors = { construction:"#f59e0b", it:"#3b82f6", healthcare:"#10b981", education:"#8b5cf6", defense:"#ef4444", infrastructure:"#f97316" };

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />
      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"2.5rem 1.5rem", color:"#fff" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <h1 style={{ fontSize:"2rem", fontWeight:800, marginBottom:"0.5rem" }}>📊 Tender Analytics</h1>
          <p style={{ opacity:0.85 }}>Live insights from {mockTenders.length} active tenders</p>
        </div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"2rem auto", padding:"0 1.5rem" }}>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
          <StatBox icon="📋" label="Total Active Tenders" value={mockTenders.length} sub="Updated every 30 min" color="#1a56db" />
          <StatBox icon="💰" label="Total Tender Value" value={fmt(totalValue)} sub="Combined value" color="#10b981" />
          <StatBox icon="📈" label="Average Tender Value" value={fmt(avgValue)} sub="Per tender" color="#f59e0b" />
          <StatBox icon="⚠️" label="Closing in 7 Days" value={urgentCount} sub="Act now!" color="#ef4444" />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", marginBottom:"1.5rem" }}>
          <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"1.75rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
            <BarChart data={catData} color="#1a56db" label="Tenders by Category" />
          </div>
          <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"1.75rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
            <BarChart data={stateData} color="#10b981" label="Top States by Tenders" />
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", marginBottom:"1.5rem" }}>
          <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"1.75rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
            <BarChart data={monthData} color="#f59e0b" label="Deadlines by Month" />
          </div>
          <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"1.75rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize:"0.82rem", fontWeight:700, color:"#64748b", marginBottom:"0.75rem", textTransform:"uppercase", letterSpacing:"0.5px" }}>Category Breakdown</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {catData.map(d => {
                const pct = Math.round((d.value / mockTenders.length) * 100);
                const color = categoryColors[d.name.toLowerCase()] || "#64748b";
                return (
                  <div key={d.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:`${color}10`, borderRadius:"10px", border:`1px solid ${color}25` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:color }} />
                      <span style={{ fontWeight:600, color:"#0f172a", fontSize:"0.88rem" }}>{d.name}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <div style={{ width:"80px", height:"6px", background:"#e2e8f0", borderRadius:"3px", overflow:"hidden" }}>
                        <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:"3px" }} />
                      </div>
                      <span style={{ fontSize:"0.82rem", fontWeight:700, color, minWidth:"36px", textAlign:"right" }}>{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ background:"linear-gradient(135deg,#1a56db,#7c3aed)", borderRadius:"16px", padding:"1.75rem", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <h3 style={{ fontWeight:800, fontSize:"1.1rem", marginBottom:"0.4rem" }}>Want deeper insights?</h3>
            <p style={{ opacity:0.85, fontSize:"0.88rem" }}>Pro plan mein competitor tracking aur AI analytics milti hai</p>
          </div>
          <Link href="/pricing" style={{ background:"#f59e0b", color:"#fff", padding:"11px 24px", borderRadius:"10px", fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>Upgrade to Pro</Link>
        </div>
      </div>

      <footer style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", fontSize:"0.82rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </footer>
      <MobileBottomNav />
    </div>
  );
}