import { PipeTransform, Pipe } from '@angular/core';
import { IRestaurante } from '../Models/restaurante';

@Pipe({
    name: 'restauranteFilter'
})
export class RestauranteFilterPipe implements PipeTransform {

    transform(value: IRestaurante[], filter: string): IRestaurante[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IRestaurante) =>
            app.nome != null && app.nome.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;
    }

}