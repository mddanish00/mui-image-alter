<div align="center">
    <h1><span>🌅</span><br /><code>mui-image</code></h1>
</div>

<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Miracutor/mui-image/test.yml?style=flat-square) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/Miracutor/mui-image?style=flat-square)

</div>

<p align="center">
  The <b>fork</b> by Miracutor. Original project <a href="https://github.com/benmneb/mui-image">here.</a>
</p>
<p align="center">
  The only Material-UI image component to satisfy the Material guidelines for loading images.
</p>
<p align="center">
  <strong><a href="https://miracutor.github.io/mui-image/">Demo Playground ↗️</a></strong> <br />
</p>

### If you're already using [Material-UI v5](https://mui.com), why not display your images according to the Material guidelines too?

> Illustrations and photographs may load and transition in three phases at staggered durations, rather than relying on opacity changes alone.
>
> Visualize the image fading in, like a print during the photo development process.
>
> \- [Material guidelines](https://material.io/archive/guidelines/patterns/loading-images.html#loading-images-usage)

## About the fork

I actually just to make a fork with small modification for my website but somehow I ended changed many things... How it became like this?

Changes in this fork:

- Rewritten fully in Typescript with types built-in.

- Use Vite instead of nwb for development and building the library for fast and better developer experience for me!

- A lighter UMD build by externalize React and Material UI library. (You need both React and Material UI UMD to use this component.)

- Put all styles in styled instead of using style prop for better compability with MUI's styled.

- Add component (only works for `img` and `img`-derived HTML element) and sx prop from official MUI.

- Height and width prop forwarded to the component root element instead of using CSS to set height and width.

## Simple Q & A

- **Q**: Why you created this fork?  
  **A**: MUI's styled don't work very well with the original mui-image because some of default styling and it use style prop instead of using styled to set some of the styling. So, I want to modify a little bit... And I end up doing at lot.  
  Originally, I want to just post an issue for this but I am suck in comunication.

- **Q**: Are you not going to publish on npm?  
  **A**: Probably not. I don't think there is any demand on this. I am just weird. Maybe if someone post an issue about this and 100 people comment on that issue, maybe I will do it.

- **Q**: Why you change nwb to Vite?  
  **A**: I just wanted to fork for my own benefit. So, I thought maybe I can write this in TypeScript... but it don't work with nwb. I am so frustrated that I cannot find how to do it and try migarating to Vite instead. It took a lot of work but never thought it work so well...
  Maybe there is actually a way to use Typescript with nwb but I never regret switching to Vite.

  Vite is so fast!!!😍

- **Q**: Will you intergrate changes from the original project?  
  **A**: Yeah. As many as possible.

---

### 1. Install

```shell
npm i https://github.com/Miracutor/mui-image
```

### 2. Use

```js
import Image from 'mui-image';

<Image src="my-image.png" />;
```

### 3. Profit 💰

_Note: Profits not guaranteed and MUI v5 is a peer dependency. If you need to support legacy versions of Material-UI, use [`material-ui-image`](https://github.com/TeamWertarbyte/material-ui-image) instead. See the [comparison chart](#comparison-with-similar-components) below for more._

## Usage Examples

You can use `mui-image` like a regular image.

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

With this fork, you can use MUI's styled normally like this. More info on MUI's [official doccumentation](https://mui.com/system/styled/).

```ts
import { styled } from '@mui/material/styles';
import Image from 'mui-image';

const customImage = styled(Image)({
    margin: 0 auto;
    max-width: 100%;
    display: block;
    max-height: 500px;
});
```

You also can use composition to create custom components.

```ts
import Image, { ImageProps } from 'mui-image';

const customImage = ({ className, ...props }: MuiImageProps) => (
  <Image className="some-custom-class" {...props} />
);
```

You also can extend the props by importing props.

```ts
import React from 'react';
import Image, { ImageProps } from 'mui-image';

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
import Image, { ImageProps } from 'mui-image';

const CustomImg = ({ className, loading, ...other }) => (
  <img className="whatever-custom-img" loading="lazy" {...other} />
);

type CustomImageProps<M extends ElementType<any> = 'img'> = ImageProps<M> & {
  customImage: string;
};

const customImage = ({
  customImage,
  src,
  ...props
}: CustomImageProps<'img'>) => {
  const imageSrc = () => {
    if (customImage === 'grass') {
      return 'https//www.picture.org/grass.png';
    }

    if (customImage === 'beach') {
      return 'https//www.picture.org/beach.png';
    }

    return 'https//www.picture.org/none.png';
  };
  return <Image src={imageSrc()} component={CustomImg} {...props} />;
};
```

Like and subscribe below for more. ⏬

## Props

| Name                 | Type             | Default                      | Description                                                                                                                                                                                                                                                                                    |
| -------------------- | ---------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alt                  | string           | ""                           | Alternate text for the image, which is displayed if the image fails to load or is not available. This text is also used by screen readers to provide a textual representation of the image for users who are visually impaired.                                                                |
| bgColor              | string           | "inherit"                    | Background color of the image when it first loads. This can be used to create a smooth transition between the loading state and the fully-loaded image.                                                                                                                                        |
| className            | string           | "mui-image-img"              | Class name to be applied to the root element of the Image component.                                                                                                                                                                                                                           |
| distance             | string / number  | 100                          | Distance (in any valid CSS length units) that the image should shift when it finishes loading. This prop is only used if the shift prop is set. Accept valid CSS [`length`](https://developer.mozilla.org/en-US/docs/Web/CSS/length#units) value.                                              |
| duration             | number           | 3000                         | Duration of the transition (in milliseconds) when the image finishes loading. This prop is used to set the transition-duration CSS property on the image. Accept valid CSS [`transition-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration) in milliseconds.      |
| easing               | string           | cubic-bezier(0.7, 0, 0.6, 1) | Easing function for the transition when the image finishes loading. This prop is used to set the transition-timing-function CSS property on the image. Accept valid CSS [`transition-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) value.     |
| errorIcon            | boolean / node   | true                         | Whether or not to display an error icon when the image fails to load. If set to true, the default error icon will be displayed. If set to false, no error icon will be displayed. If set to a JSX element, the specified element will be displayed as the error icon.                          |
| fit                  | string           | "contain"                    | How the image should be resized to fit within its container. Accept valid CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit#syntax) value.                                                                                                                        |
| iconWrapperClassName | string           | "mui-image-iconWrapper"      | Class name to be applied to the `div` element that wraps the error or loading icon. This can be used to apply custom styles to the icon using CSS.                                                                                                                                             |
| iconWrapperStyle     | object           | { }                          | Inline styles to be applied to the `div` element that wraps the error or loading icon.                                                                                                                                                                                                         |
| position             | string           | "relative"                   | Positioning of the image within its container. Accept valid CSS [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) value.                                                                                                                                                 |
| shift                | boolean / string | false                        | Direction in which the image should shift when it finishes loading. Possible values are "left", "right", "top", "bottom", null, or false. If set to null or false, no shift animation will be applied.                                                                                         |
| shiftDuration        | number           | duration \* 0.3              | Duration of the shift animation (in milliseconds) when the image finishes loading. This prop is only used if the shift prop is set to a valid shift direction.                                                                                                                                 |
| showLoading          | boolean / node   | false                        | Whether or not to display a loading indicator while the image is loading. If set to true, the default loading indicator will be displayed. If set to false, no loading indicator will be displayed. If set to a JSX element, the specified element will be displayed as the loading indicator. |
| **_src_** \*         | string           |                              | Source of the image to be displayed. This value should be a valid URL or file path to the image.                                                                                                                                                                                               |
| style                | object           |                              | Inline styles to be applied to the root element of the Image component.                                                                                                                                                                                                                        |
| wrapperClassName     | string           | "mui-image-wrapper"          | Class name to be applied to the root `div` element that wraps the Image component.                                                                                                                                                                                                             |
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

| Feature                       |                                                     `mui-image`                                                      |                                                     `material-ui-image`                                                      |
| ----------------------------- | :------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| Size (minzipped)              | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/mui-image?color=%2343a047&label=%20&style=flat-square) | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/material-ui-image?color=%23b71c1c&label=%20&style=flat-square) |
| Supports MUI v5               |                                                          ✅                                                          |                                                              ❌                                                              |
| Fade-in                       |                                                          ✅                                                          |                                                              ✅                                                              |
| Progressive level adjustments |                                                          ✅                                                          |                                                              ❌                                                              |
| Suggested duration            |                                                          ✅                                                          |                                                              ✅                                                              |
| Optional shift animation      |                                                          ✅                                                          |                                                              ❌                                                              |
| Supports legacy MUI versions  |                                                          ❌                                                          |                                                              ✅                                                              |

## License

Original Copyright (c) [benmneb](https://github.com/benmneb)

Copyright (c) 2022 [Miracutor](https://github.com/Miracutor)

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
