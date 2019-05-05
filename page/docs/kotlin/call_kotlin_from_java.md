Property
--------

Một property của một class trong *Kotlin* sẽ được compile thành các thành phần sau trong *Java*:

-   Một hàm getter với tên được suy ra từ tên property và thêm tiền tố `get`
-   Một hàm setter với tên được suy ra từ tên property và thêm tiền tố `set`(hàm setter chỉ được sinh với property kiểu `var`)
-   Một field với phạm vi truy cập là `private` với tên trùng với tên property (chỉ với property có [backing field](/kotlin/kotlin_property_field/#346-backing-field))

VD:

Kotlin

```kotlin
  var firstName: String

```

Java

```java
  private String firstName;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

```

Nếu tên của property bắt đầu với `is`, một tên khác được map sang với quy luật: tên của hàm getter sẽ giống với tên của property, và tên của hàm setter sẽ được sinh ra bằng cách thay thế `is` bằng `set`. VD:

Kotlin

```kotlin
  var isOpen: Boolean = true

```

Java

```java
  private boolean isOpen;

  public boolean isOpen(){
    return isOpen;
  }

  public void setOpen(boolean isOpen){
    this.isOpen = isOpen;
  }

```

Package-level function
-------------------------------------------------------------------------------------------------------------------------------

Tất cả các function và property được khai báo trong file `example.kt` và bên trong package `org.foo.bar`, bao gồm cả các extension function, được compile thành các hàm `static` và thuộc Java class `org.foo.bar.ExampleKt`

```kotlin
  // example.kt
  package demo

  class Foo

  fun bar() {
  }

```

```java
  //Java
  new demo.Foo();
  demo.ExampleKt.bar();

```

Tên của java class được sinh ra có thể thay đổi bằng cách dùng annotation `@JvmName`:

```kotlin
  @file:JvmName("DemoUtils")

  package demo

  class Foo

  fun bar() {
  }

```

```java
// Java
  new demo.Foo();
  demo.DemoUtils.bar();

```

Khi có nhiều file có cùng tên java class được sinh ra( cùng package và cùng tên hoặc cùng annotation `@JvmName`), sẽ có lỗi. Tuy nhiên, compiler có khả năng sinh ra một java class facade có tên xác định và gồm tất cả các khai báo từ tất cả các file mà có cùng cùng tên đó. Để enable việc sinh file facade này, sử dụng annotation `@JvmMultifileClass` ở tất cả các file cùng tên.

```kotlin
  // oldutils.kt
  @file:JvmName("Utils")
  @file:JvmMultifileClass

  package demo

  fun foo() {
  }

  // newutils.kt
  @file:JvmName("Utils")
  @file:JvmMultifileClass

  package demo

  fun bar() {
  }

```

```java
  // Java
  demo.Utils.foo();
  demo.Utils.bar();

```

Instance field
---------------------------------------------------------------------------------------------------------------

Nếu bạn muốn xác định một property trong *Kotlin* là một field trong *Java*, bạn cần đánh dấu property này với annotation `@JvmField`. Field sẽ có cùng access modifier với property. Bạn có thể đánh dấu `@JvmField` nếu nó có backing field, visibility modifier không phải private, không được khai báo với từ khóa `open`, `override` hoặc `const` và không phải là một delegated property.

```kotlin
  class C(id: String) {
      @JvmField val ID = id
  }

```

```java
  // Java
  class JavaClient {
      public String getID(C c) {
          return c.ID;
      }
  }

```

Property [lateinit](/kotlin/kotlin_property_field/#646-late-initialized-property-khoi-tao-cham-cac-thuoc-tinh) cũng có thể được xác định là một field trong *Java*. Khi đó, visibility modifier của field sẽ giống với visibility modifier của hàm setter của property.

[](https://github.com/ngohado/Kotlin-Docs/wiki/G%E1%BB%8Di-Kotlin-t%E1%BB%AB-Java#static-field)Static field
-----------------------------------------------------------------------------------------------------------

Property trong *Kotlin* được khai báo trong một object hoặc companion object sẽ có static backing field hoặc trong tên object hoặc trong class mà chứa companion objet. Thường thường, những field này là private nhưng chúng có thể được phơi ra bằng những cách sau:

-   Sử dụng annotation `@JvmField`
-   Sử dụng từ khóa `lateinit`
-   Sử dụng từ khóa `const`

Việc sử dụng `@JvmField` làm cho field có cùng visibility modifier với property.

```kotlin
  class Key(val value: Int) {
      companion object {
          @JvmField
          val COMPARATOR: Comparator<Key> = compareBy<Key> { it.value }
      }
  }

```

```java
  // Java
  Key.COMPARATOR.compare(key1, key2);
  // public static final field in Key class

```

Một property lateinit bên trong một object hoặc companion object có một static backing field với cùng visibility modifier với hàm setter.

```kotlin
  object Singleton {
      lateinit var provider: Provider
  }

```

```java
  // Java
  Singleton.provider = new Provider();
  // public static non-final field in Singleton class

```

Property được đánh dấu bằng `const` ở trong class cũng như ở top-level sẽ được chuyển thành static field trong *Java*:

```kotlin
  // file example.kt

  object Obj {
      const val CONST = 1
  }

  class C {
      companion object {
          const val VERSION = 9
      }
  }

  const val MAX = 239

```

```java
  int c = Obj.CONST;
  int d = ExampleKt.MAX;
  int v = C.VERSION;

```

Static method
-------------------------------------------------------------------------------------------------------------

Như được đề cập ở trên, *Kotlin* coi package-level function là static method. *Kotlin* cũng có thể sinh ra các static method cho các function được định nghĩa ở trong một object hoặc một companion object nếu bạn đánh dấu các hàm đó với `@JvmStatic`. Nếu bạn sử dụng annotation này, compiler sẽ sinh ra cả static method ở bên trong class đó và một instance method cho class đó.

```kotlin
  class C {
      companion object {
          @JvmStatic fun foo() {}
          fun bar() {}
      }
  }

```

Bây giờ, `foo()` là hàm static trong *Java*, còn `bar()` thì không:

```java
  C.foo(); // works fine
  C.bar(); // error: not a static method
  C.Companion.foo(); // instance method remains
  C.Companion.bar(); // the only way it works

```

Tương tự với object

```kotlin
  object Obj {
      @JvmStatic fun foo() {}
      fun bar() {}
  }

```

Và trong *Java*:

```java
  Obj.foo(); // works fine
  Obj.bar(); // error
  Obj.INSTANCE.bar(); // works, a call through the singleton instance
  Obj.INSTANCE.foo(); // works too

```

`@JvmStatic` có thể được áp dụng với một property của một object hoặc companion object.

Visibility
-------------------------------------------------------------------------------------------------------

Visibility modifier trong *Kotlin* sẽ được map sang *Java* theo cách sau:

-   Các thành phần `private` vẫn sẽ là các thành phần `private`
-   Các khai báo `private` ở top-level được compile thành các khai báo được sử dụng trong cùng một package
-   `protected` vẫn là `protected` (lưu ý rằng *Java* cho phép truy cập các thành phần protected từ các class khác trong cùng một package còn *Kotlin* thì không, bởi vậy các class của *Java* sẽ có phạm vi truy cập rộng hơn)
-   `internal` sẽ trở thành `public` trong *Java*.
-   `public` vẫn là `public`

KClass
-----------------------------------------------------------------------------------------------

Thỉnh thoảng bạn cần gọi một hàm trong *Kotlin* với một tham số kiểu `KClass`. Sẽ không có class nào được tự động chuyển đổi từ `Class` thành `KClass`, bởi vậy bạn phải tự gọi clas tương tự `Class<T>.kotlin`

```kotlin
  kotlin.jvm.JvmClassMappingKt.getKotlinClass(MainView.class)

```

Xử lý việc xung đột với `@JvmName`
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Thỉnh thoảng chúng ta có một function trong *Kotlin*, nhưng lại cần các cái tên JVM khác nhau. VD:

```kotlin
  fun List<String>.filterValid(): List<String>
  fun List<Int>.filterValid(): List<Int>

```

Hai hàm này không thể được định nghĩa cạnh nhau bởi JVM coi chúng giống nhau: `filterValid(Ljava/util/List;)Ljava/util/List;`. Nếu chúng ta muốn chúng có cùng tên trong *Kotlin*, chúng ta có thể đánh dấu một hàm(hoặc cả 2) với từ khóa `@JvmName` và xác định một cái tên khác như một tham số:

```kotlin
  fun List<String>.filterValid(): List<String>

  @JvmName("filterValidInt")
  fun List<Int>.filterValid(): List<Int>

```

Từ *Kotlin*, chúng có thể được truy cập bởi cùng tên `filterValid`, nhưng từ *Java*, chúng sẽ có 2 tên khác nhau là `filterValid` và `filterValidInt`. Mẹo tương tự cũng được áp dụng khi chúng ta cần một property `x` và một hàm `getX()`

```kotlin
  val x: Int
      @JvmName("getX_prop")
      get() = 15

  fun getX() = 10

```

Bây giờ, hàm `getX()` sẽ trả về 10 và hàm `getX_prop()` được gọi từ *Java* sẽ trả về giá trị của `x`

[](https://github.com/ngohado/Kotlin-Docs/wiki/G%E1%BB%8Di-Kotlin-t%E1%BB%AB-Java#sinh-c%C3%A1c-h%C3%A0m-overload)Sinh các hàm overload
---------------------------------------------------------------------------------------------------------------------------------------

Bình thường, nếu bạn viết một hàm trong *Kotlin* với các param có giá trị mặc định, hàm đó nếu được gọi trong *Java* sẽ được nhìn thấy với toàn bộ các param. Nếu bạn muốn sinh ra nhiều hàm overload của hàm đó, bạn có thể sử dụng annotation `@JvmOverloads`

```kotlin
  @JvmOverloads fun f(a: String, b: Int = 0, c: String = "abc") {
      ...
  }

```

Với mỗi param có giá trị mặc định, sẽ có một hàm overload được sinh ra với param đó và tất cả các param ở bên phải của nó được bỏ đi. Với hàm `f` ở trên, sẽ có các hàm overload sau được sinh ra:

```java
  // Java
  void f(String a, int b, String c) { }
  void f(String a, int b) { }
  void f(String a) { }

```

Với các hàm mà không truyền vào các param có giá trị mặc định, các giá trị mặc định được khai báo trong *Kotlin* vẫn sẽ có tác dụng đối với *Java*.

Annotation cũng có thể sử dụng với các hàm tạo, static method,... Tuy nhiên, annotation không thể sử dụng với abstract method, bao gồm cả các method được định nghĩa bên trong interface.

Lưu ý: như đã được nói ở trong phần [secondary constructor](/kotlin/kotlin_class_inheritance/#secondary-constructors), nếu một lớp có các giá trị mặc định cho tất cả các constructor, một hàm tạo không tham số sẽ được sinh ra. Việc này sẽ được sinh cả trong trường hợp không sử dụng annotation `JvmOverloads`

Checked exception
---------------------------------------------------------------------------------------------------------------------

Như chúng ta đã đề cập ở trên, *Kotlin* không có checked exception. Bởi vậy, bình thường, signature trong *Java* của một hàm viết bằng *Kotlin* không được khai báo việc throw các exception. Bởi vậy, nếu chúng ta có một hàm trong *Kotlin* như thế này:

```kotlin
  // example.kt
  package demo

  fun foo() {
      throw IOException()
  }

```

Và nếu chúng ta muốn gọi nó từ *Java* và catch exception:

```java
  // Java
  try {
    demo.Example.foo();
  }
  catch (IOException e) { // error: foo() không khai báo IOException trong list các exception sẽ throw
    // ...
  }

```

Chúng ta sẽ nhận được lỗi từ Java compiler bởi vì `foo()` không khai báo `IOException`. Để giải quyết vấn đề này, sử dụng annotation `@Throws`:

```kotlin
  @Throws(IOException::class)
  fun foo() {
      throw IOException()
  }

```

Null-safety
---------------------------------------------------------------------------------------------------------

Khi gọi một hàm trong *Kotlin* từ *Java*, không có gì có thể ngăn cả chúng ta truyền một giá trị null cho một param có kiểu là non-null nữa. Đó là lý do tại sao *Kotlin* sinh ra việc check lúc runtime cho tất cả các hàm public mà yêu cầu các param có kiểu non-null. Từ đó, chúng ta lại có thể gặp lại `NullPointerException` như trong *Java*, ngay lập tức.