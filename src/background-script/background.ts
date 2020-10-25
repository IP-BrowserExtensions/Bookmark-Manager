import { IActiveTabInfo } from '@api/types/tabs-api';

import { ContextMenu } from './context-menu/context-menu';

const contextMenu = new ContextMenu();

let activeTabInfo: IActiveTabInfo;
browser.runtime.onInstalled.addListener(() => {
  contextMenu.initialize();
});

browser.runtime.onStartup.addListener(() => {
  contextMenu.initialize();
});

browser.tabs.onActivated.addListener((activeInfo) => {
  activeTabInfo = activeInfo;
  browser.tabs.get(activeInfo.tabId).then((result) => {
    contextMenu.toggleButtons(result.url);
  });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (activeTabInfo.tabId === tabId && changeInfo.status === 'complete') {
    browser.tabs.get(tabId).then((result) => {
      contextMenu.toggleButtons(result.url);
    });
  }
});

browser.bookmarks.onChanged.addListener((id, changeInfo) => {
  contextMenu.update(id, { title: changeInfo.title });
});

browser.bookmarks.onCreated.addListener((id, bookmarkTreeNode) => {
  contextMenu.add(id, <string>bookmarkTreeNode.parentId, bookmarkTreeNode.title);
  contextMenu.setRemoveState();
});

browser.bookmarks.onRemoved.addListener((id, removeInfo) => {
  contextMenu.remove(id);
  contextMenu.setAddState();
});
