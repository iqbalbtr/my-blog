---
title: Cara menginstal R-portable
created_at: 2024-09-27
update_at: 2024-09-28
description: ''
image: /post/r-portable/banner.jpeg
tags: [Programing, R, Tutorial]
category: 'Tutorial'
creator: Iqbal Bahtiar
draft: false 
---

# Daftar Konten

- [R-Portable File](#_1-unduh-file-r-portable-di-website-resminya)
- [Pemasangan R-Portable](#_2-install-file-r-portable-ke-dalam-sistem)
- [Contoh Kode Program](#_3-contoh-program-r)

<br>
<br>

**R**, adalah sebuah bahasa pemrograman dan lingkungan perangkat lunak yang dikembangkan untuk analisis statistik dan grafik. R sangat populer di kalangan peneliti, data scientist, dan analis statistik karena kemampuannya yang kuat dalam pengolahan data, pembuatan visualisasi, dan pengembangan model statistik.

<br>
<br>

## 1. Unduh file R-Portable di website resminya
- Buka chrome atau web app lainnya
- Arahkan link ke **[Link](https://cran.r-project.org/bin/windows/base/)**
- Tekan tombol `Download r for Windows` unduh untuk memulai pengunduhan file
![step-1](/post/r-portable/step-1.png)

<br>

## 2. Install file R-Portable ke dalam sistem
- Buka lokasi hasil file yang telah terunduh
- Jalankan file tersebut
- Pilih bahasa sesuai prefrensi, lalu tekan `ok`
![step-1](/post/r-portable/step-2.png)
-  lalu tekan `next`
![step-1](/post/r-portable/step-3.png)
- Pilih lokasi dimana untuk menyimpan file program, lalu tekan `next`
![step-1](/post/r-portable/step-4.png)
- Centang komponen yang dibutuhkan, lalu tekan `next`
![step-1](/post/r-portable/step-5.png)
- Jika ingin mengubah opsi startup pilih `yes` jika tidak pilin `no`, lalu tekan `next`
![step-1](/post/r-portable/step-6.png)
- Pilih start menu folder untuk shortcut prorgram, lalu tekan `next`
![step-1](/post/r-portable/step-7.png)
- Pilih additional tasks sesuai prefensi, lalu tekan `next`
![step-1](/post/r-portable/step-8.png)
- Program akan melakukan penginstalan silakan tunggu
![step-1](/post/r-portable/step-9.png)
- Jika sudah tekan `finish` dan Program R-Portable berhasil di install
![step-1](/post/r-portable/step-10.png)

<br>
<br>

## 3. Contoh program R

<br>

### 1. Program untuk menampilkan angka Genap/ Ganjil

```r
angka <- function(num) {
    if(num %% 2 == 0){
        sprintf('Angka adalah genap')
    } else {
        sprintf('Angka adalah ganjil')
    }
}
```

- Output
![grade](/post/r-portable/angka.png)

<br>

### 2. Program untuk menghitung nilai A>=86, B>=70 C>=50

```r
grade <- function(grade){
    if(grade >= 88){
        sprintf('A')
    } else if(grade >= 70){
        sprintf('B')
    } else if (grade >= 50){
        sprintf("C")
    } else {
        sprintf("D")
    }
}
```

- Output
![grade](/post/r-portable/grade.png)

<br>

### 3. Program untuk melakukan looping

```r
loop <- function(x){
    for(i in 1:x){
        print(i)
    }
}
```

- Output
![Loop](/post/r-portable/loop.png)

<br>

### 4. Program untuk menyimpan nilai

```r
x <- 'M Iqbal Bahtiar'
y <- "202351056"
z <- "Praktikum Statistik (B)"

latihan <- function(){
    sprintf("%s %s %s", x , y, z)
}
```

- Output
![variable](/post/r-portable/variable.png)
