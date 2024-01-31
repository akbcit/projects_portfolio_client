
class Project {
    id!: number;
    title!: string;
    slug!: string;
    excerpt!: string | null;
    body!: string;
    category_id!: number;
    url!: string | null;
    thumb!: string | null;
    tags!:string[]
}

export default Project;