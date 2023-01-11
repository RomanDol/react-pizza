import axios from "axios"
import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    name: string
    price: number
  }>()
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63b372205901da0ab37fdaeb.mockapi.io/items/" + id
        )
        setPizza(data)
      } catch (error) {
        alert("Ошибка при загрузке карточки!")
        navigate("/")
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <>'Загрузка...'</>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price} грн</h4>
      <Link to='/' >
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
