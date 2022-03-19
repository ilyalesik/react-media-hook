# react-media-hook

[![CircleCI](https://circleci.com/gh/ilyalesik/react-media-hook.svg?style=shield)](https://circleci.com/gh/ilyalesik/react-media-hook)
[![npm version](https://img.shields.io/npm/v/react-media-hook.svg)](https://www.npmjs.com/package/react-media-hook)
[![npm downloads](https://img.shields.io/npm/dt/react-media-hook.svg)](https://www.npmjs.com/package/react-media-hook)

React Hook for Media Queries. 
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

Pass query to *useMediaPredicate*:

```javascript
import React from "react";
import { useMediaPredicate } from "react-media-hook";

const Component = () => {
    const biggerThan400 = useMediaPredicate("(min-width: 400px)");
    
    return <div>
        {biggerThan400 && <button>SomeButton</button>}
    </div>
};

```

## API

#### `useMedia(query: string)`
Returns *undefined* (for example, in Node.js environment 
where *mathMedia* is not defined), or object, simular to *mathMedia(...)* result:
```javascript
{
    matches: boolean,
    media: string
}
```

#### `useMediaPredicate(query: string)`
Returns just *true* or *false*.
