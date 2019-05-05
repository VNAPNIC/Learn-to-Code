Giới thiệu
----------

Với các property trong một class, chúng ta bắt buộc phải khởi tạo chúng hoặc sử dụng constructor để gán giá trị ngay khi khởi tạo đối tượng. Tuy nhiên, đôi lúc chúng ta lại muốn khởi tạo những property này chỉ khi truy cập lần đầu tiên vào property đó. Để thực hiện điều này, *Kotlin* cung cấp delegated property thông qua những chức năng sau:

-   lazy property: Giá trị của property được tính toán trong lúc truy cập lần đầu tiên đến property
-   observable property: lắng nghe sự thay đổi giá trị của property
-   Lưu trữ các property trong một map thay vì lưu riêng từng property Một VD của delegated property:

```kotlin
  class Example {
      var p: String by Delegate()
  }

```

Cú pháp để khai báo delegated property là: `val/var <property name>: <Type> by <expression>`. Biểu thức ở sau `by` là delegate, bởi vì `get()` (và `set()`) tương ứng với property sẽ được ủy thác cho các method `getValue()` và `setValue()` của class `Delegate`. `Delegate` không cần phải implement bất kỳ interface nào nhưng phải cung cấp 2 function là `getValue()` (và `setValue()` đối với property kiểu `var`). Ví dụ:

```kotlin
  class Delegate {
      operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
          System.out.println("first")
          return "$thisRef, thank you for delegating '${property.name}' to me!"
      }

      operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
          println("$value has been assigned to '${property.name} in $thisRef.'")
      }
  }

```

Khi chúng ta truy cập để đọc giá trị của `p`, không phải function getter của property `p` được gọi mà là function `getValue()` của class `Delegate` được gọi bởi property đã ủy thác việc này cho `Delegate`. 2 tham số của function `getValue()` lần lượt là đối tượng chứa `p` và đối tượng lưu trữ các thông tin của `p`. Bởi vậy, khi gọi `p`:

```kotlin
  val e = Example()
  println(e.p)

```

Kết quả nhận được sẽ là:

```kotlin
  Example@33a17727, thank you for delegating 'p' to me!

```

Tương tự như vậy, khi chúng ta gán giá trị cho `p`, function `setValue()` sẽ được gọi. Các tham số của function `setValue()` tương tự như function `getValue()`, tham số thứ 3 là giá trị được gán cho `p`:

```kotlin
  e.p = "NEW"

  //NEW has been assigned to 'p' in Example@33a17727.

```

Lưu ý: từ *Kotlin* 1.1, bạn có thể khai báo một delegated property ngay bên trong một function hoặc một block code, nó không cần là một member của class.

Delegate chuẩn
-------------------------------------------------------------------------------------------------------

Thư viện chuẩn của *Kotlin* cung cấp các factory method cho nhiều mục đích sử dụng delegate khác nhau.

### lazy

[lazy()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/lazy.html) là một function lấy một lambda và trả về một instance của `Lazy<T>` để có thể implement một lazy property: lần gọi đầu tiên đến function `get()` sẽ thực thi đoạn code trong lambda được truyền vào để khởi tạo kết quả và gán kết quả cho property. Các lần gọi `get()` sau sẽ chỉ trả về giá trị của property.

```kotlin
  val lazyValue: String by lazy {
      println("computed!")
      "Hello"
  }

  fun main(args: Array<String>) {
      println(lazyValue)
      println(lazyValue)
  }

```

Kết quả được in ra là:

```kotlin
  computed!
  Hello
  Hello

```

Mặc định, việc tính toán của lazy property được synchronized: giá trị được tính toán chỉ trong 1 thread, và tất cả các thread sẽ sử dụng cùng kết quả đó. Nếu quá trình synchronize của việc khởi tạo không được yêu cầu, nhiều thread sẽ có thể thực thi việc khởi tạo này cùng một lúc bằng cách truyền tham số `LazyThreadSafetyMode.PUBLICATION` cho function `lazy()`. Và nếu bạn chắc chắn rằng việc khởi tạo sẽ luôn luôn xảy ra trên một thread duy nhất, bạn có thể sử dụng tham số `LazyThreadSafetyMode.NONE`, điều này giúp giảm chi phí (overhead) trong việc đảm bảo thread-safety và các chi phí khác

### Observable

[Delegate.observable()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.properties/-delegates/observable.html) nhận vào 2 tham số: giá trị khởi tạo của property và một handler trong trường hợp property thay đổi giá trị. Handler mà chúng ta truyền vào sẽ được thực thi mỗi lần chúng ta gán giá trị cho property (*sau* khi việc gán được thực thi). Handler này có 3 tham số: property được gán, giá trị cũ và giá trị mới:

```kotlin
  import kotlin.properties.Delegates

  class User {
      var name: String by Delegates.observable("<no name>") {
          prop, old, new ->
          println("$old -> $new")
      }
  }

  fun main(args: Array<String>) {
      val user = User()
      user.name = "first"
      user.name = "second"
  }

```

Kết quả được in ra là:

