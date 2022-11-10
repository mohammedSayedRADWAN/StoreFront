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
exports.toket = void 0;
var supertest_1 = __importDefault(require("supertest"));
var database_1 = __importDefault(require("../../database"));
var user_1 = require("../../models/user");
var index_1 = __importDefault(require("../../index"));
var info = new user_1.userInfo();
var Request = (0, supertest_1.default)(index_1.default);
exports.toket = '';
describe('User Endpoint', function () {
    var user = {
        firstname: 'alaa',
        password_digest: '12345',
        lastname: 'ibrahm'
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connect, sql, createUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connect = _a.sent();
                    sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
                    return [4 /*yield*/, connect.query(sql)];
                case 2:
                    _a.sent();
                    connect.release();
                    return [4 /*yield*/, info.create(user)
                        //console.log(createUser);
                    ];
                case 3:
                    createUser = _a.sent();
                    //console.log(createUser);
                    createUser.id = user.id;
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
                    sql = 'DELETE FROM users';
                    return [4 /*yield*/, connect.query(sql)];
                case 2:
                    _a.sent();
                    connect.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('test auth method', function () {
        it('should return token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data, firstname, lastname, tokenSecret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.post('/api/users/login').send({
                            firstname: 'alaa',
                            password_digest: '12345'
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        data = res.body.data;
                        firstname = data.firstname, lastname = data.lastname, tokenSecret = data.tokenSecret;
                        expect(firstname).toEqual(user.firstname);
                        expect(lastname).toEqual(user.lastname);
                        exports.toket = tokenSecret;
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be faild to authinticate user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/users/login').send({
                            firstname: 'alaa',
                            password_digest: 'wrongPassword'
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('CRUD methods', function () {
        it('should create user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, res, data, firstname, lastname, tokenSecret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            firstname: 'user2',
                            password_digest: '12345',
                            lastname: 'user2LastName'
                        };
                        return [4 /*yield*/, Request.post('/api/users/create').send(user)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        data = res.body.data;
                        firstname = data.firstname, lastname = data.lastname, tokenSecret = data.tokenSecret;
                        expect(firstname).toEqual('user2');
                        expect(lastname).toEqual('user2LastName');
                        exports.toket = tokenSecret;
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show all user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/users/showall')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(exports.toket))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('users show successed');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show user by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.get('/api/users/showById')
                            .set('Authorization', "Bearer ".concat(exports.toket))
                            .send({ id: '1' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('user show successed');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete user by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request.delete('/api/users/delete')
                            .set('Authorization', "Bearer ".concat(exports.toket))
                            .send({ id: '1' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toEqual(200);
                        expect(res.body.message).toEqual('user delete successed');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
