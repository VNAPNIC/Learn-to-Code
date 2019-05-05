1\. Giới thiệu
--------------

*Kotlin* cho phép người dùng có thể tự định nghĩa cách implement của các toán tử với mỗi loại dữ liệu. Các toán tử có các ký hiệu cố định ( `*`, `+`, ...) và thứ tự ưu tiên cố định. Để implement một toán tử, chúng ta sẽ phải định nghĩa các function ([member function](/kotlin/kotlin_function/#function-scope) hoặc [extension function](/kotlin/kotlin_function/#5-extension-functions)) với tên function cố định, tương ứng với toán tử mà chúng ta sẽ implement. Để overload các operator, ta sử dụng từ khóa `operator`.

2\. Toán tử một ngôi
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Toán tử một ngôi tiền tố

| Biểu thức | function tương ứng |
| :-: | :-: |
| +a | a.unaryPlus() |
| -a | a.unaryMinus() |
| !a | a.not() |

Nhìn vào bảng, ta sẽ thấy các hàm tương ứng với các toán tử và cách compiler xử lý khi ta sử dụng các toán tử đó. VD: `+a`, nó sẽ hoạt động theo các bước sau:

-   Xác định kiểu dữ liệu của a, giả sử là `T`
-   Tìm kiếm function `unaryPlus()` với từ khóa `operator` và không có tham số đối với kiểu `T`. Function đó có thể là member function hoặc extension function.
-   Nếu không có function đó, quá trình compile sẽ bị lỗi
-   Nếu function đó có mặt và kiểu trả về của nó là `R`, biểu thức `+a` sẽ trả về kiểu dữ liệu `R`

Lưu ý: các toán tử này được tối ưu cho các [kiểu dữ liệu cơ bản](/kotlin/kotlin_basic/#246-kieu-du-lieu)...

VD: overload toán tử `-`

```kotlin
  data class Point(val x: Int, val y: Int)

  operator fun Point.unaryMinus() = Point(-x, -y)

  val point = Point(10, 20)
  println(-point)  // prints "(-10, -20)"

```

Sau khi định nghĩa lại toán tử `-`, Đối tượng `Point` từ bây giờ sẽ dùng được với toán từ `-`(compile thành công) và khi sử dụng toán tử `-`, compiler sẽ tìm đến extension function `unaryMinus()` của đối tượng `Point`, function này trả về kiểu `Point` với giá trị của `x`,`y` được đổi dấu.

### Toán tử một ngôi hậu tố/ tiền tố `++`, `--`

| Biểu thức | function tương ứng |
| :-: | :-: |
| a++ | a.inc() |
| a-- | a.dec() |

Function `inc()` và `dec()` bắt buộc phải trả về một giá trị. Giá trị đó sẽ được gán cho biến mà gọi toán tử `++`, `--`.

Khi xử lý các toán tử một ngôi hậu tố, compiler sẽ xử lý như sau. VD đối với `a++`:

-   Xác định kiểu dữ liệu của a, giả sử là `T`
-   Tìm kiếm function `inc()` với từ khóa `operator`, không có tham số và kiểu trả về của function này phải là kiểu `T` hoặc kế thừa từ `T`

Kết quả của việc tính toán trong biểu thức này là:

-   Lưu trữ giá trị khởi tạo của `a` vào một biến tạm `a0`
-   Gán kết quả của `a.inc()` cho `a`
-   Trả về giá trị `a0` như là kết quả của biểu thức. Giải thích một chút: toán tử hậu tố hoạt động là trả về giá trị của `a`, sau đó mới tăng hoặc giảm `a` (chưa tăng/giảm).

Với toán tử dạng tiền tố `++a`, `--a`, giải pháp là tương tự. Tuy nhiên, kết quả là:

-   Gán kết quả của `a.inc()` cho `a`
-   Trả về giá trị mới của `a` là kết quả của biểu thức Toán tử tiền tố hoạt động là tăng hoặc giảm giá trị của `a` trước, sau đó mới trả về giá trị của `a` (đã tăng/giảm)

3\. Toán tử 2 ngôi
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Toán tử số học

| Biểu thức | function tương ứng |
| :-: | :-: |
| a + b | a.plus(b) |
| a - b | a.minus(b) |
| a * b | a.times(b) |
| a / b | a.div(b) |
| a % b | a.rem(b), a.mod(b) (deprecated) |
| a..b | a.rangeTo(b) |

Tương tự như toán tử một ngôi, compiler cũng sẽ tìm các hàm tương ứng. Lưu ý: `rem` sẽ được hỗ trợ từ *Kotlin 1.1*, *Kotlin 1.0* sử dụng `mod`, `mod` sẽ bị deprecated từ *Kotlin 1.1* VD: đối tượng hoá đơn (Bill) với 2 thuộc tính số lượng(quantity) và giá(cost). Nếu cộng 2 hóa đơn lại, ta có một hóa đơn mới với số lượng và giá bằng tổng 2 hóa đơn kia cộng lại.

```kotlin
  data class Bill(var quantity: Int, var cost: Int) {
      operator fun plus(bill: Bill): Bill {
          return Bill(this.quantity + bill.quantity, this.cost + bill.cost)
      }
  }

  var a: Bill = Bill(2, 10)
  var b: Bill = Bill(1, 5)
  print(a + b) // Bill(quantity=3, cost=15)

```

### Toán tử `in`

| Biểu thức | function tương ứng |
| :-: | :-: |
| a in b | b.contains(a) |
| a !in b | !b.contains(a) |

Với toán tử `in` và `!in`, việc xử lý là tương tự nhưng thứ tự của tham số được đảo lại

VD: ta implement function contains với đối tượng hóa đơn, từ đó ta có thể kiểm tra trong đơn hàng (`Order`) có hóa đơn (`Bill`) đó không:

```kotlin
  data class Order(var bills: Array<Bill>) {
    operator fun contains(bill: Bill): Boolean {
      return bill in bills
    }
  }

  var a: Bill = Bill(2, 10)
  var b: Bill = Bill(1, 5)

  var c: Order = Order(arrayOf(a, b))
  var d: Bill = Bill(2, 10)
  print(d in c) // true

```

### Toán tử truy cập đến chỉ số

| Biểu thức | function tương ứng |
| :-: | :-: |
| a[i] | a.get(i) |
| a[i, j] | a.get(i, j) |
| a[i_1, ..., i_n] | a.get(i_1, ..., i_n) |
| a[i] = b | a.set(i, b) |
| a[i, j] = b | a.set(i, j, b) |
| a[i_1, ..., i_n] = b | a.set(i_1, ..., i_n, b) |

Dấu ngoặc vuông `[]` sẽ gọi đến các hàm `get`, `set` tùy theo số lượng đối truyền vào VD: đối tượng đơn hàng `Order` gồm nhiều các hóa đơn, ta overload lại hàm `get`. Từ đó, ta có thể sử dụng toán tử `[]` để truy cập đến từng hóa đơn của đơn hàng

```kotlin
  data class Order(var bills: Array<Bill>) {
      operator fun get(i: Int): Bill {
          return bills[i]
      }
  }

  var a: Bill = Bill(2, 10)
  var b: Bill = Bill(1, 5)

  var c: Order = Order(arrayOf(a, b))
  print(c[0]) // Bill(quantity=2, cost=10)

```

### Toán tử gọi

| Biểu thức | function tương ứng |
| :-: | :-: |
| a() | a.invoke() |
| a(i) | a.invoke(i) |
| a(i, j) | a.invoke(i, j) |
| a(i_1, ..., i_n) | a.invoke(i_1, ..., i_n) |

Dấu ngoặc tròn `()` sẽ gọi đến các hàm `invoke` tùy theo số lượng đối truyền vào

VD: overload function `invoke()` để tính tổng tiền của hóa đơn:

```kotlin
  operator fun invoke(): Int {
    return quantity * cost
  }

  var a: Bill = (2, 10)
  print(a()) // 20
  print(a.invoke()) //20

```

### Toán tử tăng và gán

| Biểu thức | function tương ứng |
| :-: | :-: |
| a += b | a.plusAssign(b) |
| a -= b | a.minusAssign(b) |
| a *= b | a.timesAssign(b) |
| a /= b | a.divAssign(b) |
| a %= b | a.modAssign(b) |

Với loại toán tử này, VD: `a += b`, compiler sẽ xử lý như sau:

-   Nếu có function ở cột bên phải:
    -   Nếu các function tương ứng với các toán tử 2 ngôi VD (`plus()` đối với `plusAssign()`), compiler sẽ báo lỗi
    -   Nếu kiểu trả về của function không phải là `Unit`, compiler sẽ báo lỗi
    -   Sử dụng function `a.plusAssign(b)`
-   Ngược lại, nếu không có function, sẽ sử dụng code được xử lý bởi function `a = a + b` (yêu cầu kiểm tra kiểu: kiểu của `a + b` phải là kiểu của `a` hoặc kế thừa từ kiểu của `a`)

Lưu ý: gán không phải là một biểu thức trong *Kotlin* VD: vẫn với đối tượng `Bill` ở trên, ta định nghĩa thêm một function `plusAssign()`. Khi đó, nếu ta vẫn định nghĩa function `plus()` để overload toán tử `+`, compiler sẽ báo lỗi. Để sử dụng `plusAssign()`, ta phải bỏ function `plus()`

```kotlin
operator fun plusAssign(bill: Bill) {
    this.quantity += bill.quantity
    this.cost += bill.cost
}

var a: Bill = Bill(2, 10)
var b: Bill = Bill(1, 5)
a += b
print(a) // Bill(quantity=3, cost=15)

```

### Toán tử `==` và `!=`

| Biểu thức | function tương ứng |
| :-: | :-: |
| a == b | a?.equals(b) ?: (b === null) |
| a != b | !(a?.equals(b) ?: (b === null)) |

Lưu ý: `===` và `!==` (xem thêm [toán tử so sánh](/kotlin/kotlin_basic/#446-toan-tu-so-sanh)) không thể overload được.

### Toán tử so sánh

| Biểu thức | function tương ứng |
| :-: | :-: |
| a > b | a.compareTo(b) > 0 |
| a < b | a.compareTo(b) < 0 |
| a >= b | a.compareTo(b) >= 0 |
| a <= b | a.compareTo(b) <= 0 |

Tất cả toán tử so sánh sẽ gọi hàm `compareTo` và yêu cầu trả về kiểu `Int`

VD:

```kotlin
  operator fun compareTo(bill: Bill): Int {
    return (this.quantity * this.cost) - (bill.quantity * bill.cost)
  }

  var a: Bill = Bill(2, 10)
  var b: Bill = Bill(1, 5)
  print(a < b) // false

```

4\. infix notation (trung tố)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Chúng ta có thể coi các infix function là các toán tử. Xem thêm [infix function](/kotlin/kotlin_function/#8-infix-notation)