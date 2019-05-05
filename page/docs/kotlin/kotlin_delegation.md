Class Delegation
----------------

Mẫu [Delegation](https://en.wikipedia.org/wiki/Delegation_pattern) đã được chứng minh là cách thay thế tốt cho việc kế thừa và *Kotlin* hỗ trợ mẫu này native và không cần một chút boilerplate code nào. Chúng ta xem VD sau:

```kotlin
  interface Base {
      fun print()
  }

  class BaseImpl(val x: Int) : Base {
      override fun print() { print(x) }
  }

  class Derived(b: Base) : Base by b

  fun main(args: Array<String>) {
      val b = BaseImpl(10)
      Derived(b).print() // prints 10
  }

```

Lớp `Derived` có thể kế thừa từ interface(chỉ có thể sử dụng delegation với interface) `Base` và ủy thác tất cả các public method cho một đối tượng xác định. Tức là, lớp `Derived` tuy kế thừa từ interface `Base` nhưng không phải implement function `print()` từ interface `Base` mà ủy thác cho đối tượng `b` có kiểu là `BaseImpl`, lớp cũng kế thừa từ `Base` và implement function `print()`.

Mệnh đề `by` biểu thị rằng `b` sẽ được lưu bên trong đối tượng `Derived` và compiler sẽ sinh ra tắt cả các method của `Base` cho `Derived` mà `b` đã implement

Lưu ý rằng lớp `Derived` cũng có thể tự override lại function `print()` thay vì sử dụng các function của object được ủy thác.

```kotlin
  class Derived(b: Base) : Base by b {
      override fun print() {
          print("abc")
      }
  }

  fun main(args: Array<String>) {
      val b = BaseImpl(10)
      Derived(b).print() // prints "abc"
  }
```