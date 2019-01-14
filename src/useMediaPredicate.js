// @flow
import { useState, useEffect } from "react";
import { useMedia } from "../dist/useMedia";

export function useMediaPredicate(query: string): boolean {
    const result = useMedia(query);
    return (result && result.matches) || false;
}