import { useNavigate } from "react-router-dom";
import * as styles from "../../css/components/HeaderMain.css";

function HeaderBack() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.left} onClick={() => navigate("/")}> 
        <img src="./assets/backimg.svg" alt="back" className={styles.pointImage} />
      </div>
      <div className={styles.center}>
        <img src="/assets/Common/logo.svg" alt="logo" className={styles.logoImage} />
        매칭 결과
      </div>
    </div>
  );
}
export default HeaderBack;
