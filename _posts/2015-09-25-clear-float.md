---
layout: post
title: 清除浮动的几种方式
date: 2015-09-25
excerpt_separator: <!--end_excerpt-->
---

很多时候，我们需要对一些元素进行并列显示。假设我们有以下代码：

```html
<div class="container">
  <div class="item" id="id1"></div>
  <div class="item" id="id2"></div>
  <div class="item" id="id3"></div>
</div>
```

现在我们需要对三个item进行并排显示，我们可能会考虑使用float来完成。但是当我们完成以后，我们就会发现，container“包裹不住”这三个item，也就是我们所说的“高度塌陷”问题。

出现这种问题，是因为在通常情况下，父元素的高度可以包裹住子元素，但是如果子元素进行了浮动，那么父元素就不会计算浮动的元素的高度。所以当所有元素都进行浮动时，父元素就计算不到这三个item的高度，因此出现了“高度塌陷”，所以我们需要清除浮动。

<!--end_excerpt-->

### 方法1：在最后添加div元素

我们可以添加一个div元素在列表最后，并将该元素设为`clear:both`。此时dom结构如下：

```html
<div class="container">
  <div class="item" id="id1"></div>
  <div class="item" id="id2"></div>
  <div class="item" id="id3"></div>
  <div style="clear:both"></div>
</div>
```

* 优点：兼容性好
* 缺点：增加了无意义的dom，不够优雅

### 方法2：使用:after伪元素

原理与第一种方法类似，不过这里我们不添加div元素，而是给container元素添加:after伪元素。

```css
.container::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
}
```

* 优点：解决得比较优雅
* 缺点：如果浏览器不支持伪元素，则不能清除浮动

### 方法3：为容器添加overflow属性

如果我们给container添加overflow属性并赋予auto, hidden, scroll其中之一的值，那么也可以清除浮动。

一般我们不会将overflow设为scroll，因为这样会给容器添加滚动条。

* 优点：操作简单，兼容性好
* 缺点：清除浮动的方式不够直观，将来的浏览器可能不兼容

### 方法4：将容器进行浮动

如果我们为container也进行浮动，那么也可以清除浮动

* 优点：操作简单，兼容性好
* 缺点：增加了不必要的浮动，而且contaner后面的元素依旧要清除浮动

### 总结

这几种方式各有优缺点，所以在实践是要具体情况具体分析，选取最佳的清除浮动的方式。
