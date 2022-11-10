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
var database_1 = __importDefault(require("../../database"));
var info = new order_1.orderInfo();
var infoP = new product_1.prodcutInfo();
var infoU = new user_1.userInfo();
describe('order model', function () {
    describe('serves are exisit', function () {
        it('create method that return order was created is defiend', function () {
            expect(info.createOrder).toBeDefined();
        });
        it('create method that return product added is defiend', function () {
            expect(info.addProduct).toBeDefined();
        });
        it(' getOrders method that return all orders by id of users is defiend', function () {
            expect(info.getOrders).toBeDefined();
        });
        it('should show method that return specifc order by id of user is defiend', function () {
            expect(info.showCrruntOrder).toBeDefined();
        });
        it('deleteProduct method that return order was deleted is defiend', function () {
            expect(info.deleteOrder).toBeDefined();
        });
        it('createOrder method is defiend', function () {
            expect(info.createOrder).toBeDefined();
        });
        it('getActiveOrdersByUserId method is defiend', function () {
            expect(info.getActiveOrdersByUserId).toBeDefined();
        });
        it('getCompletedOrdersByUserId method is defiend', function () {
            expect(info.getCompletedOrdersByUserId).toBeDefined();
        });
        it('updateOrderStatus method is defiend', function () {
            expect(info.updateOrderStatus).toBeDefined();
        });
    });
    describe('servies of ORDER working correctly', function () {
        var user = {
            id: 3,
            firstname: 'maged2',
            password_digest: '12345',
            lastname: 'ahamed'
        };
        var product = {
            id: 3,
            name: 'shampo2',
            price: '50',
            category: 'cleaning'
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connect, sql;
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
                        _a.sent();
                        return [4 /*yield*/, infoP.create(product)
                            //console.log(createdUser);
                            //console.log(createdProduct);
                        ];
                    case 4:
                        _a.sent();
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
            user_id: user.id,
            product_id: product.id,
            quantity: 5,
            status_order: 'active'
        };
        //console.log(order);
        it(' createOrder method should return order created', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.createOrder(order.user_id, order.status_order)
                        //console.log(newOrder);
                    ];
                    case 1:
                        newOrder = _a.sent();
                        //console.log(newOrder);
                        expect(newOrder.user_id).toEqual(order.user_id);
                        expect(newOrder.status_order).toEqual(order.status_order);
                        return [2 /*return*/];
                }
            });
        }); });
        it('add product method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var addProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.addProduct(order.product_id, order.id, order.quantity)
                        // console.log(addProduct);
                    ];
                    case 1:
                        addProduct = _a.sent();
                        // console.log(addProduct);
                        expect(addProduct.quantity).toEqual(order.quantity);
                        expect(addProduct.id).toEqual(2);
                        expect(addProduct.product_id).toEqual(product.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it(' show method should return one product have this id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var ordertById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.getOrders(user.id)];
                    case 1:
                        ordertById = (_a.sent());
                        //console.log(user.id as number);
                        expect(ordertById[0].status_order).toEqual('active');
                        expect(ordertById[0].user_id).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it(' showCrruntOrder method should return current order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.showCrruntOrder(user.id)];
                    case 1:
                        currentOrder = _a.sent();
                        expect(currentOrder.status_order).toBe(order.status_order);
                        expect(currentOrder.user_id).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('getActiveOrdersByUserId method should return Active Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var ActiveOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.getActiveOrdersByUserId(user.id)];
                    case 1:
                        ActiveOrder = _a.sent();
                        expect(ActiveOrder[0].status_order).toEqual('active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('getCompletedOrdersByUserId method should return Completed Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var CompletedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.getCompletedOrdersByUserId(user.id)];
                    case 1:
                        CompletedOrder = _a.sent();
                        expect(CompletedOrder).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('updateOrderStatus method should return update Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var status, updateOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = 'complete';
                        return [4 /*yield*/, info.updateOrderStatus(status, order.id)];
                    case 1:
                        updateOrder = _a.sent();
                        expect(updateOrder.status_order).toEqual('complete');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deleteOrder method should return delete Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deleteOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.deleteOrder(order.id)];
                    case 1:
                        deleteOrder = _a.sent();
                        expect(deleteOrder.id).toEqual(order.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
