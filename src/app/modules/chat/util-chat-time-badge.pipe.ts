import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utilChatTimeBadge',
  standalone: true,
})
export class UtilChatTimeBadgePipe implements PipeTransform {
  transform(value: string | Date | number): string {
    let date = new Date(value);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  }
}
