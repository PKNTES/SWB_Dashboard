import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";

const CoachProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
      resource: "users",
      id: id as string,
  });



  const myProfile = data?.data ?? {};

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
      <Profile
          type="Coaches"
          name={myProfile.name}
          email={myProfile.email}
          avatar={myProfile.avatar}
          players={myProfile.allPlayers}
      />
  );
};


export default CoachProfile;