'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
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
        <Link className="hover:text-emerald-400" href="/blog">Blog</Link>
        <Link className={`hover:text-emerald-400 ${pathname === `/` ? `text-emerald-400` : ``}`} href="/">Enrique Goudet</Link>
        <Link className="hover:text-emerald-400" href="/about">About</Link>
      </header>

      <section className="bg-black border border-white flex flex-col w-full p-4 mb-16">
        <p className="mb-3">
          I&apos;m a developer with experience building across the stack. I have built products used by government agencies, enterprises, startups and consumers.
        </p>
        <p>Currently building <a className="text-emerald-400 hover:text-emerald-300" href="https://hello-cluster.com">cluster,</a> a tool that automates code documentation.</p>
      </section>

      <footer className="bg-black border border-white flex justify-center w-full p-4 space-x-4">
        <a href="https://twitter.com/enrique_goudet" className="hover:text-emerald-400">twitter</a>
        <a href="https://github.com/goudete" className="hover:text-emerald-400">github</a>
        <div className="relative flex items-center">
          <a href="#" className="hover:text-emerald-400" onClick={(e) => {
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
