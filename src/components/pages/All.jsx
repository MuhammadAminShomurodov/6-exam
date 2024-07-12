import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./All.scss"; // Your custom styles
import logo from "../../assets/images/logo.svg";
import settings from "../../assets/images/settings.svg";
import korzina from "../../assets/images/karzina.svg";
import search from "../../assets/images/search.svg";
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";

const All = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Set initial filtered products
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleEditProduct = (id) => {
    const product = products.find((p) => p.id === id);
    navigate(`/edit/${id}`, { state: { product } }); // Navigate to edit page with product data
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setProducts(products.filter((product) => product.id !== id));
            setFilteredProducts(
              filteredProducts.filter((product) => product.id !== id)
            );
            toast.success("Товар успешно удален", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            console.error("Error deleting product:", response.statusText);
            toast.error("Ошибка при удалении товара", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          toast.error("Ошибка при удалении товара", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = products.filter(
      (product) =>
        product.code.toLowerCase().includes(value) ||
        product.brand.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };


  return (
    <div className="All">
      <div className="sidebar">
        <div className="sidebar-logo">
          <NavLink exact to="/" activeClassName="active">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <div className="sidebar-body">
          <div className="settings">
            <div className="korzina-img">
              <NavLink exact to="/" activeClassName="active" className="rasm">
                <img src={settings} alt="" />
              </NavLink>
            </div>
            <div className="korzina-img">
              <NavLink to="/add" activeClassName="active" className="rasm">
                <img src={korzina} alt="" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="all-right">
        <div className="header">
          <div className="container">
            <h1>Товары</h1>
            <Link to={"/"}>Главная / Товары</Link>
          </div>
        </div>
        <div className="main">
          <div className="container">
            <div className="all-tovars">
              <div className="all-tovars-text">
                <h2>Все товары</h2>
                <div className="search">
                  <img src={search} alt="" />
                  <input
                    type="text"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="all-tovar-body">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Артикул</th>
                      <th>Бренд</th>
                      <th>Цена</th>
                      <th>Цена со скидкой</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.code}</td>
                        <td>{product.brand}</td>
                        <td>{product.price} $</td>
                        <td>{product.priceInSale} $</td>
                        <td>
                          <button
                            className="edit"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <img src={editIcon} alt="Edit" />
                          </button>
                          <button
                            className="delete"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="add-new-tovar">
              <NavLink to="/add">
                <button>+ Новый товар</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default All;
