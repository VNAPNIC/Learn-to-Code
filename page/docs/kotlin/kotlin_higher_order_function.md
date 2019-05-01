Higher-Order function là function có thể nhận một function như một param hoặc có thể trả về một function:

```kotlin
fun doSomethingWithNumber(number: Int, receiver: (String?) -> Unit) {
    var result: String? = null
    //...do complex work with number

    receiver(result)
}

```

Function `doSomethingWithNumber()` có 2 param là `number` kiểu `Int` và `receiver` là một function `(String?) -> Unit` với `String` là kiểu của tham số truyền vào và `Unit` (`Void`) là kiểu trả về của hàm. Ta có thể gọi `doSomethingWithNumber()` bằng những cách sau:

## Function References:

```kotlin
doSomethingWithNumber(1000, ::processWithResult)

fun processWithResult(result: String?) : Unit {
    // do something with result
}

```

Lúc này sau khi mà function `doSomethingWithNumber()` gọi `receiver(result)`, sẽ nhảy vào function `processWithResult()` với `result` được truyền từ function `doSomethingWithNumber()`, điều này giống với `callback` trong `Java` hay các ngôn ngữ khác. Thay vì ta truyền `interface` thì ở đây ta truyền `reference` của function vào bằng cách sử dụng toán tử `::` và tên function.

Nói thêm một chút về `Function References`. Toán tử `::` có thể sử dụng với các overload function ví dụ như:

```kotlin
fun isOdd(x: Int) = x % 2 != 0
fun isOdd(s: String) = s == "brillig" || s == "slithy" || s == "tove"

val numbers = listOf(1, 2, 3)
println(numbers.filter(::isOdd)) // refers to isOdd(x: Int)

```

## Function Anonymous

```kotlin
doSomethingWithNumber(1000, fun(result: String?) {
    // do something with result
})

```

Thay vì truyền reference của function vào, ta định nghĩa luôn function ở argument. Function Anonymous khá giống với với các function thông thường, chỉ khác một điều là tên của function bị bỏ qua.