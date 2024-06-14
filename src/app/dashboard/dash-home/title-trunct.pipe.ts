import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleTrunct',
  standalone: true
})
export class TitleTrunctPipe implements PipeTransform {

  transform(value: string, limit: number = 30): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }

}
