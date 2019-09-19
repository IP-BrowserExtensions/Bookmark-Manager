chrome.runtime.onInstalled.addListener(function() {
    chrome.bookmarks.getTree(bookmarkTree => {
        if (!!bookmarkTree) {
            console.log(bookmarkTree);
            chrome.contextMenus.create(
                {
                    id: bookmarkTree[0].id,
                    title: "Bookmarks",
                    contexts: ["all"]
                },
                () =>
                    createBookmarkTree(
                        <chrome.bookmarks.BookmarkTreeNode[]>bookmarkTree[0].children,
                        bookmarkTree[0].id
                    )
            );
        }
    });
});

function contextMenuAction(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
    console.log(info, tab);
    chrome.bookmarks.getTree(bookmarkTree => {
        let foundBookmark = findBookmark(
            <chrome.bookmarks.BookmarkTreeNode[]>bookmarkTree[0].children,
            info.menuItemId
        );
        if (!!foundBookmark) {
            console.log(foundBookmark);
            var url = <string>foundBookmark.url;
            window.open(url, "_blank");
        }
    });
}

function createBookmarkTree(
    bookmarkTree: chrome.bookmarks.BookmarkTreeNode[],
    parentId: string
): void {
    bookmarkTree.forEach(node => {
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
    console.log(bookmarkNode.title);

    chrome.contextMenus.create({
        title: bookmarkNode.title,
        id: bookmarkNode.id,
        parentId: parentId,
        type: "normal",
        contexts: ["all"],
        onclick: contextMenuAction
    });
}

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
