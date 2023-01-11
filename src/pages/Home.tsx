import React from "react"
import qs from "qs"
import Categories from "../components/Categories"
import Sort, { sortList } from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock/index"
import Skeleton from "../components/PizzaBlock/skeleton"
import Pagination from "../components/Pagination"
import { useSelector } from "react-redux"
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice"
import { useNavigate } from "react-router-dom"
import { fetchPizzas } from "../redux/slices/pizza/asyncActions"
import { useAppDispatch } from "../redux/store"
import { selectFilter } from "../redux/slices/filter/selectors"
import { selectPizzaData } from "../redux/slices/pizza/selectors"
import { SearchPizzaParams } from "../redux/slices/pizza/types"

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)


  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc"
    const sortBy = sort.sortProperty.replace("-", "")
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    )

    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  React.useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      )
      isSearch.current = true
    }
  }, [])

  const pizzas = items.map((obj: any, index: number) => (
    <PizzaBlock key={obj.id} {...obj} />
  ))
  const skeletons = [...new Array(9)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          {" "}
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалениюб не удалось загрузить пиццы. Попробуйте повторить
            попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
