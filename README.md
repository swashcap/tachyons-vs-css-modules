# react-styling-comparison

_An experiment testing React + styling methods' impact on bundle size._

## Findings

The [comparison script](./scripts/compare.js) demonstrates:

* Components built with Tachyons have a fixed CSS size
* Components built with Tachyons have a larger JS size than components built
  with CSS Modules
* Components built with CSS Modules are lighter invidually and combined

```
┌─────────┬─────────────────────────┬──────────────────────┬──────────────────────────┐
│ (index) │       CSS Modules       │    Inline Styles     │         Tachyons         │
├─────────┼─────────────────────────┼──────────────────────┼──────────────────────────┤
│ Button  │  { JS: 280, CSS: 424 }  │ { JS: 576, CSS: 0 }  │ { JS: 415, CSS: 15558 }  │
│  Page   │ { JS: 2003, CSS: 1630 } │ { JS: 2883, CSS: 0 } │ { JS: 2471, CSS: 15558 } │
│ Sidebar │  { JS: 822, CSS: 683 }  │ { JS: 1346, CSS: 0 } │ { JS: 1081, CSS: 15558 } │
│   All   │ { JS: 2008, CSS: 1630 } │ { JS: 2896, CSS: 0 } │ { JS: 2479, CSS: 15558 } │
└─────────┴─────────────────────────┴──────────────────────┴──────────────────────────┘
```

(All sizes gzipped.)

_Why?_ Tachyons classes, although terse, still occupy more characters than
alternatives like CSS Modules.  This screenshot of the minified Tachyons code
demonstrates the idea:

![Screenshot of minified Tachyons components](./img/minified-tachyons.jpg)

### Server-side rendering

Comparing CSS Modules to Tachyons using [React's server-side
rendering](https://reactjs.org/docs/react-dom-server.html) reveals the
differences aren't limited to client-side assets:

```shell
$ node scripts/ssr-tachyons.js 2> /dev/null
[tachyons] renderToString, loop x10000: 33153.42862698436 ms
[tachyons] renderToNodeStream, 10 parallel x1000: 35053.46060299873 ms
$ node scripts/ssr-cssmodules.js 2> /dev/null
[cssmodules] renderToString, loop x10000: 31617.192449986935 ms
[cssmodules] renderToNodeStream, 10 parallel x1000: 33382.98804599047 ms
$ node scripts/ssr-inline.js 2> /dev/null
[inline] renderToString, loop x10000: 40916.44756999612 ms
[inline] renderToNodeStream, 10 parallel x1000: 44937.595535993576 ms
```

Less `className` strings result in slightly faster render times.

### Example components

This test uses two components for testing. Both components are coded separately
with CSS Modules and Tachyons, using the same DOM and styles. There's no visual
difference in the components.

#### [Button](./src/Button)

A simple button with a few properties.

<img alt="Screenshot of button" height="84" src="./img/button.jpg" width="219" />

#### [Sidebar](./src/Sidebar)

A more complicacted navigation component with some state.

<img alt="Screenshot of sidebar" height="820" src="./img/sidebar.jpg" width="315" />

#### [Page](./src/Page)

A larger component that includes Button and Sidebar along with fake products and
some additional content.

<img alt="Screenshot of page" src="./img/page.jpg" />

### Setup

1. Make sure [Node.js](https://nodejs.org/en/) 14.x.x is installed
2. Clone the repository
3. Install dependencies in the repository directory:

    ```shell
    npm install
    ```

### Storybook

Run the project's [Storybook](https://storybook.js.org):

```shell
npm start
```

### Build and compare

Run the project's build script and compare file sizes:

```shell
# Clean build directory
npm run clean

# Build the project
npm run build

# Compare file sizes
npm run compare
```

