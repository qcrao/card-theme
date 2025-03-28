import { cssContents } from "./css-contents";

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

  // 直接使用编译好的CSS内容
  style.textContent = cssContents[cssFile];
  document.head.appendChild(style);
  styleElements.push(style);
  console.log(`Loaded CSS: ${cssFile}`); // 添加调试信息
}

export default {
  onload: () => {
    console.log("Card Theme is loading..."); // 添加调试信息
    console.log("Available CSS files:", Object.keys(cssContents)); // 检查CSS文件是否被正确加载

    // 按顺序加载所有CSS文件
    cssFiles.forEach((cssFile) => createStyle(cssFile));
    console.log("Card Theme loaded successfully"); // 添加调试信息
  },

  onunload: () => {
    console.log("Card Theme is unloading..."); // 添加调试信息
    // 移除所有已加载的样式
    styleElements.forEach((style) => {
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
        console.log(`Removed style: ${style.id}`); // 添加调试信息
      }
    });
    styleElements = [];
    console.log("Card Theme unloaded successfully"); // 添加调试信息
  },
};
