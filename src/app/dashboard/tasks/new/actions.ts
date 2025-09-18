"use server";

import { approveTask, type ApproveTaskInput } from '@/ai/flows/task-approval';

export async function handleTaskApproval(data: ApproveTaskInput) {
  try {
    const result = await approveTask(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An unexpected error occurred while processing the task approval.' };
  }
}
