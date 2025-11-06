import { useEffect, useState } from "react";
import api from "@/services/api";
import BookCard from "@/components/BookCard";
import { Link } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  writer: string;
  price: number;
  stock: number;
  genre: string;
}

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");
        setBooks(res.data);
      } catch (err) {
        setError("Gagal memuat data buku");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (filteredBooks.length === 0) return <p>Tidak ada buku ditemukan.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Daftar Buku</h1>
        <Link to="/books/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Tambah Buku
        </Link>
      </div>

      <input
        type="text"
        placeholder="Cari judul..."
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
