/**
 * @description message controller
 */

const {
  createMessage,
  getMessage,
  updateMessage,
} = require("../services/message");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { formatDateTime } = require("../utils/dt");
/**
 * @description 创建消息
 * @param {*} param0
 */
async function addMessage({
  content,
  userId,
  receivedId,
  receivedName,
  userName,
}) {
  const messageList = await createMessage({
    content,
    userId,
    receivedId,
    receivedName,
    userName,
  });
  if (messageList) {
    console.log(messageList);
    // { errno: 0, data: {....} }
    return new SuccessModel(messageList);
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel("接口发生错误");
  }
}

/**
 * 获取消息列表
 * @param {string} userId 用户id
 */
async function getMessageList({ userId }) {
  const messageList = await getMessage({
    userId,
  });
  if (messageList) {
    console.log(messageList);
    const list = messageList.map((item) => {
      item.time = formatDateTime(item.createdAt);
      return item;
    });
    // { errno: 0, data: {....} }
    return new SuccessModel(list);
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel("接口报错");
  }
}

/**
 * 获取是否有未读
 * @param {string} userId 用户id
 */
async function isHasNoRead({ userId }) {
  const messageList = await getMessage({
    userId,
    isRead: true,
  });
  if (messageList && messageList.length > 0) {
    console.log(messageList);
    return new SuccessModel(messageList);
  } else {
    return new ErrorModel("接口报错");
  }
}

/**
 * 修改
 */
async function changeToIsRead(msgId) {
  const result = await updateMessage(
    {
      newIsRead: true,
    },
    {
      msgId,
    }
  );
  if (result) {
    // 执行成功
    // 返回
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel("接口报错");
}

module.exports = {
  addMessage,
  getMessageList,
  isHasNoRead,
  changeToIsRead,
};
