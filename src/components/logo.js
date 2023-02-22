import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="w-20">
        <img
          src={require("./../assets/img/icon/03.png")}
          className="max-w-full h-auto object-cover md:hidden"
          alt="maher_logo"
        />
        <img
          src={require("./../assets/img/icon/02.png")}
          className="max-w-full h-auto object-cover hidden md:block"
          alt="maher_logo"
        />
       
      </div>
    </Link>
  );
};

export default Logo;
