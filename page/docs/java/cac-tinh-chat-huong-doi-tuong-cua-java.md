Các tính chất hướng đối tượng của Java ([OOP](/programming/lap-trinh-huong-doi-tuong-la-gi-uu-nhuoc-diem/) trong Java)

Lập trình hướng đối tượng có 4 tính chất: tính trừu tượng, tính đóng gói, tính kế thừa, tính đa hình. Java là một ngôn ngữ lập trình hướng đối tượng nên bản thân nó cũng mang 4 tính chất đó.

1\. Tính chất trừu tượng (abstract)
-----------------------------------

Tính trừu tượng trong lập trình hướng đối tượng là từ các mô tả, scenario, của chương trình tìm ra các đặc trưng, hành động để trừu tượng hóa thành các đối tượng các class.

Ví dụ viết 1 chương trình nhập thông tin sinh viên gồm họ tên, tuổi, ngày sinh, lớp.\
Từ yêu cầu bài toán ta rút ra được các danh từ: "sinh viên", "họ tên", "tuổi", "ngày sinh", "lớp" --> "sinh viên" là 1 đối tượng, "họ tên", "tuổi", "ngày sinh", "lớp" là các thuộc tính, đặc trưng của "sinh viên" do đó ta trừu tượng hóa thành class: SinhVien

![Các tính chất hướng đối tượng của Java (OOP trong Java)](/img/posts/java/oop1.png)

2\. Tính chất đóng gói (encapsulation)
--------------------------------------

Đóng gói ở đây là đóng gói các biến, method thành các class; đóng gói các class thành 1 package...\
Việc đóng gói giúp che giấu thông tin, đảm bảo sự toàn vẹn dữ liệu. Vậy nó che giấu thông tin, đảm bảo toàn vẹn dữ liệu như nào?

Ví dụ tính đóng gói mà ta hay dùng nhất đó là qua phạm vi truy cập (access modifier): public, private, protected, default

Ta có 1 class Person với các thuộc tính: name, age

```java
   public  class Person {
	   private  String name;
	   private  int age;

	   public  String  getName()  {
			return name;
	   }

	   public  void  setName(String name)  {
			this.name = name;
	   }

	   public  int  getAge()  {
		return age;
	   }

	   public  void  setAge(int age)  {
		   if  (age < 0)  {
			age = 0;
		   }
		   this.age = age;
	   }
   }
```

Các thuộc tính name, age đều để private tức là không thể truy cập, chỉnh sửa dữ liệu name và age từ class bên ngoài, khi muốn thiết lập, lấy thông tin name, age ta phải thông qua các hàm get, set. các class bên ngoài sẽ không biết được name và age trong class Person lưu trữ, lấy ra như nào từ đó đảm bảo toàn vẹn dữ liêu

-Giả sử người dùng thiết lập age = -1 rõ ràng là sai vì age không thể là số âm, khi qua method set nó sẽ kiểm tra lại và gán về 0.

Ngoài sử dụng access modifier còn 1 số thể hiện của đóng gói khác như: các class immutable, đóng gói các method, các thư viện, package...

3\. Tính chất kế thừa (inheritance)
-----------------------------------

Tính chất này thì đơn giản hơn, đó là sử dụng lại các thuộc tính, method sẵn có từ các class khác mà không phải xây dựng từ đầu.\
Ví dụ: Ta có class Person với các thuộc tính sau:

```java
   public  class Person {
	   private  String name;
	   private  int age;

	   public  String  getName()  {
			return name;
	   }

	   public  void  setName(String name)  {
			this.name = name;
	   }

	   public  int  getAge()  {
			return age;
	   }

	   public  void  setAge(int age)  {
		   if  (age < 0)  {
		   age = 0;
		   }
		   this.age = age;
	   }
   }
```

Bây giờ ta muốn xây dựng 1 class Student cũng có các thuộc tính giống của Person và thêm thuộc tính address thì ta chỉ việc thừa kế lại class Person và thêm thuộc tính address:

```java
   public  class Student extends Person {
	   private  String address;

	   public  String  getAddress()  {
			return address;
	   }

	   public  void  setAddress(String address)  {
			this.address = address;
	   }
   }
```

4\. Tính chất đa hình (polymorphism)
------------------------------------

Tính đa hình ở đây được hiểu là đa hình thái, ví dụ cùng 1 method nhưng tùy vào tham số truyền vào hoặc cài đặt ở lớp con mà nó thực hiện các phép toán khác nhau.

Để hiểu rõ hơn tính đa hình ta có 2 khái niệm Overriding và Overloading (ghi đè và nạp chồng)

-   Overriding (ghi đè) là viết lại, định nghĩa lại method mà nó thừa kế từ lớp cha

Ví dụ:

```java
   public  class Person {
	   public  void  show()  {
	   System.out.println("person show");
	}
   }

   public  class Student extends Person {
	   @Override
	   public  void  show()  {
		   System.out.println("student show");
		}
	}
```

class Student thừa kế class Person tức là nó cũng đồng thời thừa kế method show nhưng method show() ở Student lại khác method show() ở Person -- ta gọi đó là ghi đè (overriding)

-   Overloading (nạp chồng): là sử dụng các method có tên giống nhau nhưng tham số đầu vào khác nhau:

Ví dụ:

```java
   public  class Calc {
	   // truyền vào 3 số nguyên thì trả về kết quả là tổng 3 số nguyên
	   public  int  sum(int number1, int number2, int number3)  {
			return number1 + number2 + number3;
	   }

	   // truyền vào 2 số nguyên thì trả về kết quả là tổng 2 số nguyên
	   public  int  sum(int number1, int number2)  {
			return number1 + number2;
	   }

	   // truyền vào 2 số thực thì trả về kết quả là tổng 2 số thực
	   public  float  sum(float number1, float number2)  {
			return number1 + number2;
	   }
   }
```

###### Các tính chất hướng đối tượng của Java (OOP trong Java)

References:

<https://docs.oracle.com/javase/tutorial/java/concepts/>