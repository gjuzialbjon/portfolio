import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'valueToText',
})
export class ValueToTextPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if (value == 1) return 'A'
    if (value == 11) return 'J'
    if (value == 12) return 'Q'
    if (value == 13) return 'K'
    return value
  }
}
