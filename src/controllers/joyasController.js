const pool = require("../db/db");

const getJoyas = async (req, res) => {
  try {
    const { limits, page, order_by } = req.query;
    const limit = limits ? parseInt(limits) : 10;
    const offset = page ? (parseInt(page) - 1) * limit : 0;
    const order = order_by ? order_by.replace("_", " ") : "id ASC";

    const query = `
      SELECT * FROM inventario ORDER BY ${order} LIMIT $1 OFFSET $2
    `;
    const { rows } = await pool.query(query, [limit, offset]);
    res.json({ data: rows, links: { self: req.originalUrl } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFiltros = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;

    const filters = [];
    if (precio_min) filters.push(`precio >= $${filters.length + 1}`);
    if (precio_max) filters.push(`precio <= $${filters.length + 1}`);
    if (categoria) filters.push(`categoria = $${filters.length + 1}`);
    if (metal) filters.push(`metal = $${filters.length + 1}`);

    const query = `
      SELECT * FROM inventario ${filters.length ? `WHERE ${filters.join(" AND ")}` : ""}
    `;

    const params = [precio_min, precio_max, categoria, metal].filter((v) => v);
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getJoyas, getFiltros }; // Exporta getFiltros aquí
