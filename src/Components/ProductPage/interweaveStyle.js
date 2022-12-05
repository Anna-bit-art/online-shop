import {Node} from "interweave";
import React from "react";

export const transformText = (node: HTMLElement, children: Node[]):React.ReactNode => {
    if (node.tagName.toLowerCase() === "li") {
        return <li style={{marginBottom: 8}}>{children}</li>;
    }
    if (node.tagName.toLowerCase() === "h1") {
        return  <h1 style={{fontSize: 26, fontWeight: 600, marginTop: 8, marginBottom: 5}}>
            {children}
        </h1>;
    }
    if (node.tagName.toLowerCase() === "h3") {
        return  <h3 style={{fontSize: 22, fontWeight: 600, marginTop: 8, marginBottom: 5}}>
            {children}
        </h3>;
    }
    if (node.tagName.toLowerCase() === "br") {
        return  null
    }
}


