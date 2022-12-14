"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletOrder = exports.updateOrderStatus = exports.addProduct = exports.createOrder = exports.getCompletedOrdersByUserId = exports.getActiveOrdersByUserId = exports.showCrruntOrder = exports.index = void 0;
var order_1 = require("../models/order");
var info = new order_1.orderInfo();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.getOrders(req.body.user_id)];
            case 1:
                orders = _a.sent();
                if (orders.length == 0) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any orders ,yet,please create order first'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'orders show successed',
                        data: { orders: orders }
                    })];
            case 2:
                error_1 = _a.sent();
                res.status(500);
                res.json(error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var showCrruntOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.showCrruntOrder(req.body.user_id)];
            case 1:
                orders = _a.sent();
                if (!orders) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any crunet order ,yet,please create order first'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'order crrunet show successed',
                        data: { orders: orders }
                    })];
            case 2:
                error_2 = _a.sent();
                res.status(500);
                res.json(error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.showCrruntOrder = showCrruntOrder;
var getActiveOrdersByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.getActiveOrdersByUserId(req.body.user_id)];
            case 1:
                orders = _a.sent();
                if (orders.length === 0) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any active order ,yet,please create order first'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'order active show successed',
                        data: { orders: orders }
                    })];
            case 2:
                error_3 = _a.sent();
                res.status(500);
                res.json(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getActiveOrdersByUserId = getActiveOrdersByUserId;
var getCompletedOrdersByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.getCompletedOrdersByUserId(req.body.user_id)];
            case 1:
                orders = _a.sent();
                if (orders.length == 0) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any completed order ,yet,please create order first'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'order completed show successed',
                        data: { orders: orders }
                    })];
            case 2:
                error_4 = _a.sent();
                res.status(500);
                res.json(error_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCompletedOrdersByUserId = getCompletedOrdersByUserId;
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, status_order, orders, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.body.user_id;
                status_order = req.body.status_order;
                return [4 /*yield*/, info.createOrder(user_id, status_order)];
            case 1:
                orders = _a.sent();
                if (!orders) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not created order'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'order created successed',
                        data: __assign({}, orders)
                    })];
            case 2:
                error_5 = _a.sent();
                res.status(500);
                res.json(error_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product_id, order_id, quantity, orders, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                product_id = req.body.product_id;
                order_id = req.body.order_id;
                quantity = req.body.quantity;
                return [4 /*yield*/, info.addProduct(product_id, order_id, quantity)];
            case 1:
                orders = _a.sent();
                if (!orders) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not added Product to order'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'product aded to order successed',
                        data: __assign({}, orders)
                    })];
            case 2:
                error_6 = _a.sent();
                res.status(500);
                res.json(error_6.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addProduct = addProduct;
var updateOrderStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.updateOrderStatus(req.body.status, req.body.id)];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any order by this id ,please try create order first'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'order updated successed',
                        data: __assign({}, order)
                    })];
            case 2:
                error_7 = _a.sent();
                res.status(500);
                res.json(error_7.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateOrderStatus = updateOrderStatus;
var deletOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, info.deleteOrder(req.body.orderId)];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'not found any order ,yet,please create order first'
                        })];
                }
                return [2 /*return*/, res.json({
                        status: 'success',
                        message: 'orders deleted successed',
                        data: { order: order }
                    })];
            case 2:
                error_8 = _a.sent();
                res.status(500);
                res.json(error_8.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletOrder = deletOrder;
