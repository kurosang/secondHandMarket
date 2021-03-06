/**
 * @description 数据模型入口文件
 */

const User = require("./User");
const Good = require("./Good");
const GoodLeave = require("./GoodLeave");
const Beg = require("./Beg");
const Cart = require("./Cart");
const GoodType = require("./GoodType");
const MyBought = require("./MyBought");
const MyBeg = require("./MyBeg");
const MyGood = require("./MyGood");
const Message = require("./Message");
const BegCart = require("./BegCart");
const MyBegged = require("./MyBegged");

Good.belongsTo(User, {
  foreignKey: "userId",
});

Beg.belongsTo(User, {
  foreignKey: "userId",
});

GoodLeave.belongsTo(Good, {
  foreignKey: "goodId",
});

GoodLeave.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Good, {
  foreignKey: "userId",
});

User.hasMany(Beg, {
  foreignKey: "userId",
});

Good.hasMany(GoodLeave, {
  foreignKey: "goodId",
});

Message.hasMany(Good, {
  foreignKey: "goodId",
});
// belongsTo 只要cart的goodId都是在Good里面找到，就是 一对多 belongsTo
Cart.belongsTo(Good, {
  foreignKey: "goodId",
  targetKey: "id",
});

MyBought.belongsTo(Good, {
  foreignKey: "goodId",
  targetKey: "id",
});

BegCart.belongsTo(Beg, {
  foreignKey: "begId",
  targetKey: "id",
});

BegCart.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

MyBegged.belongsTo(Beg, {
  foreignKey: "begId",
  targetKey: "id",
});

module.exports = {
  User,
  Good,
  GoodLeave,
  Cart,
  GoodType,
  Beg,
  MyBought,
  MyBeg,
  MyGood,
  Message,
  MyBought,
  BegCart,
  MyBegged,
};
