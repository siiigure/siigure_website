export default function Home() {
  return (
    <>
      {/* 顶部栏：名字（左） + 社交（右） */}
      <div className="relative min-h-screen">
        <div className="mono-55 absolute top-24 whitespace-nowrap text-2xl font-semibold leading-none md:text-4xl lg:top-14 lg:text-[40px]">
          <div className="pb-2.5 md:pb-3 lg:pb-3.5">Hi, I'm siigure.</div>
          <div className="pb-0.5 text-sm font-normal md:pb-1 md:text-lg lg:pb-1.5 lg:text-xl">
            I'm learning front-end development and design, gradually moving
            toward full-stack.
          </div>
          <div className="pb-2.5 md:pb-3 lg:pb-3.5">
            I aim to find a balance between clean, elegant code and engaging,
            lively interactions — creating code that feels like art and
            interfaces that are fun to use. Outside of coding, I spend time
            watching movies, reading novels, and occasionally capturing small,
            unplanned moments with my Polaroid.
          </div>
        </div>
      </div>
    </>
  );
}
