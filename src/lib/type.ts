export type ServiceNodeData = {
    label:string;
    serviceType?: 'api' | 'db' | 'queue' | undefined;
}