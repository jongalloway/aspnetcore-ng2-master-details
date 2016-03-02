"use strict";

import {bootstrap}  from "angular2/platform/browser";
import {OrderApp} from "./order-app.component";
import {HTTP_PROVIDERS} from "angular2/http";

bootstrap(OrderApp, [HTTP_PROVIDERS]);