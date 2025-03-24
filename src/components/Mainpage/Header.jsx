import { useNavigate } from "react-router-dom";
import * as styles from "../../css/components/HeaderMain.css"; // Vanilla Extract 스타일 import

function HeaderUnlogin() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <object
          className={styles.logoImg}
          data={`${import.meta.env.VITE_PUBLIC_URL}../../assets/logoblacknav.svg`}
          type="image/svg+xml"
          aria-label="로고"
          onClick={() => navigate("/")}
        >
          <span>로고</span>
        </object>
      </div>
    </div>
  );
}

export default HeaderUnlogin;
