import { BookmarkLeaf, BookmarkTreeNode } from "./bookmark-tree-interfaces";

chrome.runtime.onInstalled.addListener(function() {
    chrome.bookmarks.getTree((bookmarkTree: BookmarkTreeNode[]) => {
        console.log(bookmarkTree);
        chrome.contextMenus.create(
            {
                id: bookmarkTree[0].id,
                title: "Bookmarks",
                contexts: ["all"]
            },
            () => iterateTree(bookmarkTree[0].children, bookmarkTree[0].id)
        );
    });
});

function contextMenuAction(element) {
    console.log(element);

    // var sText = info.selectionText;
    // var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);
    // window.open(url, "_blank");
}

function iterateTree(bookmarkTree: (BookmarkTreeNode | BookmarkLeaf)[], parentId: string): void {
    bookmarkTree.forEach(node => {
        createNode(<BookmarkTreeNode>node, parentId);
        if (node.hasOwnProperty("children")) {
            iterateTree((<BookmarkTreeNode>node).children, node.id);
        }
    });
}

function createNode(bookmarkNode: BookmarkTreeNode | BookmarkLeaf, parentId: string): void {
    chrome.contextMenus.create({
        title: bookmarkNode.title,
        id: bookmarkNode.id,
        parentId: parentId,
        type: "normal",
        contexts: ["all"],
        onclick: contextMenuAction
    });
}
