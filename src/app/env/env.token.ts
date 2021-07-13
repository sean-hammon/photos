import { InjectionToken } from "@angular/core";
import { Environment } from "./environment.interface";

export const ENV = new InjectionToken<Environment>('ENV');
