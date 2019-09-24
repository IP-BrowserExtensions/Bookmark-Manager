import * as helper from "./helper";

let activeTab: chrome.tabs.TabActiveInfo;

chrome.runtime.onInstalled.addListener(() => {
    helper.initializeContextMenu();
});

chrome.runtime.onStartup.addListener(() => {
    helper.initializeContextMenu();
});

chrome.tabs.onActivated.addListener(activeInfo => {
    activeTab = activeInfo;
    chrome.tabs.get(activeInfo.tabId, result => {
        helper.toggleAddOrRemoveBookmarkButton(result.url);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (activeTab.tabId == tabId && changeInfo.status == "complete") {
        chrome.tabs.get(tabId, result => {
            helper.toggleAddOrRemoveBookmarkButton(result.url);
        });
    }
});

chrome.bookmarks.onChanged.addListener(
    (id: string, changeInfo: chrome.bookmarks.BookmarkChangeInfo) => {
        helper.updateContextMenuBookmark(id, changeInfo);
    }
);

chrome.bookmarks.onCreated.addListener(
    (id: string, bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode) => {
        helper.createBookmarkNode(id, <string>bookmarkTreeNode.parentId, bookmarkTreeNode.title);
    }
);

chrome.bookmarks.onRemoved.addListener(
    (id: string, removeInfo: chrome.bookmarks.BookmarkRemoveInfo) => {
        helper.removeBookmarkFromContextMenu(id);
    }
);
