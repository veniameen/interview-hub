"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMediaQuery } from "@/shared/lib/hooks/use-media-query";

const candidateSchema = z.object({
  name: z.string().min(1, { message: "Имя обязательно" }),
  email: z.string().email({ message: "Неверный формат email" }),
  description: z.string().min(1, { message: "Описание обязательно" }),
  resumeLink: z.string().url({ message: "Неверный формат ссылки" }),
  status: z.string().min(1, { message: "Выберите статус" }),
  createdAt: z.date(),
});

const CandidateForm = ({ onSubmit }: { onSubmit: (candidateData: any) => void }) => {
  const form = useForm({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      resumeLink: "",
      status: "",
      createdAt: new Date(),
    },
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Введите имя кандидата" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Введите email кандидата" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Введите описание кандидата"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resumeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на резюме</FormLabel>
              <FormControl>
                <Input placeholder="Введите ссылку на резюме" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <Select items={[{
                title: "Новый",
                value: "new"
              }, {
                title: "Интервью",
                value: "interview"
              }, {
                title: "Предложение",
                value: "offer"
              }, {
                title: "Нанят",
                value: "hired"
              }, {
                title: "Отклонен",
                value: "rejected"
              }]} onChange={field.onChange} value={field.value} placeholder="Выберите статус"/>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Добавить кандидата</Button>
      </form>
    </Form>
  );
};

const AddCandidateDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (candidateData: any) => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[50%]">
          <DialogHeader>
            <DialogTitle>Добавить кандидата</DialogTitle>
            <DialogDescription>
              Заполните поля для добавления нового кандидата
            </DialogDescription>
          </DialogHeader>
          <CandidateForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Добавить кандидата</DrawerTitle>
          <DrawerDescription>
            Заполните поля для добавления нового кандидата
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-4">
          <CandidateForm onSubmit={onSubmit} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const EmptyState = () => {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Вы еще не добавили кандидатов
        </h3>
        <p className="text-sm text-muted-foreground">
          Вы можете добавить кандидатов, нажав кнопку ниже.
        </p>
        <Button className="mt-4">Добавить кандидата</Button>
      </div>
    </div>
  )
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(date));
};

const CandidatesList = ({ candidates }: { candidates: any[] }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddCandidate = (candidateData: any) => {
    console.log("новый кандидат:", candidateData);
    setIsDrawerOpen(false);
  };
  
  return (
    <main className="grid flex-1 items-start gap-4 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="new">Новые</TabsTrigger>
            <TabsTrigger value="interview">Интервью</TabsTrigger>
            <TabsTrigger value="offer">Предложение</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button
              className="gap-1"
              onClick={() => setIsDrawerOpen(true)}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Добавить кандидата
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Кандидаты</CardTitle>
              <CardDescription>
                Управление кандидатами и их статусами.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Имя</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Дата создания
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{candidate.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(candidate.createdAt)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem>Редактировать</DropdownMenuItem>
                            <DropdownMenuItem>Удалить</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Показано <strong>{candidates.length}</strong> кандидатов
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <AddCandidateDialog
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleAddCandidate}
      />
    </main>
  );
};

const candidates = [
  {
    name: "Вениамин Ряднов",
    email: "veniamin@sberbank.ru",
    status: "Интервью",
    createdAt: "2024-02-15T10:30:00",
  },
  // Add more candidates here...
];

export default function Candidates() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Кандидаты</h1>
      </div>
      {candidates.length ? (
        <CandidatesList candidates={candidates} />
      ) : (
        <EmptyState />
      )}
    </>
  );
}