import { BackgroundService } from "./background.service";

const backgroundService = new BackgroundService();

chrome.runtime.onInstalled.addListener(() => {
    backgroundService.initializeContextMenu();
});

chrome.runtime.onStartup.addListener(() => {
    backgroundService.initializeContextMenu();
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    backgroundService.activeTabInfo = activeInfo;
    chrome.tabs.get(activeInfo.tabId, (result) => {
        //backgroundService.addOrRemoveButton.toggleButton(result.url);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (backgroundService.activeTabInfo.tabId === tabId && changeInfo.status === "complete") {
        chrome.tabs.get(tabId, (result) => {
            // backgroundService.addOrRemoveButton.toggleButton(result.url);
        });
    }
});

chrome.bookmarks.onChanged.addListener(
    (id: string, changeInfo: chrome.bookmarks.BookmarkChangeInfo) => {
        backgroundService.contextMenu.update(id, { title: changeInfo.title });
    }
);

chrome.bookmarks.onCreated.addListener(
    (id: string, bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode) => {
        backgroundService.bookmarks.addToContextMenu(
            id,
            <string>bookmarkTreeNode.parentId,
            bookmarkTreeNode.title
        );
        //backgroundService.addOrRemoveButton.setRemoveState();
    }
);

chrome.bookmarks.onRemoved.addListener(
    (id: string, removeInfo: chrome.bookmarks.BookmarkRemoveInfo) => {
        backgroundService.bookmarks.removeFromContextMenu(id);
        //backgroundService.addOrRemoveButton.setAddState();
    }
);
