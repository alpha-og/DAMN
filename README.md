# DAMN

Home of the codebase for the supplementary website to the Data Science, AI, ML and DL notes [repository](https://github.com/alpha-og/42-Data-Science-AI-ML-and-DL). The website will serve as an easy to use interface for the markdown notes available at the aforementioned repository.

# Documentation

The website, as of writing this Documentation, is a static SPA that has no backend, other than the GitHub Pages service that enables deployment of the website. The client side of the website is a React application made with the help of Vite and is styled using TailwindCSS with PostCSS as a preprocessor.

## Project Structure

```bash
.
├── README.md
└── client
    ├── README.md
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── 404.html
    │   └── vite.svg
    ├── src
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── constants.js
    │   │   └── react.svg
    │   ├── components
    │   │   ├── Branding.jsx
    │   │   ├── Footer.jsx
    │   │   ├── MarkdownRenderer.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── SubjectCard.jsx
    │   │   ├── TopicCard.jsx
    │   │   └── components.js
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── About.jsx
    │   │   ├── Home.jsx
    │   │   ├── Notes.jsx
    │   │   ├── PageNotFound.jsx
    │   │   └── pages.js
    │   └── store
    │       ├── notesSlice.js
    │       ├── redux.js
    │       ├── subjectsSlice.js
    │       ├── topicsSlice.js
    │       └── userSlice.js
    ├── tailwind.config.js
    └── vite.config.js
```

Since the project was initialised with Vite the file basic file structure is as expected from running `npm create vite@latest client` in the root directory of the repository. In addition to the `vite.config.js` there are also configuration files for tailwindcss (`tailwind.config.js`) and postcss (`postcss.config.js`), since I am using tailwind to style the UI and using postcss as a pre-processor.

The `assets` folder contains all static resources like images required by the website. It also has a `constants.js` file which exports constant values for use in other files across the `client` folder

The `components` folder contains any re-usable components. All components are imported into a single `components.js` file and exported (named exports) from that file for ease of use. The components can then be imported into any of the pages (more on this in the upcoming sections) using the modern ES6 syntax.

The `pages` folder contains all the different unique pages of the website. As in the case with components, the pages are also imported into a single `pages.js` file and then exported from that file. As of writing, there are 4 pages to the website, namely, `Home`, `About`, `Notes` and `404 Page`.

The `store` folder contains the files required for the redux store. This project uses the redux toolkit for creating and managing the redux store

## Client Side Routing

## Themeing and Colours

## Redux Store

## Rendering Markdown

## Configuring Deployment with GitHub Pages

The website is deployed as a static SPA with the help of GitHub Pages. Updates to the deployment are handled via a GitHub Action that monitors the `main` branch for `push` events. The Action triggers a job to re-deploy the website with the updated code. The GitHub Action uses boilerplate code made available in the [Vite documentation](https://vitejs.dev/guide/static-deploy.html) for handling deployment.

### The GitHub Action YML file

The code for the frontend resides in the `client` folder within the root directory of the repository and as a result the default behaviour of GitHub Actions needs to be overriden by specifying the cache-dependency-path as follows `cache-dependency-path: "./client/package-lock.json"` in the `deployWebsite.yml` located in the `.github/workflows/` directory. The default working directory for running npm commands (`npm install` and `npm run build`) has also been altered as follows `working-directory: ./client`. The artifact generated after running `npm run build` is uploaded to the `./client/dist` directory instead of the default `./dist` directory.

### Troubleshooting 404 Page Redirect

GitHub Pages enables hosting static websites and can be used for routing between different `HTML` files. However, when running SPAs like this website, built using React or other frameworks, the routing is done on the client side. Client side routing serves pages directly from the client without ever reaching to the server hosting the website, which means that when using client side routing the GitHub server is completely unaware of the pages being served other than the `HTML` files (in the case of this website, it is the bundled up `index.html`) made available to it during deployment. However, if the webpage happens to be reloaded at a route other than the base URL or if the URL is modified manually, the browser sends a request to the server with the new URL and the server responds with a `404: Page Note Found Error` since the deployment was only configured with the `HTML` files provided during deployment.

#### Context

In the case of this website, the base URL is https://alpha-og.github.io/DAMN/. GitHub Pages correctly serves the `index.html` from the `./client/dist` directory, generated after building, at the base URL. It is also possible to access the different pages of the React app using the `Link` element from the `react-router-dom` library by assigning the `to` attribute's value in the tag to the desired route's relative url (such as: `/home`, `about`, etc...). Additionally it is also necessary to specify the basename (here, `DAMN`) attribute of the `BrowserRouter` element from the `react-router-dom`.
The above setup will enable client side routing and facilitate route handling based on events on the client side. However, as mentioned earlier if one were to manually access the routes such as `https://alpha-og.github.io/DAMN/home` or `https://alpha-og.github.io/DAMN/about` the GitHub Pages server responds with a 404 since it only has a single route defined, which is for `https://alpha-og.github.io/DAMN/`. Adding to the chaos, when one navigates to the `/home` route using client side routing (using an event, like a click on the `Link` element corresponding to the `\home` route) React would modify the URL in the browser navigation bar to match the same and render the appropriate pages (here, `https://alpha-og.github.io/DAMN/home`), however if the page is reloaded while the URL in the browser navigation bar is still `https://alpha-og.github.io/DAMN/home` then server responds with a `404: Page Note Found Error`.

#### Fixing the Broken Reload/ Routing

The following repository: https://github.com/rafgraph/spa-github-pages, provides a guide to setting up SPAs with GitHub Pages. The same repository helps address the 404 page routing issue. The solution involves creating `404.html` file and adding a script to it which performs the re-direction. Another script must be added to the `index.html` file of the React app, before the script for the SPA is executed which modifies the relative URL beyond the base URL into a query parameter. Transforming the relative URL to a query parameter prevents the server from responding with a `404` as the request sent on reload or manual entry of the URL is sent for the `index.html` that corresponds to the URL `https://alpha-og.github.io/DAMN/`; the request has the relative URL as query parameters (example, `https://alpha-og.github.io/DAMN/?/home/`). It is also important to make sure that the `404.html` is placed in the public directory and not any other location.

The `vite.config.js` file must include a `base` attribute corresponding to the repository name (here, `base: "/DAMN/"`). This appends the value provided to the base attribute to the base URL.

The `package.json` file must include a `homepage` attribute corresponding to the base URL generated by GitHub Pages for the repository (here, `"homepage":"https://alpha-og.github.io/DAMN/"`)
