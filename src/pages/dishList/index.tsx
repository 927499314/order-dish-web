import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Space, Modal } from 'antd';
import { history, connect } from 'umi';
import { fetchDish } from '@/services/dishManage'
import './index.less';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

function DishList({ dispatch, shoppingCart: { orderDish, tableId } }) {
  const [dishList, setDishList] = useState([])
  const [isModalVisible, setIsModelVisiable] = useState(false)

  useEffect(() => {
    if (history.location.query.id) {
      dispatch({
        type: 'shoppingCart/selectTable',
        payload: {
          tableId: history.location.query.id
        }
      })
    }
    if (history.location.query.personNum) {
      dispatch({
        type: 'shoppingCart/selectPersonNum',
        payload: {
          personNum: history.location.query.personNum
        }
      })
    }
    fetchDish({}).then(res => {
      let dishArr = res.filter(v => v.status === true)
      setDishList(dishArr)
      console.log(orderDish);
    })
  }, [])

  return (
    <div className='dishListStyle'>
      <Row>
        {
          dishList.map((item, index) => (
            <Col span={6} key={index}>
              <Card size="small" className="dishCardStyle" hoverable >
                <img src={item.imgUrl} width="176" height="176" alt="" />
                <div className="dishNameStyle"><span>{item.dishName}</span><span>¥{item.price}</span></div>
                <Space>
                  <MinusCircleOutlined
                    style={{ color: '#2db7f5' }}
                    onClick={() => {
                      if (!tableId) { setIsModelVisiable(true) }
                      else { dispatch({ type: 'shoppingCart/reduceDish', payload: item }) }
                    }} />
                  <span>{orderDish.find(v => v._id === item._id) ? orderDish.find(v => v._id === item._id).count : 0}</span>
                  <PlusCircleOutlined
                    style={{ color: '#2db7f5' }}
                    onClick={() => {
                      if (!tableId) { setIsModelVisiable(true) }
                      else { dispatch({ type: 'shoppingCart/addDish', payload: item }) }
                    }} />
                </Space>
              </Card>
            </Col>
          ))
        }
        <Modal title="Basic Modal" visible={isModalVisible}
          onOk={() => history.push({
            pathname: 'mealTable'
          })}
          onCancel={() => setIsModelVisiable(false)}
        >
          请选择餐桌
        </Modal>
      </Row>
    </div>
  );
}

export default connect(({ shoppingCart }) => ({
  shoppingCart
}))(DishList)
