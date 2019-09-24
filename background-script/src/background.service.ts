import * as helper from "./helper";
import * as contextMenu from "./context-menu-actions";

export function addBookmarkToContextMenu(id: string, parentId: string, title: string): void {
    helper.addToContextMenu(id, parentId, title, contextMenu.openBookmark);
}

export function removeBookmarkFromContextMenu(menuItemId: string): void {
    helper.removeFromContextMenu(menuItemId);
}

export function createBookmark(parentId: string, title: string, url: string = "") {
    chrome.bookmarks.create({
        parentId,
        title,
        url
    });
}

export function removeBookmark(id: string): void {
    chrome.bookmarks.remove(id);
}

// let addOrRemoveOptionId: string = "AddOrRemoveButton";

// let removeBookmarkButtonName: string = "☆ Remove Bookmark";
// let addBookmarkButtonName: string = "★ Add Bookmark";
let bookmarksFolder = "Bookmark Manager";

// let removeState: string = "remove";
// let addState: string = "add";
// let addOrRemoveOptionActiveState: string = "add";

let activeTab: chrome.tabs.TabActiveInfo;

let defaultBookmarksFolders: chrome.bookmarks.BookmarkTreeNode[] = [];

export function initializeContextMenu() {
    chrome.bookmarks.getTree(bookmarkTree => {
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
            (<chrome.bookmarks.BookmarkTreeNode[]>bookmarkTree[0].children).forEach(element => {
                defaultBookmarksFolders.push({ ...element, children: undefined });
            });

            createAddOrRemoveBookmarkButton(bookmarkTree[0].id);
        }
    });
}

export function createBookmarksFolderIfNonExistent() {
    chrome.bookmarks.search({ title: bookmarksFolder }, result => {
        if (!!result && result.length == 0) {
            createBookmark(
                (<chrome.bookmarks.BookmarkTreeNode>(
                    defaultBookmarksFolders.find(x => x.title == "Bookmarks bar")
                )).id,
                bookmarksFolder
            );
        }
    });
}

export function createBookmarkTree(bookmarkTreeNode: chrome.bookmarks.BookmarkTreeNode[]): void {
    bookmarkTreeNode.forEach(node => {
        helper.addToContextMenu(
            node.id,
            <string>node.parentId,
            node.title,
            contextMenu.openBookmark
        );
        if (!!node.children) {
            createBookmarkTree(node.children);
        }
    });
}

export function updateContextMenuBookmark(
    id: string,
    changeInfo: chrome.bookmarks.BookmarkChangeInfo
) {
    chrome.contextMenus.update(id, { title: changeInfo.title });
}

export function setActiveTab(activeInfo: chrome.tabs.TabActiveInfo) {
    activeTab = activeInfo;
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
