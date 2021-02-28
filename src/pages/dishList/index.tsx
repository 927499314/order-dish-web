import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'antd';
// import { history } from 'umi';
// import { fetchDishList } from '@/services/dishList'
import { fetchDishList } from '@/services/dishManage'
import './index.less';

export default function DishList(props) {
  const [dishList, setDishList] = useState([])

  // const dishList = [
  //   { dishId: 1, dishName: '麻婆豆腐', price: 32, imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3485532490,4272537981&fm=11&gp=0.jpg' },
  //   { dishId: 2, dishName: '酸豆角', price: 32, imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3485532490,4272537981&fm=11&gp=0.jpg' },
  //   { dishId: 3, dishName: '外婆菜炒蛋', price: 32, imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3485532490,4272537981&fm=11&gp=0.jpg' },
  //   { dishId: 4, dishName: '酸菜鱼', price: 32, imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3485532490,4272537981&fm=11&gp=0.jpg' },
  // ]

  useEffect(() => {
    fetchDishList().then(res => {
      setDishList(res)
      console.log(res, 'dishList');
    })
  }, [])

  const handleAddCart = (id: number) => {
    console.log(id);
  }

  return (
    <div className='dishListStyle'>
      <Row>
        {
          dishList.map(item => (
            <Col span={6} key={item['_id']}>
              <Card size="small" className="dishCardStyle" hoverable >
                <img src={item.imgUrl} width="176" height="176" alt="" />
                <div className="dishNameStyle"><span>{item.dishName}</span><span>¥{item.price}</span></div>
                <Button type="primary" onClick={() => handleAddCart(item.dishId)}>加入购物车</Button>
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  );
}
