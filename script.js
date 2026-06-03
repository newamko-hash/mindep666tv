export default {
  async fetch(request) {

    const ua = (request.headers.get("user-agent") || "").toLowerCase();

    // IPTV Player yang diizinkan
    const allowedApps = [
      "ott navigator",
      "ottnavigator",
      "tivimate"
    ];

    // Windows browser
    const isWindows = ua.includes("windows");

    // IPTV app
    const isAllowedApp = allowedApps.some(app => ua.includes(app));

    // Android/iOS
    const isMobile =
      ua.includes("android") ||
      ua.includes("iphone") ||
      ua.includes("ipad") ||
      ua.includes("ipod");

    // Tolak mobile kecuali OTT Navigator / TiviMate
    if (isMobile && !isAllowedApp) {
      return new Response("403 Forbidden", {
        status: 403,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }

    // Hanya Windows atau IPTV app
    if (!isWindows && !isAllowedApp) {
      return new Response("403 Forbidden", {
        status: 403,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }

    const githubUrl =
      "https://raw.githubusercontent.com/newamko-hash/mindep666tv/main/mindepcobacobatv.m3u";

    const response = await fetch(githubUrl);

    return new Response(response.body, {
      headers: {
        "Content-Type": "application/x-mpegURL",
        "Cache-Control": "no-cache"
      }
    });
  }
}
