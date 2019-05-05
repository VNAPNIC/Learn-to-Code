Để khai báo một enum class ta sử dụng keyword `enum`:

```kotlin
enum class Direction {
    NORTH, SOUTH, WEST, EAST
}

```

Ở đây mỗi enum constant (NORTH, SOUTH, WEST, EAST) là một object. Các enum constant được phân cách nhau bởi dấu `,`

Initialization
-----------------------------------------------------------------------------------------

```kotlin
enum class Color(val rgb: Int) {
        RED(0xFF0000),
        GREEN(0x00FF00),
        BLUE(0x0000FF)
}

```

Mỗi enum constant được khởi tạo với 1 hằng số `rgb` kiểu `Int`.

Anonymous Classes
-----------------------------------------------------------------------------------------------

Mỗi enum constant cũng có thể khởi tạo `anonymous class` của riêng nó

```kotlin
enum class ProtocolState {
    WAITING {
        override fun signal() = TALKING
    },

    TALKING {
        override fun signal() = WAITING
    };

    abstract fun signal(): ProtocolState
}

```

Ví dụ như constant WAITING định nghĩa một `anonymous class` của nó và `override` lại function `signal()`. Nếu chú ý bạn có thể thấy dấu `;`, dấu này có tác dụng phân cách giữa các enum constant và các định nghĩa thành phần member(như `variable`, `function`) của enum class.

Working with Enum Constants
-------------------------------------------------------------------------------------------------------------------

Giống như trong Java, enum class trong Kotlin có các method để list ra danh sách các enum constant và lấy enum constant bằng tên của nó.

```kotlin
for (enumConstant in ProtocolState.values()) {
    println(enumConstant)
}

```

Từ Kotlin 1.1 trở đi, ta có thể truy cập vào các constant trong enum class bằng `generic way`. Ta sử dụng 2 function `enumValues<T>()` và `enumValueOf<T>()`:

```kotlin
enum class RGB { RED, GREEN, BLUE }

inline fun <reified T : Enum<T>> printAllValues() {
    print(enumValues<T>().joinToString { it.name })
}

printAllValues<RGB>() // prints RED, GREEN, BLUE

```

Mỗi enum constant đều có 2 propery:

```kotlin
val name: String
val ordinal: Int

```

`name` giữ tên của enum constant và `ordinal` giữ thứ tự của enum constant trong enum class.