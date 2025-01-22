import {openai} from "@ai-sdk/openai";

export const smallModel = openai('gpt-3.5-turbo');
export const mediumModel = openai('gpt-4');
export const largeModel = openai('gpt-4o');