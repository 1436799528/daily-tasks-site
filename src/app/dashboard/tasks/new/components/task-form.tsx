"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { handleTaskApproval } from "../actions";
import { Loader2, PartyPopper, ThumbsDown } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { ApproveTaskOutput } from "@/ai/flows/task-approval";
import Link from "next/link";

const formSchema = z.object({
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  reward: z.coerce.number().min(1, {
    message: "Reward must be at least $1.",
  }),
  history: z.string().min(10, {
    message: "Please provide a brief account history or context.",
  }),
});

export default function TaskForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [approvalResult, setApprovalResult] = useState<ApproveTaskOutput | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      reward: 10,
      history: "This user has a good history of posting and paying for tasks on time. No issues reported.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setApprovalResult(null);

    const result = await handleTaskApproval({
      taskDescription: values.description,
      rewardAmount: values.reward,
      taskPosterAccountHistory: values.history,
    });
    
    setIsSubmitting(false);

    if (result.success && result.data) {
      setApprovalResult(result.data);
    } else {
      setApprovalResult({
        approved: false,
        reason: result.error || "An unknown error occurred."
      });
    }
    setShowResultDialog(true);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>
            Fill out the details below. Our AI assistant will review it for approval.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Design a modern and minimalist logo for a tech startup..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be as detailed as possible to get the best results.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reward Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50" {...field} />
                    </FormControl>
                    <FormDescription>
                      The amount you will pay for the completed task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Poster Account History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Long-time user with positive feedback..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide context for the AI approver. This is for simulation purposes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Submitting for Approval..." : "Submit Task"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center justify-center mb-4">
              {approvalResult?.approved ? (
                 <PartyPopper className="w-16 h-16 text-green-500" />
              ) : (
                <ThumbsDown className="w-16 h-16 text-destructive" />
              )}
            </div>
            <AlertDialogTitle className="text-center font-headline text-2xl">
              {approvalResult?.approved ? "Task Approved!" : "Task Not Approved"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {approvalResult?.reason}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              {approvalResult?.approved ? (
                <Link href="/dashboard">Back to Dashboard</Link>
              ) : (
                <Button onClick={() => setShowResultDialog(false)}>Try Again</Button>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
