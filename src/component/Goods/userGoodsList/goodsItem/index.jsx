import React, { Component } from 'react'
import styles from './style.less'
import { Card, Button, Modal, message } from 'antd';
import { rentProduct } from '@/api/product'

const confirm = Modal.confirm;

const showConfirm = (id) => {
  console.log('id1', id)
  confirm({
    title: '是否要租用此物品?',
    async onOk() {
      console.log('id', id)
      let res = await rentProduct(id)
      if (res.data.status === '0') {
        message.success('租借成功')
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

class GoodsItem extends Component {
  render() {
    const { productId, productName, productPrice, productType, imgUrl, numberOver, numberIng, numberDone, noteForC, deposit } = this.props
    const goodsType = {
      'ride': '代步工具',
      'bed': '床上用品',
      'electron': '电子产品',
      'daily': '生活用品'
    }
    return (
      <div className={styles['card-wrapper']}>
        <Card
          hoverable
          bordered
          style={{ width: 240 }}
          cover={<div style={{ height: 200, backgroundImage: `url(${imgUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} />}
        >
          <div style={{ height: 220 }}>
            <div>
              <p>商品名称:{productName}</p>
              <p>商品类型:{goodsType[productType]}</p>
            </div>
            <div className="card-price-wrapper">
              <span>{`押金:${deposit}`}</span>
              <span>{`价格:${productPrice}`}</span>
            </div>
            <div className="card-number-wrapper">
              <span className="card-number-style">{`在租:${numberIng}`}</span>
              <span className="card-number-style">{`未租:${numberDone}`}</span>
              <span className="card-number-style">{`故障:${numberOver}`}</span>
            </div>
            <div>备注:{noteForC}</div>
            <div style={{ position: 'absolute', bottom: 20 }}>
              <Button type="primary" style={{ width: 200, height: 30 }} onClick={() => showConfirm(productId)}>租借</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default GoodsItem