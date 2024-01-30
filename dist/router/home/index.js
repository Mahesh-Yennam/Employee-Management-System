"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRoute = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.homeRoute = router;
router.get("/", (req, res) => {
    console.log("called the home page");
    res.send("hello world");
});
