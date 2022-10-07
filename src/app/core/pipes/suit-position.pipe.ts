import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'suitPosition',
})
export class SuitPositionPipe implements PipeTransform {
  transform(value: number, i: number): unknown {
    switch (value) {
      case 1:
        return 8
      case 2:
        return i === 0 ? 2 : '14 flip'
      case 3: {
        if (i === 0) return 2
        if (i === 1) return 8
        return '14 flip'
      }
      case 4: {
        if (i === 0) return 1
        if (i === 1) return 3
        if (i === 2) return '13 flip'
        return '15 flip'
      }
      case 5: {
        if (i === 0) return 1
        if (i === 1) return 3
        if (i === 2) return 8
        if (i === 3) return '13 flip'
        return '15 flip'
      }
      case 6: {
        if (i === 0) return 1
        if (i === 1) return 3
        if (i === 2) return 7
        if (i === 3) return 9
        if (i === 4) return '13 flip'
        return '15 flip'
      }
      case 7: {
        if (i === 0) return 1
        if (i === 1) return 3
        if (i === 2) return 5
        if (i === 3) return 7
        if (i === 4) return 9
        if (i === 5) return '13 flip'
        return '15 flip'
      }
      case 8: {
        if (i === 0) return 1
        if (i === 1) return 3
        if (i === 2) return 5
        if (i === 3) return 7
        if (i === 4) return 9
        if (i === 5) return '11 flip'
        if (i === 6) return '13 flip'
        return '15 flip'
      }
      case 9: {
        if (i === 0) return 1
        if (i === 1) return 3
        if (i === 2) return '4'
        if (i === 3) return '6'
        if (i === 4) return '8'
        if (i === 5) return '10 flip'
        if (i === 6) return '12 flip'
        if (i === 7) return '13 flip'
        return '15 flip'
      }
      case 10: {
        if (i === 0) return 1
        if (i === 1) return 3
        if (i === 2) return '4'
        if (i === 3) return '6'
        if (i === 4) return '7'
        if (i === 5) return '9 flip'
        if (i === 6) return '10 flip'
        if (i === 7) return '12 flip'
        if (i === 8) return '13 flip'
        return '15 flip'
      }
      default: {
        return 0
      }
    }
  }
}
