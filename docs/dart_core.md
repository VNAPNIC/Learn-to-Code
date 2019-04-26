---
layout: post
title:  "Dart core"
date:   2019-04-26 07:23:04 +0700
categories: Dart
tags:
  - Dart
hide_thumbnail: true
image: /assets/img/posts/dart-core/thumbnail.jpeg
---

Trong bài viết [Trước](/dart_environment_settings/) mình đã hướng dẫn các bạn cài đặt môi trường và setup các kiểu dự án Dart trên Intellij IDEA. Ở bài viết này mình sẽ mô tả chi tiết về cú pháp cũng như các tính năng của Dart :expressionless:.

Nếu các bạn vẫn chưa sẵn sàng cài `Dart SDK` lên máy tính thì dùng tạm `Dartpad` để chạy thử code nhé :yum: Bấm vào nút :arrow_forward: để compile và run code.

<iframe style="width:100%;height:500px;" src="https://dartpad.dartlang.org/embed-inline.html"></iframe>

```dart
// Define a function.
printInteger(int aNumber) {
  print('The number is $aNumber.'); // Print to console.
}

// This is where the app starts executing.
main() {
  var number = 42; // Declare and initialize a variable.
  printInteger(number); // Call a function.
}
```

## Important concepts

Khi bạn code Dart language, hãy luôn ghi nhớ những khái niệm sau trong đầu:

-  Mọi thứ bạn gán vào các biến (variable) đều là một *object*, và mỗi *object* là một instance của *class*. Ngay cả numbers, functions, và `null` cũng là các *objects*. Tất cả *objects* được kế thừa từ [Object][] class.

- Mặc dù Dart là ngôn ngữ strongly typed (chú trọng vào kiểu dữ liệu), nhưng type annotations lại là tuỳ chọn vì Dart có thể tự suy ra kiểu dựa vào giá trị của biến. Ví dụ trong đoạn code trên, `number` sẽ mang kiểu `int`. Khi bạn không mong đợi một kiểu nhất định nào, hãy sử dụng kiểu [`dynamic`](https://www.dartlang.org/guides/language/effective-dart/design#do-annotate-with-object-instead-of-dynamic-to-indicate-any-object-is-allowed).

- Dart hỗ trợ generic types, ví dụ như `List<int>` (một danh sách các số integers)
hoặc `List<dynamic>` (một danh sách các objects mang kiểu bất kỳ).

- Dart hỗ trợ top-level functions (ví dụ như `main()`), cũng như các functions gắn liền với một class hoặc object (tương ứng với *static* và *instance methods*). Bạn cũng có thể tạo ra functions bên trong functions (gọi là *nested* hoặc *local functions*).

- Tương tự, Dart hỗ trợ top-level *variables*, cũng như các variables gắn liền với một class hoặc object (stương ứng với *static* và *instance variables*). Instance
variables đôi lúc được biết tới với tên gọi *fields* hoặc *properties*.

- Không giống với Java, Dart không có keywords `public`, `protected`, `private`. Nếu một biến (identifier) bắt đầu với dấu underscore (\_), Nó sẽ là `private` trong library của nó (Ví dụ khi bạn `import` thư viện đó vào thì chúng sẽ ko thể dùng bên ngoài thư viện). Chi tiết hơn tại [Libraries and visibility](https://www.dartlang.org/guides/language/language-tour#libraries-and-visibility).

- *Identifiers* có thể bắt đầu bằng chữ cái hoặc dấu gạch dưới (\_), theo sau là bất kỳ sự kết hợp nào của các ký tự đó cùng với chữ số..

- Đôi khi, việc nhìn nhận một thứ nào đó trong Dart là một *expression* hay một *statement* có thể trở nên quan trọng, do đó việc sử dụng 2 từ ngữ để mô tả sẽ rất hữu ích.

- Dart tools có thể thông báo 2 loại vấn đề khi thực thi: `warnings` và `errors`. `Warnings` chỉ đơn giản chỉ ra những đoạn code có thể không chạy đúng nhưng chúng không ngăn chương trình của bạn thực thi. `Errors` có thể là lỗi xảy ra lúc `compile-time` hoặc `run-time`. `Compile-time` hiển nhiên sẽ khiến code bạn không chạy được; Kết quả của `run-time` error lại là những [exception](#exceptions) được throw ra khi chạy.

## Variables

Để khai báo một biến `name` tham chiếu tới `String` object với giá trị “Bob”, ta có thể dùng 1 trong 3 cách sau:

```dart
var name = 'Bob';

dynamic name = 'Bob';

String name = 'Bob';
```

### Default value

Giá trị khởi tạo của một biến bất kỳ đều là `null`.

```dart
int lineCount;
assert(lineCount == null);
```

### Final and const

Nếu bạn không muốn giá trị của biến bị thay đổi, hãy sử dụng `final` hoặc `const` thay vì dùng `var/type`; Việc hiểu rõ nguyên lý hoạt động`final` với `const` không hề đơn giản một chút nào :joy:

```dart
final name = 'Bob'; // Without a type annotation
// name = 'Alice';  // Uncommenting this causes an error: Error: Setter not found: 'name'.
final String nickname = 'Bobby'; // With a type annotation

const bar = 1000000; // Unit of pressure (dynes/cm2)
const double atm = 1.01325 * bar; // Standard atmosphere
```

**final** nghĩa là single-assignment :rofl: Mỗi một biến final hoặc một thuộc tính *phải có* một khởi tạo. Và một khi bạn đã gán giá trị cho biến đó thì, bạn sẽ ko thể gán lại cho nó 1 giá trị khác.

```dart
final List finalList = new List();
finalList.addAll(['one', 'two', 'three']);

// Fail: can not assign new value/reference to final finalList
finalList = new List();
// But you can change the content of the list
finalList.clear();
finalList.forEach((f) => print(f));   //empty
```

**const** nghĩa là một đối tượng bất biến không đổi ở thời điểm compile code. Một khi bạn gán giá trị tới một const object thì bạn không thể thay đổi giá trị đó. Và giá trị đó phải được khởi tạo vào thời điểm compile code, chứ ko phải đợi tới thời điểm run code.

```dart
const List constList = const ['one', 'two', 'three'];
constList.add('four');   // Can not add to immutable object
constList = new List();  // Can not assign new value
constList.clear();       // Can not change the content
constList.forEach((f) => print("const $f"));
```

Nếu `const` variable ở class level, hãy sử dụng `static const`.

Ngoài ra, `const` không chỉ được dùng trong định nghĩa hằng biến (constant variables), mà nó còn có thể tạo ra hằng giá trị (constant values).

```dart
// Note: [] tạo ra một list rỗng.
// const [] tạo ra một list rỗng và không thể thay đổi (EIL: empty, immutable list).
var foo = const []; // foo đang là một EIL.
final bar = const []; // bar sẽ luôn luôn là EIL.
const baz = const []; // baz là một compile-time constant EIL.

// Nếu bạn cố tình sửa giá trị của const variable list sẽ có lỗi
// foo[0] = 1; // Cannot modify an unmodifiable list

// Bạn có thể thay đổi giá trị của một non-final, non-const variable
// Ngay cả khi nó có giá trị = const value.
foo = [1, 2];

// Bạn không thể thay đổi giá trị của 2 biến sau.
// bar = []; // Unhandled exception.
// baz = []; // Unhandled exception.
```

## Built-in types

Dart hỗ trợ các kiểu sau:

- numbers
- strings
- booleans
- lists (hay còn gọi là arrays)
- maps
- runes (biểu diễn Unicode characters theo dạng chuỗi)
- symbols

Mình sẽ chỉ đề cập tới các kiểu mà mình thích =))

### Maps

Để khởi tạo một `Map` object, ta có thể dùng các cách sau:

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var gifts = Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';
```

Sử dụng `.length` sẽ trả về số lượng cặp key-value trong map:

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```

Chúng ta cũng sẽ gặp lỗi nếu cố tình thay đổi constant Map (constant values)

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // Uncommenting this causes an error: Cannot set value in unmodifiable Map.
```

### Runes

Trong Dart, runes là một tập hợp mã `UTF-32` của string.

Unicode định nghĩa một giá trị số duy nhất cho mỗi ký tự gồm chữ cái, số và ký hiệu sử dụng trong hệ thống chữ viết trên thế giới. Vì một Dart string là sự nối tiếp tuần tự của các UTF-16 code units, biểu diễn giá trị 32-bit Unicode trong một string đòi hỏi các cú pháp đặc biệt.

Cách thông dụng để biểu diễn một mã Unicode là `\uXXXX`, ở đây `XXXX` là một chuỗi gồm 4-chữ số hexidecimal (hệ thập lục phân, cơ số 16). Ví dụ, Kí tự trái tim (♥) là `\u2665`. Để biểu diễn nhiều hoặc ít hơn 4 hex digits, ta đặt giá trị của chúng trong dấu ngoặc nhọn. Ví dụ với emoji (:laughing:) sẽ biểu diễn là `\u{1f600}`.

`String` class có các thuộc tính mà bạn có thể sử dụng để lấy thông về rune. `codeUnitAt` và `codeUnit` properties trả về mã 16-bit. Hoặc dùng `runes` property để lấy `runes of a string`.

Ví dụ bên dưới miêu tả mối quan hệ giữa runes, 16-bit code units, và 32-bit code points.

```dart
var clapping = '\u{1f44f}';
print(clapping);
print(clapping.codeUnits);
print(clapping.runes.toList());

Runes input = new Runes(
  '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
print(new String.fromCharCodes(input));
```

Sẽ in ra

```terminal
👏
[55357, 56399]
[128079]
♥  😅  😎  👻  🖖  👍
```

## Functions

Vì Dart là `true object-oriented language` nên `function` cũng là object. Bạn có thể khai báo 1 function theo các kiểu bên dưới:

```dart
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}

isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}

bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

### Optional parameters

- Optional named parameters: Sử dụng dấu ngoặc nhọn `{param1, param2, …}`
- Optional positional parameters: Sử dụng dấu ngoặc vuông `[param1, param2, …]`
- Default parameter values: Sử dụng dấu `=` để khai báo giá trị mặc định cho **optional parameter**

```dart
String drink({String drinks = 'whisky'}) {
  return 'I am drink $drinks';
}

String say(String from, String msg, [String device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}

print(drink());
print(drink(drinks: 'vodka'));
print(say('Bob', 'Howdy'));
print(say('Bob', 'Howdy', 'smoke signal'));
```

sẽ cho ra kết quả:

```terminal
I am drink whisky
I am drink vodka
Bob says Howdy
Bob says Howdy with a smoke signal
```

### The main() function

Tất cả các ứng dụng đều có một hàm top-level `main()`. `main()` trả vể kiểu `void` và có tham số tuỳ chọn là `List<String>`.

```dart
void main(List<String> arguments) {
  print(arguments);

  assert(arguments.length == 2);
  assert(int.parse(arguments[0]) == 1);
  assert(arguments[1] == 'test');
}
```

Chú ý khi compile code nếu muốn các câu lệnh `assert` có hiệu lực thì bạn nhớ thêm flag sau vào nhé:

```terminal
$ dart --enable-asserts bin/main.dart 1 test
```

### Functions as first-class objects

Dart cho phép truyền một function với tư cách là biến của một function khác, và cũng có thể gán một function vào một biến.

```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// Pass printElement as a parameter.
list.forEach(printElement);

var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```

### Anonymous functions

Bạn có thể tạo ra các hàm vô danh (*anonymous function*) hay đôi lúc gọi là *lambda* hoặc *closure*.
```dart
([[Type] param1[, …]]) {
  codeBlock;
};
```

### Closures

Chỉ cần chú ý kiểu trả về của wrap function là `Function`.

