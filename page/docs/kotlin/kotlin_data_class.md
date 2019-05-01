1\. Giới thiệu
--------------

Trong một ứng dụng, ta cần phải định nghĩa rất nhiều các class chỉ nhằm mục đích lưu trữ dữ liệu. Với *Java*, việc khai báo các class như thế khá là mất thời gian:

Java

```java
  public class User {
    private String name;
    private int age;

    public User(String name, int age) {
      this.name = name;
      this.age = age;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public int getAge() {
      return age;
    }

    public void setAge(int age) {
      this.age = age;
    }
  }

```

Để tối ưu hóa việc này, *Kotlin* cung cấp các data class. Chúng được đánh dấu bằng từ khóa `data`khi khai báo class:

```kotlin
  data class User(val name: String, val age: Int)

```

Từ đó, compiler sẽ tự động suy ra các function từ các `param` khai báo trong primary constructor:

-   function `equals()`, `hashCode()`
-   function `toString()` dưới dạng `User(name=John, age=42)`
-   các function `componentN()`. Các hàm này được sinh ra dựa trên số lượng các `property` của class với `N` là số thứ tự của các thuộc tính. Như trong trường hợp trên:

```kotlin
  var user: User = User("tu", 12)
  user.component1() // property 'name', kiểu 'String'
  user.component2() // property 'age', kiểu 'Int'

```

-   function `copy()`: Sẽ được nói ở phía sau

Nếu một trong các function đó được định nghĩa một cách tường minh trong body class, chúng sẽ không được sinh ra.

Để đạt được tính nhất quán và các hành vi có ý nghĩa của code được sinh ra, data class phải thỏa mãn những yêu cầu sau:

-   Primary constructor phải có ít nhất 1 `param`
-   Tất cả `param` của primary constructor phải được khai báo là `var` hoặc `val`
-   Data class không thể là `abstract`, `open`, `sealed` hay `inner` class.
-   Data class chỉ có thể implement các interface (Trước phiên bản 1.1)

Như đã nói trong phần [constructor](/kotlin/kotlin_class_inheritance/#constructor), nếu tất cả các `param` của primary constructor có giá trị mặc định, compiler sẽ tự sinh ra thêm một constructor không có tham số sử dụng các giá trị mặc định đã khai báo ở primary constructor:

```kotlin
  data class User(val name: String = "", val age: Int = 0)

```

2\. Function `copy()`
-----------------------------------------------------------------------------------------------

Trong trường hợp bạn cần copy một đối tượng nhưng lại muốn thay đổi một số `property` và giữ nguyên phần còn lại. Hàm `copy()` được sinh ra là để làm điều đó. Với VD về đối tượng `User` ở trên, hàm `copy()` sẽ được implement như thế này:

```kotlin
fun copy(name: String = this.name, age: Int = this.age) = User(name, age)

```

Nhờ vậy, `copy()` cho phép chúng ta copy như thế này:

```kotlin
  val jack = User(name = "Jack", age = 1)
  val olderJack = jack.copy(age = 2)

```

3\. Data class và Destructuring Declaration
----------------------------------------------------------------------------------------------------------------------------------------------------

Với các hàm `componentN()` được sinh ra, data class có thể sử dụng cơ chế [destructuring declaration](/kotlin/kotlin_function/#destructuring-declarations)như sau:

```kotlin
  val jane = User("Jane", 35)
  val (name, age) = jane
  println("$name, $age tuổi") // prints "Jane, 35 tuổi"
```