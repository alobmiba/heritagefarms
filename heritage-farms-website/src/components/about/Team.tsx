'use client';

import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: "Lead Grower",
    role: "Heritage Crops Specialist",
    image: "/branding/images/team/1.jpg",
    description: "Expert in traditional West African and Caribbean farming methods, ensuring our heritage crops thrive in Ontario's climate."
  },
  {
    id: 2,
    name: "Operations Manager",
    role: "Farm Operations",
    image: "/branding/images/team/2.jpg",
    description: "Oversees sustainable farming practices and ensures our community has consistent access to fresh heritage greens."
  }
];

export default function Team() {
  return (
    <>
      <div className="flex flex-wrap mx-[-15px] !mb-3">
        <div className="md:w-10/12 lg:w-10/12 xl:w-9/12 xxl:w-7/12 w-full flex-[0_0_auto] !px-[15px] max-w-full !mx-auto !text-center">
          <div className="!w-[2.6rem] !h-[2.6rem] !mb-4 m-[0_auto] bg-[#3A7817] rounded-full flex items-center justify-center">
            <span className="text-white text-xl">👥</span>
          </div>
          <h2 className="!text-[calc(1.305rem_+_0.66vw)] font-bold xl:!text-[1.8rem] !leading-[1.3] !mb-3 xl:!px-[4.5rem] lg:!px-[4.5rem]">
            Meet our dedicated team of heritage crop specialists and sustainable farming experts.
          </h2>
        </div>
        {/*/column */}
      </div>
      {/*/.row */}
      <div className="!relative">
        <div
          className="shape !rounded-[50%] !bg-[#EAFDE7] rellax !w-[6rem] !h-[6rem] absolute z-[1]"
          data-rellax-speed={1}
          style={{ bottom: "0.5rem", right: "-1.7rem" }}
        />
        <div
          className="shape !rounded-[50%] bg-line red rellax !w-[6rem] !h-[6rem] absolute z-[1] opacity-50"
          data-rellax-speed={1}
          style={{ top: "0.5rem", left: "-1.7rem" }}
        />
        <div className="flex flex-wrap mx-[-15px] xl:mx-[-35px] lg:mx-[-20px]">
          {teamMembers.map((member) => (
            <div key={member.id} className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] xl:!px-[35px] lg:!px-[20px] !px-[15px] !mt-[50px] max-w-full">
              <div className="item-inner">
                <div className="card">
                  <div className="card-body p-[40px]">
                    <Image
                      className="rounded-[50%] !w-[5rem] !mb-4"
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                    />
                    <h4 className="mb-1">{member.name}</h4>
                    <p className="text-muted mb-3">{member.role}</p>
                    <p className="mb-0">{member.description}</p>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.item-inner */}
            </div>
          ))}
        </div>
        {/* /.row */}
      </div>
      {/* /.relative */}
    </>
  );
}
