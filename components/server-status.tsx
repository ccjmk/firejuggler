import React from "react";
import Instance from "../domain/Instance";

interface ServerStatusProps {
    currentInstance?: Instance;
}

export default function ServerStatus(props: ServerStatusProps) {
    const instance = props.currentInstance;
    const textBlob = instance ? `Running '${instance.name}' (${instance.version})` : 'No running instance found - click one to start it';

    return (
        <p className={'m-4 text-center font-semibold'}>
            {textBlob}
        </p>
    );
}