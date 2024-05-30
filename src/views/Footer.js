import "../styles/Footer.css";
const Footer = () => {
  return (
    <div>
      <footer>
        <div>
          <div className="footer__top">
            <div className="footer__name">
              <h1>FASHION FUSION</h1>
              <p>info@fashionfusion.com</p>
              <p>Tel: 123-456-7890</p>
              <p>123 Fashion St, New York, NY 10001</p>
            </div>
            <div className="shp_str">
              <span>
                <h2>SHOP</h2>
                <ul>
                  <li>
                    <a href="/shop">New Arrivals</a>
                  </li>
                  <li>
                    <a href="/shop">WOMEN</a>
                  </li>
                  <li>
                    <a href="/shop">MEN</a>
                  </li>
                </ul>
              </span>
              <span>
                <h2>HELP</h2>
                <ul>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Shipping</a>
                  </li>
                  <li>
                    <a href="#">Returns</a>
                  </li>
                </ul>
              </span>

              <span>
                <h2>LEGAL</h2>
                <ul>
                  <li>
                    <a href="#">Terms of Use</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Cookie Policy</a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
          <div className="footer__buttom">
            <div className="footer_socials">
              <a href="#">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-square-instagram"></i>
              </a>
            </div>
            <div className="reserved">
              <p>&copy; 2021 Fashion Fusion. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
