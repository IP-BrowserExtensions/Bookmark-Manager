/**
 * Interface used as an workaround for the missing "visible" property on chrome Types
 */
export interface IContextMenuUpdateProperties extends chrome.contextMenus.UpdateProperties {
    visible?: boolean;
}
