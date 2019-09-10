Java là gì?
-----------

Java là một ngôn ngữ lập trình và nền tảng tính toán được phân phối lần đầu tiên bởi Sun Microsystems vào năm 1995. Rất nhiều ứng dụng, trang web đều được viết bằng Java. Java nhanh, bảo mật và đáng tin cậy.

Java là ngôn ngữ [lập trình hướng đối tượng](/programming/lap-trinh-huong-doi-tuong-la-gi-uu-nhuoc-diem/) (OOP).

**Về tốc độ:**

-   Trước đây, Java chạy chậm hơn những ngôn ngữ dịch thẳng ra mã máy như C và C++, nhưng sau này nhờ công nghệ "biên dịch tại chỗ" -- Just in time compilation, khoảng cách này đã được thu hẹp, và trong một số trường hợp đặc biệt Java có thể chạy nhanh hơn.
-   Java chạy nhanh hơn những ngôn ngữ thông dịch như Python, Perl, PHP gấp nhiều lần.

**Về quản lý bộ nhớ:**

-   Trong Java, hiện tượng rò rỉ bộ nhớ hầu như không xảy ra do bộ nhớ được quản lý bởi Java Virtual Machine (JVM) bằng cách tự động "dọn dẹp rác". Người lập trình không phải quan tâm đến việc cấp phát và xóa bộ nhớ như C, C++. Tuy nhiên khi sử dụng những tài nguyên mạng, file IO, database (nằm ngoài kiểm soát của JVM) mà người lập trình không đóng các kết nối thì rò rỉ dữ liệu vẫn có thể xảy ra.

**Về cú pháp:**

Cú pháp Java được vay mượn nhiều từ C & C++ nhưng có cú pháp hướng đối tượng đơn giản hơn và ít tính năng xử lý cấp thấp hơn. Do đó việc viết một chương trình bằng Java dễ hơn, đơn giản hơn, đỡ tốn công sửa lỗi hơn.

###### Ngôn ngữ Java là gì? Đặc trưng của Java

Các đặc trưng của Java
----------------------

**Hướng đối tượng**

-   Mọi thực thể trong chương trình đều là một đối tượng (1 class xác định)
-   Các biến, hàm đều nằm trong một class nào đó

**Đơn giản**

-   Loại bỏ con trỏ
-   Loại bỏ lệnh goto
-   Không cho phép đa kế thừa (chuyển sang sử dụng interface)

**Độc lập phần cứng và hệ điều hành**

Khác với phần lớn ngôn ngữ lập trình thông thường, thay vì biên dịch mã nguồn thành mã máy hoặc thông dịch mã nguồn khi chạy, Java được thiết kế để biên dịch mã nguồn thành bytecode, bytecode sau đó sẽ được môi trường thực thi (runtime environment) chạy.

Do đó một chương trình viết bằng Java có thể chạy trên nhiều thiết bị, nhiều hệ điều hành khác nhau.

[![Ngôn ngữ Java là gì? Đặc trưng của Java](/img/posts/java/java-la-gi.png)](/img/posts/java/java-la-gi.png)

**Mạnh mẽ**

-   Quá trình cấp phát, giải phóng bộ nhớ được thực hiện tự động.
-   Yêu cầu chặt chẽ khi khai báo dữ liệu, ép kiểu dữ liệu.
-   Tự động phát hiện lỗi lúc biên dịch.
-   Không sử dụng con trỏ hoặc các phép toán con trỏ.

**Bảo mật**

**Phân tán**

-   Java hỗ trợ lập trình cho các hệ thống phân tán như client-server, RMI... bằng Java web, UDP, TCP...

**Đa luồng**

-   Java hỗ trợ lập trình đa luồng (multithreading); việc đồng bộ dữ liệu trong lập trình đa luồng cũng khá đơn giản.