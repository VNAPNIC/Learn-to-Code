## Tổng quan:

1.  Biểu thức của lambda luôn được bao bởi `{}`
2.  Nếu lambda function có bất kì param nào nó phải ở trước toán tử `->` (kiểu dữ liệu của param có thể được bỏ qua)
3.  Body của lambda function phải ở sau toán tử `->`

```kotlin
//1
doSomethingWithNumber(1000, { result ->
    // do something with result
})

//2
doSomethingWithNumber(1000, { result : String? ->
    // do something with result
})

//3
doSomethingWithNumber(1000) { result ->
    // do something with result
}

```

3 cách sử dụng trên là như nhau và như các cách `function reference` và `function anonymous`. Cách gọi thứ 3 nhìn có vẻ khác biệt chút so với 2 cách gọi còn lại. Một điểm thêm ở đây là nếu param cuối là function thì ta có thể khai báo `lambda function` bên ngoài `()`.

## implicit name of a single parameter

```kotlin
doSomethingWithNumber(1000) {
    println("The result is $it")
    // do something with result
}

```

Có thể hiểu ở đây `it` là tên đại diện cho parameter duy nhất

## Destructuring trong Lambdas

Trong phần `Function` mình đã giới thiệu về `Destructure`, áp dụng nó với Lambdas không có gì khác biệt lắm.

```kotlin
map.mapValues { entry -> "${entry.value}!" }
map.mapValues { (key, value) -> "$value!" }

```

Ở đây ta đã `destructure` entry ra 2 tham số `key` và `value`.

## Lambda return

```kotlin
//The first way
ints.filter {
    val shouldFilter = it > 0
    shouldFilter
}

//The second way
ints.filter {
    val shouldFilter = it > 0
    return@filter shouldFilter
}

```

Ở đây ta có một một `Collection` `ints` gọi đến function `filter()`, param của function `filter()`là function có kiểu trả về là `Boolean`. Ta sử dụng `lambda` để thực hiện điều này. Có 2 cách để return một function:

1.  Cách thứ nhất, giá trị của biểu thức cuối cùng trùng với return type sẽ được coi là giá trị trả về, `shouldFilter` được coi là giá trị trả về.
2.  Cách thứ hai, sử dụng [Return at Labels](https://kotlinlang.org/docs/reference/returns.html#return-at-labels) để xác định vị trí trả về, nếu chỉ để `return shouldFilter`nó sẽ hiểu là đang return trả function bên ngoài.

## Closures

Lambda, anonymous function, local function và [object expression](https://kotlinlang.org/docs/reference/object-declarations.html#object-expressions) đều có thể truy cập `closure` của nó (nôm na như là vùng bên ngoài khai báo nó). Nó có thể truy cập các function, biến và param được khởi tạo ở bên ngoài, không giống `Java`, ta chỉ sử dụng được các biến và param ở vùng bên ngoài nếu như chúng được khai báo là `final`

Java

```kotlin
final String username = edtUsername.getText().toString();

btnLogin.setOnClickListener(new View.OnClickListener() {
  @Override
  public void onClick(View v) { //username phải là final
    if (username != null && !username.isEmpty()) {
      //.....
    }
  }
});

```

Kotlin

```kotlin
var sum = 0
ints.filter { it > 0 }.forEach {
    sum += it //sum không cần phải là val (final)
}
print(sum)

```

## Function Literals

Theo mình tìm hiểu định nghĩa của `Function Literals` như sau và mình thấy hợp lý: [Comment](https://stackoverflow.com/questions/12314905/exact-meaning-of-function-literal-in-javascript)

> A function literal is just an expression that defines an unnamed function.

Một số ví dụ về function literal trong `Kotlin`:

```kotlin
val m = { (x : String) -> println("$x") }
val n : (String) -> Unit = { x -> println("$x") }
val o : (String) -> Unit = { (x : String) -> println("$x") }

fun main(args : Array<String>) {
    m("good morning")
    n("good morning")
    o("good morning")
}

```

Tất cả `m`, `n` và `o` đều thực hiện chức năng như nhau.

### Function Literals với receiver

Nếu bạn nào đọc docs bằng tiếng anh có thể hiểu `receiver object` nói đến đối tượng thực hiện `extension`:

```kotlin
fun Person.run() {
  ...
}

```

Đoạn code trên class `Person` được coi là `receiver object`.

Để extension class `Int` một function `sum()` bình thường sẽ như sau:

```kotlin
fun Int.sum(other: Int): Int {
  return this + other
}

```

Vỡi việc sử dụng function literal như sau:

```kotlin
val sum = fun Int.(other: Int): Int = this + other

```

## Inline function (Nâng cao)

Inline function được giải thích [ở đây](/kotlin/kotlin_inline_function)