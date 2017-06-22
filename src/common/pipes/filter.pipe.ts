import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
  name: 'filter',
  pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {

  /**
   * @items = object from array
   * @term = term's search
   * @keys = keys
   */
  transform(items: any, term: any, keys?: Array<string>): any {
    if (term === undefined) return items;

    return items.filter(function(item) {
      for(let property in item){
        if (item[property] === null){
          continue;
        }
        if (keys && keys.length && keys.indexOf(property) < 0) {
          continue;
        }
        if(item[property].toString().toLowerCase().includes(term.toLowerCase())){
          return true;
        }
      }
      return false;
    });
  }
}
