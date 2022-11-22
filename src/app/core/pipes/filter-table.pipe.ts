import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterTable'
})

export class FilterTablePipe implements PipeTransform {

    transform(objects: any[], search: string) {

        if (!search) return objects
        return objects.filter(value => this.filterBy(value, search))
    }

    filterBy(objects: any, search: string) {

        const reduced = Object.keys(objects)
            .reduce((previousValue, currentValue) => this.reduceKeys(previousValue, currentValue, objects))
            .toLocaleLowerCase()

        return reduced.indexOf(search.toLocaleLowerCase()) > -1
    }

    reduceKeys(previousValue: string, currentValue: string, objects: any): string {

        if (this.isProp(currentValue))
            previousValue = `${previousValue}\$${objects[currentValue]}`;
            
        return previousValue
    }

    isProp(key: string): boolean {
        return key.includes("name")
    }

}