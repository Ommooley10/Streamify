import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api.js"; // Make sure this is imported
import NoFriendsFound from "../components/NoFriendsFound.jsx"; // Also make sure it's imported
import DisplayFriendCard from "../components/displayFriendCard.jsx"; // Same here

const FriendsPage = () => {
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4">
      {loadingFriends ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <DisplayFriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
