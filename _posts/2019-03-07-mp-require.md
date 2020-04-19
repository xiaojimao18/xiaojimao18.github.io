---
layout: post
title: 小程序循环 require 之坑
date: 2019-03-07
---

## 1. 循环require

在JavaScript中，模块之间可能出现相互引用的情况，例如现在有三个模块，他们之间的相互引用关系如下，大致的引用关系可以表示为 A -> B -> C -> A，要完成模块A，它依赖于模块C，但是模块C反过来又依赖于模块A，此时就出现了循环require。

```javascript
// a.js
const B = require('./b.js');

console.log('B in A', B);
const A = {
    name: 'A',
    childName: B.name,
};
module.exports = A;
```

```javascript
// b.js
const C = require('./c.js');

console.log('C in B', C);
const B = {
    name: 'B',
    childName: C.name,
}
module.exports = B;
```

```javascript
// c.js
const A = require('./a.js');

console.log('A in C', A);
const C = {
    name: 'C',
    childName: A.name,
};
module.exports = C;
```

那JS引擎会一直循环require下去吗？答案是不会的，如果我们以`a.js`为入口执行程序，C在引用A时，`a.js`已经执行，不会再重新执行`a.js`，因此`c.js`获得的A对象是一个空对象（因为`a.js`还没执行完成）。

## 2. 小程序中的坑

在正常情况下，JS引擎是可以解析循环require的情形的。但是在一些低版本的小程序中，居然出现程序一直循环require的情况，最终导致栈溢出而报错，实在是天坑。

那如何解决呢，很遗憾，目前并未找到完美的方法来解决，只能找到程序中的循环require的代码，并进行修改。为了快速定位程序中的循环引用，写了一段NodeJs检测代码来检测进行检测。

```javascript
const fs = require('fs');
const path = require('path');
const fileCache = {};
const requireLink = [];

if (process.argv.length !== 3) {
  console.log(`please run as: node ${__filename.split(path.sep).pop()} file/to/track`);
  return;
}

const filePath = process.argv[2];
const absFilePath = getFullFilePath(filePath);
if (absFilePath) {
  resolveRequires(absFilePath, 0);
} else {
  console.error('file not exist:', filePath);
}

/**
 * 递归函数，解析文件的依赖
 * @param {String} file 引用文件的路径
 * @param {Number} level 文件所在的引用层级
 */
function resolveRequires(file, level) {
  requireLink[level] = file;
  for (let i = 0; i < level; i ++) {
    if (requireLink[i] === file) {
      console.log('**** require circle detected ****');
      console.log(requireLink.slice(0, level + 1));
      console.log();
      return;
    }
  }
  const requireFiles = getRequireFiles(file);
  requireFiles.forEach(file => resolveRequires(file, level + 1));
}

/**
 * 获取文件依赖的文件
 * @param {String} filePath 引用文件的路径
 */
function getRequireFiles(filePath) {
  if (!fileCache[filePath]) {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      fileCache[filePath] = fileBuffer.toString();
    } catch(err) {
      console.log('read file failed', filePath);
      return [];
    }
  }
  const fileContent = fileCache[filePath];

  // 引入模块的几种形式
  const requirePattern = /require\s*\(['"](.*?)['"]\)/g;
  const importPattern1 = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
  const importPattern2 = /import\s+['"](.*?)['"]/g;

  const requireFilePaths = [];
  const baseDir = path.dirname(filePath);
  let match = null;
  while ((match = requirePattern.exec(fileContent)) !== null) {
    requireFilePaths.push(match[1]);
  }
  while ((match = importPattern1.exec(fileContent)) !== null) {
    requireFilePaths.push(match[1]);
  }
  while ((match = importPattern2.exec(fileContent)) !== null) {
    requireFilePaths.push(match[1]);
  }

  return requireFilePaths.map(fp => getFullFilePath(fp, baseDir)).filter(fp => !!fp);
}

/**
 * 获取文件的完整绝对路径
 * @param {String} filePath 文件路径
 * @param {String} baseDir 文件路径的相对路径
 */
function getFullFilePath(filePath, baseDir) {
  if (baseDir) {
    filePath = path.resolve(baseDir, filePath);
  } else  {
    filePath = path.resolve(filePath);
  }

  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && fs.existsSync(path.join(filePath, 'index.js'))) {
      return path.join(filePath, 'index.js');
    } else if (stat.isFile()){
      return filePath;
    }
  } else if (fs.existsSync(filePath + '.js')) {
    return filePath + '.js';
  }

  return '';
}
```

