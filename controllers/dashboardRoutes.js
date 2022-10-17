const router = require("express").Router();
const { Product, Purchase, Address, Category, Order } = require("../models");
const withAuth = require("../utils/auth");

// GET ALL ACTIVELISTINGS

 