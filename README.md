# Angular Starter

A rapid starter project for creating Angular single page apps. Contains Angular, Angular Materials, Bootstrap 4 & Ngrx-Store (Redux). Built with Angular CLI.

Available online @ https://jerrolkrause.github.io/angular-starter/#/

## Quick Start

```bash
# Clone the repo
git clone https://github.com/JerrolKrause/angular-starter.git

# Rename directory from `angular-starter` to `your-app`

# Change directory to the repo
cd your-app

# Install the repo with npm
npm i
```


## Usage
See Angular CLI github page for full usage: https://github.com/angular/angular-cli

```bash
# Serve dev on http://localhost:4200/
ng serve --aot

# Build for prod. Files will appear in the dist folder
ng build --prod

# Serve prod build from dist folder at http://127.0.0.1:8080/#/.
# Requires http server which can be installed with `npm install http-server -g`
npm run prod

# Run prettier which will format the code in the entire project
npm run format

# Run prod build and then use webpack bundle analyzer to check bundle sizes and composition
# Documentation located in /documentation/
npm run stats

# Automatically generate documentation
npm run docs

# Run e2e protractor tests
ng e2e

# Run e2e protractor tests without rebuilding every time (faster)
ng e2e --s false

# Update NPM dependencies via Angular CLI
ng update

# Deploy dist folder to git pages. Be sure to update deploy script in package.json
npm run deploy
```

## Localizing Your App

`package.json`
- If using github pages, update the `npm run deploy` command in this file to include the correct slug. IE replace `/angular-starter/` with your url

`src > environments > environment.ts` +
`src > environments > environment.prod.ts`
- Localize environment settings and properties in these files. Enable/disable app functionality as needed

`src > app > shared > app.settings.ts`
- Add/change global app & environment variables

`src > index.html`
- Update any header changes to the html in this file. IE logo, navigation, etc

`src > manifest.json`
- Change the site info in this file to be specific to your app. Make sure the start Url property matches your production URL

`src > assets > icons`
- Change these icons to ones for your app

`src > ` `apple-touch-icon` + `favicon.ico` + `safari-pinned-tab.svg`
- Change these icons to ones for your app

`src > ngsw-config.json`
- Update any dependencies needed for the service worker. Use asset groups for site resources & use dataGroups for API calls


## Useful Tools

### VSCode Tools
- Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- TS Lint: https://marketplace.visualstudio.com/items?itemName=eg2.tslint

### Visual Studio Tools
- Prettier: https://marketplace.visualstudio.com/items?itemName=MadsKristensen.JavaScriptPrettier
- TS Lint (Note that this requires the project to be in a solution to work): https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebAnalyzer


## Useful Info

Lazy load libraries. Normally libraries that are shared between lazy loaded routes are all bundled into a single master bundle. This approach will bundle them separately.
- Add a module in `app > components > libs > *` that imports the library and then exports it
- Export the module in the barrel file in `app > components > libs > index.ts`
- In angular.json, add the path to the module in `projects > architect > build > options > lazyModules`
- In the module where the library is needed, import the lazy loaded module from the barrel like `import { DatagridModule } from '$libs';` and then add to the ngModule imports array

When working with Yarn/NPM Link and your local NPM package src folders (uncompiled .ts), use the following boilerplate in your root tsconfig so that Angular CLI will compile and build on save and not throw an Angular package error
```bash
"include": [
	"src/**/*",
	"node_modules/libName/**/*",
]
```
