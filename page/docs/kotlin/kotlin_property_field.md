1\. Khai báo `property`
-----------------------

Các `class` trong *Kotlin* có thể có các `property`. Chúng có thể khai báo là các biến - sử dụng từ khóa `var` hoặc các constant - sử dụng từ khóa `val`.

Java

```java
  class Address {
    String name;
    String street;
    String city;
    String state;
    String zip;
  }

```

Kotlin

```kotlin
  class Address {
    var name: String = ...
    var street: String = ...
    var city: String = ...
    var state: String? = ...
    var zip: String = ...
  }

```

Để sử dụng các `property` này, chúng ta chỉ cần access đến chúng bằng tên, hoặc bằng các hàm `getter/setter` như trong *Java*

Java

```
  public Address copyAddress(Address address) {
    Address result = new Address();
    result.setName(address.getName());
    result.setStreet(address.getStreet());
    //....
    return result;
  }

```

Kotlin

```kotlin
  fun copyAddress(address: Address): Address {
      val result = Address() // không còn từ khóa 'new' trong Kotlin
      result.name = address.name //các hàm 'getter/setter' sẽ được gọi, dù nhìn trông như bạn đang truy cập trực tiếp vào 'property'
      result.street = address.street
      // ...
      return result
  }

```

2\. Các hàm `getter/setter`
----------------------------------------------------------------------------------------------------------------------------------

Cấu trúc đầy đủ của khai báo `property` trong *Kotlin* là:

```kotlin
  var <propertyName>[: <PropertyType>] [= <property_initializer>]
      [<getter>]
      [<setter>]

```

Trong đó, giá trị khởi tạo, và các hàm `getter/setter` là không bắt buộc, kiểu dữ liệu cũng là không bắt buộc nếu nó có thể được suy ra từ việc khởi tạo (hoặc từ kiểu của mà hàm `getter` trả về, sẽ được nói phía sau). Tuy nhiên, để code được trong sáng, lời khuyên là nên thêm kiểu của thuộc tính khi khai báo.

```kotlin
  var allByDefault: Int? // compiler báo lỗi vì việc khởi tạo được yêu cầu, các hàm 'getter/setter' mặc định được chỉ định
  var initialized = 1 // kiểu 'Int', hàm 'getter/setter' mặc định

```

Với các constant, việc khai báo sử dụng từ khóa `val` và không được định nghĩa hàm `setter`:

```kotlin
  val simple: Int? // compiler báo lỗi: yêu cầu việc khởi tạo, 'getter' mặc định
  val inferredType = 1 // kiểu 'Int', hàm 'getter' mặc định

```

Với các hàm `getter/setter`, nếu không được định nghĩa, các hàm `getter/setter` mặc định sẽ được sử dụng. Chúng ta có thể định nghĩa các hàm này ngay sau việc khai báo các `property`. Mặc định, tên của `param` của hàm `setter` là `value`. Tuy nhiên, bạn có thể chọn một cái tên khác. Nếu thích!

```kotlin
  var isEmpty: Boolean
      get() {         //
        return field  // hàm 'getter' mặc định
      }               //
      set(value) {
        field = value
      }

  var isEmpty: Boolean
      get() = this.size == 0    // hàm 'getter' tự định nghĩa
      set (value){              //
        print("Setter: $value") //hàm 'setter' tự định nghĩa
        field = value           //
      }

```

Từ *Kotlin 1.1*, bạn có thể bỏ qua kiểu dữ liệu của `property` nếu nó có thể được suy ra từ kiểu trả về của hàm `getter`:

```kotlin
  val isEmpty get() = this.size == 0  // isEmpty sẽ có kiểu là Boolean

```

Ngoài ra, ta cũng có thể xác định visibility modifier của hàm `setter`. Lưu ý: modifier của `setter`phải có phạm vi không được lớn hơn phạm vi modifier của `property`. Với `getter`, chúng ta không thể thay đổi modifier của hàm `getter` bởi modifier của `getter` phải giống với modifier của `property`. Bạn cũng có thể chỉ xác định lại modifier của hàm `setter` mà không cần implement hàm đó:

```
  var setterVisibility: String = "abc"
    private set // hàm 'setter' có modifier là 'private' và việc implement là mặc định

```

3\. Backing field
-------------------------------------------------------------------------------------------------------

Trong một VD ở phía trên trên, ta có thể thấy một biến xuất hiện trong các hàm `getter/setter` tự định nghĩa, đó là `field`. Lưu ý, `field` chỉ có thể sử dụng bên trong các hàm `getter/setter` và `field` sẽ được tự động gen cho `property` nếu một trong các hàm `getter/setter` tham chiếu đến nó. Nếu không, `property` sẽ không có `field`. Nhưng vì sao phải dùng `field` thay vì dùng `property` một cách trực tiếp như thế này:

