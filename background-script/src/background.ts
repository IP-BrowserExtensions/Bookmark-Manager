import { ContextMenu } from "./context-menu/context-menu";
import { IContextMenuUpdateProperties } from "./context-menu/icontext-menu";

const contextMenu = new ContextMenu();

let activeTabInfo: chrome.tabs.TabActiveInfo;

chrome.runtime.onInstalled.addListener(() => {
    contextMenu.initialize();
});

chrome.runtime.onStartup.addListener(() => {
    contextMenu.initialize();
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    activeTabInfo = activeInfo;
    chrome.tabs.get(activeInfo.tabId, (result) => {
        contextMenu.toggleButtons(result.url);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (activeTabInfo.tabId === tabId && changeInfo.status === "complete") {
        chrome.tabs.get(tabId, (result) => {
            contextMenu.toggleButtons(result.url);
        });
    }
});

chrome.bookmarks.onChanged.addListener((id: string, changeInfo: IContextMenuUpdateProperties) => {
    contextMenu.update(id, { title: changeInfo.title });
});

chrome.bookmarks.onCreated.addListener(
    (id: string, bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode) => {
        contextMenu.add(id, <string>bookmarkTreeNode.parentId, bookmarkTreeNode.title);
        contextMenu.setRemoveState();
    }
);

chrome.bookmarks.onRemoved.addListener(
    (id: string, removeInfo: chrome.bookmarks.BookmarkRemoveInfo) => {
        contextMenu.remove(id);
        contextMenu.setAddState();
    }
);
