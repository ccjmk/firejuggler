import InstanceStatus from "./InstanceStatus";

export default interface Instance {
    id: string,
    name: string,
    version: string,
    status: InstanceStatus,
}