'use client';

export default function Home() {
  return (
    <main className="flex min-h-[300vh] flex-col items-center justify-start p-24 bg-zinc-950 text-white">
      <div className="z-10 max-w-5xl w-full flex-col items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-12 text-center lg:text-left">Premium Cursor Interaction</h1>

        {/* HERO SECTION FOR TESTING CURSOR */}
        <div className="flex flex-col gap-8 items-center lg:items-start mb-24 z-50">
          <button
            className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-xl font-light tracking-wide"
            data-magnetic="true"
            data-cursor="CLICK"
          >
            Magnetic Button
          </button>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              data-cursor="LINK"
            >
              Hover Link
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              data-cursor="OPEN"
            >
              Another Link
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center max-w-2xl">
        <p className="text-xl opacity-60 leading-relaxed">
          Move your mouse around. Notice the <span className="text-white font-medium" data-cursor="READ">inertia</span>.
          Hover over the buttons to feel the <span className="text-white font-medium" data-cursor="PULL">magnetism</span>.
        </p>
      </div>

      <div className="mt-96 text-center">
        <p className="opacity-50" data-cursor="SCROLL">Scroll down to see the progress bar...</p>
      </div>

      <div className="mt-96 text-center">
        <p className="opacity-30">Keep scrolling...</p>
      </div>
    </main>
  );
}
