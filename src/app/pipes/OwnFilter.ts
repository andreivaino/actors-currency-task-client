import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})

export class OwnFilter implements PipeTransform {

  transform(value: any[], searchString: string) {

    if (!searchString) {
      console.log('no search');
      return value;
    }

    return value.filter(currency => {
      const code = currency.code.toString().toUpperCase().includes(searchString.toUpperCase());
      const groupName = currency.name.toLowerCase().toUpperCase().includes(searchString.toUpperCase());
      return (code + groupName);
    });
  }

}
