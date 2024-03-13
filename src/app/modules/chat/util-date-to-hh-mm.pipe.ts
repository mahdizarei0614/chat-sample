import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utilDateToHhMm',
  standalone: true,
})
export class UtilDateToHhMmPipe implements PipeTransform {
  transform(value: Date): string {
    return value
      .toTimeString()
      .split(' ')[0]
      .split(':')
      .slice(0, 2)
      .map((s) => s.padStart(2, '0'))
      .join(':');
  }
}
