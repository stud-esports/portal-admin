import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTable',
})
export class FormatTablePipe implements PipeTransform {
  transform(applications: any[], applicationType: string): any[] {
    if (applicationType === 'active') {
      return applications.filter((application) => !application.is_archived);
    } else {
      return applications.filter((application) => application.is_archived);
    }
  }
}
