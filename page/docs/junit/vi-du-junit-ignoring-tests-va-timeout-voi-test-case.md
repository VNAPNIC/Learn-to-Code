Ignoring tests
--------------

Vì một lý do nào đó, bạn muốn tạm thời vô hiệu hóa test case (bỏ qua không chạy test case đó).

Thông thường ta sẽ xóa hoặc comment annotation `@Test` như thế trình test runner sẽ bỏ qua method đó nhưng đồng thời test case đó cũng sẽ không được report (bạn có thể quên mất là có test case đó).

Biện pháp thay thể là sử dụng annotation `@Ignore` ở trước hoặc sau annotation `@Test`, sau khi chạy JUnit test, nó vẫn thông báo là có test case đó nhưng đang bị disable.

Ví dụ:

```java
   import static org.junit.Assert.*;

   import org.junit.Ignore;
   import org.junit.Test;

   public class DemoIgnoreTest {
	   @Ignore("Test is ignored as a demonstration")
	   @Test
	   public void testEquals()  {
		   String str = "stackjava.com";
		   assertEquals(str, "stackjava.com");
	   }

	   @Test
	   public void testTrue()  {
			assertTrue(true);
	   }

	   @Test
	   public void testFalse()  {
			assertFalse(false);
	   }
   }
```

[![Ví dụ JUnit Ignoring tests và Timeout với test case](/img/posts/java/junit-ignore-test.png)](/img/posts/java/junit-ignore-test.png)

Test case với timeout
---------------------

Bạn có thể expect thời gian timeout của một test case bằng cách sử dụng tham số timeout trong annoation `@Test`

Ví dụ:

```java
   @Test(timeout = 3000)
   public void testTimeout()  {
	   Demo demo = new Demo();
	   demo.process();
   }
```

Ở trên mình expect là thời gian thực hiện test case <= 3 giây (thời gian đó cũng gần tương đương với thời gian thực hiện method process() nên chúng ta cũng có thể dùng để expect thời gian chạy của đơn vị cần test)

Có một cách khác là sử dụng timeout rule (áp dụng cho tất cả các method test trong class)

Ví dụ:

```java
   import org.junit.Rule;
   import org.junit.Test;
   import org.junit.rules.Timeout;

   public class HasGlobalTimeout {
	   public static  String log;
	   private final CountDownLatch latch = new CountDownLatch(1);

	   @Rule
	   public Timeout globalTimeout = Timeout.seconds(10); // 10 seconds max per method tested

	   @Test
	   public  void  testSleepForTooLong() throws Exception {
		   log += "ran1";
		   TimeUnit.SECONDS.sleep(100); //sleep for 100 seconds
	   }

	   @Test
	   public void testBlockForever() throws Exception {
		   log += "ran2";
		   latch.await(); // will block
	   }
   }
```

`@Rule public Timeout globalTimeout = Timeout.seconds(10);` tức là expected thời gian timeout

Okay, Done!

References:

<https://github.com/junit-team/junit4/wiki/Ignoring-tests>

<https://github.com/junit-team/junit4/wiki/Timeout-for-tests>