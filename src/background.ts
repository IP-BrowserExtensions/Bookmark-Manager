let contextMenuId = "root";
let addOrRemoveOptionId = "addOrRemove";
let removeBookmarkButtonName = "✰Remove Bookmark";
let addBookmarkButtonName = "⭐Add Bookmark";
let removeState = "remove";
let addState = "add";
let addOrRemoveOptionActiveState = "add";
let activeTab: chrome.tabs.TabActiveInfo;

chrome.runtime.onInstalled.addListener(() => {
    chrome.bookmarks.getTree((bookmarkTree) => {
        if (!!bookmarkTree) {
            //console.log(bookmarkTree);
            chrome.contextMenus.create(
                {
                    id: contextMenuId,
                    title: "Bookmarks",
                    contexts: ["all"]
                },
                () =>
                    createBookmarkTree(
                        <chrome.bookmarks.BookmarkTreeNode[]>bookmarkTree[0].children,
                        contextMenuId
                    )
            );
            createAddOrRemoveBookmarkButton(contextMenuId);
        }
    });
});

// chrome.runtime.onStartup.addListener(() =>{

// })

function createBookmarkTree(
    bookmarkTree: chrome.bookmarks.BookmarkTreeNode[],
    parentId: string
): void {
    bookmarkTree.forEach((node) => {
        createBookmarkNode(<chrome.bookmarks.BookmarkTreeNode>node, parentId);
        if (!!node.children) {
            createBookmarkTree(node.children, node.id);
        }
    });
}

function createBookmarkNode(
    bookmarkNode: chrome.bookmarks.BookmarkTreeNode,
    parentId: string
): void {
    //console.log(bookmarkNode.title);

    chrome.contextMenus.create({
        title: bookmarkNode.title,
        id: bookmarkNode.id,
        parentId: parentId,
        type: "normal",
        contexts: ["all"],
        onclick: contextMenuActionOpenBookmark
    });
}

function removeBookmarkNode(menuItemId: string): void {
    chrome.contextMenus.remove(menuItemId);
}

function createBookmark(parentId: string, title: string, url: string) {
    chrome.bookmarks.create(
        {
            parentId,
            title,
            url
        },
        (result) => {
            chrome.contextMenus.create({
                title: result.title,
                id: result.id,
                parentId: result.parentId,
                type: "normal",
                contexts: ["all"],
                onclick: contextMenuActionOpenBookmark
            });
        }
    );
}

function removeBookmark(id: string): void {
    chrome.bookmarks.remove(id);
}

function contextMenuActionOpenBookmark(
    info: chrome.contextMenus.OnClickData,
    tab: chrome.tabs.Tab
): void {
    //console.log(info, tab);
    chrome.bookmarks.get(info.menuItemId, (foundBookmark) => {
        var url = foundBookmark[0].url;
        window.open(url, "_blank");
    });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    ////console.log(activeInfo);
    activeTab = activeInfo;
    chrome.tabs.get(activeInfo.tabId, (result) => {
        toggleAddOrRemoveBookmarkButton(result.url);
        ////console.log(result);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //console.log(tabId, changeInfo, tab);
    if (activeTab.tabId == tabId && changeInfo.status == "complete") {
        chrome.tabs.get(tabId, (result) => {
            toggleAddOrRemoveBookmarkButton(result.url);
            ////console.log(result);
        });
    }
});

function createAddOrRemoveBookmarkButton(parentId: string): void {
    chrome.contextMenus.create({
        title: addBookmarkButtonName,
        id: addOrRemoveOptionId,
        parentId: parentId,
        type: "normal",
        contexts: ["all"],
        onclick: contextMenuActionAddOrRemoveBookmark
    });
    chrome.contextMenus.create({
        parentId: parentId,
        type: "separator",
        contexts: ["all"]
    });
}

function toggleAddOrRemoveBookmarkButton(url?: string): void {
    chrome.bookmarks.search({ url: url }, (foundBookmarks) => {
        //console.log(foundBookmarks);
        if (foundBookmarks.length != 0 && addOrRemoveOptionActiveState == addState) {
            chrome.contextMenus.update(addOrRemoveOptionId, { title: removeBookmarkButtonName });
            addOrRemoveOptionActiveState = removeState;
        } else {
            if (foundBookmarks.length == 0 && addOrRemoveOptionActiveState == removeState) {
                chrome.contextMenus.update(addOrRemoveOptionId, { title: addBookmarkButtonName });
                addOrRemoveOptionActiveState = addState;
            }
        }
    });
}

function contextMenuActionAddOrRemoveBookmark(
    info: chrome.contextMenus.OnClickData,
    tab: chrome.tabs.Tab
): void {
    console.log(info, tab);
    chrome.tabs.get(<number>tab.id, (result) => {
        if (addOrRemoveOptionActiveState == addState) {
            createBookmark(contextMenuId, <string>result.title, <string>result.url);
        } else {
        }
    });
}

/**
 * Deprecated find function in favour of chrome's api
 * DFS in the Bookmarks tree
 */
function findBookmark(
    bookmarkTree: chrome.bookmarks.BookmarkTreeNode[],
    id: string
): chrome.bookmarks.BookmarkTreeNode | undefined {
    let bookmarkNode: chrome.bookmarks.BookmarkTreeNode | undefined;
    for (let node of bookmarkTree) {
        if (!!node.children) {
            bookmarkNode = findBookmark(node.children, id);
            if (!!bookmarkNode) {
                break;
            }
        } else {
            if (node.id === id) {
                bookmarkNode = node;
                break;
            }
        }
    }
    return bookmarkNode;
}
