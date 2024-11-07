import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

ReactModal.setAppElement("#root");

const MyModal = ({ isOpen, onRequestClose, children }) => {
  const navigate = useNavigate();

  const handleRequestClose = () => {
    onRequestClose();
    navigate(-1);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      contentLabel="Login Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          transition: "opacity 0.5s ease-in-out",
        },
        content: {
          color: "gray",
          top: "30%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.5s ease-in-out",
        },
      }}
    >
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={handleRequestClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          marginBottom: "10px",
        }}
      >
        X
      </button>
      {children}
    </ReactModal>
  );
};

export default MyModal;
