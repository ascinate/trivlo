"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoShieldLock } from "react-icons/go";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  const languages = ["English", "Arabic", "French", "German", "Spanish"];

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setLoginError(err.message || "Invalid email or password");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const stats = [
    { icon: "bi-journal-bookmark", value: "12.4K+", label: "Total Bookings", color: "#FEF3EB", iconColor: "#D36C45" },
    { icon: "bi-people", value: "8.6K+", label: "Happy Customers", color: "#E9F4EE", iconColor: "#1E6C45" },
    { icon: "bi-geo-alt", value: "45+", label: "Destinations", color: "#FEF7ED", iconColor: "#B97C2B" },
    { icon: "bi-airplane", value: "120+", label: "Travel Partners", color: "#EBF3E8", iconColor: "#112E24" },
  ];

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          background-color: var(--light);
          font-family: var(--font-outfit), var(--font-inter), system-ui, sans-serif;
        }
        .login-topbar {
          position: relative;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: start;
          justify-content: space-between;
          padding: 2rem 2rem 0 2rem;
          background: transparent;
        }
        .login-brand h2 {
          font-size: 1.45rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 1px;
          margin: 0;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-shadow: 0 2px 12px rgba(0,0,0,0.18);
        }
        .login-brand p {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.7);
          margin: 0.2rem 0 0 0;
          font-weight: 600;
        }
        .login-topbar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-bottom: 1.2rem;
        }
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          border: solid 1px #e9e9e9;
          border-radius: 10px;
          padding: 0.45rem 0.9rem;
          font-size: 0.85rem;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.2s;
        }
        .lang-btn:hover { background: rgba(255,255,255,0.22); }
        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(17,46,36,0.1);
          min-width: 140px;
          overflow: hidden;
          z-index: 200;
          animation: dropdownFadeIn 0.18s ease-out;
        }
        .lang-option {
          padding: 0.6rem 1rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--dark);
          cursor: pointer;
          transition: background 0.15s;
        }
        .lang-option:hover, .lang-option.active-lang {
          background: var(--primary-active);
          color: var(--primary-active-text);
          font-weight: 600;
        }
        .theme-btn-login {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: solid 1px #e9e9e9;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .theme-btn-login:hover { background: rgba(255,255,255,0.22); }
        .login-layout {
          display: grid;
          grid-template-columns: 1fr 650px;
          min-height: 100vh;
        }
        .login-hero {
          position: relative;
          overflow: hidden;
          background-color: #112E24;
        }
        .login-hero-bg {
          position: absolute; inset: 0;
          background-image: url('/images/login_hero.jpg');
          background-size: cover;
          background-position: center;
        }
        .login-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            135deg,
            rgba(17,46,36,0.6) 0%,
            rgba(17,46,36,0.25) 55%,
            rgba(0,0,0,0.15) 100%
          );
        }
        .login-hero-content {
          position: relative; z-index: 2;
          padding: 1rem 3rem 3rem 2rem;
          display: flex; flex-direction: column;
          height: 100%;
        }
        .login-hero-headline { margin-top: 2rem; }
        .login-hero-headline h1 {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 500;
          color: #FFFFFF;
          line-height: 1.15;
          margin: 0 0 0.25rem 0;
          text-shadow: 0 2px 16px rgba(0,0,0,0.2);
        }
        .login-hero-headline .accent {
          color: #ffc107;
          display: block;
        }
        .login-hero-divider {
          width: 40px; height: 3px;
          background: #F8EFE4;
          border-radius: 2px;
          margin: 1rem 0;
          opacity: 0.9;
        }
        .login-hero-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.6;
          max-width: 380px;
          font-weight: 400;
          margin: 0;
        }
        .hero-stats-card {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 20px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.25rem;
          margin-top: 9rem;
        }
        .hero-stat-item {
          display: flex; flex-direction: column;
          align-items: center; text-align: center; gap: 0.5rem;
        }
        .hero-stat-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; flex-shrink: 0;
        }
        .hero-stat-value {
          font-size: 1.1rem; font-weight: 500;
          color: #FFFFFF; line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
          text-align: center; line-height: 1.3;
        }
        .hero-testimonial {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 16px;
          padding: 1rem 1.25rem;
          display: flex; align-items: flex-start; gap: 1rem;
        }
        .hero-testimonial-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.3);
          flex-shrink: 0;
        }
        .hero-testimonial-quote {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.88);
          font-style: italic;
          line-height: 1.5;
          margin: 0 0 0.3rem 0;
        }
        .hero-testimonial-name {
          font-size: 0.72rem; font-weight: 700;
          color: #FFFFFF; margin: 0;
        }
        .hero-testimonial-stars { display: flex; gap: 2px; margin-top: 0.2rem; }
        .hero-testimonial-stars i { color: #F0C040; font-size: 0.72rem; }
        .login-form-panel {
          background-color: var(--card-bg);
          display: flex; flex-direction: column;
          overflow-y: auto;
          padding: 5rem 3rem 1rem 5rem;
          border-left: 1px solid var(--border);
        }
        .login-form-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 572px;
          width: 100%;
          margin: 0 0 0 auto;
          border: solid 1px #e9e9e9;
          border-radius: 8px;
          padding: 48px ;
        }
        .login-form-title {
          font-size: 1.55rem; font-weight: 600;
          color: var(--dark); margin: 0 0 0.2rem 0; line-height: 1.2;
        }
        .login-form-subtitle {
          font-size: 0.88rem; color: var(--secondary);
          font-weight: 400; margin: 0 0 2rem 0;
        }
        .login-label {
          font-size: 0.82rem; font-weight: 600;
          color: var(--dark); margin-bottom: 0.4rem; display: block;
        }
        .login-input-wrap { position: relative; margin-bottom: 1.25rem; }
        .login-input-icon {
          position: absolute; left: 0.9rem; top: 50%;
          transform: translateY(-50%);
          color: var(--secondary); font-size: 0.95rem;
          opacity: 0.6; pointer-events: none;
        }
        .login-input {
          width: 100%;
          background-color: var(--light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.72rem 1rem 0.72rem 2.5rem;
          font-size: 0.9rem; color: var(--dark);
          font-family: inherit;
          transition: all 0.2s ease; outline: none;
        }
        .login-input::placeholder { color: var(--secondary); opacity: 0.55; font-size: 0.88rem; }
        .login-input:focus {
          border-color: var(--primary);
          background-color: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(17,46,36,0.07);
        }
        .login-input-eye {
          position: absolute; right: 0.9rem; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: var(--secondary); font-size: 1rem;
          cursor: pointer; padding: 0; opacity: 0.6; transition: opacity 0.2s;
        }
        .login-input-eye:hover { opacity: 1; }
        .login-pwd-row {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 0.4rem;
        }
        .forgot-link {
          font-size: 0.8rem; font-weight: 700;
          color: var(--primary); text-decoration: none; transition: opacity 0.2s;
        }
        .forgot-link:hover { opacity: 0.75; text-decoration: underline; }
        .remember-row {
          display: flex; align-items: center;
          gap: 0.5rem; margin-bottom: 1.5rem;
        }
        .login-checkbox {
          width: 16px; height: 16px;
          border-radius: 4px;
          border: 1.5px solid var(--border);
          cursor: pointer; accent-color: var(--primary);
        }
        .remember-label { font-size: 0.83rem; color: var(--dark); font-weight: 500; cursor: pointer; }
        .login-submit-btn {
          width: 100%;
          background-color: var(--primary);
          color: #FFFFFF; border: none;
          border-radius: 12px;
          padding: 0.8rem 1.5rem;
          font-size: 1rem; font-weight: 500;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          cursor: pointer; transition: all 0.2s ease; font-family: inherit;
        }
        .login-submit-btn:hover {
          background-color: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(17,46,36,0.2);
        }
        .login-submit-btn:active { transform: translateY(0); }
        .login-divider {
          display: flex; align-items: center; gap: 0.75rem;
          margin: 1.5rem 0;
          color: var(--secondary); font-size: 0.8rem; font-weight: 500; opacity: 0.7;
        }
        .login-divider::before, .login-divider::after {
          content: ''; flex: 1; height: 1px; background-color: var(--border);
        }
        .social-btn {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          border: 1px solid var(--border);
          background-color: #FFFFFF;
          border-radius: 12px;
          padding: 0.65rem 1rem;
          font-size: 0.85rem; font-weight: 600;
          color: var(--dark); cursor: pointer;
          transition: all 0.2s ease; font-family: inherit; text-decoration: none;
        }
        .social-btn:hover {
          background-color: #F8F5EE;
          border-color: var(--secondary);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(17,46,36,0.05);
        }
        .social-btn svg { width: 18px; height: 18px; flex-shrink: 0; }
        .login-security-badge {
          background-color: var(--light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex; align-items: center; gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .login-security-badge svg { color: var(--primary); width: 28px; height: 28px; opacity: 0.7; flex-shrink: 0; }
        .login-security-badge p { font-size: 0.95rem; color: var(--secondary); margin: 0; line-height: 1.4; }
        .login-signup-row {
          text-align: center; margin-top: 1.5rem;
          font-size: 0.85rem; color: var(--secondary); font-weight: 500;
        }
        .login-signup-row a { font-weight: 700; color: var(--primary); text-decoration: none; transition: opacity 0.2s; }
        .login-signup-row a:hover { opacity: 0.75; text-decoration: underline; }
        .login-panel-footer {
          text-align: center; padding-top: 1.5rem;
          font-size: 0.75rem; color: var(--secondary); opacity: 0.65;
        }
        @media (max-width: 1440px) {
          .login-layout { grid-template-columns: 1fr 700px; }
          .login-hero-headline h1 { font-size: clamp(2rem, 3.5vw, 2.5rem); }
          .login-form-panel { padding: 2rem 2.5rem 2rem 2.5rem; }
        }
        @media (max-width: 1200px) {
          .login-layout { grid-template-columns: 1fr 500px; }
          .login-hero-content { padding: 6rem 2rem 2.5rem 2rem; }
          .login-form-panel { padding: 4rem 2rem 2rem 2rem; }
          .hero-testimonial.col-lg-7 { width: 100%; }
        }
        @media (max-width: 991.98px) {
          .login-layout { grid-template-columns: 1fr; }
          .login-hero { min-height: auto; display: block; }
          .login-hero-content { padding: 6rem 2rem 2.5rem 2rem; min-height: auto; }
          .login-form-panel { padding: 3rem 2rem 2rem 2rem; border-left: none; border-top: 1px solid var(--border); }
          .login-topbar { padding: 1rem 1.5rem; }
        }
        @media (max-width: 768px) {
          .login-hero-headline h1 { font-size: 2.2rem; }
          .login-hero-content { padding: 5rem 1.5rem 2rem 1.5rem; }
          .login-form-panel { padding: 2.5rem 1.5rem 2rem 1.5rem; }
        }
        @media (max-width: 575.98px) {
          .login-form-panel { padding: 2rem 1.25rem; }
          .login-hero-content { padding: 5rem 1.25rem 2rem 1.25rem; }
          .login-topbar { padding: 0.85rem 1.25rem; }
          .login-brand h2 { font-size: 1.15rem; }
          .hero-stats-card { padding: 1rem; }
        }
        @media (max-width: 375px) {
          .login-form-title { font-size: 1.35rem; }
          .login-hero-headline h1 { font-size: 1.75rem; }
          .login-form-inner { padding: 15px; }
          .login-input { padding: 0.65rem 1rem 0.65rem 2.2rem; font-size: 0.85rem; }
          .social-btn { font-size: 0.75rem; padding: 0.5rem 0.5rem; }
          .social-btn svg { width: 14px; height: 14px; }
          .login-submit-btn { padding: 0.7rem 1.2rem; }
          .hero-stat-value { font-size: 1.1rem; }
          .hero-stat-label { font-size: 0.6rem; }
          .hero-stat-icon-wrap { width: 36px; height: 36px; font-size: 1rem; }
          .login-brand p { font-size: 0.55rem; }
        }
        [data-bs-theme="dark"] .login-form-panel { background-color: var(--card-bg); border-color: var(--border); }
        [data-bs-theme="dark"] .login-input { background-color: #162921; border-color: var(--border); color: var(--dark); }
        [data-bs-theme="dark"] .login-input:focus { background-color: #1d362c; box-shadow: 0 0 0 3px rgba(17,46,36,0.3); }
        [data-bs-theme="dark"] .social-btn { background-color: #162921; border-color: var(--border); color: var(--dark); }
        [data-bs-theme="dark"] .social-btn:hover { background-color: #1d362c; }
        [data-bs-theme="dark"] .login-security-badge { background-color: var(--card-bg); border-color: var(--border); }
        [data-bs-theme="dark"] .login-form-title { color: var(--dark); }
        [data-bs-theme="dark"] .login-label { color: var(--dark); }
        [data-bs-theme="dark"] .remember-label { color: var(--dark); }
        [data-bs-theme="dark"] .lang-dropdown { background-color: var(--card-bg); border-color: var(--border); }
        [data-bs-theme="dark"] .lang-option { color: var(--dark); }
        [data-bs-theme="dark"] .lang-option:hover { background: rgba(255,255,255,0.05); color: #fff; }
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="login-page">


        {/* Two-column layout */}
        <div className="login-layout">

          {/* Left Hero Panel */}
          <div className="login-hero">
            <div className="login-topbar">
              <div className="login-brand">
                <h2>
                  <Image src="/images/logo-login.svg" alt="Logo" width={140} height={43} />
                </h2>
                <p>Travel CRM &amp; Booking Management</p>
              </div>

            </div>

            <div className="login-hero-bg"></div>
            <div className="login-hero-overlay"></div>

            <div className="login-hero-content">
              <div className="login-hero-headline">
                <h1>
                  Smart Travel.
                  <span className="accent">Stronger Business.</span>
                </h1>
                <div className="login-hero-divider"></div>
                <p className="login-hero-desc">
                  All-in-one Travel CRM to manage inquiries, bookings,
                  customers, itineraries and grow your travel business.
                </p>
              </div>

              <div>
                <div className="hero-stats-card col-lg-10">
                  <div className="row g-3">
                    {stats.map((s) => (
                      <div key={s.label} className="col-6 col-sm-3">
                        <div className="hero-stat-item">
                          <div
                            className="hero-stat-icon-wrap"
                            style={{ backgroundColor: s.color, color: s.iconColor }}
                          >
                            <i className={`bi ${s.icon}`}></i>
                          </div>
                          <div className="hero-stat-value">{s.value}</div>
                          <div className="hero-stat-label">{s.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero-testimonial col-lg-7">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/john-smith.png"
                    alt="Alex Morgan avatar"
                    className="hero-testimonial-avatar"
                  />
                  <div>
                    <p className="hero-testimonial-quote">
                      &ldquo;Trivlo has completely transformed the way we manage our travel business.&rdquo;
                    </p>
                    <p className="hero-testimonial-name">— Alex Morgan, Travelife Holidays</p>
                    <div className="hero-testimonial-stars">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <i key={n} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="login-form-panel">

            <div className="login-topbar-right">
              <div className="position-relative">
                <button
                  className="lang-btn"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  aria-expanded={showLangDropdown}
                  aria-label="Select language"
                >
                  <i className="bi bi-globe2"></i>
                  <span>{language}</span>
                  <i className="bi bi-chevron-down" style={{ fontSize: "0.7rem", opacity: 0.8 }}></i>
                </button>

                {showLangDropdown && (
                  <div className="lang-dropdown">
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        className={`lang-option ${lang === language ? "active-lang" : ""}`}
                        onClick={() => { setLanguage(lang); setShowLangDropdown(false); }}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="theme-btn-login" onClick={toggleTheme} aria-label="Toggle theme">
                <i className={`bi ${isDarkMode ? "bi-moon-fill" : "bi-moon"}`}></i>
              </button>
            </div>
            <div className="login-form-inner">

              <div className="position-relative mb-2" style={{ paddingRight: "2.5rem" }}>
                <h1 className="login-form-title">Welcome back 👋</h1>
                <p className="login-form-subtitle">Sign in to continue to Trivlo</p>
                <i
                  className="bi bi-send"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%) rotate(35deg)",
                    fontSize: "2rem",
                    color: "var(--primary)",
                    opacity: 0.07
                  }}
                ></i>
              </div>

              <form onSubmit={handleSubmit}>

                {loginError && (
                  <div className="alert alert-danger d-flex align-items-center py-2 px-3 mb-3" role="alert" style={{ fontSize: "0.85rem", borderRadius: "10px" }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {loginError}
                  </div>
                )}
                {/* Email */}
                <div>
                  <label htmlFor="login-email" className="login-label">
                    Email address
                  </label>
                  <div className="login-input-wrap">
                    <i className="bi bi-person login-input-icon"></i>
                    <input
                      id="login-email"
                      type="email"
                      className="login-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="login-pwd-row">
                    <label htmlFor="login-password" className="login-label mb-0">
                      Password
                    </label>
                    <Link href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                      Forgot password?
                    </Link>
                  </div>
                  <div className="login-input-wrap">
                    <i className="bi bi-lock login-input-icon"></i>
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      className="login-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      style={{ paddingRight: "2.5rem" }}
                      required
                    />
                    <button
                      type="button"
                      className="login-input-eye"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="remember-row">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="login-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="remember-label">
                    Remember me
                  </label>
                </div>

                <button type="submit" className="login-submit-btn" id="login-submit" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="login-divider">or continue with</div>

              <div className="d-flex gap-2">
                <button className="social-btn" type="button" id="login-google" aria-label="Sign in with Google">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>

                <button className="social-btn" type="button" id="login-microsoft" aria-label="Sign in with Microsoft">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#F35325" d="M11 11H0V0h11v11z" />
                    <path fill="#81BC06" d="M24 11H13V0h11v11z" />
                    <path fill="#05A6F0" d="M11 24H0V13h11v11z" />
                    <path fill="#FFBA08" d="M24 24H13V13h11v11z" />
                  </svg>
                  Microsoft
                </button>

                <button className="social-btn" type="button" id="login-apple" aria-label="Sign in with Apple">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.28-2.18 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.87M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
                  </svg>
                  Apple
                </button>
              </div>

              <div className="login-security-badge">
                <GoShieldLock />
                <p>Your data is secure with enterprise-grade <br /> encryption and 24/7 protection.</p>
              </div>





            </div>

            <div className="login-signup-row">
              Don&apos;t have an account?{" "}
              <Link href="#" onClick={(e) => e.preventDefault()}>
                Contact our team
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
