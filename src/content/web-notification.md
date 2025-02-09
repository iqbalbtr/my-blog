---
title: Web Push Notification
created_at: 2024-12-31
update_at: 2024-02-9
description: 'Web Push notifikasi merupakan fitur pada web yang umumnya terdapat di web modern yang beruguna untuk menerima notifikasi dari server. Web Push notifikasi berkerja menggunakan service worker yang harus di inisialiasi terlebih dahulu pada web client. Fitur ini dapat menampilkan notification pada web secara real time meskipun client tidak sedang membuka web.'
image: ''
tags: [Programing, NodeJs, HonoJs, TypeScript, ReatTime]
category: 'Tutorial'
creator: Iqbal Bahtiar
draft: false 
---
### **Apa Itu Web Push Notification dan Bagaimana Cara Kerjanya?**

Web Push notifikasi merupakan fitur pada web yang umumnya terdapat di web modern yang beruguna untuk menerima notifikasi dari server. Web Push notifikasi berkerja menggunakan service worker yang harus di inisialiasi terlebih dahulu pada web client. Fitur ini dapat menampilkan notification pada web secara real time meskipun client tidak sedang membuka web.
<br>
### Bagaimana Web Push Notification Bekerja?

Secara teknis, web push notification menggunakan kombinasi teknologi seperti **Service Worker** dan **Push API**. Berikut proses kerjanya:

1. **Langkah Awal**: Pengguna mengunjungi website dan diberikan opsi untuk mengizinkan notifikasi.
2. **Subscribing**: Jika pengguna menyetujui, browser akan mendaftarkan perangkat pengguna ke layanan push notification.
3. **Server Push**: Ketika ada pesan yang ingin dikirim, server akan mengirimkannya ke browser melalui penyedia push (push service).
4. **Notifikasi Tiba**: Browser menerima pesan dan memunculkan notifikasi di layar perangkat pengguna.
<br>
### Kelebihan Web Push Notification

1. **Real-Time**: Pesan sampai dalam hitungan detik, langsung ke layar pengguna.
2. **Tidak Memerlukan Aplikasi**: Tidak seperti notifikasi aplikasi mobile, fitur ini bisa bekerja hanya dengan browser.
3. **Efisien**: Cocok untuk menyampaikan informasi penting, seperti diskon, pengingat, atau berita terbaru.
4. **Meningkatkan Retensi**: Membantu pengguna tetap terhubung dengan website kamu.
<br>
### Hal yang perlu dipersiapkan

