"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function handleSubmit() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  }

  const inputStyle = { width:"100%", padding:"11px 14px", border:"1.5px solid #e2e8f0", borderRadius:"8px", fontSize:"0.9rem", outline:"none", boxSizing:"border-box", background:"#fff" };
  const labelStyle = { fontSize:"0.78rem", fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:"6px" };

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc" }}>
      <Navbar />

      <div style={{ background:"linear-gradient(135deg,#1a56db,#1e429f)", padding:"3rem 1.5rem", textAlign:"center", color:"#fff" }}>
        <h1 style={{ fontSize:"2rem", fontWeight:800, marginBottom:"0.5rem" }}>Contact Us</h1>
        <p style={{ opacity:0.85 }}>We typically reply within 2 business hours</p>
      </div>

      <div style={{ maxWidth:"1000px", margin:"2.5rem auto", padding:"0 1.5rem", display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"2rem", alignItems:"start" }}>

        <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
          {[
            { icon:"📧", title:"Email Support", val:"support@bidtenderassist.in", sub:"For account and billing queries" },
            { icon:"📞", title:"Phone Support", val:"+91 98765 43210", sub:"Mon-Sat, 9am to 6pm IST" },
            { icon:"💬", title:"WhatsApp", val:"+91 98765 43210", sub:"Quick replies on WhatsApp" },
            { icon:"🏢", title:"Office", val:"New Delhi, India", sub:"By appointment only" },
          ].map(item => (
            <div key={item.title} style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1.25rem", display:"flex", gap:"1rem", alignItems:"flex-start", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
              <span style={{ fontSize:"1.5rem", flexShrink:0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight:700, color:"#0f172a", fontSize:"0.9rem" }}>{item.title}</div>
                <div style={{ fontWeight:600, color:"#1a56db", fontSize:"0.88rem", marginTop:"3px" }}>{item.val}</div>
                <div style={{ fontSize:"0.78rem", color:"#94a3b8", marginTop:"2px" }}>{item.sub}</div>
              </div>
            </div>
          ))}

          <div style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:"12px", padding:"1.25rem", color:"#fff" }}>
            <div style={{ fontWeight:800, fontSize:"1rem" }}>Need urgent help?</div>
            <div style={{ fontSize:"0.85rem", opacity:0.9, marginTop:"4px" }}>Pro users get priority support with 30-minute response time.</div>
          </div>
        </div>

        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"2rem", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
              <div style={{ fontSize:"3rem" }}>✅</div>
              <h2 style={{ fontWeight:800, color:"#0f172a", marginTop:"1rem" }}>Message Sent!</h2>
              <p style={{ color:"#64748b", marginTop:"0.5rem" }}>We will get back to you within 2 business hours.</p>
              <button onClick={()=>setSent(false)} style={{ marginTop:"1.5rem", background:"#1a56db", color:"#fff", border:"none", padding:"11px 24px", borderRadius:"10px", fontWeight:700, cursor:"pointer" }}>
                Send Another
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize:"1.1rem", fontWeight:700, color:"#0f172a", marginBottom:"1.5rem" }}>Send us a message</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Rahul Sharma" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@company.com" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Phone (optional)</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
                    <option value="">Select a topic...</option>
                    <option>Account / Login Issue</option>
                    <option>Billing / Payment</option>
                    <option>Missing Tender Data</option>
                    <option>Alert Not Working</option>
                    <option>Feature Request</option>
                    <option>Partnership / API Access</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your issue or query in detail..." rows={5}
                    style={{ ...inputStyle, resize:"vertical", fontFamily:"inherit" }} />
                </div>
                <button onClick={handleSubmit} disabled={loading} style={{ background:loading?"#94a3b8":"#1a56db", color:"#fff", border:"none", padding:"13px", borderRadius:"10px", fontWeight:700, cursor:loading?"not-allowed":"pointer", fontSize:"1rem" }}>
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <footer style={{ background:"#0f172a", color:"#94a3b8", textAlign:"center", padding:"1.5rem", fontSize:"0.82rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </footer>
    </div>
  );
}