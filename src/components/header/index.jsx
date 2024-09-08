import { Link } from "react-router-dom";
import "./index.scss";
import { UserOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

function Header() {
  const [isShowSearch, setIsShowSearch] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <Link to="">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/57dce043604507.57f570bb1809c.png"
            alt=""
            width={200}
          />
        </Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Movie</Link>
          </li>
          <li>
            <Link to="/movie-manager">MovieManagement</Link>
          </li>
          <li className="icon" onClick={() => setIsShowSearch(true)}>
            <SearchOutlined />
          </li>
          <li>
            <Link to={"/login"}>
              <UserOutlined />
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`header__search ${isShowSearch ? "active" : ""}`}>
        <input type="text" placeholder="Search a movies..." />
        <CloseOutlined onClick={() => setIsShowSearch(false)} />
      </div>
    </header>
  );
}

export default Header;
