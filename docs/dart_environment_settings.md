---
layout: post
title:  "Bắt đầu"
date:   2019-06-27 07:23:04 +0700
categories: Dart
tags:
  - Dart
hide_thumbnail: true
image: /img/posts/dart-core/thumbnail.jpeg
---

Cách đây 4 năm mình đã từng code thử [Dart](https://www.dartlang.org/), và thực sự thấy nó chẳng có gì nổi trội, nên quyết định từ bỏ và ko học. Một thời gian bẵng đi, sau sự kiện Google I/O diễn ra vào tháng 6 năm 2018, khi Google chính thức release bản `beta#3` của [Flutter](https://flutter.io/) thì `Dart` đã quay trở lại và ăn hại gấp đôi :joy: Thời thế thay đổi, mà dù ngôn ngữ chỉ là công cụ nhưng không học thì không biết nên quyết định đầu tư thời gian học Dart với hi vọng một ngày không xa sẽ build được app cho Android/iOS trên [Flutter](https://flutter.io/). :rofl:

Trong bài viết này mình note lại những điều quan trọng từ lúc cài đặt môi trường tới lúc bắt tay vào code những dòng Dart-lang đầu tiên :ghost:.

## Chuẩn bị

Mình đang sử dụng Macbook nên sẽ chỉ mô tả cách cài đặt trên Mac, nếu bạn dùng Linux hoặc Windows thì chịu khó tìm cách cài đặt tương ứng trên OS đó nhé.

- Install IDE: [IntelliJ IDEA Community](https://www.jetbrains.com/idea/download/).
Sau khi cài đặt, các bạn mở `IntelliJ IDEA` > `Configure` > `Preferences` > `Plugins` và cài thêm `Dart` & `Flutter` vào nhé.
- Install Dart SDK: Làm theo các bước sau để sử dụng Dart phiên bản 2 (Vì còn trong giai đoạn dev, nên nếu chỉ cài đặt theo cách thông thường sẽ cài phiên bản 1 - stable)

    `Important: The Dart 2 SDK is available from the dev channel only.`
    ```terminal
    $ brew tap dart-lang/dart
    $ brew install dart
    $ brew upgrade dart --devel --force
    $ brew switch dart 2.0.0-dev.65.0
    ```
- Install Flutter SDK: (Nếu bạn không code Flutter thì có thể bỏ qua)
    - Tải phiên bản SDK mới nhất tại [SDK Archive](https://flutter.io/sdk-archive/#macos)
    - Giải nén vào thư mục `xyz` nào đó trên máy bạn. (Dùng lệnh `unzip` hoặc thao tác trực tiếp bằng tay :joy:). Ví dụ ở đây mình giải nén vào thư mục `Mobile`:
    ```terminal
    $ pwd
    /Users/euclid/Data/Mobile
    $ ls -la
    total 16
    drwxr-xr-x   4 euclid  staff   136 Jun 27 09:54 .
    drwxr-xr-x@ 13 euclid  staff   442 Jun 27 09:54 ..
    -rw-r--r--@  1 euclid  staff  6148 Jun 27 09:54 .DS_Store
    drwxr-xr-x@ 25 euclid  staff   850 Jun 19 09:31 flutter
    ```
    - Thêm `flutter` vào system path. Mình dùng [“Oh My ZSH!”](https://ohmyz.sh/) nên sẽ sử file `.zshrc`, nếu các bạn không dùng thì sửa file `.bashrc`.
    ```terminal
    $ vim ~/.zshrc
    ```
    ```sh
    export FLUTTER=/Volumes/MACOS/Users/euclid/Data/Mobile/flutter/bin
    export PATH=$FLUTTER:$PATH
    ```
    - Khởi động lại `Terminal` và kiểm tra thông tin:
    ```terminal
    $ flutter doctor
    ```
- Platform setup: (Nếu bạn không code Flutter thì có thể bỏ qua)
    - Android Setup
        1. Nếu bạn đã cài Android Studio, thì rất có thể bạn sẽ không phải làm bước này.
        1. Nếu Intellij IDEA không tự nhận Android SDK thì bạn phải tự cấu hình SDK theo các bước trong ảnh như sau:
        ![](/img/posts/start-with-dart/Show_Library_folder_on_Mac_01.png)
        ![](/img/posts/start-with-dart/Show_Library_folder_on_Mac_02.png)
        Ở 2 bước trên, chúng ta hiện thư mục `Library` trên máy lên, do SDK mặc định cài bởi Android Studio sẽ ở thư mục `/Users/<name>/Library/Android/sdk`. Tiếp đó ta sẽ cấu hình SDK như sau:
        ![](/img/posts/start-with-dart/Config_project_Android_SDK_01.png)
        ![](/img/posts/start-with-dart/Config_project_Android_SDK_02.png)
        1. Sau khi cấu hình xong SDK các bạn vào AVD Manager và tạo Virtual Device nhằm debug trên máy ảo Android nhé
        ![](/img/posts/start-with-dart/AVD_Manager.png)
        1. Nếu sau khi cài đặt mà không có **[Flutter Device Selection]** như hình bên dưới trong các Flutter Project:
        ![](/img/posts/start-with-dart/Device_Selector_List.png)
        Thì có thể phải update lại SDK & Khởi động lại máy tính :joy:
        ```terminal
        sdkmanager --update
        ```
        Xem thêm giải pháp tại [[1]](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360000002670-Download-SDK-for-IDEA-and-nothing-IDEA-android-sdk-is-up-to-date) [[2]](https://stackoverflow.com/questions/45268254/how-do-i-install-the-standalone-android-sdk-and-then-add-it-to-intellij-idea-on/45268592#45268592).
    - iOS Setup
        1. Cài đặt Xcode 9.0 hoặc bản mới hơn ([web download](https://developer.apple.com/xcode/) hoặc [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835))
        1. Cấu hình lại Xcode command-line tools:
        ```terminal
        $ sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
        ```
        Có thể đổi lại đường dẫn tới Xcode trên máy bạn cho phù hợp. Confirm lại hoạt động ta chạy câu lệnh sau:
        ```terminal
        $ sudo xcodebuild -license
        ```
        1. Cấu hình iOS simulator:
        ```terminal
        $ open -a Simulator
        ```
        ![](/img/posts/2018-06-27-getting-started-with-dart/iOS_simulator.png)
        **Hardware > Device** và **Window > Scale**.
        1. Deploy to iOS devices
            - Cài đặt [Homebrew](http://brew.sh/).
            - Chạy các câu lệnh sau:
            ```terminal
            $ brew update
            $ brew install --HEAD libimobiledevice
            $ brew install ideviceinstaller ios-deploy cocoapods
            $ pod setup
            ```
            Trong quá trình cài `libimobiledevice` nếu bạn gặp lỗi:
            ```terminal
            ./configure: line 15993: syntax error near unexpected token \`libusbmuxd,'
            ./configure: line 15993: `PKG_CHECK_MODULES(libusbmuxd, libusbmuxd >= $LIBUSBMUXD_VERSION)'
            ```
            Hãy chạy các lệnh sau:
            ```terminal
            $ sudo chmod 777 /usr/local/share/aclocal
            $ brew install pkg-config
            $ brew link pkg-config
            ```
            rồi tiếp tục cài lại xem sao nhé :expressionless: Cài đặt `pod` mất cỡ ~ 500mb nên hãy check lại dung lượng ổ SSD trước nhé. Máy mình chỉ có 128Gb thôi :cry:
- Install [Webdev](https://pub.dartlang.org/packages/webdev)
```terminal
$ pub global activate webdev
```
Thêm `pub executables` vào system path:
```terminal
    $ vim ~/.zshrc
```
```
export PUB=/Volumes/MACOS/Users/euclid/.pub-cache/bin
export PATH=$PUB:$PATH
```

## Angular Dart project

Nếu bạn muốn bắt tay tạo ứng dụng web với AngularDart thì hãy làm các bước sau.

Mở `IntelliJ IDEA` lên và bắt đầu tạo 1 project mới sử dụng `Dart` thôi > `Create New Project` :expressionless:

![](/img/posts/start-with-dart/IntelliJ_IDEA.png)
![](/img/posts/start-with-dart/IntelliJ_create_new_angular_dart_project.png)
![](/img/posts/start-with-dart/New_angular_dart_application.png)

Khởi động web server trên Terminal

```terminal
$ cd <path_to_angular_dart_project>

$ webdev serve
[INFO] Setting up file watchers completed, took 54ms
[INFO] Waiting for all file watchers to be ready completed, took 338ms
[INFO] Reading cached asset graph completed, took 1.0s
[INFO] Checking for updates since last build completed, took 847ms
[WARNING] No actions completed for 17.4s, waiting on:
  - build_modules|modules on package:test/$lib$
  - build_modules|modules on package:test/bootstrap/browser.dart
  - angular on package:angular_test/src/frontend.dart
  - angular on package:angular_test/angular_test.dart
  - build_modules|modules on package:angular_test/$lib$
  .. and 5 more

[INFO] Running build completed, took 2m 26s
[INFO] Caching finalized dependency graph completed, took 561ms
[INFO] Succeeded after 2m 27s with 2230 outputs (6459 actions)
Serving `web` on http://localhost:8080
Serving `test` on http://localhost:8081
```

Hoặc right-click vào `HTML` file và chọn **Open in Browser**
![](/img/posts/start-with-dart/Open_index.html_in_browser.png)
Nếu có lỗi
![](/img/posts/start-with-dart/Dart_dev_server_error.png)
```terminal
/usr/local/opt/dart/libexec/bin/pub global run webdev serve web:50858
webdev could not run for this project.
No pubspec.lock file found, please run "pub get" first.
Dart Dev Server terminated
```
Hãy chạy lệnh `$ pub get` (Hoặc right-click vào `pubspec.yaml` và chọn **Pub: Get Dependencies**). Sau đó **Open in Browser** lại file `index.html` và chờ `Dart Dev Server` chạy xong trên cửa sổ Log.

---

Truy cập địa chỉ [http://localhost:8080](http://localhost:8080) để xem kết quả:

![](/img/posts/start-with-dart/View_angular_dart_app.png)

DONE ! :sunglasses:

**Note:** Từ `Dart 1.x` đến `Dart 2` mọi thứ đã thay đổi:

| **Dart 1.x** | **Dart 2** |
| Dartium, content shell | Chrome and [dartdevc](https://webdev-dartlang-org-dev.firebaseapp.com/tools/dartdevc) |
| `pub build` | [`webdev build`](https://webdev-dartlang-org-dev.firebaseapp.com/tools/webdev#build) |
| `pub serve` | [`webdev serve`](https://webdev-dartlang-org-dev.firebaseapp.com/tools/webdev#serve) |
| `pub run angular_test` | `pub run build_runner test -- -p chrome`. See: [Running tests](https://webdev-dartlang-org-dev.firebaseapp.com/angular/guide/testing/component/running-tests) |
| pub transformers | [build](https://github.com/dart-lang/build) package transformers. See: [Transforming code](https://github.com/dart-lang/build/blob/master/docs/transforming_code.md) |

## Console dart project

Để bắt đầu học `Dart`, mình khuyên các bạn nên tạo `Command-line application`, vừa nhẹ nhàng lại tăng mức độ tập trung vào ngôn ngữ hơn. Chỉ cần chú ý khi tạo `Project` nhớ :white_check_mark: lại kiểu dự án là được:

![](/img/posts/start-with-dart/IntelliJ_create_new_console_dart_project.png)
![](/img/posts/start-with-dart/New_console_dart_application.png)

## Learn dart 2

Nếu bạn đã có kiến thức về lập trình thì việc học Dart 2 không hề khó. Dart và Java theo mình chắc phải giống nhau tới 99,99% mất tuy nhiên 0,01% đó cũng rất nhiều thức cần học.

Đọc bài viết [này](/dart_core/) nếu bạn muốn có cái nhìn toàn cảnh về Dart 2 nhé.

## References

- [Dart Home Page](https://www.dartlang.org/)
- [IntelliJ IDEA supports developing, running, and debugging Dart](https://www.jetbrains.com/help/idea/dart.html)
- [Dart 2 Migration Guide for Web Apps](https://webdev-dartlang-org-dev.firebaseapp.com/dart-2)
