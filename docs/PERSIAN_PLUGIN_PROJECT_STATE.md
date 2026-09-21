# Joplin فارسی — پرونده مرجع ادامه پروژه

این فایل «منبع حقیقت ادامه پروژه» است تا با تغییر صفحه گفتگو، گفتگوی جدید یا تغییر حساب ChatGPT، پروژه از صفر بررسی نشود.

## وضعیت مرجع
- Repository: `mobinpda-lab/joplin`
- شاخه توسعه: `mobinpda/jalali-vazirharf-android`
- PR اصلی: #1
- نسخه مبنا: Joplin v3.7.18
- هدف فعلی: **پلاگین مستقل فارسی Joplin**؛ فعلاً تغییر هسته Joplin و ساخت APK سفارشی متوقف است.
- آخرین Commit مرجع این پرونده: `9323eb89bff463abb25a06f8d355d3172f7bd211`

## نتیجه اثبات‌شده
اولین فایل واقعی `.jpl` ساخته و از GitHub Actions به‌صورت Artifact دریافت شده است.
- Workflow Run: `35647067423`
- Artifact: `joplin-persian-shamsi-jpl`
- بسته: `org.mobinpda.joplin.persianshamsi.jpl`
- محتوای بررسی‌شده شامل:
  - `manifest.json`
  - `index.js`
  - `editorPlugin.js`
  - `markdownItPlugin.js`
  - `style.css`
  - `editor.css`
  - `fonts/Vazirharf[wght].ttf`

## نکته نسخه
Artifact ساخته‌شده، نسخه Manifest برابر `0.1.0` دارد؛ در حالی که `package.json` در Commit بعدی به `0.1.1` تغییر داده شده بود. قبل از نسخه انتشار نهایی باید این دو یکسان شوند.

## هنوز اثبات نشده
- نصب واقعی `.jpl` روی Joplin
- فعال‌شدن پلاگین روی Android
- اعمال واقعی VazirHarf در Editor/CodeMirror در Android
- نمایش واقعی تاریخ جلالی روی Android
- بررسی کامل Sync پس از نصب
- انتشار نهایی

## گام بعدی قطعی
از همین Artifact واقعی استفاده شود:
1. نصب پلاگین
2. فعال‌سازی
3. بازکردن Note
4. ورود به Edit
5. بررسی VazirHarf
6. بررسی تاریخ جلالی
7. بررسی عدم تغییر داده و timestamp داخلی
8. بررسی Sync

## قوانین جلوگیری از دوباره‌کاری
- قبل از هر تغییر، این فایل + آخرین Commit + PR #1 + آخرین Workflow Run بررسی شود.
- پلاگین جدید ساخته نشود؛ همین پلاگین ادامه داده شود.
- بدون شواهد واقعی، Build/Install/Android/Sync موفق اعلام نشود.
- «حل شد» فقط بعد از آزمایش واقعی قابل استفاده است.
- تغییر هسته Joplin فقط در صورت شکست واقعی مسیر Plugin بررسی شود.
- هر نتیجه مهم در همین فایل یا یک فایل وضعیت جدید با لینک به آن ثبت شود.

## دستور برای گفتگوی بعدی
«فایل `docs/PERSIAN_PLUGIN_PROJECT_STATE.md` را بخوان؛ از آخرین Commit و آخرین Workflow Run ادامه بده و پروژه را از صفر بررسی نکن. ابتدا وضعیت گام بعدی را تعیین و سپس اجرا کن.»

## عبارت ادامه
**ادامه پروژه Joplin فارسی — از فایل مرجع وضعیت**
