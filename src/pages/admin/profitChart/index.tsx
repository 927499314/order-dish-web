import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { history, connect } from 'umi';
import { DualAxes } from '@ant-design/charts';
import { fetchOrderList } from '@/services/orderList';
import moment from 'moment';

function ProfitChart() {

    const [data, setDate] = useState([])

    const config = {
        data: [data, data],
        width: 500,
        height: 400,
        xField: 'date',
        yField: ['totalPrice', 'count'],
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            sate: {
                alias: '日期',
            },
            sales: {
                alias: '销售额',
            },
        },
        geometryOptions: [
            {
                geometry: 'column',
            },
            {
                geometry: 'line',
                lineStyle: {
                    lineWidth: 2,
                },
            },
        ],
    };

    let chart;

    useEffect(() => {
        fetchOrderList().then(res => {
            console.log(res);
            let dataObj = {}, countObj = {}
            let date;
            res.reverse().map(v => {
                date = moment(v.createdAt).format("l");
                if (!dataObj[date]) {
                    dataObj[date] = 0
                }
                if (!countObj[date]) {
                    countObj[date] = 1
                }
                dataObj[date] += v.totalPrice
                countObj[date] += 1
            })
            let dateArr = []
            for (let i in dataObj) {
                dateArr.push({ date: i, totalPrice: dataObj[i], count: countObj[i] })
            }
            setDate(dateArr)
        })
    }, [])

    return (
        <Card>
            <div style={{ width: 700, margin: '0 auto' }}>
                <DualAxes {...config} onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
        </Card>
    );
};

export default ProfitChart
