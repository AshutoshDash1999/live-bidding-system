import BidderHome from "../BidderHome/BidderHome";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { auth } from "../../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateUserName, updateUserEmail, updateUserRole } from "../../features/user/userSlice";
import { RootState } from "../../app/store";
function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch()
  // const { userRole } = useSelector((store: any) => store.userInfo); // object destructuring...when variable name and key we want to access are same

  useEffect(() => {
    if (user) {
      setUserEmail(user.email as string);
    }
  }, [user]);

  useEffect(() => {
    const getUserRoleQuery = async () => {
      try {
        const usersDataRef = collection(db, "userData");
        const userMailQuery = await query(
          usersDataRef,
          where("mailID", "==", userEmail)
        );
        const users = await getDocs(userMailQuery);
        users.forEach((doc) => {
          // console.log(doc.data());
          dispatch(updateUserName(doc.data().firstName))
          dispatch(updateUserEmail(doc.data().mailID))
          dispatch(updateUserRole(doc.data().role))
        });
      } catch (error) {
        console.warn("Error in getUserRoleQuery in Home.tsx file: ", error);
      }
    };
    getUserRoleQuery();
  });
  
  const getUserRoleFromStore = async () => {
    const fetchCurrentUserRole = await useSelector((state: RootState) => state.currentUserStore.userRole)
    setUserRole(fetchCurrentUserRole)
  }
  getUserRoleFromStore()

  return (
    // <div>{userRole === "seller" ? <SellerDashboard /> : <BidderHome />}</div>
    <div> <SellerDashboard /> </div>
  );
}

export default Home;
