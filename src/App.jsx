import { useState, useEffect, useRef } from "react";

const COLORS = {
  saffron: "#FF6B00",
  saffronLight: "#FF8C33",
  saffronDark: "#CC5500",
  navy: "#0A1628",
  navyMid: "#142240",
  navyLight: "#1E3A5F",
  gold: "#D4A017",
  goldLight: "#F0C040",
  cream: "#FFF8EE",
  jade: "#1A7A4A",
  jadeLight: "#28A865",
  red: "#C41E3A",
  white: "#FFFFFF",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray400: "#9CA3AF",
  gray600: "#4B5563",
  gray800: "#1F2937",
};

const HERO_PROFILES = [
  {
    id: 1,
    name: "Subedar Rajan Thapa",
    rank: "Subedar Major",
    regiment: "11 Gorkha Rifles",
    state: "Uttarakhand",
    martyred: "2023",
    operation: "Operation Snow Leopard, Siachen",
    family: "Wife Kamala Thapa, 2 daughters (ages 8 & 12)",
    urgency: "high",
    needs: ["Education", "Medical"],
    raised: 284000,
    goal: 500000,
    verified: true,
    avatar: "RT",
    color: "#0A1628",
    story: "Gave life securing the world's highest battlefield. His daughters dream of becoming doctors.",
    donorCount: 1247,
  },
  {
    id: 2,
    name: "Sepoy Arjun Nair",
    rank: "Sepoy",
    regiment: "Kerala Regiment",
    state: "Kerala",
    martyred: "2024",
    operation: "Counter-insurgency, Kashmir Valley",
    family: "Parents, Wife Priya Nair, infant son",
    urgency: "critical",
    needs: ["Emergency Relief", "Monthly Ration", "Medical"],
    raised: 156000,
    goal: 400000,
    verified: true,
    avatar: "AN",
    color: "#1A7A4A",
    story: "Married just 6 months before the supreme sacrifice. His son will never know his hero father.",
    donorCount: 892,
  },
  {
    id: 3,
    name: "Flt Lt Meena Rawat",
    rank: "Flight Lieutenant",
    regiment: "Indian Air Force",
    state: "Rajasthan",
    martyred: "2022",
    operation: "Humanitarian mission, Arunachal Pradesh",
    family: "Husband (retired Naib Subedar), elderly parents",
    urgency: "medium",
    needs: ["Pension Assistance", "Medical"],
    raised: 412000,
    goal: 600000,
    verified: true,
    avatar: "MR",
    color: "#CC5500",
    story: "India's first woman combat pilot from a small village. Her sacrifice inspired thousands of girls.",
    donorCount: 2134,
  },
  {
    id: 4,
    name: "Havildar Vikram Singh",
    rank: "Havildar",
    regiment: "Rajputana Rifles",
    state: "Rajasthan",
    martyred: "2023",
    operation: "Line of Actual Control, Ladakh",
    family: "Wife, 3 children (ages 5, 9, 14)",
    urgency: "high",
    needs: ["Education", "Monthly Ration"],
    raised: 198000,
    goal: 350000,
    verified: true,
    avatar: "VS",
    color: "#C41E3A",
    story: "First from his village to join the Army. His eldest son is now preparing for the NDA.",
    donorCount: 743,
  },
  {
    id: 5,
    name: "Naik Gurpreet Sandhu",
    rank: "Naik",
    regiment: "Punjab Regiment",
    state: "Punjab",
    martyred: "2024",
    operation: "Anti-terrorist operation, J&K",
    family: "Mother, Wife Harleen, twin daughters",
    urgency: "critical",
    needs: ["Emergency Relief", "Education", "Medical"],
    raised: 87000,
    goal: 450000,
    verified: true,
    avatar: "GS",
    color: "#142240",
    story: "Neutralized 3 terrorists before falling. His twin daughters were just 2 years old.",
    donorCount: 421,
  },
  {
    id: 6,
    name: "Lt Cmdr Ananya Krishnan",
    rank: "Lieutenant Commander",
    regiment: "Indian Navy",
    state: "Tamil Nadu",
    martyred: "2023",
    operation: "Anti-piracy mission, Arabian Sea",
    family: "Husband, son (age 7), elderly father",
    urgency: "medium",
    needs: ["Education", "Pension Assistance"],
    raised: 356000,
    goal: 500000,
    verified: true,
    avatar: "AK",
    color: "#1E3A5F",
    story: "Naval officer who gave her life protecting merchant vessels. A pioneer from Chennai.",
    donorCount: 1689,
  },
];

const STATES_DATA = [
  { state: "Jammu & Kashmir", families: 342, amount: 4820000, color: "#FF6B00" },
  { state: "Uttarakhand", families: 287, amount: 3940000, color: "#D4A017" },
  { state: "Rajasthan", families: 256, amount: 3210000, color: "#1A7A4A" },
  { state: "Punjab", families: 198, amount: 2780000, color: "#0A1628" },
  { state: "Himachal Pradesh", families: 165, amount: 2340000, color: "#C41E3A" },
  { state: "Maharashtra", families: 143, amount: 1980000, color: "#1E3A5F" },
  { state: "Tamil Nadu", families: 112, amount: 1650000, color: "#FF6B00" },
  { state: "Kerala", families: 98, amount: 1420000, color: "#1A7A4A" },
];

const LIVE_DONATIONS = [
  { name: "Rahul M.", city: "Mumbai", amount: 5000, family: "Subedar Rajan Thapa", time: "2 min ago" },
  { name: "Priya S.", city: "Bengaluru", amount: 2500, family: "Naik Gurpreet Sandhu", time: "4 min ago" },
  { name: "Anonymous", city: "Delhi", amount: 10000, family: "Flt Lt Meena Rawat", time: "7 min ago" },
  { name: "TCS Foundation", city: "Pune", amount: 100000, family: "All Families", time: "12 min ago" },
  { name: "Arun K.", city: "Chennai", amount: 1000, family: "Lt Cmdr Ananya Krishnan", time: "15 min ago" },
  { name: "Kavitha R.", city: "Hyderabad", amount: 3000, family: "Havildar Vikram Singh", time: "18 min ago" },
];

const NGOS = [
  { name: "Sainik Welfare Foundation", type: "Legal & Pension", verified: true, families: 142, logo: "SW" },
  { name: "Veer Nari Shakti", type: "Women & Children", verified: true, families: 89, logo: "VN" },
  { name: "Shaheed Parivar Trust", type: "Education", verified: true, families: 203, logo: "SP" },
  { name: "Armed Forces Aid Society", type: "Medical", verified: true, families: 167, logo: "AF" },
];

