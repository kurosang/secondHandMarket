/**
 * @description user service
 */

const {
    User
} = require('../db/model/index')
const {
    formatUser
} = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, {
            password
        })
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'realName', 'avatar', 'gender', 'phone', 'studentNo', 'clazz', 'dormitory', 'addr'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} realName 昵称
 */
async function createUser({
    userName,
    password,
    gender = 3,
    realName
}) {
    const result = await User.create({
        userName,
        password,
        realName: realName ? realName : userName,
        gender
    })
    const data = result.dataValues

    return data
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result 删除的行数
    return result > 0
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
async function updateUser({
    newPassword,
    newRealName,
    newAvatar,
    newPhone,
    newGender,
    newStudentNo,
    newClazz,
    newDormitory,
    newAddr
}, {
    userName,
    password
}) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newRealName) {
        updateData.realName = newRealName
    }
    if (newAvatar) {
        updateData.avatar = newAvatar
    }
    if (newPhone) {
        updateData.phone = newPhone
    }
    if (newGender) {
        updateData.gender = newGender
    }
    if (newStudentNo) {
        updateData.studentNo = newStudentNo
    }
    if (newDormitory) {
        updateData.dormitory = newDormitory
    }
    if (newClazz) {
        updateData.clazz = newClazz
    }
    if (newAddr) {
        updateData.addr = newAddr
    }

    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }
    console.log(updateData, whereData)
    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    console.log(result)
    return result[0] > 0 // 修改的行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}