```dart
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(num addBy) {
  return (num i) => addBy + i;
}

// Create a function that adds 2.
var add2 = makeAdder(2);

// Create a function that adds 4.
var add4 = makeAdder(4);

assert(add2(3) == 5);
assert(add4(3) == 7);
```

## Operators

### Arithmetic operators

Thấy có cái toán tử này lạ lạ :joy:

```dart
assert(5 / 2 == 2.5); // Phép chia trả về kiểu double
assert(5 ~/ 2 == 2);  // Phép chia trả về kiểu int
```

### Type test operators

Một toán tử mình nghĩ là rất mới, dùng để check kiểu của biến lúc runtime.

| Phép toán | Ý nghĩa                                   
|-----------|-------------------------------------------
| `as`      | Ép kiểu
| `is`      | `True` nếu object có cùng kiểu được chỉ định
| `is!`     | `True` nếu object không cùng kiểu được chỉ định

Mọi thứ trong dart đều là `Object` :rofl:

```dart
String s = 'String is Object';
assert(s is Object == true);
```

### Assignment operators

```dart
// Assign value to a
a = value;
// Assign value to b if b is null; otherwise, b stays the same
b ??= value;
```

Ta dùng toán tử `??=` khi muốn gán giá trị cho biến chỉ khi biến đó đang là `null`.

### Logical operators

```dart
if (!done && (col == 0 || col == 3)) {
  // ...Do something...
}
```

### Conditional expressions

```dart
condition ? expr1 : expr2
```
Nếu `condition` là true, thực hiện `expr1` (và trả về giá trị của nó); ngược lại, thực hiện và trả về giá trị của `expr2`.

```dart
expr1 ?? expr2
```
Nếu `expr1` khác `null`, trả về giá trị của chính nó; ngược lại, trả về giá trị của `expr2`.

### Cascade notation (..)

