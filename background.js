
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    // Ignore navigation inside frames.
    if (details.frameId !== 0) {
        return;
    }

    const url = new URL(details.url);

    // Only modify Google search result URLs.
    if (!/^www\.google\.(com|com\.au)$/.test(url.hostname) &&
        !/^google\.(com|com\.au)$/.test(url.hostname)) {
        return;
    }

    if (url.pathname !== "/search") {
        return;
    }

    // Get the current search query.
    const query = url.searchParams.get("q");

    if (!query) {
        return;
    }

    // Avoid repeatedly appending the suffix.
    if (query.endsWith(" -ai")) {
        return;
    }

    // Add the suffix and navigate to the modified URL.
    url.searchParams.set("q", query + " -ai");

    chrome.tabs.update(details.tabId, {
        url: url.toString()
    });
});