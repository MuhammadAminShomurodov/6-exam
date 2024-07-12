import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Edit.scss";
import logo from "../../assets/images/logo.svg";
import settings from "../../assets/images/settings.svg";
import korzina from "../../assets/images/karzina.svg";
import { Link, NavLink } from "react-router-dom";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    code: "",
    price: "",
    priceInSale: "",
  });

  useEffect(() => {
    if (location.state && location.state.product) {
      setFormData(location.state.product);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/products/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Error updating product:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="Edit">
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
            <h1>Редактировать товар</h1>
            <Link to={"/"}>Главная / Товары / Редактировать товар</Link>
          </div>
        </div>
        <div className="main">
          <div className="container">
            <div className="main-all">
              <p className="par1">Основные</p>
              <form
                onSubmit={handleSubmit}
                className="form-all"
                id="edit-product-form"
              >
                <div className="form-group">
                  <h6>
                    Название <span>*</span>
                  </h6>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="name"
                  />
                </div>

                <div className="form-group brands">
                  <div className="brands-text">
                    <h6>
                      Бренд <span>*</span>
                    </h6>

                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="brands-text">
                    <h6>
                      Артикул производителя <span>*</span>
                    </h6>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="comments">
                  <h6>
                    Описание <span>*</span>
                  </h6>
                  <input type="text" />
                </div>
                <div className="form-group brands">
                  <div className="brands-text">
                    <h6>Цена</h6>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="brands-text">
                    <h6>Цена со скидкой</h6>
                    <input
                      type="number"
                      name="priceInSale"
                      value={formData.priceInSale}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="form-buttons add-btns">
            <button type="submit" form="edit-product-form" className="download">
              Сохранить
            </button>
            <button type="button" onClick={handleCancel} className="cancel">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
