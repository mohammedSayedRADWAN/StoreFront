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
var product_1 = require("../../models/product");
var database_1 = __importDefault(require("../../database"));
var info = new product_1.prodcutInfo();
describe('product model', function () {
    describe('serves are exisit', function () {
        it('should create method that return product was created is defiend', function () {
            expect(info.create).toBeDefined();
        });
        it('should index method that return all products is defiend', function () {
            expect(info.index).toBeDefined();
        });
        it('should show method that return specifc product by id is defiend', function () {
            expect(info.show).toBeDefined();
        });
        it('should deleteProduct method that return user was deleted is defiend', function () {
            expect(info.deleteProduct).toBeDefined();
        });
        it('should getProductBycategory method is defiend', function () {
            expect(info.getProductBycategory).toBeDefined();
        });
    });
    describe('servies of product working correctly', function () {
        var product = {
            name: 'shampo',
            price: '50',
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
                        product.id = createProduct.id;
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
        it(' index method should return all products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.index()
                        //console.log(products);
                    ];
                    case 1:
                        products = _a.sent();
                        //console.log(products);
                        expect(products.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it(' show method should return one product have this id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var productById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.show(product.id)];
                    case 1:
                        productById = (_a.sent());
                        expect(productById.name).toBe(product.name);
                        expect(productById.price).toEqual(product.price);
                        expect(productById.category).toBe(product.category);
                        return [2 /*return*/];
                }
            });
        }); });
        it(' create method should return new Product created', function () { return __awaiter(void 0, void 0, void 0, function () {
            var Product, newPtoduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Product = {
                            name: 'spongpop',
                            price: '100',
                            category: 'toies'
                        };
                        return [4 /*yield*/, info.create(Product)];
                    case 1:
                        newPtoduct = (_a.sent());
                        expect(newPtoduct.name).toBe(Product.name);
                        expect(newPtoduct.price).toEqual(Product.price);
                        expect(newPtoduct.category).toBe(Product.category);
                        return [2 /*return*/];
                }
            });
        }); });
        it(' getProductBycategory method should return products Of this Category', function () { return __awaiter(void 0, void 0, void 0, function () {
            var productsOfCategory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, info.getProductBycategory(product.category)];
                    case 1:
                        productsOfCategory = (_a.sent());
                        expect(productsOfCategory[0].category).toBe(product.category);
                        return [2 /*return*/];
                }
            });
        }); }),
            it('deleteProduct method should return deleted product', function () { return __awaiter(void 0, void 0, void 0, function () {
                var deleteProduct;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, info.deleteProduct(product.id)];
                        case 1:
                            deleteProduct = _a.sent();
                            expect(deleteProduct).toEqual(product);
                            return [2 /*return*/];
                    }
                });
            }); });
    });
});
