'use client';

import { useState } from "react";

export default function Home() {

  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto bg-black text-white min-h-screen">

      <header className="bg-black border border-white flex justify-between w-full p-4 mt-16 mb-16">
        <a href="#" className="hover:underline">Blog</a>
        <div>Enrique Goudet</div>
        <a href="#" className="hover:underline">Projects</a>
      </header>

      <section className="bg-black border border-white flex flex-col items-center w-full p-4 mb-16">
        <p className="mb-3">I&apos;m a developer with experience building across the stack.</p>
        <p>Most recently I&apos;ve been building ETL pipelines at PeakMetrics.</p>
      </section>

      <footer className="bg-black border border-white flex justify-center w-full p-4 space-x-4">
        <a href="https://twitter.com/enrique_goudet" className="hover:underline">twitter</a>
        <a href="https://github.com/goudete" className="hover:underline">github</a>
        <div className="relative flex items-center">
          <a href="#" className="hover:underline" onClick={(e) => {
            e.preventDefault();
            copyToClipboard('goudetenrique@gmail.com');
          }}>
            email
          </a>
          {copySuccess && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 ml-2">
              Copied!
            </div>
          )}
        </div>
      </footer>

    </div>
  );
}
