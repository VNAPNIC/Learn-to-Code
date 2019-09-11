Thứ tự thực thi các class test trong một test suite
---------------------------------------------------

Thứ tự thực thi các class test trong một test suite chính là thứ tự khai báo các class đó trong annotation `@SuiteClasses`

Ví dụ mình có 2 class test sau:

```java
   TestA.java

   import static org.junit.Assert.assertTrue;

   import org.junit.FixMethodOrder;
   import org.junit.Test;
   import org.junit.runners.MethodSorters;

   public class TestA {

	   @Test
	   public void testA2()  {
		   System.out.println("testA2");
		   assertTrue(true);
	   }

	  @Test
	   public void testA()  {
		   System.out.println("testA");
		   assertTrue(true);
	   }

	   @Test
	   public void testA1()  {
		   System.out.println("testA1");
		   assertTrue(true);
	   }
	}
```

```java
	TestB.java

	import static org.junit.Assert.assertTrue;

	import org.junit.Test;

	public class TestB {
	   @Test
	   public void testB1()  {
		   System.out.println("testB1");
		   assertTrue(true);
	   }

	   @Test
	   public void testB2()  {
		   System.out.println("testB2");
		   assertTrue(true);
	   }
   }
```

Bây giờ mình khai báo class TestB.java trước class TestA.java trong test suite thi nó sẽ thực hiện chạy class TestB.java trước

```java
   @RunWith(Suite.class)
   @SuiteClasses({TestB.class, TestA.class})
   public class MyTestSuite {

   }
```

[![Thứ tự chạy các test case trong JUnit - ví dụ](/img/posts/java/junit-7.png)](/img/posts/java/junit-7.png)

Nếu mình đổi thứ tự lại thành khai báo class TestA.java trước thì nó sẽ chạy class TestA.java trước.

```java
   import org.junit.runner.RunWith;
   import org.junit.runners.Suite;
   import org.junit.runners.Suite.SuiteClasses;

   @RunWith(Suite.class)
   @SuiteClasses({TestA.class, TestB.class})
   public class MyTestSuite {

   }
```

[![Thứ tự chạy các test case trong JUnit - ví dụ](/img/posts/java/junit-8.png)](/img/posts/java/junit-8.png)

Thứ tự thực thi các method trong một class test
-----------------------------------------------

Để chỉ rõ thứ tự chạy của các method trong class test ta dùng annotation `@FixMethodOrder` ở đầu class.

Có 3 kiểu sắp xếp là:

`@FixMethodOrder(MethodSorters.DEFAULT)`: Đây là kiểu sắp xếp mặc định nếu bạn không khai báo `@FixMethodOrder`, tuy nhiên với kiểu này thì sẽ không thể xác định chính xác method nào sẽ được chạy trước

`@FixMethodOrder(MethodSorters.JVM)`: Thứ tự các method test dựa theo JVM. Tuy nhiên thứ tự này có thể bị thay đổi khi chạy.

`@FixMethodOrder(MethodSorters.NAME_ASCENDING)`: Thứ tự các method được thực thi dựa theo tên method.

(Kiểu `MethodSorters.NAME_ASCENDING` thì chắc chắn biết trước thứ tự các method sẽ chạy)

Ví dụ: Thực hiện chạy các method test theo thứ tự tên method:

```java
   @FixMethodOrder(MethodSorters.NAME_ASCENDING)
   public class TestA {

	   @Test
	   public void testA2()  {
		   System.out.println("testA2");
		   assertTrue(true);
	   }

	   @Test
	   public void testA()  {
		   System.out.println("testA");
		   assertTrue(true);
	   }

	   @Test
	   public void testA1()  {
		   System.out.println("testA1");
		   assertTrue(true);
	   }
   }
```
[![Thứ tự chạy các test case trong JUnit - ví dụ](/img/posts/java/junit-9.png)](/img/posts/java/junit-9.png)

Okay, Done!

###### Thứ tự chạy các test case trong JUnit -- ví dụ stackjava.com

References:

<https://github.com/junit-team/junit4/wiki>