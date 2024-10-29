import type { CSSProperties, FC, ReactElement } from 'react'
import { memo } from 'react'
import { useDrop } from 'react-dnd'
import { Status } from '../../../../../domain/status'
import { StatusComponent } from '../status_component'

export interface DustbinProps {
  accept: string[]
  lastDroppedItem?: any
  onDrop: (item: any, monitor: any) => void,
  status: Status
}

export const Target: FC<DustbinProps> = memo(function Dustbin({
  accept,
  lastDroppedItem,
  onDrop,
  status
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div className="kanban-board" style={{ width: "250px", marginLeft: "12px", marginRight: "12px" }} ref={drop}>
      <StatusComponent status={status} />
    </div>
  )
})
