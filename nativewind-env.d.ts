/// <reference types="nativewind/types" />

import "react";

declare module "react" {
  // This targets the base interface for all JSX elements in React 19
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
  }
  
  // This ensures the compiler sees components as valid JSX elements
  interface Attributes {
    className?: string;
  }
}