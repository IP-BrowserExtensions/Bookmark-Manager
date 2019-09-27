/**
 * Exported missing types
 */

export interface IContextMenuCreateProperties {
    checked?: boolean;
    command?: "_execute_browser_action" | "_execute_page_action" | "_execute_sidebar_action";
    contexts?: browser.menus.ContextType[];
    documentUrlPatterns?: string[];
    enabled?: boolean;
    icons?: object;
    id?: string;
    onclick?: (info: browser.menus.OnClickData, tab: browser.tabs.Tab) => void;
    parentId?: number | string;
    targetUrlPatterns?: string[];
    title?: string;
    type?: browser.menus.ItemType;
    visible?: boolean;
}

export interface IContextMenuUpdateProperties {
    checked?: boolean;
    command?: "_execute_browser_action" | "_execute_page_action" | "_execute_sidebar_action";
    contexts?: browser.menus.ContextType[];
    documentUrlPatterns?: string[];
    enabled?: boolean;
    onclick?: (info: browser.menus.OnClickData, tab: browser.tabs.Tab) => void;
    parentId?: number | string;
    targetUrlPatterns?: string[];
    title?: string;
    type?: browser.menus.ItemType;
    visible?: boolean;
}
