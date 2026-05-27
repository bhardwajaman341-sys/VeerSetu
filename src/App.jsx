import { useState, useEffect, useRef } from "react";

// ── Palette & Global Styles injected once ──────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;900&display=swap');
    :root {
      --navy: #0A1628;
      --navy2: #0F2044;
      --saffron: #FF8C00;
      --saffron2: #FFB347;
      --green: #138808;
      --green2: #1aad0a;
      --white: #F9F7F2;
      --muted: #7a8ba0;
      --card: #111d33;
      --border: rgba(255,255,255,0.08);
      --radius: 14px;
      --chat-user: rgba(255,140,0,.13);
      --chat-bot: #111d33;
      --chat-border: rgba(255,255,255,0.08);
    }
    [data-theme="light"] {
      --navy: #F5F3EE;
      --navy2: #EAE7DF;
      --white: #1a1a2e;
      --muted: #6b7280;
      --card: #FFFFFF;
      --border: rgba(0,0,0,0.09);
      --chat-user: rgba(255,140,0,.1);
      --chat-bot: #f0ede8;
      --chat-border: rgba(0,0,0,0.09);
    }
    [data-theme="light"] .nav.scrolled {
      background: rgba(245,243,238,0.93) !important;
    }
    [data-theme="light"] .hero-bg {
      background:
        radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,140,0,.06) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 20% 80%, rgba(19,136,8,.04) 0%, transparent 50%),
        var(--navy) !important;
    }
    [data-theme="light"] .hero-sub { color: rgba(26,26,46,.6) !important; }
    [data-theme="light"] .btn-outline { color: var(--white); border-color:rgba(26,26,46,.25); }
    [data-theme="light"] .btn-outline:hover { background:rgba(26,26,46,.06); }
    [data-theme="light"] .nav-links a { color: rgba(26,26,46,.7); }
    [data-theme="light"] .tricolor { opacity:.85; }
    [data-theme="light"] ::-webkit-scrollbar-track { background: var(--navy); }
    [data-theme="light"] .admin-gate { background: #eae7df; }
    [data-theme="light"] .admin-sidebar { background:#fff; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--navy);
      color: var(--white);
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      line-height: 1.7;
      overflow-x: hidden;
      transition: background .3s, color .3s;
    }
    h1,h2,h3,h4 { font-family: 'Playfair Display', serif; line-height: 1.2; }
    a { color: inherit; text-decoration: none; }
    button { cursor: pointer; font-family: 'DM Sans', sans-serif; }
    ::selection { background: var(--saffron); color: var(--navy); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--navy); }
    ::-webkit-scrollbar-thumb { background: var(--saffron); border-radius: 10px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(28px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shimmer {
      0% { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes flagwave {
      0%,100% { transform: skewX(0deg); }
      50% { transform: skewX(-3deg); }
    }
    @keyframes countUp {
      from { opacity:0; transform: scale(0.7); }
      to   { opacity:1; transform: scale(1); }
    }
    .fade-up { animation: fadeUp .6s ease both; }
    .fade-up-1 { animation-delay: .1s; }
    .fade-up-2 { animation-delay: .2s; }
    .fade-up-3 { animation-delay: .3s; }
    .fade-up-4 { animation-delay: .4s; }
    .pulse-dot { animation: pulse 1.8s infinite; }

    /* Nav */
    .nav { 
      position: fixed; top:0; width:100%; z-index:1000;
      display:flex; align-items:center; justify-content:space-between;
      padding: 0 5%; height: 68px;
      transition: background .3s, backdrop-filter .3s;
    }
    .nav.scrolled {
      background: rgba(10,22,40,0.93);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
    }
    .nav-logo { display:flex; align-items:center; gap:10px; }
    .nav-logo-icon {
      width:38px; height:38px; border-radius:10px;
      background: linear-gradient(135deg, var(--saffron), #e67300);
      display:flex; align-items:center; justify-content:center;
      font-size:18px; animation: flagwave 3s ease-in-out infinite;
    }
    .nav-links { display:flex; gap:28px; align-items:center; }
    .nav-links a {
      font-size:14px; font-weight:500; color: rgba(249,247,242,0.75);
      transition: color .2s;
    }
    .nav-links a:hover { color: var(--saffron); }
    .nav-btn {
      padding: 8px 22px; border-radius:8px; font-size:14px; font-weight:500;
      border:none; background: var(--saffron);
      color: var(--navy); transition: all .2s;
    }
    .nav-btn:hover { background: var(--saffron2); transform: translateY(-1px); }

    /* Hero */
    .hero {
      min-height: 100vh;
      display:flex; align-items:center;
      position:relative; overflow:hidden;
      padding: 100px 5% 60px;
    }
    .hero-bg {
      position:absolute; inset:0; z-index:0;
      background:
        radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,140,0,.08) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 20% 80%, rgba(19,136,8,.06) 0%, transparent 50%),
        var(--navy);
    }
    .hero-grid {
      position:absolute; inset:0; z-index:0; opacity:.04;
      background-image: 
        linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px);
      background-size: 60px 60px;
    }
    .hero-content { position:relative; z-index:1; max-width:620px; }
    .hero-badge {
      display:inline-flex; align-items:center; gap:8px;
      background: rgba(255,140,0,.12); border:1px solid rgba(255,140,0,.25);
      color: var(--saffron2); padding:6px 16px; border-radius:50px;
      font-size:13px; font-weight:500; margin-bottom:28px;
    }
    .hero-title { font-size: clamp(2.4rem, 5vw, 4rem); font-weight:900; margin-bottom:20px; }
    .hero-title span { color: var(--saffron); }
    .hero-sub { font-size:17px; color:rgba(249,247,242,.7); max-width:500px; margin-bottom:36px; }
    .hero-cta { display:flex; gap:14px; flex-wrap:wrap; }
    .btn-primary {
      padding:14px 32px; border-radius:10px; font-size:15px; font-weight:600;
      background: var(--saffron); color: var(--navy); border:none;
      transition: all .2s; display:inline-flex; align-items:center; gap:8px;
    }
    .btn-primary:hover { background: var(--saffron2); transform:translateY(-2px); box-shadow: 0 8px 24px rgba(255,140,0,.3); }
    .btn-outline {
      padding:14px 32px; border-radius:10px; font-size:15px; font-weight:600;
      background: transparent; color: var(--white); border:1.5px solid rgba(255,255,255,.25);
      transition: all .2s;
    }
    .btn-outline:hover { border-color: var(--white); background: rgba(255,255,255,.06); }
    .hero-stats {
      display:flex; gap:32px; margin-top:52px; padding-top:36px;
      border-top:1px solid var(--border);
    }
    .hero-stat-num { font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; color:var(--saffron); }
    .hero-stat-lbl { font-size:12px; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; }

    /* Tricolor bar */
    .tricolor { height:4px; background: linear-gradient(90deg, var(--saffron) 33%, white 33% 66%, var(--green) 66%); }

    /* Section */
    .section { padding: 80px 5%; }
    .section-tag {
      font-size:12px; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
      color:var(--saffron); margin-bottom:12px;
    }
    .section-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight:700; margin-bottom:16px; }
    .section-sub { color: var(--muted); max-width:540px; font-size:16px; }

    /* Cards grid */
    .grid-3 { display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px; }
    .grid-4 { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px; }
    .card {
      background: var(--card); border:1px solid var(--border);
      border-radius:var(--radius); padding:24px;
      transition: all .25s;
    }
    .card:hover { border-color: rgba(255,140,0,.3); transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,.4); }

    /* Hero profile cards */
    .hero-card { position:relative; overflow:hidden; }
    .hero-card-img {
      width:56px; height:56px; border-radius:50%;
      background:linear-gradient(135deg,var(--saffron),var(--green));
      display:flex; align-items:center; justify-content:center;
      font-size:22px; font-weight:700; margin-bottom:14px;
      color:white;
    }
    .badge-verified {
      display:inline-flex; align-items:center; gap:5px;
      background:rgba(19,136,8,.15); border:1px solid rgba(19,136,8,.3);
      color:var(--green2); padding:3px 10px; border-radius:50px;
      font-size:11px; font-weight:600;
    }
    .badge-urgent {
      background:rgba(220,50,50,.15); border:1px solid rgba(220,50,50,.3);
      color:#ff6b6b;
    }
    .badge-training {
      background:rgba(100,120,255,.12); border:1px solid rgba(100,120,255,.25);
      color:#a0aaff;
    }
    .hero-rank { font-size:12px; color:var(--muted); margin-bottom:4px; }
    .hero-name { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; margin-bottom:4px; }
    .hero-unit { font-size:12px; color:var(--saffron); margin-bottom:10px; }
    .progress-bar { 
      height:5px; background:rgba(255,255,255,.08); border-radius:10px; overflow:hidden; margin:10px 0 6px;
    }
    .progress-fill { height:100%; border-radius:10px; background:linear-gradient(90deg,var(--saffron),var(--saffron2)); }
    .progress-label { display:flex; justify-content:space-between; font-size:11px; color:var(--muted); }

    /* Stats row */
    .stat-card {
      background:var(--card); border:1px solid var(--border);
      border-radius:var(--radius); padding:22px 24px;
      text-align:center;
    }
    .stat-num { font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:700; animation: countUp .6s ease both; }
    .stat-lbl { font-size:13px; color:var(--muted); margin-top:4px; }

    /* Donation portal */
    .donation-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
    @media(max-width:720px){ .donation-grid { grid-template-columns:1fr; } }
    .don-type {
      border:1.5px solid var(--border); border-radius:10px;
      padding:16px 18px; cursor:pointer; transition:all .2s;
      display:flex; align-items:center; gap:12px;
    }
    .don-type.active { border-color:var(--saffron); background:rgba(255,140,0,.07); }
    .don-type:hover { border-color:rgba(255,140,0,.4); }
    .don-icon { font-size:22px; width:40px; text-align:center; }
    .don-title { font-weight:600; font-size:14px; }
    .don-sub { font-size:12px; color:var(--muted); }
    .amount-chips { display:flex; flex-wrap:wrap; gap:10px; margin:16px 0; }
    .chip {
      padding:8px 18px; border-radius:8px; font-size:14px; font-weight:500;
      border:1px solid var(--border); background:var(--card); cursor:pointer; transition:all .2s;
    }
    .chip.active, .chip:hover { background:var(--saffron); border-color:var(--saffron); color:var(--navy); }
    .input-field {
      width:100%; background:rgba(255,255,255,.04); border:1px solid var(--border);
      border-radius:8px; padding:12px 16px; color:var(--white); font-size:15px;
      font-family:'DM Sans',sans-serif; outline:none; transition:border .2s;
    }
    .input-field:focus { border-color:rgba(255,140,0,.5); }
    .input-field::placeholder { color:var(--muted); }

    /* Live feed */
    .feed-item {
      display:flex; align-items:center; gap:14px;
      padding:14px 0; border-bottom:1px solid var(--border);
      animation: fadeUp .4s ease both;
    }
    .feed-dot { width:8px; height:8px; border-radius:50%; background:var(--green2); flex-shrink:0; }
    .feed-dot.orange { background:var(--saffron); }

    /* Admin / Gated */
    .admin-gate {
      min-height:100vh; display:flex; align-items:center; justify-content:center;
      background:var(--navy2);
    }
    .admin-box {
      background:var(--card); border:1px solid var(--border);
      border-radius:20px; padding:44px; width:100%; max-width:420px;
      text-align:center;
    }
    .admin-logo { font-size:36px; margin-bottom:16px; }
    .admin-title { font-size:1.6rem; font-weight:700; margin-bottom:8px; }
    .admin-sub { color:var(--muted); font-size:14px; margin-bottom:32px; }

    /* Tabs */
    .tab-bar { display:flex; gap:4px; background:rgba(255,255,255,.04); border-radius:10px; padding:4px; margin-bottom:28px; }
    .tab-btn {
      flex:1; padding:9px; border:none; border-radius:8px; font-size:13px; font-weight:500;
      background:transparent; color:var(--muted); transition:all .2s;
    }
    .tab-btn.active { background:var(--card); color:var(--white); }

    /* Admin dash */
    .admin-content { display:grid; grid-template-columns:220px 1fr; min-height:100vh; }
    .admin-sidebar {
      background:var(--card); border-right:1px solid var(--border);
      padding:28px 20px;
    }
    .sidebar-item {
      display:flex; align-items:center; gap:10px;
      padding:10px 14px; border-radius:8px; font-size:14px; font-weight:500;
      cursor:pointer; transition:all .2s; margin-bottom:4px; color:var(--muted);
    }
    .sidebar-item:hover, .sidebar-item.active { background:rgba(255,140,0,.1); color:var(--saffron); }
    .sidebar-icon { font-size:17px; width:22px; text-align:center; }
    .admin-main { padding:32px 36px; overflow-y:auto; }

    /* Verification table */
    .vtable { width:100%; border-collapse:collapse; font-size:13px; }
    .vtable th { 
      text-align:left; padding:10px 14px; font-weight:600; font-size:12px;
      text-transform:uppercase; letter-spacing:.07em; color:var(--muted);
      border-bottom:1px solid var(--border);
    }
    .vtable td { padding:14px; border-bottom:1px solid rgba(255,255,255,.04); }
    .vtable tr:hover td { background:rgba(255,255,255,.02); }
    .status-pill {
      padding:3px 10px; border-radius:50px; font-size:11px; font-weight:600;
    }
    .status-pending { background:rgba(255,183,77,.15); color:#ffb74d; }
    .status-approved { background:rgba(19,136,8,.15); color:var(--green2); }
    .status-flagged { background:rgba(220,50,50,.15); color:#ff6b6b; }

    /* Mobile nav toggle */
    .menu-toggle { display:none; background:none; border:none; color:var(--white); font-size:22px; }
    @media(max-width:768px) {
      .menu-toggle { display:flex; }
      .nav-links { display:none; }
      .admin-content { grid-template-columns:1fr; }
      .admin-sidebar { display:none; }
      .hero-stats { gap:20px; }
    }

    /* Theme toggle button */
    .theme-toggle {
      width:38px; height:38px; border-radius:50%; border:1.5px solid var(--border);
      background:var(--card); color:var(--white); font-size:17px;
      display:flex; align-items:center; justify-content:center;
      cursor:pointer; transition:all .2s; flex-shrink:0;
    }
    .theme-toggle:hover { border-color:var(--saffron); background:rgba(255,140,0,.1); transform:rotate(20deg); }

    /* Chatbot FAB */
    .chat-fab {
      position:fixed; bottom:28px; right:28px; z-index:2000;
      width:56px; height:56px; border-radius:50%;
      background:linear-gradient(135deg,var(--saffron),#e67300);
      border:none; color:white; font-size:24px;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 6px 24px rgba(255,140,0,.45);
      transition:all .25s; cursor:pointer;
    }
    .chat-fab:hover { transform:scale(1.1); box-shadow:0 10px 32px rgba(255,140,0,.5); }
    .chat-fab.open { transform:rotate(45deg); background:linear-gradient(135deg,#555,#333); box-shadow:0 6px 20px rgba(0,0,0,.4); }

    /* Chat window */
    .chat-window {
      position:fixed; bottom:96px; right:28px; z-index:1999;
      width:360px; max-height:520px; border-radius:20px;
      background:var(--card); border:1px solid var(--border);
      box-shadow:0 20px 60px rgba(0,0,0,.5);
      display:flex; flex-direction:column; overflow:hidden;
      animation: chatSlideUp .3s cubic-bezier(.16,1,.3,1) both;
    }
    @keyframes chatSlideUp {
      from { opacity:0; transform:translateY(24px) scale(.97); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    .chat-header {
      padding:16px 18px; border-bottom:1px solid var(--border);
      display:flex; align-items:center; gap:10px;
      background:linear-gradient(135deg,rgba(255,140,0,.1),rgba(19,136,8,.06));
    }
    .chat-avatar {
      width:36px; height:36px; border-radius:50%;
      background:linear-gradient(135deg,var(--saffron),#e67300);
      display:flex; align-items:center; justify-content:center;
      font-size:17px; flex-shrink:0;
    }
    .chat-header-info { flex:1; }
    .chat-header-name { font-weight:600; font-size:14px; }
    .chat-header-status { font-size:11px; color:var(--green2); display:flex; align-items:center; gap:5px; }
    .chat-messages {
      flex:1; overflow-y:auto; padding:16px;
      display:flex; flex-direction:column; gap:12px;
      scrollbar-width:thin;
    }
    .chat-messages::-webkit-scrollbar { width:3px; }
    .chat-messages::-webkit-scrollbar-thumb { background:var(--saffron); border-radius:10px; }
    .msg { max-width:82%; display:flex; flex-direction:column; gap:4px; }
    .msg.user { align-self:flex-end; }
    .msg.bot  { align-self:flex-start; }
    .msg-bubble {
      padding:10px 14px; border-radius:16px; font-size:13.5px; line-height:1.55;
    }
    .msg.user .msg-bubble {
      background:var(--chat-user); border:1px solid rgba(255,140,0,.2);
      border-bottom-right-radius:4px; color:var(--white);
    }
    .msg.bot .msg-bubble {
      background:var(--chat-bot); border:1px solid var(--chat-border);
      border-bottom-left-radius:4px; color:var(--white);
    }
    .msg-time { font-size:10px; color:var(--muted); padding:0 4px; }
    .msg.user .msg-time { text-align:right; }
    .typing-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--muted); animation:pulse 1s infinite; }
    .typing-dot:nth-child(2) { animation-delay:.2s; }
    .typing-dot:nth-child(3) { animation-delay:.4s; }
    .chat-input-row {
      padding:12px 14px; border-top:1px solid var(--border);
      display:flex; gap:8px; align-items:center;
    }
    .chat-input {
      flex:1; background:rgba(255,255,255,.05); border:1px solid var(--border);
      border-radius:10px; padding:9px 13px; font-size:13px; color:var(--white);
      font-family:'DM Sans',sans-serif; outline:none; resize:none;
      transition:border .2s; max-height:80px;
    }
    .chat-input:focus { border-color:rgba(255,140,0,.5); }
    .chat-input::placeholder { color:var(--muted); }
    .chat-send {
      width:36px; height:36px; border-radius:50%;
      background:var(--saffron); border:none; color:var(--navy);
      font-size:16px; display:flex; align-items:center; justify-content:center;
      cursor:pointer; transition:all .2s; flex-shrink:0;
    }
    .chat-send:hover { background:var(--saffron2); transform:scale(1.08); }
    .chat-send:disabled { opacity:.4; cursor:not-allowed; transform:none; }
    .chat-suggestions { display:flex; flex-wrap:wrap; gap:6px; padding:0 16px 12px; }
    .chat-sugg {
      font-size:11.5px; padding:5px 11px; border-radius:50px;
      border:1px solid var(--border); background:transparent;
      color:var(--muted); cursor:pointer; transition:all .2s;
    }
    .chat-sugg:hover { border-color:var(--saffron); color:var(--saffron); }

    /* Misc */
    .divider { height:1px; background:var(--border); margin:40px 0; }
    .text-saffron { color:var(--saffron); }
    .text-muted { color:var(--muted); }
    .text-center { text-align:center; }
    .mb-8 { margin-bottom:8px; }
    .mb-16 { margin-bottom:16px; }
    .mb-24 { margin-bottom:24px; }
    .mb-32 { margin-bottom:32px; }
    .mt-24 { margin-top:24px; }
    .mt-32 { margin-top:32px; }
    .flex { display:flex; }
    .flex-center { display:flex; align-items:center; justify-content:center; }
    .gap-8 { gap:8px; }
    .gap-12 { gap:12px; }

    /* Chart bars */
    .bar-chart { display:flex; align-items:flex-end; gap:10px; height:100px; }
    .bar { flex:1; border-radius:4px 4px 0 0; transition:height .6s ease; }
    .bar-label { font-size:10px; color:var(--muted); text-align:center; margin-top:4px; }

    /* Ribbon */
    .ribbon {
      position:relative; overflow:hidden;
      background:linear-gradient(135deg,rgba(255,140,0,.08),rgba(19,136,8,.05));
      border:1px solid rgba(255,140,0,.15); border-radius:var(--radius);
      padding:28px; text-align:center;
    }
    .ribbon::before {
      content:''; position:absolute; top:0; left:0; right:0; height:3px;
      background:linear-gradient(90deg,var(--saffron),white,var(--green));
    }
  `}</style>
);

// ── Data ───────────────────────────────────────────────────────────────────
const DON_TYPES = [
  { icon:"🎓", title:"Education Sponsor", sub:"Support children's schooling", id:"education" },
  { icon:"🏥", title:"Medical Aid", sub:"Fund treatments & medicine", id:"medical" },
  { icon:"🍚", title:"Monthly Ration", sub:"Ensure food security", id:"ration" },
  { icon:"🚨", title:"Emergency Relief", sub:"Immediate crisis support", id:"emergency" },
];

const NAV_LINKS = ["Home","Mission","Families","Emergency","NGO Network","Transparency"];

// ── Components ─────────────────────────────────────────────────────────────

// ── VeerSetu SVG Logo ──────────────────────────────────────────────────────
function VeerSetuLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer shield shape */}
      <path
        d="M20 2L4 8.5V20.5C4 29.2 11.2 36.8 20 39C28.8 36.8 36 29.2 36 20.5V8.5L20 2Z"
        fill="url(#shieldGrad)"
      />
      {/* Inner shield outline */}
      <path
        d="M20 5L7 10.5V20.5C7 27.8 12.8 34.2 20 36.2C27.2 34.2 33 27.8 33 20.5V10.5L20 5Z"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.6"
      />
      {/* Tricolor band across middle of shield */}
      <clipPath id="shieldClip">
        <path d="M20 5L7 10.5V20.5C7 27.8 12.8 34.2 20 36.2C27.2 34.2 33 27.8 33 20.5V10.5L20 5Z"/>
      </clipPath>
      <g clipPath="url(#shieldClip)">
        <rect x="7" y="17.5" width="26" height="3.2" fill="#FF8C00" opacity="0.55"/>
        <rect x="7" y="20.7" width="26" height="3.2" fill="white" opacity="0.25"/>
        <rect x="7" y="23.9" width="26" height="3.2" fill="#138808" opacity="0.55"/>
      </g>
      {/* Star / Ashoka-inspired center mark */}
      <circle cx="20" cy="20" r="5.5" fill="none" stroke="white" strokeWidth="0.8" opacity="0.9"/>
      <circle cx="20" cy="20" r="1.4" fill="white" opacity="0.95"/>
      {/* 8 spokes of Ashoka wheel simplified */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 20 + 2.2 * Math.cos(rad);
        const y1 = 20 + 2.2 * Math.sin(rad);
        const x2 = 20 + 4.8 * Math.cos(rad);
        const y2 = 20 + 4.8 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.7" opacity="0.85"/>;
      })}
      {/* Top V — for Veer */}
      <path d="M14 11L20 16.5L26 11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95"/>
      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="36" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a3a6b"/>
          <stop offset="50%" stopColor="#0F2044"/>
          <stop offset="100%" stopColor="#0A1628"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, scrolled, theme, toggleTheme }) {
  const pageKey = (label) => {
    if (label === "Home") return "home";
    if (label === "NGO Network") return "ngo_network";
    return label.toLowerCase();
  };
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      {/* Logo */}
      <div className="nav-logo" style={{cursor:"pointer"}} onClick={() => setPage("home")}>
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          width:42, height:42, borderRadius:11,
          background:"linear-gradient(145deg,#1a3a6b,#0A1628)",
          border:"1.5px solid rgba(255,140,0,0.35)",
          boxShadow:"0 2px 12px rgba(255,140,0,0.18)",
          animation:"flagwave 3s ease-in-out infinite",
          flexShrink:0,
        }}>
          <VeerSetuLogo size={34} />
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontWeight:700,
            fontSize:18,
            lineHeight:1.1,
            letterSpacing:"-.01em",
          }}>
            <span style={{color:"var(--saffron)"}}>Veer</span>
            <span style={{color:"var(--white)"}}>Setu</span>
          </div>
          <div style={{
            fontSize:9, color:"var(--muted)", letterSpacing:".14em",
            textTransform:"uppercase", fontWeight:500,
          }}>
            Bridge of Honour
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="nav-links">
        {NAV_LINKS.map(l => (
          <a
            key={l}
            href="#"
            onClick={e => { e.preventDefault(); setPage(pageKey(l)); }}
            style={{
              color: page === pageKey(l) ? "var(--saffron)" : undefined,
              borderBottom: page === pageKey(l) ? "2px solid var(--saffron)" : "2px solid transparent",
              paddingBottom: 2,
            }}
          >
            {l}
          </a>
        ))}
        <button className="theme-toggle" onClick={toggleTheme} title={theme==="dark"?"Switch to Light":"Switch to Dark"}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button className="nav-btn" onClick={() => setPage("login")}>Login</button>
      </div>
    </nav>
  );
}

function HeroSection({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-bg" /><div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-badge fade-up">
          <span className="pulse-dot" style={{width:7,height:7,borderRadius:"50%",background:"var(--saffron)",display:"inline-block"}} />
          National Welfare Platform — Live
        </div>
        <h1 className="hero-title fade-up fade-up-1">
          Honour Every<br /><span>Sacrifice.</span><br />Bridge Every Gap.
        </h1>
        <p className="hero-sub fade-up fade-up-2">
          A verified, transparent welfare ecosystem connecting India's defense families, veterans, and training casualties with the support they deserve.
        </p>
        <div className="hero-cta fade-up fade-up-3">
          <button className="btn-primary" onClick={() => setPage("donate")}>
            💛 Donate Now
          </button>
          <button className="btn-outline" onClick={() => setPage("families")}>
            View Families →
          </button>
        </div>
        <div className="hero-stats fade-up fade-up-4">
          {[["1,240+","Verified Families"],["₹2.4Cr","Disbursed"],["380+","Active Donors"],["28","States Covered"]].map(([n,l]) => (
            <div key={l}>
              <div className="hero-stat-num">{n}</div>
              <div className="hero-stat-lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* decorative silhouette */}
      <div style={{position:"absolute",right:"4%",bottom:0,opacity:.07,fontSize:220,lineHeight:1,userSelect:"none",pointerEvents:"none"}}>
        🪖
      </div>
    </section>
  );
}

function StatsRow() {
  const stats = [
    {num:"₹1.8Cr", lbl:"Emergency Relief Deployed", color:"var(--saffron)"},
    {num:"94%", lbl:"Fund Utilization Rate", color:"var(--green2)"},
    {num:"48h", lbl:"Avg. Verification Time", color:"#a0aaff"},
    {num:"₹0", lbl:"Admin Overhead (NGO)", color:"#ff9898"},
  ];
  return (
    <section style={{padding:"0 5% 60px"}}>
      <div className="grid-4">
        {stats.map(s => (
          <div className="stat-card" key={s.lbl}>
            <div className="stat-num" style={{color:s.color}}>{s.num}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FamiliesSection({ setPage, heroes }) {
  const [filter, setFilter] = useState("all");
  const categories = ["all","Martyred","Veteran","Training Casualty"];
  const filtered = filter === "all" ? heroes : heroes.filter(h => h.status === filter);
  return (
    <section className="section" id="families">
      <div className="section-tag fade-up">Verified Profiles</div>
      <h2 className="section-title fade-up fade-up-1">Families Who Need You</h2>
      <p className="section-sub fade-up fade-up-2 mb-32">Every card represents a verified family. Your support goes directly to them.</p>
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {categories.map(c => (
          <button key={c} className={`chip${filter===c?" active":""}`} onClick={() => setFilter(c)}>
            {c==="all"?"All Families":c}
          </button>
        ))}
      </div>
      <div className="grid-3">
        {filtered.map((h,i) => (
          <div className={`card hero-card fade-up fade-up-${i+1}`} key={h._id || h.id}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <div className="hero-card-img">{h.initials}</div>
              <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
                {h.urgent && <span className="badge-verified badge-urgent">⚡ Urgent</span>}
                {h.training && <span className="badge-verified badge-training">🎓 Training</span>}
                {!h.urgent && !h.training && <span className="badge-verified">✓ Verified</span>}
              </div>
            </div>
            <div className="hero-rank">{h.rank} · {h.state}</div>
            <div className="hero-name">{h.name}</div>
            <div className="hero-unit">{h.unit}</div>
            <div style={{fontSize:12,color:"var(--muted)",marginBottom:10}}>
              👨‍👩‍👧 {h.family} &nbsp;|&nbsp; Need: <span style={{color:"var(--white)"}}>{h.need}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width:`${Math.round(h.raised/h.goal*100)}%`}} />
            </div>
            <div className="progress-label">
              <span>₹{(h.raised/1000).toFixed(1)}K raised</span>
              <span>{Math.round(h.raised/h.goal*100)}% of ₹{(h.goal/1000).toFixed(0)}K</span>
            </div>
            <button className="btn-primary" style={{width:"100%",marginTop:16,padding:"10px",justifyContent:"center"}} onClick={() => setPage("donate")}>
              Support This Family
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{color:"var(--muted)", fontStyle:"italic", paddingTop:20}}>No families found for this category.</div>
        )}
      </div>
    </section>
  );
}

function EmergencySection({ setPage, heroes }) {
  const cases = heroes.filter(h => h.urgent);
  return (
    <section className="section" style={{background:"rgba(220,50,50,.03)", borderTop:"1px solid var(--border)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
        <span style={{width:10,height:10,borderRadius:"50%",background:"#ff6b6b",display:"inline-block",animation:"pulse 1.2s infinite"}} />
        <span className="section-tag" style={{margin:0}}>Emergency Priority Cases</span>
      </div>
      <h2 className="section-title fade-up">Needs Immediate Attention</h2>
      <p className="section-sub mb-32">AI-flagged urgent cases based on medical, education, and financial distress signals.</p>
      <div className="grid-3">
        {cases.map(h => (
          <div className="card" key={h._id || h.id} style={{borderColor:"rgba(255,107,107,.25)",background:"rgba(220,50,50,.05)"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <span className="badge-verified badge-urgent" style={{fontSize:12}}>🚨 URGENT — AI Flagged</span>
              {h.training && <span className="badge-verified badge-training">Training Casualty</span>}
            </div>
            <div className="hero-name" style={{marginBottom:4}}>{h.name}</div>
            <div style={{fontSize:13,color:"var(--muted)",marginBottom:4}}>{h.unit}</div>
            <div style={{fontSize:13,marginBottom:16}}>
              Critical need: <span style={{color:"#ff9898",fontWeight:600}}>{h.need}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width:`${Math.round(h.raised/h.goal*100)}%`,background:"linear-gradient(90deg,#ff6b6b,#ff9898)"}} />
            </div>
            <div className="progress-label mb-16">
              <span>₹{(h.raised/1000).toFixed(1)}K of ₹{(h.goal/1000).toFixed(0)}K</span>
              <span>{Math.round(h.raised/h.goal*100)}%</span>
            </div>
            <button className="btn-primary" style={{background:"#e53e3e",width:"100%",justifyContent:"center"}} onClick={() => setPage("donate")}>
              🚨 Emergency Donate
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrainingSection() {
  return (
    <section className="section">
      <div className="section-tag">Training Casualties Welfare</div>
      <h2 className="section-title fade-up">NDA · IMA · OTA · AFA · INA Cadets</h2>
      <p className="section-sub mb-32">Cadets injured during rigorous training deserve the same honour as those injured in the field. VeerSetu extends welfare to ex-cadets of all national academies.</p>
      <div className="ribbon fade-up">
        <div style={{fontSize:36,marginBottom:12}}>🎓</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",marginBottom:8}}>Cadet Welfare Initiative</h3>
        <p style={{color:"var(--muted)",maxWidth:500,margin:"0 auto 20px",fontSize:14}}>
          Training accidents, para jump injuries, field exercise casualties, and psychological trauma sustained during officer training are covered under our dedicated Cadet Welfare Fund. Families can register with academy NOC and medical board report.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
          {["NDA Khadakwasla","IMA Dehradun","OTA Chennai","AFA Hyderabad","INA Ezhimala"].map(a => (
            <span key={a} className="badge-verified badge-training" style={{fontSize:12}}>{a}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonateSection() {
  const [donType, setDonType] = useState("education");
  const [amount, setAmount] = useState(1000);
  const [customAmt, setCustomAmt] = useState("");
  const [donorName, setDonorName] = useState(""); // Backend integrated state
  
  const chips = [500,1000,2500,5000,10000];

  // API Integration Handler
  const handleDonationSubmit = async () => {
    try {
      await fetch('https://veersetu.onrender.com/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor: donorName || "Anonymous",
          amount: amount,
          family: "General Fund", // Defaulting to general fund context
          type: donType
        })
      });
      
      alert(`Jai Hind! ₹${amount} donated successfully.`);
      window.location.reload(); 
    } catch (error) {
      console.error("Donation failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <section className="section">
      <div className="section-tag">Secure Donation Portal</div>
      <h2 className="section-title fade-up mb-32">Make a Difference Today</h2>
      <div style={{maxWidth:860,display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}} className="donation-grid">
        {/* Left: type + amount */}
        <div>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:14,fontWeight:500}}>Choose support type</p>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
            {DON_TYPES.map(d => (
              <div key={d.id} className={`don-type${donType===d.id?" active":""}`} onClick={() => setDonType(d.id)}>
                <div className="don-icon">{d.icon}</div>
                <div>
                  <div className="don-title">{d.title}</div>
                  <div className="don-sub">{d.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: amount + pay */}
        <div>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:14,fontWeight:500}}>Select amount (₹)</p>
          <div className="amount-chips">
            {chips.map(c => (
              <button key={c} className={`chip${amount===c?" active":""}`} onClick={() => { setAmount(c); setCustomAmt(""); }}>
                ₹{c >= 1000 ? (c/1000)+"K" : c}
              </button>
            ))}
          </div>
          <input
            className="input-field mb-16"
            placeholder="Or enter custom amount"
            value={customAmt}
            onChange={e => { setCustomAmt(e.target.value); setAmount(Number(e.target.value)||0); }}
          />
          {/* Linked donorName variable */}
          <input 
            className="input-field mb-16" 
            placeholder="Your name (optional)" 
            value={donorName} 
            onChange={e => setDonorName(e.target.value)} 
          />
          <input className="input-field mb-16" placeholder="Message to family (optional)" />
          <div className="card mb-16" style={{padding:"14px 18px"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:6}}>
              <span className="text-muted">Donation</span>
              <span>₹{amount.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:6}}>
              <span className="text-muted">Platform fee</span>
              <span style={{color:"var(--green2)"}}>₹0 (Waived)</span>
            </div>
            <div className="divider" style={{margin:"8px 0"}} />
            <div style={{display:"flex",justifyContent:"space-between",fontWeight:600}}>
              <span>Total</span>
              <span className="text-saffron">₹{amount.toLocaleString()}</span>
            </div>
          </div>
          {/* Linked submission trigger */}
          <button className="btn-primary" onClick={handleDonationSubmit} style={{width:"100%",justifyContent:"center",fontSize:16,padding:14}}>
            🔒 Pay via Razorpay (Demo)
          </button>
          <p style={{fontSize:11,color:"var(--muted)",textAlign:"center",marginTop:10}}>
            Sandbox mode · No real payment processed · 80G receipt via email
          </p>
        </div>
      </div>
    </section>
  );
}

function TransparencySection({ liveFeed }) {
  const bars = [
    {lbl:"UP",val:82,color:"var(--saffron)"},
    {lbl:"RJ",val:74,color:"var(--saffron)"},
    {lbl:"MH",val:65,color:"var(--green2)"},
    {lbl:"HP",val:58,color:"var(--green2)"},
    {lbl:"PB",val:51,color:"#a0aaff"},
    {lbl:"UK",val:44,color:"#a0aaff"},
  ];
  return (
    <section className="section" style={{borderTop:"1px solid var(--border)"}}>
      <div className="section-tag">Public Transparency</div>
      <h2 className="section-title fade-up mb-32">Every Rupee Accounted For</h2>
      <div className="grid-3">
        {/* Chart */}
        <div className="card" style={{gridColumn:"span 1"}}>
          <p style={{fontSize:13,fontWeight:600,marginBottom:20}}>State-wise Families Supported</p>
          <div className="bar-chart">
            {bars.map(b => (
              <div key={b.lbl} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{height:`${b.val}px`,width:"100%",background:b.color,borderRadius:"4px 4px 0 0",opacity:.85}} />
                <div className="bar-label">{b.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Fund split */}
        <div className="card">
          <p style={{fontSize:13,fontWeight:600,marginBottom:16}}>Fund Allocation</p>
          {[["Education",38,"var(--saffron)"],["Medical",27,"#ff9898"],["Ration",18,"var(--green2)"],["Emergency",12,"#a0aaff"],["Admin",5,"var(--muted)"]].map(([l,p,c]) => (
            <div key={l} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}>
                <span>{l}</span><span style={{color:c,fontWeight:600}}>{p}%</span>
              </div>
              <div className="progress-bar" style={{height:6}}>
                <div className="progress-fill" style={{width:`${p}%`,background:c}} />
              </div>
            </div>
          ))}
        </div>
        {/* Live feed dynamic integration */}
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <p style={{fontSize:13,fontWeight:600}}>Live Donations</p>
            <span className="badge-verified" style={{fontSize:10}}>● LIVE</span>
          </div>
          {liveFeed.map((f,i) => (
            <div className="feed-item" key={f._id || i}>
              <div className={`feed-dot${f.type==="general"?"":" orange"}`} />
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500}}>{f.donor} → ₹{f.amount.toLocaleString()}</div>
                <div style={{fontSize:11,color:"var(--muted)"}}>
                  {f.family} · {f.createdAt ? new Date(f.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : f.time}
                </div>
              </div>
            </div>
          ))}
          {liveFeed.length === 0 && <div style={{fontSize:12, color:"var(--muted)", marginTop:10}}>Awaiting live feed...</div>}
        </div>
      </div>
    </section>
  );
}

function NGOSection() {
  const ngos = [
    {icon:"⚖️",name:"Sainik Adalat Foundation",type:"Legal Aid",verified:true},
    {icon:"🧠",name:"Veer Parivar Counseling",type:"Mental Health",verified:true},
    {icon:"📚",name:"ShaurNov Mentors",type:"Education",verified:false},
  ];
  const skills = ["Legal Aid","Medical","Counseling","Education","Career Guidance","Translation"];
  return (
    <section className="section">
      <div className="section-tag">NGO & Volunteer Network</div>
      <h2 className="section-title fade-up mb-16">Join the Support Ecosystem</h2>
      <p className="section-sub mb-32">Registered NGOs and individual volunteers provide non-financial support to verified families.</p>
      <div className="grid-3 mb-32">
        {ngos.map(n => (
          <div className="card" key={n.name}>
            <div style={{fontSize:28,marginBottom:10}}>{n.icon}</div>
            <div style={{fontWeight:600,marginBottom:4}}>{n.name}</div>
            <div style={{fontSize:12,color:"var(--muted)",marginBottom:10}}>{n.type} Organization</div>
            {n.verified && <span className="badge-verified" style={{fontSize:11}}>✓ NGO Verified</span>}
          </div>
        ))}
      </div>
      <div className="ribbon">
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",marginBottom:12}}>Volunteer Skills Available</h3>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
          {skills.map(s => (
            <span key={s} className="badge-verified" style={{fontSize:12}}>{s}</span>
          ))}
        </div>
        <button className="btn-primary" style={{marginTop:20}}>Register as Volunteer</button>
      </div>
    </section>
  );
}

// ── Admin Gate ─────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const handle = () => {
    if (user === "admin" && pass === "veersetu") onLogin();
    else setErr("Invalid credentials. Try admin / veersetu");
  };
  return (
    <div className="admin-gate">
      <div className="admin-box fade-up">
        <div className="admin-logo">🛡️</div>
        <div className="admin-title">Admin Access</div>
        <div className="admin-sub">Restricted · Authorized Personnel Only</div>
        <input className="input-field mb-16" placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} />
        <input className="input-field mb-16" type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()} />
        {err && <p style={{color:"#ff6b6b",fontSize:13,marginBottom:12}}>{err}</p>}
        <button className="btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={handle}>
          🔐 Secure Login
        </button>
        <p style={{fontSize:11,color:"var(--muted)",marginTop:14}}>Demo credentials: admin / veersetu</p>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout, liveFeed, pendingApps }) {
  const [activeTab, setActiveTab] = useState("overview");
  const menu = [
    {id:"overview",icon:"📊",lbl:"Overview"},
    {id:"verify",icon:"✅",lbl:"Verifications"},
    {id:"donations",icon:"💰",lbl:"Donations"},
    {id:"families",icon:"👨‍👩‍👧",lbl:"Families"},
    {id:"flags",icon:"🚩",lbl:"AI Flags"},
  ];
  return (
    <div className="admin-content" style={{minHeight:"100vh"}}>
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:28}}>
          <div style={{fontSize:20}}>🛡</div>
          <div style={{fontWeight:700,fontSize:15}}>VeerSetu Admin</div>
        </div>
        {menu.map(m => (
          <div key={m.id} className={`sidebar-item${activeTab===m.id?" active":""}`} onClick={() => setActiveTab(m.id)}>
            <span className="sidebar-icon">{m.icon}</span>{m.lbl}
          </div>
        ))}
        <div style={{position:"absolute",bottom:28}}>
          <div className="sidebar-item" onClick={onLogout} style={{color:"#ff6b6b"}}>
            <span className="sidebar-icon">🚪</span>Logout
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="admin-main">
        {activeTab === "overview" && (
          <>
            <h2 style={{fontFamily:"'Playfair Display',serif",marginBottom:24}}>Dashboard Overview</h2>
            <div className="grid-4 mb-32">
              {[["124","Pending Verifications","var(--saffron)"],["1,240","Total Verified Families","var(--green2)"],["₹2.4Cr","Total Disbursed","#a0aaff"],["3","AI Fraud Flags","#ff6b6b)"]].map(([n,l,c]) => (
                <div className="stat-card" key={l}>
                  <div className="stat-num" style={{fontSize:"1.6rem",color:c}}>{n}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <p style={{fontWeight:600,marginBottom:16}}>Recent Activity Log</p>
              {liveFeed.map((f,i) => (
                <div className="feed-item" key={f._id || i}>
                  <div className="feed-dot" />
                  <div style={{fontSize:13}}>{f.donor} donated ₹{f.amount.toLocaleString()} to {f.family} · {f.createdAt ? new Date(f.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : f.time}</div>
                </div>
              ))}
              {liveFeed.length === 0 && <div style={{fontSize:13, color:"var(--muted)"}}>No recent activity found in database.</div>}
            </div>
          </>
        )}
        {activeTab === "verify" && (
          <>
            <h2 style={{fontFamily:"'Playfair Display',serif",marginBottom:24}}>Family Verifications</h2>
            <div style={{overflowX:"auto"}}>
              <table className="vtable">
                <thead>
                  <tr>
                    <th>Case ID</th><th>Name</th><th>Type</th><th>State</th><th>Docs</th><th>Status</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApps.map(v => (
                    <tr key={v._id || v.id}>
                      <td style={{color:"var(--saffron)",fontFamily:"monospace"}}>{v.applicationId || v.id}</td>
                      <td style={{fontWeight:500}}>{v.name}</td>
                      <td style={{color:"var(--muted)"}}>{v.type}</td>
                      <td>{v.state}</td>
                      <td>{v.docsUploaded ? `${v.docsUploaded}/${v.totalDocs}` : v.docs}</td>
                      <td><span className={`status-pill status-${v.status}`}>{v.status.charAt(0).toUpperCase()+v.status.slice(1)}</span></td>
                      <td>
                        <button style={{background:"none",border:"1px solid var(--border)",color:"var(--white)",padding:"4px 12px",borderRadius:6,fontSize:12,cursor:"pointer"}}>
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pendingApps.length === 0 && <div style={{padding:20, color:"var(--muted)"}}>No pending applications in database.</div>}
            </div>
          </>
        )}
        {(activeTab === "donations" || activeTab === "families" || activeTab === "flags") && (
          <div style={{textAlign:"center",paddingTop:80}}>
            <div style={{fontSize:48,marginBottom:16}}>🔧</div>
            <p style={{color:"var(--muted)"}}>This section is under construction in this prototype.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginPage({ setPage }) {
  const [tab, setTab] = useState("donor");
  const tabs = ["donor","family","ngo","admin"];
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  if (tab === "admin") return <AdminLogin onLogin={() => setPage("admin_dashboard")} />;
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 5%"}}>
      <div style={{width:"100%",maxWidth:460}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:36,marginBottom:12}}>🛡️</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.8rem",marginBottom:8}}>Welcome Back</h2>
          <p style={{color:"var(--muted)"}}>Sign in to your VeerSetu account</p>
        </div>
        <div className="tab-bar">
          {tabs.map(t => (
            <button key={t} className={`tab-btn${tab===t?" active":""}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        {tab === "admin" ? null : (
          <div className="card">
            <input className="input-field mb-16" placeholder="Email address" />
            <input className="input-field mb-16" type="password" placeholder="Password" />
            <button className="btn-primary" style={{width:"100%",justifyContent:"center",padding:14}}>
              Continue with Clerk Auth
            </button>
            <div style={{textAlign:"center",marginTop:16,fontSize:12,color:"var(--muted)"}}>
              Don't have an account? <span style={{color:"var(--saffron)",cursor:"pointer"}}>Register here</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{padding:"48px 5% 28px",borderTop:"1px solid var(--border)"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:32,marginBottom:36}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{fontSize:20}}>🛡</div>
            <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16}}>VeerSetu</span>
          </div>
          <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.8}}>Bridge of Honour — connecting India's defense families to the support they deserve.</p>
        </div>
        {[
          ["Platform",["Verified Families","Donate","Emergency Cases","Transparency"]],
          ["Support",["NGO Network","Volunteer","Cadet Welfare","Contact"]],
          ["Legal",["Privacy Policy","Terms","80G Certificate","Grievance"]],
        ].map(([heading, links]) => (
          <div key={heading}>
            <p style={{fontWeight:600,fontSize:13,marginBottom:12}}>{heading}</p>
            {links.map(l => <div key={l} style={{fontSize:13,color:"var(--muted)",marginBottom:7,cursor:"pointer"}}>{l}</div>)}
          </div>
        ))}
      </div>
      <div className="tricolor" style={{marginBottom:20}} />
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,fontSize:12,color:"var(--muted)"}}>
        <span>© 2025 VeerSetu. Built with ❤️ for India's defenders.</span>
        <span>Hackathon Prototype · Not a live financial service</span>
      </div>
    </footer>
  );
}

