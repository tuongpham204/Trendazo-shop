<<<<<<< HEAD
=======
/* eslint-disable react/prop-types */
>>>>>>> 7d547c3fb925bf43a14909c4a62d0a20a8bec4d9
import { Outlet } from "react-router-dom";

const PaymentLayout = ({ children }) => {
  return (
    <div>
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
};

export default PaymentLayout;
