# YouTube UI Hide

Chrome extension (Manifest V3) để **ẩn / hiện** một số phần giao diện YouTube gây xao nhãng.

## Tính năng (MVP)

Trong popup extension, bật công tắc để ẩn:

| Toggle | Ẩn gì |
| --- | --- |
| **Shorts** | Shelf Shorts, mục Shorts trên sidebar, thẻ video Shorts |
| **Comments** | Khung bình luận dưới video |
| **Related videos** | Video đề xuất (cột bên / dưới video) |
| **Home feed** | Lưới video trên trang chủ |
| **Sidebar** | Guide / mini-guide bên trái |
| **End screens** | End screen cards & overlays trong player |
| **Live chat** | Live chat / chat replay |

Cài đặt được lưu bằng `chrome.storage.sync` và áp dụng ngay trên tab YouTube đang mở.

## Cài đặt (Load unpacked)

1. Mở Chrome → `chrome://extensions`
2. Bật **Developer mode**
3. Chọn **Load unpacked** → trỏ tới thư mục repo này
4. Mở [YouTube](https://www.youtube.com), bấm icon extension để bật/tắt từng phần

## Cấu trúc

```
manifest.json
background/service-worker.js   # khởi tạo defaults khi cài
popup/                         # UI toggle
content/
  content.js                   # gắn class lên <html> theo setting
  hide.css                     # CSS ẩn các phần UI
shared/defaults.js             # defaults + metadata toggle
icons/
```

## Ghi chú

- YouTube thường xuyên đổi DOM/CSS. Nếu một toggle không còn ăn, cập nhật selector trong `content/hide.css`.
- Extension chỉ chạy trên `www.youtube.com` và `m.youtube.com`.
