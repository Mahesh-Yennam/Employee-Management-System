"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
let _email;
let _msg;
let _admin = [
    { name: "mahesh", email: "mahesh@gmail.com", password: "123456" },
];
let _employee = [
    { id: 1, name: "pqr", contact: 1213, email: "pqr@gmail.com", salary: 20000 },
];
router.get("/", (req, res) => {
    res.render("index", { email: _email });
});
router.get("/signup", (req, res) => {
    res.render("signup", { msg: _msg, email: _email });
    _msg = null;
});
router.post("/signup_success", (req, res) => {
    let { name, email, password } = req.body;
    // console.log(req.body);
    let adminExist = _admin.find((u) => u.email == email);
    if (!adminExist) {
        _admin.push({ name, email, password });
        res.redirect("/login");
    }
    else {
        _msg = "Duplicate Email cannot add!";
        res.redirect("signup");
    }
});
router.get("/login", (req, res) => {
    res.render("login", { msg: _msg, email: _email });
    _msg = null;
});
router.post("/login_success", (req, res) => {
    let { email, pass } = req.body;
    // console.log(req.body);
    let admin = _admin.find((u) => u.email == email && u.password == pass);
    // console.log("admin: ", admin);
    if (!admin) {
        _msg = "Incorrect Email id or Password!!!";
        res.redirect("/login");
    }
    else {
        _email = email;
        res.redirect("/");
    }
});
router.get("/logout", (req, res) => {
    _email = null;
    res.redirect("/");
});
router.get("/add", (req, res) => {
    if (_email) {
        res.render("add", { msg: _msg, email: _email });
    }
    else {
        res.redirect("/login");
    }
});
router.post("/savedetails", (req, res) => {
    let { name, contact, email, salary } = req.body;
    let id = _employee[_employee.length - 1].id + 1;
    if (_email) {
        _employee.push({ id, name, contact, email, salary });
        _msg = "Employee successfully Added";
    }
    else {
        _msg = "We cannot add the employee";
    }
    res.render("add_success", { msg: _msg, email: _email });
});
router.get("/view", (req, res) => {
    if (_email) {
        res.render("view", { msg: _msg, email: _email, emp: _employee });
    }
    else {
        res.redirect("/login");
    }
});
router.get("/update", (req, res) => {
    if (_email) {
        res.render("update", { msg: _msg, email: _email });
    }
    else {
        res.redirect("/login");
    }
});
router.post("/updaterecord", (req, res) => {
    let { id } = req.body;
    let emp = _employee.find((emp) => emp.id == id);
    if (_email) {
        if (!emp) {
            _msg = `No Record of Id: ${id}`;
        }
        res.render("updaterecord", { msg: _msg, email: _email, emp });
        _msg = null;
    }
    else {
        res.redirect("/login");
    }
});
router.post("/updatesuccess/:id", (req, res) => {
    let { name, contact, email, salary } = req.body;
    let id = Number(req.params.id);
    let emp = _employee.find((emp) => emp.id == id);
    if (_email) {
        if (emp) {
            emp.name = name;
            emp.contact = contact;
            emp.email = email;
            emp.salary = salary;
            _msg = "Record Successfully Updated";
        }
        else {
            _msg = "can't be updated";
        }
        res.render("updatesuccess", { msg: _msg, email: _email });
        _msg = null;
    }
    else {
        res.redirect("/login");
    }
});
router.get("/delete", (req, res) => {
    if (_email) {
        res.render("delete", { msg: _msg, email: _email });
    }
    else {
        res.redirect("/login");
    }
});
router.post("/deleterecord", (req, res) => {
    let { id } = req.body;
    let idx = _employee.findIndex((emp) => emp.id == id);
    // console.log("idx", idx);
    if (_email) {
        let emp = idx != -1 ? _employee.splice(idx, 1) : [];
        // console.log(emp, emp.length);
        if (emp.length) {
            _msg = "Record Successfully Deleted";
        }
        else {
            _msg = `No Employee with Id: ${id}`;
        }
        res.render("deletesuccess", { msg: _msg, email: _email });
        _msg = null;
    }
    else {
        res.redirect("/login");
    }
});
router.get("/search", (req, res) => {
    if (_email) {
        res.render("search", { msg: _msg, email: _email });
        _msg = null;
    }
    else {
        res.redirect("/login");
    }
});
router.post("/searchrecord", (req, res) => {
    // console.log("sfksjf");
    let { name } = req.body;
    let emp = _employee.find((emp) => emp.name.toLowerCase() == name);
    // console.log(emp);
    if (_email) {
        if (emp) {
            res.render("view", { msg: _msg, email: _email, emp: [emp] });
        }
        else {
            _msg = "No Such Employee";
            res.redirect("/search");
        }
    }
    else {
        res.redirect("/login");
    }
});
