import BidderHome from "../BidderHome/BidderHome";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { auth } from "../../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  // const { userRole } = useSelector((store: any) => store.userInfo); // object destructuring...when variable name and key we want to access are same
  const toast = useToast();

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
          setUserRole(doc.data().role);
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getUserRoleQuery()
  });

  // console.log(getQuery());

  return (
    <div>{userRole === "seller" ? <SellerDashboard /> : <BidderHome />}</div>
  );
}

export default Home;
