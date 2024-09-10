import { Link } from "react-router-dom";

export const Button1 = (props) => {
  const { link, name } = props;
  return (
    <Link
      to={link}
      className="bg-primary text-white rounded-lg px-6 py-4 text-xl font-bold hover:bg-transparent hover:text-primary hover:bg-white transition-all duration-200"
    >
      {name}
    </Link>
  );
};

export const Button2 = (props) => {
  const { link, name } = props;
  return (
    <Link
      to={link}
      className="bg-primary py-3 px-5 text-white rounded-lg flex items-center hover:bg-opacity-80 hover:shadow-md transition-colors text-sm font-bold"
    >
      <span className="mx-auto">{name}</span>
    </Link>
  );
};

export const Button3 = (props) => {
  const { link, name } = props;
  return (
    <Link
      to={link}
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-lg px-6 py-2 font-bold hover:-translate-y-1 hover:shadow-xl hover:transition-all duration-200 hover:opacity-90"
    >
      {name}
    </Link>
  );
};

export const Button4 = (props) => {
  const { link, name } = props;
  return (
    <Link
      target="_blank"
      to={link}
      className="mb-4 mx-auto md:mr-0 lg:mr-0 rounded-lg shadow-md bg-primary text-white text-center self-center font-bold justify-center px-8 py-4 hover:-translate-y-1 hover:shadow-xl hover:transition-all duration-200 hover:opacity-90"
    >
      <span>{name}</span>
    </Link>
  );
};
