export const sortContactByName = (fullList:{
    name: string;
    phoneNo: string;
    spamLikelihood: number | null;
}[],searchQuery:string) => {

    const query = searchQuery.toLowerCase();

    return fullList.sort((i,j)=>{

        const name_i = i.name.toLowerCase();
        const name_j = j.name.toLowerCase();

        const priorityOf_i = priority(name_i,query);
        const priorityOf_j = priority(name_j,query);

        if(priorityOf_i !== priorityOf_j)
            return priorityOf_i - priorityOf_j;
        return name_i.localeCompare(name_j);
    })
}

const priority = (name:string,query:string) => {
    if(name===query)
        return 0;
    if(name.startsWith(query))
        return 1;
    return 2;
}