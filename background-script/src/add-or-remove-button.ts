import * as helper from "./helper";

export class AddOrRemoveButton {
    private states: { [state: string]: string } = {
        add: "★ Add Bookmark",
        remove: "☆ Remove Bookmark"
    };

    private _currentState = this.states.add;

    constructor() {}

    createAddOrRemoveBookmarkButton(parentId: string): void {
        helper.addToContextMenu(
            addOrRemoveOptionId,
            parentId,
            addBookmarkButtonName,
            contextMenuActionAddOrRemoveBookmark
        );
        helper.addSeparatorToContextMenu(parentId);
    }

    toggleAddOrRemoveBookmarkButton(url?: string): void {
        chrome.bookmarks.search({ url: url }, foundBookmarks => {
            if (foundBookmarks.length != 0 && addOrRemoveOptionActiveState == addState) {
                chrome.contextMenus.update(addOrRemoveOptionId, {
                    title: removeBookmarkButtonName
                });
                addOrRemoveOptionActiveState = removeState;
            } else {
                if (foundBookmarks.length == 0 && addOrRemoveOptionActiveState == removeState) {
                    chrome.contextMenus.update(addOrRemoveOptionId, {
                        title: addBookmarkButtonName
                    });
                    addOrRemoveOptionActiveState = addState;
                }
            }
        });
    }

    contextMenuActionAddOrRemoveBookmark(
        info: chrome.contextMenus.OnClickData,
        tab: chrome.tabs.Tab
    ): void {
        chrome.tabs.get(<number>tab.id, result => {
            if (addOrRemoveOptionActiveState == addState) {
                contextMenu.addBookmark(result);
            } else {
                chrome.bookmarks.search({ url: result.url }, result => {
                    removeBookmark(result[0].id);
                });
            }
        });
    }
}
