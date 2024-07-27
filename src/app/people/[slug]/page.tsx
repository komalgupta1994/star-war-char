import ListItem from "@/components/ListItem";

interface Params {
    slug: string;
}

interface Props {
    params: Params;
}

export default async function StarWarItem({ params }: Props) {
   
    return <ListItem id={params.slug}/>

}