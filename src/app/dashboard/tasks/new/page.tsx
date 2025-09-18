import TaskForm from "./components/task-form";

export default function NewTaskPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold font-headline md:text-3xl">
          Create a New Task
        </h1>
      </div>
      <TaskForm />
    </div>
  );
}
