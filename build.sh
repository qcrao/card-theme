#!/bin/bash
set -e  # 遇到错误立即退出

# 安装依赖
echo "Installing dependencies..."
npm install

# 编译CSS
echo "Compiling CSS..."
node scripts/build-css.js

# 检查css-contents.js是否生成
if [ ! -f "src/css-contents.js" ]; then
    echo "Error: css-contents.js was not generated!"
    exit 1
fi

# 构建扩展
echo "Building extension..."
npx roamjs-scripts build --depot