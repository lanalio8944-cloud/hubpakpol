export default function AdBlockNotice() {
  return (
    <div className="site-notice" role="alert">
      <div className="site-notice-icon" aria-hidden="true">⚠️</div>
      <div className="site-notice-body">
        <strong>Ad blocker terdeteksi.</strong>
        <p>
          Mohon matikan ad blocker atau whitelist situs ini. Iklan membantu kami
          tetap online dan menyediakan halaman ini secara gratis.
        </p>
      </div>
    </div>
  );
}