Cascades dịch nôm na là thác nước =)) cú pháp là dấu `..`, cho phép anh em thực hiện nhiều thao tác tuần tự trên 1 object. Nhìn thì giống với thuật ngữ `chain method` ([Fluent_interface](https://en.wikipedia.org/wiki/Fluent_interface)) nhưng cơ chế có đôi phần khác biệt.

```dart
querySelector('#confirm') // Get an object.
  ..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

Trong đoạn code trên, thì dòng đầu gọi tới method `querySelector()`, trả về một selector object. Các dòng tiếp theo thực hiện các thao tác với selector object, ignore bất kỳ kết quả nào mà các method đó trả về.

Chúng ta có thể viết lại như sau:

```dart
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
```

Đặc biệt lưu ý là `method` đầu tiên hoặc function khởi tạo cascade phải trả về một object thực sự. Ví dụ đoạn code sau sẽ ko thực hiện đc:

```dart
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: method 'write' isn't defined for 'void'.
```

Ở dòng trên `sb.write('foo')` chính là giá trị khởi tạo, tuy nhiên `sb.write('foo') = void`, do đó bạn không thể bắt đầu một cascade trên `void`.

### Other operators

Học thêm một toán tử mới: `?.`, tương tự như `.` dùng để truy xuất các thuộc tính của một object, nhưng an toàn hơn chút.
Ví dụ: `foo?.bar` sẽ select ra thuộc tính `bar` từ `foo`, và nếu `foo = null` thì kết quả của `foo?.bar = null`.

## Control flow statements

Dart sử dụng các câu lệnh sau để control luồng xử lý:

- Điều kiện `if` và `else`
- Vòng lặp `for`
- Vòng lặp `while` và `do-while`
- Câu lệnh `break` và `continue`
- Câu lệnh `switch` và `case`
- Câu lệnh `assert`

### If and else

Biểu thức trong điều kiện `if` bắt buộc phải là kiểu `bool`. Đoạn code sau sẽ không thể chạy, do `1` có type là `int`.

```dart
if (1) {
  print('We can not execute this code!');
}
```

### For loops

Closure bên trong Dart's `for` loops có thể capture được `value` và `index` ở thời điểm compile-time, tránh được các lỗi cơ bản hay xảy ra trong Javascript.
Hãy thử so sánh 2 đoạn code và kết quả output ra giữa 2 ngôn ngữ xem sao :hugs:

- *Javascript*
```js
    var callbacks = [];
    for (var i = 0; i < 2; i++) {
      callbacks.push(() => console.log(i));
    }
    callbacks.forEach((c) => c());
```
 ```terminal
    2
    2
```
- *Dart*
```js
    var callbacks = [];
    for (var i = 0; i < 2; i++) {
      callbacks.add(() => print(i));
    }
    callbacks.forEach((c) => c());
```
```terminal
    0
    1
```

Dart support lệnh `for-in` và `forEach`

```dart
var collection = [0, 1, 2];
for (var x in collection) {
  print(x); // 0 1 2
}

candidates.forEach((candidate) => candidate.interview());
```

### Assert

Dart hỗ trợ method `assert`, dùng để ngăn chương trình tiếp tục thực thi nếu có bất kỳ điều kiện nào bên trong nó là `false`.

```dart
// Make sure the variable has a non-null value.
assert(text != null);

// Make sure the value is less than 100.
assert(number < 100);

// Make sure this is an https URL.
assert(urlString.startsWith('https'));
```
Để thay thế nội dung hiển thị khi `assert` thất bại, chúng ta thêm message vào tham số thứ hai.

```dart
var urlString  = 'www.google.com';
assert(urlString.startsWith('https'), 'URL ($urlString) should start with "https".');
```
```terminal
Failed assertion: line 7 pos 8: 'urlString.startsWith('https')': URL (www.google.com) should start with "https".
```

## Exceptions

### Throw

Thông thường chúng ta sẽ raise một exception như sau
```dart
throw new Exception("message");
throw UnimplementedError();
throw FormatException('Expected at least 1 section');
```
đôi khi có thể là 1 objects
```dart
throw 'Out of llamas!';
```

Để nâng cao chất lượng, cũng như ý nghĩa của code thì bạn nên nghiên cứu implement exception là subtype của các method/class từ [Error](https://api.dartlang.org/dev/2.0.0-dev.65.0/dart-core/Error-class.html) và [Exception](https://api.dartlang.org/dev/2.0.0-dev.65.0/dart-core/Exception-class.html)

### Catch

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```

Bạn có thể chỉ định 1 hoặc 2 parameters cho method `catch()`.

```dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

### Finally

Kiến thức vô cùng căn bản :expressionless: Code block đặt trong `finally` sẽ được thực thi dù có hay không có ngoại lệ.

```dart
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}

try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```

## Classes

Dart là ngôn ngữ hướng đối tượng với class (mọi object đều là một instance của class) và *mixin-based inheritance* (mặc dù một class chỉ có duy nhất một superclass, nhưng mà class body (các variable, method) có thể được sử dụng lại như multiple class hierarchies (đa thừa kế)).

```dart
// Create a Point using Point().
var p1 = new Point(2, 2);

// Create a Point using Point.fromJson().
var p2 = new Point.fromJson(jsonData);
```

Từ Dart 2 bạn có thể bỏ từ khóa `new`. Ví dụ: `var p1 = Point(2, 2)`.

### Using class members

Sử dụng `?.` thay cho `.` khi truy xuất `members` của class giúp ta tránh được các exception khi object có giá trị null:
```dart
// If p is non-null, set its y value to 4.
p?.y = 4;
```

### Constructors

```dart
class Point {
  num x, y;

  Point(num x, num y) {
    // There's a better way to do this, stay tuned.
    this.x = x;
    this.y = y;
  }
}
```

`this` keyword để chỉ current instance. Dart còn hỗ trợ pattern constructor

```dart
class Point {
  num x, y;

  // Syntactic sugar for setting x and y
  // before the constructor body runs.
  Point(this.x, this.y);
}
```

#### Default constructors

Nếu bạn ko khai báo constructor cũng méo sao cả :joy:, mặc định Dart sẽ tạo ra constructor không tham số cho class đó.

#### Constructors aren’t inherited

Một điều đáng lưu ý là trong Dart thì *subclasses* không kế thừa constructor từ `superclass` :upside_down_face:

#### Named constructors

Sử dụng named constructor để có thể implement nhiều constructors cho một class:

```dart
class Point {
  num x, y;

  Point(this.x, this.y);

  // Named constructor
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

#### Invoking a non-default superclass constructor

Mặc định thì constructor của subclass sẽ gọi tới unnamed, no-argument constructor của superclass. Constructor của superclass sẽ được gọi ở điểm bắt đầu của constructor body. Nếu có một [initializer list](#initializer-list) được sử dụng, nó sẽ được thực thi trước khi gọi tới superclass. Về cơ bản thì thứ tự thực thi constructor như sau:

1. initializer list
1. superclass's no-arg constructor
1. main class's no-arg constructor

<iframe style="width:100%;height:500px;" src="https://dartpad.dartlang.org/embed-inline.html?id=e57aa06401e6618d4eb8"></iframe>

Tương tự chúng ta hãy thử xem các case sau:

- Superclass không khai báo constructor:
    ```dart
    class Person {
      String firstName;
    }

    class Employee extends Person {
      Employee(Map data) {
        print('in Employee');
      }
    }

    main() {
      var emp = new Employee({});
    }
    ```
    ```terminal
    in Employee
    ```
    Thế là subclass không gọi cái default constructor, code vẫn chạy vô tư :rofl:
- Superclass khai báo unnamed,  no-agrument  constructor, và subclass gọi constructor đó (trường hợp không gọi cũng thế)
    ```dart
    class Person {
      String firstName;
      Person() {
        print('in Person');
      }
    }

    class Employee extends Person {
      Employee(Map data): super() {
        print('in Employee');
      }
    }

    main() {
      var emp = new Employee({});
    }
    ```
    ```terminal
    in Person
    in Employee
    ```
    Ok, mặc cho tham số giữa constructor của super và subclass khác nhau, code vẫn ổn :rofl:
- Superclass khai báo unamed constructor (constructor này có argument) và subclass không gọi constructor đó:
    ```dart
    class Person {
      String firstName;
      Person(num x) {
        print('in Person');
      }
    }

    class Employee extends Person {
      Employee(Map data) {
        print('in Employee');
      }
    }

    main() {
      var emp = new Employee({});
    }
    ```
    ```terminal
    Error: The unnamed constructor in 'Person' requires arguments.
    ```
    NG, ko gọi ko được :rofl:
- Superclass khai báo named constructor và subclass không gọi constructor đó
    ```dart
    class Person {
      String firstName;
      Person.fromJson() {
        print('in Person');
      }
    }

    class Employee extends Person {
      Employee(Map data) {
        print('in Employee');
      }
    }

    main() {
      var emp = new Employee({});
    }
    ```
    ```terminal
    Error: 'Person' doesn't have an unnamed constructor.
    ```
Trường hợp này cho chúng ta thấy ngay một điều là nếu superclass có một named constructor, đồng nghĩa với việc các subclass cũng phải tạo ra constructor và gọi lại construcor của superclass đó. Thử sửa lại code của `Employee`, ta có kết quả sau:
    ```dart
    class Employee extends Person {
      Employee(Map data) : super.fromJson() {
        print('in Employee');
      }
    }
    ```
    ```terminal
    in Person
    in Employee
    ```
- Superclass khai báo cả named & unnamed constructor thì sao ???
    ```dart
    class Person {
      String firstName;
      Person() {
        print('in unnamed Person');
      }
      Person.fromJson(Map data) {
        print('in fromJson Person');
      }
    }

    class Employee extends Person {
      Employee(Map data) : super() {    // :super.fromJson(data)
        print('in Employee');
      }
    }

    main() {
      var emp = new Employee({});
    }
    ```
    ```terminal
    in unnamed Person   // in fromJson Person
    in Employee
    ```
Rõ ràng ở trường hợp superclass có một unnamed, no-argument constructor thì gọi hay ko gọi cũng ko thành vấn đề. Và gọi cái nào cũng đc.

Chúng ta cũng có thể truyền tham số vào superclass constructor thông qua kết quả tính toán của một `method`, tuy nhiên tham số được truyền này (hay nội tại trong `method`) không được access tới `this` :clown_face:

```dart
class Employee extends Person {
  Employee() : super.fromJson(getDefaultData());
  // ···
}
```

#### Initializer list

```dart
// Initializer list sets instance variables before
// the constructor body runs.
Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
```

**Lưu ý:** Khi khởi tạo (Ở code trên thì initializer là code block sau dấu :) không được phép truy cập tới biến `this`.

Trong quá trình development, bạn có thể validate inputs bằng cách sử dụng `assert` trong initializer list.

```dart
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}
```

#### Redirecting constructors

Đôi lúc nhiệm vụ duy nhất của một constructor chỉ là chuyển hướng sang một constructor khác trong cùng một class. Redirecting constructor luôn có body là rỗng, và chỉ sinh ra để gọi tới một constructor khác sau dấu `:`.

```dart
class Point {
  num x, y;

  // The main constructor for this class.
  Point(this.x, this.y) {
    print('This coordinate: x=$x y=$y');
  }

  // Delegates to the main constructor.
  Point.alongXAxis(num x) : this(x, 0);
}

var p = Point.alongXAxis(1);
```
```terminal
This coordinate: x=1 y=0
```
Trong ví dụ trên thì `Point1.alongXAxis` chính là `redirecting constructor`.

#### Constant constructors

Nếu như bạn muốn tạo ra một object không đổi, hãy tạo ra một `const` constructor, và đảm bảo rằng các variable là final:

```dart
class ImmutablePoint {
  static final ImmutablePoint origin =
      const ImmutablePoint(0, 0);

  final num x, y;

  const ImmutablePoint(this.x, this.y);
}
```

#### Factory constructors

Chúng ta sử dụng `factory` khi muốn implement constructor không chỉ để tạo ra một instance mới của class mà còn có thể là một instance từ cache, hoặc một subtype instance.

Ví dụ sau implement Logger class làm nhiệm vụ

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
  <String, Logger>{};

  factory Logger(String name) {
    print('Logger\'s name: $name');
    print('Logger\'s cache: $_cache');
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print('Log message: $msg');
  }
}

main() {
  var loggerOne = Logger('UI');
  loggerOne.log('Button clicked');
  print('**************');
  var loggerTwo = Logger('UI');
  loggerTwo.log('Icon clicked');
}
```
```terminal
Logger's name: UI
Logger's cache: {}
Log message: Button clicked
**************
Logger's name: UI
Logger's cache: {UI: Instance of 'Logger'}
Log message: Icon clicked
```

**Lưu ý** rằng Factory constructor không thể truy cập vào `this`.

### Methods

#### Instance methods

Ko có gì đặc sắc ngoài việc truy xuất tới instance variables mà ko cần `this`.

```dart
import 'dart:math';

class Point {
  num x, y;

  Point(this.x, this.y);

  num distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```

#### Getters and setters

Nếu bạn đã từng code Typescript thì thấy không khác mấy

```dart
class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

#### Abstract methods

Abstract methods chỉ tồn tại bên trong `abstract classes`.

```dart
abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // Provide an implementation, so the method is not abstract here...
  }
}
```

#### Overridable operators

Phần này mô tả cách implement hoạt động của các toán tử với 1 object. Ví dụ bạn có Vector class, và bạn cần định nghĩa thêm phép `+` 2 vectors chẳng hạn.

   .  |  .    |    .  |      .
-----|------|------|------
`<`  | `+`  | `|`  | `[]`
`>`  | `/`  | `^`  | `[]=`
`<=` | `~/` | `&`  | `~`
`>=` | `*`  | `<<` | `==`
`–`  | `%`  | `>>` |

```dart
class Vector {
  final int x, y;

  const Vector(this.x, this.y);

  /// Overrides + (a + b).
  Vector operator +(Vector v) {
    return Vector(x + v.x, y + v.y);
  }

  /// Overrides - (a - b).
  Vector operator -(Vector v) {
    return Vector(x - v.x, y - v.y);
  }
}

void main() {
  final v = Vector(2, 3);
  final w = Vector(2, 2);

  // v == (2, 3)
  assert(v.x == 2 && v.y == 3);

  // v + w == (4, 5)
  assert((v + w).x == 4 && (v + w).y == 5);

  // v - w == (0, 1)
  assert((v - w).x == 0 && (v - w).y == 1);
}
```

### Abstract classes

Sử dụng `abstract` modifier để khai báo một *abstract class*—Một class không thể tạo instance. Abstract classes thường được sử dụng để định nghĩa *interfaces*. Tuy nhiên nếu bạn muốn tạo instance từIf you want your abstract class to appear to be instantiable, define a factory constructor.

```dart
// This class is declared abstract and thus
// can't be instantiated.
abstract class AbstractContainer {
  // Define constructors, fields, methods...

  void updateChildren(); // Abstract method.
}
```

### Implicit interfaces

Mỗi class trong Dart ngầm định nghĩa một interface chứa toàn bộ các instance member của class đó. Dị vl, abstract thì có keyword còn interface thì méo ko :rofl:

```dart
// A person. The implicit interface contains greet().
// A person. The implicit interface contains greet().
class Person {
  // In the interface, but visible only in this library.
  final _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// An implementation of the Person interface.
class Impostor implements Person {
  get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```
Nếu như class `Impostor` không khai báo method `greet` thì chúng ta sẽ nhận quả đắng sau

```terminal
Error: The non-abstract class 'Impostor' is missing implementations for these members: 'greet'.
```
Dart hỗ trợ đa kế thừa
```dart
class Point implements Comparable, Location {...}
```
### Extending a class

Sử dụng `extends` để tạo ra subclass, và `super` để trỏ tới superclass:

```dart
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
```

#### Overriding members

Subclasses có thể override (ghi đè) instance methods, getters, và setters. Chúng ta sử dụng từ khoá `@override` để chỉ định methods, ... bị ghi đè:

```dart
class SmartTelevision extends Television {
  @override
  void turnOn() {...}
  // ···
}
```

Để thu hẹp (siết chặt) kiểu của method parameter hoặc instance variable hay còn gọi là `type safe`, bạn có thể sử dụng từ khoá `covariant`:

```dart
class Animal {
  String name;

  Animal(this.name);

  void chase(Animal x) {
    print('$name chase ${x.name}');
  }
}

class Dog extends Animal {
  Dog():super('Dog');
}

class Mouse extends Animal {
  Mouse():super('Mouse');
}

class Cat extends Animal {
  Cat():super('Cat');

  void chase(covariant Mouse x) {
    super.chase(x);
  }
}

void main() {
  Cat c = new Cat();
  Dog d = new Dog();
  Mouse m = new Mouse();
  d.chase(m); // Dog chase Mouse
  c.chase(m); // Cat chase Mouse
  c.chase(d); // Error: A value of type '#lib1::Dog' can't be assigned to a variable of type '#lib1::Mouse'.
}
```

#### noSuchMethod()

Hãy ghi đè phương thức `noSuchMethod()` trong trường hợp bạn muốn bắt các trường hợp người dùng truy cập method hoặc variable không tồn tại :sunglasses:

```dart
class A {
  // Unless you override noSuchMethod, using a
  // non-existent member results in a NoSuchMethodError.
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: ' +
        '${invocation.memberName}');
  }
}
```

### Enumerated types

#### Using enums

Để khai báo một kiểu *enumerations*, ta sử dụng từ khoá `enum`:

```dart
enum Color { red, green, blue }
```

Mỗi giá trị bên trong `enum` đều có method `index` getter, trả về vị trí của chúng (0-based array):

```dart
assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);
```

Để lấy ra toàn bộ các giá trị trong enum, chúng ta sử dụng enum’s `values` constant.

```dart
List<Color> colors = Color.values;
assert(colors[2] == Color.blue);
```

### Adding features to a class: mixins

Mixin là một tính năng tương tự với [trait]() trong php, ta sử dụng `withth` keywords và theo sau nó là một hoặc nhiều mixin names.

```dart
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person
    with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

Để implement mixin cần tạo một class kế thừa Object, không có constructor và không gọi tới `super`:

```dart
abstract class Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```

### Class variables and methods

Sử dụng `static` keyword để implement class-wide variables và methods.

#### Static variables

```dart
class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);
}
```

Biến static sẽ không được khởi tạo cho tới khi nó được sử dụng.

#### Static methods

```dart
import 'dart:math';

class Point {
  num x, y;
  Point(this.x, this.y);

  static num distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b);
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
```

Bên trong static method không được phép sử dụng `this`.

## Generics

Nếu đã đọc các ghi chú phía trên thì ắt hẳn bạn đã biết tới `List<E>` với E là một kiểu (ví dụ: `int`). Về mặt quy ước `<…>` đánh dấu `List` là một kiểu *generic* (hoặc *parameterized*).

### Why use generics?

Lợi ích:

- Code sinh ra tốt hơn nếu được chỉ định đúng kiểu của kết quả.
    ```dart
    var names = List<String>();
    names.addAll(['Seth', 'Kathy', 'Lars']);
    names.add(42); // Error
    ```
- Sử dụng generic giúp giảm code duplication.
    ```dart
    abstract class ObjectCache {
      Object getByKey(String key);
      void setByKey(String key, Object value);
    }
    abstract class StringCache {
      String getByKey(String key);
      void setByKey(String key, String value);
    }
    ```
2 class trên có thể thay bằng một class tương đương
    ```dart
    abstract class Cache<T> {
      T getByKey(String key);
      void setByKey(String key, T value);
    }
    ```
Theo quy ước, kiểu bên trong `<…>` là những chữ cái như: E, T, S, K, hay V.

### Using collection literals

List và map đều có thể parameterized. `<type>` (cho lists) và `<keyType, valueType>` (cho maps).

```dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

### Using parameterized types with constructors

Dart hỗ trợ lập trình viên chỉ định rõ một hoặc nhiều kiểu khi sử dụng constructor:

```dart
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
var nameSet = Set<String>.from(names);

class View {
  int x;
  View(this.x);
}
var views = Map<int, View>();
views[0] = View(0);
```

### Generic collections and the types they contain

```dart
var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true
```

Mọi kiểu generic trong Dart đều được *reified* (cụ thể hoá), điều này có nghĩa là thông tin về kiểu dữ liệu được mang đi ngay cả khi `runtime`.
Ngược lại, generic trong Java sử dụng *erasure* (xoá bỏ), điều này có nghĩa là bạn có thể kiểm tra được object là một List, nhưng bạn không thể kiểm tra chi tiết tới mức `List<String>`.

### Restricting the parameterized type

Khi code một generic type, bạn có thể muốn giới hạn các kiểu parameters của nó. Khi đó hãy sử dụng `extends`.

```dart
class Foo<T extends SomeBaseClass> {
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {...}
```

Hoàn toàn OK nếu bạn sử dụng `SomeBaseClass` hoặc bất kỳ subclasses nào của nó:

```dart
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
```

hoặc không một kiểu nào cả:

```dart
var foo = Foo();
print(foo); // Instance of 'Foo<SomeBaseClass>'
```

Nếu bạn chỉ định một kiểu non-`SomeBaseClass` sẽ có lỗi:

```dart
var foo = Foo<Object>();
```

### Using generic methods

Vào lúc khởi tạo, Dart’s generic giới hạn trong classes.

```dart
T first<T>(List<T> ts) {
  // Do some initial work or error checking, then...
  T tmp = ts[0];
  // Do some additional checking or processing...
  return tmp;
}
```

Kiểu generic parameter trong `first (<T>)` cho phép bạn sử kiểu argument `T` ở một vài nơi:

- Trong function’s trả về kiểu (`T`).
- Trong kiểu của tham số (`List<T>`).
- Trong kiểu của biến địa phương (`T tmp`).

**Chi tiết hơn để khai báo một generic methods**

- Kiểu parameter của generic methods được liệt kê ngay sau tên của method/function và bên trong `<>`
    ```dart
    /// 2 kiểu của parameters, [K] và [V].
    Map<K, V> singletonMap<K, V>(K key, V value) {
      return <K, V>{ key, value };
    }
    ```
- Trong trường hợp kiểu là class, bạn có thể thêm giới hạn cho nó
    ```dart
    /// Danh sách 2 số kiểu [T] dẫn xuất từ kiểu num.
    T sumPair<T extends num>(List<T> items) {
      return items[0] + items[1];
    }
    ```
- Class methods (*instance* và *static*) có thể khai báo generic parameters theo cách tương tự:
    ```dart
    class C {
      static int f<S, T>(int x) => 3;
      int m<S, T>(int x) => 3;
    }
    ```
- Generic method với tư cách là function-typed parameters, local functions, và function expressions:
    ```dart
    /// Truyền vào generic method là một [callback] parameter.
    void functionTypedParameter(T callback<T>(T thing)) {}

    // Khai báo local generic function `itself`.
    void localFunction() {
      T itself<T>(T thing) => thing;
    }

    // Gán một generic function expression cho một local variable.
    void functionExpression() {
      var lambda = <T>(T thing) => thing;
    }
    ```

Chi tiết hơn về Generic method, các bạn xem thêm tại [đây](https://github.com/dart-lang/sdk/blob/master/pkg/dev_compiler/doc/GENERIC_METHODS.md).

## Libraries and visibility

Để tạo ra các shareable code base, chúng ta sử dụng 2 directives là `import` và `library`. Libraries ko chỉ cung cấp các APIs mà còn ẩn chứa các member chỉ tồn tại và truy xuất được (visible) bên trong chúng. Ví dụ các identifiers bắt đầu bằng dấu gạch dưới (\_). *Mọi ứng dụng Dart đều là các library* ngay cả khi nó không sử dụng `library` directive.

Libraries có thể được đóng gói và sử dụng thông qua công cụ [`pub`](https://www.dartlang.org/tools/pub).

### Using libraries

Sử dụng từ khoá `import` để chỉ định phạm vi namespace sẽ sử dụng của một library

```dart
import 'dart:html';
```

Với các thư viện built-in thì URI có scheme `dart:`, còn với các thư viện khác ta sử dụng system path hoặc scheme `package:`

```dart
import 'package:test/test.dart';
```

#### Specifying a library prefix

Để tránh conflict khi import, ta dùng alias:

```dart
If you import two libraries that have conflicting identifiers, then you can specify a prefix for one or both libraries. For example, if library1 and library2 both have an Element class, then you might have code like this:

import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// Uses Element from lib1.
Element element1 = Element();

// Uses Element from lib2.
lib2.Element element2 = lib2.Element();
```

#### Importing only part of a library

Import một phần của library:

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

#### Lazily loading a library

*Deferred loading* (hay còn gọi là *lazy loading*) cho phép ứng dụng load các library theo nhu cầu (on demand) nếu cần. Một vài trường hợp sau có thể bạn sẽ muốn dùng deferred loading:

- Giảm thời giản bắt đầu khởi tạo app.
- Thực hiện A/B testing.
- Để load chức năng ít sử dụng như hộp thoại dialog hoặc màn hình tuỳ chọn.

Để lazily load một library, bạn cần import chúng bằng cú pháp `deferred as`.

```dart
import 'package:greetings/hello.dart' deferred as hello;
```

Khi bạn cần sử dụng library, gọi hàm `loadLibrary()` qua định danh của chúng:

```dart
Future greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

Trong đoạn code trên, `await` keyword dừng chương trình lại cho tới khi thư viện được load xong. Bạn có thể gọi `loadLibrary()` nhiều lần trong một thư viện mà không gặp bất cứ vấn đề gì, vì thư viện chỉ load một lần duy nhất.

Luôn ghi nhớ rằng
- Các constant của library không được coi là constant trong file import. Nên nhớ rằng, constant không tông tại cho tới khi library được load.
- Bạn ko thể sử dụng kiểu từ deferred library trong file import. Thay vào đó, hãy suy xét các di chuyển nó sang interface types để có thể import bằng cả deferred library và importing file.
- Dart ngầm thêm `loadLibrary()` vào namespace mà bạn khai báo sử dụng deferred. `loadLibrary()` function trả về `Future`.

### Implementing libraries

Tham khảo [Create Library Packages](https://www.dartlang.org/guides/libraries/create-library-packages) nếu bạn muốn viết thư viện cho Dart.

## Asynchrony support

Dart libraries là một bộ siêu đầy đủ các functions trả vể [Future](https://api.dartlang.org/dev/dart-async/Future-class.html) hoặc [Stream](https://api.dartlang.org/dev/dart-async/Stream-class.html) objects. Những function này là bất đồng bộ (*asynchronous*), tương tự Javascript chúng ta có 1 cặp từ khoá `async` và `await`.

### Handling Futures

Khi bạn muốn kết quả thu được hoàn thành trong tương lai (Future), bạn có 2 cách sau:
- Sử dụng `async` và `await`.
- Sử dụng [Future](https://www.dartlang.org/guides/libraries/library-tour#future) API.

Code sử dụng `async` và `await` là bất đồng bộ, nhưng hầu như chúng giống như các đoạn code xử lý đồng bộ. Ví dụ, đoạn code sau sử dụng `await` để chờ kết quả của xử lý từ function bất đồng bộ:

```dart
await lookUpVersion();
```

Để dùng `await` thì code bắt buộc phải nằm trong `async function`

```dart
Future checkVersion() async {
  var version = await lookUpVersion();
  // Do something with version
}
```

Sử dụng `try`, `catch`, và `finally` để xử lý errors & cleanup trong code có sử dụng `await`:

```dart
try {
  version = await lookUpVersion();
} catch (e) {
  // React to inability to look up the version
}
```

**Lưu ý**: async function trả về Future object. Trong `await expression`, giá trị của `expression` thường là `Future`; và nếu không phải thì giá trị đó cũng sẽ tự động được wrapp vào trong `Future` object. `Future` object dẫn tới một promise trả về object. Sau cùng, giá trị của `await expression` sẽ trả về object đó. `await expression` sẽ dừng việc thực thi lại cho tới khi object sẵn sàng.

**Nếu bạn gặp lỗi `compile-time` khi sử dụng `await`, hãy đảm bảo răng bạn đang sử dụng `await` bên trong `async` function.** Ví dụ sau sử dụng `await` trong app’s `main()` function, body của `main()` phải đi kèm với keyword `async`:

```dart
Future main() async {
  checkVersion();
  print('In main: version is ${await lookUpVersion()}');
}
```

### Declaring async functions

Ví dụ chuyển từ function đồng bộ sang function bất đồng bộ:

```dart
String lookUpVersion() => '1.0.0';

Future<String> lookUpVersion() async => '1.0.0';
```

### Handling Streams

Khi bạn cần lấy giá trị từ một Stream, bạn có 2 lựa chọn
- Sử dụng `async` và *asynchronous for loop* (`await for`).
- Sử dụng [Stream](https://www.dartlang.org/guides/libraries/library-tour#stream) API.

```dart
await for (varOrType identifier in expression) {
  // Executes each time the stream emits a value.
}
```

- Giá trị của `expression` phải có kiểu `Stream`. Quá trình chạy như sau:
1. Đợi cho tới khi stream đưa ra giá trị.
1. Thực thi code bên trong `for loop`.
1. Lặp lại 1 và 2 cho tới khi stream bị close.

Để dừng việc lắng nghe stream, bạn có thể `break` hoặc `return`, which breaks out of the for loop and unsubscribes from the stream.

## Generators

Dart hỗ trợ 2 loại built-in generator functions:
- Synchronous generator: Trả về [Iterable](https://api.dartlang.org/dev/dart-core/Iterable-class.html) object.
  ```dart
  Iterable<int> naturalsTo(int n) sync* {
    int k = 0;
    while (k < n) yield k++;
  }
  ```
- Asynchronous generator: Trả về [Stream](https://api.dartlang.org/dev/dart-async/Stream-class.html) object.
  ```dart
  Stream<int> asynchronousNaturalsTo(int n) async* {
    int k = 0;
    while (k < n) yield k++;
  }
  ```

## Callable classes

Để có thể gọi Dart class như function, ta implement phương thức call().

```dart
class WannabeFunction {
  call(String a, String b, String c) => '$a $b $c!';
}

main() {
  var wf = new WannabeFunction();
  var out = wf("Hi","there,","gang");
  print('$out');
}
```
```terminal
Hi there, gang!
```

## Isolates


Hầu hết computers, hoặc mobile platforms được trang bị multi-core CPUs. Để tận dụng tối đa lợi thế đó, thông developer có thể chạy đồng thời các shared-memory threads. Tuy nhiên, việc chia sẻ trạng thái (shared-state) của các concurrency rất dễ dẫn tới lỗi cũng như làm code trở nên phức tạp.

Thay vì sủ dụng threads, tất cả Dart code được thực thi ở bên trong 1 vùng cô lập. Mỗi vùng vô lập có memory heap riêng, để đảm bảo rằng state của vùng isolate này không bị truy cập bởi vùng isolate khác.

Chi tiết tham khảo [dart:isolate](https://api.dartlang.org/dev/dart-isolate).

## Typedefs


Trong Dart, mọi thứ đều là object. *typedef*, hoặc *function-type* alias, đặt tên cho function mà bạn có thể định nghĩa các fields và trả về types.

Đoạn code sau không sử dụng typedef, và thông tin về kiểu sẽ biến mất khi bạn gán `compare = f`, trong khi kiểu của `f` là `(Object, Object) → int `.

```dart
class SortedCollection {
  Function compare;

  SortedCollection(int f(Object a, Object b)) {
    compare = f;
  }
}

// Initial, broken implementation.
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);

  // All we know is that compare is a function,
  // but what type of function?
  assert(coll.compare is Function);
}
```

Hot fix sử dụng *typedef*

```dart
typedef Compare = int Function(Object a, Object b);

class SortedCollection {
  Compare compare;

  SortedCollection(this.compare);
}

// Initial, broken implementation.
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);
  assert(coll.compare is Function);
  assert(coll.compare is Compare);
}
```

Với phiên bản Dart 2 hiện tại thì `typedefs` chỉ giới hạn sử dụng với `function`.

*typedef* cũng chỉ đơn giản là một alias, giúp chúng ta check kiểu của mỗi function:

```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```

## Driving Deep

Để hiểu sâu hơn về Dart thì không còn cách nào khác ngoài mần vào core của Dart. :rofl:

Bạn có thể tìm hiểu sâu về cơ chế hoạt độc và cách sử dụng của Dart libraries tại [A Tour of the Dart Libraries](https://www.dartlang.org/guides/libraries/library-tour).

Và làm thế nào để code trong sáng, convention chuẩn, hiểu những điều nên và không nên khi code Dart, thì bạn nên đọc thêm [Effective Dart](https://www.dartlang.org/guides/language/effective-dart).

## References

- [Dart Home Page](https://www.dartlang.org/)
- [A Tour of the Dart Language](https://www.dartlang.org/guides/language/language-tour)
