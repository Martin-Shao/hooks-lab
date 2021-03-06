import React, { useContext } from 'react'
import Step from './Step'
import Goods from './Goods'
import { ShopContext } from '../ShopProvider'

function Shop() {
  const { tax, subTotal, total } = useContext(ShopContext)
  console.info(tax, subTotal, total)
  return (
    <div>
      <p>tax: {tax}</p>
      <p>subTotal: {subTotal}</p>
      <p>total: {total}</p>
      <Goods />
      <Step />
    </div>
  )
}

export default Shop
