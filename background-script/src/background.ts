import * as backgroundService from "./background.service";
let activeTab: chrome.tabs.TabActiveInfo;

chrome.runtime.onInstalled.addListener(() => {
    backgroundService.initializeContextMenu();
});

chrome.runtime.onStartup.addListener(() => {
    backgroundService.initializeContextMenu();
});

chrome.tabs.onActivated.addListener(activeInfo => {
    //backgroundService.setActiveTab(activeInfo);
    console.log("activated");
    activeTab = activeInfo;

    chrome.tabs.get(activeInfo.tabId, result => {
        backgroundService.toggleAddOrRemoveBookmarkButton(result.url);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("update");
    if (activeTab.tabId == tabId && changeInfo.status == "complete") {
        chrome.tabs.get(tabId, result => {
            backgroundService.toggleAddOrRemoveBookmarkButton(result.url);
        });
    }
});

chrome.bookmarks.onChanged.addListener(
    (id: string, changeInfo: chrome.bookmarks.BookmarkChangeInfo) => {
        backgroundService.updateContextMenuBookmark(id, changeInfo);
    }
);

chrome.bookmarks.onCreated.addListener(
    (id: string, bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode) => {
        backgroundService.addBookmarkToContextMenu(
            id,
            <string>bookmarkTreeNode.parentId,
            bookmarkTreeNode.title
        );
    }
);

chrome.bookmarks.onRemoved.addListener(
    (id: string, removeInfo: chrome.bookmarks.BookmarkRemoveInfo) => {
        backgroundService.removeBookmarkFromContextMenu(id);
    }
);
