# repo-deps

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

![screen](http://i.imgur.com/Xa3ANaJ.png)

A high-level CLI tool to grab dependencies from a set of GitHub repos. Prints JSON to `stdout`, but can also print list format with the `--pretty` flag.

For a lower level API, see [gh-repo-dependencies](https://www.npmjs.com/package/gh-repo-dependencies).

## Install

```sh
npm install repo-deps -g
```

## Examples

The first time you run the tool, it will prompt for your GitHub username and password. You can disable this with `--no-auth` flag.

Examples:

```sh
repo-deps mattdesl/marvel-comics-api --pretty --filter=dependencies
```

Or, compiling a list from many repos (de-duplicated and sorted) and printing the registry data to JSON:

```sh
repo-deps mattdesl/marvel-comics-api Jam3/gh-api-stream > data.json
```

You can use the `--raw` flag if you want raw reigstry data (all versions).

## Usage

[![NPM](https://nodei.co/npm/repo-deps.png)](https://www.npmjs.com/package/repo-deps)

```sh
Usage:
  repo-deps repositories [opt]

Options:
  --raw, -r      raw registry JSON
  --pretty, -p   pretty print the results
  --filter, -f   filter to "dependencies" or "devDependencies"
  --no-auth      do not try to authorize GitHub API
```

Repo names are simple URLs like `"user/repo"` or a fully qualified `"git://"` URL. See [here](https://www.npmjs.com/package/github-url-to-object) for supported formats.

You can append a `ref` (commit SHA or branch name) to the name like so:

```sh
repo-deps mattdesl/budo#next stackgl/glslify --pretty
```

*Note:* Packages that do not have an associated npm module (eg: private GitHub dependencies) will be left out of the results, unless `raw` is specified in which case the `package.stats` field for that package will be null.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/repo-deps/blob/master/LICENSE.md) for details.
