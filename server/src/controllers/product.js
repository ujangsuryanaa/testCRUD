// Import db connection and QueryTypes from sequelize
const db = require("../database/connection");
const { QueryTypes } = require("sequelize");

// Function addUsers for insert user data to database
exports.addProducts = async (req, res) => {
    try {
        const { namaBarang,stok,jumlahTerjual,tanggalTransaksi,jenisBarang } = req.body;

        const query = `INSERT INTO products (namaBarang,stok,jumlahTerjual,tanggalTransaksi,jenisBarang) VALUES ('${namaBarang}','${stok}','${jumlahTerjual}','${tanggalTransaksi}','${jenisBarang}' )`;

        await db.sequelize.query(query);

        res.send({
            status: "success",
            message: "Add product finished",
            query,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const query = "SELECT id,namaBarang,stok,jumlahTerjual,tanggalTransaksi,jenisBarang FROM products";
        const data = await db.sequelize.query(query, { type: QueryTypes.SELECT });

        res.send({
            status: "success",
            data,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db.sequelize.query(
            `SELECT * FROM products WHERE id = ${id}`,
            { type: QueryTypes.SELECT }
        );

        res.send({
            status: "success",
            data,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const { namaBarang,stok,jumlahTerjual,tanggalTransaksi,jenisBarang } = req.body;

        const query = `UPDATE products 
                        SET namaBarang = '${namaBarang}', stok = '${stok}', jumlahTerjual = '${jumlahTerjual}', tanggalTransaksi = '${tanggalTransaksi}', jenisBarang = '${jenisBarang}'
                        WHERE id = ${id}`;

        await db.sequelize.query(query);

        res.send({
            status: "success",
            message: `Update product id: ${id} finished`,
            data: req.body,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `DELETE FROM products WHERE id = ${id}`;

        await db.sequelize.query(query);

        res.send({
            status: "success",
            message: `Delete product id: ${id} finished`,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};
