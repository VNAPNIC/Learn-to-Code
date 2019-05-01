1\. Định nghĩa Function
-----------------------

Function ở trong Kotlin được định nghĩa bằng từ khóa `fun`

Java

```java
public String doSomething(String matter) {

}

```

Kotlin

```kotlin
fun doSomething(matter: String): String {

}

```

-   Tên function: `doSomething`
-   Khai báo parameter truyền vào function: `<tên param> : <type param>`
-   Return type của function là `String`: `func <tên function>(): <return type> {//body}`

### Single-Expression Function

Nếu function với return type chỉ có một biểu thức (expression) thì định nghĩa function theo 2 cách dưới tương đương nhau: (`getInfo()` gọi là Single-Expression Function)

```kotlin
fun getInfo() : String = "Hello world..."

fun getInfo2() : String {
    return "Hello world..."
}

```

### Function Scope

Có 3 loại function (dựa vào mức truy cập):

-   Member function: Là các function được khai báo ở trong class, object hoặc interface. Các function này được sử dụng thông các instance của class, object hoặc interface. Giống như việc sử dụng method trong Java.

-   Local function: Có thể hiểu rằng local function là các function được khai báo bên trong một function khác (nested). Local function không được sử dụng ở ngoài function định nghĩa nó. Ví dụ như trong `printArea()`, ta định nghĩa một function khác là `calculateArea()`, do đó ta gọi `calculateArea()` là local function:

```kotlin
fun printArea(width: Int, height: Int): Unit {
  fun calculateArea(width: Int, height: Int): Int = width * height
  val area = calculateArea(width, height)
  println("The area is $area")
}

```

Lưu ý: Local function có thể sử dụng các `param` và các biến khai báo trước nó trong function. Lưu ý các biến khai báo sau nó thì không thể sử dụng:

```kotlin
    fun reformat(age: Int, somethingUnknown: String = "hello") {
        var birthMonth: Int = 8

        fun localRefomat() {
            birthMonth = 5

            //không sử dụng được variable birthYear
        }

        var birthYear: Int = 1995
    }

```

-   Top-level function: Có thể hiểu rằng đây là những function được khai báo ngoài tất cả như `class`, `object`, `interface` và được định nghĩa trong file Kotlin (`.kt`). Các method được truy cập thông qua tên của file vs kí hiệu "kt" (đối với Java), trong Kotlin các function này được gọi trực tiếp qua tên của function. Việc này rất hữu ích trong việc định nghĩa các các function `hepler`, `util` mà trong Java hay làm thông qua các method `static`:

```kotlin
//file name is DataManager.kt
fun isTokenExpired() : Boolean{
    var isExpired = false

    //......

    return isExpired
}

```

Gọi function Kotlin trong Java:

```kotlin
public class JavaMain {
    public static void main(String[] args) {
        //call top-level function in java
        DataManagerKt.isTokenExpired();
    }
}

```

2\. Parameter
---------------------------------------------------------------------------------

```kotlin
fun powerOf(number: Int, exponent: Int) {
    //...
}

```

Function `powerOf` có param `number` và `exponent` kiểu `Int`.

Khai báo param theo cú pháp: `<tên param> : <type param>`

3. Giá trị mặc định cho parameter
-----------------------------------------------------------------------------------------------------------------------------------------------------------

```kotlin
fun read(b: Array<Byte>, off: Int = 0, len: Int = b.size()) {
...
}

```

Mỗi param trong function có thể được gán giá trị mặc định hoặc không gán. Giá trị mặc định cho phép lúc truyền param cho function có thể bỏ qua các giá trị mặc định. Điều này giúp không phải viết quá nhiều `overload` function.

Lưu ý:

```kotlin
open class A {
    open fun foo(i: Int = 10) { ... }
}

class B : A() {
    override fun foo(i: Int) { ... }  // no default value allowed
}

```

Khi function `foo()` của `class A` đã khai báo giá trị mặc định cho param, thì khi` class B` kế thừa `class A` và `override` lại function `foo()` đó, thì giá trị mặc định của param ở function `foo()``class A` được giữ lại và ở `class B` không được định nghĩa lại giá trị mặc định đó.

### Đặt tên cho đối truyền vào

Đầu tiên ta có function `reformat()` với các param, trong đó có 4 param có giá trị mặc định.

