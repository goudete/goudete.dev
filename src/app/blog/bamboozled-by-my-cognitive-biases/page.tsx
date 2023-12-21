'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <Link className={`hover:text-emerald-400 ${pathname === `/blog` ? `text-emerald-400` : ``}`} href="/blog">Blog</Link>
        <Link className="hover:text-emerald-400" href="/">Enrique Goudet</Link>
        <Link className="hover:text-emerald-400" href="/about">About</Link>
      </header>

      <section className="bg-black border border-white flex flex-col w-full p-4 mb-4">
        <div className="text-2xl font-medium">Bamboozled by my Cognitive Biases</div>

        <div className="text-slate-200 mt-6">
          After recently reading <Link className="text-emerald-400 hover:text-emerald-300" href="https://www.stripe.press/poor-charlies-almanack/cover">&quot;Poor Charlie&apos;s Almanack&quot;</Link>, I have developed a strong interest in cognitive biases. Actively studying them has made me more aware of their presence in my daily life.
        </div>

        <div className="text-slate-200 mt-3">
          One such example, much to my dismay, was when I found myself bamboozled by a skilled <Link className="text-emerald-400 hover:text-emerald-300" href="https://www.clearme.com/">Clear</Link> salesman at the airport. This salesman effectively used a set of techniques that targeted my cognitive biases. What concerned me the most was that I observed myself willingly providing my fingerprints, retina scan, and driver&apos;s license.
        </div>
        <div className="text-slate-200 mt-3">
          The following is an account of the situation along with the cognitive biases he targeted.
        </div>

        <div className="text-slate-200 mt-8 text-lg font-medium">
          Act I - Self-serving tendency
        </div>
        <div className="text-slate-200 mt-3">
          I was going up the electric stairs to enter the security screening line when he stood next to me and said: “do you want to skip the line?”
        </div>
        <div className="text-slate-200 mt-3">
          This was a great hook because it targeted the self-serving tendency. Of course I wanted to skip the line. He appealed to my interest and not my reason.
        </div>
        <div className="text-slate-200 mt-3">
          And the timing was perfect. He asked just as I experienced the peak of the discomfort curve as I saw the long line ahead of me. Almost without thinking, I immediately responded yes.
        </div>

        <div className="text-slate-200 mt-8 text-lg font-medium">
          Act II - Authority mis-influence tendency
        </div>
        <div className="text-slate-200 mt-3">
          Immediately after agreeing, he stated “follow me this way”.

          This framed him as an authority figure which targeted the authority mis-influence tendency.

          He led me to a clear kiosk strategically placed next to the security screening line and he began the onboarding flow.
        </div>

        <div className="text-slate-200 mt-8 text-lg font-medium">
          Act III - Inconsistency-avoidance tendency
        </div>
        <div className="text-slate-200 mt-3">
          He impatiently entered my information into the kiosk and acted very casual when the kiosk asked for my fingerprints, retina and driver&apos;s license.
        </div>
        <div className="text-slate-200 mt-3">
          I had already committed to doing it so the inconsistency-avoidance tendency made me stick through it, even when that meant scanning my fingerprints, retina, and entering my driver&apos;s license!
        </div>
        <div className="text-slate-200 mt-3">
          The combined effect of the authority mis-influence tendency plus the inconsistency-avoidance tendency made me powerless to handing over my private information to some random person at the airport.
        </div>

        <div className="text-slate-200 mt-8 text-lg font-medium">
          Act IV - Full Circle
        </div>
        <div className="text-slate-200 mt-3">
          I was so shocked that I had complied with him that immediately after, I acknowledged his masterful work and asked “you are getting commission right”? To which he responded “yes”, with a cheeky smile.
        </div>
        <div className="text-slate-200 mt-3">
          Little did he know we were both influenced by the same tendency.
        </div>
        <div className="text-slate-200 mt-3">
          His bosses incentivized him with commission per user sign up knowing full well the power of the self-serving tendency.
        </div>

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
