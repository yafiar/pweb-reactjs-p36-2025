declare module 'react/jsx-runtime' {
  export * from 'react'
}

// Minimal JSX intrinsic elements to silence TS when @types/react is missing
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
