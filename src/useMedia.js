// @flow
import { useState, useEffect } from "react";

type MediaResult = {
    matches: boolean,
    media: string
};

function omitMatchMediaResult(matchMediaResult: MediaQueryList | MediaQueryListEvent): MediaResult {
    const { media, matches } = matchMediaResult;
    return { media, matches };
}

export function useMedia(query: string): ?MediaResult {
    if (typeof matchMedia === "undefined" || !matchMedia) {
        return;
    }
    const [isMounted, setMounted] = useState(false);
    const [result, setResult] = useState((!isMounted && omitMatchMediaResult(matchMedia(query))) || undefined);

    useEffect(
        () => {
            setMounted(true);
            function callback(matchMediaResult) {
                setResult(omitMatchMediaResult(matchMediaResult));
            }

            const matchMediaResult = matchMedia(query);
            callback(matchMediaResult);
            matchMediaResult.addListener(callback);
            return () => matchMediaResult.removeListener(callback);
        },
        [query]
    );

    return result;
}