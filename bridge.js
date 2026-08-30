(() => {
  "use strict";
  window.addEventListener("message", async event => {
    const msg = event.data;
    if (!msg || msg.source !== "celarys-dex-main" || msg.op !== "move-meta-request") return;

    try {
      const data = await chrome.runtime.sendMessage({
        op: "get-move-meta",
        ids: Array.isArray(msg.ids) ? msg.ids : []
      });

      window.postMessage({
        source: "celarys-dex-bridge",
        op: "move-meta-response",
        data: data || {}
      }, "*");
    } catch (err) {
      console.warn("[Celarys Dex bridge]", err);
    }
  });
})();