import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

export class RouteClass implements RouteReuseStrategy {

    private storedRoutes = new Map<string, DetachedRouteHandle>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // Decide if the route should be stored when it's deactivated
        return true; // or return false if you don't want to store it
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // Store the route handle for future use
        this.storedRoutes.set(route.routeConfig?.path ?? '', handle);
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // Decide if the route should be reattached when requested
        return this.storedRoutes.has(route.routeConfig?.path ?? '');
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        // Retrieve the previously stored route handle
        return this.storedRoutes.get(route.routeConfig?.path ?? '') ?? null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // Decide whether the route should be reused based on future and current route snapshots
        return future.routeConfig === curr.routeConfig;
    }

}