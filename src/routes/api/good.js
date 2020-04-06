/**
 * @description good API 路由
 */

const router = require("koa-router")();
const {
    getGoodTypesList,
    getGoodList
} = require("../../controller/good");
const userValidate = require("../../validator/user");
const {
    genValidator
} = require("../../middlewares/validator");
const {
    isTest
} = require("../../utils/env");
const {
    loginCheck
} = require("../../middlewares/loginChecks");

router.prefix("/api/good");

// 注册路由
router.get("/types", async (ctx, next) => {
    const result = await getGoodTypesList()
    ctx.body = result
});

router.get("/list", async (ctx, next) => {
    let {
        pageIndex,
        pageSize,
        filter,
        type
    } = ctx.params
    const result = await getGoodList({
        pageIndex,
        pageSize,
        filter,
        type
    })
    ctx.body = result
});

module.exports = router;