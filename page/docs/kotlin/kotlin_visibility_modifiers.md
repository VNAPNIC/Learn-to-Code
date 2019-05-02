Class, object, interface, constructor, function, property(và function `set()` của nó) đều có *visibility modifiers (hay thường gọi là access modifiers)*.(function `get()` của property luôn có visibility modifier giống với property). Kotlin có 4 visibility modifiers: `private`, `protected`, `internal` và `public`. Nếu không xác định rõ ràng visibility modifier thì mặc định sẽ là `public`.

Packages
-------------------------------------------------------------------------------------

Function, property, class, object và interface đều có thể khai báo ở mức "top-level" (được hiểu là nó không ở bên trong bất cứ thành phần nào). Ví dụ như trong `package`(đại diện cho đường dẫn đến file):

```kotlin
// file name: example.kt
package foo

fun baz() {}
class Bar {}

```

-   Nếu không xác định rõ ràng visibility modifier thì mặc định sẽ là `public`. Điều đó có nghĩa là bạn có thể sử dụng nó ở bất kì đâu.
-   Nếu khai báo là `private`, nó chỉ được sử dụng ở trong file mà nó khai báo.
-   Nếu khai báo là `internal`, nó chỉ được sử dụng ở các nơi cùng `module`.
-   `protected` không được sử dụng khi khai báo ở mức "top-level".

Ví dụ:

```kotlin
// file name: example.kt
package foo

private fun foo() {} // visible inside example.kt

public var bar: Int = 5 // property is visible everywhere
    private set         // setter is visible only in example.kt

internal val baz = 6    // visible inside the same module

```

Classes và Interfaces
--------------------------------------------------------------------------------------------------------------------

Đối với các thành phần khai báo ở trong `Class`:

-   `private` chỉ được sử dụng trong class đó (không thể truy cập qua instance của class đó)
-   `protected` giống với `private` + có thể sử dụng ở trong các subclass (các class kế thừa nó).
-   `internal` khả năng truy cập rộng hơn 2 loại trên và được truy cập bởi các instance của class khai báo nó (các instance và nơi khai báo class thuộc cùng module)
-   `public` rộng nhất và được sử dụng ở bất kì đâu thông qua instance khai báo nó.

Ví dụ:

```kotlin
open class Outer {
    private val a = 1
    protected open val b = 2
    internal val c = 3
    val d = 4  // public by default

    protected class Nested {
        public val e: Int = 5
    }
}

class Subclass : Outer() {
    // a is not visible
    // b, c and d are visible
    // Nested and e are visible

    override val b = 5   // 'b' is protected
}

class Unrelated(o: Outer) {
    // o.a, o.b are not visible
    // o.c and o.d are visible (same module)
    // Outer.Nested is not visible, and Nested::e is not visible either
}

```

Constructors
---------------------------------------------------------------------------------------------

Để xác định rõ visibility của primary constructor, sử dụng cú pháp dưới đây(chú ý khi xác định visibility phải sử dụng từ khóa `constructor`, bình thường không có visibility modifier hoặc annotation thì `constructor` có thể bỏ qua):

```kotlin
class C private constructor(a: Int) { ... }

```

Mặc định các constructor là `public`.

Local declarations
---------------------------------------------------------------------------------------------------------

Local variables, [functions](/kotlin/kotlin_function/#function-scope) và class không có visibility modifier

Modules
-----------------------------------------------------------------------------------

`internal` visibility modifier có thể truy cập nếu cùng module. Chi tiết hơn thì module là một tập hợp các file Kotlin được complie cùng nhau như:

-   Intellij IDEA module
-   Maven hoặc Gradle project