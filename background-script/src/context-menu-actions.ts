export function openBookmark(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
    chrome.bookmarks.get(info.menuItemId, foundBookmark => {
        var url = foundBookmark[0].url;
        window.open(url, "_blank");
    });
}

export function quickAddBookmark(result: chrome.tabs.Tab) {
    chrome.bookmarks.search({ title: bookmarksFolder }, resultValue => {
        createBookmarksFolderIfNonExistent();
        createBookmark(resultValue[0].id, <string>result.title, <string>result.url);
    });
}