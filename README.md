
# aptosAssignment

## Giới thiệu

**aptosAssignment** là một dự án đơn giản triển khai bộ đếm trên blockchain Aptos bằng ngôn ngữ Move. Module `counter_addr::Counter` giúp quản lý giá trị đếm cho mỗi tài khoản bằng cách cho phép người dùng tăng giá trị này và truy vấn số đếm hiện tại.

## Tính năng

-   **Tăng giá trị đếm**: Người dùng có thể gọi hàm `increment` để tăng giá trị biến đếm.
    
-   **Truy vấn giá trị đếm**: Sử dụng hàm `getCount` để lấy số đếm hiện tại của một địa chỉ tài khoản.
    

## Yêu cầu

-   **Aptos CLI**: Đã cài đặt Aptos CLI (Hướng dẫn cài đặt).
    
-   **Move Language**: Môi trường phát triển cho Move.
    
-   **Tài khoản Aptos**: Cần có tài khoản trên Aptos để triển khai module.
    

## Cài đặt và Triển khai

1.  **Clone Repository:**
    
    ```
    git clone https://github.com/datrang175/aptosAssignment.git
    cd aptosAssignment
    ```
    
2.  **Biên dịch Module:**
    
    ```
    aptos move compile --named-addresses counter_addr=0xYourAddress
    ```
    
3.  **Triển khai Module:**
    
    ```
    aptos move publish --named-addresses counter_addr=0xYourAddress
    ```
    

## Hướng dẫn Sử dụng

-   **Tăng giá trị đếm:**
    
    ```
    aptos move run --function-id '0xYourAddress::Counter::increment' --type-args '' --args 'signer'
    ```
    
-   **Truy vấn giá trị đếm:**
    
    ```
    aptos move run --function-id '0xYourAddress::Counter::getCount' --type-args '' --args '0xYourAddress'
    ```

## Lưu ý

-   Hàm `increment` yêu cầu một `signer` để xác minh tài khoản gửi giao dịch.
    
-   Hàm `getCount` là `#[view]`, cho phép truy vấn mà không tốn phí giao dịch.
    
-   Nếu tài khoản chưa có `CountHolder`, hệ thống sẽ tự động khởi tạo với giá trị `0`.
    

## Đóng góp

Nếu bạn muốn đóng góp cho dự án:

1.  Fork repository.
    
2.  Tạo branch mới (`feature/your-feature`).
    
3.  Commit và push thay đổi.
    
4.  Gửi Pull Request để xem xét.
    

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT.
