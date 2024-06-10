
import {GraphQLFormattedError} from "graphql";

type Error = {
    message: string,
    statusCode: string,
}

// Custom Fetch function
// Handles each fetch calls and handles authorization 
const customFetch = async (url: string, options: RequestInit) => {
    const accessToken = localStorage.getItem('access_token');
    const headers = options.headers as Record<string, string>;
    return await fetch(url, {
        ...options, 
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`, // If Authorization is passed then use authorization else use accessToken 
            "Content-Type": "application/json", 
            "Apollo-Require-Preflight": "true"

        
        }
    })
} // Using Custom Fetch can define specifics that can occur on every fetch made [Interceptor ]

const getGraphQLErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>) : Error | null => {
    if(!body) {
        return {
            message: 'Unknown Error', 
            statusCode: "Internal Server Error"
        }
    }
    
    if("errors" in body) {
        const errors = body?.errors // Set ? as optional parameter if chance body is undefined for typescript 
        const messages = errors?.map((error => error?.message))?.join("") // Joins all the messages in a string 
        const code = errors?.[0]?.extensions?.code

        return {
            message: messages || JSON.stringify(errors), // If for whatever reason a messages is empty just stringify the array instead to pass to client 
            statusCode: code || "500",
        }
    }
    return null
}

export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await customFetch(url, options); // Once you call response.JSON() you cannot read the response again 

    const responseClone = response.clone(); 
    const body = await responseClone.json(); // waits for the promise to resolve in a type Record 

    const error = getGraphQLErrors(body); // Will take in the body see if there is an error and will throw an eror 

    if (error) {
        console.log('THIS IS ERROR', error);
        throw error
    }

    return response; 
}