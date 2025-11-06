
import { useParams } from 'react-router-dom'
export default function BookDetail() {
  const { id } = useParams()
  return <div className="page-transition"><h1>Book Detail</h1><p>ID: {id}</p></div>
}
