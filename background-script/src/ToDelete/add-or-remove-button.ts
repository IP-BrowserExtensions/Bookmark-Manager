// import { Bookmarks } from "../bookmarks/bookmarks";
// import { ContextMenuSerivce } from "../context-menu/context-menu.service";

// export class AddOrRemoveButton {
//     private readonly _states: { [state: string]: string } = {
//         add: "★ Add Bookmark",
//         remove: "☆ Remove Bookmark"
//     };
//     private _className: string = AddOrRemoveButton.name;
//     private _currentState: string = this._states.add;

//     private _contextMenu: ContextMenuSerivce;
//     private _bookmarks: Bookmarks;

//     public constructor(contextMenuService: ContextMenuSerivce, bookmarks: Bookmarks) {
//         this._contextMenu = contextMenuService;
//         this._bookmarks = bookmarks;
//     }

//     public createButton(parentId: string): void {
//         this._contextMenu.add(this._className, parentId, this._states.add, this.action.bind(this));
//         // this._contextMenu.addSeparator(parentId);
//     }

//     public setRemoveState() {
//         chrome.contextMenus.update(this._className, {
//             title: this._states.remove
//         });
//         this._currentState = this._states.remove;
//     }

//     public setAddState() {
//         chrome.contextMenus.update(this._className, {
//             title: this._states.add
//         });
//         this._currentState = this._states.add;
//     }

//     public toggleButton(url?: string): void {
//         chrome.bookmarks.search({ url }, (foundBookmarks) => {
//             if (foundBookmarks.length !== 0 && this._currentState === this._states.add) {
//                 this.setRemoveState();
//             } else {
//                 if (foundBookmarks.length === 0 && this._currentState === this._states.remove) {
//                     this.setAddState();
//                 }
//             }
//         });
//     }

//     private action(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): void {
//         chrome.tabs.get(<number>tab.id, (result) => {
//             if (this._currentState === this._states.add) {
//                 this._bookmarks.add(result);
//             } else {
//                 this._bookmarks.remove(result);
//             }
//         });
//     }
// }
