import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterCategory'
})

export class FilterCategoryPipe implements PipeTransform {

    transform(objects: any[], categoryName: string) {
        if (!categoryName) return objects
        return objects.filter(value => value.type == categoryName)
    }

}