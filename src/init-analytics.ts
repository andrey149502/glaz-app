declare var window;
declare var ga;
export function initAnalytics() {
  window.ga =
    window.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga("create", "UA-96455420-2", "auto");
  // Modifications:
  ga("set", "checkProtocolTask", null); // Disables file protocol checking.
  ga("send", "pageview", "/popup"); // Set page, avoiding rejection due to chrome-extension protocol
}
