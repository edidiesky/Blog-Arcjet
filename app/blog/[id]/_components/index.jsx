"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { BlogData } from "@/utils/data/blogdata";

const CommentData = [
  {
    id: 4565483929237,
    shortDescription:
      " Discover the benefits of sustainable gardening and tips to get started.",
    author: "Jane Smith",
    createdAt: "April 15, 2023",
  },
  {
    id: 44547484984,
    shortDescription:
      "From sustainable materials to energy-efficient upgrades, we've got you covered.",
    author: "Michael Johnson",
    createdAt: "March 28, 2023",
  },
  {
    id: 4745644647884,
    shortDescription:
      "Your choices when it comes to your wardrobe. Reduce waste and support ethical brands.",
    author: "Sarah Lee",
    createdAt: "February 10, 2023",
  },
];
const MainContent = ({ blogid }) => {
  // console.log(blogid);
  const blog = BlogData?.find((blog) => blog.id === blogid);
  // console.log(blog);

  return (
    <div className="flex flex-col relative w-full gap-4">
      {/* {loading && <Loader />} */}
      <div className="w-full flex flex-col gap-8">
        {/* single posts */}
        <div className="w-full flex items-center justify-center bg-[#fff] py-12">
          <div className="w-[90%] md:w-[70%] max-w-custom_1 flex flex-col items-start gap-4 justify-center mx-auto">
            <div className="w-full flex flex-col gap-8">
              <div className="w-full">
                <img
                  src="https://generated.vusercontent.net/placeholder.svg"
                  alt=""
                  className="object-cover h-[430px] w-full"
                />
              </div>
              <div className="flex w-full py-8 flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-3xl md:text-5xl font-bold">
                    {blog?.title}
                  </h3>
                  <h5 className="text-lg flex items-center gap-4 font-semibold">
                    <span>by {blog?.author} </span>
                    <span>{blog?.createdAt}</span>
                  </h5>
                  <p className="text-lg font-semibold">
                    {blog?.shortDescription}
                  </p>
                </div>
                {/* 8BC9F6
                <h5 className="text-lg text-[#3B82F6] flex items-center gap-2 font-bold">
                  Read More <BiChevronRight fontSize={"20px"} />
                </h5> */}
                <div className="w-full flex flex-col gap-4">
                  <div className="flex w-full flex-col gap-4">
                    <h4 className="text-2xl font-bold">
                      Reduce, Reuse, Recycle
                    </h4>
                    <h5 className="text-lg font-semibold">
                      One of the most important aspects of sustainable living is
                      reducing waste. This can be achieved by adopting simple
                      habits like using reusable bags, avoiding single-use
                      plastics, and properly recycling items. By making
                      conscious choices to reduce our environmental impact, we
                      can make a significant difference.
                    </h5>
                  </div>
                  <div className="flex w-full flex-col gap-4">
                    <h4 className="text-2xl font-bold">Energy Efficiency</h4>
                    <h5 className="text-lg font-semibold">
                      Another key component of sustainable living is improving
                      energy efficiency in our homes. This can include upgrading
                      to energy-efficient appliances, installing solar panels,
                      and implementing smart home technology to optimize energy
                      usage. By reducing our energy consumption, we can lower
                      our carbon footprint and save money on utility bills.
                    </h5>
                  </div>
                  <div className="flex w-full flex-col gap-4">
                    <h4 className="text-2xl font-bold">
                      Sustainable Transportation
                    </h4>
                    <h5 className="text-lg font-semibold">
                      Choosing sustainable transportation options, such as
                      walking, cycling, or using public transit, can also have a
                      significant impact on the environment. If driving is
                      necessary, consider opting for an electric or hybrid
                      vehicle to reduce your carbon emissions.
                    </h5>
                  </div>
                </div>

                {/* comment section */}
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex p-8 bg-[#fafafa] flex-col gap-8">
                    {/* single posts */}
                    <div className="flex w-full py-8 flex-col gap-4">
                      <h4 className="text-4xl font-bold">Comments</h4>
                      <div className="w-full md:w-[600px] flex flex-col gap-4">
                        {CommentData?.map((data, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-4"
                            >
                              <img
                                src="https://generated.vusercontent.net/placeholder.svg"
                                alt=""
                                className="object-cover h-[60px] w-[60px] rounded-full"
                              />
                              <h4 className="text-lg font-bold">
                                {data?.author}
                                <span className="block text-sm text-grey font-normal">
                                  {data?.shortDescription}
                                </span>
                              </h4>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                      <h4 className="text-2xl font-bold">Leave a Comment</h4>
                      <form className="w-full flex flex-col gap-4">
                        {/* <label
                        htmlFor="name"
                        className="text-lg flex flex-col gap-4 font-semibold"
                      >
                        Name
                        <input type="text" className="input" />
                      </label>
                      <label
                        htmlFor="email"
                        className="text-lg flex flex-col gap-4 font-semibold"
                      >
                        Email
                        <input type="text" className="input" />
                      </label> */}
                        <label
                          htmlFor="comment"
                          className="text-lg flex flex-col gap-4 font-semibold"
                        >
                          Comment
                          <textarea
                            type="text"
                            className="textarea h-[130px] outline-none"
                          />
                        </label>
                      </form>
                    </div>
                  </div>
                  <div className="flex pt-4">
                    <button className="btn py-3 px-8 rounded-xl text-white text-lg">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;