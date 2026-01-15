import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[300vh] flex-col items-center justify-start p-24 bg-zinc-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Welcome to Portfolio V2</h1>
      </div>

      <div className="mt-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="#"
          className="link group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Projects{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Check out the cool animations on this card.
          </p>
        </a>

        <a
          href="#"
          className="link group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            About{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Scroll down to see the progress bar in action.
          </p>
        </a>
      </div>

      <div className="mt-96 text-center">
        <p>Keep scrolling...</p>
      </div>

      <div className="mt-96 text-center">
        <p>Almost there...</p>
      </div>

      <div className="mt-96 text-center">
        <p>Bottom of the page!</p>
      </div>
    </main>
  );
}