1. NodeJs & NPM [cara pemasangan](https://nodejs.org/en)
2. TextEditor [vscode](https://code.visualstudio.com/download)
3. Browser [chrome](https://www.google.com/intl/id_id/chrome/)
<br>
### Struktur Folder

```
│   .gitignore
│   package.json
│   README.md
│   tsconfig.json
│
├───public    # client
│       index.html
│       sw.js
│
└───src       # Server
        index.ts
```
### Implementasi 

Pada contoh kali ini, `HonoJs` dan `Vanila Html` akan digunakan untuk kemudahan dalam pemahana kode
<br>
#### 1. Server

Untuk dapat mengirim notifikasi ke client ada beberapa endpoint yang perlu kita buat agar dapat di gunakan untuk mengirm notifikasi
#### a. Konfigurasi

Sebelum beranjak ke implementasinya kita buat beberapa konfigurasinya di server
##### 1. Membuat project

```cmd
npm create hono@latest
```

> Setelah project di buat jangan lupa memilih template nodeJs

```cmd
# Menambhakan library web push
npm install web-push

# Menambahkan typesnya
npm install @types/web-push -D
```

> Setelah melakukan penginstalan lakukan generate vapidkey dan simpan valuenya kedalam variable

```cmd
npx web-push generate-vapid-keys
```

```js
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { getCookie, setCookie } from 'hono/cookie'
import { Hono } from 'hono'
import { cors } from "hono/cors"
import WebPush, { type PushSubscription } from "web-push"

const vapidKey = {
  "publicKey": "<PublicVapidKey>",
  "privateKey": "<PrivateVapidKey>"
}

const app = new Hono();

// Config webpush
WebPush.setVapidDetails(
  // Bisa di ganti dengan email kalian(optional)
  'mailto:example@gmail.com',
  vapidKey.publicKey,
  vapidKey.privateKey
)

// Ganti origin sesuai url web
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500"
    ]
  })
)

// Tambahkan public route agar
app.use('/public/*', serveStatic({ root: "./" }))

app.get('/', (c) => {
  // Alihkan ke file html
  return c.redirect('public/index.html')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

// Entry point aplikasi
serve({
  fetch: app.fetch,
  port
})
```
#### b. Subsribe

Tambah kan endpint berikut untuk menerima subscriibe dari calient, hal ini diperlukan agar server mengetahui dan dapat mengirim notifikasi sesuai target. Anda dapat menyimpan data subscribers pada database yang anda gunakan.

```js
/**
 * Lebih baik dimasukan dalam database. Hal ini dikarenakan biasanya hal ini terjadi hanya sekali saja
 * dalam siklusnya. dalam contoh ini ketika server di hentikan data akan hilang dan di client perlu
 * melakukan unreg service worker kembali
 */
let subscribers: PushSubscription[] = []

app.post("/notif/subscribe", async c => {

  const body = await c.req.json<PushSubscription>();
  
  // Handle jika user telah terdaftar
  const isAlreadyExist = subscribers.find(fo => fo.endpoint == body.endpoint)

  if (isAlreadyExist)
    return c.json({
      message: 'User telah terdaftar'
    }, 401)

  // Memasukan data
  subscribers.push(body)

  // Memasukan cookie untuk identifikasi user
  setCookie(c, 'notif-endpoint', body.endpoint)

  return c.json({
    message: "Sukses menyimpan data"
  });
})
```

##### d. Notifikasi

```js
app.post("/notif", async c => {

  const body = await c.req.json() as { title: string, body: string };

  // Kirim pesan ke seluruh subscribers
  for (const sub of subscribers) {
    try {
  
      await WebPush.sendNotification(sub, JSON.stringify(body));
      
    } catch (error: any) {

      if (error.statusCode === 410) {
        subscribers = subscribers.filter(s => s.endpoint !== sub.endpoint);
      }

    }
  }

  return c.json({
    message: "Pesan berhasil di kirim"
  })
})
```

##### e. Notifikasi(diri sendiri)

```js
// Tambahkan endpoint untuk menangani notif untuk diri sendiri
app.post("/notif/me", async c => {
  const body = await c.req.json() as { title: string, body: string };

  // Mndapatkan endpoint notif dari cookie
  const sub = getCookie(c, 'notif-endpoint');

  if (sub) {

    // Mencari subscribe bisa disesuaikan jika memakai database
    const subscribe = subscribers.find(fo => fo.endpoint == sub);

    // Jika tidak ditemukan
    if (!subscribe)
      throw new Error('User tidak terdaftar')

    // Menghandle pengiriman
    try {

      await WebPush.sendNotification(subscribe, JSON.stringify(body));

    } catch (error: any) {

      if (error.statusCode === 410) {
        subscribers = subscribers.filter(s => s.endpoint !== subscribe.endpoint);
      }

    }

    return c.json({
      message: "Pesan berhasil di kirim"
    })

  } else {
    return c.json({
      message: 'token tidak ditemukan'
    }, 404)
  }
  
})
```

##### Seluruh Kode server

```js
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { getCookie, setCookie } from 'hono/cookie'
import { Hono } from 'hono'
import { cors } from "hono/cors"
import WebPush, { type PushSubscription } from "web-push"

const vapidKey = {
  "publicKey": "BH-DqBjHr6XUASHnuus5oUZjLXU3uWXHt9YDTf48FTTDhh6wP1hefgvZP3zBRMxdLglH7M7WW7ZDCK_lbUGXQzA",
  "privateKey": "qhSn9sPP5n2Exe3buSyhNtbbP3bl-Rm2-UxO8ZUfZA8"
}


const app = new Hono()

// Config webpush
WebPush.setVapidDetails(
  'mailto:example@gmail.com',
  vapidKey.publicKey,
  vapidKey.privateKey
)

// Setup CORS configuration
app.use(
  cors({
    origin: "*"
  })
)

// Tambahkan public route agar 
app.use('/public/*', serveStatic({ root: "./" }))

app.get('/', (c) => {

  // Alihkan ke file html
  return c.redirect('public/index.html')
})

/**
 * Lebih baik dimasukan dalam database. Hal ini dikarenakan biasanya hal ini terjadi hanya sekali saja
 * dalam siklusnya. dalam contoh ini ketika server di hentikan data akan hilang dan di client perlu
 * melakukan unreg service worker kembali
 */
let subscribers: PushSubscription[] = []

app.post("/notif/subscribe", async c => {

  const body = await c.req.json<PushSubscription>();

  // Handle jika user telah terdaftar
  const isAlreadyExist = subscribers.find(fo => fo.endpoint == body.endpoint)
  if (isAlreadyExist)
    return c.json({
      message: 'User telah terdaftar'
    }, 401)

  subscribers.push(body)

  setCookie(c, 'notif-endpoint', body.endpoint)

  return c.json({
    message: "Sukses menyimpan data"
  });
})


app.post("/notif", async c => {
  const body = await c.req.json() as { title: string, body: string };

  // Kirim pesan ke seluruh subscribers
  for (const sub of subscribers) {
    try {

      await WebPush.sendNotification(sub, JSON.stringify(body));

    } catch (error: any) {

      if (error.statusCode === 410) {
        subscribers = subscribers.filter(s => s.endpoint !== sub.endpoint);
      }

    }
  }


  return c.json({
    message: "Pesan berhasil di kirim"
  })
})


// Tambahkan endpoint untuk menangani notif untuk diri sendiri
app.post("/notif/me", async c => {
  const body = await c.req.json() as { title: string, body: string };

  // Mndapatkan endpoint notif dari cookie
  const sub = getCookie(c, 'notif-endpoint');

  if (sub) {

    // Mencari subscribe bisa disesuaikan jika memakai database
    const subscribe = subscribers.find(fo => fo.endpoint == sub);

    // Jika tidak ditemukan
    if (!subscribe)
      throw new Error('User tidak terdaftar')

    // Menghandle pengiriman
    try {

      await WebPush.sendNotification(subscribe, JSON.stringify(body));

    } catch (error: any) {

      if (error.statusCode === 410) {
        subscribers = subscribers.filter(s => s.endpoint !== subscribe.endpoint);
      }

    }

    return c.json({
      message: "Pesan berhasil di kirim"
    })
  } else {
    return c.json({
      message: 'token tidak ditemukan'
    }, 404)
  }

})

// Port yang digunakan
const port = 3000

// Indikator
console.log(`Server is running on http://localhost:${port}`)


// Entry point aplikasi
serve({
  fetch: (...param) => {
    return app.fetch(...param)
  },
  port
})
```

> Setelah semua hal tersebut dilakukan silahkan jalankan servernya

```cmd
npm run dev
```

<br>

#### 2.Client

Setelah server dibuat, selanjutnya adalah penbuatan di sisi client. Client nantinya akan menerima dan mengirim request notifikasi ke server.

##### 1. Service Worker

Agar notifikasi dapat berkerja perlunya melakukan registrasi pada service worker

```js
// public/sw.js
const urlB64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const saveSubscription = async (subscription) => {
    const SERVER_URL = "http://localhost:3000/notif/subscribe";
    try {
        const response = await fetch(SERVER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
        });

        if (!response.ok) {
            throw new Error(`Failed to save subscription: ${response.status}`);
        }        
        return await response.json();

    } catch (error) {
        console.error("Error saving subscription:", error);
    }
};

  
self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            try {
                const applicationServerKey = urlB64ToUint8Array( "<Vapid Public Key>");

                const options = { applicationServerKey, userVisibleOnly: true };

                const subscription = await self.registration.pushManager.subscribe(options);
                const response = await saveSubscription(subscription);
                console.log("Subscription saved successfully:", response);
            } catch (err) {
                console.error("Subscription failed:", err);
            }
        })()
    );
});

  

