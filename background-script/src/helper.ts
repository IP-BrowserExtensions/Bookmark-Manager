let addOrRemoveOptionId: string = "AddOrRemoveButton";

let removeBookmarkButtonName: string = "☆ Remove Bookmark";
let addBookmarkButtonName: string = "★ Add Bookmark";

let removeState: string = "remove";
let addState: string = "add";
let addOrRemoveOptionActiveState: string = "add";

export function initializeContextMenu() {
    chrome.bookmarks.getTree((bookmarkTree) => {
        if (!!bookmarkTree) {
            chrome.contextMenus.create(
                {
                    id: bookmarkTree[0].id,
                    title: "Bookmarks",
                    contexts: ["all"]
                },
                () =>
                    createBookmarkTree(<chrome.bookmarks.BookmarkTreeNode[]>(
                        bookmarkTree[0].children
                    ))
            );
            createAddOrRemoveBookmarkButton(bookmarkTree[0].id);
        }
    });
}

export function createBookmarkTree(bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode[]): void {
    bookmarkTreeNode.forEach((node) => {
        createBookmarkNode(node.id, <string>node.parentId, node.title);
        if (!!node.children) {
            createBookmarkTree(node.children);
        }
    });
}

export function createBookmarkNode(id: string, parentId: string, title: string): void {
    chrome.contextMenus.create({
        title: title,
        id: id,
        parentId: parentId,
        type: "normal",
        contexts: ["all"],
        onclick: contextMenuActionOpenBookmark
    });
}

export function removeBookmarkFromContextMenu(menuItemId: string): void {
    chrome.contextMenus.remove(menuItemId);
}

export function createBookmark(parentId: string, title: string, url: string) {
    chrome.bookmarks.create(
        {
            parentId,
            title,
            url
        },
        (result) => {
            if (!!result) {
                chrome.contextMenus.create({
                    title: result.title,
                    id: result.id,
                    parentId: result.parentId,
                    type: "normal",
                    contexts: ["all"],
                    onclick: contextMenuActionOpenBookmark
                });
            }
        }
    );
}

export function removeBookmark(id: string): void {
    chrome.bookmarks.remove(id);
}

export function contextMenuActionOpenBookmark(
    info: chrome.contextMenus.OnClickData,
    tab: chrome.tabs.Tab
): void {
    chrome.bookmarks.get(info.menuItemId, (foundBookmark) => {
        var url = foundBookmark[0].url;
        window.open(url, "_blank");
    });
}

export function createAddOrRemoveBookmarkButton(parentId: string): void {
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

export function toggleAddOrRemoveBookmarkButton(url?: string): void {
    chrome.bookmarks.search({ url: url }, (foundBookmarks) => {
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

export function contextMenuActionAddOrRemoveBookmark(
    info: chrome.contextMenus.OnClickData,
    tab: chrome.tabs.Tab
): void {
    chrome.tabs.get(<number>tab.id, (result) => {
        if (addOrRemoveOptionActiveState == addState) {
            createBookmark(info.parentMenuItemId, <string>result.title, <string>result.url);
        } else {
            chrome.bookmarks.search({ url: result.url }, (result) => {
                removeBookmark(result[0].id);
                removeBookmarkFromContextMenu(result[0].id);
            });
        }
    });
}

export function updateContextMenuBookmark(
    id: string,
    changeInfo: chrome.bookmarks.BookmarkChangeInfo
) {
    chrome.contextMenus.update(id, { title: changeInfo.title });
}

/**
 * Deprecated find function in favour of chrome's api
 * DFS in the Bookmarks tree
 */
export function findBookmark(
    bookmarkTree: chrome.bookmarks.BookmarkTreeNode[],
    property: any,
    value: any
): chrome.bookmarks.BookmarkTreeNode | undefined {
    let bookmarkNode: chrome.bookmarks.BookmarkTreeNode | undefined;
    for (let node of bookmarkTree) {
        if (!!node.children) {
            bookmarkNode = findBookmark(node.children, "id", value);
            if (!!bookmarkNode) {
                break;
            }
        } else {
            if (node[property] === value) {
                bookmarkNode = node;
                break;
            }
        }
    }
    return bookmarkNode;
}
