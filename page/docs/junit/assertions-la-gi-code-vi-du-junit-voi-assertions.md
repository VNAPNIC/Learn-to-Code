Assertions JUnit
Ở ví dụ đầu tiên (JUnit là gì? Ví dụ JUnit với Eclipse) chúng ta dùng `assertFalse`,`assertTrue` để kiểm tra kết quả cho từng trường hợp với mong muốn kết quả trả về là false, hoặc true.

Vậy với những trường hợp kết quả mong muốn không phải là boolean (true, false) mà là String, byte, Object… thì ta sẽ dùng `assertEquals`, `assertArrayEquals…`

Đó chính là `assertions` trong JUnit, `assertions` chính là những method dùng để kiểm tra kết quả của đơn vị cần test có đúng với mong đợi không.

Với mỗi loại kết quả đầu ra ta có một method `assert` tương ứng.Như so sánh đối tượng, so sánh mảng, kiểm tra null…

Code ví dụ assertions JUnit
Định dạng của các method assert sẽ là `assert[kiểu so sánh](expecteds_value, actuals_value)` hoặc `assert[kiểu so sánh](message, expecteds_value, actuals_value)` với `message` là dữ liệu in ra nếu assert thất bại

```java
import static org.hamcrest.CoreMatchers.allOf;
import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.both;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.everyItem;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.sameInstance;
import static org.hamcrest.CoreMatchers.startsWith;
import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import java.util.Arrays;
import org.hamcrest.core.CombinableMatcher;
import org.junit.Test;
public class AssertTests {
  @Test
  public void testAssertArrayEquals() {
    byte[] expected = "trial".getBytes();
    byte[] actual = "trial".getBytes();
    assertArrayEquals("failure - byte arrays not same", expected, actual);
  }
  @Test
  public void testAssertEquals() {
    assertEquals("failure - strings are not equal", "text", "text");
  }
  @Test
  public void testAssertFalse() {
    assertFalse("failure - should be false", false);
  }
  @Test
  public void testAssertNotNull() {
    assertNotNull("should not be null", new Object());
  }
  @Test
  public void testAssertNotSame() {
    assertNotSame("should not be same Object", new Object(), new Object());
  }
  @Test
  public void testAssertNull() {
    assertNull("should be null", null);
  }
  @Test
  public void testAssertSame() {
    Integer aNumber = Integer.valueOf(768);
    assertSame("should be same", aNumber, aNumber);
  }
  // JUnit Matchers assertThat
  @Test
  public void testAssertThatBothContainsString() {
    assertThat("albumen", both(containsString("a")).and(containsString("b")));
  }
  @Test
  public void testAssertThatHasItems() {
    assertThat(Arrays.asList("one", "two", "three"), hasItems("one", "three"));
  }
  @Test
  public void testAssertThatEveryItemContainsString() {
    assertThat(Arrays.asList(new String[] { "fun", "ban", "net" }), everyItem(containsString("n")));
  }
  // Core Hamcrest Matchers with assertThat
  @Test
  public void testAssertThatHamcrestCoreMatchers() {
    assertThat("good", allOf(equalTo("good"), startsWith("good")));
    assertThat("good", not(allOf(equalTo("bad"), equalTo("good"))));
    assertThat("good", anyOf(equalTo("bad"), equalTo("good")));
    assertThat(7, not(CombinableMatcher.<Integer>either(equalTo(3)).or(equalTo(4))));
    assertThat(new Object(), not(sameInstance(new Object())));
  }
  @Test
  public void testAssertTrue() {
    assertTrue("failure - should be true", true);
  }
}
```

Kết quả:

[![](/img/posts/java/junit-4.png)](/img/posts/java/junit-4.png)

Okay, Done!

Assertions là gì? Code ví dụ JUnit với Assertions stackjava.com
References:

https://github.com/junit-team/junit4/wiki