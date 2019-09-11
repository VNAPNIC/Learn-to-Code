JUnit Expected Exceptions
-------------------------

Ở những bài trước chúng ta đã tìm hiểu cách test method bằng việc so sánh các giá trị trả về của test case. Vậy với những trường hợp method không trả về giá trị hoặc xảy ra exception thì chúng ta thực hiện unit test như nào?

### Sử dụng expect exception

Với những test case cho unit (method, đoạn code) ứng với trường hợp xảy ra exception thì chúng ta expect kết quả là test case đó sẽ trả về / xảy ra exception chứ không phải một giá trị cụ thể.

Ví dụ mình có method thực hiện chia 2 số nguyên:

```java
   public class MathUtils {
	   public static int divide(int input1, int input2 ) throws Exception {
		   if (input2 == 0) {
			throw new ArithmeticException("divide by zero");
		   }
		   return input1/input2;
	   }
   }
```

Với trường hợp input2 = 0 thì xảy ra exception chứ không trả về kết quả nào cả. Do đó ta expect exception như sau:

```java
   @Test(expected = ArithmeticException.class)
   public void testMathUtils1() throws Exception {
		MathUtils.divide(1, 0);
   }
```

Nếu method `MathUtils.divide(1, 0);` không xảy ra exception `ArithmeticException` thì tức là test case fail

### Sử dụng try/catch

Việc sử dụng thuộc tính `expected` trong annotation `@Test` có nhược điểm là ta không thể kiểm tra được message của exception hay trạng thái của object sau khi exception được ném ra.

Để khắc phục điều đó ta sử dụng try/catch. Ví dụ:

```java
   @Test
   public void testMathUtils2() throws Exception {
	   try {
		   MathUtils.divide(1, 0);
		   fail("Not throw exception");
	   } catch (Exception e) {
		   assertThat(e, instanceOf(ArithmeticException.class));
		   assertEquals(e.getMessage(), "divide by zero");
	   }
   }
```

Ta có thể kiểm tra được là exception gì là kiểm tra message có đúng như mong đợi không.

Lệnh `fail("Not throw exception");` nếu được chạy tới thì tức là test case bị failed. Như ở test case trên nếu method `MathUtils.divide(1, 0);` không xảy ra exception thì nó sẽ chạy tới lệnh `fail("Not throw exception");`

Với trường hợp expect không xảy ra exception thì ta có thể sử dụng `fail()` trong try/catch. Nếu không xảy ra exception thì lệnh `fail()`không được chạy qua tức là test case pass.

```java
   @Test
   public void testMathUtils3() throws Exception {
	   try {
			MathUtils.divide(1, 1);
	   } catch (Exception e)  {
			fail("throw exception");
	   }
   }
```

### Sử dụng ExpectedException Rule

Sử dụng `ExpectedException` cũng giúp xác nhận loại exception và message exception:

```java
   @Rule
   public ExpectedException thrown = ExpectedException.none();

   @Test
   public  void  shouldTestExceptionMessage()  throws Exception{
   thrown.expect(ArithmeticException.class);
   thrown.expectMessage("divide by zero");
   MathUtils.divide(1, 0);
   }
```

`ExpectedException`  cũng cho phép sử dụng `Matchers` để kiểm tra message một cách linh hoạt:

```java
   thrown.expectMessage(Matchers.containsString("by zero"));
```

Ngoài ra, ta cũng có thể dùng `Matchers` để xác nhận trạng thái, thuộc tính của kết quả, ví dụ:

```java
   import  static org.hamcrest.Matchers.hasProperty;
   import  static org.hamcrest.Matchers.is;
   import  static org.hamcrest.Matchers.startsWith;

   import javax.ws.rs.NotFoundException;
   import javax.ws.rs.core.Response;
   import javax.ws.rs.core.Response.Status;

   import org.junit.Rule;
   import org.junit.Test;
   import org.junit.rules.ExpectedException;

   public  class TestExy {
	   @Rule
	   public ExpectedException thrown = ExpectedException.none();

	   @Test
	   public void shouldThrow()  {
		   TestThing testThing = new  TestThing();
		   thrown.expect(NotFoundException.class);
		   thrown.expectMessage(startsWith("some Message"));
		   thrown.expect(hasProperty("response", hasProperty("status", is(404))));
		   testThing.chuck();
	   }

	   private class TestThing {
		   public void chuck()  {
			   Response response = Response.status(Status.NOT_FOUND).entity("Resource not found").build();
			   throw new NotFoundException("some Message", response);
		   }
	   }
   }
```

Demo:

```java
   import  static org.hamcrest.CoreMatchers.instanceOf;
   import  static org.junit.Assert.assertEquals;
   import  static org.junit.Assert.assertThat;
   import  static org.junit.Assert.fail;

   import org.junit.Rule;
   import org.junit.Test;
   import org.junit.rules.ExpectedException;

   public class TestMathUtils {
	   @Test(expected = ArithmeticException.class)
	   public void testMathUtils1() throws Exception {
			MathUtils.divide(1, 0);
	   }

	   @Test
	   public void testMathUtils2() throws Exception {
		   try {
			   MathUtils.divide(1, 0);
			   fail("Not throw exception");
		   } catch (Exception e) {
			   assertThat(e, instanceOf(ArithmeticException.class));
			   assertEquals(e.getMessage(), "divide by zero");
		   }
	   }

	   @Test
	   public void testMathUtils3() throws Exception {
		   try {
				MathUtils.divide(1, 1);
		   } catch (Exception e) {
				fail("Not throw exception");
		   }
	  }

	   @Rule
	   public ExpectedException thrown = ExpectedException.none();

	   @Test
	   public void shouldTestExceptionMessage() throws Exception{
		   thrown.expect(ArithmeticException.class);
		   thrown.expectMessage("divide by zero");
		   MathUtils.divide(1, 0);
	   }
   }
```

[![JUnit Expected Exceptions - code ví dụ test exception với JUnit](/img/posts/java/junit-10.png)](/img/posts/java/junit-10.png)

Okay, Done!

References:

<https://github.com/junit-team/junit4/wiki>