
declare namespace useMedia {
  export interface MediaResult {
    matches: boolean
    media: string
  }
}

export function useMedia(query: string): useMedia.MediaResult | void;
export function useMediaPredicate(query: string): boolean;
