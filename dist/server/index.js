"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConnect = serverConnect;
const express_1 = __importDefault(require("express"));
const router_1 = require("../router");
const http_1 = __importDefault(require("http"));
function serverConnect() {
    let app;
    let server;
    app = (0, express_1.default)();
    server = http_1.default.createServer(app);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.use(express_1.default.static("public"));
    app.use("/", router_1.router);
    server.listen(3000, () => {
        console.log("server running on port 3000");
    });
}
