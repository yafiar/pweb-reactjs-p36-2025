import { Link } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  writer: string;
  price: number;
  stock: number;
  genre: string;
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-600">Penulis: {book.writer}</p>
      <p className="text-sm">Harga: Rp {book.price.toLocaleString()}</p>
      <p className="text-sm">Stok: {book.stock}</p>
      <p className="text-sm">Genre: {book.genre}</p>
      <Link
        to={`/books/${book.id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Lihat Detail
      </Link>
    </div>
  );
}
