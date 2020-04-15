---
layout: post 
title: JavaScript中的原型和继承
date: 2015-04-30
---

## 原型（prototype）

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，该属性指向一个原型对象。该原型对象中，有一个constructor属性，指向prototype所在的函数。

例如以下代码

```javascript
function Person() {
}

Person.prototype.name = 'Cowx';
Person.prototype.sayName = function() {
  alert(this.name);
}

var person1 = new Person();
var person2 = new Person();
```

以上代码对应的关系为

![原型关系图](/images/原型关系图.jpg)

在上例中，person1和person2对象的[[prototype]]属性都指向了原型对象，
虽然person1和person2都不包含属性和方法，但是我们可以调用sayName方法。
如果实例中的属性与原型对象中的属性同名，则会屏蔽原型对象中的属性。
例如加入 `person1.name = "Liu"`，则调用 `person1.sayName()` 时输出的是'Liu'而不是'Cowx'。

## 继承

在JavaScript中，继承的方法有多种，但是比较常用的是以下模式

```javascript
function SuperType(name) {
  this.name = name;
}

SuperType.prototype.sayName = function() {
  alert(this.name);
}

function SubType(name, age) {
  Supertype.call(this, name);
  this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  alert(this.age);
}
```
