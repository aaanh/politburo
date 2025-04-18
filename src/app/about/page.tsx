import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { GlobeIcon } from "lucide-react";

export default function About() {
  return (
    <div className="flex justify-center mx-auto my-8 container">
      <section className="bg-gray-50 p-4 pb-12 rounded-xl max-w-4xl prose">
        <h1>PolitBuro</h1>

        <h2>Disclaimer</h2>

        <p>
          Information presented on this site <strong>may not</strong> be
          accurate nor properly updated in real time and should be ultimately
          considered as a secondary, tertiary even, source.
        </p>

        <h2>What is a politburo?</h2>

        <p>Portmanteau of political and bureau.</p>

        <p>
          Even though it was used more or less of a less-than-pretty term by the
          western bloc to describe communist political government during the
          cold war era, it has a good ring to it and we gotta own the
          terminology. The natural language naturally evolves throughout the
          time. So, I use it as a flattering term for the site.
        </p>

        <p>
          Heck, according to the original definition, some western governments
          are quite literally the embodiment of the term nowadays. 🤷‍♀️
        </p>

        <h2>About the author</h2>

        <p>Hello,</p>

        <Card className="w-fit">
          <CardContent className="gap-4 grid grid-cols-[1fr_3fr]">
            <div>
              <Image
                className="rounded-full"
                width={100}
                height={100}
                alt="anh-photo"
                src="https://avatars.githubusercontent.com/u/37283437?s=400&u=f23eff00d6e9334cd02aca3473e01e4c1ad0723a&v=4"
              />
            </div>
            <div className="p-4">
              My name is <h1 className="font-extralight">Anh H. Nguyen</h1>
              <div className="flex flex-wrap gap-4">
                <a href="https://aaanh.com">
                  <GlobeIcon />
                </a>
                <a href="https://github.com/aaanh">
                  <SiGithub />
                </a>

                <a href="https://linkedin.com/in/aaanh">Linkedin</a>
              </div>
            </div>
          </CardContent>
        </Card>

        <p>
          I'm a software developer (currently a computer science student) who
          likes to push the limits and break the glass ceiling or whatever the
          expression is.
        </p>

        <p>
          I have had an innate interests in politics, military, and government.
          However, a bit of a long time ago, I was disillusioned by the reality
          of how politics work. Then again, it is the nature of politics.
        </p>

        <p>
          Still, that passion in me, coupled with the fact that I love my late
          granddad's wartime stories, has fueled this project. I want to build
          something that solves my annoyance whenever I want to query
          information on politics, government and military positions.
        </p>

        <p>
          I hope it'll help a fellow nerd out if they ever come across this site
          on their journey down the rabbit hole.
        </p>

        <p>
          Thanks,
          <br />
          Anh.
        </p>

        <h2>About the site</h2>

        <blockquote className="text-muted-foreground">
          <p>
            <b>PSA</b>: This site is vibe-coded up to 50% with Cursor, where
            more specific, context-agnostic adjustments are done with GPT-4o.
          </p>
          <p>
            <b>Post-mortem</b>: It is extremely good at development velocity.
            But, I have to manually fix A LOT OF generated codes.
          </p>
        </blockquote>

        <h3>Tech stack</h3>
        <ul className="grid grid-cols-2">
          <li>Nextjs</li>
          <li>Tailwindcss</li>
          <li>Shadcn UI</li>
          <li>Drizzle ORM</li>
          <li>Neon postgresql</li>
          <li>i18next + i18nexus</li>
          <li>Vercel</li>
          <li>Cloudflare</li>
        </ul>
      </section>
    </div>
  );
}
