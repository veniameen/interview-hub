'use client'
import { Lights } from '@/components/lights'
// import Interview from "@/components/Interview/interview";
import AiButton from '@/components/ai-button'
import ShiningButton from '@/components/shiningButton'
import Header from '@/components/header'
import { Particles } from '@/components/particles'

export default function Home() {
  return (
    <div>
      <div className='bg-black w-full h-screen block'>
        <Particles>
          <Header />
          <div className={'w-full h-full relative  bg-grid-white/[0.03] px-4'}>
            <div
              className={
                'w-full h-full flex flex-col sm:items-center items-start justify-center relative z-[1] animate-moveUp gap-4'
              }
            >
              <div className='relative w-full flex justify-center'>
                <AiButton />
              </div>
              <div
                className={
                  'text-transparent sm:text-center text-start font-bold sm:text-7xl text-4xl bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-black/[0.6] leading-none z-10'
                }
              >
                Собеседования
                <br />
                нового поколения.
              </div>
              <div className='text-white/[0.7] sm:text-center text-start'>
                &ldquo;Автоматизируйте и оптимизируйте процесс отбора кандидатов с нашим сервисом собеседований.&rdquo;
              </div>
              <div className='mt-5 w-full flex max-sm:flex-col justify-center sm:gap-10 gap-4 text-white items-center'>
                <ShiningButton label='начать' />
                <button className='h-8 flex items-center justify-center underline'>
                  <span>как это работает?</span>
                </button>
              </div>
            </div>
            <div className={'absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0'}>
              <Lights />
            </div>
          </div>
        </Particles>
      </div>
      {/* <Interview /> */}
    </div>
  )
}
