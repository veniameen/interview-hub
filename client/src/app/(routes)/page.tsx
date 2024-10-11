"use client";

import AiButton from "@/components/ai-button";
import { Particles } from "@/components/particles";
import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-container";
import AnimationContainer from "@/components/animation-container";
import { BorderBeam } from "@/components/ui/border-beam";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Header from "@/components/header";
import Link from "next/link";
import Footer from "@/components/footer";
import MagicBadge from "@/components/ui/magic-badge";
import { BentoGrid, BentoCard, CARDS } from "@/components/ui/bento-grid";

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="mt-20 mx-auto w-full z-0 relative">
        <div className="scrollbar-hide size-full">
          <Particles>
            <div className="absolute top-0 left-0 w-screen h-screen z-0"></div>
          </Particles>
          <MaxWidthWrapper>
            <div className="flex flex-col items-center justify-center w-full text-center bg-gradient-to-t from-background">
              <AnimationContainer className="flex flex-col items-center justify-center w-full text-center gap-8">
                <AiButton />
                <div
                  className="text-transparent sm:text-center text-start font-bold text-4xl sm:text-7xl leading-none z-10 bg-clip-text bg-gradient-to-br from-black via-neutral-800 to-black/[0.6] dark:from-white dark:via-neutral-200 dark:to-white/[0.6]"
                >
                  Интервью
                  <br />
                  нового поколения.
                </div>
                <div className="text-black dark:text-white/[0.7] sm:text-center text-start">
                  &ldquo;Автоматизируйте и оптимизируйте процесс отбора
                  кандидатов с нашим сервисом собеседований.&rdquo;
                </div>
                <div className="mt-5 w-full flex max-sm:flex-col justify-center sm:gap-10 gap-4 text-white items-center">
                  <Link href="/sign-up">
                    <RainbowButton className="px-20 items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] bg-[length:200%] text-primary-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] h-9 px-4 py-2 hidden md:inline-flex">
                      Начать
                    </RainbowButton>
                  </Link>
                </div>
              </AnimationContainer>

              <AnimationContainer
                delay={0.2}
                className="relative pt-20 pb-20 md:py-32 md:pb-10 px-2 bg-transparent w-full"
              >
                <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
                <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                  <BorderBeam size={250} duration={12} delay={9} />
                  <Image
                    src="/images/dashboard.png"
                    alt="Dashboard"
                    width={1200}
                    height={1200}
                    quality={100}
                    className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border"
                  />
                  <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
                  <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
                </div>
              </AnimationContainer>
            </div>
          </MaxWidthWrapper>

          <MaxWidthWrapper className="pt-10">
            <AnimationContainer delay={0.1}>
              <div className="flex flex-col w-full items-center lg:items-center justify-center py-8">
                <MagicBadge title="Features" />
                <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                  Управляйте интервью как профессионал
                </h2>
                <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
                  InterviewHub — это мощный инструмент для подготовки и
                  проведения собеседований, который позволяет вам создавать
                  задачи, проводить интервью с редактором кода и легко
                  организовывать процесс отбора кандидатов.
                </p>
              </div>
            </AnimationContainer>
            <AnimationContainer delay={0.2}>
              <BentoGrid className="py-8">
                {CARDS.map((feature, idx) => (
                  <BentoCard key={idx} {...feature} />
                ))}
              </BentoGrid>
            </AnimationContainer>
          </MaxWidthWrapper>
        </div>
        <Footer />
      </main>
    </div>
  );
}
