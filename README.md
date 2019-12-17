# Angular Starter

A rapid starter project for creating Angular single page apps. Contains Angular, ngPrime, Akita and more. Built with Angular CLI.

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
ng serve

# Prod Build for targeted environment. Files will appear in the dist folder
npm run build:qa # Uses settings from environment.qa.ts
npm run build:uat # Uses settings from environment.uat.ts
npm run build:prod # Uses settings from environment.prod.ts

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

`src > environments > defaults.ts` +
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

`src >` `apple-touch-icon` + `favicon.ico` + `safari-pinned-tab.svg`

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

## Bit Usage
Review bit documentation here: https://docs.bit.dev/docs/quick-start. Ntersol bit library is here: https://bit.dev/nts/angular

One line wonders:
- Get and update to latest everything: `npm run bit:pull`
- Tag and push everything: `npm run bit:push`

Additional Info:
- Install/update bit cli `npm install bit-bin -g`
- See list of outdated components `bit list --outdated`
- To get the latest version of everything, run `bit import && bit checkout latest --all`. Import downloads the latest version from the remote server and checkout switches to that version
- Check status of local component environment, IE which components have been updated and are ready for tagging/uploading `bit status`
- When components are ready to have their changes exported, first run `bit tag --all` or `bit tag --all 1.0.0` to set a new semver version and then export with `bit export nts.angular`
- Add a new component to a namespaced project with `bit add src/app/component/general/new-component --namespace components/general`. See https://bit.dev/nts/angular for the locations and namespaces of components.

Add bit to a new project
1. In the root directory, run `bit init`
2. Add `.bit/` to your root .gitignore file
3. In the root package.json directory, change the bit entry to the following. Update the componentsDefaultDirectory if necessary
```
"bit": {
    "env": {},
    "componentsDefaultDirectory": "src/app/{name}",
    "saveDependenciesAsComponents": true,
    "packageManager": "npm",
    "resolveModules": {
      "modulesDirectories": [
        "./"
      ]
    }
  }
```
4. Navigate to the newly created component folder, IE src/app/components/general and delete the node_modules folder and package.json files

## Useful Info

Lazy load libraries. Normally libraries that are shared between lazy loaded routes are all bundled into a single master bundle. This approach will bundle them separately.

- Add a module in `app > components > libs > *` that imports the library and then exports it
- Export the module in the barrel file in `app > components > libs > index.ts`
- In angular.json, add the path to the module in `projects > architect > build > options > lazyModules`
- In the module where the library is needed, import the lazy loaded module from the barrel like `import { DatagridModule } from '$features';` and then add to the ngModule imports array

When working with Yarn/NPM Link and your local NPM package src folders (uncompiled .ts), use the following boilerplate in your root tsconfig so that Angular CLI will compile and build on save and not throw an Angular package error

```bash
"include": [
	"src/**/*",
	"node_modules/libName/**/*",
]
```
