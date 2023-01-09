import ProductManager from "./productManager.js";

const getAll = async (req, res) => {
  let allProducts = false;
  let limit = req.query.limit;
  limit = Number(limit);
  if (isNaN(limit)) {
    allProducts = true;
  } else {
    limit = Math.floor(limit);
    if (limit < 1) {
      allProducts = true;
    }
  }
  try {
    const pm = new ProductManager("./productBase.json");
    let productos = [];
    if (allProducts) {
      productos = await pm.getProducts();
    } else {
      productos = await pm.getProductsWithLimit(limit);
    }
    res.send({ products: productos });
  } catch (e) {
    res.send({ error: "No se pueden obtener los productos" });
  }
};

const getById = async (req, res) => {
  let id = req.params.id;
  id = Number(id);
  if (isNaN(id)) {
    res.status(400).send({ error: "El ID tiene que ser un numero" });
  } else {
    try {
      const pm = new ProductManager("./productBase.json");
      id = Math.floor(id);
      const producto = await pm.getProductById(id);
      if (producto) {
        res.send({ product: producto });
      } else {
        res.send({ error: "No se encontro el producto" });
      }
    } catch (e) {
      res.send({ error: "No se puede obtener los producto" });
    }
  }
};

export { getAll, getById };
