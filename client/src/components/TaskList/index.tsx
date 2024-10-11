import { Badge } from "../ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Task {
  title: string;
  author: string;
  description: string;
  tags: { text: string; }[];
}

const TaskItem = ({ task }: { task: Task }) => (
  <button className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent w-full">
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{task.title}</div>
        </div>
      </div>
    </div>
    <div className="line-clamp-2 text-xs text-muted-foreground">
      {task.description}
    </div>
    <div className="flex items-center gap-2">
      {task.tags.map((tag, index) => (
        <Badge key={index} variant="outline">
          {tag.text}
        </Badge>
      ))}
    </div>
  </button>
);

export const TaskList = ({ tasks }: { tasks: Task[] }) => (
  <ScrollArea className="h-[calc(100vh-180px)]">
    <div className="flex flex-col gap-2 py-4 pt-0">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </div>
  </ScrollArea>
);