```kotlin
fun reformat(str: String,
             normalizeCase: Boolean = true,
             upperCaseFirstLetter: Boolean = true,
             divideByCamelHumps: Boolean = false,
             wordSeparator: Char = ' ') {
...
}

```

Có thể gọi function theo các cách:

-   Sử dụng các giá trị mặc định của param

```kotlin
reformat(str)

```

-   Không sử dụng các giá trị mặc định của param

```kotlin
reformat(str, true, true, false, '_')

```

-   Hoặc có thể đặt tên cho các đối truyền vào để dễ đọc hơn (tùy chọn). Lưu ý là tên được đặt sẽ phải giống với tên param của function đó

```kotlin
reformat(str, wordSeparator = '_')

```

Lưu ý:

-   Khi sử function của `Kotlin` trong Java, các param được khai báo giá trị mặc định sẽ không có tác dụng. Vì `Java` không thể bỏ qua các param có giá trị mặc định.
-   Khi sử dụng `method` của `Java` trong `Kotlin`, không thể sử dụng được chức năng đặt tên cho đối truyền vào.

4. Unit-returning functions
-------------------------------------------------------------------------------------------------------------

```kotlin
fun printHello(name: String?): Unit {
    if (name != null)
        println("Hello ${name}")
    else
        println("Hi there!")
    // `return Unit` or `return` is optional
}

```

`Unit` ở đây có thể hiểu như là `Void` ở trong `Java` hoặc các ngôn ngữ khác. Việc khai báo return type là `Unit` là không bắt buộc. Ví dụ như:

```kotlin
fun printHello(name: String?) {
    ...
}

```

`Unit` cũng được sử dụng trong việc khai báo các Higher-Order Function ở phần sắp tới.

5. Extension functions
---------------------------------------------------------------------------------------------------

Giống với `Swift`, `Kotlin` cho phép ta mở rộng `class` mà không phải kế thừa từ `class` khác. Ví dụ như ta muốn thêm function `swap()` cho `class MutableList<Int>`:

```kotlin
fun MutableList<Int>.swap(index1: Int, index2: Int) {
    val tmp = this[index1] // 'this' corresponds to the list
    this[index1] = this[index2]
    this[index2] = tmp
}

```

Từ khóa `this` ở đây dùng để chỉ đến `instance` `MutableList<Int>` mà gọi function `swap()`

```kotlin
val l = mutableListOf(1, 2, 3)
l.swap(0, 2) // 'this' inside 'swap()' will hold the value of 'l'

```

Tuy nhiên nếu `extension` cho `MutableList<Int>` chúng ta chỉ sử dụng được với các `instance` của `MutableList<Int>`, chúng ta cũng có thể khởi tạo chung bằng cách sử dụng Generic Function:

```kotlin
fun <T> MutableList<T>.swap(index1: Int, index2: Int) {
    val tmp = this[index1] // 'this' corresponds to the list
    this[index1] = this[index2]
    this[index2] = tmp
}

```

6. Return nhiều giá trị (Mutiple return values)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Xem ví dụ dưới đây:

```kotlin
data class Result(val result: Int, val status: Status)
fun function(...): Result {
    // computations

    return Result(result, status)
}

// Now, to use this function:
val (result, status) = function(...)

```

Như ta thấy, function có thể trả về đồng thời 2 giá trị `result` và `status`. Bản chất của việc này là gói chúng vào một `data class` mà thôi và sử `Destructure` (trình bày phần tiếp theo) để gán chúng cho các biến. Nhìn đến đây ta có thể nghĩ đến sử dụng `Pair<L, R>`. Tuy nhiên việc sử dụng `class`với các tên có nghĩa giúp code dễ đọc hơn việc sử dụng `first` và `second` trong `Pair`.

### Destructuring Declarations

Xem ví dụ dưới đây:

```kotlin
data class Person(var name: String, var age: Int)

val (name, age) = Person("Hado", 22)

println("Name: $name") //print: Name: Hado
println("Age: $age") //print: Age: 22

```

Đoạn code trên sau khi được complie thực ra sẽ như thế này:

```kotlin
data class Person(var name: String, var age: Int)

val person = Person("Hado", 22)

val name = person.component1()
val age = person.component2()

println("Name: $name") //print: Name: Hado
println("Age: $age") //print: Age: 22

```

Ta có `data class` với `primary constructor` có 2 param `name` và `age`, `class` sẽ lần lượt tự động tạo ra các function `componentN` (N: 1, 2, 3, ...) cho các param.

