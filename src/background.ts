chrome.runtime.onInstalled.addListener(function() {
    chrome.bookmarks.getTree((bookmarkTree) => {
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
    chrome.bookmarks.getTree((bookmarkTree) => {
        var a = findBookmark(
            <chrome.bookmarks.BookmarkTreeNode[]>bookmarkTree[0].children,
            info.menuItemId
        );
        console.log(a);
    });
    // var sText = info.selectionText;
    // var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);
    // window.open(url, "_blank");
}

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
    bookmarkTree.forEach((node) => {
        if (!!node.children) {
            let bookmarkNode = findBookmark(node.children, id);
            console.log(bookmarkNode);
            if (!!bookmarkNode) {
                return bookmarkNode;
            }
        } else {
            if (node.id == id) {
                console.log(node.id, id);
                return node;
            }
        }
    });
    return undefined;
}