const showLocalNotification = (title, options, swRegistration) => {
    swRegistration.showNotification(title, options);
};


self.addEventListener("push", (event) => {
    if (event.data) {
        console.log("Push event!! ", JSON.parse(event.data.text()));
        const notificationData = JSON.parse(event.data.text());
        showLocalNotification(notificationData.title, notificationData, self.registration);
    } else {
        console.log("Push event but no data");
    }
});
```

> Jangan lupa untuk menaruh public key dari vapid key sebelumnya

<br>

#### 2. Interface

##### a. Buat element html untuk membuat interfacenya

```html
<!DOCTYPE html>

<html lang="en">

  

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Web Push Notification Example</title>

</head>

  

<body>

    <h1>Tutorial Web Notification</h1>

    <p id="permissionStatus">Notification Permission: <span id="statusText">Unknown</span></p>

    <button id="requestPermissionBtn">Request Notification Permission</button>

    <ul>

        <li>

            <label for="title">Title</label>

            <input type="text" id="title">

        </li>

        <li>

            <label for="body">Body</label>
            <textarea id="body"></textarea>
        </li>

        <li>
            <input type="checkbox" id="target">
            <label for="target">Semua user</label>
            </div>
        </li>
        <li><button id="sendBtn" onclick="sendNotif()">Kirim</button></li>
    </ul>


</body>

</html>
```

##### b. Tambah kan script untuk memuat service workernya

```html
<script>

    async function requestNotificationPermission() {
        try {

            // Meminta izin kepada browser (Pastikan izin notif telah di aktifkan)
            const permission = await Notification.requestPermission();

            if (permission === "granted") {
                if ('serviceWorker' in navigator) {

                    // Lakukan registrai
                    const registration = await navigator.serviceWorker.register('sw.js');
                    console.log('Service Worker terdaftar dengan scope:', registration.scope);
                } else {
                
                    console.warn('Service Worker tidak didukung di browser ini.');

                }


            } else {
                console.warn('Izin notifikasi ditolak.');
            }

        } catch (error) {
            console.error('Error meminta izin notifikasi:', error);
        } finally {

  

            // Mengupdate status ijin pada tag html
            updatePermissionStatus();
        }
    }

    // registrasikan fungsi menggunakan event listener
    requestPermissionBtn.addEventListener('click', requestNotificationPermission);

