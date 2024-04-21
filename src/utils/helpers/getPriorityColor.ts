import { PriorityType } from 'src/shared/enums/PriorityType.enum'

export const getPriorityColor = (value: PriorityType) => {
  switch (value) {
    case PriorityType.LOW:
      return '#5084ff87'
    case PriorityType.MEDIUM:
      return 'rgb(255 197 60 / 56%)'
    case PriorityType.HIGH:
      return 'rgb(248 74 41 / 56%)'
    default:
      return 'primary'
  }
}

// #dfa825
