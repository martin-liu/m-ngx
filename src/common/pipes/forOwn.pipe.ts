import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({name: 'forOwn'})
export class ForOwnPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }
}
