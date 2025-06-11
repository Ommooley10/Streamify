import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const DisplayFriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-shadow rounded-xl">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar size-12">
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="rounded-full w-12 h-12 object-cover"
            />
          </div>
          <h3 className="font-semibold text-lg truncate">
            {friend.fullName}
          </h3>
        </div>

        {/* LANGUAGES */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* BIO */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {friend.bio || "No bio available."}
          </p>
        </div>

        {/* MESSAGE BUTTON */}
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default DisplayFriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }

  return null;
}
