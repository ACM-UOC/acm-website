export async function parseDb(url: string): Promise<any[]> {
    let page = 1;
    let allResults: any[] = [];

    while(true) {
        const data_url = `${url}&per_page=100&page=${page}`;
        const res = await fetch(data_url);

        // Found the last page
        if (!res.ok || res.status == 400) break;
    
        const data = await res.json();
        if(data.length === 0) break;
        allResults = allResults.concat(data);
    
        page++;
    }

    return allResults;
}