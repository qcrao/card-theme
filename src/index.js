import { cssContents } from "./css-contents";
import { loadLeftToggleStart } from "./toggleFullPageScroll";

const cssFiles = [
  "masonry-main.css",
  "masonry-optional-1.css",
  "masonry-optional-2.css",
  "masonry-optional-mobile.css",
  "custom-notes.css",
];

let styleElements = [];

function createStyle(cssFile) {
  const style = document.createElement("style");
  style.id = `card-theme-${cssFile.replace(".css", "")}`;
  style.textContent = cssContents[cssFile];
  document.head.appendChild(style);
  styleElements.push(style);
  console.log(`Loaded CSS: ${cssFile}`);
}

export default {
  onload: () => {
    console.log("Card Theme is loading...");
    console.log("Available CSS files:", Object.keys(cssContents));

    // Load all CSS files in order
    cssFiles.forEach((cssFile) => createStyle(cssFile));

    // Load full page scroll toggle feature
    loadLeftToggleStart();

    console.log("Card Theme loaded successfully");
  },

  onunload: () => {
    console.log("Card Theme is unloading...");
    // Remove all loaded styles
    styleElements.forEach((style) => {
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
        console.log(`Removed style: ${style.id}`);
      }
    });
    styleElements = [];
    console.log("Card Theme unloaded successfully");
  },
};
