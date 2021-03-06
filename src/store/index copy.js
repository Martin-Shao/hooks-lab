import { createStore } from 'redux'

// console.log("From index.js")

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAME = 'BUY_ICECREAM'

// action creator
function buyCake(params) {
  action = {
    type: BUY_CAKE,
    info: 'first redux action',
  }
  return action
}

function buyIceCream() {
  action = {
    type: BUY_ICECREAME,
    info: 'second redux action'
  }
  return action
}

// (previousState, action) => newState
const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20,
}
// 定义一个reducer，这里已经把初始状态放到reducer中了
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    case BUY_ICECREAME:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
    default:
      return state
  }
}

// create a store
const store = createStore(reducer)
console.log('initial state: ', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

// 注销监听事件
unsubscribe()  