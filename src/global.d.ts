// React 19 removed the global JSX namespace; re-declare it here for backward compat.
declare namespace JSX {
  type Element = import("react").JSX.Element;
  interface IntrinsicElements
    extends import("react").JSX.IntrinsicElements {}
  interface ElementAttributesProperty
    extends import("react").JSX.ElementAttributesProperty {}
  interface ElementChildrenAttribute
    extends import("react").JSX.ElementChildrenAttribute {}
  interface IntrinsicAttributes
    extends import("react").JSX.IntrinsicAttributes {}
}
