<div align="center">
    <h1><span>🌅</span><br /><code>mui-image-alter</code></h1>
</div>
<p align="center">
  The another Material UI image component to satisfy the Material Design guidelines for loading images.
</p>
<div align="center">

 ![GitHub License](https://img.shields.io/github/license/mddanish00/mui-image-alter?style=flat-square) [![npm](https://img.shields.io/npm/v/mui-image-alter?style=flat-square)](https://www.npmjs.com/package/mui-image-alter)  ![npm bundle size](https://img.shields.io/bundlephobia/minzip/mui-image-alter%40latest?style=flat-square) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mddanish00/mui-image-alter/test.yml?style=flat-square) ![Coverage from badge.yml](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/mddanish00/83c2a74197bb80b661019a2747e71daa/raw/mui-image-alter_coverage__main.json) [![Buy Me A Coffee](https://img.shields.io/badge/mddanish00-black?style=flat-square&logo=buymeacoffee&logoColor=black&label=Buy%20Me%20A%20Coffee&labelColor=%23FFDD00)](https://www.buymeacoffee.com/mddanish00) [![Ko-fi](https://img.shields.io/badge/mddanish00-%2372A4F2?style=flat-square&logo=kofi&label=Ko-fi&labelColor=%23F4EFE7)](https://ko-fi.com/mddanish00)

</div>
<p align="center">
  The <b>fork</b> by mddanish00. Original project <a href="https://github.com/benmneb/mui-image">here</a>.
</p>
<p align="center">
  <strong><a href="https://mddanish00.github.io/mui-image-alter/">Demo Playground ↗️</a></strong> <br />
</p>

### If you're already using [Material UI v5 and above](https://material-ui.com), why not display your images according to the Material guidelines too?

> Illustrations and photographs may load and transition in three phases at staggered durations, rather than relying on opacity changes alone.
>
> Visualize the image fading in, like a print during the photo development process.
>
> \- [Material guidelines](https://material.io/archive/guidelines/patterns/loading-images.html#loading-images-usage)

## About the fork

Alter from alternative.

I just to make a fork with small modifications for my website but somehow I ended up changing many things... How did it become like this?

### Why should I use this?

If you are satisfied with the original project, you probably not need this. This is for users with a specific need.

To put it simply, you only needed this if:

- You want to change the component root element, `img` with another component like `Image` from `next/image`.
- You want to use `styled` function from `styled-components` or `emotion`  or `MUI` on `Image` component but noticed some styles are not working properly.[^1]

[^1]: This happens on the original project because the styles were set using style props. To correct this for the original project, you need to use style or wrapperStyle or iconWrapperStyle that provided to overwrite the default style.

### Changes in this fork

- Breaking Changes
  - Height and width prop forwarded to the component root element (by default, `img`) instead of using CSS to set the height and width of the component wrapper element. Some alternate image components like `next/image` actually need for height and width prop.
  - Put all styles that set through style prop in styled for better compatibility with MUI's styled.
  - No UMD build. Go post an issue if you want UMD to be added.
  - Only named exports. Read this [article](https://esbuild.github.io/content-types/#default-interop).

- Other Changes
  - Rewritten fully in Typescript with types built-in based on MUI component types.
  - Add support to MUI's component prop; That means you can substitute the component root element with `Image` from `next/image` if you want. Components supported are `img`, `img`-derived HTML element and component with `src` prop.
  - Properly export esm and cjs build via package.json exports.
  - (NEW) Support for MUI v6 added.

- Development Changes
  - Use Vite instead of nwb for development and building the library for fast and better developer experience for me!
  - Added unit tests for testing the mui-image-alter component. Also, added a new Github Action that will automatically run these tests for every pull request.

## Simple Q & A

- **Q**: Why you created this fork?  
  **A**: MUI's styled don't work very well with the original mui-image because some of the default styling and it use style prop instead of using styled to set some of the styling. So, I want to modify a little bit... And I end up doing a lot.  
  Originally, I want to just post an issue for this but I suck in communication. 😅

- **Q**: Why you change nwb to Vite?  
  **A**: I just wanted to fork for my own benefit. So, I thought maybe I could write this in TypeScript... but it doesn't work with nwb. I am so frustrated that I cannot find how to do it and try migrating to Vite instead. (Also, looks like nwb is abandoned too...) It took a lot of work but never thought it work so well...
  Maybe there is actually a way to use Typescript with nwb but I never regret switching to Vite.

  Vite is so fast!!! 😍

- **Q**: Will you integrate changes from the original project?  
  **A**: Yeah. As many as possible. 💪

---

### 1. Install

Install the `mui-image-alter` peer dependencies first. (Can skip if you have already done it.)

If you haven't yet install MUI, please follow the [official guide](https://mui.com/material-ui/getting-started/installation/). Only MUI v5 or v6 are supported. 

Now, you can install the `mui-image-alter`.

#### Install from npm

[View library details on npm](https://www.npmjs.com/package/mui-image-alter)

```bash
npm install mui-image-alter
```

```bash
yarn add mui-image-alter
```

#### Install from repository

Recommended to specify a version tag like this for installation from the repository like below for stability.

```bash
npm install github:mddanish00/mui-image-alter#vx.x.xx
```

```bash
yarn add mui-image-alter@github:mddanish00/mui-image-alter#vx.x.xx
```

Replace `x.x.xx` with actual tags from [here](https://github.com/mddanish00/mui-image-alter/tags).

### 2. Use

```jsx
import { Image } from 'mui-image-alter';

// then

<Image src="my-image.png" />
```

### 3. Profit 💰

_Note: Profits not guaranteed and Material UI v5 or v6 is a peer dependency. If you need to support legacy versions of Material UI, use [`material-ui-image`](https://github.com/TeamWertarbyte/material-ui-image) instead. See the [comparison chart](#comparison-with-similar-components) below for more._

## Usage Examples

You can use `mui-image-alter` like a regular image.

```jsx
<Image src="my-image.png" />
```

Except... it will fade and animate in as the Material guidelines recommend. 🤯

Apply the `showLoading` prop to add a progress indicator to let your fans know something amazing is coming. You can use the default MUI indicator or bring your own. 😎

```jsx
<Image src="my-image.png" showLoading />
<Image src="my-image.bmp" showLoading={<MyCustomSpinner />} />
```

If you want the image to fail silently you can disable the `errorIcon`, or you can add your own to suit your brand.

```jsx
<Image src="my-cats.png" errorIcon={null} />
<Image src="my-dogs.png" errorIcon={<MyErrorIcon />} />
```

If you want to _disobey Google_ 😵 then you can customise the animation and speed via the `duration` and `easing` props to any valid CSS property. Duration is always milliseconds.

```jsx
<Image src="my-fish.png" duration={325} />
<Image src="my-bird.jpg" easing="ease-in-out" />
```

To add that extra bit of spice 🌶 you can do exactly what Google suggests and apply a small position `shift` to images as they appear. The direction, distance, and duration (in milliseconds) are up to you.

```jsx
<Image src="my-lawd.png" shift="left" />
<Image src="my-gawd.jpg" shift="bottom" distance={300} />
<Image src="my-gosh.gif" shift="top" distance="2rem" shiftDuration={320} />
```

And of course, you can style `mui-image` like you would a regular image... but with the addition of the MUI v5 `sx` prop and [all the benefits](https://mui.com/system/the-sx-prop/) it brings. 😏

```jsx
<Image src="my-self.jpeg" style={{ borderRadius: 16 }} />
<Image src="my-wife.webp" className="custom-class" />
<Image src="my-exgf.tiff" sx={{ display: { sm: 'none', lg: 'inline' }}} />
```

If you want to get fancy 💃 you can also add inline styles and additional `className`'s to the root wrapper `div` and loading/error icon wrapper `div`, or just target their default `className`'s. This allows for complete customisation of every aspect of the component.

### Fork Exclusive Usage

With this fork, you can use MUI's styled normally like this. More info on MUI's [official documentation](https://mui.com/system/styled/).

```ts
import { styled } from '@mui/material/styles';
import { Image } from 'mui-image-alter';

const customImage = styled(Image)({
    margin: 0 auto;
    max-width: 100%;
    display: block;
    max-height: 500px;
});
```

You also can use composition to create custom components.

```ts
import { Image, ImageProps } from 'mui-image-alter';

const customImage = ({ className, ...props }: MuiImageProps) => (
  <Image className="some-custom-class" {...props} />
);
```

You also can extend the props by importing props.

```ts
import React from 'react';
import { Image, ImageProps } from 'mui-image-alter';

type CustomImageProps = ImageProps & {
  customImage: string;
};

const customImage = ({ customImage, src, ...props }: CustomImageProps) => {
  const imageSrc = () => {
    if (customImage === 'grass') {
      return 'https//www.picture.org/grass.png';
    }

    if (customImage === 'beach') {
      return 'https//www.picture.org/beach.png';
    }

    return 'https//www.picture.org/none.png';
  };
  return <Image src={imageSrc()} {...props} />;
};
```

You can also change the component root element like official MUI components. Only img or img-derived component are supported from time being.

```ts
import React, { ElementType } from 'react';
import { Image, ImageProps } from 'mui-image-alter';
import NextImage from 'next/image';

type CustomImageProps = ImageProps<typeof NextImage> & {
  customImage: string;
};

const customImage = ({
  customImage,
  src,
  ...props
}: CustomImageProps) => {
  const imageSrc = () => {
    if (customImage === 'grass') {
      return 'https//www.picture.org/grass.png';
    }

    if (customImage === 'beach') {
      return 'https//www.picture.org/beach.png';
    }

    return 'https//www.picture.org/none.png';
  };
  return <Image src={imageSrc()} component={NextImage} {...props} />;
};
```

Like and subscribe below for more. ⏬

## Props

| Name                 | Type             | Default                      | Description                                                                                                                                                                                                                                                                                    |
| -------------------- | ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alt                  | string           | ""                           | Alternate text for the image, which is displayed if the image fails to load or is not available. This text is also used by screen readers to provide a textual representation of the image for users who are visually impaired.                                                                |
| bgColor              | string           | "inherit"                    | Background color of the image when it first loads. This can be used to create a smooth transition between the loading state and the fully-loaded image.                                                                                                                                        |
| className            | string           | ""              | Class name to be applied to the root element of the Image component.                                                                                                                                                                                                                           |
| distance             | string / number  | 100                          | Distance (in any valid CSS length units) that the image should shift when it finishes loading. This prop is only used if the shift prop is set. Accept valid CSS [`length`](https://developer.mozilla.org/en-US/docs/Web/CSS/length#units) value.                                              |
| duration             | number           | 3000                         | Duration of the transition (in milliseconds) when the image finishes loading. This prop is used to set the transition-duration CSS property on the image. Accept valid CSS [`transition-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration) in milliseconds.      |
| easing               | string           | cubic-bezier(0.7, 0, 0.6, 1) | Easing function for the transition when the image finishes loading. This prop is used to set the transition-timing-function CSS property on the image. Accept valid CSS [`transition-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) value.     |
| errorIcon            | boolean / node   | true                         | Whether or not to display an error icon when the image fails to load. If set to true, the default error icon will be displayed. If set to false, no error icon will be displayed. If set to a JSX element, the specified element will be displayed as the error icon.                          |
| fit                  | string           | "contain"                    | How the image should be resized to fit within its container. Accept valid CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit#syntax) value.                                                                                                                        |
| iconWrapperClassName | string           | ""      | Class name to be applied to the `div` element that wraps the error or loading icon. This can be used to apply custom styles to the icon using CSS.                                                                                                                                             |
| iconWrapperStyle     | object           | { }                          | Inline styles to be applied to the `div` element that wraps the error or loading icon.                                                                                                                                                                                                         |
| position             | string           | "relative"                   | Positioning of the image within its container. Accept valid CSS [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) value.                                                                                                                                                 |
| shift                | boolean / string | false                        | Direction in which the image should shift when it finishes loading. Possible values are "left", "right", "top", "bottom", null, or false. If set to null or false, no shift animation will be applied.                                                                                         |
| shiftDuration        | number           | duration \* 0.3              | Duration of the shift animation (in milliseconds) when the image finishes loading. This prop is only used if the shift prop is set to a valid shift direction.                                                                                                                                 |
| showLoading          | boolean / node   | false                        | Whether or not to display a loading indicator while the image is loading. If set to true, the default loading indicator will be displayed. If set to false, no loading indicator will be displayed. If set to a JSX element, the specified element will be displayed as the loading indicator. |
| **_src_** \*         | string           |                              | Source of the image to be displayed. This value should be a valid URL or file path to the image.                                                                                                                                                                                               |
| style                | object           |                              | Inline styles to be applied to the root element of the Image component.                                                                                                                                                                                                                        |
| wrapperClassName     | string           | ""          | Class name to be applied to the root `div` element that wraps the Image component.                                                                                                                                                                                                             |
| wrapperStyle         | object           |                              | Inline styles to be applied to the root `div` element that wraps the Image component.                                                                                                                                                                                                          |
| sx                   | object           |                              | Allows the user to style the Image component using the theme and style props provided by the MUI library. Used in the same way as the sx prop in other MUI components. Check out [MUI official documentation](https://mui.com/system/getting-started/the-sx-prop/) of the `sx` prop.           |
| component            | string / node    |                              | Allows the user to specify a custom element to use as the root element for the Image component. Used in the same way as the component prop in other MUI components. Should only be used with elements that are derived from the `img` element.                                                 |

\* required prop

Any other props (eg. `src`, `alt`, `onLoad`) are passed directly to the root image element like `img`.

All the description on this table are generated using ChatGPT and edited by me. 👍

## Material guidelines for loading images

> #### ✅ Fade-in
>
> Visualize the image fading in, like a print during the photo development process.

> #### ✅ Opacity, exposure, and saturation recommendations
>
> Images should begin loading with low contrast levels and desaturated color. Once image opacity reaches 100%, display the image with full-color saturation.

> #### ✅ Duration
>
> A longer duration is recommended for loading images, and a shorter duration is recommended for transitions.

> #### ✅ Animation
>
> Add a small position shift to loading images.

[(Source)](https://material.io/archive/guidelines/patterns/loading-images.html#loading-images-behavior)

## Comparison with similar components

| Feature                       |                                                     `mui-image`                                                      |                                                    `mui-image-alter`                                                       |                                                     `material-ui-image`                                                      |
| ----------------------------- | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| Size (minzipped)              | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/mui-image?color=%2343a047&label=%20&style=flat-square) | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/mui-image-alter?color=%23b71c1c&label=%20&style=flat-square) | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/material-ui-image?color=%23b71c1c&label=%20&style=flat-square) |
| Supports MUI v5/v6               |                                                          ✅                                                          |                                                          ✅                                                          |                                                              ❌                                                              |
| Supports MUI component prop               |                                                          ❌                                                          |                                                          ✅                                                          |                                                              ❌                                                              |
| Built-in Typescript types               |                                                          ❌                                                          |                                                          ✅                                                          |                                                              ❌                                                              |
| Fade-in                       |                                                          ✅                                                          |                                                          ✅                                                          |                                                              ✅                                                              |
| Progressive level adjustments |                                                          ✅                                                          |                                                          ✅                                                          |                                                              ❌                                                              |
| Suggested duration            |                                                          ✅                                                          |                                                          ✅                                                          |                                                              ✅                                                              |
| Optional shift animation      |                                                          ✅                                                          |                                                          ✅                                                          |                                                              ❌                                                              |
| Supports legacy MUI versions  |                                                          ❌                                                          |                                                          ❌                                                          |                                                              ✅                                                              |

## Like this project?

Star this project and also the original project too if it is useful for you.

Also, consider buying me a coffee!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/mddanish00)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/mddanish00)

## License

Copyright (c) 2022 [benmneb](https://github.com/benmneb/)

Copyright (c) 2023 [mddanish00](https://github.com/mddanish00)

[ISC License](https://choosealicense.com/licenses/isc/)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

<!-- THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE. -->

## Other License

The mui-image types from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) project is licensed under [MIT License](https://github.com/DefinitelyTyped/DefinitelyTyped/raw/master/LICENSE).

This component types structure based on types of components created by [Material UI](https://github.com/mui/material-ui) under [MIT License](https://github.com/mui/material-ui/blob/master/LICENSE).
