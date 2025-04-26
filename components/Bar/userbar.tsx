"use client"

import { useCurrentUser } from "@/hook/useCurrentUser";


const UserBar = () => {
  const user = useCurrentUser();

  return (
    <div className="flex-col justify-center">
      <p>{user?.name}</p>
      <div className="flex justify-center items-center">
        {user?.role}
      </div>
    </div>
  );
};

export default UserBar;
