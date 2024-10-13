import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CDE2UZBDQR3M745AUOLIFQHNQHHDFS6ULPSX6Y2ODSS5X36KLPISVW2I",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAAAAAAAAAAABEluaXQAAAAAAAAAAAAAAAdCYWxhbmNlAAAAAAAAAAAAAAAAEENsYWltYWJsZUJhbGFuY2U=",
            "AAAAAQAAAAAAAAAAAAAAB0JhbGFuY2UAAAAAAwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAhyZWxlYXNlcgAAABMAAAAAAAAABXRva2VuAAAAAAAAEw==",
            "AAAAAQAAAAAAAAAAAAAAEENsYWltYWJsZUJhbGFuY2UAAAACAAAAAAAAAAdiYWxhbmNlAAAAB9AAAAAHQmFsYW5jZQAAAAAAAAAACGNsYWltYW50AAAAEw==",
            "AAAAAAAAAEBJbmNyZW1lbnQgaW5jcmVtZW50cyBhbiBpbnRlcm5hbCBjb3VudGVyLCBhbmQgcmV0dXJucyB0aGUgdmFsdWUuAAAAB2RlcG9zaXQAAAAAAwAAAAAAAAAEZnJvbQAAABMAAAAAAAAABXRva2VuAAAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAAFY2xhaW0AAAAAAAABAAAAAAAAAAhjbGFpbWFudAAAABMAAAAA",
            "AAAAAAAAAAAAAAAHcmVsZWFzZQAAAAABAAAAAAAAAAhyZWxlYXNlcgAAABMAAAAA"]), options);
        this.options = options;
    }
    fromJSON = {
        deposit: (this.txFromJSON),
        claim: (this.txFromJSON),
        release: (this.txFromJSON)
    };
}
