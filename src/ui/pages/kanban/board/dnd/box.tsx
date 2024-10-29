import type { CSSProperties, FC, ReactElement } from 'react'
import { memo } from 'react'
import { useDrag } from 'react-dnd'
import { Task } from '../../../../../domain/task'
import { TaskComponent } from '../task_component'



export interface BoxProps {
  task: Task,
  statusId: number
}

export const Box: FC<BoxProps> = memo(function Box({ task,  statusId }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "task",
      item: {task, statusId},
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [task],
  )

  return (
    <div ref={drag} style={{ opacity }} data-testid="box">
      <TaskComponent task={task} statusId={statusId} />
    </div>
  )
})
