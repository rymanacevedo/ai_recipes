import {smallModel} from "./shared/utils.ts";
import {z} from "zod";
import {streamObject} from "ai";

const model = smallModel;

const schema = z.object({
    recipe: z.object({
        name: z.string(),
        ingredients: z.array(z.object({
                name: z.string(),
                amount: z.string()
            }).describe('The ingredients needed for the recipe.')
        ),
        steps: z.array(z.string()).describe('The steps to make the recipe.')
    }),
});

export const createRecipe = async(input:string) => {
    const result = await streamObject({
        model,
        schema,
        schemaName: 'Recipe',
        prompt: input,
        system: `
        You are helping a user create a recipe.
        Use British english variants of ingredients names, like Coriander over Cilantro.
        They may have diet resrictions so filter out food or ingredients they mention.
        `
    });

    for await(const obj of result.partialObjectStream) {
        console.clear();
        console.dir(obj, {depth: null});
    }

    const finalObject = await result.object;
    return finalObject.recipe;
}

const reciple = await createRecipe(`How can I make pizza? I am lactose intolerant though`);
console.log(reciple);