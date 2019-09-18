export interface BookmarkTreeNode {
    id: string;
    title: string;
    index?: number;
    parentId?: string;
    children?: BookmarkTreeNode[];
    url?: string;
    dateAdded?: Date;
    dateGroupModified?: number;
}
