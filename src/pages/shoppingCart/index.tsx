import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button, message } from 'antd';
import { connect } from 'umi';
import './index.less';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { addOrder } from '@/services/orderList';
import { updateMealTable, MealTableDetail } from '@/services/MealTable';


function ShoppingCart({
    dispatch,
    shoppingCart: { orderDish, tableId }
}) {
    let [totalPrice, setTotalprice] = useState(0)
    let [number, setNumber] = useState(0)

    const hanldeOrder = () => {
        let orderInfo = {
            _id: new Date().getTime(),
            tableId,
            personNum: 4,
            dishAll: orderDish,
            totalPrice,
            status: false
        }
        addOrder(orderInfo).then(res => {
            console.log(res);
            message.success("已成功下单")
            MealTableDetail(orderInfo.tableId).then(res => {
                res.status = true;
                console.log(res, 'tabledetail');
                updateMealTable(res)
            })
        })
        setTotalprice(0)
        dispatch({ type: 'shoppingCart/clearCart' })
    }

    useEffect(() => {
        let sum = 0
        orderDish.map(v => {
            sum += v.price * v.count
        })
        setTotalprice(sum)
    }, [number])

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
                    {/* <MinusCircleOutlined
                        style={{ color: '#2db7f5' }}
                        onClick={() => {
                            dispatch({ type: 'shoppingCart/reduceDish', payload: record })
                            setNumber(number++)
                        }} /> */}
                    <span>{text}</span>
                    {/* <PlusCircleOutlined
                        style={{ color: '#2db7f5' }}
                        onClick={() => {
                            dispatch({ type: 'shoppingCart/addDish', payload: record })
                            setNumber(number++)
                        }} /> */}
                </Space>
            )
        }
    ]

    return (
        <Card className='shoppingCart'>
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
        </Card>
    );
}

export default connect(({ shoppingCart }) => ({
    shoppingCart
}))(ShoppingCart)