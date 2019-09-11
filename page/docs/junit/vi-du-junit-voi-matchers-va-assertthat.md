Ví dụ JUnit với Matchers và assertThat.

Thông thường ta chỉ kiểm tra / expect kết quả của một unit bằng một giá trị nào đó. Với những trường hợp kết quả không cố định mà thường theo một định dạng nào đó thì ta sẽ cần phải sử dụng Matchers và assertThat.

(Ở bài [test exception với JUnit](/junit/junit-expected-exceptions-code-vi-du-test-exception-voi-junit/) mình có sử dụng assertThat và Matchers để kiểm tra loại exception nào được ném ra và message có bao gồm thông tin gì).

assertThat và Matchers
----------------------

assertThat là một cơ chế mới của assertion, cú pháp của assertThat như sau:

```source-java
assertThat([value], [matcher statement]);
```

Matcher statement chính là cú pháp so sánh, expect kết quả.

Với matchers có thể expect kết quả rất linh hoạt, áp dụng với cả beans, text, number, collections...

-   Core
    -   `anything`
    -   `describedAs`
    -   `is`
-   Logical
    -   `allOf`
    -   `anyOf`
    -   `not`
-   Object
    -   `equalTo`
    -   `hasToString`
    -   `instanceOf`, `isCompatibleType`
    -   `notNullValue`, `nullValue`
    -   `sameInstance`
-   Beans
    -   `hasProperty`
-   Collections
    -   `array`
    -   `hasEntry`, `hasKey`, `hasValue`
    -   `hasItem`, `hasItems`
    -   `hasItemInArray`
-   Number
    -   `closeTo`
    -   `greaterThan`, `greaterThanOrEqualTo`, `lessThan`, `lessThanOrEqualTo`
-   Text
    -   `equalToIgnoringCase`
    -   `equalToIgnoringWhiteSpace`
    -   `containsString`, `endsWith`, `startsWith`
-   ...

Để sử dụng các cú pháp của matchers ta khai báo thư viện hamcrest-all:

```xml
   <dependency>
	   <groupId>org.hamcrest</groupId>
	   <artifactId>hamcrest-all</artifactId>
	   <version>1.3</version>
	   <scope>test</scope>
   </dependency>
```

(khi khai báo thư viện junit nó chỉ include thư viện hamcrest-core, không có các matcher cho bean, collection...)

[![Ví dụ JUnit với Matchers và assertThat](/img/posts/java/junit-assert-that-matchers.png)](/img/posts/java/junit-assert-that-matchers.png)

Ví dụ:

```java
   import static org.hamcrest.CoreMatchers.containsString;
   import static org.junit.Assert.assertThat;

   import org.hamcrest.Matchers;
   import org.junit.Test;

   public class DemoAssertThat {

	   @Test
	   public void demoAssertThat1()  {
		   String str = "stackjava.com";
		   int number = 10;
		   Integer [] arr = new Integer[]  {1,2,3};
		   assertThat(number, Matchers.greaterThan(9));
		   assertThat(number, Matchers.lessThanOrEqualTo(11));
		   assertThat(str, containsString("stackjava"));
		   assertThat(arr, Matchers.arrayWithSize(3));
	   }
   }
```

----------------------------------------------------

Okay, Done!

References:

<https://github.com/junit-team/junit4/wiki/Matchers-and-assertThat>

<https://code.google.com/archive/p/hamcrest/wikis/Tutorial.wiki>