Cũng như các ngôn ngữ khác, Dart không thể thiếu việc lập trình bất đồng bộ. Code chạy trong Dart là chạy trên một luồng (thread), dòng code bạn viết nó thi hành hết câu lệnh này sang câu lệnh khác. Nên một khối lệnh nào đó khóa thread (làm tắc thread) thì toàn bộ ứng dụng bị treo. Các Asynchronous operations giúp chương trình của bạn hoàn thành công việc khác trong khi chờ đợi một operation kết thúc. Dart sử dụng [Future](https://api.dartlang.org/stable/2.2.0/dart-async/Future-class.html) và [Stream](https://api.dartlang.org/stable/2.2.0/dart-async/Stream-class.html) để thực hiện các hoạt động không đồng bộ.

## Future
- Future là một đối tượng Future đại diện cho một tính toán mà giá trị trả về có thể chưa có sẵn.
- Future trả về giá trị của tính toán khi nó hoàn thành vào một thời điểm nào đó trong tương lai.
- Future thường được sử dụng cho các tính toán có khả năng dài như I/O và tương tác với người dùng.

Để làm việc với [Future](https://api.dartlang.org/stable/2.2.0/dart-async/Future-class.html), bạn có thể sử dụng `async` và `await` hoặc Future API.

Function bất đồng bộ được khai báo có từ khóa `async` phía sau, và đối tượng trả về của function là [Future\<T>](https://api.dartlang.org/stable/2.2.0/dart-async/Future-class.html), với T là kiểu biểu thức return trả về.

Nếu một function đã khai báo là bất đồng bộ `async` thì trong function có thể sử dụng thêm từ khóa `await biểu_thức;` - chờ cho biểu thức thi hành xong mới thi hành các code tiếp theo của function.

<iframe style="width:100%;height:500px;" src="https://dartpad.dartlang.org/c73368fdb22ce66683874c106e65a8a8"></iframe>


```dart
	Future<String> showInfomation() async {
        var data = await getInfomation();
        print('This is your data -' + DateTime.now().toString());
        print(data);
        return 'showInfomation Complete!'; //Trả về chuỗi - chứa trong Future
    }
```

Trả về từ hàm `async` là một đối tượng Future. Từ đối tượng này, ta có thể gán các hàm callback, được chạy mỗi khi dữ liệu hoàn thành trả về bởi hàm `async`, để gán hàm callback sử dụng phương thức: `Future.then((data) => callBack(data));`

```dart
	main() {
        Future f = showInfomation();
	    f.then((data) => notifyFinish(data))
         .catchError((e) => print('Lỗi xảy ra - '+e.toString()));
        secondFunction();
    }
```

Nếu muốn bắt lỗi trong hàm `async` cũng dùng biểu thức `try ... catch` Hoặc từ đối tượng Future trả về thì sử dụng phương thức `catchError()`

```dart
	main() {
	  Future f = showInfomation();
	  f.then((data) =>notifyFinish(data))
	   .catchError((e) => print('Lỗi xảy ra - '+e.toString()));
	  secondFunction();
	}
```

## Generator function

Có thể hiểu Generator function là một function, có khả năng tạm ngưng thực thi trước khi hàm kết thúc, và có thể tiếp tục chạy ở 1 thời điểm khác.

Synchronous generator: Trả về 1 Iterable object. `sync*`
Asynchronous generator: Trả về 1 Stream object.	`async*`

Một số từ khóa thường sử dụng trong generator function:

- `sync*`, `async*`: đánh dấu là generator function.
- `yield`: phát ra các giá trị.
- `yield*`: phát ra các giá trị nếu generator là đệ quy.
- `await for`: được thiết kế để hoạt động tốt với stream.

```dart
	Iterable naturalsTo(n) sync* {
		int k = 0;
		while (k < n) yield k++;
	}
```

```dart
	Stream asynchronousNaturalsTo(n) async* {
	  int k = 0;
	  while (k < n) yield k++;
	}
```

```dart
	Iterable naturalsDownFrom(n) sync* {
	  if ( n > 0) {
		yield n;
		yield* naturalsDownFrom(n-1);
	  }
	}
```


## Stream

Cung cấp một chuỗi dữ liệu không đồng bộ(tương tự với observables trong Rx, LiveData trong Android JetPack).

[**StreamController**](https://api.dartlang.org/stable/2.2.0/dart-async/StreamController-class.html): có chứa 1 simple stream. sử dụng để tạo stream, kiểm soát stream(listen on, push event).

```dart
	StreamController<String> streamController = new StreamController();
	streamController.stream.listen((data) {
		print("DataReceived: " + data);
	  }, onDone: () {
		print("Task Done");
	  }, onError: (error) {
		print("Some Error");
	  });
	  
	streamController.add("This a test data");
```
	
[**StreamSubscription**](https://api.dartlang.org/stable/2.2.0/dart-async/StreamSubscription-class.html): cung cấp các sự kiện cho listener và giữ các callbacks được sử dụng để xử lý các sự kiện.<br>
Khi bạn định nghĩa 1 listener, bạn sẽ nhận được [StreamSubscription](https://api.dartlang.org/stable/2.2.0/dart-async/StreamSubscription-class.html) object. [StreamSubscription](https://api.dartlang.org/stable/2.2.0/dart-async/StreamSubscription-class.html) sẽ thông báo cho bạn biết có điều gì đặc biệt xảy ra trong Stream(Giá trị được đẩy ra khỏi Stream, có lỗi xảy ra, Stream bị huỷ...). Do đó, [StreamSubscription](https://api.dartlang.org/stable/2.2.0/dart-async/StreamSubscription-class.html) có thể được sử dụng để tạm dừng/tiếp tục event từ các stream khi được yêu cầu.<br>
Chú ý: Phải đảm bảo hủy [StreamSubscription](https://api.dartlang.org/stable/2.2.0/dart-async/StreamSubscription-class.html) khi không cần thiết.

```dart
	final StreamSubscription subscription = ctrl.stream
					      .where((value) => (value % 2 == 0))
					      .listen((value) => print('$value'));

	subscription.onData((value) => print("sub_$value"));
```

[**StreamTransformer**](https://api.dartlang.org/stable/2.2.0/dart-async/StreamTransformer-class.html): được sử dụng để xử lý dữ liệu trước khi dữ liệu được đẩy ra ngoài. Đầu ra của [StreamTransformer](https://api.dartlang.org/stable/2.2.0/dart-async/StreamTransformer-class.html) là 1 Stream.<br>
Một StreamTransformer có thể sử dụng trong 1 số quá trình như:

- Filtering: lọc dữ liệu theo 1 định nghĩa nào đó.
- Regrouping: Tập hợp các dữ liệu.
- Modification: Chỉnh sửa dữ liệu.
- Chèn dữ liệu vào 1 luồng khác.
- Buffering.
- Processing: Thực hiện 1 hành động/ hoạt động nào đó dựa vào dữ liệu.
- v.v...

Để tạo ra 1 [StreamTransformer](https://api.dartlang.org/stable/2.2.0/dart-async/StreamTransformer-class.html), sử dụng factory constructor `fromHandlers()`.
Và để bắt đầu sử dụng [StreamTransformer](https://api.dartlang.org/stable/2.2.0/dart-async/StreamTransformer-class.html) cho [Stream](https://api.dartlang.org/stable/2.2.0/dart-async/Stream-class.html) thì gọi method `transform()` và truyền vào 1 [StreamTransformer](https://api.dartlang.org/stable/2.2.0/dart-async/StreamTransformer-class.html)

```dart
	StreamTransformer<S, T>.fromHandlers({
		void handleData(S data, EventSink<T> sink ),
		void handleError(Object error, StackTrace stackTrace, EventSink<T> sink),
		void handleDone(EventSink<T> sink)
	})

	stringStream.transform(new StreamTransformer<String, String>.fromHandlers(
		handleData: (String value, EventSink<String> sink) {
		  sink.add(value);
		  sink.add(value);  // Duplicate the incoming events.
		}));

```

Có 2 loại [Stream](https://api.dartlang.org/stable/2.2.0/dart-async/Stream-class.html): [**Single-subscription Stream**](https://www.dartlang.org/tutorials/language/streams#single-subscription-streams), [**Broadcast Streams**](https://www.dartlang.org/tutorials/language/streams#broadcast-streams).

[**Single-subscription Stream**](https://www.dartlang.org/tutorials/language/streams#single-subscription-streams): là loại Stream chỉ cho phép tạo duy nhất 1 listener.
Khi thêm 1 listener trỏ vào Stream này, thì nó sẽ huỷ đi listener đầu tiên.

Cách để tạo ra 1 [Single-subscription Stream](https://www.dartlang.org/tutorials/language/streams#single-subscription-streams) là sử dụng [StreamController](https://api.dartlang.org/stable/2.2.0/dart-async/StreamController-class.html) với constructor mặc định.

Ví dụ về Single-subcription Stream:
<iframe style="width:100%;height:500px;" src="https://dartpad.dartlang.org/04d1cc89c2ce0226a19049badb51e6e3"></iframe>

[**Broadcast Streams**](https://www.dartlang.org/tutorials/language/streams#broadcast-streams): Ngược lại với loại trên, nó cho phép tạo rất nhiều listener.
Có thể thêm listener vào [Broadcast Streams](https://www.dartlang.org/tutorials/language/streams#broadcast-streams) bất cứ lúc nào.
Listener mới sẽ nhận được các event kể từ thời điểm nó bắt đầu đăng ký Stream.

Để tạo 1 [Broadcast Streams](https://www.dartlang.org/tutorials/language/streams#broadcast-streams), ta sử dụng factory constructor của [StreamController](https://api.dartlang.org/stable/2.2.0/dart-async/StreamController-class.html) là `StreamController.broadcast()`.

<iframe style="width:100%;height:500px;" src="https://dartpad.dartlang.org/69a6602331255f6cd20d5c2acaff0294"></iframe>

##Tổng kết

Bài viết đã trình bày tổng quan về xử lý đồng bộ và bất đồng bộ trong dart. Để có cái nhìn tổng quan hơn, tôi xin đưa ra một ví dụ sử dụng kết hợp những điều đã trình bày bên trên

<iframe style="width:100%;height:500px;" src="https://dartpad.dartlang.org/89f55121cbefb72de5ae5d0af222d1ea"></iframe>

Bài viết xin được dừng tại đây. Mong bạn có thể hiểu và sử dụng được các Asynchronous operations đồng bộ trong Dart. Trong quá trình tìm hiểu không tránh khỏi sai sót, hy vọng được sự góp ý của mọi người. 
