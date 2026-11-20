export type AdBlockStatus = "detected" | "not-detected" | "unknown";

export async function detectAdBlock(): Promise<AdBlockStatus> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "unknown";
  }
  if (!document.body) return "unknown";

  const bait = document.createElement("div");
  bait.className =
    "ad-banner adsbox ad-unit pub_300x250 pub_300x250m pub_728x90 " +
    "text-ad textAd text_ad text_ads text-ads text-advertisement ad-placement";
  bait.setAttribute("data-ad-bait", "true");
  bait.style.cssText =
    "position:absolute;left:-10000px;top:-10000px;" +
    "width:10px;height:10px;pointer-events:none;";
  bait.innerHTML = "&nbsp;";

  const isBlocked = (): boolean => {
    try {
      if (!bait.isConnected) return true;

      const style = window.getComputedStyle(bait);

      if (bait.offsetWidth === 0 || bait.offsetHeight === 0) return true;
      if (style.display === "none") return true;
      if (style.visibility === "hidden") return true;

      const opacity = parseFloat(style.opacity);
      if (!Number.isNaN(opacity) && opacity === 0) return true;

      return false;
    } catch {
      return false;
    }
  };

  try {
    document.body.appendChild(bait);

    await new Promise((r) => setTimeout(r, 150));
    if (isBlocked()) return "detected";

    await new Promise((r) => setTimeout(r, 500));
    if (isBlocked()) return "detected";

    return "not-detected";
  } catch {
    return "unknown";
  } finally {
    try {
      if (bait.parentNode) bait.remove();
    } catch {
      /* noop */
    }
  }
}
