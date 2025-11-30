import React, { createContext, useState, useEffect } from "react";
import { realDb } from "../authFirebase/firebase";
import { ref, get } from "firebase/database";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [studentData, setStudentData] = useState([]);
  const [OrganizationData, setOrganizationData] = useState([]);
  const [MentorData, setMentorData] = useState([]);

  const getStudentsData = async () => {
    try {
      const snapshot = await get(ref(realDb, "Students"));
      const data = snapshot.val();

      if (!data) {
        setStudentData([]);   // prevent crash
        return;
      }

      const result = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setStudentData(result);
    } catch (err) {
      console.log(err);
      alert("Services currently unavailable, please try again later");
    }
  };

  const getOrganizationData = async () => {
    try {
      const snapshot = await get(ref(realDb, "Organizations"));
      const data = snapshot.val();

      if (!data) {
        setOrganizationData([]);
        return;
      }

      const resultOrg = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setOrganizationData(resultOrg);
    } catch (err) {
      console.log(err);
      alert("Services currently unavailable, please try again later");
    }
  };

  const getMentorData = async () => {
    try {
      const snapshot = await get(ref(realDb, "Mentors"));
      const data = snapshot.val();

      if (!data) {
        setMentorData([]);
        return;
      }

      const resultMent = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setMentorData(resultMent);
    } catch (err) {
      console.log(err);
      alert("Services currently unavailable, please try again later");
    }
  };

  useEffect(() => {
    getStudentsData();
    getOrganizationData();
    getMentorData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        studentData,
        OrganizationData,
        MentorData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
