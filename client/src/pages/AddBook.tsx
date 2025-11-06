import { useEffect, useState } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

interface Genre {
  id: number;
  name: string;
}

export default function AddBook() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [form, setForm] = useState({
    title: "",
    writer: "",
    publisher: "",
    price: "",
    stock: "",
    genre_id: "",
  });

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await api.get("/genres");
      setGenres(res.data);
    };
    fetchGenres();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/books", form);
      alert("Buku berhasil ditambahkan!");
      navigate("/books");
    } catch {
      alert("Gagal menambah buku");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Tambah Buku</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="title" placeholder="Judul" value={form.title} onChange={handleChange} required className="border p-2" />
        <input name="writer" placeholder="Penulis" value={form.writer} onChange={handleChange} required className="border p-2" />
        <input name="publisher" placeholder="Penerbit" value={form.publisher} onChange={handleChange} className="border p-2" />
        <input name="price" type="number" placeholder="Harga" value={form.price} onChange={handleChange} required className="border p-2" />
        <input name="stock" type="number" placeholder="Stok" value={form.stock} onChange={handleChange} required className="border p-2" />
        <select name="genre_id" value={form.genre_id} onChange={handleChange} required className="border p-2">
          <option value="">Pilih Genre</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}
