export default function Card(props: any) {
    const { children } = props;
    return <div className="flex gap-4 bg-gray-50 border-b p-4 m-auto rounded-lg w-2/5 ">
        {children}
    </div>
}
