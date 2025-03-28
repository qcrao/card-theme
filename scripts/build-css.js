import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CSS文件列表
const cssFiles = [
  "masonry-main.css",
  "masonry-optional-1.css",
  "masonry-optional-2.css",
  "masonry-optional-mobile.css",
  "custom-notes.css",
];

// 创建输出目录
const outputDir = join(__dirname, "../src");
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// 读取所有CSS文件并生成JavaScript模块
const cssContents = cssFiles.reduce((acc, file) => {
  const content = readFileSync(join(__dirname, "../css", file), "utf8");
  acc[file] = content;
  return acc;
}, {});

// 生成JavaScript代码
const jsContent = `// 自动生成的CSS内容，请勿手动修改
export const cssContents = ${JSON.stringify(cssContents, null, 2)};
`;

// 写入到JavaScript文件
writeFileSync(join(outputDir, "css-contents.js"), jsContent);
console.log("CSS contents have been compiled to src/css-contents.js");
