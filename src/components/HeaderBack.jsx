import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderMain.css";

function HeaderBack() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
       <div className={styles.left} onClick={() => navigate("/login")}>
                <img src="./assets/backimg.svg" alt="point" className={styles.pointImage} />
                
                
        </div>
        
    </div>
  );
}
export default HeaderBack;