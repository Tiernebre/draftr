import { route, type Route } from '@std/http/unstable-route'
import { STATUS_CODE } from '@std/http'

const routes: Route[] = []

Deno.serve(route(routes, () => new Response('Not Found', { status: STATUS_CODE.NotFound})))