const MONTHLY_DATA = [
  { month: "Jan", donations: 1240000, families: 42 },
  { month: "Feb", donations: 1580000, families: 58 },
  { month: "Mar", donations: 2100000, families: 71 },
  { month: "Apr", donations: 1890000, families: 63 },
  { month: "May", donations: 2450000, families: 89 },
  { month: "Jun", donations: 2780000, families: 94 },
  { month: "Jul", donations: 3200000, families: 112 },
  { month: "Aug", donations: 2950000, families: 98 },
  { month: "Sep", donations: 3450000, families: 127 },
  { month: "Oct", donations: 3890000, families: 143 },
  { month: "Nov", donations: 4200000, families: 156 },
  { month: "Dec", donations: 4780000, families: 168 },
];

function formatINR(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

function ProgressBar({ value, max, color = COLORS.saffron }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: "#E5E7EB", borderRadius: 99, height: 8, overflow: "hidden" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          borderRadius: 99,
          transition: "width 1s ease",
        }}
      />
    </div>
  );
}

function UrgencyBadge({ level }) {
  const cfg = {
    critical: { bg: "#FEE2E2", color: "#991B1B", label: "🚨 CRITICAL" },
    high: { bg: "#FEF3C7", color: "#92400E", label: "⚠️ HIGH" },
    medium: { bg: "#ECFDF5", color: "#065F46", label: "✅ STABLE" },
  };
  const c = cfg[level] || cfg.medium;
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        padding: "2px 10px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.05em",
      }}
    >
      {c.label}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span
      style={{
        background: "#ECFDF5",
        color: "#065F46",
        padding: "2px 8px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <span style={{ fontSize: 10 }}>✓</span> VERIFIED
    </span>
  );
}

function Avatar({ initials, color = COLORS.navy, size = 48 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.white,
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        fontSize: size * 0.33,
        flexShrink: 0,
        border: `2px solid ${COLORS.gold}`,
      }}
    >
      {initials}
    </div>
  );
}

