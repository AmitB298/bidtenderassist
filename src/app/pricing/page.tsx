"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    color: "#64748b",
    features: ["10 tenders/day", "Basic search & filters", "Email alerts (weekly)", "3 states only", "No document download"],
    cta: "Get Started Free",
    href: "/login",
    popular: false,
  },
  {
    name: "Pro",
    price: 999,
    period: "month",
    color: "#1a56db",
    features: ["Unlimited tenders", "Advanced filters + keywords", "Email & SMS alerts (instant)", "All 28 states", "Document download", "Tender deadline reminders", "Priority support"],
    cta: "Start Pro — ₹999/mo",
    href: "/login",
    popular: true,
  },
  {
    name: "Business",
    price: 2999,
    period: "month",
    color: "#7c3aed",
    features: ["Everything in Pro", "5 team members", "API access", "Custom keyword tracking", "Dedicated account manager", "White-label reports", "GeM & CPPP integration"],
    cta: "Start Business",
    href: "/login",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar />

      <div style={{ background: "linear-gradient(135deg,#1a56db 0%,#1e429f 100%)", padding: "4rem 1.5rem 6rem", textAlign: "center", color: "#fff" }}>
        <div style={{ display: "inline-block", background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.5)", color: "#fcd34d", padding: "6px 16px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem" }}>
          SIMPLE PRICING
        </div>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, marginBottom: "1rem" }}>
          Choose Your Plan
        </h1>
        <p style={{ opacity: 0.85, fontSize: "1.05rem" }}>Start free. Upgrade when you win your first tender.</p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "-3rem auto 4rem", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
        {plans.map(plan => (
          <div key={plan.name} style={{
            background: "#fff", borderRadius: "16px", padding: "2rem",
            border: plan.popular ? `2px solid ${plan.color}` : "1px solid #e2e8f0",
            boxShadow: plan.popular ? "0 8px 40px rgba(26,86,219,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
            position: "relative",
          }}>
            {plan.popular && (
              <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#fff", padding: "4px 20px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                MOST POPULAR
              </div>
            )}
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>{plan.name}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a" }}>
                {plan.price === 0 ? "Free" : `₹${plan.price.toLocaleString("en-IN")}`}
              </span>
              {plan.price > 0 && <span style={{ color: "#64748b", marginBottom: "8px" }}>/{plan.period}</span>}
            </div>
            {plan.price === 0 && <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>No credit card required</p>}
            {plan.price > 0 && <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Billed monthly · Cancel anytime</p>}

            <Link href={plan.href} style={{
              display: "block", textAlign: "center", padding: "12px",
              background: plan.popular ? plan.color : "#f1f5f9",
              color: plan.popular ? "#fff" : "#374151",
              borderRadius: "10px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", marginBottom: "1.5rem",
            }}>
              {plan.cta}
            </Link>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "#374151" }}>
                  <span style={{ color: "#10b981", fontWeight: 700, fontSize: "1rem" }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0f172a", color: "#94a3b8", textAlign: "center", padding: "1.5rem", fontSize: "0.85rem" }}>
        BidTenderAssist © 2026 · All government tenders in one place
      </div>
    </div>
  );
}
