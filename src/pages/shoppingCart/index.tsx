import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Table, Space, Button } from 'antd';
import { history, connect } from 'umi';
// import { fetchDishList } from '@/services/dishList'
import './index.less';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { addOrder } from '@/services/orderList';


function ShoppingCart({
    dispatch,
    shoppingCart: { orderDish, tableId }
}) {

    let [totalPrice, setTotalprice] = useState(0)


    const hanldeOrder = () => {
        let orderInfo = {
            _id: 'ID-'+Math.floor(Math.random()*100000000),
            tableId,
            personNum: 4,
            dishAll: orderDish,
            totalPrice,
            status: false
        }
        addOrder(orderInfo).then(res => {
            console.log(res);
        })
        dispatch({type:'shoppingCart/clearCart'})
        setTotalprice(0)
    }

    useEffect(() => {
        let sum = 0
        orderDish.map(v => {
            sum += v.price * v.count
        })
        setTotalprice(sum)
    }, [])

    const columns = [
        {
            title: '菜名',
            dataIndex: 'dishName',
        },
        {
            title: '图片',
            dataIndex: 'imgUrl',
            render: (text) => <img src={text} width={50} alt="" />
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (text) => (`￥${text}`)
        },
        {
            title: '数量',
            dataIndex: 'count',
            render: (text, record) => (
                <Space>
                    <MinusCircleOutlined
                        style={{ color: '#2db7f5' }}
                        onClick={() => {
                            dispatch({ type: 'shoppingCart/reduceDish', payload: record })

                        }} />
                    <span>{text}</span>
                    <PlusCircleOutlined
                        style={{ color: '#2db7f5' }}
                        onClick={() => {
                            dispatch({ type: 'shoppingCart/addDish', payload: record })
                        }} />
                </Space>
            )
        }
    ]

    return (
        <div className='shoppingCart'>
            <div className="tableId">桌号：{tableId}</div>
            <Table
                bordered
                rowKey="_id"
                dataSource={orderDish}
                columns={columns}
                pagination={false}
            />
            <div>
                <div className="totalPrice">合计：￥{totalPrice}</div>
                <Button type="primary" className="order" onClick={hanldeOrder}>下单</Button>
            </div>
        </div>
    );
}


export default connect(({ shoppingCart }) => ({
    shoppingCart
}))(ShoppingCart)