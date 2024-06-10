import graphqlDataProvider,  {GraphQLClient, liveProvider as graphqlLiveProvider } from "@refinedev/nestjs-query";
import {createClient} from 'graphql-ws'
import {fetchWrapper} from "./fetch-wrapper";

export const API_BASE_URL = 'https://api.crm.refine.dev'; 
export const API_URL = `${API_BASE_URL}/graphql`; // Exposed by refine team for API url 
export const WS_URL = 'wss://api.crm.refine.dev/graphql' // Exposbed by refine team for Websocket URL 


export const client = new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {
        try {
            return fetchWrapper(url, options);
        }
        catch(error) {
            return Promise.reject(error as Error);
        } },
});

//Websocket 

export const wsClient = typeof window !== "undefined" ? createClient({
    url: WS_URL, 
    connectionParams: ()=> {
        const accessToken = localStorage.getItem("access_token");
        
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
    }
}) : undefined;

export const dataProvider = graphqlDataProvider(client) // This is made from Refine 
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient)  : undefined // This is a provider that allows live changes to occur 