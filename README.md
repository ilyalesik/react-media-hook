# react-media-hook

React Hook for media query. 
Uses [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API.

## Installation

Install it with yarn:

```
yarn add react-media-hook
```

Or with npm:

```
npm i react-media-hook --save
```

## Usage

Pass query to *useMedia*:

```javascript
import React from "react";
import { useMedia } from "react-media-hook";

const Component = () => {
    const mediaResult = useMedia("(min-width: 400px)");
    const biggerThan400 = mediaResult && mediaResult.matches;
    
    return <div>
        {biggerThan400 && <button>SomeButton</button>}
    </div>
};

```

## API

#### `useMedia(query: string)`
Returns *undefined* (for example, in Node.js environment 
where *mathMedia* is not defined), or object:
```javascript
{
    matches: boolean,
    media: string
}
```