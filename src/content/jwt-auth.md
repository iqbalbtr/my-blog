---
title: JWT Auth API
created_at: 2025-01-21
update_at: 2025-01-22
description: 'Cara membuat api login register beserta middleware menggunakan JWT token'
image: null
tags: [Programing, NodeJs, Tutorial, Express, JWT]
category: 'Tutorial'
creator: Iqbal Bahtiar
draft: false 
---

## Apa itu Auth?

Sebelum mengenal lebih dalam mengetahui tentang JWT mari perkenalan terlebih dahulu dengan Authentication dan Authorization, Dua konsep ini sering digunakan secara bersamaan dalam suatu sistem untuk mengatur sebuah sesi.

Jadi apa itu Authentication ? Authentication adalah cara atau sebuah sistem dimana untuk memverifikasi apakah orang tersebut sebelum memasuki dalam sebuah sistem, biasaynay user akan mengirim username dan password dan sistem akan memverifikasi user tersebut. Sedangkan authorization merupakan batasan hak akses pengguna. Jadi dalam authorization terdapat sebuah pembatas sebelum user mengakses suatu resource dari server. 

Sehingga dengan kombinasi hal ini tidak semua user dapat masuk dalam sebuah sistem atau bahkan membajak secara ilegal dalam sebuah sistem.

## Apa itu JWT?

Setelah mengenal tentang auth mari berkenalan dengan JWT. **Json Web Token** merupakan kepanjangan dari **JWT**. Jadi apa itu JWT ?, JWT merupakan sebuah cara untuk melakukan registrasi signature dengan output berbentuk token. Token terdri dari tiga struktur didalamnya. Mari kita bahas.

### Contoh token JWT

```
**eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9**.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VybmFtZSI6IklxYmFsIEJhaHRpYXIiLCJlbWFpbCI6ImlxYmFsYmFodGlhcjA0NUBnbWFpbC5jb20ifQ._wR5RcqFCV5ctabYs6jsJ8QA1GO1QJks6UrQX587GZg
```

### Payload 

```
// Header 
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "username" : "jhon045",
  "email" : "example@gmail.com"
}

// Siganture
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret_key 
)
```

Dalam contoh tersebut berisi beberapa struktur, prtama adalah header dalam header berisi tentang algoritma yang digunakan dan jenis yang digunakan. Kedua yaitu payload, pada payload ini biasanya digunakan untuk mendapat data pengguna seperti id, username dan email. Namun tidak termasuk dalam data sensitif seperti password. 

