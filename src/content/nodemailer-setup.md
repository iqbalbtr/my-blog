---
title: Kirim pesan lewat Email
created_at: 2025-02-03
update_at: 2025-02-03
description: 'Nodemailer merupakan salah satu library atau package yang dibuat untuk membantu dalam mengirim email menggunakan nodeJs. Library ini mendukung berbagai protokol pengiriman salah satunya adalah SMTP atau SImple Mail Transfer Protocol.'
image: post/nodemailer-setup/banner.png
tags: [Programing, Mail, NodeJs, Tutorial, Express]
category: 'Tutorial'
creator: Iqbal Bahtiar
draft: false 
---


## Apa itu nodemailer?

Nodemailer merupakan salah satu library atau package yang dibuat untuk membantu dalam mengirim email menggunakan nodeJs. Library ini mendukung berbagai protokol pengiriman salah satunya adalah [SMTP](https://id.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) atau SImple Mail Transfer Protocol.

## Alur Kerja

 Pada dasarnya alur yang akan kita buat cukup sederhana. Dimulai dari membuat tranporter yang harus dikonfigurasikan dengan suatu layanan dan memilih protokol, lalu membuat payload isi pesan atau file yang ingin di tambahkan pada isi pesan. terakhir transporter yang telah dikonfigurasi akan mengirim pesan tersebut ke email tujuan.

Pada impementasi kali ini akan menggunakan framework expressJs dan google gmail oauth2 sebagai media untuk menghandle pengiriman pesan email.

Ada beberapa cara dalam melakukaan konfigurasi  transporter:
1. Pertama menggunakan user dan password
	 Cara ini memang relative mudah karena tidak memperlukan setup pada akun yang akan digunakan. Namun sayang nya cara ini kurang aman karena `password` digunakan secara langsung.
2. Menggunakan Oauth2 
	Cara ini memang relative aman. Namun, memperlukan setup pada Oauth email yang akan digunakan. Namun dengan cara ini akun akan lebih aman karena password tidak secara langsung digunakan karena konfigurasi hanya memperlukan kunci akses dan token.

Dalam contoh ini akan menggunakan Oauth2 dengan akun google dengan mail api.
## Hal yang perlu dipersiapkan

- Node Js dan NPM [cara pemasangan](https://nodejs.org/en)
- Editor Text [vscode](https://code.visualstudio.com/download)
- Browser [undug](https://chromeenterprise.google/intl/id_id/download/)
- Akun google [akun](https://accounts.google.com/)

## Setup email

Sebelum membuat server pastikan sudah memiliki akun google. Jika belum membuat silakan melakukan regitrasi terlebih dahulu.

### Google console

#### Membuat project

Buat project dengan nama yang kalian inginkan lalu tekan **create**.

![1.1.png](post/nodemailer-setup/1.1.png)

![1.2.png](post/nodemailer-setup/1.2.png)
#### Membuat Oauth Consent

Pilih APi dan Service

![2.0](post/nodemailer-setup/2.0.png)

![2.1.png](post/nodemailer-setup/2.1.png)

Buat consent auth lalu isikan email yang aktif. 

![2.2.png](post/nodemailer-setup/2.2.png)

Tambahkan email yang ingin digunakan sebagai email pengirim pada nodemailer pada **test user** `Termasuk email itu sendiri`

![2.3.png](post/nodemailer-setup/2.3.png)
#### Membuat credentials Oauth 

![3.1.png](post/nodemailer-setup/3.1.png)

Nama aplikasi dapat disesuaikan.

![3.2.png](post/nodemailer-setup/3.2.png)

Pastekan authrozed url. karena kita akan menggunakan google playground maka akan diisikan url tersebut

![3.3.png](post/nodemailer-setup/3.3.png)

#### Simpan client id dan kunci

Kalian bisa menyimpannya di catatan kalian atau untuk dalam format json

![4.1.png](post/nodemailer-setup/4.1.png)

#### Membuat refresh token 

Pilih type `offline` lalu gunakan oauth credentials sendiri. Lalu pastekan credentials client yang tadi di simpan

![5.1.png](post/nodemailer-setup/5.1.png)

![5.2.png](post/nodemailer-setup/5.2.png)

Simpan `refresh token` dan `access token `di catatan kalian

![5.3.png](post/nodemailer-setup/5.3.png)

### Setup server

Buka comand promt lalu lakukan hal berikut

```cmd
// Inisialisasi project
npm init

// Melakukan instalasi dependensi
npm i express dotenv nodemailer cors
```

> [!TIP]
>Pastikan node js telah terinstall cek dengan mengetikan `npm --version` di terminal 

Berikut konfigurasi untuk pacakge

```json
// package.json
{
  "name": "nodemailer-setup",
  "version": "1.0.0",
  "main": "index.js",
  // Janganlupa menggantinnya menjadi module
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "iqbal",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "nodemailer": "^6.10.0"
  }
}
```

Copy dan Paste kode berikut dalam file `index.js`

```js
// index.js
import express from "express";
import { createTransport } from "nodemailer";
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
  
// Konfigurasi servers
const app = express();
app.use(express.json());

// Konfigurasi cors agar dapat diakses oleh client
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => res.send("Tutorial nodemailer"))
```

#### Konfigurasi environtemnt

Buat file `.env` di root directory. Lalu isikan dengan nilai yang tadi di simpan

```env
# Menggunakan google Oauth2
CLIENT_ID=Isi client id yang didapat dari google console
CLIENT_SECRET=Isi client secret yang didapat dari google console
REFRESH_TOKEN=Isi Refsrh token yang didapat dari google playground
USER=Isi dengan email yang sebagai pengirim

# Menggunakan email password
EMAIL=Email yang akan digunakan
PASSWORD=Password dari email
```
#### Konfigurasi nodemailer

Berikut konfigurasi dari nodemailer 

```js
// Konfigurasi nodemailer

// Menggunakan OAuth2 (Rekomendasi)
const transport = createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        user: process.env.USER,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Menggunakan email dan password (tidak direkomendasikan)
const transporter = nodemailer.createTransport({ 
	host: "smtp.ethereal.email", 
	port: 587, 
	secure: false, // true untuk port 465, false untuk port lain 
	auth: { 
		user: process.env.EMAIL, 
		pass: process.env.PASSWORD, 
		}, 
	});
```

#### Membuat api 

Berikut merupakan endpoint untuk menerima dan mengatur logika pengirman email

```js
app.post("/email", async (req, res) => {
    try {
        // Mengambil isi body payload
        const body = req.body;
  
        // Melakukan validasi sederhana
        if(
            !body.from ||
            !body.to ||
            !body.subject ||
            !body.text
        ) {
  
            // Mengembalikan error bad request
            return res.status(400).json({
                success: false,
                errors: "Bad Request"
            })
        }

  
        // Mengirim email
        await transport.sendMail({
            from: `"${body.from}" <${process.env.USER}>`,
            ...body
        });

  
        return res.status(200).json({
            status: true,
            message: "Sukses mengirim email ke " + body.to
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
```

#### Tambahkan entry point

```js
// Entry point aplikasi
app.listen(3000, () => {
    console.log("Server berjalan pada port 3000");
});
```

### Membuat client

Buat file bernama `index.html` di root poject

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tutorial Nodemailer</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body{
            padding-top: 44px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        li {
            width: 100%;
            margin: 12px 0;
            display: flex;
            flex-direction: column;
        }


        input, textarea {
            padding: 6px;
            outline: none;
            border-radius: 12px;
        }

        button {
            padding: 6px 3px;
            border-radius: 12px;
            cursor: pointer;
        }

    </style>
</head>

<body>
    <h2>Tutorial NodeMailer</h2>

    <form id="form-email">
        <ul>
            <li>
                <label for="title">Judul</label>
                <input type="text" id="title" name="title" required>
            </li>
            <li>
                <label for="subject">Subject</label>
                <input type="text" id="subject" name="subject" required>
            </li>
            <li>
                <label for="to">kepada</label>
                <input type="email" id="to" required name="to">
            </li>
            <li>
                <label for="text">Text / Isi</label>
                <textarea id="text" name="text"></textarea>
            </li>
            <li>
                <button id="btn" type="button">Submit</button>
            </li>
        </ul>
    </form>
</body>

<script>
    const form = document.getElementById('form-email');
    const btn = document.getElementById('btn');
  
    btn.addEventListener('click', sendEmail);
  
    async function sendEmail() {
        // Mengambil formulir data
        const formData = new FormData(form);
        const data = {
            to: formData.get('to'),
            subject: formData.get('subject'),
            text: formData.get('text'),
            title: formData.get('title')
        };

        try {
            // Mematikan tombol dan mengubah menjadi loading
            btn.disabled = true;
            btn.textContent = 'Loading..'
            // Mengirim email ke server
            const res = await fetch('http://localhost:3000/email', {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST"
            });
  
            // Mengecek apakah respone sukses dan menampilkan nya
            if (res.status == 200) {
                const contentType = res.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const json = await res.json();
                    alert(json.message);
                } else {
                    alert('An error occurred while sending the email. Please try again later.');
                }
            }
        } catch (error) {
            // Menampilkan response error jika terjadi kesalahan
            alert(error.message);
        } finally {
            // Menyalakan tombol dan mengubah indikator menjadi submit
            btn.disabled = false;
            btn.textContent = 'Submit'
        }
    }
</script>
</html>
```

Jangan lupa untuk mengirim file tadi pada enpoint `/` pada project

```js
// Ubah endpoint '/' untuk mengirim file html
app.get("/", (req, res) => res.sendFile(path.resolve(path.dirname(''), 'index.html')))
```

### Seluruh kode

```js
import express from "express";
import { createTransport } from "nodemailer";
import cors from 'cors';
import 'dotenv/config';
import path from 'path';

// Konfigurasi servers
const app = express();
app.use(express.json());

// Konfigurasi cors agar dapat diakses oleh client
app.use(cors({
    origin: "*"
}))

// Menapilkan halaman pengiriman
app.get("/", (req, res) => res.sendFile(path.resolve(path.dirname(''), 'index.html')))

// Konfigurasi nodemailer menggunakan google Oauth2 
const transport = createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        user: process.env.USER,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

app.post("/email", async (req, res) => {

    try {
        // Mengambil isi body payload
        const body = req.body;

        // Melakukan validasi sederhana
        if (
            !body.title ||
            !body.to ||
            !body.subject ||
            !body.text
        ) {

            // Mengembalikan error bad request
            return res.status(400).json({
                success: false,
                errors: "Bad Request"
            })
        }

        // Mengirim email
        const resEmail = await transport.sendMail({
            from: `"${body.title}" <${process.env.USER}>`,
            ...body
        });

        return res.status(200).json({
            status: true,
            message: resEmail.response
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Entry point aplikasi
app.listen(3000, () => {
    console.log("Server berjalan pada port 3000");
});
```

> Hidupkan server `npm run start`
> Buka [browser](http://localhost:3000)
> Jika sudah diyakin selesai pastikan untuk menganti dengan public pada consent oauth agar refesh token dapat bertahan lama 

Pastikan kode sama seperti di contoh dan konfigurasi client dari api gmail sesuai langkh, jika sudah silakan di coba untuk mengirim email ke target yang sesuai
## Kesimpulan

Dengan mengintegrasikan library ini pada sistem akan memudahkan dalam ingin mengirim mail kesesorang atau bisa membuat fitur contact me pada portofolio. Asal di konfigurasikan dengan benar sesuai aturan dan menghindari penggunaan data sensitif seperti password data akan aman terjaga.