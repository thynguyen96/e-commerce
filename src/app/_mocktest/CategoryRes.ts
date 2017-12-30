import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { DataProduct } from 'app/_mocktest/DataProduct';
import { Datacategory } from 'app/_mocktest/Datacategory';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class CategoryResInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
      
        let category: any[] = new Datacategory().listCategory;
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
console.log(request.url);
            // authenticate
             const url = 'http://localhost:8080' + request.url ;
             if ( url.match(/.+\/api\/category1\/([\w\d]{0,255})$/) && request.method === 'GET') {
                const id = Number(url.match(/.+\/api\/category1\/([\w\d]{0,255})$/)[1] );
                return Observable.of(new HttpResponse({ status: 200, body: new Datacategory().getcategoryByID(id)}));               
             }
            if (request.url.endsWith('/api/category/all') && request.method === 'GET') {
                // find if any user matches login 
                return Observable.of(new HttpResponse({ status: 200, body: category }))

            }
            if ( (request.url.split('/api/category/id/').length > 0 ) && request.method === 'GET') {
                // find if any user matches login 
            // if (request.url.endsWith('/api/category') && request.method === 'GET') {
                
              const id  = Number(request.url.split('/api/category/id/')[request.url.split('/api/category/id/').length -1 ]);
                // console.log(request.url.match('/.+\/api\/category\/([a-zA-Z0-9]{0,255})')[0]);
                return Observable.of(new HttpResponse({ status: 200, body: new Datacategory().getcategoryByID(id)
                 }));
            }
        
            // pass through any requests not handled above
            return next.handle(request);

        })

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .materialize()
            .delay(1000) // thoi gian phản hồi của server
            .dematerialize();
    }
}

export let CategoryRes = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: CategoryResInterceptor,
    multi: true
};