Kenapa data sensitif tidak dimasukan? dalam hal ini karena hasil JWT yaitu sebuah token tidak termasuk enkripsi 1 arah namun termasuk  2 arah. Jadi token JWT mudah sekali di dekripsi. Kalian dapat melakukanya bahkan di web resminya [JWT](https://jwt.io/), tinggal kalian paste token diatas dan BOOM muncul payloadnya. Berikut rincian dari payload :
- `iss` (issuer): Siapa yang membuat token.
- `sub` (subject): Subjek token (biasanya ID pengguna).
- `aud` (audience): Siapa yang diizinkan menggunakan token.
- `exp` (expiration): Waktu kadaluarsa token (timestamp UNIX).
- `iat` (issued at): Waktu token dibuat (timestamp UNIX).

Lalu, ketiga yaitu adalah Signature. Sebelumnya telah dijelaskan mengenai payload JWT yang mudah dibaca lalu mengapa JWT dapat digunakan sebagai alat authorisasi ? Hal ini disebabkan karena JWT memiliki signature atau tanda tangan, pada signature ini memiliki sebuah kunci rahasia. Jadi setiap JWT dibuat signature akan berubah berdasarkan isi payload, waktu dibuat, algoritam dan kunci rahasia. Dengan adanya kombinasi yang komplek ini token hanya dapat di verifikasi oleh kunci rahaisa yang sebelumnya di masukan pada saat pembuatan token.

Setelah berkenalan dengan JWT dan auth mari kita lanjut kedalam pembuatannya. Sebelum masuk dalam pembuatannya diharapkan mengetahui Rest Api agar mudah dalam memahaminya.

## Alur singkat authorization menggunakan JWT

## Hal yang perlu dipersiapkan

1. NodeJs & NPM [cara pemasangan](https://nodejs.org/en)
2. TextEditor [vscode](https://code.visualstudio.com/download)
3. Postman

## Setup Project

```cmd
npm init

npm i express jsonwebtoken bcrypt
```

>[!TIPS]
>Tambahan module nodemon untuk auto reload jika terdapat perubahan `npm i nodemon -D`
### Setup pacakge

```json
{
  "name": "jwt-auth",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node src/main.js",
    // Jika nodemon ditambakan
    "dev": "nodemon src/main.js",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2"
  }
}
```
### Membuat config aplikasi

```js
// Config untuk project
const config = {
    // Kunci rahasia JWT
    secret_key: "rahasia",
    port: 3000
}
```

### Setup api

```js
import express from "express";

// array untuk menyimpan user
let users = [];

/**
 * Setup express
 * Menggunkan json format dalam menghandle rest api
*/
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Jwt Auth")
})
```

### Membuat rute register

```js
// register user
app.post("/register", (req, res) => {

    const body = req.body;
    
    /**
     * Mevalidasi jika hanya user yang belum terdaftar yang boleh login
     */
    const user = users.find(user => user.username == body.username);

    if (user) {
        return res.status(401).json({
            errors: "User alreadty exist"
        })
    }

    /**
     * Melakukan hassing pada password
     * hal ini dilakukan agar admin atau orang lain tidak dapat mengetahui password dari user tersebut
     * kenapa tidak memakai sandi kunci seperti halnya JWT? bcrypt tidak membuat data terengkripsi 2 arah oleh karena itu
     * bcrypt hanya dapat di verifikasi oleh nilai sebenarnya atau 1 arah.
     */
    const hash = bcrypt.hashSync(body.password, 10);

    // Memasukan data
    users.push({
        username: body.username,
        password: hash
    });

    // Mengembailkan hasil sukses
    return res.status(200).json({
        message: "Register sukses"
    })
})
```

>[!TIPS]
>Jangan Lupa melakukan import bcrypt

```js
import jwt from "bcrypt"
```

### Membuat rute login

```js
// Route Login
app.post("/login", (req, res) => {

    const body = req.body;

    // Validasi singkat
    if (!body.username || !body.password)
        return res.status(200).json({
            errors: "Body username atau password tidak boleh kosong"
        })

    const user = users.find(user => user.username == body.username);
  
    /**
     * Seperti di registrasi verifikasi pada bcrypt hanya dapat diverifikasi oleh nilai asli itu sendiri
     */

    if (user && bcrypt.compareSync(body.password, user.password)) {

        const token = jwt.sign(
            // Memasukan data pada jwt
            { username: user.username },
            config.secret_key,
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            token
        })
    } else {
        return res.status(401).json({
            errors: "Username atau password salah"
        })
    }
})
```

>[!TIPS]
>Jangan Lupa melakukan import jwt

```js
import jwt from "jswonwebtoken"
```

### Middleware untuk menangani autthorisasi

```js
app.use("/api/*", (req, res, next) => {

    // Mengambil header authorization
    const headerToken = req.headers["authorization"];
  
    // Mengecek jika header authorization harus ada
    if (!headerToken)
        return res.status(403).json({
            errors: "Unathorized"
        });

    /**
     * Mengambil tokennya
     * Dalam contoh kali ini menggunakan header token type Bearer, Oleh karena itu
     * harus dipisah terlebih dahulu agar token dapat diambil
     * Contoh output header tipe ini adalah 'Bearer <Token>'
    */
    const token = headerToken.split(" ")[1]

    // Memverifikasi token
    const verify = jwt.verify(token, config.secret_key);
    if (!verify)
        return res.status(401).json({
            errors: "Unathorized"
        });

  
    // Memastian user apakah ada
    if (users.find(user => verify.username == user.username))
        return res.status(401).json({
            errors: "Unathorized"
        });


    /**
     * Menyimpan data user kedalam request, kenapa hal ini dilakukan?
     * Karena untuk melakukan mutasi data atau autirisasi misal mengimplementasikan role
     * Oleh karena itu perlunya memasukan data user dalam request agar dapat digunakan di setiap
     * lapisan request hingga kembali sebagai response
     */
    req.user = verify;

    next();
})
```

### Menambah rute yang menggunakan authorisasi

```js
// Api dengan authorization
app.get("/api/greeting", (req, res) => {

    // Mengambil pesan
    const pesan = req.query["pesan"];

    return res.status(200).json({
        user: req.user,
        pesan: pesan ? pesan : "Tidak ada pesan"
    });
})
```

### Menambahkan Enrypoint

```js
// Entry point dari aplikasi
app.listen(config.port, () => {
    console.log("Server is running");
})
```

### Menjalankan Aplikasi

```
npm run start

// atau nodemon untuk auto reload
npm run dev
```

## Melakukan testing

Dalam melakukan ada berbabagi cara yang dapat digunakan salah satu nya menggunakan perantara aplikasi [postman](https://www.postman.com/).

**Postman** adalah aplikasi yang digunakan untuk mengembangkan, menguji, dan mengelola API (Application Programming Interface) secara efisien. Aplikasi ini memungkinkan pengguna untuk mengirim permintaan HTTP (GET, POST, PUT, DELETE, dll.), melihat respons server, dan menguji API tanpa perlu menulis kode secara manual. Dengan fitur seperti manajemen koleksi, pengujian otomatis menggunakan skrip, mock server untuk simulasi, dan integrasi dengan alat pengembangan lain, Postman memudahkan pengembang dalam debugging dan pengelolaan API. Selain itu, Postman mendukung kolaborasi tim dengan memungkinkan berbagi koleksi dan hasil uji. Tersedia dalam versi gratis dan berbayar, Postman menjadi alat andalan bagi pengembang dalam siklus pengembangan API.
Source: chat GPT

### Register

Sebelum melakukan login dalam sistem, harus mendaftarkan akun terlebih dahulu oleh karena itu harus mengirim data diri dalam format json. Namun dalam menyimpan password perlu dilakukan hashing agar admin atau bahkan hacker tidak langsung mengetahui sandi yang digunakan.

![register](/post/jwt-auth/register.png)
### login

Setelah melakukan registrasi, selanjutnya melakukan login pada login server akan menerima username yang digunakan untuk mencari user dan password untuk memverifikasinnya. Jika semua itu berhasil jwt akan di generate lalu di lempar sebagai response

![login](/post/jwt-auth/login.png)

### greeting

Sebelum mengirim request perlu memasukan data token, dalam contoh ini menggunakan type bearer. Pilih dan paste kedalam field token yang dihasilkan saat dilogin

![greeting](/post/jwt-auth/greeting.png)

Pada tutorial kali ini telah membuat api sederhana dari implementasi JWT ditambah implementasi login dan registernya. Dengan menggunakan token aplikasi yang kita buat dapat digunakan secara muti platform, tidak hanya dilingkungan browser saja. Meskipun dalam integrasinya perlu konfigurasi tambahan namun dengan ini server dapat tersentralisasi dalam satu sistem dan client bisa dipisah entah desktop, web atau android

