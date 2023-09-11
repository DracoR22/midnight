import React from "react";
import { api } from "~/utils/api";
import { signIn, useSession } from "next-auth/react";
import ThumbsUp from "../Icons/ThumbsUp";
import ThumbsDown from "../Icons/ThumbsDown";
import { useEngagementButton } from "~/hooks/useEngagement";

interface AnnouncementButtonProps {
  EngagementData: {
    id: string;
    likes: number;
    dislikes: number;
  };
  viewer: {
    hasLiked: boolean;
    hasDisliked: boolean;
  };
}
export default function AnnouncementButton({
  EngagementData,
  viewer,
}: AnnouncementButtonProps) {
  const { likeCount, dislikeCount, userChoice, handleLike, handleDislike } =
    useEngagementButton({
      EngagementData,
      viewer,
      addLikeMutation: api.announcement.addLikeAnnouncement.useMutation(),
      addDislikeMutation: api.announcement.addDislikeAnnouncement.useMutation(),
    });

  const { data: sessionData } = useSession();
  return (
    <>
      <div className="flex-end isolate  inline-flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={
            sessionData
              ? () =>
                  handleLike({
                    id: EngagementData ? EngagementData.id : "",
                    userId: sessionData ? sessionData.user.id : "",
                  })
              : () => void signIn()
          }
          className={`focus r text-regular group relative inline-flex items-center rounded-l-md  px-2  py-2  focus:z-10
        ${
          userChoice.like
            ? "group text-neutral-300 hover:text-neutral-100 group-hover:stroke-neutral-100 "
            : "group bg-neutral-700 text-neutral-300  hover:text-neutral-300 group-hover:stroke-neutral-300"
        }`}
        >
          <ThumbsUp
            className={`group h-5 w-5 shrink-0
              ${
                userChoice.like
                  ? "group fill-neutral-300 stroke-neutral-300 group-hover:stroke-neutral-100"
                  : "group stroke-neutral-300 group-hover:stroke-neutral-300"
              }
              `}
          />
          <p className="pl-2">{likeCount}</p>
        </button>
        <button
          onClick={
            sessionData
              ? () =>
                  handleDislike({
                    id: EngagementData ? EngagementData.id : "",
                    userId: sessionData ? sessionData.user.id : "",
                  })
              : () => void signIn()
          }
          className={`focus group relative -ml-px inline-flex items-center rounded-r-md  px-2 py-2  focus:z-10

        ${
          userChoice.dislike
            ? "group text-error-600 hover:text-neutral-100 group-hover:stroke-neutral-100"
            : "group bg-neutral-700 text-neutral-300  hover:text-error-600 group-hover:stroke-error-600"
        }`}
        >
          <ThumbsDown
            className={`group h-5 w-5 shrink-0
            ${
              userChoice.dislike
                ? "group fill-error-600 stroke-error-600 group-hover:stroke-neutral-100"
                : "group stroke-neutral-300 group-hover:stroke-error-600"
            }
            }
              `}
          />
          <p className="pl-2">{dislikeCount}</p>
        </button>
      </div>
    </>
  );
}