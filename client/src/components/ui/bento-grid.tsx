import { Calendar } from "@/components/ui/calendar";
import { Command } from "@/components/ui/command";
import { cn } from "@/shared/lib/utils";
import { CalendarIcon, Link2Icon, SearchIcon, WaypointsIcon } from "lucide-react";
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Integrations } from "./integrations";
import { Label } from "./label";

export const CARDS = [
    {
        Icon: Link2Icon,
        name: "Гибкие задачи",
        description: "Создавайте и настраивайте уникальные задачи для каждого кандидата, адаптированные под специфику позиции.",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Card className="absolute top-10 left-10 origin-top rounded-none rounded-tl-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105 border border-border border-r-0">
                <CardHeader>
                    <CardTitle>
                        Создавайте задачи
                    </CardTitle>
                    <CardDescription>
                        Легко создавайте задачи, подходящие под ваши требования.
                    </CardDescription>
                </CardHeader>
                <CardContent className="-mt-4">
                    <Label>
                        Введите описание задачи
                    </Label>
                    <Input
                        type="text"
                        placeholder="Введите описание задачи здесь..."
                        className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
                    />
                </CardContent>
            </Card>
        ),
    },
    {
        Icon: SearchIcon,
        name: "Поиск кандидатов",
        description: "Быстро находите нужных кандидатов с помощью умного поиска.",
        href: "#",
        cta: "Узнать больше",
        className: "col-span-3 lg:col-span-2",
        background: (
            <Command className="absolute right-10 top-10 w-[70%] origin-to translate-x-0 border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10 p-2">
                <Input placeholder="Введите имя или навыки кандидата..." />
                <div className="mt-1 cursor-pointer">
                    <div className="px-4 py-2 hover:bg-muted rounded-md">Иван Иванов</div>
                    <div className="px-4 py-2 hover:bg-muted rounded-md">Екатерина Смирнова</div>
                    <div className="px-4 py-2 hover:bg-muted rounded-md">Петр Петров</div>
                    <div className="px-4 py-2 hover:bg-muted rounded-md">Алексей Сидоров</div>
                    <div className="px-4 py-2 hover:bg-muted rounded-md">Анна Кузнецова</div>
                </div>
            </Command>
        ),
    },
    {
        Icon: WaypointsIcon,
        name: "Интеграции",
        description: "Интегрируйте InterviewHub с сервисом подбора резюме.",
        href: "#",
        cta: "Узнать больше",
        className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
        background: (
            <Integrations className="absolute right-2 pl-28 md:pl-0 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    {
        Icon: CalendarIcon,
        name: "Календарь",
        description: "Следите за запланированными собеседованиями с помощью нашего календаря.",
        className: "col-span-3 lg:col-span-1",
        href: "#",
        cta: "Узнать больше",
        background: (
            <Calendar
                mode="single"
                selected={new Date(2024, 9, 11, 0, 0, 0)}
                className="absolute right-0 top-10 origin-top rounded-md border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
            />
        ),
    },
];


const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
}: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: any;
    description: string;
}) => (
    <div
        key={name}
        className={cn(
            "group relative col-span-3 flex flex-col justify-between border border-border/60 overflow-hidden rounded-xl",
            "bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            className,
        )}
    >
        <div>{background}</div>
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <Icon className="h-12 w-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
            <h3 className="text-xl font-semibold text-neutral-300">
                {name}
            </h3>
            <p className="max-w-lg text-neutral-400">{description}</p>
        </div>
        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
);

export { BentoCard, BentoGrid };
