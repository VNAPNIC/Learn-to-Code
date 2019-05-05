1\. Giới thiệu
--------------

Biểu thức range(phạm vi) `..` là một dạng của function `rangeTo` và sử dụng với toán tử `in` hoặc `!in`. Range được định nghĩa cho bất kỳ kiểu dữ liệu có thể so sánh nào. Tuy nhiên, nó được tối ưu với kiểu dữ liệu kiểu nguyên:

```kotlin
  if (i in 1..10) { // tương tự với 1 <= i && i <= 10
      println(i)
  }

```

Toàn bộ kiểu phạm vi (`IntRange`, `LongRange`, `CharRange`) có thể được dùng để duyệt bằng cách sử dụng vòng lặp `for`:

```kotlin
  for (i in 1..4) print(i) // prints "1234"

  for (i in 4..1) print(i) // không in gì

```

Để duyệt ngược, ta sử dụng function `downTo()` được định nghĩa trong thư viện chuẩn

Java

```kotlin
  for (int i = 10; i >= 0; i--) {

  }

```

Kotlin

```kotlin
  for (i in 4 downTo 1) print(i) // prints "4321"

```

Để duyệt với bước nhảy k phải là 1, ta sử dụng function `step()`

Java

```kotlin
  for (int i = 0; i <= 10; i = i+2) {

  }

```

Kotlin

```kotlin
  for (i in 1..4 step 2) print(i) // prints "13"

  for (i in 4 downTo 1 step 2) print(i) // prints "42"

```

Để duyệt và ngoại trừ phần tử cuối cùng, ta sử dụng function `until`

Java

```kotlin
  for (int i = 0; i < 10; i++){

  }

```

Kotlin

```kotlin
  for (i in 1 until 10) {
       println(i)
  }

```

2\. Cách hoạt động
------------------------------------------------------------------------------------------------------------------

Ranges implement một interface trong thư viện: `ClosedRange<T>`

`ClosedRange<T>` biểu thị một khoảng kín với các kiểu dữ liệu có thể so sánh được. Nó có 2 endpoint: `start` và `endInclusive`, cái mà được bao gồm trong khoảng đó. Function sử dụng chính là `contains`, thường được sử dụng dưới dạng toán tử `in` hoặc `!in`.

Progression với các dữ liệu kiểu nguyên (`IntProgression`, `LongProgression`, `CharProgression`) biểu thị một tiến trình số học. Progression được định nghĩa bởi phần tử `first`, phần tử `last` và một `step` khác 0. Phần tử đầu tiên là `first`, phần tử tiếp theo là `first` + `step`.

Progression là lớp con của `Iterable<N>`, với `N` là kiểu `Int`, `Long`, `Char`. Bởi vậy chúng có thể được dùng với vòng lặp `for` và các function như `map`, `filter`, ... Việc duyệt qua `Progression`tương tự như vòng lặp `for` có chỉ số trong *Java* hoặc *JavaScript*:

```kotlin
  for (int i = first; i != last; i += step) {
    // ...
  }

```

Với kiểu dữ liệu kiểu nguyên, toán tử `..` tạo một đối tượng cả `ClosedRange<T>` và `*Progression`. VD: `IntRange` implement `ClosedRange<Int>` và kế thừa `IntProgression`, do đó các toán tử được định nghĩa cho `IntProgression` cũng có thể hiệu lực với `IntRange`. Kết quả của các function `downTo()` và `step()` luôn luôn là một `*Progression`.

Progression được tạo ra bởi function `fromClosedRange` được định nghĩa bên trong companion object.

```kotlin
  IntProgression.fromClosedRange(start, end, step)

```

Phần tử `last` của progression được tính toán để tìm được giá trị lớn nhất không lớn hơn giá trị `end` với `step` >0 hoặc không nhỏ hơn giá trị `end` với `step` < 0 : `(last - first) % step == 0`

3\. Các function hữu ích
----------------------------------------------------------------------------------------------------------------------

### rangeTo()

Toán tử `rangeTo()` với kiểu dữ liệu nguyên đơn giản sẽ gọi hàm tạo của các class `*Range`

```kotlin
  class Int {
      //...
      operator fun rangeTo(other: Long): LongRange = LongRange(this, other)
      //...
      operator fun rangeTo(other: Int): IntRange = IntRange(this, other)
      //...
  }

```

Các số thực (`Double`, `Float`) không định nghĩa các toán tử `rangeTo()` mà được cung cấp bởi thư viện chuẩn cho kiểu `Comparable`

```kotlin
  public operator fun <T: Comparable<T>> T.rangeTo(that: T): ClosedRange<T>

```

Bởi vậy, không thể duyệt với các số thực.

### downTo()

Extension function `downTo()` được định nghĩa với kiểu số nguyên

```kotlin
  fun Long.downTo(other: Int): LongProgression {
      return LongProgression.fromClosedRange(this, other.toLong(), -1L)
  }

  fun Byte.downTo(other: Int): IntProgression {
      return IntProgression.fromClosedRange(this.toInt(), other, -1)
  }

```

### reversed()

Extension function `reversed()` được định nghĩa cho các lớp `*Progression` và chúng trả về các progression ngược:

```kotlin
  fun IntProgression.reversed(): IntProgression {
      return IntProgression.fromClosedRange(last, first, -step)
  }

```

### step()

Các extension function `step()` được định nghĩa cho các lớp `*Progression`, tất cả chúng trả về một progression với giá trị `step` được truyền vào. Giá trị của `step` cần là một số dương để function không bao giờ có thể thay đổi được hướng duyệt

```kotlin
  fun IntProgression.step(step: Int): IntProgression {
      if (step <= 0) throw IllegalArgumentException("Step must be positive, was: $step")
      return IntProgression.fromClosedRange(first, last, if (this.step > 0) step else -step)
  }

  fun CharProgression.step(step: Int): CharProgression {
      if (step <= 0) throw IllegalArgumentException("Step must be positive, was: $step")
      return CharProgression.fromClosedRange(first, last, if (this.step > 0) step else -step)
  }

```

Lưu ý rằng giá trị `last` của progression trả về có thể khác so với giá trị `last` của progression ban đầu để giữ lại sự bất biến:

```kotlin
  (1..12 step 2).last == 11  // progression with values [1, 3, 5, 7, 9, 11]
  (1..12 step 3).last == 10  // progression with values [1, 4, 7, 10]
  (1..12 step 4).last == 9   // progression with values [1, 5, 9]
```