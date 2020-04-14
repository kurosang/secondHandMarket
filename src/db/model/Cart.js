/**
 * @description 购物车数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER
} = require("../types");

const Cart = seq.define("cart", {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  goodId: {
    type: INTEGER,
    allowNull: false,
    comment: '商品 id'
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    comment: "商品数量"
  }
});

module.exports = Cart;