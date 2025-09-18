'use server';
/**
 * @fileOverview An automated task approval AI agent.
 *
 * - approveTask - A function that handles the task approval process.
 * - ApproveTaskInput - The input type for the approveTask function.
 * - ApproveTaskOutput - The return type for the approveTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ApproveTaskInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
  rewardAmount: z.number().describe('The reward amount for the task.'),
  taskPosterAccountHistory: z.string().describe('The account history of the task poster.'),
});
export type ApproveTaskInput = z.infer<typeof ApproveTaskInputSchema>;

const ApproveTaskOutputSchema = z.object({
  approved: z.boolean().describe('Whether or not the task is approved.'),
  reason: z.string().describe('The reason for the approval or rejection.'),
});
export type ApproveTaskOutput = z.infer<typeof ApproveTaskOutputSchema>;

export async function approveTask(input: ApproveTaskInput): Promise<ApproveTaskOutput> {
  return approveTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'approveTaskPrompt',
  input: {schema: ApproveTaskInputSchema},
  output: {schema: ApproveTaskOutputSchema},
  prompt: `You are an expert task approval agent.

You will use this information to determine whether the task should be approved or rejected.

Consider the task description, reward amount, and task poster\'s account history.

Task Description: {{{taskDescription}}}
Reward Amount: {{{rewardAmount}}}
Task Poster Account History: {{{taskPosterAccountHistory}}}

Based on these factors, determine whether the task is appropriate and should be approved.

Set the \"approved\" output field to true if the task is approved, and false if it is rejected.

Provide a clear and concise reason for your decision in the \"reason\" output field.`,
});

const approveTaskFlow = ai.defineFlow(
  {
    name: 'approveTaskFlow',
    inputSchema: ApproveTaskInputSchema,
    outputSchema: ApproveTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
