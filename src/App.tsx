import React, { Suspense } from "react"
import "./scss/app.scss"
// import Header from "./components/Header"
import Home from "./pages/Home"
// import Cart from "./pages/Cart"
// import NotFound from "./pages/NotFound"
// import FullPizza from "./pages/FullPizza"
import { Routes, Route } from "react-router-dom"
import Mainlayout from "./layouts/Mainlayout"

const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart'*/ "./pages/Cart"))
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: 'FullPizza'*/ "./pages/FullPizza")
)
const NotFound = React.lazy(
  () => import(/* webpackChunkName: 'NotFound'*/ "./pages/NotFound")
)

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
//dsgvdsfrgt
export default App
