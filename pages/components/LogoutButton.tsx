import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import styles from '../styles/Admin.module.scss'

const LogoutButton = (children: any) => {
  const { user, logOut } = useAuth();
  const router = useRouter();



  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    
<>

<button onClick={handleLogout}>LOGOUT</button>

</>

  )
}
export default LogoutButton