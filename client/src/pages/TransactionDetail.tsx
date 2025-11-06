
import { useParams } from 'react-router-dom'
export default function TransactionDetail() {
  const { id } = useParams()
  return <div className="page-transition"><h1>Transaction Detail</h1><p>ID: {id}</p></div>
}
