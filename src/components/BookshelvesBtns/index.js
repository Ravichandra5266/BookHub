import "./index.css";

const BookshelvesBtns = (props) => {
  const { each, setActiveBtn, isActive } = props;
  const { label, value } = each;
  const onclickBtn = () => {
    setActiveBtn(label, value);
  };
  const ActiveColor = isActive ? "active-btn" : "inactive-btn";
  return (
    <li className="book-btn-item">
      <button className={ActiveColor} onClick={onclickBtn}>
        {label}
      </button>
    </li>
  );
};

export default BookshelvesBtns;
