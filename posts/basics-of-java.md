---
slug: basics-of-java
title: Basics of Java
description: This is a tutorial that will tell you the basics of Java
image: "https://i.imgur.com/sKCLcxY.png"
tags:
  - java
  - tutorial

publishedAt: 2025-12-05T04:34:51.706Z
---

Java is a popular and powerful programming language, created in 1995.

It is used for:

- Mobile apps (specially android)
- Desktop apps
- Web apps
- Web servers and app servers
- Games
- Database connection
- etc.

### why use?

Java works on different platforms (Windows, Mac, Linux, Raspberry PI, etc.), is one of the most popular programming languages in the world, have large demand in job market, it is beginner friendly, open source, free, secure, and powerful.

### installation

Some system already have Java pre-installed, you can check with this command on your terminal

```sh
java --version
```

if you receive an error you can install for your system in this link [oracle.com](https://www.oracle.com/java/technologies/downloads/).

==**Note:** In this tutorial i used the version 21==

### syntax

The first thing you need to know is that java is Object Oriented, then you will use classes in every file that you will create.

For that reason you need to know somethings:

1. The filename and class name need be the same
2. `MyClass` and `myclass` will be treated as different
3. The `main` method is required, is the start point
4. don't forget the `;`
5. text only with double quotes `"`

Then, let's create `Main.java` and put this inside

```java
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
```

- `public` is used for make the method accessible in any place
- `static` is for make the method executable without the class instance
- `void` means that the class don't return anything
- the `System.out.println` is to print info at screen

Now you need to compile and run with these commands

```sh
javac Main.java # for compile
java Main # for run

# Output:
# Hello World
```

### variables

You can create variables for store values of these types:

- `String` - for text
- `byte` - whole numbers from -128 to 127
- `short` - whole numbers from -32,768 to 32,767
- `int` - whole numbers from -2,147,483,648 to 2,147,483,647
- `long` - whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
- `float` - fractional numbers. Sufficient for storing 6 to 7 decimal digits
- `double` - fractional numbers. Sufficient for storing 15 to 16 decimal digits
- `float` - for floating point numbers
- `char` - for single characters
- `boolean` - for true or false

For declare a new variable you can use this syntax

```java
// type variableName = value;
String str = "John";
byte bytes = 100;
short = shorting = 5000;
int interger = 100000;
long longer = 15000000000L
float floating = 4.2f;
double doubled = 19.99;
char singleLetter = "J";
boolean bool = true;
```

And if you want to create a variable that is read-only you can use the `final` keyword, like that

```java
final int age = 18;
age = 19; // error!
```

We need to follow some rules for the variables names:

1. Only letters, digits, underscores and dollar signs
2. Can't start with digits
3. Can't have white spaces
4. If starts with a letter, need to be lowercase
5. case-sensitive (myVar and myvar are different variables)
6. Can't use reserved words (int, final, etc.)

==**Note:** By convention, the final (constants) are usually written in uppercase (e.g. BIRTHYEAR), it is not required, you decide to use it or not==

If you want to make your code more clean, you can define variables with the `var` keyword like that, without the typing, but in this case you need to specify the value.

```java
var x = 5;
```

### type casting

Sometimes you have a variable in one type, but you need to change to another, when you have a `byte` but you need a `short`, or when you have a `long` and need a `int`.

For convert from smaller type to a larger type: `byte` -> `short` -> `char` -> `int` -> `long` -> `float` -> `double
`
You can use this logic

```java
int myInt = 9;
double myDouble = myInt; // Automatic casting: int to double

System.out.println(myInt);    // Outputs 9
System.out.println(myDouble); // Outputs 9.0
```

For convert from larger type to a smaller type: `double` -> `float` -> `long` -> `int` -> `char` -> `short` -> `byte`

You can use this logic

```java
double myDouble = 9.78d;
int myInt = (int) myDouble; // Manual casting: double to int

System.out.println(myDouble); // Outputs 9.78
System.out.println(myInt);    // Outputs 9
```

### operators, conditions and loops

This three things are the same for a lot of languages, if you already have a good knowledge about programming logic, you already know this.

For the operators, we have the arithmetic operators: `+`, `-`, `*`, `/`, `%`, `++`, `--`.

For the logical, we have: `&&` (and), `||` (or), and `!` (not).

We use double equal to equal and single equal for assign values, the comparison, not equal (`!=`), less than (`<`), greater than (`>`), etc. And we have the variations with the arithmetic.

And for conditions and loops we have these:

- `if` - if true do it
- `if..else` - if true do it, else do it
- `ternary operator` - short version of `if..else`
- `switch` - case 1 do it, case 2 do it, etc.
- `while` - while true do it
- `do/while` - do this while true
- `for` - while and do/while alternative, better for range

Something important, if you want to stop a loop you can use `break`, if you want to go to the next loop step you can use `continue`.

### arrays

Sometimes you need a list with `String`, `int`, or another type, for that you can use the arrays, for create a list with a max size.

```java
String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};

System.out.println(cars[0]) // accessing
System.out.println(cars[1]) // accessing

cars[2] = "Open"; // changing

// Output:
// Volvo
// BMW
```

You can too, create an empty array

```java
String[] cars = new String[4];

cars[0] = "Volvo";
cars[1] = "BMW";
cars[2] = "Ford";
cars[3] = "Mazda";

System.out.println(cars[0]);

// Output:
// Volvo
```

You can iterate over the arrays.

```java
String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};

for (int i = 0; i < cars.length; i++) {
  System.out.println(cars[i]);
}
```

Our you can use the `for-each` loop, that will iterate over all the items of the array

```java
String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};

for (String car : cars) {
  System.out.println(car);
}
```

### methods

This is how you can create blocks of code to run in different moments, they are known as `methods` or `funtions`.

```java
public class Main {
  static void myMethod() {
    System.out.println("I just got executed!");
  }

  public static void main(String[] args) {
    myMethod(); //calling the method
  }
}
```

Different from another languages, in Java you can do method overloading.

```java
int myMethod(int x)
float myMethod(float x)
double myMethod(double x, double y)
```

You can configure the same method for operate with different types.

### classes

Like I said before, the Java is Object-Oriented, then every file will be composed of a class, and have some things that you need to know about classes.

1. the attributes are the class variables
2. the methods are the class actions
3. the `public` keyword is used for create classes/attributes/methods that can be accessed by anyone
4. the `private` keyword is used for create attributes/methods that can be only accessed inside the class
5. the `protected` keyword is used for create attributes/methods that can be accessed inside the class and by subclasses
6. the `static` keyword is for make the attribute/method accessible without the class instance
7. the `abstract` keyword is for classes/attributes/methods that only is used as a template
8. the constructor is a special method that is used into the object initialization (you can create using the class name)
9. the `this` keyword is used for access methods/attributes, good for when you have local and attributes with the same name
10. for access `private` attributes/methods you can use the `get` and `set` methods
11. the `super` keyword if used in subclasses for refer the parent class

```java
// 7. 'abstract' keyword: this class is just a template
abstract class Template {

    // 1. Attributes (Class variables)
    // 3. 'public': accessible by anyone
    public String publicVar;

    // 4. 'private': accessible only inside this class
    private String privateVar;

    // 5. 'protected': accessible by subclasses
    protected String protectedVar;

    // 6. 'static': accessible without an object (shared by all)
    public static int staticCount = 0;

    // 8. Constructor: initializes the object
    public Template(String value) {
        // 9. 'this': refers to this specific object's attributes
        this.privateVar = value;

        // Increment static counter
        staticCount++;
    }

    // 2. Methods (Class actions)
    public void showMessage() {
        System.out.println("Action performed");
    }

    // 7. 'abstract' method: force subclass to create this action
    public abstract void requiredAction();

    // 10. 'get' method: allows reading private data
    public String getPrivateVar() {
        return this.privateVar;
    }

    // 10. 'set' method: allows writing private data
    public void setPrivateVar(String value) {
        this.privateVar = value;
    }
}

// Subclass needed to use the abstract template
class RealClass extends Template {

    public RealClass() {
        super("Initial Value"); // Calls parent constructor
    }

    public void requiredAction() {
        // 5. Can access protected variable here
        this.protectedVar = "I can see this";
    }
}

public class SimpleDemo {
    public static void main(String[] args) {
        // 6. Access static without creating object
        System.out.println(Template.staticCount);

        RealClass obj = new RealClass();

        // 10. Using set/get
        obj.setPrivateVar("New Value");
        System.out.println(obj.getPrivateVar());
    }
}
```

### objects

When we create classes in Java, we can use these classes for create objects.

```java
public class Main {
  int x = 5;

  public static void main(String[] args) {
    Main myObj = new Main();
    System.out.println(myObj.x);
  }
}
```

### interfaces

An interface is a like an abstract class but only for group methods.

```java
interface Animal {
  public void animalSound();
  public void run();
}
```

For use you need to add `implements` keyword before the class name and pass the interface name

```java
class Pig implements Animal {
  public void animalSound() {
    // The body of animalSound() is provided here
    System.out.println("The pig says: wee wee");
  }
  public void run() {
    // The body of sleep() is provided here
    System.out.println("running!");
  }
}
```

#### anonymous

You can use an interface for create an anonymous class

```java
interface Greetings {
	void sayHello()
}

public class Main {
  public static void main(String[] args) {
    // Anonymous class that implements Greeting
    Greeting greet = new Greeting() {
      public void sayHello() {
        System.out.println("Hello, World!");
      }
    };

    greet.sayHello();
  }
}
```

### errors

If you want to handle errors in java, you can do that with the `try...catch`

```java
try {
  //  Block of code to try
}
catch(Exception e) {
  //  Block of code to handle errors
}
```

#### finally

The `finally` can be used together with the `try...catch` for when you want to do something after the `try...catch` execution, independent of some error or success happened.

```java
try {
  //  Block of code to try
}
catch(Exception e) {
  //  Block of code to handle errors
} finally {
  // Block of code to execute after error or success
}
```

#### multiple exceptions

Sometimes you want to catch multiple exceptions and run different code for each one, in that case you can use this

```java
public class Main {
  public static void main(String[] args) {
    try {
      // Code
    }
    catch (CustomException1 e) {
      // Custom Exception 1
    }
    catch (CustomException2 e) {
      // Custom Exception 2
    }
    catch (Exception e) {
      // Exception
    }
  }
}
```

#### custom error

If you have a custom error, you can throw it with the `throw`keyword.

```java
throw new CustomException("Message");
```

#### try-with-resources

When you are working with files, streams, or other resources, it is important to close them after use. If you forget to close the resource, it may keep using memory or even prevent you from opening the file again until the program ends.

For that reason since java 7 we can use this

```java
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {
  public static void main(String[] args) {
    // resource is opened inside try()
    try (FileOutputStream output = new FileOutputStream("filename.txt")) {
      output.write("Hello".getBytes());
      // no need to call close() here
      System.out.println("Successfully wrote to the file.");
    } catch (IOException e) {
      System.out.println("Error writing file.");
    }
  }
}
```

### data structures

Sometimes we need to handle with complex data, for that reason we have the data structures, and in Java we have `ArrayList`, `HashSet` and `HashMap`.

We have other, but these are the more used.

#### array list

The `ArrayList` is a resizable array that can grow as needed, different from the `Array` that you know before.

```java
import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> cars = new ArrayList<String>();
    cars.add("Volvo");
    cars.add("BMW");
    cars.add("Ford");
    cars.add("Mazda");
    System.out.println(cars);
  }
}

// Output:
// [Volvo, BMW, Ford, Mazda]
```

#### hash set

A collection of unique elements - no duplicates are allowed.

```java
import java.util.HashSet;

public class Main {
	public static void main(String[] args) {
		HashSet<String> cars = new HashSet<String>();
	    cars.add("Volvo");
	    cars.add("BMW");
	    cars.add("Ford");
	    cars.add("BMW");  // Duplicate
	    cars.add("Mazda");
	    System.out.println(cars);
	}
}

// Output:
// [Volvo, Mazda, Ford, BMW]
```

#### hash map

With that you can store key-value pairs, the keys need to be unique.

```java
import java.util.HashMap;

public class Main {
  public static void main(String[] args) {
    // Create a HashMap object called capitalCities
    HashMap<String, String> capitalCities = new HashMap<String, String>();

    // Add keys and values (Country, City)
    capitalCities.put("England", "London");
    capitalCities.put("Germany", "Berlin");
    capitalCities.put("Norway", "Oslo");
    capitalCities.put("USA", "Washington DC");
    System.out.println(capitalCities);
  }
}

// Output:
// {USA=Washington DC, Norway=Oslo, England=London, Germany=Berlin}
```

All these data structures have it own methods, for add, delete and access the values.

### advanced

Here are some extra things that is good to know.

#### wrapper classes

Wrapper classes provide a way to use primitive data types (`int`, `boolean`, etc..) as objects.

In cases where you want to use the `ArrayList`, `HashSet` or the `HashMap` you need to use it

```java
ArrayList<int> myNumbers = new ArrayList<int>(); // Invalid
ArrayList<Integer> myNumbers = new ArrayList<Integer>(); // Valid
```

Follow this table

| Primitive Data Type | Wrapper Class |
| ------------------- | ------------- |
| byte                | Byte          |
| short               | Short         |
| int                 | Integer       |
| long                | Long          |
| float               | Float         |
| double              | Double        |
| boolean             | Boolean       |
| char                | Character     |

#### generics

If you don't know exactly the type or you want to receive different data types, you can use it

```java
public class Box<T> {

    // Generic Attribute
    private T item;

    // Generic Method (Parameter)
    public void setItem(T item) {
        this.item = item;
    }

    // Generic Method (Return Type)
    public T getItem() {
        return item;
    }

    public static void main(String[] args) {
        // Usage with String
        Box<String> strBox = new Box<>();
        strBox.setItem("Hello");
        System.out.println(strBox.getItem());

        // Usage with Integer
        Box<Integer> intBox = new Box<>();
        intBox.setItem(123);
        System.out.println(intBox.getItem());
    }
}
```

#### threads

This is for when you need to run multiple things in the same time.

You can create a thread by extending the `Thread` class or implementing the `Runnable`

```java
public class Main extends Thread {
  public void run() {
    System.out.println("This code is running in a thread");
  }
}
```

```java
public class Main implements Runnable {
  public void run() {
    System.out.println("This code is running in a thread");
  }
}
```

For run a thread you need to use the `start` method that is extended from the `Thread` class

```java
public class Main extends Thread {
  public static void main(String[] args) {
    Main thread = new Main();
    thread.start();
    System.out.println("This code is outside of the thread");
  }
  public void run() {
    System.out.println("This code is running in a thread");
  }
}
```

If it is a `Runnable` implementation you need to involve the obj into the `Thread` class and create the instance.

```java
public class Main implements Runnable {
  public static void main(String[] args) {
    Main obj = new Main();
    Thread thread = new Thread(obj); // Generate the thread
    thread.start();
    System.out.println("This code is outside of the thread");
  }
  public void run() {
    System.out.println("This code is running in a thread");
  }
}
```

#### lambda

In the Java 8 was added the lambdas, that is a method that don't have a name, it is a shorthand for methods.

```java
// (parameter1, parameter2) -> expression
(parameter1, parameter2) -> {
  // code block
  return result;
}
```

#### sorting

If you need to sort lists that have objects in it, you can use the `Comparator` and `Comparable` interfaces, where you will define what rules to use to sort the objects.

The first with the `Comparator` interface you will create a `compare()` method that need to return numbers.

- Negative if the first object should go first in a list
- Positive if the second object go first in a list
- Zero if the order doesn't matter

```java
class SortByYear implements Comparator {
  public int compare(Object obj1, Object obj2) {
    // Make sure that the objects are Car objects
    Car a = (Car) obj1;
    Car b = (Car) obj2;

    // Compare the objects
    if (a.year < b.year) return -1; // The first car has a smaller year
    if (a.year > b.year) return 1;  // The first car has a larger year
    return 0; // Both cars have the same year
  }
}
```

```java
Comparator myComparator = new SortByYear();
Collections.sort(myCars, myComparator);
```

The `Comparable` interface is for the object specify it own sorting rule with the `compareTo()` method.

```java
class Car implements Comparable {
  public String brand;
  public String model;
  public int year;

  // Decide how this object compares to other objects
  public int compareTo(Object obj) {
  	Car other = (Car)obj;
    if(year < other.year) return -1; // This object is smaller than the other one
    if(year > other.year) return 1;  // This object is larger than the other one
    return 0; // Both objects are the same
  }
}
```

### links

- w3schools tutorial https://www.w3schools.com/java/default.asp
- oracle tutorial https://docs.oracle.com/javase/tutorial/
- geek for geek tutorial https://www.geeksforgeeks.org/java/java/
