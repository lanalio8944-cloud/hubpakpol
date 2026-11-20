export default function AdSlot() {
  return (
    <div className="ad-slot">
      <div className="ad-label">Iklan</div>
      <div
        className="ad-inner"
        dangerouslySetInnerHTML={{ __html: "<div ta-ad-container></div>" }}
      />
    </div>
  );
}
