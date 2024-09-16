import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  let role = sessionStorage.getItem("role")
  const _router:Router = inject(Router)
  if(role == "Admin"){
    console.log("ohh herer");
    _router.navigate(['admin-dashboard']);
    return false
  }
    return true
};

// export const authGuardGuardsecond: CanActivateFn = (route, state) => {
//   const _router = Inject(Router)
//   let role = sessionStorage.getItem("role")
//   if (role == 'Admin') {
//     return true;
//   } else {
//     _router.navigate(["/admin-login"]);
//     return false;
//   }
// };

// //Admin after login check
// @Injectable({
//   providedIn: 'root'
// })
// export class AdminAuthGaurdService {
//   constructor(private router: Router) { }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     let role = sessionStorage.getItem("role")
//     console.log("AdminAuthGaurdService--",role)
//     if (role == 'Admin') {
//       return true;
//     } else {
//       this.router.navigate(['admin-login']);
//       return false;
//     }
//   }
// }

// export const sellerBuyerGuard: CanActivateFn = (route, state) => {
//   const router = Inject(Router)
//   let role = sessionStorage.getItem("role")
//   console.log("sellerBuyerGuard--",role)
//   if(role == "seller"){
//     router.navigate(['/seller-dashboard']);
//     return false
//   }else if(role == "buyer"){
//     router.navigate(['/buyer-dashboard']);
//     return false
//   }
//   else{
//     return true;
//   }
// };



// //Seller(Customer) after login
// @Injectable({
//   providedIn: 'root'
// })
// export class SellerAuthGaurdService {
//   constructor(private router: Router) { }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     let role = sessionStorage.getItem("role");
//     console.log("SellerAuthGaurdService--",role)
//     if (role == 'seller') {
//       return true;
//     } else {
//       this.router.navigate(["/sign-in"]);
//       return false;
//     }
//   }
// }

// //Buyer(Customer) after login
// @Injectable({
//   providedIn: 'root'
// })
// export class BuyerAuthGaurdService {
//   constructor(private router: Router) { }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const routers = Inject(Router)
//     let role = sessionStorage.getItem("role")
//     console.log("BuyerAuthGaurdService--",role)
//     if (role == 'buyer') {
//       return true;
//     } else {
//       this.router.navigate(["/sign-in"]);
//       return false;
//     }
//   }
// }
