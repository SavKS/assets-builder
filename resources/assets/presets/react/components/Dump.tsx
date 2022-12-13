export default function Dump(props: { value: any }) {
    const normalizedValue = JSON.stringify(props.value, null, 4);

    return <pre>{ normalizedValue }</pre>;
}
