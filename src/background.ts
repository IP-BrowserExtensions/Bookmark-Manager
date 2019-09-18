import { BookmarkLeaf, BookmarkTreeNode } from './bookmark-tree-interfaces';

chrome.runtime.onInstalled.addListener(function() {
	chrome.bookmarks.getTree((bookmarkTree: BookmarkTreeNode[]) => {
		console.log(bookmarkTree);
		var parentId = "root";
		chrome.contextMenus.create(
			{
				id: parentId,
				title: "Bookmarks",
				contexts: ["all"]
			},
			() => iterateTree(bookmarkTree, parentId)
		);
	});
});

function contextMenuAction(element) {
	console.log("clicked");
	// var sText = info.selectionText;
	// var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);
	// window.open(url, "_blank");
}

function iterateTree(bookmarkTree: BookmarkTreeNode[] | BookmarkLeaf, parentId: string) {
	if (!!bookmarkTree["children"]) {
		(<BookmarkTreeNode[]>bookmarkTree).forEach((tree) => {
			if (!!tree.children) {
				iterateTree(tree, tree.id);
			} else {
				chrome.contextMenus.create({
					title: tree.title,
					id: tree.id,
					parentId: parentId,
					type: "normal",
					contexts: ["all"],
					onclick: contextMenuAction
				});
			}
		});
	}
}

// function buildTree(a, b) {
// 	for (var i = 0, l = a.length; i < l; i++) {
// 		//loop trough passed data
// 		var notId = a[i].id, //create random unique ID for new items, I'm using id's from my notes
// 			notText = a[i].text; //create item title, I'm using text from my notes

// 		chrome.contextMenus.create({
// 			//create CTX item
// 			id: notId, //for ID use previously created
// 			parentId: b, //for parent ID use second passed argument in function
// 			title: notText, //for title use previously creted text (or whatever)
// 			type: "normal",
// 			contexts: ["editable"]
// 		});
// 		if (a[i].list) buildTree(a[i].list, notId); //if folder, recursively call the same function
// 	}
// }

// function iterateTree(bookmarkTree, parentId) {
// 	console.log(bookmarkTree);
// 	if (!!bookmarkTree.length) {
// 		console.log("1");
// 		bookmarkTree.forEach(function(tree) {
// 			if (!!tree.children) {
// 				iterateTree(tree, tree.id);
// 			} else {
// 				console.log("2");
// 				if (bookmarkTree.title == "") bookmarkTree.title = "Root";
// 				chrome.contextMenus.create({
// 					title: tree.title,
// 					id: tree.id,
// 					parentId: parentId,
// 					type: "normal",
// 					contexts: ["all"],
// 					onclick: contextMenuAction
// 				});
// 			}
// 		});
// 	} else {
// 		console.log("3");
// 		if (bookmarkTree.title == "") bookmarkTree.title = "Root";
// 		chrome.contextMenus.create({
// 			title: bookmarkTree.title,
// 			id: bookmarkTree.id,
// 			parentId: parentId,
// 			type: "normal",
// 			contexts: ["all"],
// 			onclick: contextMenuAction
// 		});
// 	}
// }
