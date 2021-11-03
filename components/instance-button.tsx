import React from "react";
import Instance from "../domain/Instance";
import InstanceStatus from "../domain/InstanceStatus";

interface InstanceButtonProps {
    instance: Instance;
    handleOnToggle: (instanceId: string) => void;
};
export default function InstanceButton(props: InstanceButtonProps) {
    const { statusColor, actionName } = props.instance.status == InstanceStatus.RUNNING ? { statusColor: "bg-red-500", actionName: "Stop instance" } : { statusColor: "bg-green-500", actionName: "Start instance" }

    return (
        <button type="button"
            className={`border-b p-2 rounded-md shadow-2xl ${statusColor}`}
            onClick={handleClick}
            title={actionName}
        >
            {props.instance.name} ({props.instance.version})
        </button>
    );

    function handleClick() {
        props.handleOnToggle(props.instance.id)
    }
}


