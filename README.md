<div align="center">
    <img src="https://github.com/ryanSN/winmoji/blob/master/winMoji.gif" alt="winMoji" title="winMoji" />
    <h1>winMoji</h1>
</div>

<p align="center">
  <br>
  <a href="#get-winmoji">Installation</a>
  .
  <a href="#shield-privacy">Privacy</a>
  .
  <a href="#license">License</a>
  <br/>
</p>

<p align="center">
Look up emojis on Windows! It's an alternative solution to using the Windows onscreen keyboard or on Windows 7 where this keyboard does not exist.

🤓😎😆😐
<br/>
<br/>

</p>

<p align="center">
  <a href="https://github.com/ryanSN/winmoji/actions?query=workflow%3ACI">
    <image src="https://github.com/ryanSN/winmoji/workflows/CI/badge.svg" alt="CI">
  </a>
    <image src="https://img.shields.io/github/downloads/ryansn/winmoji/total" alt="downloads">
  <a href="https://coveralls.io/github/ryanSN/winmoji">
    <image src="https://coveralls.io/repos/github/ryanSN/winmoji/badge.svg" alt="coveralls">
  </a>
</p>

## Get winMoji

**[Download the latest release](https://github.com/ryanSN/winmoji/releases)** (Windows only)

## Features

- Clicking on the emoji saves the emoji to your clipboard, Allowing to be pasted anywhere you need it.

- Using shortcut `CTRL+SHIFT+E` will toggle winMoji for quick adding of emojis.

## How do I contribute to `winMoji` ?

Contributions are welcome! Checkout our [issues](https://github.com/ryansn/winMoji/issues) list or contribute to one of the [PRs](https://github.com/ryansn/winMoji/pulls).
Make your own if you want something and don't see it listed.

## Development

Feel free to contribute to this app. To develop run the following commands

```
$ yarn
$ yarn dev
```

## Distribute

```
$ yarn release
```

**OR**

To package for debug purpose

```
$ yarn build:win
```

## :shield: Privacy

winMoji collects anonymous users statics to help us make the app better.

This app has analytics that will track number of users only ([analytics.js](https://github.com/ryansn/winmoji/blob/master/electron/helpers/analytics.ts)).

This app never sends any personally identifying information, nor does it track what emojis you have selected.

## License

MIT © [Ryan Chatterton](./LICENSE.md)
