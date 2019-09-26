# Bookmark-Manager

Chromium and Firefox Extension

# Extensions

## Needed

-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
-   [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero)

## Recommended

-   [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
-   [Move TS - Move TypeScript files and update relative imports](https://marketplace.visualstudio.com/items?itemName=stringham.move-ts)
-   [Angular Schematics](https://marketplace.visualstudio.com/items?itemName=cyrilletuzi.angular-schematics)
-   [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
-   [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
-   [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
-   [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
-   [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
-   [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
-   [Auto-Open Markdown Preview](https://marketplace.visualstudio.com/items?itemName=hnw.vscode-auto-open-markdown-preview)

# Architectural decisions

Custom made wrappers over browsers API + multiple tsconfig files instead of using webextension-polyfill.
Reasoning: The number of API involved is rather small and it would give a better abstractization and understanding of the APIs used
Tsconfig.json is the base config, it is used for importing
