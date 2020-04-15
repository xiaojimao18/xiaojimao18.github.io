---
layout: post
title: Python编码学习
date: 2015-09-05
---

如果你懂英语，不妨查看[官方Unicode文档](https://docs.python.org/2/howto/unicode.html)，这里有更详细的讲解。

需要注意的是，python2.x 和 python3中的编码不同，以下说的是python2.x中的编码

str和unicode
------------
为了更好地了解python的编码，我们首先需要了解**str**和**unicode**。

**str**和**unicode**是python中的两种变量类型，他们都是**basestring**类型的子类，其中：

+	**str**：存储的是8-bit的一个一个的字节，可以表示ascii，gbk，utf-8等编码的字节流
+	**unicode**：存储的是16-bit或者32-bit的整数（依据python编译器不同而不同），整数表示Unicode编码

例如，在编码是gbk的Windows命令行中输入以下代码:

	>>> '汉'
	'\xba\xba'
	>>> u'汉'
	u'\u6c49'

第一个'汉'是由gbk编码的str类型，所以对应的是8-bit的字节流；第二个'汉'我们定义成unicode类型（在字符串前加'u'表示该字符串为unicode类型），所以对应的是16-bit的整数

encode和decode
--------------
在了解了str和unicode以后，我们就可以开始了解通过**encode**和**decode**方法来对二者进行转换。

+	**encode**：将unicode变量转化为指定编码的str变量
+	**decode**：将str变量用指定的编码转化为unicode变量

为了进一步了解，我们输入以下例子：

	>>> '汉'
	'\xba\xba'
	>>> '汉'.decode('gbk')
	u'\u6c49'
	>>> u'汉'.encode('gbk')
	'\xba\xba'
	>>> u'汉'.encode('utf-8')
	'\xe6\xb1\x89'

我们可以看到encode和decode方法的作用非常简单，就是对str和unicode变量进行转换。
而python编码关键的地方就在于，我们必须清楚地了解：该字符串到底是str类型还是unicode类型，如果是str类型，它是什么编码。

常见的情形
----------
1.	在python源代码文件中的字符串，它的编码与源代码文件的编码相同
2.	通过open文件获得的字符串，它的编码与文件的编码相同
3.	如果在控制台输出了乱码，则可以检查输出的编码是否与控制台编码相同，
	一般来说，windows控制编码为gbk，linux控制台编码为utf-8
4.	在python源代码文件头部，我们可以加上 `# coding: utf-8` 来表明源代码的编码方式。
	注意：所写的编码方式应与实际的编码方式一致
5.	有时候python会为我们自动解码，获得默认的解码方式的方法为

		import sys
		sys.getdefaultencoding()

    但是这并不是可靠的方法，我们还是要靠自己来控制编码的转换，这样才能比较可靠地保证程序的正确性

6.	我们可以用`isinstance(s, unicode)`来判断字符串s是不是unicode变量
