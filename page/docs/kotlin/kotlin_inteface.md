Trong `Kotlin` interface khá giống so với `Java 8`. Nó có thể chứa các function ảo (abstract function) cũng như các implement function (các function có body) và đồng thời cũng có thể chứa các property. Điều khác biệt giữa `abstract class` và `interface` là `interface` không có `state` trong khi `abstract class` thì có. Ta sử dụng từ khóa `interface` để định nghĩa một interface:

```kotlin
interface MyInterface {
    fun bar()
    fun foo() {
      // optional body
    }
}

```

Kế thừa `interface`:

```kotlin
class Child : MyInterface {
    override fun bar() {
        // body
    }
}

```

Property trong interface
---------------------------------------------------------------------------------------------------------

Bạn có thể khởi tạo các `property` ở trong `interface`.

```kotlin
interface MyInterface {
    val prop: Int // abstract
    val post: String
        get() = "Any post"

    val propertyWithImplementation: String
        get() = "foo"

    fun foo() {
        print(prop)
    }
}

class Child : MyInterface {
    override val prop: Int = 29
}

```

Lưu ý là chúng ta không được khởi tạo cho `property` trong `interface`, và interface không có `backing fields`

Overriding conflict
------------------------------------------------------------------------------------------------------------------------

```kotlin
interface A {
    fun foo() { print("A") }
    fun bar()
}

interface B {
    fun foo() { print("B") }
    fun bar() { print("bar") }
}

class C : A {
    override fun bar() { print("bar") }
}

class D : A, B {
    override fun foo() {
        super<A>.foo()
        super<B>.foo()
    }

    override fun bar() {
        super<B>.bar()
    }
}

```

Vấn đề xảy ra khi cả interface `A` và `B` đèu có function `foo()` và `bar()`, chi tiết [tại đây](/kotlin/kotlin_class_inheritance/#overriding-rule)