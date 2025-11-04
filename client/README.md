
# IT Literature Shop — Auth & Routing (React + TypeScript)

Bagian ini menyiapkan:
- Struktur routing utama (`react-router-dom`)
- Halaman Login & Register
- Simpan/hapus token di `localStorage`
- `ProtectedRoute` untuk proteksi halaman
- Navbar dinamis (email user + tombol Logout)
- Redirect otomatis setelah login/logout

## Menjalankan

```bash
npm install
npm run dev
```

Atur URL API backend Express Anda di `.env`:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Integrasi dengan Express (modul sebelumnya)

Asumsi endpoint:
- `POST /api/auth/register` -> `{ token, user: { email } }`
- `POST /api/auth/login` -> `{ token, user: { email } }`

Tambahkan middleware verifikasi JWT pada endpoint yang protected di Express (mis. `/api/books`, `/api/transactions`).

## Catatan

- Setelah login/register berhasil, user diarahkan ke `/books`.
- Jika mengakses halaman protected tanpa login, user diarahkan ke `/login` dan setelah login akan kembali ke halaman asal.
- Logout membersihkan token & user dari localStorage dan mengarahkan ke `/login`.
