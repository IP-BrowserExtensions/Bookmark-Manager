export interface BookmarkTreeNode {
	children: (BookmarkTreeNode | BookmarkLeaf)[];
	dateAdded: number;
	dateGroupModified: number;
	id: string;
	index: number;
	parentId: string;
	title: string;
}

export interface BookmarkLeaf {
	dateAdded: number;
	id: string;
	index: number;
	parentId: string;
	title: string;
	url?: string;
}
