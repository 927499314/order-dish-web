import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Button, Modal, Form, InputNumber } from 'antd';
import { history, connect } from 'umi';
import './index.less';
import { fetchMealTable } from '@/services/MealTable';

const formLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
}

function MealTable() {

    let [form] = Form.useForm()
    let [mealTableList, setMealTableList] = useState([])
    let [isModalVisible, setIsModalVisible] = useState(false)
    let [tableInfo, setTableInfo] = useState({ tableId: 1, tableSize: 'small' })

    const countSize = (size: any) => {
        switch (size) {
            case 'small': return '1-4人';
            case 'middle': return '4-8人';
            case 'large': return '>8人'
        }
    }

    const handleOrder = (item: any) => {
        setTableInfo({ tableId: item._id, tableSize: item.size });
        setIsModalVisible(true);
    }

    const handleOk = () => {
        form.validateFields().then(value => {
            history.push({
                pathname: '/dishList',
                query: {
                    id: tableInfo.tableId,
                    personNum: value.personNum
                }
            })
            setIsModalVisible(false)
        })
        
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    useEffect(() => {
        fetchMealTable().then(res => {
            res.sort((a, b) => (
                parseInt(a._id) - parseInt(b._id)
            ))
            console.log(res);
            setMealTableList(res)
        })
    }, [])

    return (
        <Card className='mealTableStyle'>
            <Row>
                {
                    mealTableList?.map(item => (
                        <Col span={6} key={item._id}>
                            <Card size="small" hoverable className="mealTableCard" style={{ width: 160, height: 160 }} >
                                <div style={{ fontSize: 18, margin: '10px 0 5px 0' }}>桌号：{item._id}</div>
                                <div>{countSize(item.size)}</div>
                                <div className="tableStatus">
                                    {item.status === true ? <div style={{ fontSize: 18 }}>用餐中</div> : <Button type="primary" onClick={() => handleOrder(item)}>点餐</Button>}
                                </div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <Modal title="点餐" width={400} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ textAlign: 'center',fontSize: '18px',lineHeight: '40px' }}>餐桌号：{tableInfo.tableId}</div>
                <div style={{ textAlign: 'center',fontSize: '16px',lineHeight: '30px',marginBottom: '10px' }}>{countSize(tableInfo.tableSize)}</div>
                <Form
                    {...formLayout}
                    form={form}
                    style={{ width: 350, margin: '0 auto' }}
                >
                    <Form.Item
                        label="请输入用餐人数"
                        name="personNum"
                        rules={[{ required: true, message: '请输入用餐人数!' }]}
                    >
                        <InputNumber min={1} max={50} />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
}


export default MealTable
