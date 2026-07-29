const productModel = require('../models/productModel');

const getProducts = async (filters) => {
    return await productModel.getProducts(filters);
};

const getProductById = async (id) => {
    return await productModel.getProductById(id);
};

const searchProducts = async (query) => {
    return await productModel.getProducts({ search: query });
};

const createProduct = async (product) => {
    return await productModel.createProduct(product);
};

const updateProduct = async (id, product) => {
    await productModel.updateProduct(id, product);
};

const deleteProduct = async (id) => {
    await productModel.deleteProduct(id);
};

const getAdminProducts = async () => {
    return await productModel.getAdminProducts();
};

module.exports = { getProducts, getProductById, searchProducts, createProduct, updateProduct, deleteProduct, getAdminProducts };
