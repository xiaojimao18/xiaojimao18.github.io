---
layout: post
title: div 与 span 的区别
date: 2015-09-30
excerpt_separator: <!--end_excerpt--> 
---

div是块级元素，span是内联元素（不使用css改变其表现方式的情况下）。所以，div与span的区别又可以说是块级元素和内联元素的区别。

<!--end_excerpt-->

## 块级元素的特性

1. 在没有设置width时，块级元素会自动填充父元素。
2. 在没有设置height时，块级元素的height会设置成包裹子元素时的高度（如果子元素没有浮动或者绝对定位的话）。
3. 能够设置padding和margin。
4. 通常会放置在上一个元素下面（如果上一个元素没有浮动或者绝对定位的元素的话）。
5. 忽略vertical-align属性。
6. 子元素可以是块级元素和内联元素。

## 内联元素的特性

1. 忽略width和height属性。
2. 忽略上下的margin和padding，但是可以使用左右的margin和padding。
3. 跟文字和和内联元素并列，不会进行换行。
4. 如果进行浮动或者绝对定位，那么会自动变为块级元素。
5. 可以使用vertical-align属性。
6. 子元素可以是内联元素，但不能是块级元素。
