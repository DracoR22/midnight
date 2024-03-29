import { videoRouter } from "~/server/api/routers/video";
import { createTRPCRouter } from "~/server/api/trpc";
import { videoEngagementRouter } from "./routers/videoEngagement";
import { userRouter } from "./routers/user";
import { commentRouter } from "./routers/comment";
import { playlistRouter } from "./routers/playlist";
import { announcementRouter } from "./routers/announcement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  video: videoRouter,
  user: userRouter,
  playlist: playlistRouter,
  comment: commentRouter,
  videoEngagement: videoEngagementRouter,
  announcement: announcementRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
