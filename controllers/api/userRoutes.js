const router = require('express').Router();
const { Product, User, Category } = require('../../models');
const withAuth = require('../../utils/auth');

