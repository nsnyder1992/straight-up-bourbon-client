import "./styles/TextDivider.css";

const TextDivider = ({ children }) => {
  return (
    <div className="d-container">
      <div className="d-border" />
      <span className="d-content">{children}</span>
      <div className="d-border" />
    </div>
  );
};

export default TextDivider;
