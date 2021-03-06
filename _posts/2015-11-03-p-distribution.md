---
layout: post
title: 概率分布
date: 2015-11-03
excerpt_separator: <!--end_excerpt-->
---

什么是概率分布？我们可以理解为一个事件出现每种结果的概率的分布。

举例来说：

+   对于踯硬币事件来说，出现正面和反面的概率都是1/2
+   对于踯骰子事件来说，出现1-6每个面的概率都是1/6

<!--end_excerpt-->

下面介绍几种常见的分布

## 均匀分布

顾名思义，如果事件的每个结果出现的概率都是相同的，那么该事件的概率分布就是均匀分布。
例如前面所说的踯硬币和踯骰子都是均匀分布。

均匀分布可以分为离散均匀分布和连续均匀分布。

离散均匀分布
![离散均匀分布](/images/离散均匀分布.png)

连续均匀分布
![连续均匀分布](/images/连续均匀分布.png)


## 伯努利分布

伯努利分布，又称为两点分布或者0-1分布。如果一个事件只有两种结果，假设两种结果对应的值为0和1，取值为1的概率为p，则取值为0的概率为1-p

伯努利分布的期望E(x)=0*(1-p)+1*p=p

伯努利分布的方差VAR(x)=p(1-p)


## 二项分布

如果一个事件出现某种结果的概率为p，那么发生n次事件出现k次改结果的概率为：

f(n,k,p) = C(k,n) * p^k * (1-p)^(n-k)

二项分布的期望E(x)=np

二项分布的方差VAR(x)=np(1-p)


## 正态分布（高斯分布）

正态分布的概率密度函数为

![正态分布概率密度函数](/images/正态分布概率密度函数.png)

其分布的图像为

![正态分布图像](/images/正态分布图像.png)

从函数中我们可以看出，正态分布主要由两个参数来决定：![miu][miu]和![sigma][sigma]。其中![miu][miu]决定了分布的位置，而![sigma][sigma]决定了分布的形状（陡峭还是扁平）。

在正态分布中，它的期望是![miu][miu]，它的方差是![sigma][sigma]的平方。

[miu]: /images/miu.png
[sigma]: /images/sigma.png

**TO BE CONTINUED**

## 参考文献
1.  [概率分布--维基百科](http://zh.wikipedia.org/wiki/%E6%A6%82%E7%8E%87%E5%88%86%E5%B8%83)
2.	[伯努力分布--维基百科](http://zh.wikipedia.org/wiki/%E4%BC%AF%E5%8A%AA%E5%88%A9%E5%88%86%E5%B8%83)
