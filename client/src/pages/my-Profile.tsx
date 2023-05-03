import { BaseKey, useGetIdentity, useOne } from "@refinedev/core";

import { Profile } from "components";


const MyProfile = () => {

  const { data: user } = useGetIdentity<{userid?: BaseKey | undefined}>();
  console.log(user)
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid
});

  const myProfile = data?.data ?? {};

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
      <Profile
          type="My"
          name={myProfile.name}
          email={myProfile.email}
          avatar={myProfile.avatar}
          players={myProfile.allPlayers}
      />
  );
};

export default MyProfile