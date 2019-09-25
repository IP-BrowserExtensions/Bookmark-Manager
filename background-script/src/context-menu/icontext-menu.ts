/**
 * Interface used as an workaround for the missing "visible" propertie on chrome Types
 */
export interface IContextMenuUpdateProperties extends chrome.contextMenus.UpdateProperties {
    visible?: boolean;
}
