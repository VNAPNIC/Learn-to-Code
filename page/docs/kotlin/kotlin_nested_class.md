1\. Giới thiệu
--------------

Trong *Java* ta có thể viết một class bên trong thân của một class khác:

Java

```java
  class Outer {
    private int bar = 1;

    class Nested{
      public int foo(){
        return bar;
      }
    }
  }

```

Với *Kotlin*, ta cũng có thể làm tương tự:

Kotlin

```kotlin
  class Outer {
      private val bar: Int = 1
      class Nested {
          fun foo() = 2
      }
  }

  val demo = Outer.Nested().foo() // == 2

```

Tuy nhiên, khi khai báo như trên, trong *Kotlin*, class `Nested` sẽ không thể truy cập đến các phần tử của class `Outer` chứa nó như trong *Java*. Để làm được điều đó, ta cần sử dụng từ khóa `inner` trong *Kotlin*.

2\. Inner class
-----------------------------------------------------------------------------------------

Một class có thể được khai báo với từ khóa `inner` có thể truy cập đến các phần tử của class chứa nó. Inner class mang một tham chiếu đến một đối tượng của class chứa nó:

```kotlin
  class Outer {
    private val bar: Int = 1
    private var fooz: String = "hello"
    inner class Inner {
        fun foo() = bar
        fun baz() {
          this@Outer.fooz = "hi"
        }
    }
  }

  val demo = Outer().Inner().foo() // == 1

```

Để trỏ đến outer class, ta sử dụng từ khóa `this` với `@label` như đã nói trong phần [Biểu thức this](/kotlin/kotlin_basic/#946-bieu-thuc-this).

3\. Anonymous inner class (Lớp con vô danh)
------------------------------------------------------------------------------------------------------------------------------------------------------------

Để khởi tạo anonymous inner class, chúng ta sử dụng [object expression]:

```kotlin
  textView?.setOnClickListener(object : View.OnClickListener {
    override fun onClick(v: View?) {
      //....
    }
  })

```

Nếu object được khởi tạo là một functional Java interface (một interface chỉ có duy nhất một method), chúng ta có thể sử dụng [lambda](/kotlin/kotlin_lambda/) và khai báo như sau:

```kotlin
  val listener = View.OnClickListener {

  }
```