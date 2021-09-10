import { Controller, Get,Route, Tags } from 'tsoa';
import { getItems,getCategories } from './menu.service';

@Tags('Menu')
@Route('/api/menu')

export class MenuController extends Controller {

    // Get Whole Menu   
    @Get('/getItems')
    public async getItems():Promise<any> {
        return getItems();
    }

    @Get('/getCategories')
    public async getCategories(): Promise<any> {
        return getCategories()
    }
}