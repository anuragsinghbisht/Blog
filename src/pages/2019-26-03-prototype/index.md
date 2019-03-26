---
path: '/js-prototype'
date: '2019-03-26'
title: 'Prototypal Inheritance'
tags: ['javascript']
excerpt: 'Prototypal Inheritance'
---

## Prototypal Inheritance

------

This course explores the mechanics of inheritance in JavaScript by showing how prototypes work as chained references to other objects. Learn to take full advantage of prototype shortcuts to make your work simpler and faster…and debug them if you hit a snag.
We’ll explore:

* how to manipulate prototypes to work like traditional classes
* how polymorphism and factory functions can be used within JavaScript
* how the class, new, and this keyword work and how to use them
* using the instanceof, Object.create, and Object.getPrototypeOffunctions to explain why objects have the properties that they do

Link to other objects through prototype chain

------

#### Prototype Chain

In javascript, we can define an object as below -

```js
const obj = {
  firstName: "Kent"
};
```

To access *firstName* of the object, we can simply say -

```js
obj[firstName]; // Kent
```

If we access a property not present in object, it would return *undefined*

```js
obj[lastName]; // undefined (lastName is not present in obj)
```

But, *obj* can access the property/method if it's present in it's prototype chain. For example *toString()* method, even though it's not present directly in *obj*, we can access it as it's part of the prototype chain. All objects are prototype of *Object*, which has the *toString* method.

```js
obj.toString() // [object Object] (toString() is present in prototype chain)
```

So, now we can create a *protoObj* which will have the property *lastName*. We will set the prototype of *obj* to *protoObj*. After that *obj* will be able to access the *lastName* property as it will be present in it's prototype chain.

```js
const protoObj = {
    lastName: "Clark"
};

Object.setPrototypeOf(obj, protoObj);

obj.lastName; // "Clark"
```
-----

#### Prototype delegation using javascript new keyword

In Javascript, we can use *new *keyword to create new objects. 

```js
var obj = new Object();
```

We can also use *new* keyword with function to create object. In that case the function will act as a *constructor* function.

```js
function Car(make) { // Car -> Constructor function
    this.make = make;
}

const myCar = new Car('ford'); // Creates a new instance of Car function with 'make' property
```

Following are the series of things that happen when we use the *new* keyword -

* First, an object is created and assigned to this (current context)
* All properties/methods are attached to the currently created object.
* The constructor function is set as a prototype of the created object. And, therefore any properties/methods attached to the constructor function prototype becomes available in the newly created object.
* Return the object created.

```js
function Car(make) { // Constructor 
    this.make = make;
    this.wheels = 4;
}
Car.prototype.wheels = 2;
Car.prototype.color = 'Black';
Car.prototype.sayInformation = function () {
    console.log(`${this.make} car has ${this.wheels} wheels and ${this.color} color.`);
}

const myCar = new Car('ford');

myCar.make; // ford -> returns value of make property in myCar.
myCar.wheels; // 4 -> returns value of wheels property in myCar. 
myCar.color; // Black -> returns value of color property in myCar prototype object.
myCar.sayInformation();// ford car has 4 wheels and Black color.
```
-----

#### Understanding .constructor property

In Javascript, all functions have a *.prototype* object. By default, this *prototype* object has a *constructor* property which points back to the function itself.

```js
function Foo() { /* ... */ }

Foo.prototype; // [object Object]
Foo.prototype.constructor // Foo
```

So, if we create an object of *Foo*. The *constructor* of the newly created object will also point to *Foo*.

```js
var a = new Foo(); // an instance is created.
a.constructor === Foo; // true 
```

But the notion that *constructor* of *instance* is always equal to the *function* used to create it is wrong. When we refer to *a.constructor* we are accessing the *constructor* property present in the* prototype chain*, which by default points to the *function itself*. 

```js
function Foo() { /* ... */ }
Foo.prototype = {}; // Update the prototype object
var a = new Foo();
a.constructor === Foo; // False
a.constructor === Object; // True
```

We can also use *Object.defineProperty* to set the *constructor* property to *Foo*.

```js
function Foo() { /* ... */ }
Foo.prototype = {}; // Update the prototype object
Object.defineProperty(Foo.prototype, "constructor", {
  enumerable: false,
  writable: true,
  configurable: true,
  value: Foo
});
var a = new Foo();
a.constructor === Foo; // True
a.constructor === Object; // False
```

-----

#### Understanding this keyword within prototypes

When we create an object using *new keyword*, the *this context* in the *constructor function* refers to the instance being created. By passing the *this* object using *.call* to *super function*, we can create the *inheritance* in javascript as below. We would also need to update the *prototype* object of *bar* so that we can create the *prototype chaining*.

```js
function Foo(name) { this.name = name; }

Foo.prototype.myName = function () { return this.name; }

function Bar(name) { Foo.call(this, name); }

Bar.prototype = Object.create(Foo.prototype);

const a = new Bar('tyler');

a.myName() // tyler
```
-----

#### Iterating through object using for-in loop

We can iterate through the properties of object using the *for-in* loop.

```js
const obj = { firstName: 'Anurag', lastName: 'Bisht' }

for(let property in obj) {
    console.log(`${property} :: ${obj[property]}`); 
}

// Output
firstname :: Anurag
lastName :: Bisht 
```

