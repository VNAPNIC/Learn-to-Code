Các class exception
-------------------

Tất cả các class exception trong *Kotlin* đều thừa kế từ lớp `Throwable`. Mọi exception đều có một message, stack trace và một optional cause

Để throw một exception object, ta sử dụng `throw`

```kotlin
  throw MyException("Hi There!")

```

Và để catch một exception, ta sử dụng `try`

```kotlin
  try {
      // some code
  }
  catch (e: SomeException) {
      // handler
  }
  finally {
      // optional finally block
  }

```

Có thể không có hoặc nhiều khối `catch`. Khối `finally` có thể được bỏ qua. Tuy nhiên, ít nhất phải có 1 khối `catch` hoặc `finally` xuất hiện.

### `Try` là một biểu thức

`try` là một biểu thức. Bởi vậy, ta có thể trả về một giá trị

```kotlin
  val a: Int? = try {
    parseInt(input)
  } catch (e: NumberFormatException) {
    null
  }

```

Giá trị trả về của `try` hoặc là biểu thức cuối cùng trong khối `try` hoặc là biểu thức cuối cùng trong khối `catch` hoặc các khối `catch`. Nội dung khối `finally` không ảnh hưởng đến kết quả của biểu thức

Checked exception
--------------------------------------------------------------------------------------------

*Kotlin* không có checked exception. Có nhiều lý do cho việc này. Hãy xem ví dụ sau:

```kotlin
  //StringBuilder
  Appendable append(CharSequence csq) throws IOException;

```

Signature của hàm cho ta biết điều gì? Mỗi lần append một string, chúng ta phải catch các `IOException` có thể xảy ra. Bởi vì nó có thể thực hiện việc đọc ghi. Bởi vậy, ta phải catch khi gọi hàm `append` như sau:

```kotlin
  try {
      log.append(message)
  } catch (IOException e) {
      // Must be safe
  }

```

> Thực thi các chương trình nhỏ đi tời một kết luận rằng việc yêu cầu các exception có thể vừa nâng cao năng suất của developer và nâng cao chất lượng code. Tuy nhiên, trải nghiệp với các project lớn gợi ra một kết quả khác - giảm hiệu suất và tăng một chút xíu hoặc không tăng chất lượng code

Kiểu Nothing
------------------------------------------------------------------------------------------

`throw` là một biểu thức trong *Kotlin*, bởi vậy chúng ta có thể sử dụng `throw` như một phần của [toán tử elvis](/kotlin/kotlin_basic/#toan-tu-elvis):

```kotlin
  val s = person.name ?: throw IllegalArgumentException("Name required")

```

Kiểu dữ liệu của biểu thức `throw` là một kiểu đặc biệt: `Nothing`. Kiểu dữ liệu này không có giá trị và thường được dùng để đánh dấu các vị trí trong code mà code không bao giờ có thể chạy tới được. Với code của bạn, bạn có thể sử dụng `Nothing` để xác định các function mà không bao giờ trả về giá trị gì:

```kotlin
  fun fail(message: String): Nothing {
      throw IllegalArgumentException(message)
  }

```

Khi bạn gọi function này, compiler sẽ biết rằng việc thực thi không thể tiếp tục sau khi function này được gọi

```kotlin
  val s = person.name ?: fail("Name required")
  println("hello") // code không thể chạy tới dòng này
```