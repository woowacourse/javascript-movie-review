declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.css";

declare module "*.html?raw" {
  const content: string;
  export default content;
}
