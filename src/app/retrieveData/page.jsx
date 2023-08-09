"use client";

import { Spinner } from "@material-tailwind/react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useDocument } from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";
import useStore from "../../store/useStore";
import { firebaseApp } from "../../utils/firebaseConfig";

const auth = getAuth(firebaseApp);

const RetrieveData = () => {
    // check if a user is authenticated or not
    const [authUser, authLoading, authError ] = useAuthState(auth);

  useEffect(() => {
    if (!authUser?.email) {
      redirect("/login");
    }
  }, [authUser]);
  
  const { loggedInEmail, setUserData } = useStore();

  console.log("loggedInEmail", loggedInEmail);

  const [value, loading, error] = useDocument(
    doc(getFirestore(firebaseApp), "userData", `${loggedInEmail}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log("error", error);

  if (value?.data()) {
    toast.success("User Data Fetched successfully");
    setUserData(value?.data());
    redirect("/dashboard");
  }

  if (error) {
    toast.error(`${error?.name} : ${error?.message}`);
  }
  console.log(value?.data());

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <Spinner className="h-12 w-12" />
      <h2 className="text-blue-600 font-bold text-2xl">
        Retrieving User Data...
      </h2>
    </div>
  );
};
export default RetrieveData;
