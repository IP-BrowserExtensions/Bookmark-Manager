import { ContextMenu } from "./context-menu/context-menu";
import { IContextMenuUpdateProperties } from "./context-menu/icontext-menu";

const contextMenu = new ContextMenu();

let activeTabInfo: {
    tabId: number;
    windowId: number;
};

browser.runtime.onInstalled.addListener(() => {
    contextMenu.initialize();
});

browser.runtime.onStartup.addListener(() => {
    contextMenu.initialize();
});

browser.tabs.onActivated.addListener((activeInfo: { tabId: number; windowId: number }) => {
    activeTabInfo = activeInfo;
    browser.tabs.get(activeInfo.tabId).then((result) => {
        contextMenu.toggleButtons(result.url);
    });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (activeTabInfo.tabId === tabId && changeInfo.status === "complete") {
        browser.tabs.get(tabId).then((result) => {
            contextMenu.toggleButtons(result.url);
        });
    }
});

browser.bookmarks.onChanged.addListener((id: string, changeInfo: IContextMenuUpdateProperties) => {
    contextMenu.update(id, { title: changeInfo.title });
});

browser.bookmarks.onCreated.addListener(
    (id: string, bookmarkTreeNode: browser.bookmarks.BookmarkTreeNode) => {
        contextMenu.add(id, <string>bookmarkTreeNode.parentId, bookmarkTreeNode.title);
        contextMenu.setRemoveState();
    }
);

browser.bookmarks.onRemoved.addListener(
    (
        id: string,
        removeInfo: { parentId: string; index: number; node: browser.bookmarks.BookmarkTreeNode }
    ) => {
        contextMenu.remove(id);
        contextMenu.setAddState();
    }
);
