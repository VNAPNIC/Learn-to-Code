JUnit là gì?
------------

JUnit là một framework dùng để unit test cho ngôn ngữ lập trình Java. (Một unit ở đây có thể là một hàm, phép tính, một module, một class -- thường thì người ta sẽ sử dụng method để làm unit test)

JUnit là một mã nguồn mở, miễn phí (Ở bài này mình sẽ giới thiệu về JUnit 4, còn về JUnit 5 thì cơ chế, cấu trúc của nó khác hoàn toàn so với các bản trước đó)

Ví dụ JUnit với Eclipse +Maven
------------------------------

**Tạo maven project**

[![JUnit là gì? Ví dụ JUnit với Eclipse +Maven](/img/posts/java/junit-0.png)](/img/posts/java/junit-0.png)

(Maven Project sẽ tự tạo source folder để viết code `src/main/java` và folder để viết test `src/test/java`)

Để sử dụng thư viện JUnit ta khai báo

```xml
   <dependency>
	   <groupId>junit</groupId>
	   <artifactId>junit</artifactId>
	   <version>4.12</version>
	   <scope>test</scope>
   </dependency>
```

Mục tiêu của JUnit là kiểm tra kết quả của 1 unit có trả về kết quả giống như mong muốn hay không.

#### **Code nguồn**

Ví dụ: Ở đây mình có method `isPrimeNumber` để kiểm tra một số có phải là số nguyên tố hay không

(Số nguyên tố là số tự nhiên chỉ có hai ước số dương phân biệt là 1 và chính nó. (Số 1 chỉ có một ước số dương là chính nó nên nó không phải là số nguyên tố))

```java
   public class Demo {

	   public  boolean  isPrimeNumber(int input)  {
		   for  (int i = 2; i < input; i++)  {
			   if  (input % i == 0)
			   return false;
		   }
		   return true;
	   }
   }
```

Bây giờ ta sẽ sử dụng JUnit để kiểm tra hàm trên với các đầu vào khác nhau:

#### **Code Test**

Ở đây mình có 6 test case tương ứng với 6 method

```java
   public class TestDemo {

	   @Test
	   public  void  testIsPrimeNumber1()  {
		   Demo demo1 = new  Demo();
		   boolean result = demo1.isPrimeNumber(-1);
		   assertFalse(result);
	   }

	   @Test
	   public  void  testIsPrimeNumber2()  {
		   Demo demo1 = new  Demo();
		   boolean result = demo1.isPrimeNumber(0);
		   assertFalse(result);
	   }
	   @Test
	   public  void  testIsPrimeNumber3()  {
		   Demo demo1 = new  Demo();
		   boolean result = demo1.isPrimeNumber(1);
		   assertFalse(result);
	   }

	   @Test
	   public  void  testIsPrimeNumber4()  {
		   Demo demo1 = new  Demo();
		   boolean result = demo1.isPrimeNumber(2);
		   assertTrue(result);
	   }
	   @Test
	   public  void  testIsPrimeNumber5()  {
		   Demo demo1 = new  Demo();
		   boolean result = demo1.isPrimeNumber(4);
		   assertFalse(result);
	   }

	   @Test
	   public  void  testIsPrimeNumber6()  {
		   Demo demo1 = new  Demo();
		   boolean result = demo1.isPrimeNumber(5);
		   assertTrue(result);
	   }
   }
```

-   Hàm thứ nhất đầu vào là số âm '-1' nên kết quả mong đợi sẽ là false nên mình dùng `assertFalse`
-   Hàm thứ hai đầu vào là số 0, 0 không phải là số nguyên tố nên kết quả mong đợi sẽ là false
-   Hàm thứ ba đầu vào là số 1, 1 không phải là số nguyên tố nên kết quả mong đợi sẽ là false
-   Hàm thứ tư đầu vào là số '2' , 2 là số nguyên tố nên kết quả mong đợi sẽ là true nên mình dùng `assertTrue`
-   Hàm thứ năm đầu vào là số  '4', 4 không phải là số nguyên tố nên kết quả mong đợi sẽ là false
-   Hàm thứ sáu đầu vào là số '5', 5 là số nguyên tố nên kết quả mong đợi sẽ là true

Chạy các test case trên (Chuột phải vào class TestDemo.java và chọn Run As JUnit)

[![](/img/posts/java/junit-3.png)](/img/posts/java/junit-3.png)

Kết quả: (Ở đây mình chạy trên eclipse)

[![JUnit là gì? Hướng dẫn viết unit test với JUnit](/img/posts/java/junit-1.png)](/img/posts/java/junit-1.png)

Chạy hết 6 test case trên hết 0.029 giây, thanh trạng thái màu đỏ tức là có test case không pass (3 test case thất bại).

Như bạn thấy trên hình 3 test case đầu tiên bị thất bại tức là method `isPrimeNumber` đang bị sai cho những trường hợp đó (do mình quên chưa kiểm tra trường hợp bằng 0 và 1 và nhỏ hơn không)

Bây giờ sửa lại method `isPrimeNumber` để fix các lỗi đó:

```java
   public class Demo {

	   public  boolean  isPrimeNumber(int input)  {
		   if  (input < 2)  {
			return false;
		   }
		   for  (int i = 2; i < input; i++)  {
			if  (input % i == 0)
			return false;
		   }
		   return true;
	   }
   }
```

Chạy lại các test case:

[![](/img/posts/java/junit-2.png)](/img/posts/java/junit-2.png)

###### JUnit là gì? Ví dụ JUnit với Eclipse +Maven

Tất cả các test case đều pass, thanh trạng thái chuyển màu xanh.

Các bạn có thể thấy các test case của JUnit không cần phải sửa gì cả, và nó cũng không cần quan tâm các method cần kiểm tra thực hiện gì mà chỉ cần quan tâm đầu vào và đầu ra.

(Khi các bạn đi thi thì kết quả đầu ra của các bạn cũng sẽ kiểm tra bằng một bộ các test case và tự động chạy như thế)

###### JUnit là gì? Ví dụ JUnit với Eclipse +Maven

Okay, Done!\
Phần tiếp theo mình sẽ hướng dẫn các bạn thực hiện unit với JUnit cho các trường hợp phức tạp hơn, và giải thích các annotation của JUnit

References:

<https://github.com/junit-team/junit4/wiki>