</script>
```

##### c. Tambahkan script untuk logika form nya

```html
<script>

    async function sendNotif() {
        const title = titleElement.value;
        const body = bodyElement.value;
        if (!title || !body) {
            alert("Silakan isi judul dan isi pesan.");
            return;
        }

  
        try {

            // Update tag html untuk menampilkan loading
            sendBtn.disabled = true;
            sendBtn.textContent = "Memuat...";

            let isAllUsers = targetType.checked;

            const res = await fetch(`http://localhost:3000/notif${!isAllUsers ? '/me' : ''}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, body })
            });

            if (!res.ok)
                throw new Error("Gagal mengirim notifikasi.");

        } catch (error) {
  
            // Tampilkan jika terjadi error
            console.error("Error mengirim notifikasi:", error);
            alert("Gagal mengirim notifikasi.");

        } finally {
  
            // Update tag html mematikan tampilan loading
            sendBtn.disabled = false;
            sendBtn.textContent = "Kirim";

        }

    }

    // inisialisai notifikasi status untuk mengecek status
    updatePermissionStatus();

</script>
```
##### Seluruh kode client

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Push Notification Example</title>
</head>

<body>
    <h1>Tutorial Web Notification</h1>
    <p id="permissionStatus">Notification Permission: <span id="statusText">Unknown</span></p>
    <button id="requestPermissionBtn">Request Notification Permission</button>
    <ul>
        <li>
            <label for="title">Title</label>
            <input type="text" id="title">
        </li>
        <li>
            <label for="body">Body</label>
            <textarea id="body"></textarea>
        </li>
        <li>
            <input type="checkbox" id="target">
            <label for="target">Semua user</label>
            </div>
        </li>
        <li><button id="sendBtn" onclick="sendNotif()">Kirim</button></li>
    </ul>

    <script>

        // DOM Variabel
        const statusText = document.getElementById('statusText');
        const requestPermissionBtn = document.getElementById('requestPermissionBtn');
        const sendBtn = document.getElementById('sendBtn');
        const titleElement = document.getElementById('title');
        const bodyElement = document.getElementById('body');
        const targetType = document.getElementById('target');

        // Funsgi untuk mengecek dan mengupdate status permission
        async function updatePermissionStatus() {
            const permission = Notification.permission;
            statusText.textContent = permission;
        }

        async function requestNotificationPermission() {
            try {
  
                // Meminta izin kepada browser (Pastikan izin notif telah di aktifkan)
                const permission = await Notification.requestPermission();
  
                if (permission === "granted") {
                    if ('serviceWorker' in navigator) {

                        // Lakukan registrai
                        const registration = await navigator.serviceWorker.register('sw.js');
                        console.log('Service Worker terdaftar dengan scope:', registration.scope);
                    } else {

                        console.warn('Service Worker tidak didukung di browser ini.');
                        
                    }

  

                } else {

                    console.warn('Izin notifikasi ditolak.');

                }

            } catch (error) {

                console.error('Error meminta izin notifikasi:', error);

            } finally {

                // Mengupdate status ijin pada tag html
                updatePermissionStatus();

            }

        }

        // registrasikan fungsi menggunakan event listener
        requestPermissionBtn.addEventListener('click', requestNotificationPermission);

        async function sendNotif() {
            const title = titleElement.value;
            const body = bodyElement.value;
            if (!title || !body) {
                alert("Silakan isi judul dan isi pesan.");
                return;
            }

            try {

                // Update tag html untuk menampilkan loading
                sendBtn.disabled = true;
                sendBtn.textContent = "Memuat...";

                let isAllUsers = targetType.checked;

                const res = await fetch(`http://localhost:3000/notif${!isAllUsers ? '/me' : ''}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title, body })
                });

                if (!res.ok)
                    throw new Error("Gagal mengirim notifikasi.");   

            } catch (error) {

                // Tampilkan jika terjadi error
                console.error("Error mengirim notifikasi:", error);
                alert("Gagal mengirim notifikasi.");

            } finally {

                // Update tag html mematikan tampilan loading
                sendBtn.disabled = false;
                sendBtn.textContent = "Kirim";

            }
        }

        // inisialisai notifikasi status untuk mengecek status
        updatePermissionStatus();

    </script>
</body>
</html>
```

<br>
> Jika sudah, jalankan servernya lalu, jalankan live server untuk client nya

> Jika client mengalami error bisa mereset `Service Worker` bisa melalui `Web Inspect` Lalu pilih menu bagian `Application`, Cari menu `Service Worker` lalu **`Unregister`** 


> Happy Coding!

