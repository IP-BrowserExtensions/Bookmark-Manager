import * as helper from './helper';

let activeTab: chrome.tabs.TabActiveInfo;

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed", new Date(Date.now()));
    helper.initializeContextMenu();
});

chrome.runtime.onStartup.addListener(() => {
    console.log("Startup", new Date(Date.now()));
    helper.initializeContextMenu();
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    ////console.log(activeInfo);
    activeTab = activeInfo;
    chrome.tabs.get(activeInfo.tabId, (result) => {
        helper.toggleAddOrRemoveBookmarkButton(result.url);
        ////console.log(result);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //console.log(tabId, changeInfo, tab);
    if (activeTab.tabId == tabId && changeInfo.status == "complete") {
        chrome.tabs.get(tabId, (result) => {
            helper.toggleAddOrRemoveBookmarkButton(result.url);
            ////console.log(result);
        });
    }
});
