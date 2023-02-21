import { TemplateResult } from "@lion/core";

  export interface ContentArgs {
    button: string;
    panel: string;
  }
  
  export interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
  }

  export interface ArgTypes {
    content: Array<ContentArgs>;
  }