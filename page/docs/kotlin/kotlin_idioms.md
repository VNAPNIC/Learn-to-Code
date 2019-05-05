### Tạo một POJO object

```kotlin
  data class Customer(val name: String, val email: String)

```

Tạo một lớp `Customer` cùng với các function sau:

-   getter, setter cho các property
-   `equals()`
-   `hashCode()`
-   `toString()`
-   `copy()`
-   `componentN()` cho các `property`

xem thêm [Data class](/kotlin/kotlin_data_class/)

### Giá trị mặc định tham số của function

```kotlin
fun foo(a: Int = 0, b: String = "") { ... }

```

xem thêm [Giá trị mặc định cho parameter](/kotlin/kotlin_function/#3-gia-tri-mac-inh-cho-parameter)

### Lọc một list

```kotlin
  val positives = list.filter { x -> x > 0 }

```

hoặc

```kotlin
  val positives = list.filter { it > 0 }

```

### String template

```kotlin
  val name: String = "tu"
  println("Name $name")

```

xem thêm [String](/kotlin/kotlin_basic/#d-string)

### Kiểm tra kiểu

```kotlin
  when (x) {
      is Foo -> ...
      is Bar -> ...
      else   -> ...
  }

```

### Duyệt một map/list theo cặp

```kotlin
  for ((k, v) in map) {
      println("$k -> $v")
  }

```

`k`, `v` có thể gọi ở trong vòng lặp

### Sử dụng ranges

```kotlin
  for (i in 1..100) { ... }  //khoảng đóng, i chạy từ 1 đến 100
  for (i in 1 until 100) { ... } // khoảng mở một nửa i chạy từ 1 đến 99
  for (x in 2..10 step 2) { ... }
  for (x in 10 downTo 1) { ... }
  if (x in 1..10) { ... }

```

### List/Map chỉ đọc

```kotlin
val list = listOf("a", "b", "c")

val map = mapOf("a" to 1, "b" to 2, "c" to 3)

```

xem thêm [Collection](/kotlin/kotlin_collection/)

### Khởi tạo lazy

```kotlin
val p: String by lazy {
    // compute the string
}

```

### Extension function

```kotlin
  fun String.spaceToCamelCase() { ... }

  "Convert this to camelcase".spaceToCamelCase()

```

xem thêm [extension function](/kotlin/kotlin_function/#5-extension-functions)

### Tạo một singleton

```kotlin
  object Resource {
      val name = "Name"
  }

```

### Kiểm tra null

```kotlin
  // if not null
  val files = File("Test").listFiles()
  println(files?.size)

  // if not null and else
  val files = File("Test").listFiles()
  println(files?.size ?: "empty

```

xem thêm [Null safety](/kotlin/kotlin_basic/#346-null-safety)

### Chạy một câu lệnh nếu null hoặc không null

```kotlin
  //if null
  val data = ...
  val email = data["email"] ?: throw IllegalStateException("Email is missing!")

  //if not null
  val data = ...
  data?.let {
      ... // execute this block if not null
  }

```

xem thêm [Null safety](/kotlin/kotlin_basic/#346-null-safety)

### Gán giá trị cho một biến nếu null hoặc không null

```kotlin
val data = ...

val mapped = data?.let { transformData(it) } ?: defaultValueIfDataIsNull

```

### Sử dụng when để return

```kotlin
fun transform(color: String): Int {
    return when (color) {
        "Red" -> 0
        "Green" -> 1
        "Blue" -> 2
        else -> throw IllegalArgumentException("Invalid color param value")
    }
}

```

xem thêm [Cấu trúc điều khiển when](/kotlin/kotlin_basic/#b-cau-truc-when)

### Biểu thức try/catch

```kotlin
fun test() {
    val result = try {
        count()
    } catch (e: ArithmeticException) {
        throw IllegalStateException(e)
    }

    // Working with result
}

```

### Biểu thức if

```kotlin
fun foo(param: Int) {
    val result = if (param == 1) {
        "one"
    } else if (param == 2) {
        "two"
    } else {
        "three"
    }
}

```

xem thêm [Cấu trúc điều khiển if](/kotlin/kotlin_basic/#a-cau-truc-if)

### Single-expression functions

```kotlin
fun theAnswer() = 42

```

tương đương với

```kotlin
fun theAnswer(): Int {
    return 42
}

```

Sử dụng cùng với `when`:

```kotlin
fun transform(color: String): Int = when (color) {
    "Red" -> 0
    "Green" -> 1
    "Blue" -> 2
    else -> throw IllegalArgumentException("Invalid color param value")
}

```

### Gọi nhiều method trên cùng một instance object

```kotlin
class Turtle {
    fun penDown()
    fun penUp()
    fun turn(degrees: Double)
    fun forward(pixels: Double)
}

val myTurtle = Turtle()
with(myTurtle) { //draw a 100 pix square
    penDown()
    for(i in 1..4) {
        forward(100.0)
        turn(90.0)
    }
    penUp()
}
```