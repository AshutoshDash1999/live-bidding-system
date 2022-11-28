// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-window

export {};

declare global {
  interface Window {
    cloudinary: any;
  }
}