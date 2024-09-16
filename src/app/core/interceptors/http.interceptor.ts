import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const authreq = req.clone({
    setHeaders : {
      Authorization : "Bearer Token"
    }
  })
  return next(authreq);
};
