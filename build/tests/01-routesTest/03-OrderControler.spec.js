"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../../models/order");
var product_1 = require("../../models/product");
var user_1 = require("../../models/user");
var supertest_1 = __importDefault(require("supertest"));
var _01_UeserController_spec_1 = require("./01-UeserController.spec");
var index_1 = __importDefault(require("../../index"));
var database_1 = __importDefault(require("../../database"));
var Request = (0, supertest_1.default)(index_1.default);
var info = new order_1.orderInfo();
var infoP = new product_1.prodcutInfo();
var infoU = new user_1.userInfo();
describe('Endpoint Order', function () {
    var user = {
        firstname: 'maged3',
        password_digest: '12345',
        lastname: 'ahamed'
    };
    var product = {
        name: 'shampo3',
        price: '50',
        category: 'cleaning'
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connect, sql, createdUser, createdProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connect = _a.sent();
                    sql = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
                    return [4 /*yield*/, connect.query(sql)];
                case 2:
                    _a.sent();
                    connect.release();
                    return [4 /*yield*/, infoU.create(user)];
                case 3:
                    createdUser = _a.sent();
                    user.id = createdUser.id;
                    return [4 /*yield*/, infoP.create(product)];
                case 4:
                    createdProduct = _a.sent();
                    product.id = createdProduct.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            infoU.deleteUser(user.id);
            infoP.deleteProduct(product.id);
            info.deleteOrder(order.id);
            return [2 /*return*/];
        });
    }); });
    var order = {
        id: 1,
        user_id: 3,
        status_order: 'active',
        product_id: 3,
        order_id: 1,
        quantity: 5
    };
    describe('CRUD methods', function () {
        it('should create order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data, user_id, status_order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.post('/api/orders/create')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send(order)];
                    case 1:
                        res = _a.sent();
                        data = res.body.data;
                        user_id = data.user_id, status_order = data.status_order;
                        expect(res.status).toEqual(200);
                        expect(user_id).toEqual(3);
                        expect(status_order).toEqual('active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should add product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data, quantity, product_id, order_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.post('/api/orders/addProduct')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send(order)];
                    case 1:
                        res = _a.sent();
                        data = res.body.data;
                        quantity = data.quantity, product_id = data.product_id, order_id = data.order_id;
                        expect(res.status).toEqual(200);
                        expect(product_id).toEqual(3);
                        expect(quantity).toEqual(5);
                        expect(order_id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show all products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/orders/showall')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ user_id: '3' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('orders show successed');
                        expect(Object.keys(res.body.data).length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show Crrunt Orde order by user_id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/orders/showCrruntOrder')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ user_id: '3' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('order crrunet show successed');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show active Orde order by user_id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/orders/activeOrder')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ user_id: '3' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('order active show successed');
                        expect(Object.keys(res.body.data).length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show complete  order by user_id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/orders/completOrder')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ user_id: '3' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(404);
                        expect(res.body.status).toEqual('error');
                        expect(res.body.message).toEqual('not found any completed order ,yet,please create order first');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show update  order by user_id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.patch('/api/orders/updateStatus')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ status: 'complete', id: '1' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.status).toEqual('success');
                        expect(res.body.message).toEqual('order updated successed');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show delete  order by user_id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.delete('/api/orders/deletOrder')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ orderId: '1' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.status).toEqual('success');
                        expect(res.body.message).toEqual('orders deleted successed');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