```kotlin
var isEmpty: Boolean
    get() = {
      return isEmpty
    }
    set (value){
      isEmpty = value
    }

```

Như trong một vd ở trên đã đề cập, khi bạn access đến một `property`:

```kotlin
  val result = Address()
  result.name = address.name

```

Khi này, thực chất, hàm `setter` và `getter` của property `name` sẽ được gọi chứ không phải bạn đang access trực tiếp đến `name`. Bởi vậy, trong các hàm `getter/setter` tự định nghĩa, nếu sử dụng trực tiếp các `property` (vd hàm `getter`), *Kotlin* sẽ gọi lại chính hàm `getter` đó, từ đó gây ra tràn bộ nhớ Stack - `StackOverflowError`.

4\. Backing property
-------------------------------------------------------------------------------------------------------------

Nếu bạn không quen (hoặc không thích) cách dùng `field` ở trên, bạn có thể sử dụng backing property. Việc này tương tự như trong *Java*, và các hàm `getter/ setter` sẽ được tối ưu để việc tràn bộ nhớ không xảy ra. Tuy nhiên, việc viết code sẽ vất vả hơn, tất nhiên rồi:

```kotlin
  private var _table: Map<String, Int>? = null
  public var table: Map<String, Int>
      get() {
          if (_table == null) {
              _table = HashMap() // Type parameters are inferred
          }
          return _table ?: throw AssertionError("Set to null by another thread")
      }
      set(value) {
        _table = value
      }

```

Trong VD trên, `property` mà chúng ta sử dụng để lưu dữ liệu là `_table` còn `table` chỉ là cách thức để chúng ta truy cập đến `_table`.

5\. Compile-time constant
-----------------------------------------------------------------------------------------------------------------------

Các thuộc tính mà giá trị của chúng được biến đến lúc compile có thể được đánh dấu là compile time constant, sử dụng từ khóa `const`. Những `property` để đạt được cần thỏa mãn nhưng yêu cầu sau:

-   Là top-level `property` hoặc là member của một `object`(object trong *Kotlin* là một singleton, không phải là đối tượng)
-   Được khởi tạo với kiểu `String` hoặc kiểu nguyên thủy(Int, Float, Char, Boolean...), không thể là một đối tượng được định nghĩa
-   Không được có hàm `getter` tự định nghĩa

```kotlin
  const val SUBSYSTEM_DEPRECATED: String = "This subsystem is deprecated"

  @Deprecated(SUBSYSTEM_DEPRECATED) fun foo() { ... }

```

6\. Late-initialized property (Khởi tạo chậm các thuộc tính)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Bình thường, khi các `property` được khai báo trong class mà thuộc kiểu non-null phải được khởi tạo: trực tiếp hoặc bằng constructor. Tuy nhiên, việc này không được tiện cho lắm. VD: `property` có thể được khởi tạo thông qua Dependency injection hoặc được khởi tạo bên trong method setup của một unit tets hoặc được gán trong một method khác bên trong class. Bởi vậy, *Kotlin* cung cấp cơ chế cho phép delay việc khởi tạo: từ khóa `lateinit`

```kotlin
class Teacher(var name: String, var age: Int) {
  lateinit var className: String
}

```

Yêu cầu để sử dụng được từ khóa `lateinit` là:

-   Phải sử dụng với `var property` được khai báo bên trong một class nhưng không phải là trong primary constructor. - `property` này không được có các hàm `getter/setter` tự định nghĩa mà phải dùng các hàm mặc định
-   Kiểu của các `property` này phải là non-null và không thể là kiểu dữ liệu nguyên thủy(Int, Float,Char, Boolean...)
-   Nếu truy cập các `property` này khi chúng chưa được khởi tạo, xin chúc mừng: `kotlin.UninitializedPropertyAccessException` sẽ xuất hiện.

7\. Overriding property (Ghi đè các `property`)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Trong *Kotlin*, chúng ta có thể ghi đè các `property` bằng cách sử dụng từ khóa `override` tương tự như override các method.

```kotlin
  open class Foo {
    open val x: Int get { ... }
  }

  class Bar1 : Foo() {
    override val x: Int = ...
  }

```

Đặc biệt, chúng ta có thể override lại một `val` property bằng một `var` property, nhưng không thể làm điều ngược lại. Điều này được phép bởi vì một `val` property đã khai báo hàm `getter`, và khi override lại nó là `var`, chúng ta cần viết thêm hàm `setter` trong class con.

Từ khóa `override` cũng có thể sử dụng ngay trong primary constructor:

```kotlin
  interface Foo {
    val count: Int
  }

  class Bar1(override val count: Int) : Foo

  class Bar2 : Foo {
    override var count: Int = 0
  }
```