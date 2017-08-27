import { PipeTransform, Pipe } from '@angular/core';
import { IPrato } from '../Models/prato';

@Pipe({
    name: 'pratoFilter'
})
export class PratoFilterPipe implements PipeTransform {

    transform(value: IPrato[], filter: string): IPrato[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IPrato) =>
            app.nome != null && app.nome.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;
    }

}