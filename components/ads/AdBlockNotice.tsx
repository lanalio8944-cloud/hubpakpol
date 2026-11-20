"use client";

import { useEffect, useState } from "react";

/**
 * ============================================================
 *  URL tujuan redirect jika user membiarkan adblock aktif
 *  lebih dari COUNTDOWN_SECONDS.
 * ============================================================
 */
const REDIRECT_URL = "https://www.vidnesia.web.id";

/**
 *  Durasi countdown sebelum redirect (detik).
 */
const COUNTDOWN_SECONDS = 30;

export default function AdBlockNotice() {
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);

  // Kunci scroll + matikan interaksi konten di belakang
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const app = document.querySelector<HTMLElement>(".app");
    const prevInert = app?.hasAttribute("inert") ?? false;

    document.body.style.overflow = "hidden";
    if (app && !prevInert) app.setAttribute("inert", "");

    return () => {
      document.body.style.overflow = prevOverflow;
      if (app && !prevInert) app.removeAttribute("inert");
    };
  }, []);

  // Countdown + redirect otomatis
  useEffect(() => {
    const deadline = Date.now() + COUNTDOWN_SECONDS * 1000;

    const interval = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(left);

      if (left <= 0) {
        clearInterval(interval);
        window.location.href = REDIRECT_URL;
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="site-gate"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="site-gate-title"
    >
      <div className="site-gate-inner">
        <div className="site-gate-icon" aria-hidden="true">🙏</div>

        <h2 id="site-gate-title" className="site-gate-title">
          Sebentar, kami butuh bantuan Anda
        </h2>

        <p className="site-gate-text">
          Halaman ini <strong>100% gratis</strong> — tanpa langganan, tanpa
          meminta data Anda. Kami hanya bisa tetap online karena iklan di
          halaman ini.
        </p>

        <ul className="site-gate-reasons">
          <li>
            <span aria-hidden="true">⚡</span> Biaya server, domain, dan
            bandwidth kami tanggung sendiri
          </li>
          <li>
            <span aria-hidden="true">🔒</span> Tidak ada penjualan data, tidak
            ada iklan yang mengganggu
          </li>
          <li>
            <span aria-hidden="true">💛</span> Ad blocker Anda memblokir
            satu-satunya sumber pemasukan kami
          </li>
        </ul>

        <p className="site-gate-text">
          Cukup <strong>matikan ad blocker Anda sebentar</strong> — hanya
          butuh 3 detik. Halaman ini akan terbuka otomatis begitu ad blocker
          dinonaktifkan.
        </p>

        <button
          type="button"
          className="site-gate-btn"
          onClick={() => window.location.reload()}
        >
          Saya sudah mematikan — Lanjutkan
        </button>

        <p className="site-gate-hint">
          <strong>Cara:</strong> klik ikon ad blocker di kanan atas browser →
          pilih <em>&quot;Pause di situs ini&quot;</em> atau{" "}
          <em>&quot;Whitelist&quot;</em> → kembali ke halaman ini.
        </p>

        <div className="site-gate-countdown" aria-live="polite">
          <span className="site-gate-countdown-num">{remaining}</span>
          <span className="site-gate-countdown-label">
            detik lagi — Anda akan dialihkan ke halaman lain jika ad blocker
            tetap aktif
          </span>
        </div>
      </div>
    </div>
  );
}
