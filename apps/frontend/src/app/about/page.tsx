import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function About() {
  return (
    <div className="justify-center gap-8 grid mx-auto my-8 p-2 container">
      <ul className="flex gap-2">
        <Link href="#english">
          {" "}
          <li className={cn(buttonVariants({ variant: "outline" }))}>
            English
          </li>
        </Link>
        <Link href="#viet">
          <li className={cn(buttonVariants({ variant: "outline" }))}>
            Tiếng Việt
          </li>
        </Link>
        <Link href="#french">
          <li className={cn(buttonVariants({ variant: "outline" }))}>
            Français
          </li>
        </Link>
      </ul>

      <section
        id="english"
        className="bg-gray-50 p-4 pb-12 rounded-xl max-w-4xl prose"
      >
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
          I&apos;m a software developer (currently a computer science student)
          who likes to push the limits and break the glass ceiling or whatever
          the expression is.
        </p>

        <p>
          I have had an innate interests in politics, military, and government.
          However, a bit of a long time ago, I was disillusioned by the reality
          of how politics work. Then again, it is the nature of politics.
        </p>

        <p>
          Still, that passion in me, coupled with the fact that I love my late
          granddad&apos;s wartime stories, has fueled this project. I want to
          build something that solves my annoyance whenever I want to query
          information on politics, government and military positions.
        </p>

        <p>
          I hope it&apos;ll help a fellow nerd out if they ever come across this
          site on their journey down the rabbit hole.
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

      <section
        id="viet"
        className="bg-gray-50 p-4 pb-12 rounded-xl max-w-4xl prose"
      >
        <blockquote>
          Phần tiếng Việt sau đây được dịch bằng DeepL. Vì dạo này tiếng Việt
          mình hơi lủng củng. 🥹
        </blockquote>

        <h1>PolitBuro</h1>

        <h2>Miễn trừ trách nhiệm</h2>

        <p>
          Thông tin được trình bày trên trang này <strong>có thể không</strong>{" "}
          chính xác hoặc không được cập nhật đúng lúc và nên được xem là nguồn
          thứ cấp hoặc thậm chí là cấp ba.
        </p>

        <h2>Giới thiệu</h2>

        <p>Xin chào,</p>

        <p>
          Tôi tên là Anh. Tôi là lập trình viên phần mềm (hiện đang là sinh viên
          ngành khoa học máy tính) và thích vượt qua giới hạn, phá bỏ “trần
          kính” hay gì đó đại loại vậy.
        </p>

        <p>
          Tôi có niềm đam mê bẩm sinh với chính trị, quân sự và chính quyền. Tuy
          nhiên, đã từ lâu tôi bị vỡ mộng với thực tế cách chính trị vận hành.
          Nhưng đó cũng là bản chất của chính trị.
        </p>

        <p>
          Dù vậy, đam mê ấy, cộng với việc tôi rất yêu thích những câu chuyện
          thời chiến của ông tôi, đã thúc đẩy tôi thực hiện dự án này. Tôi muốn
          xây dựng thứ gì đó để giải quyết sự khó chịu mỗi khi tôi muốn tra cứu
          thông tin về các vị trí trong chính trị, chính quyền và quân đội.
        </p>

        <p>
          Tôi hy vọng nó sẽ giúp ích cho ai đó có cùng sở thích khi họ tình cờ
          ghé qua trang này trong hành trình khám phá của mình.
        </p>

        <p>
          Trân trọng,
          <br />
          Anh.
        </p>

        <h2>Bộ chính trị là gì?</h2>

        <p>Là từ ghép giữa "chính trị" và "văn phòng".</p>

        <p>
          Dù từ này từng được khối phương Tây dùng với hàm ý tiêu cực để mô tả
          chính phủ chính trị cộng sản trong thời kỳ Chiến tranh Lạnh, nó vẫn có
          âm hưởng mạnh mẽ và chúng ta nên sở hữu luôn thuật ngữ đó. Ngôn ngữ tự
          nhiên luôn thay đổi theo thời gian. Vì vậy, tôi dùng nó như một cách
          gọi mang tính tán dương cho trang web này.
        </p>

        <p>
          Thậm chí, theo định nghĩa gốc, một số chính phủ phương Tây hiện nay
          cũng gần như là hiện thân của thuật ngữ này. 🤷‍♀️
        </p>
      </section>
      <section
        id="french"
        className="bg-gray-50 p-4 pb-12 rounded-xl max-w-4xl prose"
      >
        <h1>Politburo</h1>

        <h2>Avertissement</h2>

        <p>
          Les informations présentées sur ce site{" "}
          <strong>peuvent ne pas</strong> être exactes ni mises à jour en temps
          réel et doivent être considérées comme une source secondaire, voire
          tertiaire.
        </p>

        <h2>À propos</h2>

        <p>Bonjour,</p>

        <p>
          Je m&apos;appelle Anh. Je suis développeuse logiciel (actuellement
          étudiante en informatique) et j&apos;aime repousser les limites et
          briser le plafond de verre ou peu importe l&apos;expression.
        </p>

        <p>
          J&apos;ai toujours eu un intérêt inné pour la politique, l&apos;armée
          et le gouvernement. Cependant, il y a longtemps, j&apos;ai été
          désillusionnée par la réalité du fonctionnement de la politique. Mais
          après tout, c&apos;est dans la nature de la politique.
        </p>

        <p>
          Malgré tout, cette passion en moi, combinée à mon amour pour les
          histoires de guerre de mon grand-père aujourd&apos;hui décédé, a
          alimenté ce projet. Je veux créer quelque chose qui résout mon
          irritation chaque fois que je cherche des informations sur les postes
          politiques, gouvernementaux et militaires.
        </p>

        <p>
          J&apos;espère que cela pourra aider un·e autre passionné·e s&apos;il
          ou elle tombe sur ce site au cours de ses recherches.
        </p>

        <p>
          Merci,
          <br />
          Anh.
        </p>

        <h2>Qu&apos;est-ce qu&apos;un politburo ?</h2>

        <p>Mot-valise de politique et bureau.</p>

        <p>
          Même si le terme était utilisé de façon péjorative par le bloc
          occidental pour décrire les gouvernements communistes pendant la
          guerre froide, il sonne bien et il est temps de se réapproprier cette
          terminologie. La langue évolue naturellement avec le temps. Je
          l&apos;utilise donc ici comme un terme valorisant pour ce site.
        </p>

        <p>
          En fait, selon la définition originale, certains gouvernements
          occidentaux incarnent littéralement ce terme de nos jours. 🤷‍♀️
        </p>
      </section>
      <footer>
        © Anh H. Nguyen, 2025. I am a citizen, but this site is not affiliated
        with the Government of Vietnam.
      </footer>
    </div>
  );
}
