export interface IBookmarkTreeNode extends browser.bookmarks.BookmarkTreeNode {}
export interface IBookmarkCreate extends browser.bookmarks.CreateDetails {}

/** Types taken from chrome since they are compatible */
export interface IBookmarkDestination extends chrome.bookmarks.BookmarkDestinationArg {}
export interface IBookmarkChanges extends chrome.bookmarks.BookmarkChangesArg {}
export interface IBookmarkSearchQuery extends chrome.bookmarks.BookmarkSearchQuery {}