// ── Page Shell ─────────────────────────────────────────────────────────────
function HomePage({ setPage, heroes, liveFeed }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <div className="tricolor" />
      <StatsRow />
      <FamiliesSection setPage={setPage} heroes={heroes} />
      <EmergencySection setPage={setPage} heroes={heroes} />
      <TrainingSection />
      <TransparencySection liveFeed={liveFeed} />
      <NGOSection />
    </>
  );
}

// ── VeerBot AI Chatbot ─────────────────────────────────────────────────────
const SUGGESTIONS = ["How do I donate?","Who can register?","Cadet welfare info","Is my donation safe?"];

function nowTime() {
  return new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
}

function VeerBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role:"bot", text:"Jai Hind! 🇮🇳 I'm VeerBot, your guide on VeerSetu. How can I help you support our heroes' families today?", time: nowTime() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSugg, setShowSugg] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [msgs, loading]);

  function getReply(q) {
    const t = q.toLowerCase();
    // Donate / payment
    if (/donat|pay|contribut|give|fund|money|razorpay|amount/.test(t))
      return "To donate, click the 💛 Donate Now button or visit the Donation Portal from the navbar. You can choose from Education Sponsor, Medical Aid, Monthly Ration, or Emergency Relief — select an amount and pay via Razorpay (sandbox). You'll receive an 80G tax-exemption receipt by email. 🙏";
    // Register / sign up
    if (/register|sign.?up|join|enroll|how.*(i|to).*(family|families)/.test(t))
      return "Defense families can register by clicking Login → Family tab. You'll need to upload your Service ID, Martyr/Disability certificate, government ID proof, and pension documents. Our AI-OCR system extracts details automatically, and our admin team verifies within 48 hours. Once verified, you receive a ✓ Verified badge and become eligible for all support programs.";
    // Verification / documents
    if (/verif|document|upload|proof|certif|badge|ocr/.test(t))
      return "Verification requires 4 documents: (1) Service ID of the personnel, (2) Martyr certificate or medical disability report, (3) Government-issued photo ID of the applicant, (4) Pension/NOC letter. Our OCR auto-fills details and AI checks for duplicates. Average verification time is 48 hours. You'll be notified by email once approved.";
    // Cadet / training / NDA / IMA
    if (/cadet|nda|ima|ota|afa|ina|train|academy|officer/.test(t))
      return "VeerSetu's Cadet Welfare Initiative covers ex-cadets of NDA (Khadakwasla), IMA (Dehradun), OTA (Chennai), AFA (Hyderabad), and INA (Ezhimala) who were injured during training. Required documents include the Academy NOC and Medical Board report. Scroll to the Training Casualties Welfare section on the homepage for full details. 🎓";
    // Safety / trust / fraud
    if (/safe|trust|secure|fraud|fake|scam|legit|real/.test(t))
      return "VeerSetu uses multi-layer security: AI-based fraud detection flags suspicious or duplicate registrations, all documents are encrypted in storage, and every donation transaction is logged immutably on our blockchain transparency layer. 100% of your donation goes directly to the family — we charge zero platform fee. All financials are visible on the Public Transparency Dashboard.";
    // 80G / tax
    if (/80g|tax|exemption|receipt|deduct/.test(t))
      return "Yes! VeerSetu is registered for 80G tax exemption. Every donation above ₹500 automatically generates a receipt with your name, PAN, amount, and donation category. The receipt is emailed to you within 24 hours and is valid for income tax deduction filing under Section 80G of the Income Tax Act.";
    // Transparency / fund usage
    if (/transparent|fund|utiliz|allocation|where.*money|how.*used|dashboard/.test(t))
      return "Our Public Transparency Dashboard shows every rupee collected and disbursed in real time. Fund allocation: 38% Education, 27% Medical, 18% Ration, 12% Emergency Relief, 5% Admin. We maintain a 94% fund utilization rate with zero hidden charges. You can also view the live donation feed and state-wise support analytics anytime.";
    // NGO / volunteer
    if (/ngo|volunteer|legal|counsel|mentor|help.*family|support.*org/.test(t))
      return "NGOs and individuals can join the VeerSetu support network via the NGO Network page. Volunteers can offer legal aid, mental health counseling, education mentorship, or career guidance to verified families. NGO registration requires a valid 12A/80G certificate. We match volunteers with families based on location and need. 🤝";
    // Emergency
    if (/emergency|urgent|critical|immediate|crisis|asap/.test(t))
      return "Emergency cases are AI-flagged based on medical urgency, child education deadlines, and financial distress signals. These appear in the 🚨 Emergency Priority Cases section with a dedicated Emergency Donate button. Funds for emergency cases are disbursed within 24 hours of donation clearance.";
    // Contact / grievance
    if (/contact|grievan|complain|report|support|help/.test(t))
      return "You can reach the VeerSetu support team via the Contact & Support page (footer). For grievances related to verification delays, fund disputes, or fraudulent listings, use the Grievance link in the footer. NGOs on our network can also provide in-person assistance to families in their region.";
    // About / mission
    if (/about|mission|vision|what is|who are|veersetu|platform/.test(t))
      return "VeerSetu — meaning 'Bridge of Honour' — is a national welfare-tech platform connecting India's defense families, veterans, and training casualties with transparent, verified financial and social support. Built for hackathon BuildVerse, it's designed to scale into a real social-impact startup. Every family on the platform is verified by our admin team before appearing publicly.";
    // Greetings
    if (/^(hi|hello|hey|jai hind|namaste|hola|good\s*(morning|evening|day))/.test(t))
      return "Jai Hind! 🇮🇳 Welcome to VeerSetu. I'm VeerBot, here to guide you through donating, registering your family, or learning about our welfare programs. How can I help you honour our heroes today?";
    // Thank you
    if (/thank|thanks|shukriya|dhanyavad|great|awesome|good bot/.test(t))
      return "It's an honour to help! 🙏 Every act of support — big or small — makes a real difference to our heroes' families. Is there anything else you'd like to know about VeerSetu?";
    // Pension
    if (/pension|arrear|delay|govt|government|ministry/.test(t))
      return "VeerSetu complements government pension schemes — we don't replace them. If a family is facing pension delays, our empanelled legal volunteers (accessible via the NGO Network) can help with paperwork and follow-up with the relevant Sainik Welfare Board or PCDA (Pensions) office.";
    // Default fallback
    const fallbacks = [
      "That's a great question! VeerSetu covers donations, family verification, cadet welfare, NGO support, and full fund transparency. Could you tell me more about what you're looking for — donating, registering a family, or something else? 🛡️",
      "I want to make sure I give you the right answer! Are you a donor looking to contribute, a defense family wanting to register, or an NGO/volunteer wanting to join our network?",
      "I'm best equipped to help with VeerSetu-related queries — donations, family registration, verification, cadet welfare, and transparency. Try asking something like 'How do I donate?' or 'What documents does a family need?' 🇮🇳",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  async function send(text) {
    const q = (text || input).trim();
    if (!q) return;
    setInput("");
    setShowSugg(false);
    const userMsg = { role:"user", text:q, time:nowTime() };
    setMsgs(prev => [...prev, userMsg]);
    setLoading(true);
    // Simulate a brief thinking delay for realism
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
    const reply = getReply(q);
    setMsgs(prev => [...prev, { role:"bot", text:reply, time:nowTime() }]);
    setLoading(false);
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div className="chat-header-info">
              <div className="chat-header-name">VeerBot</div>
              <div className="chat-header-status">
                <span style={{width:6,height:6,borderRadius:"50%",background:"var(--green2)",display:"inline-block"}} />
                AI Assistant · Always here
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{background:"none",border:"none",color:"var(--muted)",fontSize:18,cursor:"pointer",padding:4}}>✕</button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div className="msg-bubble">{m.text}</div>
                <div className="msg-time">{m.time}</div>
              </div>
            ))}
            {loading && (
              <div className="msg bot">
                <div className="msg-bubble" style={{display:"flex",gap:5,alignItems:"center",padding:"12px 16px"}}>
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {showSugg && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="chat-sugg" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-row">
            <textarea
              className="chat-input"
              rows={1}
              placeholder="Ask me anything about VeerSetu…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); send(); } }}
            />
            <button className="chat-send" onClick={() => send()} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button className={`chat-fab${open?" open":""}`} onClick={() => setOpen(v => !v)} title="Chat with VeerBot">
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}

// ── Application Core ───────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  
  // Backend integrated data states
  const [dbHeroes, setDbHeroes] = useState([]);
  const [liveDonations, setLiveDonations] = useState([]);
  const [pendingApps, setPendingApps] = useState([]);

  // Fetch API data on load
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const res = await fetch('https://veersetu.onrender.com/api/heroes');
        if(res.ok) setDbHeroes(await res.json());
      } catch(e) { console.error("Heroes fetch failed", e); }
    };
    
    const fetchDonations = async () => {
      try {
        const res = await fetch('https://veersetu.onrender.com/api/donations/live');
        if(res.ok) setLiveDonations(await res.json());
      } catch(e) { console.error("Donations fetch failed", e); }
    };

    const fetchApps = async () => {
      try {
        const res = await fetch('https://veersetu.onrender.com/api/admin/applications');
        if(res.ok) setPendingApps(await res.json());
      } catch(e) { console.error("Applications fetch failed", e); }
    };

    fetchHeroes();
    fetchDonations();
    fetchApps();
  }, []);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo({top:0, behavior:"smooth"}); }, [page]);

  const isAdmin = page === "admin_dashboard";

  return (
    <>
      <GlobalStyle />
      {!isAdmin && (
        <Navbar page={page} setPage={setPage} scrolled={scrolled} theme={theme} toggleTheme={toggleTheme} />
      )}
      <main style={{paddingTop: isAdmin ? 0 : 68}}>
        {page === "home" && <HomePage setPage={setPage} heroes={dbHeroes} liveFeed={liveDonations} />}
        {page === "families" && (
          <>
            <section style={{padding:"60px 5% 0"}} className="fade-up">
              <div className="section-tag">All Verified Families</div>
              <h1 className="section-title mb-32">Defense Families Registry</h1>
            </section>
            <FamiliesSection setPage={setPage} heroes={dbHeroes} />
            <TrainingSection />
          </>
        )}
        {page === "donate" && (
          <>
            <section style={{padding:"60px 5% 0"}} className="fade-up">
              <div className="section-tag">Secure Giving</div>
              <h1 className="section-title">Donation Portal</h1>
            </section>
            <DonateSection />
          </>
        )}
        {page === "emergency" && <EmergencySection setPage={setPage} heroes={dbHeroes} />}
        {page === "ngo_network" && <NGOSection />}
        {page === "transparency" && <TransparencySection liveFeed={liveDonations} />}
        {page === "mission" && (
          <section className="section fade-up" style={{maxWidth:700,margin:"0 auto",padding:"80px 5%"}}>
            <div className="section-tag">Our Mission</div>
            <h1 className="section-title mb-24">Why VeerSetu Exists</h1>
            <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.9,marginBottom:20}}>
              Over 25,000 defense personnel families struggle silently after losing their breadwinners to sacrifice or injury. Pension delays, bureaucratic hurdles, and lack of awareness leave them financially vulnerable.
            </p>
            <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.9,marginBottom:20}}>
              VeerSetu — meaning "Bridge of Honour" — is built to be that bridge. A transparent, verified, technology-driven platform that ensures every donation reaches the right family, every document is verified, and every act of giving is accounted for publicly.
            </p>
            <div className="ribbon mt-32">
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",fontStyle:"italic"}}>
                "The nation that forgets its defenders will itself be forgotten."
              </p>
              <p style={{fontSize:12,color:"var(--muted)",marginTop:8}}>— Guiding principle of VeerSetu</p>
            </div>
          </section>
        )}
        {page === "login" && <LoginPage setPage={setPage} />}
        {page === "admin_dashboard" && <AdminDashboard onLogout={() => setPage("home")} liveFeed={liveDonations} pendingApps={pendingApps} />}
      </main>
      {!isAdmin && page !== "login" && <Footer setPage={setPage} />}
      {!isAdmin && <VeerBot />}
    </>
  );
}