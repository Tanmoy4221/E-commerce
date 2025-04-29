
'use server';
/**
 * @fileOverview A Genkit flow to suggest related products based on input product details.
 *
 * - productSuggestionsFlow - A function that suggests related product slugs.
 * - ProductSuggestionsInput - The input type for the flow.
 * - ProductSuggestionsOutput - The return type for the flow.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
import { products } from '@/lib/data'; // Import the mock product data

// --- Input Schema ---
const ProductSuggestionsInputSchema = z.object({
    productName: z.string().describe('The name of the current product.'),
    productDescription: z.string().describe('The description of the current product.'),
    category: z.string().describe('The category of the current product.'),
    brand: z.string().describe('The brand of the current product.'),
    price: z.number().describe('The price of the current product.'),
    limit: z.number().optional().default(4).describe('The maximum number of suggestions to return.'),
});
export type ProductSuggestionsInput = z.infer<typeof ProductSuggestionsInputSchema>;

// --- Output Schema ---
const ProductSuggestionsOutputSchema = z.object({
    suggestedProductSlugs: z.array(z.string()).describe('An array of slugs for suggested products.'),
});
export type ProductSuggestionsOutput = z.infer<typeof ProductSuggestionsOutputSchema>;


// --- Exported Wrapper Function ---
export async function productSuggestionsFlow(input: ProductSuggestionsInput): Promise<ProductSuggestionsOutput> {
    // Inject the list of available products into the flow context/input
    const availableProducts = products.map(p => ({
        name: p.name,
        slug: p.slug,
        category: p.category,
        brand: p.brand,
        price: p.price,
        description: p.description.substring(0, 100) + '...', // Keep descriptions concise for the prompt
    }));

    return suggestProductsFlow({ ...input, availableProducts });
}

// --- Genkit Prompt Definition ---
const prompt = ai.definePrompt({
    name: 'productSuggestionPrompt',
    input: {
        schema: ProductSuggestionsInputSchema.extend({
            // Add available products to the internal schema used by the prompt
            availableProducts: z.array(z.object({
                name: z.string(),
                slug: z.string(),
                category: z.string(),
                brand: z.string(),
                price: z.number(),
                description: z.string(),
            })).describe('List of all available products with their details.'),
        }),
    },
    output: {
        schema: ProductSuggestionsOutputSchema,
    },
    prompt: `
You are an expert e-commerce product recommender.
Given the details of a product the user is currently viewing, suggest a list of related products from the available products list.

Focus on suggesting products that are similar in category, style, or function, but are *different* from the current product. Do NOT suggest the exact same product.
Consider complementary items or alternatives. Return only the slugs of the suggested products.

Current Product Details:
Name: {{productName}}
Description: {{productDescription}}
Category: {{category}}
Brand: {{brand}}
Price: {{price}}

List of Available Products (Name, Slug, Category, Brand, Price, Description):
{{#each availableProducts}}
- {{name}} ({{slug}}), Category: {{category}}, Brand: {{brand}}, Price: {{price}}, Desc: {{description}}
{{/each}}

Suggest up to {{limit}} related product slugs based on the current product and the available list.
Provide the output as a JSON object matching the output schema, containing only the 'suggestedProductSlugs' array.
`,
});

// --- Genkit Flow Definition ---
// Define the internal flow that accepts availableProducts
const suggestProductsFlow = ai.defineFlow<
    z.infer<typeof prompt.inputSchema>, // Use the extended input schema
    typeof ProductSuggestionsOutputSchema
>(
    {
        name: 'suggestProductsInternalFlow',
        inputSchema: prompt.inputSchema, // Use the extended input schema
        outputSchema: ProductSuggestionsOutputSchema,
    },
    async (input) => {
        // console.log("AI Flow Input:", input); // Debugging log
        const llmResponse = await prompt(input);
        const output = llmResponse.output();
        // console.log("AI Flow Output:", output); // Debugging log

        if (!output) {
            console.error("AI flow returned undefined output");
            return { suggestedProductSlugs: [] };
        }

        // Basic validation - ensure slugs exist in the original products list
        const validSlugs = output.suggestedProductSlugs.filter(slug =>
            products.some(p => p.slug === slug)
        );

        if (validSlugs.length !== output.suggestedProductSlugs.length) {
            console.warn("AI flow suggested invalid slugs:", output.suggestedProductSlugs.filter(slug => !validSlugs.includes(slug)));
        }

        return { suggestedProductSlugs: validSlugs };
    }
);
