import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, selectedOption: string): any[] {
    if (!items || !searchText || !selectedOption ) {
      return items;
    }
    searchText = searchText.toLowerCase();
    console.log(selectedOption)
    if (selectedOption === 'select an option') {
      console.log(1)
      return items.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(searchText)
        );
      });
    }



    return items.filter((item) =>
      item[selectedOption].toString().toLowerCase().includes(searchText)
    );
  }
}