One of the side-effects of for-in loop is that it will also iterate the properties present in prototype chain. 

```js
const obj = { firstName: 'Anurag', lastName: 'Bisht' }
const protoObj = { hair: 'Black' }

Object.setPrototypeOf(obj, protoObj);

for(let property in obj) {
    console.log(`${property} :: ${obj[property]}`); 
}

// Output
firstname :: Anurag
lastName :: Bisht 
hair :: Black
```

To prevent this we can use a check in our for-in loop

```js
if (obj.hasOwnProperty(property)) {}
```

-----

#### Object.assign() vs Object.create()

We can create instance of an object using *Object.create()*. The object passed in the function becomes the prototype of the child object. This creates prototype chain between parent & child

```js
const parent = {
    hair: 'black',
    heightInInches() { return this.height * 12; }
}

const child = Object.create(parent);
child.height = 6;
child.heightInInches(); // 72
```

But, this has a side-effect also. If we modify the parent, this will reflect in the child also.

```js
parent.heightInInches = () => true;
child.heightInInches(); // true
```

We don't want this to happen. So, It's better to create an object using *Object.assign()*. This will create a direct copy of the objects provided without creating any prototype chain between them.

```js
const child = Object.assign({ hair: 6 }, parent);
child.heightInInches(); // 72
parent.heightInInches = () => true;
child.heightInInches(); // 72
```

-----

#### Understanding Prototype delegation with class keyword

Class keyword is just a syntactical sugar to ease the programming.

```js
class Vehicle {};
typeof Vehicle // function
typeof Vehicle.prototype // constructor
```

All the methods declared inside the class lives in it's prototype object.

```js
class Vehicle {
    isLegal() {
        return true;
    }
}

Vehicle.prototype.isLegal; // true
```

We can inherit the properties of class using the extends keyword. This simply creates a prototype chain between the parent and the child.

```js
class Car extends Vehicle {
    canBeUsed() { return this.isLegal(); }
}

const ford = new Car();

ford.canBeUsed() // true

Object.getPrototypeOf(ford) === Car.prototype; // true
Object.getPrototypeOf(Car.prototype) === Vehicle.prototype // true
```
----- 

#### Assign & access methods of a class with static properties

If we want to access the property of a class directly using className we will get undefined. As the properties by default are part of the prototype object of the class

```js
class Food {
    isHealthy() { return true; }
}
Food.isHealthy(); // Error : isHealthy is not defined in Food.
Food.prototype.isHealthy(); // true
```

If we want to define a property w.r.t our class, we need to use the static keyword.

```js
class Food {
    static isHealthy() { return true; }
    static canBeEaten() { return this.isHealthy(); }   
}

Food.isHealthy(); // true
```

-----

#### Determine an object's constructor using instanceof operator

*instanceof* operator checks in the prototype chain if the .constructor is equal to the function or not.

```js
function Car(make) { this.make = make; }

const myCar = new Car('ford');
myCar instanceof Car // true

function Boat(engine) { this.engine = engine; }

Object.setPrototypeOf(Boat.prototype, Car.prototype);
const myCar = new Boar('ford');
myCar instanceof Car // true
```
-----

#### Create factory functions for object composition

Suppose we have a game with different human characters. We can represent it in javascript in following ways

```js
const krish = {
    hair: 'Black',
    height: '6 foot',
    type: 'human'
}

const priya = {
    hair: 'Blonde',
    height: '6 foot',
    type: 'human'
}
```

But, if we don't want to repeat the same human property we can make use of prototype chain to abstract it out

```js
const human = { type: 'human' }

const krish = { hair: 'Black', height: '6 foot' }
const priya = { hair: 'Blonde', height: '5 foot 4' }

Object.setPrototypeOf(krish, human);
Object.setPrototypeOf(priya, human);
```

But, this is also not effective as we have too assign human prototype to each and every object. 
For such scenarios, we can make use of Factory method to create objects without using the new keyword. 

```js
const createUser = (character, smart=true) => ({
     smart,
     ...character,
     type: 'human'    
})

const krish = createUser({ hair: 'Black', height: '6 foot' })
const priya = createUser({ hair: 'Blonde', height: '5 foot 4' })
```

-----
#### Use polymorphism with prototype linked objects

```js
const foo = { name: 'foo' }
const bar = { lastName: 'bar' }
Object.setPrototypeOf(bar, foo);

bar.name; // foo
bar.name = 'foobar';
bar.name; // food
```

We cannot override the property value if it's configured to *writable : false*

```js
const foo = {};
Object.defineProperty(foo, "name", {
  value: "foo",
  writable: false
});
```

If a property is a setter up the chain, then the setter will always be called. The property will not be added to our bar object, and the setter is not redefined.

```js
const foo = {
  set name(name) {
    this.currentName = name;
  }
};
```

----
#### Replicate javascript constructor inheritance with simple objects (OLOO)

```js
function House(color) { this.color = color; }

const myHouse = new House('white');

myHouse.color; // white
```

This way of creating an object involves lot's of tasks. We can simplify this by using OLOO (object linking to other objects)

```js
const House = { set houseColor(color) { this.color = color; } };

const myHouse = Object.create(House)
myHouse.houseColor('white');
myHouse.color; // White
```

