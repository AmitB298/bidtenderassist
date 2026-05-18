"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href:"/", icon:"🏠", label:"Home" },
  { href:"/tenders", icon:"🔍", label:"Browse" },
  { href:"/alerts", icon:"🔔", label:"Alerts" },
  { href:"/saved", icon:"🔖", label:"Saved" },
  { href:"/profile", icon:"👤", label:"Profile" },
];

export default function MobileBottomNav() {
  const path = usePathname();
  return (
    <>
      <div style={{ height:"70px" }} className="mobile-spacer" />
      <nav className="mobile-bottom-nav" style={{ position:"fixed", bottom:0, left:0, right:0, background:"var(--card,#fff)", borderTop:"1px solid var(--border,#e2e8f0)", display:"none", justifyContent:"space-around", alignItems:"center", height:"64px", zIndex:100 }}>
        {navItems.map(item => {
          const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", textDecoration:"none", padding:"8px 10px", borderRadius:"10px", background:active?"#eff6ff":"transparent", minWidth:"52px" }}>
              <span style={{ fontSize:"1.2rem" }}>{item.icon}</span>
              <span style={{ fontSize:"0.62rem", fontWeight:active?700:500, color:active?"#1a56db":"#94a3b8" }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav { display: flex !important; }
          .mobile-spacer { display: block; }
        }
        @media (min-width: 769px) {
          .mobile-spacer { display: none; }
        }
      `}</style>
    </>
  );
}