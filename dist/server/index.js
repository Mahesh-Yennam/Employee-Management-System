"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = require("../router");
const http_1 = __importDefault(require("http"));
class Server {
    constructor() { }
    initialize() {
        this.app = (0, express_1.default)();
        this.httpServer = http_1.default.createServer(this.app);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use("/", router_1.router);
        this.httpServer.listen(3000, () => {
            console.log("server running on port 3000");
        });
    }
}
const server = new Server();
exports.server = server;
