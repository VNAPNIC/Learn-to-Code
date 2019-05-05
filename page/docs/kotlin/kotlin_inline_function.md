Giới thiệu
----------

Chúng ta đã biết khái niệm [high-order function](/kotlin/kotlin_inline_function/), việc sử dụng loại function này bộc lộ một số hạn chế lúc runtime: mỗi function là một object và nó giữ [closure](/kotlin/kotlin_lambda/#closures) của nó. Bởi vậy, việc cấp phát bộ nhớ (cho cả function object, class) và các lời gọi ảo cho ra một chi phí lúc runtime. Tức là khi gọi các function này, một object sẽ được tạo ra để lưu trữ function và thêm vài function cần thiết cho class nữa. Việc này làm cho số function của project sẽ tăng lên nhanh chóng.

Việc này có thể được loại bỏ bằng cách inline các biểu thức lambda. Tức là code của function sẽ được thêm ngay ở nơi gọi function, tránh khởi tạo một instance để lưu function. VD:

```kotlin
  lock(l) { foo() }

```

Bây giờ, nếu function `lock` là một inline function, compiler sẽ sinh ra đoạn code sau ngay ở nơi gọi hàm `lock` thay vì tạo một function object:

```kotlin
  l.lock()
  try {
      foo()
  }
  finally {
      l.unlock()
  }

```

Để thấy được điều này, ta có thể decompile *Kotlin* code sang *Java* code bằng cách chọn `Tools` -> `Kotlin` -> `Show Kotlin bytecode`, sau đó chọn `Decompile` để xem. File sẽ được decompile ra file *Java* tương đương.

Để khai báo một inline function, ta thêm từ khóa `inline` khi khai báo function

```kotlin
  inline fun close(work:String, process: (String) -> Unit) {
      //tiền xử lý
      process(work)
      println("close")
  }

```

Từ khóa `inline` sẽ có ảnh hưởng đến cả các lambda bên trong được truyền cho function. Nghĩa là tất cả các function bây giờ sẽ được inline ở nơi gọi.

```kotlin
  //gọi inline function
  fun main(arg: Array<String>) {
      close("clean"){
          println("cleaning")
      }
  }

  //code Java tương đương
  public final void main(@NotNull String[] arg) {
      Intrinsics.checkParameterIsNotNull(arg, "arg");
      String work$iv = "clean";
      String var5 = "cleaning";
      System.out.println(var5);
      String var4 = "close";
      System.out.println(var4);
  }

```

Việc sử dụng inline function cũng có một số hạn chế. Đó là:

-   Một inline function không thể tự gọi lại chính nó một cách trực tiếp hoặc gọi gián tiếp thông qua một inline funciton khác.
-   Một public inline function được khai báo ở trong một class chỉ có thể truy cập vào các public function và public field của class đó
-   Số lượng dòng code sẽ tăng lên. Việc inline một function dài, phức tạp nhiều lần sẽ được compiler sinh ra code tương ứng.

Bởi vậy, lời khuyên ở đây là:

> Giữ các inline function ngắn gọn, chuyển các khối code lớn vào trong các non-inline function nếu cần.

noinline
--------------------------------------------------------------------------------

Như ở trên đã đề cập, từ khóa `inline` có tác dụng với cả các lambda được truyền vào function. Bởi vậy, các lambda được truyền vào cũng sẽ là các inline function. Nếu không muốn điều này, chúng ta có thể sử dụng từ khóa `noinline` khi khai báo các lambda trong function

```kotlin
  inline fun close(work:String,noinline process: (String) -> Unit) {
      //tiền xử lý
      process(work)
      println("close")
  }

```

Khi này, funciton `process` sẽ không được thêm vào code ở nơi gọi function mà sẽ khởi tạo một instance để chứa phần noinline đó.

```java
  public final void main(@NotNull String[] arg) {
      Intrinsics.checkParameterIsNotNull(arg, "arg");
      String work$iv = "clean";
      Function1 process$iv = (Function1)null.INSTANCE;
      process$iv.invoke(work$iv);
      String var5 = "close";
      System.out.println(var5);
   }

```

Inline lambda chỉ có thể được gọi ở bên trong một inline function hoặc truyền vào param có kiểu inline. Với `noinline`, chúng ta có thể làm mọi thứ ta muốn: lưu như một biến, truyền vào param...

Non-local return
------------------------------------------------------------------------------------------------

Trong *Kotlin*, chúng ta có thể sử dụng `return` để thoát khỏi một function có tên hoặc một anonymous function. Điều đó có nghĩa là, để thoát khỏi một lambda, chúng ta phải sử dụng một [label](/kotlin/kotlin_basic/#label-voi-return) để làm điều này và nếu chỉ sử dụng `return`, compiler sẽ báo lỗi bởi bên trong lambda, ta không thể thoát ra khởi function bên ngoài nó

```kotlin
  fun foo() {
      ordinaryFunction {
          return // ERROR: can not make `foo` return here
      }
  }

```

Nhưng nếu function lambda được truyền vào là inline function, việc return là được cho phép:

```kotlin
  fun foo() {
      inlineFunction {
          return // OK: the lambda is inlined
      }
  }

```

Những return này (bên trong lambda, nhưng thoát ra function xung quanh) được gọi là non-local return. Chúng ta thường sử dụng việc return này bên trong vòng lặp:

```kotlin
  fun hasZeros(ints: List<Int>): Boolean {
      ints.forEach {
          if (it == 0) return true // returns from hasZeros
      }
      return false
  }

```

Lưu ý rằng inline function bên trong function có thể gọi lambda được truyền vào function chứa nó như một param một cách gián tiếp trong một ngữ cảnh thực thi như là một local object hay function lồng. Trong những trường hợp đó, luồng điều khiển non-local là được cho phép. Để thể hiện điều đó, lambda param cần được đánh dấu bằng từ khóa `crossinline`:

```kotlin
  inline fun f(crossinline body: () -> Unit) {
      val f = object: Runnable {
          override fun run() = body()
      }
      // ...
  }

```

`break` và `continue` không được hỗ trợ trong inline lambda.

Reified type parameter (Xác định cụ thể kiểu param)
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Thỉnh thoảng chúng ta cần truy cập đến kiểu của tham số được truyền vào

```kotlin
  fun <T> TreeNode.findParentOfType(clazz: Class<T>): T? {
      var p = parent
      while (p != null && !clazz.isInstance(p)) {
          p = p.parent
      }
      @Suppress("UNCHECKED_CAST")
      return p as T?
  }

```

Ở đây, function đi qua toàn bộ cây và sử dụng reflection để kiểm tra một node có kiểu xác định hay không. Nếu viết như vậy, việc gọi vẫn hơi dài dòng:

```kotlin
  treeNode.findParentOfType(MyTreeNode::class.java)

```

Những gì chúng ta thực sự muốn là chỉ cần truyền kiểu param vào function:

```kotlin
  treeNode.findParentOfType<MyTreeNode>()

```

Để làm điều này, inline function hỗ trợ việc này bằng cách sử dụng từ khóa `reified`:

```kotlin
  inline fun <reified T> TreeNode.findParentOfType(): T? {
      var p = parent
      while (p != null && p !is T) {
          p = p.parent
      }
      return p as T?
  }

```

Khi sử dụng `reified`, param đã có thể truy cập bên trong function và không cần sử dụng reflection nữa, các toán tử như `is`, `!is` hay `as` cũng đã hoạt động bình thường. Và từ đó, chúng ta có thể gọi function như đã đề cập ở trên:

```kotlin
treeNode.findParentOfType<MyTreeNode>()

```

Ngoài ra, ta vẫn có thể sử dụng reflection với reified type parameter:

```kotlin
inline fun <reified T> membersOf() = T::class.members

fun main(s: Array<String>) {
    println(membersOf<StringBuilder>().joinToString("\n"))
}

```

Lưu ý: function không phải là inline function không thể sử dụng reified type parameter.

Inine property
--------------------------------------------------------------------------------------------

Từ khóa `inline` có thể được sử dụng với các hàm getter, setter của các property mà không có backing field. Bạn có thể đánh dấu từng hàm getter, setter:

```kotlin
  val foo: Foo
      inline get() = Foo()

  var bar: Bar
      get() = ...
      inline set(v) { ... }

```

Bạn cũng có thể đánh dấu toàn bộ property bằng cách đánh dấu khi khai báo property:

```kotlin
  inline var bar: Bar
      get() = ...
      set(v) { ... }

```

Ở vị trí gọi function, các hàm getter, setter này cũng sẽ được coi như các hàm inline function bình thường.