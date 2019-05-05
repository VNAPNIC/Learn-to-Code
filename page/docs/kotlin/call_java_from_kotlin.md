Getters và Setters
------------------

Những method nào của `Java` không có `parameter` nào và tên method bắt đầu bằng từ `get` hoặc method có một parameter và bắt đầu bằng từ `set`, sẽ được coi như `property` ở trong `Kotlin`giống như ví dụ dưới đây:

```java
import java.util.Calendar

fun calendarDemo() {
    val calendar = Calendar.getInstance()
    if (calendar.firstDayOfWeek == Calendar.SUNDAY) {  // call calendar.getFirstDayOfWeek()
        calendar.firstDayOfWeek = Calendar.MONDAY       // call calendar.setFirstDayOfWeek()
    }
}

```

Giả sử như trong Java

```java
recyclerView.setAdapter(adapter);

```

Kotlin

```kotlin
recyclerView.adapter = adapter;

```

Lưu ý: Nếu như java class chỉ có một method `setter`, Kotlin sẽ không coi nó như là một `property`và có nghĩa rằng trong khi bạn sử dụng Java class đó trong Kotlin, vẫn sẽ gọi tên method và truyền parameter vào như bình thường. Hiện tại Kotlin chưa hỗ trợ `set-only property`.

Java identifier giống với keyword ở trong Kotlin
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Một số keyword của Kotlin là một tên hợp lệ ở trong Java ví dụ như `in`, `is`, `object`,... Ví dụ như một method trong Java sử dụng keyword `is` là tên method, ta sử dụng method đó trong Kotlin bằng cách thêm dấu nháy vào tên method đó:

```kotlin
foo.`is`(bar)

```

getClass()
----------------------------------------------------------------------------------------------------------

Nếu muốn lấy Java class của một object, ta sử dụng extension `java` hoặc `javaclass`: Java

```kotlin
val fooClass = foo::class.java
val fooClass = foo.javaClass

```

Muốn lấy Kotlin class của một object: Kotlin

```kotlin
val c = MyClass::class
```