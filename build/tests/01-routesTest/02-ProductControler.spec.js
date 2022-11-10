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
var supertest_1 = __importDefault(require("supertest"));
var database_1 = __importDefault(require("../../database"));
var product_1 = require("../../models/product");
var index_1 = __importDefault(require("../../index"));
var _01_UeserController_spec_1 = require("./01-UeserController.spec");
var info = new product_1.prodcutInfo();
var Request = (0, supertest_1.default)(index_1.default);
describe('Product Endpoint', function () {
    var product = {
        name: 'shampo',
        price: '75',
        category: 'cleaning'
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connect, sql, createProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connect = _a.sent();
                    sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
                    return [4 /*yield*/, connect.query(sql)];
                case 2:
                    _a.sent();
                    connect.release();
                    return [4 /*yield*/, info.create(product)];
                case 3:
                    createProduct = _a.sent();
                    createProduct.id = product.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connect, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connect = _a.sent();
                    sql = 'DELETE FROM products';
                    return [4 /*yield*/, connect.query(sql)];
                case 2:
                    _a.sent();
                    connect.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('CRUD methods', function () {
        it('should create product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product2, res, data, name, price, category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product2 = {
                            name: 'banana',
                            price: '10',
                            category: 'fruites'
                        };
                        return [4 /*yield*/, Request.post('/api/products/create')
                                .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                                .send(product2)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        data = res.body.data;
                        name = data.name, price = data.price, category = data.category;
                        expect(name).toEqual('banana');
                        expect(price).toEqual('10');
                        expect(category).toEqual('fruites');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show all products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/products/showall')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('products show successed');
                        expect(Object.keys(res.body.data).length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/products/showById')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ id: '1' })
                        //console.log(data);
                    ];
                    case 1:
                        res = _a.sent();
                        //console.log(data);
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('product show successed');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show product by Category', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.put('/api/products/productsOfCategory')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ category: 'cleaning' })
                        //console.log(data);
                    ];
                    case 1:
                        res = _a.sent();
                        //console.log(data);
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('products show successed');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete user by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.delete('/api/products/delete')
                            .set('Authorization', "Bearer ".concat(_01_UeserController_spec_1.toket))
                            .send({ id: '1' })
                        //console.log(data);
                    ];
                    case 1:
                        res = _a.sent();
                        //console.log(data);
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('product delete successed');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
