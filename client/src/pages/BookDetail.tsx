import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";

interface Book {
  id: number;
  title: string;
  writer: string;
  publisher: string;
  price: number;
  stock: number;
  genre: string;
  isbn?: string;
  description?: string;
  publication_year?: number;
  condition?: string;
}

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch {
        alert("Gagal memuat detail buku");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus buku ini?")) return;
    try {
      await api.delete(`/books/${id}`);
      alert("Buku berhasil dihapus!");
      navigate("/books");
    } catch {
      alert("Gagal menghapus buku");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Buku tidak ditemukan.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">{book.title}</h1>
      <p>Penulis: {book.writer}</p>
      <p>Penerbit: {book.publisher}</p>
      <p>Harga: Rp {book.price.toLocaleString()}</p>
      <p>Stok: {book.stock}</p>
      <p>Genre: {book.genre}</p>
      {book.isbn && <p>ISBN: {book.isbn}</p>}
      {book.description && <p>Deskripsi: {book.description}</p>}
      {book.publication_year && <p>Tahun Terbit: {book.publication_year}</p>}
      {book.condition && <p>Kondisi: {book.condition}</p>}

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Hapus Buku
      </button>
    </div>
  );
}
