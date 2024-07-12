import { useState } from "react";
import "./Add.scss";
import logo from "../../assets/images/logo.svg";
import settings from "../../assets/images/settings.svg";
import korzina from "../../assets/images/karzina.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    code: "",
    price: "",
    priceInSale: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Error adding product:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="Add">
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
            <h1>Новый товар</h1>
            <Link to={"/"}>Главная / Товары / Новый товар</Link>
          </div>
        </div>
        <div className="main">
          <div className="container">
            <div className="main-all">
              <p className="par1">Основные</p>
              <form
                onSubmit={handleSubmit}
                className="form-all"
                id="add-product-form"
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
            <button type="submit" form="add-product-form" className="download">
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

export default Add;
