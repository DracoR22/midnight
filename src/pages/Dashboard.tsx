import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import React from "react";
import { ErrorMessage, LoadingMessage } from "~/Components/ErrorMessage";
import { GreenEye, GreenHeart, GreenUserCheck } from "~/Components/Icons/GreenIcons";
import Layout from "~/Components/Layout";
import { Thumbnail } from "~/Components/Thumbnail";
import PublishedButton from "~/Components/Buttons/PublishedButton";
import DeleteButton from "~/Components/Buttons/DeleteButton";
import { EditButton } from "~/Components/Buttons/EditButton";
import { UploadButton } from "~/Components/Buttons/UploadButton";
const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();

  const userId = sessionData?.user.id;
  const { data, isLoading, error, refetch } =
    api.user.getDashboardData.useQuery(userId as string);

  interface StatsItem {
    name: string;
    stat: string;
    icon: (className: string) => JSX.Element;
  }
  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (error || !data) {
      return (
        <ErrorMessage
          icon="GreenPeople"
          message="Error loading channel"
          description="Sorry there is at this time."
        />
      );
    } else {
      return <></>;
    }
  };

  const stats: StatsItem[] = [
    {
      name: "Total Views",
      stat: data?.totalViews?.toString() || "0",
      icon: (className) => <GreenEye className={className} />,
    },
    {
      name: "Total followers",
      stat: data?.totalFollowers?.toString() || "0",
      icon: (className) => <GreenUserCheck className={className} />,
    },
    {
      name: "Total likes",
      stat: data?.totalLikes?.toString() || "0",
      icon: (className) => <GreenHeart className={className} />,
    },
  ];

  return (
    <>
      <Head>
        <title>Creator Studio - Midnight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout closeSidebar={true}>
        <>
          {!data ? (
            <Error />
          ) : (
            <div className="flex flex-col gap-8 bg-neutral-700 pt-3 shadow sm:rounded-lg p-4">
              <div className="md:flex md:items-center md:justify-between md:space-x-5">
                <div className="flex items-start space-x-5">
                  <div className="pt-1.5">
                    <h1 className="text-2xl font-bold text-neutral-100">
                      <span>Welcome Back </span> {sessionData?.user.name}
                    </h1>
                    <p className="text-sm font-medium text-neutral-300">
                      Track and manage your channel and videos
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                  <UploadButton refetch={refetch} />
                </div>
              </div>
              <div>
                <dl className="mt-5 grid grid-cols-1 divide-y divide-neutral-600 overflow-hidden rounded-2xl border border-neutral-700  shadow-sm   md:grid-cols-3 md:divide-x md:divide-y-0">
                  {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 sm:p-6">
                      {item.icon("h-4 w-4 ")}
                      <dt className="text-base font-normal text-neutral-100">
                        {item.name}
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-neutral-300 md:block lg:flex">
                        {item.stat}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-neutral-700 p-6 px-4 shadow-sm sm:px-6 lg:px-8">
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-neutral-600">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-100 sm:pl-0"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-100"
                            ></th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold  text-neutral-100"
                            >
                              Uploaded
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold  text-neutral-100"
                            >
                              Rating
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold  text-neutral-100"
                            >
                              Data Uploaded
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-700 bg-neutral-700">
                          {data?.videos.map((video) => (
                            <tr key={video.id}>
                              <PublishedButton video={video} />
                              <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="flex">
                                  <div className="h-16 w-16 flex-shrink-0">
                                    <Thumbnail
                                      thumbnailUrl={video.thumbnailUrl || ''}
                                    />
                                  </div>
                                  <div className="ml-4 font-medium text-neutral-100">
                                    {video.title}
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-neutral-300">
                                <span className="inline-flex items-center rounded-full bg-neutral-300 px-2 py-1 text-xs font-medium text-success-700">
                                  {video.likes} Likes
                                </span>
                                <span className="inline-flex ml-2 items-center rounded-full  bg-neutral-300 px-2 py-1 text-xs font-medium text-error-700">
                                  {video.dislikes} Dislikes
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-neutral-300">
                                {video.createdAt.toLocaleDateString()}
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-neutral-300">
                                <div className="flex flex-row gap-2">
                                  <DeleteButton
                                    videoId={video.id}
                                    refetch={refetch}
                                  />

                                  <EditButton
                                    video={{
                                      id: video?.id || "",
                                      title: video?.title || "",
                                      description: video?.description || "",
                                      thumbnailUrl: video?.thumbnailUrl || "",
                                    }}
                                    refetch={refetch}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </Layout>
    </>
  );
};

export default Dashboard;