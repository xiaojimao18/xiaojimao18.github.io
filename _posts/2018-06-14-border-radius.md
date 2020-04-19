---
layout: post
title: 小猪乔治和 border-radius
date: 2018-06-14
---

之前看了一篇关于用CSS来画小猪佩奇的文章，抱着锻炼自己的心态造了个轮子，画了个佩奇的小弟乔治，效果可以看[这里][preview]，源码在[这里][source]。

开发过程中也让我对border-radius这个属性有了更深刻的理解。

## border-radius

以前我在使用这个属性时，只知道这个是表示圆角，常用`border-radius: 5px`实现圆角长方形或者`border-radius: 50%`来画圆形。在开发小猪的过程中，会需要使用许多不太规则的形状，因此需要了解该属性更深入的原理，才能满足我的开发需求。

### 完全体

该属性的完全体如下：

```css
border-radius: x1 x2 x3 x4 / y1 y2 y3 y4;
```

即任何值都可以转为该种形式。例如，`border-radius: 50%`等价于`border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%`。name这8个值分别代表什么含义呢？

矩形的四个圆角我们可以分别进行控制，例如矩形的左上圆角由`x1`和`y1`来控制，将一个水平半径为`x1`，垂直半径为`y1`的椭圆与矩形左上角相切，相切的两个点之间的圆弧就是最终的圆角曲线。如下图所示。

![draw.png](/assets/images/10010/draw.png)

同理，`x2`和`y2`控制右上角，`x3`和`y3`控制右下角，`x4`和`y4`控制左上角。控制的方式与左上角的类似。

### 小Tips

1. 如果对应的`x`和`y`值相等，则可以省略成`border-radius: x1 x2 x3 x4`的形式；如果这些`x`也都相等，则可以省略成`border-radius: x1`的形式。
2. 当值使用百分比时，`x`取值是参照矩形的宽度，`y`是参照矩形的高度。比如宽200px，高100px的矩形，如果设置`border-radius: 10% 10% 10% 10% / 10% 10% 10% 10%`，转换成像素等价于`border-radius: 20px 20px 20px 20px / 10px 10px 10px 10px`。
3. 当设置`border-radius: 100%`时，发现其表现与`border-radius: 50%`相同。这是因为如果水平方向的两个半径和（`x1+x2`或者`x3+x4`）大于宽度，或者垂直方向的两个半径和(`y1+y3`或`y2+y4`)大于高度时，浏览器会对它们进行等比例缩小，知道不再超出为止。

## 开始绘图

在了解了`border-radius`的原理后，就可以开始绘制了。

主要有以下几个步骤：
1. 找一张小猪乔治的图片参考
2. 对图片中的部分进行分解，并逐一实现（废话）

其实掌握了`border-radius`后，这些步骤都不难了，细心绘制就可以完成啦。

我绘制的小猪乔治如图

![pig.png](/assets/images/10010/pig.png)


## 参考资料
* [用CSS画小猪佩奇，你就是下一个社会人！][reference]


[preview]: https://xiaojimao18.github.io/george-pig/
[source]: https://github.com/xiaojimao18/george-pig/
[reference]: https://cloud.tencent.com/developer/article/1128472