Lưu ý chỉ có các param trong `primary constructor` mới được tự động tạo ra function `component`. Nếu chúng ta khai báo thêm biến trong `class` và muốn sử dụng `Destructure` thì cần khởi tạo thêm các function `component` tương ứng với param đó. Ví dụ như:

```kotlin
data class Person(var name: String, var age: Int) {
    var province: String = "Ha Noi"

    operator fun component3(): String {
        return province
    }
}

val (name, age, province) = Person("Hado", 22)

println("Name: $name") //print: Name: Hado
println("Age: $age") //print: Age: 22
println("Province: $province") //print: Province: Ha Noi

```

Nếu như trong class `Person`, ta chỉ cần lấy 2 giá trị là `age` và `province`, đồng thời không muốn tạo ra biến `name` ta sử dụng dấu `"_"` để thay cho các biến không cần sử dụng:

```kotlin
val (_, age, province) = Person("Hado", 22)

println("Age: $age") //print: Age: 22
println("Province: $province") //print: Province: Ha Noi

```

7. Generic functions
-----------------------------------------------------------------------------------------------

Giống như `Java`, `Kotlin` cho phép sử dụng `generic function` giúp cho việc giảm số lượng code, function có thể sử dụng với nhiều kiểu khác nhau Để định nghĩa `generic function`, ta sử dụng form sau:

```kotlin
fun <T> singletonList(item: T): List<T> {
    // ...
}

fun <T> T.basicToString() : String {  // extension function
    // ...
}

```

Để gọi function, cần xác định kiểu cho function:

```kotlin
val l = singletonList<Int>(1)

```

Ngoài ra, giống như `Java`, ta cũng có thể tạo `generic function` với kiểu được `extends` từ một kiểu khác:

```kotlin
fun <T : Comparable<T>> sort(list: List<T>) {
    // ...
}

```

Bây giờ, ta có thể gọi function với các biến có kiểu là `subclass` của `Comparable`:

```kotlin
sort(listOf(1, 2, 3)) // OK. Int is a subtype of Comparable<Int>
sort(listOf(HashMap<Int, String>())) // Error: HashMap<Int, String> is not a subtype of Comparable<HashMap<Int, String>>

```

8. Infix notation
-----------------------------------------------------------------------------------------

Xem ví dụ dưới đây:

```kotlin
class Fly(var currentPlace: String) {

    infix fun flyTo(nextPlace: String) {
        println("The plane fly from $currentPlace to $nextPlace")
    }

}

val plane1 = Fly("Ha Noi")

plane1 flyTo "Ho Chi Minh" //print: The plane fly from Ha Noi to Ho Chi Minh

plane1.flyTo("Ho Chi Minh") //print: The plane fly from Ha Noi to Ho Chi Minh

```

Nhờ sử dụng ký hiệu `infix` cho function `flyTo()`, ta có thể sự dụng tên function như trung tố liên kết giữa `instance class` và `param` truyền vào. Function có thể sử dụng `infix notation` (trung tố) khi

-   Function là member của một class hoặc là extension của class
-   Function chỉ có một param duy nhất
-   Function được mark bằng `infix` ở đầu function

9. Function với parameter không xác định
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

Tương tự trong `Java`, `Kotlin` cho phép một function không cần xác định số lượng param một cách cụ thể.

Java

```java
public int add(int... array) {
    int s = 0;
    for (int i : array) {
        s += i;
    }
    return s;
}

```

Kotlin

```kotlin
fun add(vararg array: Int) : Int {
    var s = 0
    for (i in array) {
        s += i
    }
    return s
}

```

Ta sử dụng từ khóa `vararg`. Và cũng tương tự như `Java`, biến array được coi là một mảng.

Lưu ý: Chỉ có một param được đánh dấu là `vararg`. Nếu param không phải là param cuối cùng, khi gọi hàm, ta phải chỉ định rõ các param sau đó

```kotlin
fun multiPrint(prefix: String, vararg strings: String, suffix: String) {
    //.....
}

```

Sử dụng function `multiPrint()`:

```kotlin
multiPrint("Start", "a", "b", "c", suffix = "End")

```

10\. Inline function
-----------------------------------------------------------------------------------------------

Inline function được giải thích [ở đây](/kotlin/kotlin_inline_function)