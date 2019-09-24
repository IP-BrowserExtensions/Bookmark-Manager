export function addToContextMenu(
    id: string,
    parentId: string,
    title: string,
    onClickFunction: (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void,
    type: string = "normal",
    contexts: string[] = ["all"]
): void {
    chrome.contextMenus.create({
        title,
        id,
        parentId,
        type,
        contexts,
        onclick: onClickFunction
    });
}

export function addSeparatorToContextMenu(parentId: string, contexts: string[] = ["all"]): void {
    chrome.contextMenus.create({
        parentId,
        type: "separator",
        contexts
    });
}

export function removeFromContextMenu(menuItemId: string): void {
    chrome.contextMenus.remove(menuItemId);
}
