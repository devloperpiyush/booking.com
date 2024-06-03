import React, { useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastMessage ={
    message:string;
    type:"SUCCESS"| "ERROR"; // Corrected typo in "SUCCESS"
}

type AppContext = {
    showToast:(toastMessage:ToastMessage)=> void;
}

const AppContext = React.createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    
    const showToast = (toastMessage: ToastMessage) => {
        setToast(toastMessage);
    };
    
    return (
      <AppContext.Provider
        value={{
          showToast: showToast
        }}
      >
        {toast && (
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={()=>setToast(undefined)}
            />
        )}
        {children}
      </AppContext.Provider>
    );
};
  
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