```kotlin
  <no name> -> first
  first -> second

```

Nếu bạn muốn có thể can thiệp vào việc gán và phủ quyết việc đó, sử dụng [vetoable()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.properties/-delegates/vetoable.html) thay vì `observable()`. Hanlder được truyền vào `vetoable` sẽ được gọi *trước* khi việc gán được thực thi.

### Lưu trữ property trong một map

Một trường hợp phổ biến là lưu trữ các giá trị của các property bên trong một map. Việc này thường hữu dụng trong trong trường hợp như parsing JSON hoặc làm một thứ gì đó động. Trong trường hợp này, bạn có thể sử dụng chính instance của map như là delegate cho một delegate property

```kotlin
  class User(val map: Map<String, Any?>) {
    val name: String by map
    val age: Int     by map
  }

  val user = User(mapOf(
    "name" to "John Doe",
    "age"  to 25
  ))

```

Chúng ta có thể khởi tạo object bằng cách truyền vào một map. Khi truy cập đến property, việc này sẽ được ủy thác cho map

```kotlin
  println(user.name) // Prints "John Doe"
  println(user.age)  // Prints 25

```

Với kiểu `var`, chúng ta phải sử dụng `MutableMap` thay vì `Map` (read-only `Map`)

```kotlin
  class MutableUser(val map: MutableMap<String, Any?>) {
      var name: String by map
      var age: Int     by map
  }

```

Local delegated property (từ *Kotlin* 1.1)
----------------------------------------------------------------------------------------------------------------------------------------------------------

Bạn có thể khai báo một local variable như là một delegated property. VD:

```kotlin
  fun example(computeFoo: () -> Foo) {
      val memoizedFoo by lazy(computeFoo)

      if (someCondition && memoizedFoo.isValid()) {
          memoizedFoo.doSomething()
      }
  }

```

Biến `memoizedFoo` sẽ chỉ được tính toán vào lần truy cập đầu tiên bằng lambda `computeFoo` được truyền vào. Nếu `someCondition` bằng `false`, `memoizedFoo` sẽ không được khởi tạo.

Yêu cầu của delegated property
----------------------------------------------------------------------------------------------------------------------------------------------------

Đây là những yêu cầu của delegated object được tổng kết lại:

Với read-only property (`val`), một delegate phải implement một function tên là `getValue` gồm 2 tham số:

-   `thisRef` - phải có cùng kiểu hoặc kiểu mà kiểu của property kế thừa
-   `property` - phải có kiểu `KProperty<*>` hoặc kiểu nó kế thừa Cùng với đó, function `getValue()`phải trả về giá trị cùng kiểu với property.

Với mutable property ('var'), một delegate ngoài phải cung cấp `getValue` như read-only property còn phải implement function `setValue` có các tham số sau:

-   `thisRef` - tương tự như `getValue`
-   `property` - tương tự như `getValue`
-   giá trị mới - phải có cùng kiểu với property hoặc có kiểu mà kiểu của property kế thừa`getValue` và/hoặc `setValue` có thể là member function của delegate class hoặc extension function. Trường hợp phía sau là tiện hơn khi bạn cần ủy thác property cho một object mà ban đầu không implement các hàm này. Cả 2 function cần được đánh dấu với từ khóa `operator`

```kotlin
  class User {
      var name: String by Delegate()

      operator fun Delegate.setValue(thisRef: User, property: KProperty<*>, value: String) {

      }

      operator fun Delegate.getValue(thisRef: User, property: KProperty<*>): String {
          println("hi")
          return "tu"
      }

      class Delegate
  }

```

Delegate class có thể implement interface `ReadOnlyProperty` với `val` hoặc `ReadWriteProperty` với `var` được khai báo trong thư viện chuẩn của *Kotlin*:

```kotlin
  interface ReadOnlyProperty<in R, out T> {
      operator fun getValue(thisRef: R, property: KProperty<*>): T
  }

  interface ReadWriteProperty<in R, T> {
      operator fun getValue(thisRef: R, property: KProperty<*>): T
      operator fun setValue(thisRef: R, property: KProperty<*>, value: T)
  }

```

### Luật chuyển đổi

Thực tế, với mỗi delegated property, *Kotlin* compiler sinh ra các property hỗ trợ và delegate cho property đó. Ví dụ, với property `prop`, property ẩn `prop$delegate` sẽ được sinh ra, và đoạn code của các các hàm getter, setter đơn giản là delegate đển property ẩn này:

```kotlin
  class C {
      var prop: Type by MyDelegate()
  }

  // this code is generated by the compiler instead:
  class C {
      private val prop$delegate = MyDelegate()
      var prop: Type
          get() = prop$delegate.getValue(this, this::prop)
          set(value: Type) = prop$delegate.setValue(this, this::prop, value)
  }

```

*Kotlin* compiler cung cấp tất cả các thông tin cần thiết về `prop` trong các tham số: `this` tham chiếu đến một instance của class `C` và `this::prop` là reflection object của kiểu `KProperty`, mô tả chính `prop`