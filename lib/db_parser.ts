const db_url: string = "https://data.uoc.acm.org/wp-json/wp/v2/";

const createURL = (table_name: string, page: number) : string => {
    return `${db_url}${table_name}?acf_format=standard&_fields=id,acf,&per_page=100&page=${page}`;
}

export async function parseDb(table_name: string, revalidate_after: number): Promise<any[]> {
    let page = 1;
    let allResults: any[] = [];

    while(true) {
        const data_url = createURL(table_name, page);
        const res = await fetch(data_url, {
            next: { 
                tags: [table_name],
                revalidate: revalidate_after,
            }
        });

        // Found the last page
        if (!res.ok || res.status == 400) break;
    
        const data = await res.json();
        if(data.length === 0) break;
        allResults = allResults.concat(data);
    
        page++;
    }

    return allResults;
}