function HeroCard({ profile, onDonate }) {
  const [hovered, setHovered] = useState(false);
  const pct = Math.round((profile.raised / profile.goal) * 100);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.white,
        borderRadius: 16,
        overflow: "hidden",
        border: `1.5px solid ${hovered ? COLORS.saffron : COLORS.gray200}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(255,107,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ background: `linear-gradient(135deg, ${profile.color} 0%, ${profile.color}dd 100%)`, padding: "20px 20px 16px", position: "relative" }}>
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <UrgencyBadge level={profile.urgency} />
          {profile.verified && <VerifiedBadge />}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar initials={profile.avatar} color="rgba(255,255,255,0.2)" size={52} />
          <div>
            <div style={{ color: COLORS.white, fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17 }}>{profile.name}</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>{profile.rank} • {profile.regiment}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, marginTop: 2 }}>📍 {profile.state}</div>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(0,0,0,0.2)", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>
          "{profile.story}"
        </div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ fontSize: 12, color: COLORS.gray600, marginBottom: 6 }}>
          🎖 {profile.operation}
        </div>
        <div style={{ fontSize: 12, color: COLORS.gray600, marginBottom: 12 }}>
          👨‍👩‍👧 {profile.family}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {profile.needs.map((n) => (
            <span key={n} style={{ background: "#FFF3E0", color: COLORS.saffronDark, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>
              {n}
            </span>
          ))}
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: COLORS.gray600 }}>{formatINR(profile.raised)} raised</span>
            <span style={{ color: COLORS.saffron, fontWeight: 700 }}>{pct}%</span>
          </div>
          <ProgressBar value={profile.raised} max={profile.goal} color={COLORS.saffron} />
          <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 4 }}>Goal: {formatINR(profile.goal)} • {profile.donorCount.toLocaleString()} donors</div>
        </div>
        <button
          onClick={() => onDonate(profile)}
          style={{
            width: "100%",
            padding: "10px",
            background: `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})`,
            color: COLORS.white,
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            marginTop: 4,
            transition: "opacity 0.2s",
          }}
        >
          Donate Now ❤️
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, accent = COLORS.saffron }) {
  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: 16,
        padding: "20px 24px",
        border: `1.5px solid ${COLORS.gray100}`,
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.navy, fontFamily: "'Playfair Display', serif" }}>{value}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray600, marginTop: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function DonationModal({ profile, onClose }) {
  const [amount, setAmount] = useState(1000);
  const [category, setCategory] = useState("Direct Donation");
  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [step, setStep] = useState(1);
  const presets = [500, 1000, 2500, 5000, 10000, 25000];
  const categories = ["Direct Donation", "Education Fund", "Medical Support", "Monthly Ration", "Emergency Relief"];

  if (step === 2) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: COLORS.white, borderRadius: 20, padding: 40, maxWidth: 440, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>
            Jai Hind! Thank You!
          </div>
          <div style={{ color: COLORS.gray600, fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
            Your donation of <strong style={{ color: COLORS.saffron }}>₹{amount.toLocaleString()}</strong> for{" "}
            <strong>{profile?.name || "All Families"}</strong> has been processed.
          </div>
          <div style={{ background: COLORS.gray50, borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, color: COLORS.gray600 }}>
            Transaction ID: VRS-{Date.now().toString().slice(-8)}<br />
            Receipt will be emailed within 24 hrs<br />
            80G Tax Exemption applicable
          </div>
          <button onClick={onClose} style={{ background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: COLORS.white, borderRadius: 20, padding: 32, maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.navy }}>Make a Donation</div>
          <button onClick={onClose} style={{ background: COLORS.gray100, border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        {profile && (
          <div style={{ background: `${COLORS.navy}10`, borderRadius: 12, padding: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials={profile.avatar} color={profile.color} size={40} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy }}>{profile.name}</div>
              <div style={{ fontSize: 12, color: COLORS.gray600 }}>{profile.rank} • {profile.state}</div>
            </div>
          </div>
        )}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray600, marginBottom: 8, display: "block" }}>Donation Category</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} style={{ padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1.5px solid ${category === c ? COLORS.saffron : COLORS.gray200}`, background: category === c ? `${COLORS.saffron}18` : COLORS.white, color: category === c ? COLORS.saffronDark : COLORS.gray600 }}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray600, marginBottom: 8, display: "block" }}>Select Amount (₹)</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 10 }}>
            {presets.map((p) => (
              <button key={p} onClick={() => setAmount(p)} style={{ padding: "10px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", border: `1.5px solid ${amount === p ? COLORS.saffron : COLORS.gray200}`, background: amount === p ? `${COLORS.saffron}18` : COLORS.white, color: amount === p ? COLORS.saffronDark : COLORS.gray700 }}>
                ₹{p.toLocaleString()}
              </button>
            ))}
          </div>
          <input type="number" placeholder="Custom amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.gray200}`, borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray600, marginBottom: 6, display: "block" }}>Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.gray200}`, borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray600, marginBottom: 6, display: "block" }}>PAN (for 80G)</label>
            <input value={pan} onChange={(e) => setPan(e.target.value)} placeholder="ABCDE1234F" style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.gray200}`, borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#065F46" }}>
          🔒 Secured by Razorpay • 256-bit SSL • 80G Tax Exemption • Fully Transparent
        </div>
        <button
          onClick={() => setStep(2)}
          style={{ width: "100%", padding: "14px", background: `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})`, color: COLORS.white, border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" }}
        >
          Donate ₹{amount.toLocaleString()} — Razorpay →
        </button>
        <div style={{ fontSize: 11, color: COLORS.gray400, textAlign: "center", marginTop: 10 }}>
          By donating, you agree to our terms. Funds go directly to verified families.
        </div>
      </div>
    </div>
  );
}

function MiniBarChart() {
  const max = Math.max(...MONTHLY_DATA.map((d) => d.donations));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
      {MONTHLY_DATA.map((d) => (
        <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div
            title={`${d.month}: ${formatINR(d.donations)}`}
            style={{
              width: "100%",
              height: `${(d.donations / max) * 64}px`,
              background: `linear-gradient(180deg, ${COLORS.saffron}, ${COLORS.saffronDark})`,
              borderRadius: "4px 4px 0 0",
              transition: "height 0.5s ease",
            }}
          />
          <span style={{ fontSize: 9, color: COLORS.gray400 }}>{d.month[0]}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const cx = 80, cy = 80, r = 60, stroke = 38;
  const circumference = 2 * Math.PI * r;
  const segments = data.map((d) => {
    const pct = d.value / total;
    const offset = cumulative;
    cumulative += pct;
    return { ...d, pct, offset };
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <svg width={160} height={160} viewBox="0 0 160 160">
        {segments.map((s, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${s.pct * circumference} ${circumference}`}
            strokeDashoffset={-s.offset * circumference}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={11} fill={COLORS.gray600}>Total</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={13} fontWeight="bold" fill={COLORS.navy}>₹4.2Cr</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((d) => (
          <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: COLORS.gray600 }}>{d.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, marginLeft: "auto" }}>{Math.round(d.value)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PAGES = ["Home", "Families", "Donate", "Emergency", "NGO Network", "Analytics", "Admin"];

export default function VeerSetu() {
  const [page, setPage] = useState("Home");
  const [donateModal, setDonateModal] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filterUrgency, setFilterUrgency] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [donationTicker, setDonationTicker] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "🙏 Jai Hind! I am VeerBot. How can I help you support our heroes' families today?" },
  ]);
  const [lang, setLang] = useState("EN");
  const [darkMode, setDarkMode] = useState(false);
  const [liveIdx, setLiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setDonationTicker((p) => p + Math.floor(Math.random() * 500 + 100));
      setLiveIdx((p) => (p + 1) % LIVE_DONATIONS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const filteredProfiles = HERO_PROFILES.filter((p) => {
    if (filterUrgency !== "all" && p.urgency !== filterUrgency) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.state.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const q = chatInput.trim();
    setChatMessages((m) => [...m, { role: "user", text: q }]);
    setChatInput("");
    setTimeout(() => {
      let reply = "I can help you with donations, family verification, volunteer opportunities, or NGO registration. What would you like to know?";
      if (q.toLowerCase().includes("donat")) reply = "You can donate directly to a family on the Families page, or make a general donation from the Donate tab. We accept UPI, cards, and net banking via Razorpay.";
      if (q.toLowerCase().includes("verif")) reply = "Family verification takes 3-5 working days. Our admin team reviews submitted documents including service ID, martyr certificate, and pension documents. Verified families receive a ✓ badge.";
      if (q.toLowerCase().includes("ngo")) reply = "NGOs can register under the NGO Network tab. After verification, you can be matched with families needing your specific services — legal, medical, education, or counseling.";
      if (q.toLowerCase().includes("emergen")) reply = "Emergency cases are prioritized using our AI urgency detection system. Critical families appear at the top of the Emergency tab with urgent donation needs.";
      setChatMessages((m) => [...m, { role: "bot", text: reply }]);
    }, 800);
  };

  const bg = darkMode ? COLORS.navy : COLORS.gray50;
  const cardBg = darkMode ? COLORS.navyMid : COLORS.white;
  const textPrimary = darkMode ? COLORS.white : COLORS.navy;
  const textSecondary = darkMode ? "rgba(255,255,255,0.6)" : COLORS.gray600;

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: textPrimary }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${COLORS.saffron}88; border-radius: 3px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes slideIn { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: darkMode ? COLORS.navyMid : COLORS.navy, position: "sticky", top: 0, zIndex: 100, borderBottom: `2px solid ${COLORS.saffron}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 64, gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("Home")}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
              🛡️
            </div>
            <div>
              <div style={{ color: COLORS.white, fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, lineHeight: 1 }}>VeerSetu</div>
              <div style={{ color: COLORS.gold, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em" }}>WELFARE • HONOUR • TRANSPARENCY</div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            {PAGES.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  background: page === p ? `${COLORS.saffron}25` : "transparent",
                  color: page === p ? COLORS.saffron : "rgba(255,255,255,0.7)",
                  border: `1px solid ${page === p ? COLORS.saffron + "60" : "transparent"}`,
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: "rgba(255,255,255,0.1)", color: COLORS.white, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 8px", fontSize: 12, cursor: "pointer", outline: "none" }}>
              {["EN", "HI", "TA", "TE", "BN", "MR", "GU"].map((l) => <option key={l} style={{ background: COLORS.navy }}>{l}</option>)}
            </select>
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16 }}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setDonateModal({ profile: null })} style={{ background: `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})`, color: COLORS.white, border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Donate ❤️
            </button>
          </div>
        </div>
      </nav>

      {/* Live Ticker */}
      <div style={{ background: `linear-gradient(90deg, ${COLORS.saffron}, ${COLORS.saffronDark})`, padding: "6px 24px", display: "flex", alignItems: "center", gap: 16, overflow: "hidden" }}>
        <span style={{ color: COLORS.white, fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>🔴 LIVE</span>
        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12 }}>
          {LIVE_DONATIONS[liveIdx].name} from {LIVE_DONATIONS[liveIdx].city} donated ₹{LIVE_DONATIONS[liveIdx].amount.toLocaleString()} for {LIVE_DONATIONS[liveIdx].family} — {LIVE_DONATIONS[liveIdx].time}
        </span>
        <div style={{ marginLeft: "auto", color: COLORS.white, fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>
          Total Today: {formatINR(342000 + donationTicker)}
        </div>
      </div>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>

        {/* ========== HOME PAGE ========== */}
        {page === "Home" && (
          <div>
            {/* Hero Section */}
            <div style={{ borderRadius: 24, overflow: "hidden", background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`, marginBottom: 40, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>

              <div style={{ position: "relative", padding: "60px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${COLORS.saffron}20`, border: `1px solid ${COLORS.saffron}40`, borderRadius: 99, padding: "6px 16px", marginBottom: 20 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.saffron, animation: "pulse 2s infinite" }}></span>
                    <span style={{ color: COLORS.saffron, fontSize: 12, fontWeight: 700 }}>INDIA'S MOST TRUSTED DEFENSE WELFARE PLATFORM</span>
                  </div>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 800, color: COLORS.white, lineHeight: 1.1, marginBottom: 20 }}>
                    Honour Those Who<br />
                    <span style={{ background: `linear-gradient(90deg, ${COLORS.saffron}, ${COLORS.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      Gave Everything
                    </span>
                  </h1>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
                    VeerSetu connects verified families of fallen Indian soldiers and veterans with donors, NGOs, and volunteers for transparent, impactful welfare support.
                  </p>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <button onClick={() => setPage("Families")} style={{ background: `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})`, color: COLORS.white, border: "none", borderRadius: 12, padding: "14px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                      Support a Family 🛡️
                    </button>
                    <button onClick={() => setPage("Analytics")} style={{ background: "rgba(255,255,255,0.1)", color: COLORS.white, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "14px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                      View Impact 📊
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
                    {[
                      { n: "2,847", l: "Families Verified" },
                      { n: "₹42Cr+", l: "Funds Distributed" },
                      { n: "1.2L+", l: "Donors" },
                    ].map((s) => (
                      <div key={s.l}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: COLORS.white }}>{s.n}</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {HERO_PROFILES.slice(0, 4).map((p) => (
                    <div key={p.id} onClick={() => setDonateModal({ profile: p })} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 16, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.2s" }}>
                      <Avatar initials={p.avatar} color={p.color} size={40} />
                      <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 13, marginTop: 10, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{p.state}</div>
                      <div style={{ marginTop: 10 }}>
                        <ProgressBar value={p.raised} max={p.goal} />
                        <div style={{ fontSize: 11, color: COLORS.saffron, marginTop: 4 }}>{Math.round((p.raised / p.goal) * 100)}% funded</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
              <StatCard icon="🏅" label="Families Supported" value="2,847" sub="+124 this month" accent={COLORS.saffron} />
              <StatCard icon="💰" label="Total Donations" value="₹42.3Cr" sub="₹4.2Cr this month" accent={COLORS.jade} />
              <StatCard icon="🏥" label="Medical Cases" value="1,234" sub="342 emergency" accent={COLORS.red} />
              <StatCard icon="🎓" label="Children in School" value="4,782" sub="Funded by VeerSetu" accent={COLORS.gold} />
            </div>

            {/* Mission + Live Feed */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 40 }}>
              <div style={{ background: cardBg, borderRadius: 20, padding: 32, border: `1.5px solid ${COLORS.gray100}` }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: textPrimary, marginBottom: 8 }}>Our Mission</h2>
                <div style={{ width: 48, height: 4, background: `linear-gradient(90deg, ${COLORS.saffron}, ${COLORS.gold})`, borderRadius: 2, marginBottom: 20 }}></div>
                <p style={{ color: textSecondary, lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
                  Every year, hundreds of Indian defense personnel make the ultimate sacrifice. Their families — spouses, children, parents — are left navigating a complex system of pension claims, education funding, and medical needs alone.
                </p>
                <p style={{ color: textSecondary, lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>
                  VeerSetu bridges this gap with technology: AI-verified identities, blockchain-transparent donations, and a national network of NGOs and volunteers ready to provide direct, meaningful support.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { icon: "🔍", title: "AI Verification", desc: "OCR & fraud detection for every family" },
                    { icon: "🔗", title: "Blockchain Trail", desc: "Every rupee traceable on-chain" },
                    { icon: "🤝", title: "NGO Network", desc: "400+ verified partner organizations" },
                  ].map((f) => (
                    <div key={f.title} style={{ background: `${COLORS.saffron}08`, border: `1px solid ${COLORS.saffron}20`, borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: textPrimary, marginBottom: 4 }}>{f.title}</div>
                      <div style={{ fontSize: 11, color: textSecondary }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: cardBg, borderRadius: 20, padding: 24, border: `1.5px solid ${COLORS.gray100}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", animation: "pulse 2s infinite" }}></span>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: textPrimary }}>Live Donation Feed</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {LIVE_DONATIONS.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: i === liveIdx ? `${COLORS.saffron}10` : `${COLORS.gray50}`, borderRadius: 10, border: `1px solid ${i === liveIdx ? COLORS.saffron + "30" : COLORS.gray100}`, transition: "all 0.5s" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: COLORS.white, fontWeight: 700, flexShrink: 0 }}>
                        {d.name[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: textPrimary }}>{d.name} <span style={{ color: textSecondary, fontWeight: 400 }}>from {d.city}</span></div>
                        <div style={{ fontSize: 11, color: textSecondary }}>{d.family}</div>
                        <div style={{ fontSize: 11, color: COLORS.gray400, marginTop: 2 }}>{d.time}</div>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.saffron, whiteSpace: "nowrap" }}>₹{d.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* State Map (visual) */}
            <div style={{ background: cardBg, borderRadius: 20, padding: 32, border: `1.5px solid ${COLORS.gray100}`, marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: textPrimary, marginBottom: 20 }}>State-wise Support Map</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {STATES_DATA.map((s) => (
                  <div key={s.state} style={{ background: `${s.color}12`, border: `1.5px solid ${s.color}30`, borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginBottom: 4 }}>{s.state}</div>
                    <div style={{ fontSize: 13, color: s.color, fontWeight: 800 }}>{s.families} families</div>
                    <div style={{ fontSize: 12, color: textSecondary, marginTop: 2 }}>{formatINR(s.amount)} raised</div>
                    <ProgressBar value={s.families} max={342} color={s.color} />
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Spotlight */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS.red}15, ${COLORS.red}05)`, border: `1.5px solid ${COLORS.red}30`, borderRadius: 20, padding: 32, marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 28 }}>🚨</span>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: COLORS.red }}>Critical Emergency Cases</h2>
                  <p style={{ color: textSecondary, fontSize: 13 }}>These families need urgent support right now</p>
                </div>
                <button onClick={() => setPage("Emergency")} style={{ marginLeft: "auto", background: COLORS.red, color: COLORS.white, border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  View All →
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {HERO_PROFILES.filter((p) => p.urgency === "critical").map((p) => (
                  <div key={p.id} style={{ background: cardBg, borderRadius: 14, padding: 20, border: `1.5px solid ${COLORS.red}30`, display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <Avatar initials={p.avatar} color={p.color} size={44} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 15, color: textPrimary }}>{p.name}</span>
                        <UrgencyBadge level={p.urgency} />
                      </div>
                      <div style={{ fontSize: 12, color: textSecondary, marginBottom: 8 }}>{p.family}</div>
                      <div style={{ fontSize: 12, color: textSecondary, marginBottom: 10 }}>Needs: {p.needs.join(", ")}</div>
                      <ProgressBar value={p.raised} max={p.goal} color={COLORS.red} />
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                        <span style={{ fontSize: 11, color: textSecondary }}>{formatINR(p.raised)} / {formatINR(p.goal)}</span>
                        <button onClick={() => setDonateModal({ profile: p })} style={{ background: COLORS.red, color: COLORS.white, border: "none", borderRadius: 8, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                          Help Now →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NGO Partners */}
            <div style={{ background: cardBg, borderRadius: 20, padding: 32, border: `1.5px solid ${COLORS.gray100}` }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: textPrimary, marginBottom: 20 }}>Our NGO Partners</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {NGOS.map((n) => (
                  <div key={n.name} style={{ border: `1.5px solid ${COLORS.gray100}`, borderRadius: 14, padding: 20, textAlign: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: `${COLORS.navy}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontWeight: 800, fontSize: 14, color: COLORS.navy }}>
                      {n.logo}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: textPrimary, marginBottom: 4 }}>{n.name}</div>
                    <div style={{ fontSize: 11, color: textSecondary, marginBottom: 8 }}>{n.type}</div>
                    <div style={{ fontSize: 12, color: COLORS.jade, fontWeight: 700 }}>✓ {n.families} families</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== FAMILIES PAGE ========== */}
        {page === "Families" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: textPrimary, marginBottom: 8 }}>Verified Hero Families</h1>
              <p style={{ color: textSecondary, fontSize: 16 }}>Each profile is AI-verified and approved by our admin team</p>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap", alignItems: "center" }}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or state..."
                style={{ flex: 1, minWidth: 200, padding: "10px 16px", border: `1.5px solid ${COLORS.gray200}`, borderRadius: 12, fontSize: 14, outline: "none", background: cardBg, color: textPrimary }}
              />
              {["all", "critical", "high", "medium"].map((u) => (
                <button key={u} onClick={() => setFilterUrgency(u)} style={{ padding: "8px 18px", borderRadius: 99, fontWeight: 600, fontSize: 13, cursor: "pointer", background: filterUrgency === u ? COLORS.saffron : cardBg, color: filterUrgency === u ? COLORS.white : textSecondary, border: `1.5px solid ${filterUrgency === u ? COLORS.saffron : COLORS.gray200}` }}>
                  {u === "all" ? "All" : u.charAt(0).toUpperCase() + u.slice(1)}
                </button>
              ))}
              <span style={{ color: textSecondary, fontSize: 13 }}>{filteredProfiles.length} families</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {filteredProfiles.map((p) => (
                <HeroCard key={p.id} profile={p} onDonate={(prof) => setDonateModal({ profile: prof })} />
              ))}
            </div>
            {filteredProfiles.length === 0 && (
              <div style={{ textAlign: "center", padding: 60, color: textSecondary }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>No families found</div>
                <div style={{ fontSize: 14, marginTop: 8 }}>Try adjusting your search or filter</div>
              </div>
            )}
          </div>
        )}

        {/* ========== DONATE PAGE ========== */}
        {page === "Donate" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 32 }}>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: textPrimary, marginBottom: 8 }}>Donation Portal</h1>
                <p style={{ color: textSecondary, fontSize: 16, marginBottom: 28 }}>Every donation is transparent, tracked, and goes directly to verified families</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
                  {[
                    { icon: "📚", title: "Education Fund", desc: "Sponsor a child's schooling or higher education", amount: "₹500–₹50,000", color: COLORS.navy },
                    { icon: "🏥", title: "Medical Support", desc: "Fund treatments, surgeries, and medicines", amount: "₹1,000–₹5L", color: COLORS.red },
                    { icon: "🛒", title: "Monthly Ration", desc: "Ensure food security for 3 months", amount: "₹2,000/mo", color: COLORS.jade },
                    { icon: "🚨", title: "Emergency Relief", desc: "Immediate assistance for crisis situations", amount: "₹5,000+", color: COLORS.saffron },
                    { icon: "⚖️", title: "Legal Support", desc: "Pension claim and legal aid funding", amount: "₹3,000+", color: COLORS.gold },
                    { icon: "🏠", title: "Housing Aid", desc: "Repair and maintenance support", amount: "₹10,000+", color: "#8B5CF6" },
                  ].map((c) => (
                    <div key={c.title} onClick={() => setDonateModal({ profile: null })} style={{ background: cardBg, borderRadius: 14, padding: 18, border: `1.5px solid ${c.color}30`, cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginBottom: 4 }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: textSecondary, marginBottom: 8, lineHeight: 1.5 }}>{c.desc}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{c.amount}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: `${COLORS.jade}10`, border: `1.5px solid ${COLORS.jade}30`, borderRadius: 16, padding: 24 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: textPrimary, marginBottom: 16 }}>🔗 Blockchain Transaction Log</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { hash: "0x7f3a...c8e2", family: "Subedar Rajan Thapa", amount: "₹5,000", time: "2 min ago", status: "Confirmed" },
                      { hash: "0x2b9d...f4a1", family: "All Families", amount: "₹1,00,000", time: "12 min ago", status: "Confirmed" },
                      { hash: "0x9c1e...8b3d", family: "Naik Gurpreet Sandhu", amount: "₹2,500", time: "31 min ago", status: "Confirmed" },
                      { hash: "0x4a7f...1c9e", family: "Lt Cmdr Ananya Krishnan", amount: "₹10,000", time: "1 hr ago", status: "Confirmed" },
                    ].map((tx) => (
                      <div key={tx.hash} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: cardBg, borderRadius: 10, border: `1px solid ${COLORS.gray100}` }}>
                        <span style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.jade, flex: 1 }}>{tx.hash}</span>
                        <span style={{ fontSize: 12, color: textSecondary, flex: 2 }}>{tx.family}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: textPrimary }}>{tx.amount}</span>
                        <span style={{ fontSize: 11, color: textSecondary }}>{tx.time}</span>
                        <span style={{ background: "#ECFDF5", color: "#065F46", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 600 }}>✓ {tx.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ background: cardBg, borderRadius: 20, padding: 28, border: `1.5px solid ${COLORS.gray100}`, position: "sticky", top: 100 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, color: textPrimary, marginBottom: 20 }}>Quick Donate</h3>
                  <button onClick={() => setDonateModal({ profile: null })} style={{ width: "100%", padding: "16px", background: `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})`, color: COLORS.white, border: "none", borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: "pointer", marginBottom: 16 }}>
                    Donate Now — Razorpay 🔒
                  </button>
                  <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 12, padding: 16, fontSize: 13, color: "#065F46", lineHeight: 1.7 }}>
                    ✓ 100% funds to families<br />
                    ✓ 80G tax exemption<br />
                    ✓ Instant digital receipt<br />
                    ✓ Real-time tracking<br />
                    ✓ Blockchain verified
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <h4 style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginBottom: 16 }}>Fund Allocation</h4>
                    <DonutChart data={[
                      { label: "Direct to Families", value: 82, color: COLORS.saffron },
                      { label: "NGO Operations", value: 10, color: COLORS.navy },
                      { label: "Platform Costs", value: 5, color: COLORS.gray400 },
                      { label: "Reserve Fund", value: 3, color: COLORS.gold },
                    ]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== EMERGENCY PAGE ========== */}
        {page === "Emergency" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.red}20, transparent)`, border: `2px solid ${COLORS.red}40`, borderRadius: 20, padding: 28, marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 48 }}>🚨</span>
                <div>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: COLORS.red }}>Emergency Priority Cases</h1>
                  <p style={{ color: textSecondary, fontSize: 15, marginTop: 4 }}>AI-detected urgent cases requiring immediate attention. Updated every 6 hours.</p>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: COLORS.red }}>5</div>
                  <div style={{ fontSize: 12, color: textSecondary }}>Critical Cases</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              {HERO_PROFILES.filter((p) => p.urgency === "critical" || p.urgency === "high").map((p) => (
                <div key={p.id} style={{ background: cardBg, borderRadius: 16, border: `2px solid ${p.urgency === "critical" ? COLORS.red : "#F59E0B"}40`, overflow: "hidden" }}>
                  <div style={{ background: p.urgency === "critical" ? `${COLORS.red}15` : "#FEF3C730", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                    <UrgencyBadge level={p.urgency} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>AI Priority Score: {p.urgency === "critical" ? "9.8" : "7.4"}/10</span>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: textSecondary }}>Updated 2h ago</span>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                      <Avatar initials={p.avatar} color={p.color} size={52} />
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: textPrimary }}>{p.name}</div>
                        <div style={{ color: textSecondary, fontSize: 13 }}>{p.rank} • {p.regiment}</div>
                        <div style={{ color: textSecondary, fontSize: 12, marginTop: 2 }}>📍 {p.state} • Martyred {p.martyred}</div>
                      </div>
                    </div>
                    <div style={{ background: `${COLORS.saffron}08`, borderRadius: 10, padding: 14, marginBottom: 16, fontSize: 13, color: textSecondary, lineHeight: 1.6, fontStyle: "italic" }}>
                      "{p.story}"
                    </div>
                    <div style={{ fontSize: 13, color: textSecondary, marginBottom: 8 }}>👨‍👩‍👧 {p.family}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                      {p.needs.map((n) => (
                        <span key={n} style={{ background: `${COLORS.red}12`, color: COLORS.red, padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{n}</span>
                      ))}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: textSecondary }}>{formatINR(p.raised)} of {formatINR(p.goal)}</span>
                        <span style={{ fontWeight: 700, color: p.urgency === "critical" ? COLORS.red : "#F59E0B" }}>{Math.round((p.raised / p.goal) * 100)}%</span>
                      </div>
                      <ProgressBar value={p.raised} max={p.goal} color={p.urgency === "critical" ? COLORS.red : "#F59E0B"} />
                    </div>
                    <button onClick={() => setDonateModal({ profile: p })} style={{ width: "100%", padding: "12px", background: p.urgency === "critical" ? COLORS.red : "#F59E0B", color: COLORS.white, border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                      Emergency Donate 🚨
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1.5px solid ${COLORS.gray100}` }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: textPrimary, marginBottom: 16 }}>🤖 AI Urgency Detection System</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[
                  { factor: "Medical Urgency", score: 9.2, color: COLORS.red },
                  { factor: "Child Education", score: 7.8, color: COLORS.saffron },
                  { factor: "Income Gap", score: 8.5, color: COLORS.navy },
                  { factor: "Pension Delays", score: 6.9, color: COLORS.gold },
                ].map((f) => (
                  <div key={f.factor} style={{ textAlign: "center", padding: 16, background: `${f.color}08`, borderRadius: 12, border: `1px solid ${f.color}20` }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: f.color, fontFamily: "'Playfair Display', serif" }}>{f.score}</div>
                    <div style={{ fontSize: 12, color: textSecondary, marginTop: 4 }}>{f.factor}</div>
                    <div style={{ fontSize: 10, color: COLORS.gray400 }}>out of 10</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== NGO NETWORK PAGE ========== */}
        {page === "NGO Network" && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: textPrimary, marginBottom: 8 }}>NGO & Volunteer Network</h1>
            <p style={{ color: textSecondary, fontSize: 16, marginBottom: 32 }}>A nationwide ecosystem of organizations and volunteers dedicated to defense welfare</p>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 28, marginBottom: 32 }}>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: 20, color: textPrimary, marginBottom: 16 }}>Partner NGOs</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[...NGOS, { name: "Rajya Sainik Board", type: "Legal & Admin", verified: true, families: 312, logo: "RS" }, { name: "Veer Mata Sewa Samiti", type: "Elderly Care", verified: true, families: 78, logo: "VM" }].map((n) => (
                    <div key={n.name} style={{ background: cardBg, borderRadius: 14, padding: 20, border: `1.5px solid ${COLORS.gray100}`, display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 12, background: `${COLORS.navy}12`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: COLORS.navy, flexShrink: 0 }}>{n.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: textPrimary }}>{n.name}</span>
                          {n.verified && <VerifiedBadge />}
                        </div>
                        <div style={{ fontSize: 13, color: textSecondary }}>{n.type} • Supporting {n.families} families</div>
                      </div>
                      <button style={{ background: `${COLORS.saffron}15`, color: COLORS.saffron, border: `1px solid ${COLORS.saffron}40`, borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Connect</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontWeight: 700, fontSize: 20, color: textPrimary, marginBottom: 16 }}>Register as Volunteer</h2>
                <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1.5px solid ${COLORS.gray100}` }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    {["Legal Support", "Counseling", "Education Mentorship", "Career Guidance", "Medical Aid", "Financial Advisory"].map((s) => (
                      <label key={s} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                        <input type="checkbox" style={{ accentColor: COLORS.saffron }} />
                        <span style={{ fontSize: 14, color: textPrimary }}>{s}</span>
                      </label>
                    ))}
                  </div>
                  <input placeholder="Your Name" style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.gray200}`, borderRadius: 10, fontSize: 14, marginBottom: 10, outline: "none", background: cardBg, color: textPrimary, boxSizing: "border-box" }} />
                  <input placeholder="Email address" style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.gray200}`, borderRadius: 10, fontSize: 14, marginBottom: 10, outline: "none", background: cardBg, color: textPrimary, boxSizing: "border-box" }} />
                  <input placeholder="City, State" style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.gray200}`, borderRadius: 10, fontSize: 14, marginBottom: 16, outline: "none", background: cardBg, color: textPrimary, boxSizing: "border-box" }} />
                  <button style={{ width: "100%", padding: "12px", background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.navyLight})`, color: COLORS.white, border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                    Register as Volunteer 🤝
                  </button>
                </div>
              </div>
            </div>

            <div style={{ background: cardBg, borderRadius: 16, padding: 28, border: `1.5px solid ${COLORS.gray100}` }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: textPrimary, marginBottom: 20 }}>Help Request Matching</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {[
                  { family: "Kamala Thapa", need: "Education counseling for daughters", type: "Mentorship", urgency: "high", state: "Uttarakhand" },
                  { family: "Priya Nair", need: "Legal aid for pension claim processing", type: "Legal Support", urgency: "critical", state: "Kerala" },
                  { family: "Harleen Sandhu", need: "Psychiatric counseling for grief support", type: "Counseling", urgency: "high", state: "Punjab" },
                ].map((r) => (
                  <div key={r.family} style={{ border: `1.5px solid ${COLORS.gray100}`, borderRadius: 12, padding: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <UrgencyBadge level={r.urgency} />
                      <span style={{ background: `${COLORS.saffron}15`, color: COLORS.saffronDark, padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{r.type}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginBottom: 4 }}>{r.family}</div>
                    <div style={{ fontSize: 12, color: textSecondary, marginBottom: 8, lineHeight: 1.5 }}>{r.need}</div>
                    <div style={{ fontSize: 11, color: textSecondary, marginBottom: 12 }}>📍 {r.state}</div>
                    <button style={{ width: "100%", padding: "8px", background: COLORS.jade, color: COLORS.white, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                      Offer Help ✋
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== ANALYTICS PAGE ========== */}
        {page === "Analytics" && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: textPrimary, marginBottom: 8 }}>Public Transparency Dashboard</h1>
            <p style={{ color: textSecondary, fontSize: 16, marginBottom: 28 }}>Every rupee, every family, every impact — fully transparent</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
              <StatCard icon="💰" label="Total Raised" value="₹42.3Cr" sub="All time" accent={COLORS.saffron} />
              <StatCard icon="👨‍👩‍👧" label="Families Helped" value="2,847" sub="Across 28 states" accent={COLORS.jade} />
              <StatCard icon="🎓" label="Scholarships" value="4,782" sub="Children funded" accent={COLORS.navy} />
              <StatCard icon="🏥" label="Medical Funded" value="₹8.4Cr" sub="1,234 cases" accent={COLORS.red} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 28 }}>
              <div style={{ background: cardBg, borderRadius: 20, padding: 28, border: `1.5px solid ${COLORS.gray100}` }}>
                <h3 style={{ fontWeight: 700, fontSize: 18, color: textPrimary, marginBottom: 6 }}>Monthly Donations (₹)</h3>
                <p style={{ fontSize: 13, color: textSecondary, marginBottom: 20 }}>2025 — All 12 months</p>
                <MiniBarChart />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, padding: "12px 16px", background: `${COLORS.saffron}08`, borderRadius: 10 }}>
                  <div><div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, color: COLORS.saffron }}>₹4.78Cr</div><div style={{ fontSize: 12, color: textSecondary }}>Best Month (Dec)</div></div>
                  <div style={{ textAlign: "center" }}><div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, color: COLORS.navy }}>168</div><div style={{ fontSize: 12, color: textSecondary }}>Families in Dec</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, color: COLORS.jade }}>+286%</div><div style={{ fontSize: 12, color: textSecondary }}>Year Growth</div></div>
                </div>
              </div>

              <div style={{ background: cardBg, borderRadius: 20, padding: 28, border: `1.5px solid ${COLORS.gray100}` }}>
                <h3 style={{ fontWeight: 700, fontSize: 18, color: textPrimary, marginBottom: 20 }}>Fund Usage</h3>
                <DonutChart data={[
                  { label: "Direct to Families", value: 82, color: COLORS.saffron },
                  { label: "NGO Operations", value: 10, color: COLORS.navy },
                  { label: "Platform Costs", value: 5, color: COLORS.gray400 },
                  { label: "Reserve Fund", value: 3, color: COLORS.gold },
                ]} />
              </div>
            </div>

            <div style={{ background: cardBg, borderRadius: 20, padding: 28, border: `1.5px solid ${COLORS.gray100}`, marginBottom: 28 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: textPrimary, marginBottom: 20 }}>State-wise Impact</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {STATES_DATA.map((s) => (
                  <div key={s.state} style={{ padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${COLORS.gray100}` }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginBottom: 6 }}>{s.state}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'Playfair Display', serif" }}>{s.families}</div>
                    <div style={{ fontSize: 12, color: textSecondary, marginBottom: 8 }}>families</div>
                    <ProgressBar value={s.families} max={342} color={s.color} />
                    <div style={{ fontSize: 11, color: textSecondary, marginTop: 6 }}>{formatINR(s.amount)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { title: "Top Donor City", value: "Mumbai", sub: "₹6.2Cr total donations", icon: "🏙️", color: COLORS.saffron },
                { title: "Most Supported State", value: "J&K", sub: "342 families, ₹4.82Cr", icon: "🗺️", color: COLORS.jade },
                { title: "Average Donation", value: "₹3,847", sub: "Per transaction", icon: "📊", color: COLORS.navy },
              ].map((s) => (
                <div key={s.title} style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1.5px solid ${COLORS.gray100}`, display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: textSecondary, marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: textSecondary }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== ADMIN PAGE ========== */}
        {page === "Admin" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${COLORS.navy}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🛡️</div>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: textPrimary }}>Admin Verification Panel</h1>
                <p style={{ color: textSecondary, fontSize: 14 }}>Manage family registrations, verifications, and platform oversight</p>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
                <div style={{ background: `${COLORS.red}15`, border: `1px solid ${COLORS.red}30`, borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: COLORS.red }}>12 Pending</div>
                <div style={{ background: `${COLORS.jade}15`, border: `1px solid ${COLORS.jade}30`, borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: COLORS.jade }}>3 Flagged</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
              <StatCard icon="⏳" label="Pending Review" value="12" sub="Avg 2.3 days wait" accent={COLORS.gold} />
              <StatCard icon="✅" label="Verified This Week" value="34" sub="+18% vs last week" accent={COLORS.jade} />
              <StatCard icon="🚫" label="Rejected (Fraud)" value="7" sub="AI flagged" accent={COLORS.red} />
              <StatCard icon="📄" label="Docs Processed" value="189" sub="OCR success: 94%" accent={COLORS.navy} />
            </div>

            <div style={{ background: cardBg, borderRadius: 20, padding: 28, border: `1.5px solid ${COLORS.gray100}`, marginBottom: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: textPrimary, marginBottom: 20 }}>Pending Applications</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { name: "Smt. Savita Yadav", relation: "Wife of Naib Subedar", state: "UP", docs: 4, aiScore: 9.2, status: "pending", risk: "low" },
                  { name: "Smt. Fatima Begum", relation: "Mother of Sepoy", state: "J&K", docs: 3, aiScore: 8.7, status: "pending", risk: "low" },
                  { name: "Shri Rajesh Meena", relation: "Father of Corporal", state: "Rajasthan", docs: 5, aiScore: 6.1, status: "flagged", risk: "medium" },
                  { name: "Smt. Durga Devi", relation: "Wife of Havildar", state: "Bihar", docs: 4, aiScore: 9.5, status: "pending", risk: "low" },
                ].map((a) => (
                  <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", border: `1.5px solid ${a.status === "flagged" ? COLORS.red + "40" : COLORS.gray100}`, borderRadius: 14, background: a.status === "flagged" ? `${COLORS.red}05` : "transparent" }}>
                    <Avatar initials={a.name.split(" ").map((n) => n[0]).join("").slice(0, 2)} size={40} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: textPrimary }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: textSecondary }}>{a.relation} • 📍 {a.state}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary }}>{a.docs} docs</div>
                      <div style={{ fontSize: 11, color: textSecondary }}>uploaded</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: a.aiScore > 8 ? COLORS.jade : COLORS.gold }}>{a.aiScore}</div>
                      <div style={{ fontSize: 11, color: textSecondary }}>AI Score</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ background: COLORS.jade, color: COLORS.white, border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Approve ✓</button>
                      <button style={{ background: COLORS.red, color: COLORS.white, border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Reject ✕</button>
                      <button style={{ background: `${COLORS.navy}15`, color: COLORS.navy, border: `1px solid ${COLORS.navy}30`, borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Review</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1.5px solid ${COLORS.gray100}` }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: textPrimary, marginBottom: 16 }}>🤖 AI Fraud Detection Alerts</h3>
                {[
                  { alert: "Possible duplicate application", family: "Shri Rajesh Meena", confidence: "78%", action: "Review docs" },
                  { alert: "Mismatched service ID details", family: "Smt. Anita Sharma", confidence: "65%", action: "Verify with Army HQ" },
                  { alert: "Suspicious document patterns", family: "Shri Mohan Lal", confidence: "83%", action: "Reject" },
                ].map((a) => (
                  <div key={a.alert} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `${COLORS.red}08`, border: `1px solid ${COLORS.red}20`, borderRadius: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>⚠️</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{a.alert}</div>
                      <div style={{ fontSize: 11, color: textSecondary }}>{a.family} • Confidence: {a.confidence}</div>
                    </div>
                    <button style={{ background: COLORS.red, color: COLORS.white, border: "none", borderRadius: 8, padding: "6px 12px", fontWeight: 600, fontSize: 11, cursor: "pointer" }}>{a.action}</button>
                  </div>
                ))}
              </div>

              <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1.5px solid ${COLORS.gray100}` }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: textPrimary, marginBottom: 16 }}>📋 OCR Document Processing</h3>
                {[
                  { type: "Martyr Certificate", processed: 89, success: 96 },
                  { type: "Service Identity Card", processed: 134, success: 98 },
                  { type: "Pension Documents", processed: 76, success: 91 },
                  { type: "Aadhaar (Masked)", processed: 167, success: 99 },
                ].map((d) => (
                  <div key={d.type} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                      <span style={{ color: textPrimary }}>{d.type}</span>
                      <span style={{ color: COLORS.jade, fontWeight: 700 }}>{d.success}% success</span>
                    </div>
                    <ProgressBar value={d.success} max={100} color={COLORS.jade} />
                    <div style={{ fontSize: 11, color: textSecondary, marginTop: 4 }}>{d.processed} documents processed</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: COLORS.navy, borderTop: `2px solid ${COLORS.saffron}`, marginTop: 60, padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>🛡️</span>
                <div>
                  <div style={{ color: COLORS.white, fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22 }}>VeerSetu</div>
                  <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em" }}>WELFARE • HONOUR • TRANSPARENCY</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
                India's most trusted digital welfare platform connecting defense hero families with donors, NGOs, and volunteers for transparent, impactful support.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                {["🔒 Razorpay", "⛓️ Blockchain", "🤖 AI Verified"].map((b) => (
                  <span key={b} style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 99, fontSize: 11 }}>{b}</span>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: ["Verified Families", "Donate Now", "Emergency Cases", "NGO Network"] },
              { title: "Register", links: ["As Donor", "As Defense Family", "As NGO/Admin", "As Volunteer"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "RTI Compliance", "Grievance Redressal"] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 13, marginBottom: 14, letterSpacing: "0.05em" }}>{col.title}</div>
                {col.links.map((l) => (
                  <div key={l} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 8, cursor: "pointer" }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>© 2025 VeerSetu. All rights reserved. Built for BuildVerse Hackathon.</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>🇮🇳 Made in India, for India's Heroes</div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        {chatOpen && (
          <div style={{ width: 340, height: 440, background: COLORS.white, borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", marginBottom: 12, display: "flex", flexDirection: "column", overflow: "hidden", border: `1.5px solid ${COLORS.saffron}40`, animation: "slideIn 0.3s ease" }}>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.navyLight})`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${COLORS.saffron}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
              <div>
                <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 14 }}>VeerBot Assistant</div>
                <div style={{ color: COLORS.saffron, fontSize: 11 }}>● Online — AI Powered</div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", color: COLORS.white, fontSize: 14 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})` : COLORS.gray100, color: m.role === "user" ? COLORS.white : COLORS.gray800, fontSize: 13, lineHeight: 1.5 }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 12, borderTop: `1px solid ${COLORS.gray100}`, display: "flex", gap: 8 }}>
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleChatSend()} placeholder="Ask VeerBot..." style={{ flex: 1, padding: "8px 12px", border: `1.5px solid ${COLORS.gray200}`, borderRadius: 10, fontSize: 13, outline: "none" }} />
              <button onClick={handleChatSend} style={{ background: `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})`, color: COLORS.white, border: "none", borderRadius: 10, padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 18 }}>↑</button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)} style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.saffron}, ${COLORS.saffronDark})`, color: COLORS.white, border: "none", boxShadow: "0 8px 24px rgba(255,107,0,0.4)", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 3s ease-in-out infinite" }}>
          {chatOpen ? "✕" : "🤖"}
        </button>
      </div>

      {/* Donation Modal */}
      {donateModal && <DonationModal profile={donateModal.profile} onClose={() => setDonateModal(null)} />}
    </div>
  );
}