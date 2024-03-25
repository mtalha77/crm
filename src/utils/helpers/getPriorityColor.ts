import { PriorityType } from 'src/shared/enums/PriorityType.enum'

export const getPriorityColor = (value: PriorityType) => {
  switch (value) {
    case PriorityType.LOW:
      return 'primary'
    case PriorityType.MEDIUM:
      return 'warning'
    case PriorityType.HIGH:
      return '#FF6347'
    default:
      return 'primary'
  }
}
