export default function Header() {
  return <div className="absolute top-0 left-0 w-full py-6 z-20">
    <nav className="grid grid-cols-1 justify-between items-center lg:flex lg:flex-row lg:gap-6 xl:gap-12 xl:text-lg w-[80%] m-auto">
        <div className="h-10 flex flex-1 items-center justify-between lg:justify-start select-none w-full lg:w-min gap-3 md:gap-6 lg:gap-8">
            <a href="" className="flex items-center flex-none gap-4 text-white">
                InterviewHub
            </a>
        </div>
        <div className="hidden flex-col w-full mx-2 mt-5 gap-x-4 gap-y-4 lg:flex lg:flex-row lg:items-center lg:mx-0 lg:mt-0">
            <div className="flex flex-col leading-loose divide-incl-y lg:flex-row lg:gap-x-4 lg:select-none lg:divide-incl-y-0 text-white">
                о нас
            </div>
            <div className="flex flex-col leading-loose divide-incl-y lg:flex-row lg:gap-x-4 lg:select-none lg:divide-incl-y-0 text-white">
                как это работает? 
            </div>
            <div className="flex flex-col lg:flex-row grow gap-4 lg:items-center lg:justify-end text-white">
                войти
            </div>
        </div>
    </nav>
  </div>;
}
