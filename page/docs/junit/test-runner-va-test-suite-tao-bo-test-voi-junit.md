Test runners
------------

Bình thường, các IDE như NetBeans, Eclipse đều có sẵn trình chạy (runner) cho JUnit để hiển thị kết quả các test case, ví dụ:

[![](/img/posts/java/junit-5.png)](/img/posts/java/junit-5.png)

Vậy trường hợp không sử dụng IDE thì sao? ta có thể sử dụng màn hình console để chạy, hiển thị kết quả các test case.

JUnit cung cấp công cụ để định nghĩa bộ test case để chạy và hiển thị kết quả:

-   Để chạy từ chương trình Java ta sử dụng:

```java
    org.junit.runner.JUnitCore.runClasses(TestClass1.class, ...);
```

-   Để chạy từ console ta sử dụng (class test và junit nằm cùng classpath: <http://junit.org/javadoc/latest/org/junit/runner/JUnitCore.html>)

```java
    java org.junit.runner.JUnitCore TestClass1 [...other test classes...]
```

###  Annotation `@RunWith`

Nếu bạn để ý thì những class có các method sử dụng annotation `@Test` thì khi click chuột phải và chọn Run As sẽ có mục 'JUnit Test', những trường hợp đó JUnit sẽ sử dụng trình runner mặc định là `BlockJUnit4ClassRunner` hoặc `JUnit4ClassRunner` cho các version cũ hơn.

Để chỉ rõ trình runner bạn có thể sử dụng `@RunWith`, ví dụ thường dùng nhất là `@RunWith(Suite.class)` để chạy nhiều class JUnit cùng lúc.

Test Suite -- Tạo bộ test với JUnit
----------------------------------

Thông thường 1 class test sẽ sử dụng để test cho một chức năng, một unit. Vậy nếu muốn chạy nhiều class test để xem kết quả thì như nào?\
Câu trả lời là test suite, ta sẽ tạo một bộ gồm nhiều class để thực hiện test và xem kết quả sau một lần chạy.

Để tạo test suite ta sử dụng

`@RunWith(Suite.class)`và `@SuiteClasses(TestClass1.class, ...)`. Bên trong `@SuiteClasses` sẽ là các class test được chạy.

Ví dụ:
```java
   import static org.junit.Assert.assertEquals;
   import org.junit.Test;

   public  class Test1 {
	   @Test
	   public  void  test1()  {
		assertEquals("hello", "hello");
	   }
   }
```

```java
   import static org.junit.Assert.assertTrue;
   import org.junit.Test;

   public class Test2 {
	   @Test
	   public void test1()  {
		assertTrue(true);
	   }
   }
```

Tạo bộ test gồm 2 class test là Test1.java và Test2.java

```java
   import org.junit.runner.RunWith;
   import org.junit.runners.Suite;
   import org.junit.runners.Suite.SuiteClasses;

   @RunWith(Suite.class)
   @SuiteClasses({Test1.class, Test2.class})
   public class MyTestSuite {
   }
```

Demo -- Kết quả: (Chuột phải vào class MyTestSuite.java và chọn Run As JUnit Test)

[![Test runner và Test suite. Tạo bộ test với JUnit](/img/posts/java/junit-6.png)](/img/posts/java/junit-6.png)

###### Test runner và Test suite. Tạo bộ test với JUnit stackjava.com

Okay, Done!

References:

<https://github.com/junit-team/junit4/wiki/Test-runners>

<https://github.com/junit-team/junit4/wiki/Aggregating-tests-in-suites>