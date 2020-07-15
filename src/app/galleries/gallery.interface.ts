export interface Gallery {
    hash: string;
    parent_id: string;
    title: string;
    thumb: string;
    slug: string;
    node: string;
    share_key: string;
    description: string;
    restricted: number;
    featured: number;
    created_at: string;
    updated_at: string;
    children: string[] | Gallery[];
    photos: string[];
}
