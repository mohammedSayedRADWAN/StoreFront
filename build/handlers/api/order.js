"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers = __importStar(require("../../controllers/orderControler"));
var authintication_1 = require("../../midellware/authintication");
var routes = (0, express_1.Router)();
routes.post('/create', authintication_1.verify, controllers.createOrder);
routes.post('/addProduct', authintication_1.verify, controllers.addProduct);
routes.get('/showall', authintication_1.verify, controllers.index);
routes.get('/showCrruntOrder', authintication_1.verify, controllers.showCrruntOrder);
routes.get('/activeOrder', authintication_1.verify, controllers.getActiveOrdersByUserId);
routes.patch('/updateStatus', authintication_1.verify, controllers.updateOrderStatus);
routes.get('/completOrder', authintication_1.verify, controllers.getCompletedOrdersByUserId);
routes.delete('/deletOrder', authintication_1.verify, controllers.deletOrder);
exports.default = routes;
