import { addOrder } from "../services/shoppingCart";

export default {
    namespace: "shoppingCart",
    state: {
        tableId: '',
        orderDish: []
    },
    effects: {
        *addOrder({ payload }, { call, put }) {
            const res = yield call(addOrder, payload)
            if (res) {

            }
        }
    },
    reducers: {
        save(state, action) {
            const { data, pagination } = action.payload;
            return { ...state, ...{ data, pagination } };
        },
        addDish(state: any, { payload }) {
            let { orderDish } = state
            let flag = false
            orderDish.map(v => {
                if (v._id == payload._id) {
                    flag = true
                    v.count++
                }
            })
            if (!flag) {
                payload.count = 1
                orderDish.push(payload)
            }
            return { ...state, orderDish }
        },
        reduceDish(state, { payload }) {
            let { orderDish } = state
            orderDish.map(v => {
                if (v._id == payload._id) {
                    if (v.count > 1) {
                        v.count--
                    } else {
                        let index = orderDish.findIndex(v => v._id == payload._id)
                        orderDish.splice(index,1)
                    }
                }
            })
            return { ...state, orderDish }
        },
        selectTable(state, { payload }) {
            return { ...state, ...payload }
        },
        clearCart(state, action){
            return {...state, table:'', orderDish:[]}
        }
    }
};